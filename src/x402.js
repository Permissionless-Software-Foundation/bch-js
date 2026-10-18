import Address from './address.js'
import BitcoinCash from './bitcoincash.js'
import ECPair from './ecpair.js'
import Electrumx from './electrumx.js'
import RawTransactions from './raw-transactions.js'
import TransactionBuilder from './transaction-builder.js'

const currentUtxo = {
  txid: null,
  vout: null,
  satsLeft: 0
}

const BCH_MAINNET = 'bip122:000000000000000000651ef99cb9fcbe'

function isBCHNetwork (network) {
  if (!network) return false
  if (network === 'bch') return true
  if (network === BCH_MAINNET) return true
  return network.startsWith('bip122:')
}

export function createSigner (privateKeyWIF, paymentAmountSats) {
  const addressLib = new Address({})
  const ecpair = ECPair.fromWIF(privateKeyWIF)
  const bitcoinCash = new BitcoinCash(addressLib)

  return {
    ecpair,
    address: addressLib.toCashAddress(ecpair.getAddress(), true, false),
    wif: privateKeyWIF,
    paymentAmountSats,
    signMessage (message) {
      return bitcoinCash.signMessageWithPrivKey(privateKeyWIF, message)
    }
  }
}

export function selectPaymentRequirements (accepts = []) {
  const bchRequirements = accepts.filter(req => {
    return isBCHNetwork(req?.network) && req?.scheme === 'utxo'
  })

  if (bchRequirements.length === 0) {
    throw new Error('No BCH payment requirements found in 402 response')
  }

  return bchRequirements[0]
}

export async function createPaymentHeader (
  signer,
  paymentRequirements,
  x402Version = 2,
  txid = null,
  vout = null,
  resource = null,
  extensions = null
) {
  const amountRequired = paymentRequirements.amount || paymentRequirements.minAmountRequired
  const isCheckMyTabMode = txid === '*'
  const authorization = {
    from: signer.address,
    to: paymentRequirements.payTo,
    value: amountRequired,
    txid: isCheckMyTabMode ? '*' : txid,
    vout: isCheckMyTabMode ? null : vout,
    amount: isCheckMyTabMode ? null : signer.paymentAmountSats
  }
  const accepted = {
    scheme: paymentRequirements.scheme || 'utxo',
    network: paymentRequirements.network || BCH_MAINNET,
    amount: amountRequired,
    asset: paymentRequirements.asset,
    payTo: paymentRequirements.payTo,
    maxTimeoutSeconds: paymentRequirements.maxTimeoutSeconds,
    extra: paymentRequirements.extra || {}
  }
  const paymentHeader = {
    x402Version,
    ...(resource && { resource }),
    accepted,
    payload: {
      signature: signer.signMessage(JSON.stringify(authorization)),
      authorization
    },
    ...(extensions && { extensions })
  }

  return JSON.stringify(paymentHeader)
}

function ensureAddressCodec () {
  if (TransactionBuilder._address) return
  const address = new Address({})
  TransactionBuilder.setAddress(address)
}

export async function sendPayment (signer, paymentRequirements, bchServerConfig = {}) {
  const { bchServerURL, bearerToken } = bchServerConfig
  if (!bchServerURL) {
    throw new Error('bchServerURL is required to send an x402 payment')
  }

  const restURL = bchServerURL.endsWith('/') ? bchServerURL : `${bchServerURL}/`
  const libConfig = {
    restURL,
    authToken: bearerToken ? `Bearer ${bearerToken}` : ''
  }
  const amountRequired = Number(paymentRequirements.amount || paymentRequirements.minAmountRequired)
  const paymentAmountSats = signer.paymentAmountSats || amountRequired
  const electrumx = new Electrumx(libConfig)
  const rawTransactions = new RawTransactions(libConfig)

  let utxoData
  try {
    utxoData = await electrumx.utxo(signer.address)
  } catch (err) {
    throw new Error(`Error retrieving UTXOs for address ${signer.address}: ${err.message}`)
  }

  const utxos = (utxoData.utxos || []).filter(utxo => Number(utxo.value) >= paymentAmountSats)
  if (utxos.length === 0) {
    throw new Error('Not enough funds. Send more BCH to your wallet address.')
  }

  const utxo = utxos[0]
  ensureAddressCodec()
  const transactionBuilder = new TransactionBuilder()
  const bitcoinCash = new BitcoinCash(TransactionBuilder._address)
  const byteCount = bitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 })
  const txFee = Math.floor(1.2 * byteCount)
  const originalAmount = Number(utxo.value)
  const remainder = originalAmount - paymentAmountSats - txFee

  if (remainder < 0) {
    throw new Error('Not enough BCH to complete transaction!')
  }

  transactionBuilder.addInput(utxo.tx_hash, utxo.tx_pos)
  transactionBuilder.addOutput(paymentRequirements.payTo, paymentAmountSats)
  transactionBuilder.addOutput(signer.address, remainder)
  transactionBuilder.sign(
    0,
    signer.ecpair,
    undefined,
    transactionBuilder.hashTypes.SIGHASH_ALL,
    originalAmount
  )

  const txid = await rawTransactions.sendRawTransaction(transactionBuilder.build().toHex())
  return {
    txid,
    vout: 0,
    satsSent: paymentAmountSats
  }
}

