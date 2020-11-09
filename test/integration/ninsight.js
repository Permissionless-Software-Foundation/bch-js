const chai = require("chai")
const assert = chai.assert
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS({ ninsightURL: "https://rest.bitcoin.com/v2" })

describe(`#Ninsight`, () => {
  let sandbox

  beforeEach(async () => {
    sandbox = sinon.createSandbox()

    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result[0], "utxos")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "slpAddress")
      assert.property(result[0], "scriptPubKey")
      assert.property(result[0], "asm")

      assert.isArray(result[0].utxos)

      assert.property(result[0].utxos[0], "txid")
      assert.property(result[0].utxos[0], "vout")
      assert.property(result[0].utxos[0], "amount")
      assert.property(result[0].utxos[0], "satoshis")
      assert.property(result[0].utxos[0], "height")
      assert.property(result[0].utxos[0], "confirmations")
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      const addr = [
        "bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7",
        "bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr"
      ]

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0].utxos)

      assert.property(result[0], "utxos")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "slpAddress")
      assert.property(result[0], "scriptPubKey")
      assert.property(result[0], "asm")
    })
  })
  describe(`#transactions`, () => {
    it(`should POST transactions history for a single address`, async () => {
      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

      const result = await bchjs.Ninsight.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "txs")
      assert.isArray(result[0].txs)
      assert.property(result[0].txs[0], "txid")
      assert.property(result[0].txs[0], "vin")
      assert.property(result[0].txs[0], "vout")
    })
    it(`should POST transactions history for an array of addresses`, async () => {
      const addr = [
        "bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7",
        "bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr"
      ]

      const result = await bchjs.Ninsight.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "txs")
      assert.isArray(result[0].txs)
      assert.property(result[0].txs[0], "txid")
      assert.property(result[0].txs[0], "vin")
      assert.property(result[0].txs[0], "vout")
    })
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
