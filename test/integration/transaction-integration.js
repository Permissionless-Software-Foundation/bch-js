/*
  Integration tests for the transaction.js library.
*/

const assert = require('chai').assert
const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

describe('#Transaction', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await bchjs.Util.sleep(1000)
  })

  describe('#get', () => {
    it('should get details about a non-SLP transaction', async () => {
      const txid =
        '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

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
  })
})
