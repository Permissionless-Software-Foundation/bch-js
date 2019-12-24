const chai = require("chai")
const assert = chai.assert
const BCHJS = require("../../src/bch-js")

// Used for debugging and iterrogating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

describe(`#BitboxShim`, () => {
  it("should create the shim library", () => {
    const BitboxShim = BCHJS.BitboxShim()
    const bitbox = new BitboxShim()

    //console.log(`bitbox.Address: ${util.inspect(bitbox.Address)}`)

    assert.hasAnyKeys(bitbox.Address, [
      // "details",
      // "utxo",
      // "unconfirmed",
      // "transactions",
      // "toLegacyAddress"
      "restURL"
    ])
  })
})
