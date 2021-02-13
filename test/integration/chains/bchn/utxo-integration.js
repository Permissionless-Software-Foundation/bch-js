/*
  Integration tests for the utxo.js library.
*/

const assert = require('chai').assert

const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS()

describe('#UTXO', () => {
  beforeEach(async () => {
    // sandbox = sinon.createSandbox()

    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  describe('#get', () => {
    it('should get hydrated and filtered UTXOs for an address', async () => {
      // const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'
      const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'address')
      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'nullUtxos')
      assert.property(result[0], 'slpUtxos')
      assert.isArray(result[0].bchUtxos)
      assert.isArray(result[0].nullUtxos)
    })

    it('should handle an array of addresses', async () => {
      const addr = [
        'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9',
        'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'
      ]

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'address')
      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'nullUtxos')
      assert.property(result[0], 'slpUtxos')
      assert.isArray(result[0].bchUtxos)
      assert.isArray(result[0].nullUtxos)
    })

    it('should handle NFTs and minting batons', async () => {
      const addr = 'simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'address')
      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'nullUtxos')
      assert.property(result[0], 'slpUtxos')
      assert.isArray(result[0].bchUtxos)
      assert.isArray(result[0].nullUtxos)

      assert.isArray(result[0].slpUtxos.type1.mintBatons)
      assert.isArray(result[0].slpUtxos.type1.tokens)
      assert.isArray(result[0].slpUtxos.nft.groupMintBatons)
      assert.isArray(result[0].slpUtxos.nft.groupTokens)
      assert.isArray(result[0].slpUtxos.nft.tokens)
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
