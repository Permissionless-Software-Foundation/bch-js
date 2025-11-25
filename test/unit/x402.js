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
      const bchjs = new BCHJS()

      assert.strictEqual(bchjs.wif, '')
      assert.strictEqual(bchjs.paymentAmountSats, 2000)
      assert.strictEqual(bchjs.bchServerURL, 'http://free-bch.fullstack.cash')
    })

    it('should accept wif in config', () => {
      const testWif = 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
      const bchjs = new BCHJS({
        wif: testWif
      })

      assert.strictEqual(bchjs.wif, testWif)
    })

    it('should accept paymentAmountSats in config', () => {
      const bchjs = new BCHJS({
        paymentAmountSats: 5000
      })

      assert.strictEqual(bchjs.paymentAmountSats, 5000)
    })

    it('should accept bchServerURL in config', () => {
      const customUrl = 'http://localhost:5000'
      const bchjs = new BCHJS({
        bchServerURL: customUrl
      })

      assert.strictEqual(bchjs.bchServerURL, customUrl)
    })

    it('should use default values when config options are not provided', () => {
      const bchjs = new BCHJS({
        restURL: 'http://localhost:3000/v6/'
      })

      assert.strictEqual(bchjs.wif, '')
      assert.strictEqual(bchjs.paymentAmountSats, 2000)
      assert.strictEqual(bchjs.bchServerURL, 'http://free-bch.fullstack.cash')
    })
  })

  describe('#x402 Helper Functions', () => {
    it('should expose createSigner function', () => {
      const bchjs = new BCHJS()

      assert.strictEqual(typeof bchjs.x402.createSigner, 'function')
    })

    it('should expose withPaymentInterceptor function', () => {
      const bchjs = new BCHJS()

      assert.strictEqual(typeof bchjs.x402.withPaymentInterceptor, 'function')
    })

    it('should expose createPaymentHeader function', () => {
      const bchjs = new BCHJS()

      assert.strictEqual(typeof bchjs.x402.createPaymentHeader, 'function')
    })

    it('should expose selectPaymentRequirements function', () => {
      const bchjs = new BCHJS()

      assert.strictEqual(typeof bchjs.x402.selectPaymentRequirements, 'function')
    })
  })

  describe('#Axios Instance', () => {
    it('should have axios available in sub-modules', () => {
      const bchjs = new BCHJS()

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
      const bchjs = new BCHJS()

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
      const bchjs = new BCHJS()

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
