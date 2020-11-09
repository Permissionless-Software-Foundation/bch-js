/*
  tests for OpenBazaar library.
*/

const chai = require("chai")
const assert = chai.assert
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

describe(`#OpenBazaar`, () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  describe(`#Balance`, () => {
    it(`should GET balance for a single address`, async () => {
      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

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
  })

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

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
  })

  describe(`#tx`, () => {
    it(`should GET transactions for a single address`, async () => {
      const addr =
        "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7"

      const result = await bchjs.OpenBazaar.tx(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
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
        "hex",
        "time"
      ])
      assert.isArray(result.vin)
      assert.isArray(result.vout)
    })
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
