/*
  Integration tests for bchjs dsproof library.
*/

const assert = require('chai').assert

const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS()

describe('#DSProof', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await bchjs.Util.sleep(1000)
  })

  describe('#getDSProof', () => {
    it('should get TX info from the full node', async () => {
      const txid =
        'ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e'
      const result = await bchjs.DSProof.getDSProof(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result, null)
    })
  })
})
