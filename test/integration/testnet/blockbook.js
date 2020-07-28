/*
  Integration tests for the Blockbook library.

*/

const chai = require("chai")
const assert = chai.assert

const RESTURL = process.env.RESTURL
  ? process.env.RESTURL
  : `https://tapi.fullstack.cash/v3/`
// if (process.env.RESTURL) RESTURL = process.env.RESTURL

const BCHJS = require("../../../src/bch-js")
// const bchjs = new BCHJS({ restURL: `https://testnet.bchjs.cash/v3/` })
const bchjs = new BCHJS({ restURL: RESTURL, apiToken: process.env.BCHJSTOKEN })
// const bchjs = new BCHJS({ restURL: RESTURL })
//const axios = require("axios")

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe(`#Blockbook`, () => {
  describe(`#Balance`, () => {
    it(`should GET balance for a single address`, async () => {
      const addr = "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"

      const result = await bchjs.Blockbook.balance(addr)
      // console.log(`result: ${util.inspect(result)}`)

      assert.hasAnyKeys(result, [
        "page",
        "totalPages",
        "itemsOnPage",
        "address",
        "balance",
        "totalReceived",
        "totalSent",
        "unconfirmedBalance",
        "unconfirmedTxs",
        "txs",
        "txids"
      ])
      assert.isArray(result.txids)
    })

    it(`should POST request balances for an array of addresses`, async () => {
      const addr = [
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2",
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"
      ]

      const result = await bchjs.Blockbook.balance(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "page",
        "totalPages",
        "itemsOnPage",
        "address",
        "balance",
        "totalReceived",
        "totalSent",
        "unconfirmedBalance",
        "unconfirmedTxs",
        "txs",
        "txids"
      ])
      assert.isArray(result[0].txids)
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Blockbook.balance(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2")

        const result = await bchjs.Blockbook.balance(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"

      const result = await bchjs.Blockbook.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "txid",
        "vout",
        "value",
        "height",
        "confirmations"
      ])
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      const addr = [
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2",
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"
      ]

      const result = await bchjs.Blockbook.utxo(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0])
      assert.hasAnyKeys(result[0][0], [
        "txid",
        "vout",
        "value",
        "height",
        "confirmations"
      ])
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Blockbook.utxo(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2")

        const result = await bchjs.Blockbook.utxo(addr)
        //console.log(`result: ${util.inspect(result)}`)

        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
