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
          "tokenQty"
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
          "tokenQty"
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
    })
  })
})
