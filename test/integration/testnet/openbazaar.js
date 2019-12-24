/*
  tests for OpenBazaar library.
*/

// Force testnet call to OB1 servers.
process.env.NETWORK = "testnet"

const chai = require("chai")
const assert = chai.assert
const BCHJS = require("../../../src/bch-js")
const bchjs = new BCHJS()

describe(`#OpenBazaar`, () => {
  describe(`#Balance`, () => {
    it(`should GET balance for a single address`, async () => {
      const addr = "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"

      const result = await bchjs.OpenBazaar.balance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "page",
        "totalPages",
        "itemsOnPage",
        "addrStr",
        "balance",
        "totalReceived",
        "totalSent",
        "unconfirmedBalance",
        "unconfirmedTxApperances",
        "txApperances",
        "transactions"
      ])
      assert.isArray(result.transactions)
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.OpenBazaar.balance(addr)
        // assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(err.message, `Input address must be a string`)
      }
    })
  })

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"

      const result = await bchjs.OpenBazaar.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "txid",
        "vout",
        "amount",
        "height",
        "confirmations",
        "satoshis"
      ])
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.OpenBazaar.utxo(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(err.message, `Input address must be a string`)
      }
    })
  })

  describe(`#tx`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.OpenBazaar.tx(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(err.message, `Input txid must be a string`)
      }
    })

    it(`should GET transactions for a single address`, async () => {
      const addr =
        "ed4692f50a4553527dd26cd8674ca06a0ab2d366f3135ca3668310467ead3cbf"

      const result = await bchjs.OpenBazaar.tx(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAnyKeys(result, [
        "txid",
        "version",
        "vin",
        "vout",
        "blockhash",
        "blockheight",
        "confirmations",
        "blocktime",
        "valueOut",
        "valueIn",
        "fees",
        "hex"
      ])
      assert.isArray(result.vin)
      assert.isArray(result.vout)
    })
  })
})
