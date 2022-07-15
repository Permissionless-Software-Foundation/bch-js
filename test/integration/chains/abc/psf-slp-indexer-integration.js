/*
  Integration tests for the psf-slp-indexer.js library, specific to the eCash
  blockchain.
*/

// Global npm libraries
const assert = require('chai').assert

// Local libraries
const BCHJS = require('../../../../src/bch-js')
let bchjs

describe('#psf-slp-indexer', () => {
  beforeEach(async () => {
    // Introduce a delay so that the BVT doesn't trip the rate limits.
    if (process.env.IS_USING_FREE_TIER) await sleep(3000)

    bchjs = new BCHJS()
  })

  describe('#balance', () => {
    it('should get token balance for an ecash address', async () => {
      const addr = 'ecash:qr5c4hfy52zn87484cucvzle5pljz0gtr5vhtw9z09'

      const result = await bchjs.PsfSlpIndexer.balance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result.balance, 'utxos')
      assert.property(result.balance, 'txs')
      assert.property(result.balance, 'balances')
    })
  })
})

// Promise-based sleep function
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
