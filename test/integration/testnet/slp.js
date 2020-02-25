/*
  Integration tests for the bchjs covering SLP tokens.
*/

const chai = require("chai")
const assert = chai.assert

let RESTURL = `https://tapi.fullstack.cash/v3/`
if (process.env.RESTURL) RESTURL = process.env.RESTURL

const BCHJS = require("../../../src/bch-js")
// const bchjs = new BCHJS({ restURL: `https://testnet.bchjs.cash/v3/` })
const bchjs = new BCHJS({ restURL: RESTURL })

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

describe(`#SLP`, () => {
  describe("#util", () => {
    it(`should get information on the Oasis token`, async () => {
      const tokenId = `a371e9934c7695d08a5eb7f31d3bceb4f3644860cc67520cda1e149423b9ec39`

      const result = await bchjs.SLP.Utils.list(tokenId)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAnyKeys(result, [
        "decimals",
        "timestamp",
        "timestamp_unix",
        "versionType",
        "documentUri",
        "symbol",
        "name",
        "containsBaton",
        "id",
        "documentHash",
        "initialTokenQty",
        "blockCreated",
        "blockLastActiveSend",
        "blockLastActiveMint",
        "txnsSinceGenesis",
        "validAddress",
        "totalMinted",
        "totalBurned",
        "circulatingSupply",
        "mintingBatonStatus"
      ])
    })
  })
})
