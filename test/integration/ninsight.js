const chai = require("chai")
const assert = chai.assert
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

describe(`#Ninsight`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    // it(`should GET utxos for a single address`, async () => {
    //   const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"
    //
    //   const result = await bchjs.Ninsight.utxo(addr)
    //   // console.log(`result: ${JSON.stringify(result, null, 2)}`)
    //
    //   assert.isArray(result)
    //
    //   assert.property(result[0], "address")
    //   assert.property(result[0], "txid")
    //   assert.property(result[0], "vout")
    //   assert.property(result[0], "scriptPubKey")
    //   assert.property(result[0], "amount")
    //   assert.property(result[0], "satoshis")
    //   assert.isNumber(result[0].satoshis)
    //   assert.property(result[0], "height")
    //   assert.property(result[0], "confirmations")
    // })
  })
})
