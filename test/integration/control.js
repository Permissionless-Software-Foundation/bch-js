/*
  Integration tests for bchjs control library.
*/

const chai = require("chai")
const assert = chai.assert
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

describe(`#control`, () => {
  describe(`#getNetworkInfo`, () => {
    it("should get info on the full node", async () => {
      const result = await bchjs.Control.getNetworkInfo()
      console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "version")
    })
  })
})
