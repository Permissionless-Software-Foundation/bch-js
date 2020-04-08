const chai = require("chai")
const assert = chai.assert
const axios = require("axios")
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

const mockData = require("./fixtures/electrumx-mock")

describe(`#ElectrumX`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Electrumx.utxo(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should GET utxos for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "get").resolves({ data: mockData.utxo })

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
  })
})
