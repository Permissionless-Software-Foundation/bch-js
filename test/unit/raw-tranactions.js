/*
  TODO:
  -Replace old unit tests mocking axios with the more generalized nock library.
   See the sendRawTransaction test for an example.
  -Create a mocking library of data to compare unit and integration tests.
*/

const assert = require("assert")
const axios = require("axios")
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

const sinon = require("sinon")
const nock = require("nock") // HTTP mocking

// Used for debugging
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

describe("#RawTransactions", () => {
  describe("#decodeRawTransaction", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it("should decode raw transaction", done => {
      const data = {
        txid:
          "4ebd325a4b394cff8c57e8317ccf5a8d0e2bdf1b8526f8aad6c8e43d8240621a",
        hash:
          "4ebd325a4b394cff8c57e8317ccf5a8d0e2bdf1b8526f8aad6c8e43d8240621a",
        size: 10,
        version: 2,
        locktime: 0,
        vin: [],
        vout: []
      }

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bchjs.RawTransactions.decodeRawTransaction("02000000000000000000")
        .then(result => {
          assert.equal(data, result)
        })
        .then(done, done)
    })
  })

  describe("#decodeScript", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it("should decode script", async () => {
      const data = {
        asm: "OP_RETURN 5361746f736869204e616b616d6f746f",
        type: "nulldata",
        p2sh: "bitcoincash:prswx5965nfumux9qng5kj8hw603vcne7q08t8c6jp"
      }

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const result = await bchjs.RawTransactions.decodeScript(
        "6a105361746f736869204e616b616d6f746f"
      )
      //console.log(`result: ${util.inspect(result)}`)

      assert.deepEqual(data, result)
    })
  })

  describe("#getRawTransaction", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it("should get raw transaction", done => {
      const data =
        "020000000160d663961c63c7f0a07f22ec07b8f55b3935bfdbed8b1d8454916e8932fbf109010000006b4830450221008479fab4cfdcb111833d250a43f98ac26d43272b7a29cb1b9a0491eae5c44b3502203448b17253632395c29a7d62058bbfe93efb20fc8636ba6837002d464195aec04121029123258f7cdcd45b864066bcaa9b71f24d5ed1fa1dd36eaf107d8432b5014658ffffffff016d180000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000"

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bchjs.RawTransactions.getRawTransaction(
        "808d617eccaad4f1397fe07a06ec5ed15a0821cf22a3e0931c0c92aef9e572b6"
      )
        .then(result => {
          assert.equal(data, result)
        })
        .then(done, done)
    })
  })

  describe("#sendRawTransaction", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it("should send single raw transaction", async () => {
      const data = "Error: transaction already in block chain"

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const result = await bchjs.RawTransactions.sendRawTransaction(
        "020000000160d663961c63c7f0a07f22ec07b8f55b3935bfdbed8b1d8454916e8932fbf109010000006b4830450221008479fab4cfdcb111833d250a43f98ac26d43272b7a29cb1b9a0491eae5c44b3502203448b17253632395c29a7d62058bbfe93efb20fc8636ba6837002d464195aec04121029123258f7cdcd45b864066bcaa9b71f24d5ed1fa1dd36eaf107d8432b5014658ffffffff016d180000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000"
      )

      assert.equal(data, result)
    })

    it("should send an array of raw transactions", async () => {
      const data = "Error: transaction already in block chain"

      // Mock the http call to rest.bitcoin.com
      nock(`${bchjs.RawTransactions.restURL}`)
        .post(uri => uri.includes(`/`))
        .reply(200, { data: data })

      const result = await bchjs.RawTransactions.sendRawTransaction([
        "020000000160d663961c63c7f0a07f22ec07b8f55b3935bfdbed8b1d8454916e8932fbf109010000006b4830450221008479fab4cfdcb111833d250a43f98ac26d43272b7a29cb1b9a0491eae5c44b3502203448b17253632395c29a7d62058bbfe93efb20fc8636ba6837002d464195aec04121029123258f7cdcd45b864066bcaa9b71f24d5ed1fa1dd36eaf107d8432b5014658ffffffff016d180000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000"
      ])

      assert.equal(data, result.data)
    })
  })
})
