/*
  Mocha test that verifies that the bch-api server is enforcing its
  FREE access rules

  To Run Test:
  - Update the restURL for bch-api you want to test against.
  - Update the JWT_TOKEN value with a current free-level JWT token.
*/

const assert = require("chai").assert

// const JWT_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmM5ZTI3YWIwMDI4M2E1MDhkYzQ4OSIsImlhdCI6MTU3MjY0MjM1NCwiZXhwIjoxNTc1MjM0MzU0fQ.6dzUh10UXoQXjJujRZ0AMSBhz0ElM1Cc-rCyb50PDqI`
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmM5ZTI3YWIwMDI4M2E1MDhkYzQ4OSIsImlhdCI6MTU3MjgzMjAzNywiZXhwIjoxNTc1NDI0MDM3fQ.FygzeHYGH5vsXurFlI7ZFTmS2eyLDt3iglhFWgIZRxY"

const BCHJS = require("../../../src/bch-js")
const bchjs = new BCHJS({
  restURL: `https://api.bchjs.cash/v3/`,
  // restURL: `http://localhost:3000/v3/`,
  apiToken: JWT_TOKEN
})

describe("#free rate limits", () => {
  it("should allow an free call to an indexer", async () => {
    const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
    const result = await bchjs.Blockbook.balance(addr)
    // console.log(`result: ${JSON.stringify(result, null, 2)}`)

    assert.property(result, "balance")
  }).timeout(5000)

  it("should throw error when rate limit exceeded 3 RPM for indexer endpoints", async () => {
    const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

    try {
      for (let i = 0; i < 5; i++) await bchjs.Blockbook.balance(addr)

      assert.equal(true, false, "unexpected result")
    } catch (err) {
      // console.log(`err: `, err)
      assert.include(err.error, "Too many requests")
    }
  }).timeout(10000)

  it("should allow up to 10 RPM to full node, then throw error", async () => {
    try {
      for (let i = 0; i < 15; i++) {
        const result = await bchjs.Control.getNetworkInfo()

        if (i === 5) {
          // console.log(`validating 5th call: ${i}`)
          assert.property(result, "version", "more than 3 calls allowed")
        }
      }
    } catch (err) {
      // console.log(`validating after 10th call`)
      // console.log(`err: `, err)
      assert.include(err.error, "Too many requests", "more than 10 not allowed")
      assert.include(err.error, 10)
      assert.notInclude(err.error, 3)
    }
  }).timeout(20000)
})
