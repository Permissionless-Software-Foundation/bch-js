const chai = require("chai")
const assert = chai.assert
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()
const axios = require("axios")
const sinon = require("sinon")

const mockData = require("./fixtures/openbazaar-mock")

describe(`#OpenBazaar`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#Balance`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.OpenBazaar.balance(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(err.message, `Input address must be a string`)
      }
    })

    it(`should GET balance for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "get").resolves({ data: mockData.balance })

      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

      const result = await bchjs.OpenBazaar.balance(addr)
      //console.log(`result: ${util.inspect(result)}`)

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

    it(`should GET utxos for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "get").resolves({ data: mockData.utxo })

      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

      const result = await bchjs.OpenBazaar.utxo(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

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
    it(`should throw an error for improper input`, async () => {
      try {
        const txid = 12345

        await bchjs.OpenBazaar.tx(txid)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(err.message, `Input txid must be a string`)
      }
    })

    it(`should GET tx details for a single txid`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "get").resolves({ data: mockData.tx })

      const txid =
        "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7"

      const result = await bchjs.OpenBazaar.tx(txid)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

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
        "hex"
      ])
      assert.isArray(result.vin)
      assert.isArray(result.vout)
    })
  })
})
