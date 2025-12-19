import assert from 'assert'
import sinon from 'sinon'
import BCHJS from '../../src/bch-js.js'

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
      assert.strictEqual(bchjs.paymentAmountSats, 20000)
      assert.strictEqual(bchjs.bchServerURL, 'https://bch.fullstack.cash')
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
      assert.strictEqual(bchjs.paymentAmountSats, 20000)
      assert.strictEqual(bchjs.bchServerURL, 'https://bch.fullstack.cash')
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
      assert.strictEqual(bchjs.bchServerURL, 'https://bch.fullstack.cash')
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
})