function readPaymentRequired (response) {
  const paymentRequiredHeader = response.headers?.['payment-required'] ||
    response.headers?.['PAYMENT-REQUIRED']

  if (paymentRequiredHeader) {
    try {
      const decoded = Buffer.from(paymentRequiredHeader, 'base64').toString('utf8')
      return JSON.parse(decoded)
    } catch {
      // Fall through to the response body.
    }
  }

  return response.data || {}
}

export function withPaymentInterceptor (
  axiosInstance,
  signer,
  paymentRequirementsSelectorOrConfig,
  maybeConfig
) {
  let paymentRequirementsSelector = selectPaymentRequirements
  let bchServerConfig = {}

  if (typeof paymentRequirementsSelectorOrConfig === 'function') {
    paymentRequirementsSelector = paymentRequirementsSelectorOrConfig
    if (maybeConfig) bchServerConfig = maybeConfig
  } else if (paymentRequirementsSelectorOrConfig) {
    bchServerConfig = paymentRequirementsSelectorOrConfig
  }

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (!error.response || error.response.status !== 402) {
        return Promise.reject(error)
      }

      try {
        const originalConfig = error.config
        if (!originalConfig || !originalConfig.headers) {
          return Promise.reject(new Error('Missing axios request configuration'))
        }

        if (originalConfig.__is402Retry) {
          return Promise.reject(error)
        }

        if (originalConfig.__is402CheckMyTab) {
          originalConfig.__is402CheckMyTab = false
        }

        const paymentRequired = readPaymentRequired(error.response)
        const x402Version = paymentRequired.x402Version || 1
        const accepts = paymentRequired.accepts || []
        const resource = paymentRequired.resource
        const extensions = paymentRequired.extensions

        if (!Array.isArray(accepts) || accepts.length === 0) {
          return Promise.reject(new Error('No payment requirements found in 402 response'))
        }

        const paymentRequirements = paymentRequirementsSelector(accepts)
        const cost = Number(paymentRequirements.amount || paymentRequirements.minAmountRequired)

        if (!currentUtxo.txid && !originalConfig.__is402CheckMyTab) {
          originalConfig.__is402CheckMyTab = true
          originalConfig.__is402Retry = true
          originalConfig.headers['PAYMENT-SIGNATURE'] = await createPaymentHeader(
            signer,
            paymentRequirements,
            x402Version,
            '*',
            null,
            resource,
            extensions
          )
          originalConfig.headers['Access-Control-Expose-Headers'] = 'PAYMENT-RESPONSE'

          try {
            return await axiosInstance.request(originalConfig)
          } catch (checkMyTabError) {
            if (!checkMyTabError.response || checkMyTabError.response.status !== 402) {
              return Promise.reject(checkMyTabError)
            }
            originalConfig.__is402CheckMyTab = false
            originalConfig.__is402Retry = false
          }
        }

        let txid = currentUtxo.txid
        let vout = currentUtxo.vout
        let satsLeft = currentUtxo.satsLeft

        if (!txid || satsLeft < cost) {
          const payment = await sendPayment(signer, paymentRequirements, bchServerConfig)
          txid = payment.txid
          vout = payment.vout
          satsLeft = payment.satsSent - cost
        } else {
          satsLeft = satsLeft - cost
        }

        currentUtxo.txid = txid
        currentUtxo.vout = vout
        currentUtxo.satsLeft = satsLeft

        originalConfig.__is402Retry = true
        originalConfig.headers['PAYMENT-SIGNATURE'] = await createPaymentHeader(
          signer,
          paymentRequirements,
          x402Version,
          txid,
          vout,
          resource,
          extensions
        )
        originalConfig.headers['Access-Control-Expose-Headers'] = 'PAYMENT-RESPONSE'
        return axiosInstance.request(originalConfig)
      } catch (paymentError) {
        return Promise.reject(paymentError)
      }
    }
  )

  return axiosInstance
}

export function resetCurrentUtxo () {
  currentUtxo.txid = null
  currentUtxo.vout = null
  currentUtxo.satsLeft = 0
}
