const assert = require("assert")
const axios = require("axios")
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()
const sinon = require("sinon")

describe("#Generating", () => {
  describe("#generateToAddress", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it("should generate", done => {
      const data = []
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "post").returns(resolved)

      bchjs.Generating.generateToAddress(
        1,
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
      )
        .then(result => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })
})
