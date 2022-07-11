/*
  Integration tests for the utxo.js library.
*/

const assert = require('chai').assert

const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS()

describe('#UTXO', () => {
  beforeEach(async () => {
    // sandbox = sinon.createSandbox()

    if (process.env.IS_USING_FREE_TIER) await sleep(1500)
  })

  describe('#get', () => {
    it('should get hydrated and filtered UTXOs for an address', async () => {
      const addr = 'ecash:qr5c4hfy52zn87484cucvzle5pljz0gtr5vhtw9z09'
      // const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // assert.isArray(result)
      assert.property(result, 'address')
      assert.property(result, 'bchUtxos')
      assert.property(result, 'nullUtxos')
      assert.property(result, 'slpUtxos')
      assert.isArray(result.bchUtxos)
      assert.isArray(result.nullUtxos)
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
