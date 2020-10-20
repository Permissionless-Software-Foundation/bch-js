const assert = require("chai").assert
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

  describe("#getUsd", () => {
    it("should get the USD price of BCH", async () => {
      const result = await bchjs.Price.getUsd()
      // console.log(result)

      assert.isNumber(result.usd)
    })
  })
})
