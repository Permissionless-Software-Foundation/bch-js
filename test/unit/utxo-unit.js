/*
  Unit tests for the utxo.js library.
*/

const sinon = require('sinon')
const assert = require('chai').assert

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

const mockData = require('./fixtures/utxo-mocks')

describe('#utxo', () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe('#getOld', () => {
    it('should get hydrated and filtered UTXOs for an address', async () => {
      // Mock dependencies.
      sandbox.stub(bchjs.Utxo.electrumx, 'utxo').resolves(mockData.mockUtxoData)
      sandbox
        .stub(bchjs.Utxo.slp.Utils, 'hydrateUtxos')
        .resolves(mockData.mockHydratedUtxos)

      const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

      const result = await bchjs.Utxo.getOld(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'address')
      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'nullUtxos')
      assert.property(result[0], 'slpUtxos')
      assert.isArray(result[0].bchUtxos)
      assert.isArray(result[0].nullUtxos)
    })

    it('should catch and throw an error', async () => {
      try {
        // Force an error
        sandbox
          .stub(bchjs.Utxo.electrumx, 'utxo')
          .rejects(new Error('test error'))

        const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

        await bchjs.Utxo.getOld(addr)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    it('should handle an array of addresses', async () => {
      // Mock dependencies.
      sandbox.stub(bchjs.Utxo.electrumx, 'utxo').resolves({ utxos: {} })
      sandbox
        .stub(bchjs.Utxo.slp.Utils, 'hydrateUtxos')
        .resolves(mockData.mockTwoHydratedAddrs)

      const addr = [
        'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9',
        'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'
      ]

      const result = await bchjs.Utxo.getOld(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.equal(result.length, 2)
      assert.property(result[0], 'address')
      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'nullUtxos')
      assert.property(result[0], 'slpUtxos')
      assert.isArray(result[0].bchUtxos)
      assert.isArray(result[0].nullUtxos)
    })

    it('should throw an error for array of 21 elements', async () => {
      try {
        const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

        const addrs = []
        for (let i = 0; i < 21; i++) {
          addrs.push(addr)
        }

        await bchjs.Utxo.getOld(addrs)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'Too many elements, 20 max.')
      }
    })

    it('should handle NFTs and minting batons', async () => {
      // Mock dependencies.
      sandbox.stub(bchjs.Utxo.electrumx, 'utxo').resolves({ utxos: {} })
      sandbox
        .stub(bchjs.Utxo.slp.Utils, 'hydrateUtxos')
        .resolves(mockData.mockEveryUtxoType)

      const addr = 'simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj'

      const result = await bchjs.Utxo.getOld(addr)
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
      // Mock dependencies.
      sandbox.stub(bchjs.Utxo.electrumx, 'utxo').resolves(mockData.mockUtxoData)
      sandbox
        .stub(bchjs.Utxo.slp.Utils, 'hydrateUtxosWL')
        .resolves(mockData.mockHydratedUtxos)

      const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'
      const useWhitelist = true

      const result = await bchjs.Utxo.getOld(addr, useWhitelist)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'address')
      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'nullUtxos')
      assert.property(result[0], 'slpUtxos')
      assert.isArray(result[0].bchUtxos)
      assert.isArray(result[0].nullUtxos)
    })
  })

  describe('#findBiggestUtxo', () => {
    it('should throw error for non-array input', async () => {
      try {
        await bchjs.Utxo.findBiggestUtxo({})

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(
          err.message,
          'utxos input to findBiggestUtxo() must be an array'
        )
      }
    })

    it('should throw an error if input does not have a value or satoshis property', async () => {
      try {
        const badUtxos = [
          {
            height: 0,
            tx_hash:
              '192f5037bb3822afd92d6b6ab51842a5dcfbe6bff783290057342da1f27ed414',
            tx_pos: 0
          }
        ]

        await bchjs.Utxo.findBiggestUtxo(badUtxos)
      } catch (err) {
        assert.include(
          err.message,
          'UTXOs require a satoshis or value property for findBiggestUtxo()'
        )
      }
    })

    it('should sort UTXOs from Electrumx', async () => {
      const result = bchjs.Utxo.findBiggestUtxo(mockData.electrumxUtxos.utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'satoshis')
      assert.equal(result.satoshis, 800)
    })
  })

  describe('#hydrateTokenData', () => {
    it('should hydrate token UTXOs', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Utxo.psfSlpIndexer, 'tokenStats')
        .onCall(0)
        .resolves(mockData.genesisData01)
        .onCall(1)
        .resolves(mockData.genesisData02)
        .onCall(2)
        .resolves(mockData.genesisData03)

      const result = await bchjs.Utxo.hydrateTokenData(mockData.tokenUtxos01)
      // console.log('result: ', result)

      assert.equal(result.length, 4)
      assert.property(result[0], 'qtyStr')
      assert.property(result[0], 'ticker')
      assert.property(result[0], 'name')
      assert.property(result[0], 'documentUri')
      assert.property(result[0], 'documentHash')
    })

    it('should should catch and throw errors', async () => {
      try {
        // Force error
        sandbox
          .stub(bchjs.Utxo.psfSlpIndexer, 'tokenStats')
          .rejects(new Error('test error'))

        await bchjs.Utxo.hydrateTokenData(mockData.tokenUtxos01)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(err.message, 'test error')
      }
    })
  })

  describe('#get', () => {
    it('should throw an error if input is not a string', async () => {
      try {
        const addr = 123

        await bchjs.Utxo.get(addr)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'address input must be a string')
      }
    })

    it('should return UTXO information', async () => {
      // mock dependencies
      sandbox
        .stub(bchjs.Utxo.electrumx, 'utxo')
        .resolves(mockData.fulcrumUtxos01)
      sandbox
        .stub(bchjs.Utxo.psfSlpIndexer, 'balance')
        .resolves(mockData.psfSlpIndexerUtxos01)
      // Mock function to return the same input. Good enough for this test.
      sandbox.stub(bchjs.Utxo, 'hydrateTokenData').resolves(x => x)

      const addr = 'simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert expected properties exist
      assert.property(result, 'address')
      assert.property(result, 'bchUtxos')
      assert.property(result, 'slpUtxos')
      assert.property(result.slpUtxos, 'type1')
      assert.property(result.slpUtxos.type1, 'tokens')
      assert.property(result.slpUtxos.type1, 'mintBatons')
      assert.property(result.slpUtxos, 'nft')
      assert.property(result, 'nullUtxos')

      assert.equal(result.bchUtxos.length, 4)
      assert.equal(result.slpUtxos.type1.tokens.length, 1)
      assert.equal(result.slpUtxos.type1.mintBatons.length, 1)
      assert.equal(result.nullUtxos.length, 0)
    })

    it('should handle an address with no SLP UTXOs', async () => {
      // mock dependencies
      sandbox
        .stub(bchjs.Utxo.electrumx, 'utxo')
        .resolves(mockData.fulcrumUtxos02)

      // Force psf-slp-indexer to return no UTXOs
      sandbox
        .stub(bchjs.Utxo.psfSlpIndexer, 'balance')
        .rejects(mockData.noUtxoErr)

      // Mock function to return the same input. Good enough for this test.
      sandbox.stub(bchjs.Utxo, 'hydrateTokenData').resolves(() => [])

      const addr = 'simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.bchUtxos.length, 1)
      assert.equal(result.slpUtxos.type1.tokens.length, 0)
      assert.equal(result.slpUtxos.type1.mintBatons.length, 0)
      assert.equal(result.nullUtxos.length, 0)
    })
  })
})
