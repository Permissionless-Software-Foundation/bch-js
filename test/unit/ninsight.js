const chai = require("chai")
const assert = chai.assert
const axios = require("axios")
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

const mockData = require("./fixtures/ninsight-mock")

describe(`#Ninsight`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Ninsight.utxo(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings.`
        )
      }
    })

    it(`should GET utxos for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({ data: mockData.utxo })

      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "utxos")
      assert.property(result, "legacyAddress")
      assert.property(result, "cashAddress")
      assert.property(result, "slpAddress")
      assert.property(result, "scriptPubKey")
      assert.property(result, "asm")

      assert.isArray(result.utxos)

      assert.property(result.utxos[0], "txid")
      assert.property(result.utxos[0], "vout")
      assert.property(result.utxos[0], "amount")
      assert.property(result.utxos[0], "satoshis")
      assert.property(result.utxos[0], "height")
      assert.property(result.utxos[0], "confirmations")
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      // Mock the network call.
      sandbox.stub(axios, "post").resolves({ data: mockData.utxoPost })

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


  describe(`#details`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Ninsight.details(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings.`
        )
      }
    })

    it(`should GET details for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({ data: mockData.details })

      const addr = "mkPvAKZ2rar6qeG3KjBtJHHMSP1wFZH7Er"

      const result = await bchjs.Ninsight.details(addr)
      console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "satoshis")
      assert.property(result, "height")
      assert.property(result, "confirmations")
      assert.property(result, "timestamp")
      assert.property(result, "fees")
      assert.property(result, "outputIndexes")
      assert.property(result, "inputIndexes")
      assert.property(result, "tx")
    })

    it(`should GET details for an array of addresses`, async () => {
      // Mock the network call.
      sandbox.stub(axios, "post").resolves({ data: mockData.detailsPost })

      const addr = [
        "bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7",
        "bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr"
      ]

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)

      assert.property(result[0], "satoshis")
      assert.property(result[0], "height")
      assert.property(result[0], "confirmations")
      assert.property(result[0], "timestamp")
      assert.property(result[0], "fees")
      assert.property(result[0], "outputIndexes")
      assert.property(result[0], "inputIndexes")
      assert.property(result[0], "tx")

        /*
        I would like to refactor this test according to the DRY principle

        assertDetails(result[0])

        assertDetails(data) {
              assert.property(data, "satoshis")
              assert.property(data, "height")
              assert.property(data, "confirmations")
              assert.property(data, "timestamp")
              assert.property(data, "fees")
              assert.property(data, "outputIndexes")
              assert.property(data, "inputIndexes")
              assert.property(data, "tx")
        }
        */
    })
  })
})