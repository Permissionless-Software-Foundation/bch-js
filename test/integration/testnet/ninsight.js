const chai = require("chai")
const assert = chai.assert
const sinon = require("sinon")

const BCHJS = require("../../../src/bch-js")
const bchjs = new BCHJS({ ninsightURL: "https://trest.bitcoin.com/v2" })

describe(`#Ninsight`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr"

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
        "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr",
        "bchtest:qp6hgvevf4gzz6l7pgcte3gaaud9km0l459fa23dul"
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

      // assert.hasAnyKeys(result[0][0], [
      //   "txid",
      //   "vout",
      //   "value",
      //   "height",
      //   "confirmations"
      // ])
    })
  })
})
