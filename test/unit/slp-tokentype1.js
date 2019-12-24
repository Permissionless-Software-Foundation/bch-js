/*
  Unit tests for the TokenType1 library.
*/

const assert = require("chai").assert
const nock = require("nock") // http call mocking
const sinon = require("sinon")
// const axios = require("axios")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = "unit"
// const SERVER = bchjs.restURL

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

// Mock data used for unit tests
// const mockData = require("./fixtures/slp/mock-utils")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = "unit"

describe("#SLP TokenType1", () => {
  let sandbox

  beforeEach(() => {
    // Activate nock if it's inactive.
    if (!nock.isActive()) nock.activate()

    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    // Clean up HTTP mocks.
    nock.cleanAll() // clear interceptor list.
    nock.restore()

    sandbox.restore()
  })

  describe("#generateSendOpReturn", () => {
    it("should generate send OP_RETURN code", async () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          txid:
            "a8eb788b8ddda6faea00e6e2756624b8feb97655363d0400dd66839ea619d36e",
          vout: 2,
          value: "546",
          confirmations: 0,
          satoshis: 546,
          utxoType: "token",
          transactionType: "send",
          tokenId:
            "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
          tokenTicker: "TOK-CH",
          tokenName: "TokyoCash",
          tokenDocumentUrl: "",
          tokenDocumentHash: "",
          decimals: 8,
          tokenQty: 7
        }
      ]

      const result = await bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        1
      )

      assert.hasAllKeys(result, ["script", "outputs"])
      assert.isNumber(result.outputs)
    })
  })

  describe("#generateGenesisOpReturn", () => {
    it("should generate genesis OP_RETURN code", async () => {
      const configObj = {
        name: "SLP Test Token",
        ticker: "SLPTEST",
        documentUrl: "https://bchjs.cash",
        decimals: 8,
        initialQty: 10
      }

      const result = await bchjs.SLP.TokenType1.generateGenesisOpReturn(
        configObj
      )

      assert.isArray(result)
      assert.equal(Buffer.isBuffer(result[1]), true)
    })
  })
})
