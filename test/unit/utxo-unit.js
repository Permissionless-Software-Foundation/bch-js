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
      sandbox.stub(bchjs.Utxo.slp.Utils, 'hydrateUtxos').resolves(mockData.mockHydratedUtxos)

      const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

      const result = await bchjs.Utxo.get(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result.bchUtxos)
      assert.isArray(result.slpUtxos)
      assert.isArray(result.nullUtxos)
    })

    it('should catch and throw an error', async () => {
      try {
        // Force an error
        sandbox.stub(bchjs.Utxo.electrumx, 'utxo').rejects(new Error('test error'))

        const addr = 'simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9'

        await bchjs.Utxo.get(addr)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })
  })
})
