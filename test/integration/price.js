const assert = require("assert")
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

describe("#price", () => {
  describe("#current", () => {
    describe("#single currency", () => {
      it("should get current price for single currency", async () => {
        const result = await bchjs.Price.current("usd")
        assert.notEqual(0, result)
      })
    })
  })
})
