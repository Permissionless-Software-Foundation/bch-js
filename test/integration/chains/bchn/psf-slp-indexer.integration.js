/*
  Integration tests for the psf-slp-indexer.js library
*/

const assert = require('chai').assert

const BCHJS = require('../../../../src/bch-js')
let bchjs

describe('#psf-slp-indexer', () => {
  beforeEach(async () => {
    // Introduce a delay so that the BVT doesn't trip the rate limits.
    if (process.env.IS_USING_FREE_TIER) await sleep(3000)

    bchjs = new BCHJS()
  })

  describe('#status', () => {
    it('should return the status of the indexer.', async () => {
      const result = await bchjs.PsfSlpIndexer.status()
      // console.log('result: ', result)

      assert.property(result.status, 'startBlockHeight')
      assert.property(result.status, 'syncedBlockHeight')
      assert.property(result.status, 'chainBlockHeight')
    })
  })

  describe('#balance', () => {
    it('should get balance data for an address.', async () => {
      const addr = 'bitcoincash:qzmd5vxgh9m22m6fgvm57yd6kjnjl9qnwywsf3583n'

      const result = await bchjs.PsfSlpIndexer.balance(addr)
      // console.log('result: ', result)

      assert.property(result.balance, 'utxos')
      assert.property(result.balance, 'txs')
      assert.property(result.balance, 'balances')
    })
  })

  describe('#tokenStats', () => {
    it('should get stats on a token', async () => {
      const tokenId =
        '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0'

      const result = await bchjs.PsfSlpIndexer.tokenStats(tokenId)
      // console.log('result: ', result)

      assert.property(result.tokenData, 'documentUri')
      assert.property(result.tokenData, 'txs')
      assert.property(result.tokenData, 'totalBurned')
    })
  })

  describe('#tx', () => {
    it('should get hydrated tx data', async () => {
      const txid =
        '83361c34cac2ea7f9ca287fca57a96cc0763719f0cdf4850f9696c1e68eb635c'

      const result = await bchjs.PsfSlpIndexer.tx(txid)
      // console.log('result: ', result)

      assert.property(result.txData, 'vin')
      assert.property(result.txData, 'vout')
      assert.property(result.txData, 'isValidSlp')
    })
  })
})

// Promise-based sleep function
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
