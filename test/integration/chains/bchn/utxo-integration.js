/*
  Integration tests for the utxo.js library.
*/

const assert = require('chai').assert

const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS()
// const bchjs = new BCHJS({ restURL: 'http://192.168.2.129:3000/v5/' })

describe('#UTXO', () => {
  beforeEach(async () => {
    // sandbox = sinon.createSandbox()

    if (process.env.IS_USING_FREE_TIER) await sleep(3000)
  })

  describe('#hydrateTokenData', () => {
    it('should hydrate token UTXOs', async () => {
      const utxos = [
        {
          txid: '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          vout: 1,
          type: 'token',
          qty: '10000000',
          tokenId: 'a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37',
          address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
        },
        {
          txid: '4fc789405d58ec612c69eba29aa56cf0c7f228349801114138424eb68df4479d',
          vout: 1,
          type: 'token',
          qty: '100000000',
          tokenId: 'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
          address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
        },
        {
          txid: '42054bba4d69bfe7801ece0cffc754194b04239034fdfe9dbe321ef76c9a2d93',
          vout: 5,
          type: 'token',
          qty: '4764',
          tokenId: 'f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f',
          address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
        },
        {
          txid: '06938d0a0d15aa76524ffe61fe111d6d2b2ea9dd8dcd4c7c7744614ced370861',
          vout: 5,
          type: 'token',
          qty: '238',
          tokenId: 'f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f',
          address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
        }
      ]

      const result = await bchjs.Utxo.hydrateTokenData(utxos)
      // console.log('result: ', result)

      assert.property(result[0], 'ticker')
      assert.property(result[0], 'name')
      assert.property(result[0], 'qtyStr')
      assert.property(result[0], 'documentUri')
      assert.property(result[0], 'documentHash')
    })
  })

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
    it('should handle minting batons', async () => {
      const addr = 'simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that minting batons are correctly identified.
      assert.isAbove(result.slpUtxos.type1.mintBatons.length, 0)
    })

    it('should return UTXOs for address with no SLP tokens', async () => {
      const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isAbove(result.bchUtxos.length, 0)
      assert.equal(result.slpUtxos.type1.tokens.length, 0)
    })

    it('should filter Group NFTs', async () => {
      const addr = 'bitcoincash:qrnghwrfgccf3s5e9wnglzxegcnhje9rkcwv2eka33'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.slpUtxos.group.tokens.length, 1)
      // assert.equal(result.slpUtxos.)
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
