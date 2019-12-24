const chai = require("chai")
const assert = require("assert")
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()
const axios = require("axios")
const sinon = require("sinon")

describe("#Price", () => {
  describe("#current", () => {
    describe("#single currency", () => {
      let sandbox
      beforeEach(() => (sandbox = sinon.createSandbox()))
      afterEach(() => sandbox.restore())

      it("should get current price for single currency", done => {
        const data = 46347
        const resolved = new Promise(r => r({ data: data }))
        sandbox.stub(axios, "get").returns(resolved)

        bchjs.Price.current("usd")
          .then(result => {
            assert.deepEqual(data.price, result)
          })
          .then(done, done)
      })
    })
  })
})
