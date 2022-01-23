/*
  Integration tests for the transaction.js library.
*/

const assert = require('chai').assert
const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS()

describe('#Transaction', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await bchjs.Util.sleep(1000)
  })

  describe('#get', () => {
    it('should get a tx details for a non-SLP TX with an OP_RETURN', async () => {
      const txid =
        '01517ff1587fa5ffe6f5eb91c99cf3f2d22330cd7ee847e928ce90ca95bf781b'

      const result = await bchjs.Transaction.get(txid)
      // console.log('result: ', result)

      assert.property(result.txData, 'txid')
      assert.property(result.txData, 'vin')
      assert.property(result.txData, 'vout')
      assert.equal(result.txData.isValidSlp, false)
    })
  })
})
