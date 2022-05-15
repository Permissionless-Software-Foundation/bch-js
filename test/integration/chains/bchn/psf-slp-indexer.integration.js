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
    it('should get stats on a token, without tx history', async () => {
      const tokenId =
        '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0'

      const result = await bchjs.PsfSlpIndexer.tokenStats(tokenId)
      // console.log('result: ', result)

      assert.property(result.tokenData, 'documentUri')
      assert.property(result.tokenData, 'totalBurned')
    })

    it('should get stats on a token, with tx history', async () => {
      const tokenId =
        '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0'

      const result = await bchjs.PsfSlpIndexer.tokenStats(tokenId, true)
      // console.log('result: ', result)

      assert.property(result.tokenData, 'documentUri')
      assert.property(result.tokenData, 'txs')
      assert.property(result.tokenData, 'totalBurned')
    })
  })

  describe('#tx', () => {
    it('should get hydrated tx data for an SLP transaction', async () => {
      const txid =
        '947ccb2a0d62ca287bc4b0993874ab0f9f6afd454193e631e2bf84dca66731fc'

      const result = await bchjs.PsfSlpIndexer.tx(txid)
      // console.log('result: ', result)

      assert.property(result.txData, 'vin')
      assert.property(result.txData, 'vout')
      assert.property(result.txData, 'isValidSlp')
      assert.equal(result.txData.isValidSlp, true)
    })

    it('should mark non-SLP transaction as false', async () => {
      const txid =
        '03d6e6b63647ce7b02ecc73dc6d41b485be14a3e20eed4474b8a840358ddf14e'

      const result = await bchjs.PsfSlpIndexer.tx(txid)
      // console.log('result: ', result)

      assert.property(result.txData, 'vin')
      assert.property(result.txData, 'vout')
      assert.property(result.txData, 'isValidSlp')
      assert.equal(result.txData.isValidSlp, false)
    })

    // FlexUSD transactions
    // Currently FlexUSD UTXOs are reported as invalid SLP UTXOs, which means
    // the wallet will burn them. There is a TODO in the code. This test will
    // need to be changed when it is done.
    it('should mark blacklisted token as null', async () => {
      const txid =
        '302113c11b90edc5f36c073d2f8a75e1e0eaf59b56235491a843d3819cd6a85f'

      const result = await bchjs.PsfSlpIndexer.tx(txid)
      // console.log('result: ', result)

      assert.property(result.txData, 'vin')
      assert.property(result.txData, 'vout')
      assert.property(result.txData, 'isValidSlp')
      assert.equal(result.txData.isValidSlp, null)
    })

    it('should throw error for non-existent txid', async () => {
      try {
        const txid =
          '302113c11b90edc5f36c073d2f8a75e1e0eaf59b56235491a843d3819cd6a85e'

        await bchjs.PsfSlpIndexer.tx(txid)
        // console.log('result: ', result)

        assert.fail('Unexpected code path')
      } catch (err) {
        // console.log(err)

        assert.include(err.message, 'No such mempool or blockchain transaction')
      }
    })
  })

  describe('#getTokenData', () => {
    it('should get token data', async () => {
      const tokenId =
        'd9aafa7acb514c597caf440ae268b5e4e955f2687e05f044cdf8fd9550d9a27b'

      // bchjs.PsfSlpIndexer.restURL = 'http://localhost:3000/v5/'
      const result = await bchjs.PsfSlpIndexer.getTokenData(tokenId)
      // console.log('result: ', result)

      assert.property(result, 'genesisData')
      assert.property(result, 'immutableData')
      assert.property(result, 'mutableData')

      assert.isObject(result.genesisData)
      assert.isString(result.immutableData)
      assert.isString(result.mutableData)
    })
  })
})

// Promise-based sleep function
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
