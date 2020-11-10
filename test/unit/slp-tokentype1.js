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
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["script", "outputs"])
      assert.isNumber(result.outputs)
    })
  })

  describe("#generateSendOpReturn01", () => {
    it("should generate send OP_RETURN code", () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1000000000,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "ff46ab7730194691b89301e7d5d4805c304db83522e8aa4e5fa8b592c8aecf41",
          tx_pos: 1,
          txid:
            "ff46ab7730194691b89301e7d5d4805c304db83522e8aa4e5fa8b592c8aecf41",
          utxoType: "token",
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        0.000000001
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["script", "outputs"])
      assert.isNumber(result.outputs)
    })
  })

  describe("#generateSendOpReturn02", () => {
    it("should generate send OP_RETURN code", () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 660974,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1000000000,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          tx_pos: 1,
          txid:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          utxoType: "token",
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        1000000000
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["script", "outputs"])
      assert.isNumber(result.outputs)
    })
  })

  describe("#generateSendOpReturn03", () => {
    it("should generate send OP_RETURN code", () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 660974,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1000000000,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          tx_pos: 1,
          txid:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          utxoType: "token",
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        0.000000001
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["script", "outputs"])
      assert.isNumber(result.outputs)
    })
  })

  describe("#generateSendOpReturn04", () => {
    it("should generate send OP_RETURN code", () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 660974,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1000000000,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          tx_pos: 1,
          txid:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1.000000001,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515",
          tx_pos: 1,
          txid:
            "2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1",
          tx_pos: 1,
          txid:
            "4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9",
          tx_pos: 1,
          txid:
            "5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600",
          tx_pos: 1,
          txid:
            "648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600",
          utxoType: "token",
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        1000000004.000000001
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["script", "outputs"])
      assert.isNumber(result.outputs)
    })
  })

  describe("#generateSendOpReturn05", () => {
    it("should generate send OP_RETURN code", () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 660974,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1000000000,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          tx_pos: 1,
          txid:
            "2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1.000000001,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515",
          tx_pos: 1,
          txid:
            "2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1",
          tx_pos: 1,
          txid:
            "4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9",
          tx_pos: 1,
          txid:
            "5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9",
          utxoType: "token",
          value: 546,
          vout: 1
        },
        {
          address: "bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu",
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: "",
          tokenDocumentUrl: "https://cashtabapp.com/",
          tokenId:
            "bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1",
          tokenName: "Cash Tab Points",
          tokenQty: 1,
          tokenTicker: "CTP",
          tokenType: 1,
          transactionType: "send",
          tx_hash:
            "648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600",
          tx_pos: 1,
          txid:
            "648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600",
          utxoType: "token",
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        1000000003.500000001
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

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
