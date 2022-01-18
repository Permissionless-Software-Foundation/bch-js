/*
  Integration tests for the utxo.js library.
*/

const assert = require('chai').assert

const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS()

describe('#UTXO', () => {
  beforeEach(async () => {
    // sandbox = sinon.createSandbox()

    if (process.env.IS_USING_FREE_TIER) await sleep(3000)
  })
  /*
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

    it('should use the whitelist when flag is set', async () => {
      const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'
      const useWhitelist = true

      const result = await bchjs.Utxo.get(addr, useWhitelist)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'address')
      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'nullUtxos')
      assert.property(result[0], 'slpUtxos')
      assert.isArray(result[0].bchUtxos)
      assert.isArray(result[0].nullUtxos)

      // Most token UTXOs should end up in the nullUtxos array.
      assert.isAbove(result[0].bchUtxos.length, 0)
      assert.isAbove(result[0].nullUtxos.length, 1)
    })
  })
*/
  describe('#get', () => {
    it('should hydrate address with BCH and SLP UTXOs', async () => {
      const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert expected properties exist.
      assert.property(result, 'address')
      assert.property(result, 'bchUtxos')
      assert.property(result, 'slpUtxos')
      assert.property(result.slpUtxos, 'type1')
      assert.property(result.slpUtxos, 'nft')
      assert.property(result, 'nullUtxos')

      assert.isAbove(result.bchUtxos.length, 0)
      assert.isAbove(result.slpUtxos.type1.tokens.length, 0)
      assert.equal(result.slpUtxos.type1.mintBatons.length, 0)
    })

    // TODO: NFTs are currently not identified as different than normal BCH UTXOs.
    // The psf-slp-indexer needs to be updated to fix this issue.
    it('should handle NFTs and minting batons', async () => {
      const addr = 'simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that minting batons are correctly identified.
      assert.isAbove(result.slpUtxos.type1.mintBatons.length, 0)
    })
  })
  /*
  describe('#findBiggestUtxo', () => {
    it('should sort UTXOs from Electrumx', async () => {
      const addr = 'bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z'

      const electrumxUtxos = await bchjs.Electrumx.utxo(addr)
      // console.log(`Electrumx utxos: ${JSON.stringify(electrumxUtxos, null, 2)}`)

      const result = bchjs.Utxo.findBiggestUtxo(electrumxUtxos.utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'satoshis')
      assert.equal(result.satoshis, 800)
    })

    it('should sort UTXOs from Utxos.get()', async () => {
      const addr = 'bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z'

      const utxos = await bchjs.Utxo.get(addr)
      // console.log(`utxos: ${JSON.stringify(utxos, null, 2)}`)

      const result = bchjs.Utxo.findBiggestUtxo(utxos[0].bchUtxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'satoshis')
      assert.equal(result.satoshis, 800)
    })
  })
*/
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
