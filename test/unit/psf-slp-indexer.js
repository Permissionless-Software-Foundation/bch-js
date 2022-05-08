const chai = require('chai')
const assert = chai.assert
const axios = require('axios')
const sinon = require('sinon')

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

const mockData = require('./fixtures/psf-slp-indexer-mock')

describe('#PsfSlpIndexer', () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe('#status', () => {
    it('should GET status', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'get').resolves({ data: mockData.status })

      const result = await bchjs.PsfSlpIndexer.status()
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      assert.property(result, 'status')
      assert.property(result.status, 'startBlockHeight')
      assert.property(result.status, 'syncedBlockHeight')
      assert.property(result.status, 'chainBlockHeight')
    })

    it('should handle axios error', async () => {
      try {
        // Stub the network call.
        sandbox.stub(axios, 'get').throws(new Error('test error'))

        await bchjs.PsfSlpIndexer.status()
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    it('should handle request error', async () => {
      try {
        // Stub the network call.
        const testErr = new Error()
        testErr.response = { data: { status: 422 } }
        sandbox.stub(axios, 'get').throws(testErr)

        await bchjs.PsfSlpIndexer.status()
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.equal(err.status, 422)
      }
    })
  })

  describe('#balance', () => {
    it('should GET balance', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.balance })
      const addr = 'bitcoincash:qzmd5vxgh9m22m6fgvm57yd6kjnjl9qnwywsf3583n'
      const result = await bchjs.PsfSlpIndexer.balance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      assert.property(result, 'balance')

      assert.property(result.balance, 'utxos')
      assert.property(result.balance, 'txs')
      assert.property(result.balance, 'balances')
      assert.isArray(result.balance.utxos)
      assert.isArray(result.balance.txs)
      assert.isArray(result.balance.balances)
    })

    it('should throw an error for improper input', async () => {
      try {
        const addr = 12345

        await bchjs.PsfSlpIndexer.balance(addr)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'Input address must be a string.')
      }
    })

    it('should handle axios error', async () => {
      try {
        // Stub the network call.
        sandbox.stub(axios, 'post').throws(new Error('test error'))

        const addr = 'bitcoincash:qzmd5vxgh9m22m6fgvm57yd6kjnjl9qnwywsf3583n'

        await bchjs.PsfSlpIndexer.balance(addr)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    it('should handle request error', async () => {
      try {
        // Stub the network call.
        const testErr = new Error()
        testErr.response = { data: { status: 422 } }
        sandbox.stub(axios, 'post').throws(testErr)

        const addr = 'bitcoincash:qzmd5vxgh9m22m6fgvm57yd6kjnjl9qnwywsf3583n'

        await bchjs.PsfSlpIndexer.balance(addr)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.equal(err.status, 422)
      }
    })
  })

  describe('#tokenStats', () => {
    it('should GET token stats', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.tokenStats })

      const tokenId =
        'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
      const result = await bchjs.PsfSlpIndexer.tokenStats(tokenId)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      assert.property(result, 'tokenData')
      assert.property(result.tokenData, 'type')
      assert.property(result.tokenData, 'ticker')
      assert.property(result.tokenData, 'name')
      assert.property(result.tokenData, 'tokenId')
      assert.property(result.tokenData, 'documentUri')
      assert.property(result.tokenData, 'documentHash')
      assert.property(result.tokenData, 'decimals')
      assert.property(result.tokenData, 'mintBatonIsActive')
      assert.property(result.tokenData, 'tokensInCirculationBN')
      assert.property(result.tokenData, 'tokensInCirculationStr')
      assert.property(result.tokenData, 'blockCreated')
      assert.property(result.tokenData, 'totalBurned')
      assert.property(result.tokenData, 'totalMinted')
      assert.property(result.tokenData, 'txs')
    })

    it('should throw an error for improper input', async () => {
      try {
        const tokenId = 12345

        await bchjs.PsfSlpIndexer.tokenStats(tokenId)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'Input tokenId must be a string.')
      }
    })

    it('should handle axios error', async () => {
      try {
        // Stub the network call.
        sandbox.stub(axios, 'post').throws(new Error('test error'))

        const tokenId =
          'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
        await bchjs.PsfSlpIndexer.tokenStats(tokenId)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    it('should handle request error', async () => {
      try {
        // Stub the network call.
        const testErr = new Error()
        testErr.response = { data: { status: 422 } }
        sandbox.stub(axios, 'post').throws(testErr)

        const tokenId =
          'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
        await bchjs.PsfSlpIndexer.tokenStats(tokenId)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.equal(err.status, 422)
      }
    })
  })

  describe('#tx', () => {
    it('should GET transaction data', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.txData })

      const txid =
        'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
      const result = await bchjs.PsfSlpIndexer.tx(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      assert.property(result, 'txData')
      assert.property(result.txData, 'txid')
      assert.property(result.txData, 'hash')
      assert.property(result.txData, 'version')
      assert.property(result.txData, 'size')
      assert.property(result.txData, 'locktime')
      assert.property(result.txData, 'vin')
      assert.property(result.txData, 'vout')
      assert.property(result.txData, 'hex')
      assert.property(result.txData, 'blockhash')
      assert.property(result.txData, 'confirmations')
      assert.property(result.txData, 'time')
      assert.property(result.txData, 'blocktime')
      assert.property(result.txData, 'blockheight')
      assert.property(result.txData, 'isSlpTx')
      assert.property(result.txData, 'tokenTxType')
      assert.property(result.txData, 'tokenId')
      assert.property(result.txData, 'tokenType')
      assert.property(result.txData, 'tokenTicker')
      assert.property(result.txData, 'tokenName')
      assert.property(result.txData, 'tokenDecimals')
      assert.property(result.txData, 'tokenUri')
      assert.property(result.txData, 'tokenDocHash')
      assert.property(result.txData, 'isValidSlp')
    })

    it('should throw an error for improper input', async () => {
      try {
        const txid = 12345

        await bchjs.PsfSlpIndexer.tx(txid)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'Input txid must be a string.')
      }
    })

    it('should handle axios error', async () => {
      try {
        // Stub the network call.
        sandbox.stub(axios, 'post').throws(new Error('test error'))

        const txid =
          'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
        await bchjs.PsfSlpIndexer.tx(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    it('should get tx from full node if not available from slp indexer', async () => {
      // Stub the call to the SLP indexer.
      const testErr = {
        response: { data: { error: 'Key not found in database' } }
      }
      sandbox.stub(axios, 'post').rejects(testErr)

      // Stub the call to the full node
      sandbox.stub(bchjs.PsfSlpIndexer, 'checkBlacklist').resolves(false)
      sandbox
        .stub(bchjs.PsfSlpIndexer.rawTransaction, 'getTxData')
        .resolves({ txid: 'fakeTxid' })

      const txid =
        'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
      const result = await bchjs.PsfSlpIndexer.tx(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.txData.txid, 'fakeTxid')
      assert.equal(result.txData.isValidSlp, false)
    })

    it('should return isValidSlp=null for blacklisted token', async () => {
      // Stub the call to the SLP indexer.
      const testErr = {
        response: { data: { error: 'Key not found in database' } }
      }
      sandbox.stub(axios, 'post').rejects(testErr)

      // Stub the call to the full node
      sandbox.stub(bchjs.PsfSlpIndexer, 'checkBlacklist').resolves(true)
      sandbox
        .stub(bchjs.PsfSlpIndexer.rawTransaction, 'getTxData')
        .resolves({ txid: 'fakeTxid' })

      const txid =
        'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
      const result = await bchjs.PsfSlpIndexer.tx(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.txData.txid, 'fakeTxid')
      assert.equal(result.txData.isValidSlp, null)
    })
  })

  describe('#checkBlacklist', () => {
    it('should return true if txid contains token in blacklist', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.PsfSlpIndexer.slpUtils, 'decodeOpReturn')
        .resolves(mockData.tokenData01)

      const txid =
        '302113c11b90edc5f36c073d2f8a75e1e0eaf59b56235491a843d3819cd6a85f'

      const result = await bchjs.PsfSlpIndexer.checkBlacklist(txid)
      // console.log('result: ', result)

      assert.equal(result, true)
    })

    it('should return false if there is an error', async () => {
      // Force an error
      sandbox
        .stub(bchjs.PsfSlpIndexer.slpUtils, 'decodeOpReturn')
        .rejects(new Error('test error'))

      const result = await bchjs.PsfSlpIndexer.checkBlacklist()

      assert.equal(result, false)
    })

    it('should return false if there is no tokenId match', async () => {
      // Mock dependencies
      mockData.tokenData01.tokenId = 'abc123'
      sandbox
        .stub(bchjs.PsfSlpIndexer.slpUtils, 'decodeOpReturn')
        .resolves(mockData.tokenData01)

      const txid =
        '302113c11b90edc5f36c073d2f8a75e1e0eaf59b56235491a843d3819cd6a85f'

      const result = await bchjs.PsfSlpIndexer.checkBlacklist(txid)

      assert.equal(result, false)
    })
  })

  describe('#getTokenData', () => {
    it('should GET token data', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.tokenData })

      const tokenId =
        'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
      const result = await bchjs.PsfSlpIndexer.getTokenData(tokenId)
      assert.property(result, 'genesisData')
      assert.property(result, 'immutableData')
      assert.property(result, 'mutableData')

      assert.isObject(result.genesisData)
      assert.isString(result.immutableData)
      assert.isString(result.mutableData)

      assert.property(result.genesisData, 'type')
      assert.property(result.genesisData, 'ticker')
      assert.property(result.genesisData, 'name')
      assert.property(result.genesisData, 'tokenId')
      assert.property(result.genesisData, 'documentUri')
      assert.property(result.genesisData, 'documentHash')
      assert.property(result.genesisData, 'decimals')
      assert.property(result.genesisData, 'mintBatonIsActive')
      assert.property(result.genesisData, 'tokensInCirculationBN')
      assert.property(result.genesisData, 'tokensInCirculationStr')
      assert.property(result.genesisData, 'blockCreated')
      assert.property(result.genesisData, 'totalBurned')
      assert.property(result.genesisData, 'totalMinted')
    })

    it('should throw an error for improper input', async () => {
      try {
        const tokenId = 12345

        await bchjs.PsfSlpIndexer.getTokenData(tokenId)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'Input tokenId must be a string.')
      }
    })

    it('should handle axios error', async () => {
      try {
        // Stub the network call.
        sandbox.stub(axios, 'post').throws(new Error('test error'))

        const tokenId =
          'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
        await bchjs.PsfSlpIndexer.getTokenData(tokenId)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    it('should handle request error', async () => {
      try {
        // Stub the network call.
        const testErr = new Error()
        testErr.response = { data: { status: 422 } }
        sandbox.stub(axios, 'post').throws(testErr)

        const tokenId =
          'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
        await bchjs.PsfSlpIndexer.getTokenData(tokenId)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.equal(err.status, 422)
      }
    })
  })
})
