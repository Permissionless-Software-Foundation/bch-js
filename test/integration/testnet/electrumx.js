const chai = require("chai")
const assert = chai.assert
const sinon = require("sinon")

const RESTURL = process.env.RESTURL
  ? process.env.RESTURL
  : `https://tapi.fullstack.cash/v3/`

const BCHJS = require("../../../src/bch-js")
const bchjs = new BCHJS({ restURL: RESTURL, apiToken: process.env.BCHJSTOKEN })

describe(`#ElectrumX`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"

      const result = await bchjs.Electrumx.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "utxos")
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], "height")
      assert.property(result.utxos[0], "tx_hash")
      assert.property(result.utxos[0], "tx_pos")
      assert.property(result.utxos[0], "value")
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      const addr = [
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2",
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"
      ]

      const result = await bchjs.Electrumx.utxo(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "utxos")
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], "utxos")
      assert.isArray(result.utxos[0].utxos)
      assert.property(result.utxos[0], "address")

      assert.property(result.utxos[0].utxos[0], "height")
      assert.property(result.utxos[0].utxos[0], "tx_hash")
      assert.property(result.utxos[0].utxos[0], "tx_pos")
      assert.property(result.utxos[0].utxos[0], "value")
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2")

        const result = await bchjs.Electrumx.utxo(addr)
        //console.log(`result: ${util.inspect(result)}`)

        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#balance`, () => {
    it(`should GET balance for a single address`, async () => {
      const addr = "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"

      const result = await bchjs.Electrumx.balance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "balance")
      assert.property(result.balance, "confirmed")
      assert.property(result.balance, "unconfirmed")
    })

    it(`should POST request for balances for an array of addresses`, async () => {
      const addr = [
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2",
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"
      ]

      const result = await bchjs.Electrumx.balance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "balances")
      assert.isArray(result.balances)

      assert.property(result.balances[0], "address")
      assert.property(result.balances[0], "balance")
      assert.property(result.balances[0].balance, "confirmed")
      assert.property(result.balances[0].balance, "unconfirmed")
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2")

        const result = await bchjs.Electrumx.balance(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#transactions`, () => {
    it(`should GET transaction history for a single address`, async () => {
      const addr = "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"

      const result = await bchjs.Electrumx.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "transactions")
      assert.isArray(result.transactions)
      assert.property(result.transactions[0], "height")
      assert.property(result.transactions[0], "tx_hash")
    })

    it(`should POST request for transaction history for an array of addresses`, async () => {
      const addr = [
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2",
        "bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2"
      ]

      const result = await bchjs.Electrumx.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "transactions")
      assert.isArray(result.transactions)

      assert.property(result.transactions[0], "address")
      assert.property(result.transactions[0], "transactions")
      assert.isArray(result.transactions[0].transactions)
      assert.property(result.transactions[0].transactions[0], "height")
      assert.property(result.transactions[0].transactions[0], "tx_hash")
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2")

        const result = await bchjs.Electrumx.transactions(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#unconfirmed`, () => {
    // These tests won't work because unconfirmed transactions are transient in nature.
    /*
    it(`should GET unconfirmed UTXOs (mempool) for a single address`, async () => {
      const addr = "bchtest:qp25k20dgcljrz4hkdz43partam3j5httyprjp23qd"

      const result = await bchjs.Electrumx.unconfirmed(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "utxos")
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], "height")
      assert.property(result.utxos[0], "tx_hash")
      assert.property(result.utxos[0], "fee")
    })

    it(`should POST unconfirmed UTXO details for an array of addresses`, async () => {
      const addr = [
        "bchtest:qp25k20dgcljrz4hkdz43partam3j5httyprjp23qd",
        "bchtest:qpkl3xylrjx4jup6m66e7zg7whlaucsxeudxeqawdj"
      ]

      const result = await bchjs.Electrumx.unconfirmed(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "utxos")
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], "utxos")
      assert.isArray(result.utxos[0].utxos)
      assert.property(result.utxos[0], "address")

      assert.property(result.utxos[0].utxos[0], "height")
      assert.property(result.utxos[0].utxos[0], "tx_hash")
      assert.property(result.utxos[0].utxos[0], "fee")
    })
    */

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bchtest:qrvn2n228aa39xupcw9jw0d3fj8axxky656e4j62z2")

        await bchjs.Electrumx.unconfirmed(addr)
        //console.log(`result: ${util.inspect(result)}`)

        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#blockHeader`, () => {
    it(`should GET block headers for given height and count`, async () => {
      const height = 42
      const count = 2

      const result = await bchjs.Electrumx.blockHeader(height, count)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "headers")
      assert.isArray(result.headers)
      assert.equal(result.headers.length, 2)
    })

    it(`should GET block headers for given height with default count = 1`, async () => {
      const height = 42

      const result = await bchjs.Electrumx.blockHeader(height)
      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "headers")
      assert.isArray(result.headers)
      assert.equal(result.headers.length, 1)
    })
  })

  describe(`#txData`, () => {
    it(`should GET details for a single transaction`, async () => {
      const txid = "76d2ee0ebd8b978742f6478ff9a12f478c34e4cee0a2b919059101d961bd01ee"

      const result = await bchjs.Electrumx.txData(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "details")
      assert.isObject(result.details)

      assert.property(result.details, "blockhash")
      assert.property(result.details, "hash")
      assert.property(result.details, "hex")
      assert.property(result.details, "vin")
      assert.property(result.details, "vout")
      assert.equal(result.details.hash, txid)
    })

    it(`should POST details for an array of transactions`, async () => {
      const txids = [
        "76d2ee0ebd8b978742f6478ff9a12f478c34e4cee0a2b919059101d961bd01ee",
        "76d2ee0ebd8b978742f6478ff9a12f478c34e4cee0a2b919059101d961bd01ee"
      ]

      const result = await bchjs.Electrumx.txData(txids)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "transactions")
      assert.isArray(result.transactions)

      assert.property(result.transactions[0], "txid")
      assert.property(result.transactions[0], "details")

      assert.property(result.transactions[0].details, "blockhash")
      assert.property(result.transactions[0].details, "hash")
      assert.property(result.transactions[0].details, "hex")
      assert.property(result.transactions[0].details, "vin")
      assert.property(result.transactions[0].details, "vout")
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const txids = []
        for (let i = 0; i < 25; i++)
          txids.push("76d2ee0ebd8b978742f6478ff9a12f478c34e4cee0a2b919059101d961bd01ee")

        await bchjs.Electrumx.txData(txids)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
