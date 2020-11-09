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
    it("should generate send OP_RETURN code", () => {
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

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(tokenUtxos, 1)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["script", "outputs"])
      assert.isNumber(result.outputs)
    })
  })

  describe("#generateBurnOpReturn", () => {
    it("should generate burn OP_RETURN code", () => {
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

      const result = bchjs.SLP.TokenType1.generateBurnOpReturn(tokenUtxos, 1)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe("#generateGenesisOpReturn", () => {
    it("should generate genesis OP_RETURN code", () => {
      const configObj = {
        name: "SLP Test Token",
        ticker: "SLPTEST",
        documentUrl: "https://bchjs.cash",
        documentHash: "",
        decimals: 8,
        initialQty: 10
      }

      const result = bchjs.SLP.TokenType1.generateGenesisOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })

    it("should work if user does not specify doc hash", () => {
      const configObj = {
        name: "SLP Test Token",
        ticker: "SLPTEST",
        documentUrl: "https://bchjs.cash",
        decimals: 8,
        initialQty: 10
      }

      const result = bchjs.SLP.TokenType1.generateGenesisOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe("#generateMintOpReturn", () => {
    it("should throw error if tokenUtxos is not an array.", () => {
      try {
        bchjs.SLP.TokenType1.generateMintOpReturn({}, 100)

        assert.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert.include(
          err.message,
          `tokenUtxos must be an array`,
          "Expected error message."
        )
      }
    })

    it("should throw error if minting baton is not in UTXOs.", () => {
      try {
        const utxos = [
          {
            txid:
              "ccc6d336399e26d98afcd3821b41fb1535cd50f57063ed7593eaed5108659606",
            vout: 1,
            value: "546",
            height: 637618,
            confirmations: 239,
            satoshis: 546,
            utxoType: "token",
            tokenQty: 100,
            tokenId:
              "ccc6d336399e26d98afcd3821b41fb1535cd50f57063ed7593eaed5108659606",
            tokenTicker: "SLPTEST",
            tokenName: "SLP Test Token",
            tokenDocumentUrl: "https://FullStack.cash",
            tokenDocumentHash: "",
            decimals: 8,
            isValid: true
          }
        ]

        bchjs.SLP.TokenType1.generateMintOpReturn(utxos, 100)

        assert.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert.include(
          err.message,
          `Minting baton could not be found in tokenUtxos array`,
          "Expected error message."
        )
      }
    })

    it("should throw error if tokenId is not included in minting-baton UTXO.", () => {
      try {
        const utxos = [
          {
            txid:
              "9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136",
            vout: 2,
            value: "546",
            height: 637625,
            confirmations: 207,
            satoshis: 546,
            utxoType: "minting-baton",
            tokenTicker: "SLPTEST",
            tokenName: "SLP Test Token",
            tokenDocumentUrl: "https://FullStack.cash",
            tokenDocumentHash: "",
            decimals: 8,
            isValid: true
          }
        ]

        bchjs.SLP.TokenType1.generateMintOpReturn(utxos, 100)

        assert.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert.include(
          err.message,
          `tokenId property not found in mint-baton UTXO`,
          "Expected error message."
        )
      }
    })

    it("should throw error if decimals is not included in minting-baton UTXO.", () => {
      try {
        const utxos = [
          {
            txid:
              "9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136",
            vout: 2,
            value: "546",
            height: 637625,
            confirmations: 207,
            satoshis: 546,
            utxoType: "minting-baton",
            tokenId:
              "9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136",
            tokenTicker: "SLPTEST",
            tokenName: "SLP Test Token",
            tokenDocumentUrl: "https://FullStack.cash",
            tokenDocumentHash: "",
            isValid: true
          }
        ]

        bchjs.SLP.TokenType1.generateMintOpReturn(utxos, 100)

        assert.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert.include(
          err.message,
          `decimals property not found in mint-baton UTXO`,
          "Expected error message."
        )
      }
    })

    it("should generate genesis OP_RETURN code", () => {
      tokenUtxo = [
        {
          txid:
            "9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136",
          vout: 2,
          value: "546",
          height: 637625,
          confirmations: 207,
          satoshis: 546,
          utxoType: "minting-baton",
          tokenId:
            "9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136",
          tokenTicker: "SLPTEST",
          tokenName: "SLP Test Token",
          tokenDocumentUrl: "https://FullStack.cash",
          tokenDocumentHash: "",
          decimals: 8,
          isValid: true
        }
      ]

      const result = bchjs.SLP.TokenType1.generateMintOpReturn(tokenUtxo, 100)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe("#getHexOpReturn", () => {
    it("should return OP_RETURN object ", async () => {
      const tokenUtxos = [
        {
          tokenId:
            "0a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1",
          decimals: 0,
          tokenQty: 2
        }
      ]

      const sendQty = 1.5

      sandbox.stub(bchjs.SLP.TokenType1.axios, "post").resolves({
        data: {
          script:
            "6a04534c500001010453454e44200a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1080000000000000001080000000000000000",
          outputs: 2
        }
      })

      const result = await bchjs.SLP.TokenType1.getHexOpReturn(
        tokenUtxos,
        sendQty
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "script")
      assert.isString(result.script)

      assert.property(result, "outputs")
      assert.isNumber(result.outputs)
    })
  })
})
