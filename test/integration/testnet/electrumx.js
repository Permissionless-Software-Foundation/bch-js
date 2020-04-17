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
})
