import assert from 'assert'
import sinon from 'sinon'
import BCHJS from '../../src/bch-js.js'
import { resetCurrentUtxo, sendPayment, selectPaymentRequirements } from '../../src/x402.js'
import Electrumx from '../../src/electrumx.js'
import RawTransactions from '../../src/raw-transactions.js'
import TransactionBuilder from '../../src/transaction-builder.js'

describe('#X402 Integration', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#Constructor Configuration', () => {
    it('should initialize without x402 by default', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      assert.strictEqual(bchjs.wif, '')
      // assert.strictEqual(bchjs.paymentAmountSats, 10000)
      assert.strictEqual(typeof bchjs.paymentAmountSats, 'number')
      assert.ok(Number.isInteger(bchjs.paymentAmountSats) && bchjs.paymentAmountSats > 0)
      assert.strictEqual(bchjs.bchServerURL, 'https://bch.fullstack.cash/v6')
    })

    it('should accept wif in config', () => {
      const testWif = 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/',
        wif: testWif
      })

      assert.strictEqual(bchjs.wif, testWif)
    })

    it('should accept paymentAmountSats in config', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/',
        paymentAmountSats: 5000
      })

      assert.strictEqual(bchjs.paymentAmountSats, 5000)
    })

    it('should accept bchServerURL in config', () => {
      const customUrl = 'http://localhost:5000'
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/',
        bchServerURL: customUrl
      })

      assert.strictEqual(bchjs.bchServerURL, customUrl)
    })

    it('should use default values when config options are not provided', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v6/'
      })

      assert.strictEqual(bchjs.wif, '')
      // assert.strictEqual(bchjs.paymentAmountSats, 10000)
      assert.strictEqual(typeof bchjs.paymentAmountSats, 'number')
      assert.ok(Number.isInteger(bchjs.paymentAmountSats) && bchjs.paymentAmountSats > 0)
      assert.strictEqual(bchjs.bchServerURL, 'https://bch.fullstack.cash/v6')
    })

    it('should read WIF from BCHJSWIF environment variable', () => {
      const testWif = 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
      const originalEnv = process.env.BCHJSWIF
      process.env.BCHJSWIF = testWif

      try {
        const bchjs = new BCHJS({
          restURL: 'http://localhost:3000/v5/'
        })
        assert.strictEqual(bchjs.wif, testWif)
      } finally {
        // Restore original env value
        if (originalEnv === undefined) {
          delete process.env.BCHJSWIF
        } else {
          process.env.BCHJSWIF = originalEnv
        }
      }
    })

    it('should prefer config.wif over BCHJSWIF environment variable', () => {
      const configWif = 'L1XHKhaBAfkr2FJQn3pTfCMxz652WYfmvKj8xDCHCEDV9tWGcbYj'
      const envWif = 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
      const originalEnv = process.env.BCHJSWIF
      process.env.BCHJSWIF = envWif

      try {
        const bchjs = new BCHJS({
          restURL: 'http://localhost:3000/v5/',
          wif: configWif
        })
        assert.strictEqual(bchjs.wif, configWif)
      } finally {
        // Restore original env value
        if (originalEnv === undefined) {
          delete process.env.BCHJSWIF
        } else {
          process.env.BCHJSWIF = originalEnv
        }
      }
    })

    it('should read bchServerURL from BCHJSBCHSERVERURL environment variable', () => {
      const testUrl = 'https://custom-bch-server.example.com'
      const originalEnv = process.env.BCHJSBCHSERVERURL
      process.env.BCHJSBCHSERVERURL = testUrl

      try {
        const bchjs = new BCHJS({
          restURL: 'http://localhost:3000/v5/'
        })
        assert.strictEqual(bchjs.bchServerURL, testUrl)
      } finally {
        // Restore original env value
        if (originalEnv === undefined) {
          delete process.env.BCHJSBCHSERVERURL
        } else {
          process.env.BCHJSBCHSERVERURL = originalEnv
        }
      }
    })

    it('should prefer config.bchServerURL over BCHJSBCHSERVERURL environment variable', () => {
      const configUrl = 'https://config-server.example.com'
      const envUrl = 'https://env-server.example.com'
      const originalEnv = process.env.BCHJSBCHSERVERURL
      process.env.BCHJSBCHSERVERURL = envUrl

      try {
        const bchjs = new BCHJS({
          restURL: 'http://localhost:3000/v5/',
          bchServerURL: configUrl
        })
        assert.strictEqual(bchjs.bchServerURL, configUrl)
      } finally {
        // Restore original env value
        if (originalEnv === undefined) {
          delete process.env.BCHJSBCHSERVERURL
        } else {
          process.env.BCHJSBCHSERVERURL = originalEnv
        }
      }
    })

    it('should keep restURL and bchServerURL independent', () => {
      const customRestURL = 'https://x402-bch.fullstack.cash/v5/'
      const customBchServerURL = 'https://bch.fullstack.cash'
      const bchjs = new BCHJS({
        restURL: customRestURL,
        bchServerURL: customBchServerURL
      })

      assert.strictEqual(bchjs.restURL, customRestURL)
      assert.strictEqual(bchjs.bchServerURL, customBchServerURL)
      // Verify they are different values
      assert.notStrictEqual(bchjs.restURL, bchjs.bchServerURL)
    })

    it('should use default bchServerURL when restURL is customized', () => {
      const customRestURL = 'https://x402-bch.fullstack.cash/v5/'
      const bchjs = new BCHJS({
        restURL: customRestURL
      })

      assert.strictEqual(bchjs.restURL, customRestURL)
      assert.strictEqual(bchjs.bchServerURL, 'https://bch.fullstack.cash/v6')
    })
  })

  describe('#x402 Helper Functions', () => {
    it('should expose createSigner function', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      assert.strictEqual(typeof bchjs.x402.createSigner, 'function')
    })

    it('should expose withPaymentInterceptor function', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      assert.strictEqual(typeof bchjs.x402.withPaymentInterceptor, 'function')
    })

    it('should expose createPaymentHeader function', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      assert.strictEqual(typeof bchjs.x402.createPaymentHeader, 'function')
    })

    it('should expose selectPaymentRequirements function', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      assert.strictEqual(typeof bchjs.x402.selectPaymentRequirements, 'function')
    })
  })

  describe('#Axios Instance', () => {
    it('should have axios available in sub-modules', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      // Check that sub-modules have axios available (from their own import or config)
      assert.ok(bchjs.Control.axios)
      assert.ok(bchjs.Blockchain.axios)
      assert.ok(bchjs.Mining.axios)
      assert.ok(bchjs.Electrumx.axios)
      assert.ok(bchjs.RawTransactions.axios)
      assert.ok(bchjs.Price.axios)
    })

    it('should pass x402-wrapped axios instance when WIF is provided', () => {
      const testWif = 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/',
        wif: testWif
      })

      // All modules should have the same wrapped axios instance
      assert.ok(bchjs.Control.axios)
      assert.ok(bchjs.Blockchain.axios)
      // When WIF is provided, the axios instances should be the same wrapped instance
      assert.strictEqual(bchjs.Control.axios, bchjs.Blockchain.axios)
    })
  })

  describe('#selectPaymentRequirements', () => {
    it('should select BCH utxo payment requirements from accepts array', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      const accepts = [
        {
          scheme: 'exact',
          network: 'base-sepolia',
          maxAmountRequired: '10000'
        },
        {
          scheme: 'utxo',
          network: 'bch',
          minAmountRequired: '1000',
          payTo: 'bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d'
        }
      ]

      const result = bchjs.x402.selectPaymentRequirements(accepts)

      assert.strictEqual(result.scheme, 'utxo')
      assert.strictEqual(result.network, 'bch')
      assert.strictEqual(result.minAmountRequired, '1000')
    })

    it('should throw an error when no BCH requirements found', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })

      const accepts = [
        {
          scheme: 'exact',
          network: 'base-sepolia',
          maxAmountRequired: '10000'
        }
      ]

      assert.throws(() => {
        bchjs.x402.selectPaymentRequirements(accepts)
      }, /No BCH payment requirements found/)
    })
  })

  describe('#payment header and broadcast', () => {
    const testWif = 'Ky54Y7sxkGovqTi5ogipFUToqsz4NCepLn3bitzHyiF3JaYULMbP'
    const paymentRequirements = {
      scheme: 'utxo',
      network: 'bch',
      minAmountRequired: '1000',
      payTo: 'bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d'
    }

    beforeEach(() => {
      resetCurrentUtxo()
    })

    afterEach(() => {
      sandbox.restore()
      resetCurrentUtxo()
    })

    it('should build a signed payment header from a signer', async () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      const header = JSON.parse(await bchjs.x402.createPaymentHeader(
        signer,
        paymentRequirements,
        2,
        'abc',
        0
      ))

      assert.strictEqual(header.x402Version, 2)
      assert.strictEqual(header.accepted.payTo, paymentRequirements.payTo)
      assert.strictEqual(header.payload.authorization.txid, 'abc')
      assert.strictEqual(typeof header.payload.signature, 'string')
      assert.strictEqual(
        bchjs.BitcoinCash.verifyMessage(
          signer.address,
          header.payload.signature,
          JSON.stringify(header.payload.authorization)
        ),
        true
      )
    })

    it('should broadcast a payment from the first large enough UTXO', async () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [
          { value: 1000, tx_pos: 0, tx_hash: '11'.repeat(32) },
          { value: 100000, tx_pos: 1, tx_hash: '22'.repeat(32) }
        ]
      })
      const broadcast = sandbox.stub(RawTransactions.prototype, 'sendRawTransaction').resolves('broadcast-txid')

      const payment = await sendPayment(signer, paymentRequirements, {
        bchServerURL: 'https://bch.fullstack.cash/v6',
        bearerToken: 'token'
      })

      assert.strictEqual(payment.txid, 'broadcast-txid')
      assert.strictEqual(payment.vout, 0)
      assert.strictEqual(payment.satsSent, 25000)
      assert.strictEqual(broadcast.calledOnce, true)
    })

    it('should reject a payment when no UTXO can cover it', async () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [{ value: 1000, tx_pos: 0, tx_hash: '11'.repeat(32) }]
      })

      await assert.rejects(
        () => sendPayment(signer, paymentRequirements, {
          bchServerURL: 'https://bch.fullstack.cash/v6'
        }),
        /Not enough funds/
      )
    })

    it('should pass through responses that are not payment challenges', async () => {
      const calls = []
      const axiosInstance = {
        interceptors: {
          response: {
            use (onSuccess, onError) {
              this.onSuccess = onSuccess
              this.onError = onError
            }
          }
        },
        request (config) {
          calls.push(config)
          return Promise.resolve({ status: 200, config })
        }
      }
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/',
        wif: testWif
      })
      bchjs.x402.withPaymentInterceptor(axiosInstance, bchjs.x402.createSigner(testWif, 25000))

      const response = await axiosInstance.interceptors.response.onSuccess({ status: 200 })
      assert.strictEqual(response.status, 200)

      await assert.rejects(
        () => axiosInstance.interceptors.response.onError({ response: { status: 500 } }),
        (err) => err.response.status === 500
      )
      assert.strictEqual(calls.length, 0)
    })

    it('should retry a 402 challenge with a payment signature', async () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v5/'
      })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [{ value: 100000, tx_pos: 1, tx_hash: '22'.repeat(32) }]
      })
      sandbox.stub(RawTransactions.prototype, 'sendRawTransaction').resolves('broadcast-txid')

      const requests = []
      const axiosInstance = {
        interceptors: {
          response: {
            use (onSuccess, onError) {
              this.onError = onError
            }
          }
        },
        request (config) {
          requests.push(config.headers['PAYMENT-SIGNATURE'])
          if (requests.length === 1) {
            const error = new Error('payment required')
            error.response = { status: 402, headers: {}, data: {} }
            error.config = config
            return Promise.reject(error)
          }
          return Promise.resolve({ status: 200, config })
        }
      }
      bchjs.x402.withPaymentInterceptor(axiosInstance, signer, {
        bchServerURL: 'https://bch.fullstack.cash/v6'
      })

      const challenge = {
        response: {
          status: 402,
          headers: {},
          data: {
            x402Version: 2,
            accepts: [paymentRequirements]
          }
        },
        config: { headers: {} }
      }
      const response = await axiosInstance.interceptors.response.onError(challenge)

      assert.strictEqual(response.status, 200)
      assert.strictEqual(requests.length, 2)
      const paid = JSON.parse(requests[1])
      assert.strictEqual(paid.payload.authorization.txid, 'broadcast-txid')
    })

    it('should select mainnet and bip122 requirements and ignore empty entries', () => {
      const mainnet = selectPaymentRequirements([
        null,
        { scheme: 'exact', network: 'bch' },
        { scheme: 'utxo', network: 'bip122:000000000000000000651ef99cb9fcbe', amount: '5' }
      ])
      const other = selectPaymentRequirements([
        { scheme: 'utxo', network: 'bip122:abcdef' }
      ])

      assert.strictEqual(mainnet.amount, '5')
      assert.strictEqual(other.network, 'bip122:abcdef')
      assert.throws(() => selectPaymentRequirements(), /No BCH payment requirements found/)
    })

    it('should build a check-my-tab header with optional resource data', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      const header = JSON.parse(await bchjs.x402.createPaymentHeader(
        signer,
        { amount: '5000', payTo: paymentRequirements.payTo, asset: 'BCH' },
        undefined,
        '*',
        null,
        { url: '/paid' },
        { note: true }
      ))

      assert.strictEqual(header.x402Version, 2)
      assert.strictEqual(header.accepted.scheme, 'utxo')
      assert.strictEqual(header.accepted.network, 'bip122:000000000000000000651ef99cb9fcbe')
      assert.deepStrictEqual(header.accepted.extra, {})
      assert.deepStrictEqual(header.resource, { url: '/paid' })
      assert.deepStrictEqual(header.extensions, { note: true })
      assert.strictEqual(header.payload.authorization.txid, '*')
      assert.strictEqual(header.payload.authorization.vout, null)
      assert.strictEqual(header.payload.authorization.amount, null)
    })

    it('should normalize the server URL and fall back to the required amount', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 0)
      const seen = {}
      sandbox.stub(Electrumx.prototype, 'utxo').callsFake(async function () {
        seen.restURL = this.restURL
        seen.authToken = this.authToken
        return { utxos: [{ value: '100000', tx_pos: 0, tx_hash: '33'.repeat(32) }] }
      })
      sandbox.stub(RawTransactions.prototype, 'sendRawTransaction').resolves('amount-txid')

      const payment = await sendPayment(signer, {
        amount: '4000',
        payTo: paymentRequirements.payTo
      }, { bchServerURL: 'https://bch.fullstack.cash/v6/' })

      assert.strictEqual(seen.restURL, 'https://bch.fullstack.cash/v6/')
      assert.strictEqual(seen.authToken, '')
      assert.strictEqual(payment.satsSent, 4000)
    })

    it('should install an address codec when the builder has none', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      const previous = TransactionBuilder._address
      TransactionBuilder._address = undefined
      sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [{ value: 100000, tx_pos: 0, tx_hash: '44'.repeat(32) }]
      })
      sandbox.stub(RawTransactions.prototype, 'sendRawTransaction').resolves('codec-txid')

      try {
        const payment = await sendPayment(signer, paymentRequirements, {
          bchServerURL: 'https://bch.fullstack.cash/v6'
        })
        assert.strictEqual(payment.txid, 'codec-txid')
        assert.ok(TransactionBuilder._address)
      } finally {
        TransactionBuilder._address = previous
      }
    })

    it('should reject a payment that cannot pay the mining fee', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [{ value: 25000, tx_pos: 0, tx_hash: '55'.repeat(32) }]
      })

      await assert.rejects(
        () => sendPayment(signer, paymentRequirements, {
          bchServerURL: 'https://bch.fullstack.cash/v6'
        }),
        /Not enough BCH to complete transaction/
      )
    })

    it('should reject a payment when the UTXO lookup fails or returns nothing', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)

      await assert.rejects(
        () => sendPayment(signer, paymentRequirements, {}),
        /bchServerURL is required/
      )

      sandbox.stub(Electrumx.prototype, 'utxo').rejects(new Error('down'))
      await assert.rejects(
        () => sendPayment(signer, paymentRequirements, {
          bchServerURL: 'https://bch.fullstack.cash/v6'
        }),
        /Error retrieving UTXOs/
      )
      Electrumx.prototype.utxo.restore()

      sandbox.stub(Electrumx.prototype, 'utxo').resolves({})
      await assert.rejects(
        () => sendPayment(signer, paymentRequirements, {
          bchServerURL: 'https://bch.fullstack.cash/v6'
        }),
        /Not enough funds/
      )
    })

    function challengeClient (responses) {
      const requests = []
      const axiosInstance = {
        interceptors: {
          response: {
            use (onSuccess, onError) {
              this.onError = onError
            }
          }
        },
        request (config) {
          requests.push(config)
          const next = responses.shift()
          if (next instanceof Error) return Promise.reject(next)
          return Promise.resolve(next)
        }
      }
      return { axiosInstance, requests }
    }

    it('should reject challenges that cannot be paid', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      const { axiosInstance } = challengeClient([])
      const selector = () => paymentRequirements
      bchjs.x402.withPaymentInterceptor(axiosInstance, signer, selector, {
        bchServerURL: 'https://bch.fullstack.cash/v6'
      })
      const onError = axiosInstance.interceptors.response.onError

      await assert.rejects(
        () => onError(new Error('offline')),
        /offline/
      )
      await assert.rejects(
        () => onError({ response: { status: 402 }, config: {} }),
        /Missing axios request configuration/
      )
      await assert.rejects(
        () => onError({
          response: { status: 402, data: {} },
          config: { headers: {}, __is402Retry: true }
        }),
        (err) => err.response.status === 402
      )
      await assert.rejects(
        () => onError({
          response: { status: 402, headers: {}, data: {} },
          config: { headers: {} }
        }),
        /No payment requirements found/
      )
      await assert.rejects(
        () => onError({
          response: { status: 402, headers: {}, data: { accepts: 'nope' } },
          config: { headers: {} }
        }),
        /No payment requirements found/
      )
    })

    it('should read a payment challenge from the response header', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [{ value: 100000, tx_pos: 1, tx_hash: '66'.repeat(32) }]
      })
      sandbox.stub(RawTransactions.prototype, 'sendRawTransaction').resolves('header-txid')
      const encoded = Buffer.from(JSON.stringify({
        accepts: [paymentRequirements],
        resource: { url: '/paid' },
        extensions: { note: true }
      })).toString('base64')
      const { axiosInstance, requests } = challengeClient([
        Object.assign(new Error('still required'), {
          response: { status: 402, data: {} },
          config: null
        }),
        { status: 200 }
      ])
      requests.length = 0
      bchjs.x402.withPaymentInterceptor(axiosInstance, signer, {
        bchServerURL: 'https://bch.fullstack.cash/v6'
      })

      const response = await axiosInstance.interceptors.response.onError({
        response: {
          status: 402,
          headers: { 'PAYMENT-REQUIRED': encoded },
          data: { accepts: 'not-an-array' }
        },
        config: { headers: {} }
      })

      assert.strictEqual(response.status, 200)
      const paid = JSON.parse(requests[1].headers['PAYMENT-SIGNATURE'])
      assert.strictEqual(paid.payload.authorization.txid, 'header-txid')
      assert.deepStrictEqual(paid.resource, { url: '/paid' })
      assert.deepStrictEqual(paid.extensions, { note: true })
    })

    it('should fall through when the payment header is not JSON', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [{ value: 100000, tx_pos: 1, tx_hash: '77'.repeat(32) }]
      })
      sandbox.stub(RawTransactions.prototype, 'sendRawTransaction').resolves('body-txid')
      const checkMyTabFailure = new Error('nope')
      checkMyTabFailure.response = { status: 500 }
      const { axiosInstance, requests } = challengeClient([
        checkMyTabFailure
      ])
      bchjs.x402.withPaymentInterceptor(axiosInstance, signer, {
        bchServerURL: 'https://bch.fullstack.cash/v6'
      })

      await assert.rejects(
        () => axiosInstance.interceptors.response.onError({
          response: {
            status: 402,
            headers: { 'payment-required': Buffer.from('not-json').toString('base64') },
            data: { accepts: [paymentRequirements] }
          },
          config: { headers: {} }
        }),
        (err) => err.response.status === 500
      )
      assert.strictEqual(requests.length, 1)
    })

    it('should spend a saved output before broadcasting another payment', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      const utxo = sandbox.stub(Electrumx.prototype, 'utxo').resolves({
        utxos: [{ value: 100000, tx_pos: 1, tx_hash: '88'.repeat(32) }]
      })
      sandbox.stub(RawTransactions.prototype, 'sendRawTransaction').resolves('saved-txid')
      const stillRequired = new Error('payment required')
      stillRequired.response = { status: 402, headers: {}, data: {} }
      const { axiosInstance, requests } = challengeClient([
        stillRequired,
        { status: 200 },
        { status: 200 }
      ])
      bchjs.x402.withPaymentInterceptor(axiosInstance, signer, {
        bchServerURL: 'https://bch.fullstack.cash/v6'
      })
      const onError = axiosInstance.interceptors.response.onError
      const challenge = () => ({
        response: { status: 402, headers: {}, data: { accepts: [paymentRequirements] } },
        config: { headers: {} }
      })

      await onError(challenge())
      await onError(challenge())

      assert.strictEqual(utxo.callCount, 1)
      assert.strictEqual(JSON.parse(requests[2].headers['PAYMENT-SIGNATURE']).payload.authorization.txid, 'saved-txid')
    })

    it('should clear a check-my-tab flag and reject a failed payment', async () => {
      const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
      const signer = bchjs.x402.createSigner(testWif, 25000)
      sandbox.stub(Electrumx.prototype, 'utxo').rejects(new Error('down'))
      const stillRequired = new Error('payment required')
      stillRequired.response = { status: 402, data: {} }
      const { axiosInstance } = challengeClient([stillRequired])
      bchjs.x402.withPaymentInterceptor(axiosInstance, signer, {
        bchServerURL: 'https://bch.fullstack.cash/v6'
      })

      await assert.rejects(
        () => axiosInstance.interceptors.response.onError({
          response: { status: 402, headers: {}, data: { accepts: [paymentRequirements] } },
          config: { headers: {}, __is402CheckMyTab: true }
        }),
        /Error retrieving UTXOs/
      )
    })
  })
})
