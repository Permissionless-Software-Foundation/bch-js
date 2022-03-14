/* eslint-disable no-useless-catch */

// Public npm libraries
const axios = require('axios')
const slpParser = require('slp-parser')
const BigNumber = require('bignumber.js')

// Local libraries
const Util = require('../util')

let _this

class Utils {
  constructor (config = {}) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.slpParser = slpParser
    this.authToken = config.authToken
    this.axios = axios

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    _this = this

    this.whitelist = []

    this.util = new Util(config)
  }

  /**
   * @api SLP.Utils.tokenStats() tokenStats()
   * @apiName tokenStats
   * @apiGroup SLP Utils
   * @apiDescription Stats for token by tokenId.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  let stats = await bchjs.SLP.Utils.tokenStats(
   *    "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   *  )
   *  console.log(stats)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * { tokenId:
   *  'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
   *  documentUri: '',
   *  symbol: 'NAKAMOTO',
   *  name: 'NAKAMOTO',
   *  decimals: 8,
   *  txnsSinceGenesis: 367,
   *  validUtxos: 248,
   *  validAddresses: 195,
   *  circulatingSupply: 20995990,
   *  totalBurned: 4010,
   *  totalMinted: 21000000,
   *  satoshisLockedUp: 135408
   * }
   */
  async tokenStats (tokenId) {
    try {
      const path = `${this.restURL}slp/tokenStats/${tokenId}`

      const response = await _this.axios.get(path, this.axiosOptions)

      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.transactions() transactions()
   * @apiName transactions
   * @apiGroup SLP Utils
   * @apiDescription SLP Transactions by tokenId and address.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  let transactions = await bchjs.SLP.Utils.transactions(
   *    "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
   *    "qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqlsy4gusz"
   *  )
   *  console.log(transactions)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * [
   *  {
   *    "txid": "27e27170b546f05b2af69d6eddff8834038facf5d81302e9e562df09a5c4445f",
   *    "tokenDetails": {
   *      "valid": true,
   *      "detail": {
   *        "decimals": null,
   *        "tokenIdHex": "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
   *        "timestamp": null,
   *        "transactionType": "SEND",
   *        "versionType": 1,
   *        "documentUri": null,
   *        "documentSha256Hex": null,
   *        "symbol": null,
   *        "name": null,
   *        "batonVout": null,
   *        "containsBaton": null,
   *        "genesisOrMintQuantity": null,
   *        "sendOutputs": [
   *          {
   *            "$numberDecimal": "0"
   *          },
   *          {
   *            "$numberDecimal": "25"
   *          },
   *          {
   *            "$numberDecimal": "77"
   *          }
   *        ]
   *      },
   *      "invalidReason": null,
   *      "schema_version": 30
   *    }
   *  }
   * ]
   */
  // Retrieve token transactions for a given tokenId and address.
  async transactions (tokenId, address) {
    try {
      const path = `${this.restURL}slp/transactions/${tokenId}/${address}`

      const response = await _this.axios.get(path, this.axiosOptions)

      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.burnTotal() burnTotal()
   * @apiName burnTotal
   * @apiGroup SLP Utils
   * @apiDescription List input, output and burn total for slp transaction.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const burnTotal = await bchjs.SLP.Utils.burnTotal(
   *    "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de"
   *  )
   *  console.log(burnTotal)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * {
   *  transactionId: 'c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de',
   *  inputTotal: 100000100,
   *  outputTotal: 100000000,
   *  burnTotal: 100
   * }
   */
  async burnTotal (transactionId) {
    try {
      const path = `${this.restURL}slp/burnTotal/${transactionId}`

      const response = await _this.axios.get(path, this.axiosOptions)

      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.txDetails() txDetails()
   * @apiName txDetails
   * @apiGroup SLP Utils
   * @apiDescription Transaction details on a token transfer.
   * There is no bulk method for this endpoint. Can only get one tx at a time.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const details = await bchjs.SLP.Utils.txDetails(
   *    "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de"
   *  )
   *  console.log(details)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   */
  async txDetails (txid) {
    try {
      if (
        !txid ||
        txid === '' ||
        typeof txid !== 'string' ||
        txid.length !== 64
      ) {
        throw new Error('txid string must be included.')
      }

      // console.log(`this.restURL: ${this.restURL}`)
      const path = `${this.restURL}slp/txDetails/${txid}`

      const response = await _this.axios.get(path, this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.decodeOpReturn() decodeOpReturn()
   * @apiName decodeOpReturn
   * @apiGroup SLP Utils
   * @apiDescription
   * Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
   *
   * Throws an error if given a non-SLP txid.
   *
   * If optional associative array parameter cache is used, will cache and
   * reuse responses for the same input.
   *
   * A third optional input, `usrObj`, is used by bch-api for managing rate limits.
   * It can be safely ignored when writing apps using this call.
   *
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const txid =
   *   "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1"
   *
   *  const data = await bchjs.SLP.Utils.decodeOpReturn(txid)
   *
   *  console.log(`Decoded OP_RETURN data: ${JSON.stringify(data,null,2)}`)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * {
   *  "tokenType": 1,
   *  "txType": "SEND",
   *  "tokenId": "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"
   *  "amounts": [
   *    "100000000",
   *    "99883300000000"
   *  ]
   * }
   *
   */
  // Reimplementation of decodeOpReturn() using slp-parser.
  async decodeOpReturn (txid, cache = null, usrObj = null) {
    // The cache object is an in-memory cache (JS Object) that can be passed
    // into this function. It helps if multiple vouts from the same TXID are
    // being evaluated. In that case, it can significantly reduce the number
    // of API calls.
    // To use: add the output of this function to the cache object:
    // cache[txid] = returnValue
    // Then pass that cache object back into this function every time its called.
    if (cache) {
      if (!(cache instanceof Object)) {
        throw new Error('decodeOpReturn cache parameter must be Object')
      }

      const cachedVal = cache[txid]
      if (cachedVal) return cachedVal
    }

    // console.log(`decodeOpReturn usrObj: ${JSON.stringify(usrObj, null, 2)}`)

    try {
      // Validate the txid input.
      if (!txid || txid === '' || typeof txid !== 'string') {
        throw new Error('txid string must be included.')
      }

      // CT: 2/24/21 Deprected GET in favor of POST, to pass IP address.
      // Retrieve the transaction object from the full node.
      const path = `${this.restURL}rawtransactions/getRawTransaction`
      // console.log('decodeOpReturn() this.axiosOptions: ', this.axiosOptions)
      const response = await this.axios.post(
        path,
        {
          verbose: true,
          txids: [txid],
          usrObj // pass user data when making an internal call.
        },
        this.axiosOptions
      )
      const txDetails = response.data[0]
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      // SLP spec expects OP_RETURN to be the first output of the transaction.
      const opReturn = txDetails.vout[0].scriptPubKey.hex
      // console.log(`opReturn hex: ${opReturn}`)

      const parsedData = _this.slpParser.parseSLP(Buffer.from(opReturn, 'hex'))
      // console.log(`parsedData: ${JSON.stringify(parsedData, null, 2)}`)

      // Convert Buffer data to hex strings or utf8 strings.
      let tokenData = {}
      if (parsedData.transactionType === 'SEND') {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          tokenId: parsedData.data.tokenId.toString('hex'),
          amounts: parsedData.data.amounts
        }
      } else if (parsedData.transactionType === 'GENESIS') {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          ticker: parsedData.data.ticker.toString(),
          name: parsedData.data.name.toString(),
          tokenId: txid,
          documentUri: parsedData.data.documentUri.toString(),
          documentHash: parsedData.data.documentHash.toString(),
          decimals: parsedData.data.decimals,
          mintBatonVout: parsedData.data.mintBatonVout,
          qty: parsedData.data.qty
        }
      } else if (parsedData.transactionType === 'MINT') {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          tokenId: parsedData.data.tokenId.toString('hex'),
          mintBatonVout: parsedData.data.mintBatonVout,
          qty: parsedData.data.qty
        }
      }
      // console.log(`tokenData: ${JSON.stringify(tokenData, null, 2)}`)

      if (cache) cache[txid] = tokenData

      return tokenData
    } catch (error) {
      // Used for debugging
      // console.log('decodeOpReturn error: ', error)
      // console.log(`decodeOpReturn error.message: ${error.message}`)
      // if (error.response && error.response.data) {
      //   console.log(
      //     `decodeOpReturn error.response.data: ${JSON.stringify(
      //       error.response.data
      //     )}`
      //   )
      // }
      throw error
    }
  }

  /**
   * @api SLP.Utils.tokenUtxoDetails() tokenUtxoDetails()
   * @apiName tokenUtxoDetails
   * @apiGroup SLP Utils
   * @apiDescription Hydrate a UTXO with SLP token metadata.
   *
   * Expects an array of UTXO objects as input. Returns an array of equal size.
   * Returns UTXO data hydrated with token information.
   *
   * - If the UTXO does not belong to a SLP transaction, it will return an
   * `isValid` property set to `false`.
   *
   * - If the UTXO is part of an SLP transaction, it will return the UTXO object
   * with additional SLP information attached. An `isValid` property will be
   * included.
   *   - If the `isValid` property is `true`, the UTXO is a valid SLP UTXO.
   *   - If the `isValid` property is `null`, then SLPDB has not yet processed
   *     that txid and validity has not been confirmed, or a 429 rate-limit error
   *     was enountered during the processing of the request.
   *
   * An optional second input object, `usrObj`, allows the user to inject an
   * artifical delay while processing UTXOs. If `usrObj.utxoDelay` is set to
   * a number, the call will delay by that number of milliseconds between
   * processing UTXOs.
   *
   * This is an API-heavy call. If you get a lot of `null` values, then slow down
   * the calls by using the usrObj.utxoDelay property, or request info on fewer
   * UTXOs at a
   * time. `null` indicates that the UTXO can *not* be safely spent, because
   * a judgement as to weather it is a token UTXO has not been made. Spending it
   * could burn tokens. It's safest to ignore UTXOs with a value of `null`.
   *
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const utxos = await bchjs.Electrumx.utxo(`bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05`)
   *
   *  // Delay 100mS between processing UTXOs, to prevent rate-limit errors.
   *  const utxoInfo = await bchjs.SLP.Utils.tokenUtxoDetails(utxos, { utxoDelay: 100 })
   *
   *  console.log(`utxoInfo: ${JSON.stringify(utxoInfo, null, 2)}`)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * {
   *  "txid": "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
   *  "vout": 1,
   *  "amount": 0.00000546,
   *  "satoshis": 546,
   *  "height": 596089,
   *  "confirmations": 748,
   *  "utxoType": "token",
   *  "tokenId": "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
   *  "tokenTicker": "TOK-CH",
   *  "tokenName": "TokyoCash",
   *  "tokenDocumentUrl": "",
   *  "tokenDocumentHash": "",
   *  "decimals": 8,
   *  "tokenQty": 2,
   *  "isValid": true,
   *  "tokenType": 1
   * }
   */
  async tokenUtxoDetails (utxos, usrObj = null) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error('Input must be an array.')

      // console.log(`tokenUtxoDetails usrObj: ${JSON.stringify(usrObj, null, 2)}`)

      // Loop through each element in the array and validate the input before
      // further processing.
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // Ensure the UTXO has a txid or tx_hash property.
        if (!utxo.txid) {
          // If Electrumx, convert the tx_hash property to txid.
          if (utxo.tx_hash) {
            utxo.txid = utxo.tx_hash
          } else {
            // If there is neither a txid or tx_hash property, throw an error.
            throw new Error(
              `utxo ${i} does not have a txid or tx_hash property.`
            )
          }
        }

        // Ensure the UTXO has a vout or tx_pos property.
        if (!Number.isInteger(utxo.vout)) {
          if (Number.isInteger(utxo.tx_pos)) {
            utxo.vout = utxo.tx_pos
          } else {
            throw new Error(
              `utxo ${i} does not have a vout or tx_pos property.`
            )
          }
        }
      }

      // Hydrate each UTXO with data from SLP OP_REUTRNs.
      const outAry = await this._hydrateUtxo(utxos, usrObj)
      // console.log(`outAry: ${JSON.stringify(outAry, null, 2)}`)

      // *After* each UTXO has been hydrated with SLP data,
      // validate the TXID with SLPDB.
      for (let i = 0; i < outAry.length; i++) {
        const utxo = outAry[i]

        // *After* the UTXO has been hydrated with SLP data,
        // validate the TXID with SLPDB.
        if (utxo.tokenType) {
          // Only execute this code-path if the current UTXO has a 'tokenType'
          // property. i.e. it has been successfully hydrated with SLP
          // information.

          // Validate using a 'waterfall' of validators.
          utxo.isValid = await this.waterfallValidateTxid(utxo.txid, usrObj)
          // console.log(`isValid: ${JSON.stringify(utxo.isValid, null, 2)}`)
        }
      }

      return outAry
    } catch (error) {
      // console.log('Error in tokenUtxoDetails()')
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // This is a private function that is called by tokenUtxoDetails().
  // It loops through an array of UTXOs and tries to hydrate them with SLP
  // token information from the OP_RETURN data.
  //
  // This function makes several calls to decodeOpReturn() to retrieve SLP
  // token data. If that call throws an error due to hitting rate limits, this
  // function will not throw an error. Instead, it will mark the `isValid`
  // property as `null`
  //
  // Exception to the above: It *will* throw an error if decodeOpReturn() throws
  // an error while trying to get the Genesis transaction for a Send or Mint
  // transaction. However, that is a rare occurence since the cache of
  // decodeOpReturn() will minimize API calls for this case. This behavior
  // could be changed, but right now it's a corner case of a corner case.
  //
  // If the usrObj has a utxoDelay property, then it will delay the loop for
  // each UTXO by that many milliseconds.
  async _hydrateUtxo (utxos, usrObj = null) {
    try {
      const decodeOpReturnCache = {}

      // console.log(`_hydrateUtxo usrObj: ${JSON.stringify(usrObj, null, 2)}`)

      // Output Array
      const outAry = []

      // Loop through each utxo
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // If the user passes in a delay, then wait.
        if (usrObj && usrObj.utxoDelay && !isNaN(Number(usrObj.utxoDelay))) {
          const delayMs = Number(usrObj.utxoDelay)
          await this.util.sleep(delayMs)
        }

        // Get raw transaction data from the full node and attempt to decode
        // the OP_RETURN data.
        // If there is no OP_RETURN, mark the UTXO as false.
        let slpData = false
        try {
          slpData = await this.decodeOpReturn(
            utxo.txid,
            decodeOpReturnCache,
            usrObj // pass user data when making an internal call.
          )
          // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)
        } catch (err) {
          // console.log(
          //   `error in _hydrateUtxo() from decodeOpReturn(${utxo.txid}): `,
          //   err
          // )

          // An error will be thrown if the txid is not SLP.
          // If error is for some other reason, like a 429 error, mark utxo as 'null'
          // to display the unknown state.
          if (
            !err.message ||
            (err.message.indexOf('scriptpubkey not op_return') === -1 &&
              err.message.indexOf('lokad id') === -1 &&
              err.message.indexOf('trailing data') === -1)
          ) {
            // console.log(
            //   "unknown error from decodeOpReturn(). Marking as 'null'",
            //   err
            // )

            utxo.isValid = null
            outAry.push(utxo)

            // If error is thrown because there is no OP_RETURN, then it's not
            // an SLP UTXO.
            // Mark as false and continue the loop.
          } else {
            // console.log('marking as invalid')
            utxo.isValid = false
            outAry.push(utxo)
          }

          // Halt the execution of the loop and increase to the next index.
          continue
        }
        // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)

        const txType = slpData.txType.toLowerCase()

        // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

        // If there is an OP_RETURN, attempt to decode it.
        // Handle Genesis SLP transactions.
        if (txType === 'genesis') {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            utxo.isValid = false
            outAry[i] = utxo
          } else {
            // If this is a valid SLP UTXO, then return the decoded OP_RETURN data.
            // Minting Baton
            if (utxo.vout === slpData.mintBatonVout) {
              utxo.utxoType = 'minting-baton'
            } else {
              // Tokens

              utxo.utxoType = 'token'
              utxo.tokenQty = new BigNumber(slpData.qty)
                .div(Math.pow(10, slpData.decimals))
                .toString()
            }

            utxo.tokenId = utxo.txid
            utxo.tokenTicker = slpData.ticker
            utxo.tokenName = slpData.name
            utxo.tokenDocumentUrl = slpData.documentUri
            utxo.tokenDocumentHash = slpData.documentHash
            utxo.decimals = slpData.decimals
            utxo.tokenType = slpData.tokenType

            // Initial value is null until UTXO can be validated and confirmed
            // to be valid (true) or not (false).
            utxo.isValid = null

            outAry[i] = utxo
          }
        }

        // Handle Mint SLP transactions.
        if (txType === 'mint') {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            utxo.isValid = false

            outAry[i] = utxo
          } else {
            // If UTXO passes validation, then return formatted token data.

            const genesisData = await this.decodeOpReturn(
              slpData.tokenId,
              decodeOpReturnCache,
              usrObj // pass user data when making an internal call.
            )
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // Minting Baton
            if (utxo.vout === slpData.mintBatonVout) {
              utxo.utxoType = 'minting-baton'
            } else {
              // Tokens

              utxo.utxoType = 'token'
              utxo.tokenQty = new BigNumber(slpData.qty)
                .div(Math.pow(10, genesisData.decimals))
                .toString()
            }

            // Hydrate the UTXO object with information about the SLP token.
            utxo.transactionType = 'mint'
            utxo.tokenId = slpData.tokenId
            utxo.tokenType = slpData.tokenType

            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUri
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals

            utxo.mintBatonVout = slpData.mintBatonVout

            // Initial value is null until UTXO can be validated and confirmed
            // to be valid (true) or not (false).
            utxo.isValid = null

            outAry[i] = utxo
          }
        }

        // Handle Send SLP transactions.
        if (txType === 'send') {
          // Filter out any vouts that match.
          // const voutMatch = slpData.spendData.filter(x => utxo.vout === x.vout)
          // console.log(`voutMatch: ${JSON.stringify(voutMatch, null, 2)}`)

          // Figure out what token quantity is represented by this utxo.
          const tokenQty = slpData.amounts[utxo.vout - 1]
          // console.log('tokenQty: ', tokenQty)

          if (!tokenQty) {
            utxo.isValid = false

            outAry[i] = utxo
          } else {
            // If UTXO passes validation, then return formatted token data.

            const genesisData = await this.decodeOpReturn(
              slpData.tokenId,
              decodeOpReturnCache,
              usrObj // pass user data when making an internal call.
            )
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            // Hydrate the UTXO object with information about the SLP token.
            utxo.utxoType = 'token'
            utxo.transactionType = 'send'
            utxo.tokenId = slpData.tokenId
            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUri
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals
            utxo.tokenType = slpData.tokenType

            // Initial value is null until UTXO can be validated and confirmed
            // to be valid (true) or not (false).
            utxo.isValid = null

            // Calculate the real token quantity.

            const tokenQtyBig = new BigNumber(tokenQty).div(
              Math.pow(10, genesisData.decimals)
            )
            // console.log(`tokenQtyBig`, tokenQtyBig.toString())
            utxo.tokenQty = tokenQtyBig.toString()

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            outAry[i] = utxo
          }
        }
      }

      return outAry
    } catch (error) {
      // console.log('_hydrateUtxo error: ', error)
      throw error
    }
  }

  /**
   * @api SLP.Utils.waterfallValidateTxid() waterfallValidateTxid()
   * @apiName waterfallValidateTxid
   * @apiGroup SLP Utils
   * @apiDescription Use multiple validators to validate an SLP TXID.
   *
   * This function aggregates all the available SLP token validation sources.
   * It starts with the fastest, most-efficient source first, and continues
   * to other validation sources until the txid is validated (true or false).
   * If the txid goes through all sources and can't be validated, it will
   * return null.
   *
   * Validation sources from most efficient to least efficient:
   * - SLPDB with whitelist filter
   * - SLPDB general purpose
   * - slp-api
   *
   * Currently only supports a single txid at a time.
   *
   * @apiExample Example usage:
   *
   * // validate single SLP txid
   * (async () => {
   *  try {
   *    let validated = await bchjs.SLP.Utils.waterfallValidateTxid(
   *      "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   *    );
   *    console.log(validated);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * true
   */
  async waterfallValidateTxid (txid, usrObj = null) {
    try {
      // console.log('txid: ', txid)

      const cachedTxValidation = {}

      // If the value has been cached, use the cached version first.
      let isValid = cachedTxValidation[txid]
      if (!isValid && isValid !== false) {
        isValid = null
      } else {
        return isValid
      }

      // There are two possible responses from SLPDB. If SLPDB is functioning
      // correctly, then validateTxid() will return this:
      // isValid: [
      //   {
      //  "txid": "ff0c0354f8d3ddb34fa36f73494eb58ea24f8b8da6904aa8ed43b7a74886c583",
      //  "valid": true
      //   }
      // ]
      //
      // If SLPDB has fallen behind real-time processing, it will return this:
      // isValid: [
      //   null
      // ]
      //
      // Note: validateTxid3() has the same output as validateTxid().
      // validateTxid2() uses slp-validate, which has a different output format.

      // Validate against the whitelist SLPDB first.
      const whitelistResult = await this.validateTxid3(txid, usrObj)
      // console.log(
      //   `whitelist-SLPDB for ${txid}: ${JSON.stringify(
      //     whitelistResult,
      //     null,
      //     2
      //   )}`
      // )

      // Safely retrieve the returned value.
      if (whitelistResult[0] !== null) isValid = whitelistResult[0].valid

      // Exit if isValid is not null.
      if (isValid !== null) {
        // Save to the cache.
        cachedTxValidation[txid] = isValid

        return isValid
      }

      // Try the general SLPDB, if the whitelist returned null.
      const generalResult = await this.validateTxid(txid, usrObj)
      // console.log(
      //   `validateTxid() isValid: ${JSON.stringify(generalResult, null, 2)}`
      // )

      // Safely retrieve the returned value.
      if (generalResult[0] !== null) isValid = generalResult[0].valid

      // Exit if isValid is not null.
      if (isValid !== null) {
        // Save to the cache.
        cachedTxValidation[txid] = isValid

        return isValid
      }

      // If still null, as a last resort, check it against slp-validate
      let slpValidateResult = null
      try {
        slpValidateResult = await this.validateTxid2(txid)
      } catch (err) {
        /* exit quietly */
      }
      // console.log(
      //   `slpValidateResult: ${JSON.stringify(slpValidateResult, null, 2)}`
      // )

      // Exit if isValid is not null.
      if (slpValidateResult !== null) {
        isValid = slpValidateResult.isValid

        // Save to the cache.
        cachedTxValidation[txid] = isValid

        return isValid
      }

      // If isValid is still null, return that value, signaling that the txid
      // could not be validated.
      return isValid
    } catch (error) {
      // This case handles rate limit errors.
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      }

      // console.log('Error in waterfallValidateTxid()')
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

module.exports = Utils
