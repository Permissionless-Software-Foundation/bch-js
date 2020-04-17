const chai = require("chai")
const assert = chai.assert
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

describe(`#ElectrumX`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

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

    it(`should POST request for UTXOs for an array of addresses`, async () => {
      const addr = [
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      ]

      const result = await bchjs.Electrumx.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

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
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bchjs.Electrumx.utxo(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#balance`, () => {
    it(`should GET balance for a single address`, async () => {
      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

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
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
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
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

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
      const addr = "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"

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
        "bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
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
          addr.push("bitcoincash:qrehqueqhw629p6e57994436w730t4rzasnly00ht0")

        const result = await bchjs.Electrumx.transactions(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
