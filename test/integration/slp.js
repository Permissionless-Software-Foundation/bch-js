/*
  Integration tests for the bchjs covering SLP tokens.
*/

const chai = require("chai")
const assert = chai.assert

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

describe(`#SLP`, () => {
  describe("#util", () => {
    describe("#list", () => {
      it(`should get information on the Spice token`, async () => {
        const tokenId = `4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf`

        const result = await bchjs.SLP.Utils.list(tokenId)
        //console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAnyKeys(result, [
          "decimals",
          "timestamp",
          "timestamp_unix",
          "versionType",
          "documentUri",
          "symbol",
          "name",
          "containsBaton",
          "id",
          "documentHash",
          "initialTokenQty",
          "blockCreated",
          "blockLastActiveSend",
          "blockLastActiveMint",
          "txnsSinceGenesis",
          "validAddress",
          "totalMinted",
          "totalBurned",
          "circulatingSupply",
          "mintingBatonStatus"
        ])
      })
    })

    describe("#decodeOpReturn", () => {
      it("should decode the OP_RETURN for a SEND txid", async () => {
        const txid =
          "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1"

        const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAllKeys(result, [
          "tokenType",
          "transactionType",
          "tokenId",
          "spendData"
        ])
      })
    })

    describe("#tokenUtxoDetails", () => {
      it("should return token details on a valid UTXO", async () => {
        const utxos = [
          {
            txid:
              "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1",
            vout: 1,
            value: "546",
            height: 597740,
            confirmations: 1,
            satoshis: 546
          }
        ]

        const result = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAllKeys(result[0], [
          "txid",
          "vout",
          "value",
          "height",
          "confirmations",
          "satoshis",
          "utxoType",
          "transactionType",
          "tokenId",
          "tokenTicker",
          "tokenName",
          "tokenDocumentUrl",
          "tokenDocumentHash",
          "decimals",
          "tokenQty",
          "isValid"
        ])
      })

      it("should not choke on this problematic utxo", async () => {
        const utxos = [
          {
            txid:
              "a8eb788b8ddda6faea00e6e2756624b8feb97655363d0400dd66839ea619d36e",
            vout: 1,
            value: "546",
            height: 603282,
            confirmations: 156,
            satoshis: 546
          }
        ]

        const result = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAllKeys(result[0], [
          "txid",
          "vout",
          "value",
          "height",
          "confirmations",
          "satoshis",
          "utxoType",
          "transactionType",
          "tokenId",
          "tokenTicker",
          "tokenName",
          "tokenDocumentUrl",
          "tokenDocumentHash",
          "decimals",
          "tokenQty",
          "isValid"
        ])
      })

      it("should handle BCH and SLP utxos in the same TX", async () => {
        const utxos = [
          {
            txid:
              "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
            vout: 3,
            value: "6816",
            height: 606848,
            confirmations: 13,
            satoshis: 6816
          },
          {
            txid:
              "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
            vout: 2,
            value: "546",
            height: 606848,
            confirmations: 13,
            satoshis: 546
          }
        ]

        const result = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.isArray(result)
        assert.equal(result.length, 2)
        assert.equal(result[0], false)
      })

      // This captures an important corner-case. When an SLP token is created, the
      // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
      it("should return details on minting baton from genesis transaction", async () => {
        const utxos = [
          {
            txid:
              "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
            vout: 3,
            amount: 0.00002015,
            satoshis: 2015,
            height: 594892,
            confirmations: 5
          },
          {
            txid:
              "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
            vout: 2,
            amount: 0.00000546,
            satoshis: 546,
            height: 594892,
            confirmations: 5
          }
        ]

        const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`data: ${JSON.stringify(data, null, 2)}`)

        assert.equal(data[0], false, "Change UTXO marked as false.")

        assert.property(data[1], "txid")
        assert.property(data[1], "vout")
        assert.property(data[1], "amount")
        assert.property(data[1], "satoshis")
        assert.property(data[1], "height")
        assert.property(data[1], "confirmations")
        assert.property(data[1], "tokenType")
        assert.property(data[1], "tokenId")
        assert.property(data[1], "tokenTicker")
        assert.property(data[1], "tokenName")
        assert.property(data[1], "tokenDocumentUrl")
        assert.property(data[1], "tokenDocumentHash")
        assert.property(data[1], "decimals")
        assert.property(data[1], "isValid")
        assert.equal(data[1].isValid, true)
      })

      it("should return details for a MINT token utxo", async () => {
        const utxos = [
          {
            txid:
              "cf4b922d1e1aa56b52d752d4206e1448ea76c3ebe69b3b97d8f8f65413bd5c76",
            vout: 1,
            amount: 0.00000546,
            satoshis: 546,
            height: 600297,
            confirmations: 76
          }
        ]

        const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`data: ${JSON.stringify(data, null, 2)}`)

        assert.property(data[0], "txid")
        assert.property(data[0], "vout")
        assert.property(data[0], "amount")
        assert.property(data[0], "satoshis")
        assert.property(data[0], "height")
        assert.property(data[0], "confirmations")
        assert.property(data[0], "utxoType")
        assert.property(data[0], "transactionType")
        assert.property(data[0], "tokenId")
        assert.property(data[0], "tokenTicker")
        assert.property(data[0], "tokenName")
        assert.property(data[0], "tokenDocumentUrl")
        assert.property(data[0], "tokenDocumentHash")
        assert.property(data[0], "decimals")
        assert.property(data[0], "mintBatonVout")
        assert.property(data[0], "batonStillExists")
        assert.property(data[0], "tokenQty")
        assert.property(data[0], "isValid")
        assert.equal(data[0].isValid, true)
      })

      it("should return details for a simple SEND SLP token utxo", async () => {
        const utxos = [
          {
            txid:
              "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
            vout: 1,
            amount: 0.00000546,
            satoshis: 546,
            height: 596089,
            confirmations: 748
          }
        ]

        const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`data: ${JSON.stringify(data, null, 2)}`)

        assert.property(data[0], "txid")
        assert.property(data[0], "vout")
        assert.property(data[0], "amount")
        assert.property(data[0], "satoshis")
        assert.property(data[0], "height")
        assert.property(data[0], "confirmations")
        assert.property(data[0], "utxoType")
        assert.property(data[0], "tokenId")
        assert.property(data[0], "tokenTicker")
        assert.property(data[0], "tokenName")
        assert.property(data[0], "tokenDocumentUrl")
        assert.property(data[0], "tokenDocumentHash")
        assert.property(data[0], "decimals")
        assert.property(data[0], "tokenQty")
        assert.property(data[0], "isValid")
        assert.equal(data[0].isValid, true)
      })

      it("should handle BCH and SLP utxos in the same TX", async () => {
        const utxos = [
          {
            txid:
              "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
            vout: 3,
            value: "6816",
            height: 606848,
            confirmations: 13,
            satoshis: 6816
          },
          {
            txid:
              "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
            vout: 2,
            value: "546",
            height: 606848,
            confirmations: 13,
            satoshis: 546
          }
        ]

        const result = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.isArray(result)
        assert.equal(result.length, 2)
        assert.equal(result[0], false)
        assert.equal(result[1].isValid, true)
      })

      it("should handle problematic utxos", async () => {
        const utxos = [
          {
            txid:
              "0e3a217fc22612002031d317b4cecd9b692b66b52951a67b23c43041aefa3959",
            vout: 0,
            amount: 0.00018362,
            satoshis: 18362,
            height: 613483,
            confirmations: 124
          },
          {
            txid:
              "67fd3c7c3a6eb0fea9ab311b91039545086220f7eeeefa367fa28e6e43009f19",
            vout: 1,
            amount: 0.00000546,
            satoshis: 546,
            height: 612075,
            confirmations: 1532
          }
        ]

        const result = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.isArray(result)
        assert.equal(result.length, 2)
        assert.equal(result[0], false)
        assert.equal(result[1].isValid, true)
      })

      it("should return false for BCH-only UTXOs", async () => {
        const utxos = [
          {
            txid:
              "a937f792c7c9eb23b4f344ce5c233d1ac0909217d0a504d71e6b1e4efb864a3b",
            vout: 0,
            amount: 0.00001,
            satoshis: 1000,
            confirmations: 0,
            ts: 1578424704
          },
          {
            txid:
              "53fd141c2e999e080a5860887441a2c45e9cbe262027e2bd2ac998fc76e43c44",
            vout: 0,
            amount: 0.00001,
            satoshis: 1000,
            confirmations: 0,
            ts: 1578424634
          }
        ]

        const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`data: ${JSON.stringify(data, null, 2)}`)

        assert.isArray(data)
        assert.equal(false, data[0])
        assert.equal(false, data[1])
      })
    })
  })
})
