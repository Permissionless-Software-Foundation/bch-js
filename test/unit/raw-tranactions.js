/*
  TODO:
  -Create a mocking library of data to compare unit and integration tests.
*/

// Public npm libraries
const assert = require('assert')
const assert2 = require('chai').assert
const axios = require('axios')
const sinon = require('sinon')
// const nock = require("nock") // HTTP mocking

// Unit under test (uut)
const BCHJS = require('../../src/bch-js')
// const bchjs = new BCHJS()
let bchjs

// Used for debugging
// const util = require("util")
// util.inspect.defaultOptions = { depth: 1 }

const mockData = require('./fixtures/rawtransaction-mock')

describe('#RawTransactions', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()

    bchjs = new BCHJS()
  })

  afterEach(() => sandbox.restore())

  describe('#decodeRawTransaction', () => {
    it('should decode raw transaction', done => {
      const data = {
        txid:
          '4ebd325a4b394cff8c57e8317ccf5a8d0e2bdf1b8526f8aad6c8e43d8240621a',
        hash:
          '4ebd325a4b394cff8c57e8317ccf5a8d0e2bdf1b8526f8aad6c8e43d8240621a',
        size: 10,
        version: 2,
        locktime: 0,
        vin: [],
        vout: []
      }

      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.RawTransactions.decodeRawTransaction('02000000000000000000')
        .then(result => {
          assert.strictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#decodeScript', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should decode script', async () => {
      const data = {
        asm: 'OP_RETURN 5361746f736869204e616b616d6f746f',
        type: 'nulldata',
        p2sh: 'bitcoincash:prswx5965nfumux9qng5kj8hw603vcne7q08t8c6jp'
      }

      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      const result = await bchjs.RawTransactions.decodeScript(
        '6a105361746f736869204e616b616d6f746f'
      )
      // console.log(`result: ${util.inspect(result)}`)

      assert.deepStrictEqual(data, result)
    })
  })

  describe('#getRawTransaction', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should get raw transaction', done => {
      const data =
        '020000000160d663961c63c7f0a07f22ec07b8f55b3935bfdbed8b1d8454916e8932fbf109010000006b4830450221008479fab4cfdcb111833d250a43f98ac26d43272b7a29cb1b9a0491eae5c44b3502203448b17253632395c29a7d62058bbfe93efb20fc8636ba6837002d464195aec04121029123258f7cdcd45b864066bcaa9b71f24d5ed1fa1dd36eaf107d8432b5014658ffffffff016d180000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000'

      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.RawTransactions.getRawTransaction(
        '808d617eccaad4f1397fe07a06ec5ed15a0821cf22a3e0931c0c92aef9e572b6'
      )
        .then(result => {
          assert.strictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#sendRawTransaction', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should send single raw transaction', async () => {
      const data = 'Error: transaction already in block chain'

      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      const result = await bchjs.RawTransactions.sendRawTransaction(
        '020000000160d663961c63c7f0a07f22ec07b8f55b3935bfdbed8b1d8454916e8932fbf109010000006b4830450221008479fab4cfdcb111833d250a43f98ac26d43272b7a29cb1b9a0491eae5c44b3502203448b17253632395c29a7d62058bbfe93efb20fc8636ba6837002d464195aec04121029123258f7cdcd45b864066bcaa9b71f24d5ed1fa1dd36eaf107d8432b5014658ffffffff016d180000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000'
      )

      assert.strictEqual(data, result)
    })

    // it("should send an array of raw transactions", async () => {
    //   const data = "Error: transaction already in block chain"
    //
    //   // Mock the http call to rest.bitcoin.com
    //   // nock(`${bchjs.RawTransactions.restURL}`)
    //   //   .post(uri => uri.includes(`/`))
    //   //   .reply(200, { data: data })
    //   sandbox.stub(bchjs, "axios").resolves({ data: data })
    //
    //   const result = await bchjs.RawTransactions.sendRawTransaction([
    //     "020000000160d663961c63c7f0a07f22ec07b8f55b3935bfdbed8b1d8454916e8932fbf109010000006b4830450221008479fab4cfdcb111833d250a43f98ac26d43272b7a29cb1b9a0491eae5c44b3502203448b17253632395c29a7d62058bbfe93efb20fc8636ba6837002d464195aec04121029123258f7cdcd45b864066bcaa9b71f24d5ed1fa1dd36eaf107d8432b5014658ffffffff016d180000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000"
    //   ])
    //
    //   assert.strictEqual(data, result.data)
    // })
  })

  describe('#_getInputAddrs', () => {
    it('should return an array of input addresses', async () => {
      sandbox
        .stub(bchjs.RawTransactions, 'getRawTransaction')
        .resolves(mockData.mockParentTx1)

      const result = await bchjs.RawTransactions._getInputAddrs(mockData.mockTx)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.isArray(result)
      assert2.equal(result.length, 1)
      assert2.property(result[0], 'vin')
      assert2.property(result[0], 'address')
    })

    it('should catch and throw and error', async () => {
      try {
        sandbox
          .stub(bchjs.RawTransactions, 'getRawTransaction')
          .rejects(new Error('test error'))

        await bchjs.RawTransactions._getInputAddrs(mockData.mockTx)

        assert.fail('Unexpected result')
      } catch (err) {
        // console.log(err)

        assert2.equal(err.message, 'test error')
      }
    })
  })

  describe('#getTxData', () => {
    it('should return tx data with input addresses', async () => {
      // Mock dependencies
      sandbox.stub(bchjs.RawTransactions, 'getRawTransaction').resolves(mockData.mockTx)
      sandbox.stub(bchjs.RawTransactions, '_getInputAddrs').resolves(mockData.mockGetInputAddrsOutput)

      const txid = '05f7d4a4e25f53d63a360434eb54f221abf159112b7fffc91da1072a079cded3'

      const result = await bchjs.RawTransactions.getTxData(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.property(result.vin[0], 'address')
    })

    it('should throw an error for a non-txid input', async () => {
      try {
        await bchjs.RawTransactions.getTxData(1234)

        assert.fail('Unexpected result')
      } catch (err) {
        // console.log(err)

        assert2.include(err.message, 'Input must be a string or array of strings')
      }
    })

    it('should catch and throw an error', async () => {
      try {
        // Force a network error.
        sandbox
          .stub(bchjs.RawTransactions, 'getRawTransaction')
          .rejects(new Error('test error'))

        const txid = '05f7d4a4e25f53d63a360434eb54f221abf159112b7fffc91da1072a079cded3'

        await bchjs.RawTransactions.getTxData(txid)

        assert.fail('Unexpected result')
      } catch (err) {
        // console.log(err)

        assert2.equal(err.message, 'test error')
      }
    })
  })
})
