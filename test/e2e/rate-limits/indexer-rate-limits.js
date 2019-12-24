/*
  Mocha test that verifies that the bch-api server is enforcing its
  indexer access rules

  To Run Test:
  - Update the restURL for bch-api you want to test against.
  - Update the JWT_TOKEN value with a current indexer-level JWT token.
*/

const assert = require("chai").assert

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmY4MjA1YTYwODliMjliYTlhZjc1OSIsImlhdCI6MTU3MjgzMjEwNywiZXhwIjoxNTc1NDI0MTA3fQ.UD-36TKwN65-zePwNzujGmHeQ60fKqYPunawGxktwws"

const BCHJS = require("../../../src/bch-js")
const bchjs = new BCHJS({
  restURL: `https://api.bchjs.cash/v3/`,
  // restURL: `http://localhost:3000/v3/`,
  apiToken: JWT_TOKEN
})

describe("#full node rate limits", () => {
  it("should allow more than 10 RPM to full node", async () => {
    for (let i = 0; i < 20; i++) {
      const result = await bchjs.Control.getNetworkInfo()

      if (i === 5) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, "version", "more than 3 calls allowed")
      }

      if (i === 15) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, "version", "more than 10 calls allowed")
      }
    }
  }).timeout(30000)

  it("should allow more than 10 RPM to an indexer", async () => {
    const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

    for (let i = 0; i < 20; i++) {
      const result = await bchjs.Blockbook.balance(addr)

      if (i === 5) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, "balance", "more than 3 calls allowed")
      }

      if (i === 15) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, "balance", "more than 10 calls allowed")
      }
    }
  }).timeout(30000)
})
