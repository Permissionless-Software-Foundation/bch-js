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

  describe('#get', () => {
    it('should get hydrated and filtered UTXOs for an address', async () => {
      // Mock dependencies.
      sandbox.stub(bchjs.Utxo.electrumx, 'utxo').resolves(mockData.mockUtxoData)
      sandbox
        .stub(bchjs.Utxo.slp.Utils, 'hydrateUtxos')
        .resolves(mockData.mockHydratedUtxos)

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

    it('should catch and throw an error', async () => {
      try {
        // Force an error
        sandbox
          .stub(bchjs.Utxo.electrumx, 'utxo')
          .rejects(new Error('test error'))

        const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

        await bchjs.Utxo.get(addr)

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

      const result = await bchjs.Utxo.get(addr)
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

        await bchjs.Utxo.get(addrs)

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
      // Mock dependencies.
      sandbox.stub(bchjs.Utxo.electrumx, 'utxo').resolves(mockData.mockUtxoData)
      sandbox
        .stub(bchjs.Utxo.slp.Utils, 'hydrateUtxosWL')
        .resolves(mockData.mockHydratedUtxos)

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
    })
  })
})
