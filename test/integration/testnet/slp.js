/*
  Integration tests for the bchjs covering SLP tokens.
*/

const chai = require("chai")
const assert = chai.assert

const RESTURL = process.env.RESTURL
  ? process.env.RESTURL
  : `https://tapi.fullstack.cash/v3/`
// if (process.env.RESTURL) RESTURL = process.env.RESTURL

const BCHJS = require("../../../src/bch-js")
// const bchjs = new BCHJS({ restURL: `https://testnet.bchjs.cash/v3/` })
const bchjs = new BCHJS({ restURL: RESTURL, apiToken: process.env.BCHJSTOKEN })

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

describe(`#SLP`, () => {
  beforeEach(async () => {
    // Introduce a delay so that the BVT doesn't trip the rate limits.
    await sleep(1000)
  })

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

  describe("#decodeOpReturn", () => {
    it("should decode the OP_RETURN for a SEND txid", async () => {
      const txid =
        "ad28116e0818339342dddfc5f58ca8a5379ceb9679b4e4cbd72f4de905415ec1"

      const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["amounts", "tokenType", "tokenId", "txType"])
    })
  })

  describe("#balancesForAddress", () => {
    it(`should throw an error if input is not a string or array of strings`, async () => {
      try {
        const address = 1234

        await bchjs.SLP.Utils.balancesForAddress(address)

        assert.equal(true, false, "Uh oh. Code path should not end here.")
      } catch (err) {
        //console.log(`Error: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should fetch all balances for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "get")
          .resolves({ data: mockData.balancesForAddress })
      }

      const balances = await bchjs.SLP.Utils.balancesForAddress(
        "slptest:qz0kc67pm4emjyr3gaaa2wstdaykg9m4yqwlzpj3w9"
      )
      // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert.isArray(balances)
      assert.hasAllKeys(balances[0], [
        "tokenId",
        "balanceString",
        "balance",
        "decimalCount",
        "slpAddress"
      ])
    })

    it(`should fetch balances for multiple addresses`, async () => {
      const addresses = [
        "slptest:qz0kc67pm4emjyr3gaaa2wstdaykg9m4yqwlzpj3w9",
        "slptest:qr5uy4h8ysyhwkp9s245scckdnc7teyjqc5ft2z43h"
      ]

      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "post")
          .resolves({ data: mockData.balancesForAddresses })
      }

      const balances = await bchjs.SLP.Utils.balancesForAddress(addresses)
      // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert.isArray(balances)
      assert.isArray(balances[0])
      assert.hasAllKeys(balances[0][0], [
        "tokenId",
        "balanceString",
        "balance",
        "decimalCount",
        "slpAddress"
      ])
    })
  })
})

// Promise-based sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
