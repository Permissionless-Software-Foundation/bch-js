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

describe("#SLP NFT1", () => {
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

  describe("#newNFTGroupOpReturn", () => {
    it("should generate new NFT Group OP_RETURN code", () => {
      const configObj = {
        name: "SLP Test Token",
        ticker: "SLPTEST",
        documentUrl: "https://bchjs.cash",
        documentHash: ""
      }

      const result = bchjs.SLP.NFT1.newNFTGroupOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe("#mintNFTGroupOpReturn", () => {
    it("should generate NFT Group Mint OP_RETURN code", () => {
      const tokenUtxoData = [
        {
          txid:
            "3de3766b10506c9156533f1639979e49d1884521543c13e4af73647df1ed3f76",
          vout: 2,
          value: "546",
          height: 638207,
          confirmations: 63,
          satoshis: 546,
          utxoType: "minting-baton",
          transactionType: "mint",
          tokenId:
            "680967b3f6fe080dbca8dbd370665bd29742e3490db24e2f28d08b424511807e",
          tokenType: 129,
          tokenTicker: "NFTP",
          tokenName: "NFT Parent",
          tokenDocumentUrl: "FullStack.cash",
          tokenDocumentHash: "",
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        },
        {
          txid:
            "3de3766b10506c9156533f1639979e49d1884521543c13e4af73647df1ed3f76",
          vout: 1,
          value: "546",
          height: 638207,
          confirmations: 63,
          satoshis: 546,
          utxoType: "token",
          tokenQty: 10,
          transactionType: "mint",
          tokenId:
            "680967b3f6fe080dbca8dbd370665bd29742e3490db24e2f28d08b424511807e",
          tokenType: 129,
          tokenTicker: "NFTP",
          tokenName: "NFT Parent",
          tokenDocumentUrl: "FullStack.cash",
          tokenDocumentHash: "",
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        }
      ]

      const result = bchjs.SLP.NFT1.mintNFTGroupOpReturn(tokenUtxoData, 10)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe("#generateNFTChildOpReturn", () => {
    it("should generate NFT Genesis OP_RETURN code", () => {
      const configObj = {
        name: "SLP Test Token",
        ticker: "SLPTEST",
        documentUrl: "https://bchjs.cash",
        documentHash: ""
      }

      const result = bchjs.SLP.NFT1.generateNFTChildOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })
})
