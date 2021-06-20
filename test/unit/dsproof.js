// Public npm libraries
const assert = require('chai').assert
const sinon = require('sinon')

// Unit under test (uut)
const BCHJS = require('../../src/bch-js')
const mockData = require('./fixtures/dsproof-mock')

let bchjs
const txid = 'ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e'
describe('#DSProof', () => {
  let sandbox
  beforeEach(() => {
    bchjs = new BCHJS()
    sandbox = sinon.createSandbox()
  })
  afterEach(() => sandbox.restore())

  describe('#getDSProof', () => {
    it('should throw error if input is not provided', async () => {
      try {
        await bchjs.DSProof.getDSProof()
        assert.equal(false, true, 'unexpected error')
      } catch (err) {
        assert.include(err.message, 'txid is required')
      }
    })
    it('should throw error txid is invalid', async () => {
      try {
        await bchjs.DSProof.getDSProof('txid')
        assert.equal(false, true, 'unexpected error')
      } catch (err) {
        assert.include(err.message, 'txid must be of length 64')
      }
    })
    it('should handle error', async () => {
      try {
        sandbox.stub(bchjs.DSProof.axios, 'get').throws(new Error('test error'))
        await bchjs.DSProof.getDSProof(txid)

        assert.equal(false, true, 'unexpected error')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })
    it('should get double spend proof', async () => {
      try {
        sandbox
          .stub(bchjs.DSProof.axios, 'get')
          .resolves({ data: mockData.dsproof })
        const result = await bchjs.DSProof.getDSProof(txid)

        assert.property(result, 'dspid')
        assert.property(result, 'txid')
        assert.property(result, 'outpoint')
        assert.property(result, 'path')
        assert.property(result, 'descendants')

        assert.property(result.outpoint, 'txid')
        assert.property(result.outpoint, 'vout')
      } catch (error) {
        assert.equal(false, true, 'unexpected error')
      }
    })
  })
})
