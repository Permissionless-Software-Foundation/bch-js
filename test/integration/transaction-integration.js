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

  if (process.env.TESTSLP) {
    describe('#getOld', () => {
      it('should get details about a non-SLP transaction', async () => {
        const txid =
          '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

        const result = await bchjs.Transaction.getOld(txid)
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

        const result = await bchjs.Transaction.getOld(txid)
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

      // it('should get problematic transaction', async () => {
      //   const txid = 'a55515de32577e296c512840bcaabed5823bb773fb4f8fd8e5197cc96cbc54d1'
      //
      //   const result = await bchjs.Transaction.get(txid)
      //   console.log(`result: ${JSON.stringify(result, null, 2)}`)
      // })

      // TX a19f2f395a8b0e15b6202944c56834367d128f1e3630486a4756de53424a46fe has
      // an input TXID (bd84bc1dd5ecd976165892306992401272f6bedeb37d7b2cdbf74fc4a55967a6)
      // that is also a valid SLP tx, but is unrelated. Both TXs pass DAG validation,
      // but for separate tokens.
      it('should get problematic transaction', async () => {
        const txid =
          'a19f2f395a8b0e15b6202944c56834367d128f1e3630486a4756de53424a46fe'

        const result = await bchjs.Transaction.getOld(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        // The token ID should equal the txid for this Vin.
        assert.equal(result.vin[2].txid, result.vin[2].tokenId)
      })
    })
  }
})
