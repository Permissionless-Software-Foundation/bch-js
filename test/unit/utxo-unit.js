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
      sandbox
        .stub(bchjs.Utxo.psfSlpIndexer, 'tx')
        .resolves({ txData: { isValidSlp: false } })

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
      sandbox
        .stub(bchjs.Utxo.psfSlpIndexer, 'tx')
        .resolves({ txData: { isValidSlp: false } })

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

  describe('#isValid', () => {
    it('should return false if getTxOut() returns null', async () => {
      // Mock dependencies
      sandbox.stub(bchjs.Utxo.blockchain, 'getTxOut').resolves(null)

      const utxo = {
        tx_hash: '17754221b29f189532d4fc2ae89fb467ad2dede30fdec4854eb2129b3ba90d7a',
        tx_pos: 0
      }

      const result = await bchjs.Utxo.isValid(utxo)
      // console.log('result: ', result

      assert.equal(result, false)
    })

    it('should return true if getTxOut() returns non-null output', async () => {
      // Mock dependencies
      sandbox.stub(bchjs.Utxo.blockchain, 'getTxOut').resolves({ a: 'b' })

      const utxo = {
        tx_hash: 'b94e1ff82eb5781f98296f0af2488ff06202f12ee92b0175963b8dba688d1b40',
        tx_pos: 0
      }

      const result = await bchjs.Utxo.isValid(utxo)
      // console.log('result: ', result

      assert.equal(result, true)
    })
  })
})
