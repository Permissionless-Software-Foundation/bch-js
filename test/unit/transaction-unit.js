/*
  Unit tests for the transaction.js library.
*/

// Public npm libraries
const assert = require('chai').assert
const sinon = require('sinon')

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

const mockData = require('./fixtures/transaction-mock.js')

describe('#TransactionLib', () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe('#get', () => {
    it('should throw an error if txid is not specified', async () => {
      try {
        await bchjs.Transaction.get()

        assert.fail('Unexpected code path!')
      } catch (err) {
        assert.include(
          err.message,
          'Input to Transaction.get() must be a string containing a TXID.'
        )
      }
    })

    it('should get details about a non-SLP transaction', async () => {
      const txid =
        '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.nonSlpTxDetails)

      const result = await bchjs.Transaction.get(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[0].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')
      assert.property(result, 'isValidSLPTx')
      assert.equal(result.isValidSLPTx, false)
    })

    it('should get details about a SLP transaction', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.slpTxDetails)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.mockOpReturnData01)
        .onCall(1)
        .resolves(mockData.mockOpReturnData02)
        .onCall(2)
        .resolves(mockData.mockOpReturnData03)
        .onCall(3)
        .rejects(new Error('No OP_RETURN'))
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'waterfallValidateTxid')
        .resolves(true)

      const txid =
        '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1'

      const result = await bchjs.Transaction.get(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vout[0], 'tokenQty')
      assert.equal(result.vout[0].tokenQty, null)
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')
      assert.property(result.vin[0], 'tokenQty')
      assert.property(result, 'isValidSLPTx')
      assert.equal(result.isValidSLPTx, true)
    })

    it('should catch and throw error on network error', async () => {
      try {
        const txid =
          '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

        // Force an error
        sandbox
          .stub(bchjs.Transaction.rawTransaction, 'getTxData')
          .rejects(new Error('test error'))

        await bchjs.Transaction.get(txid)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })
  })
})
