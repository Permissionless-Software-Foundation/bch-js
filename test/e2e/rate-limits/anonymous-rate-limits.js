/*
  Mocha test that verifies that the bch-api server is enforcing its
  anonymous access rules

  To Run Test:
  - Update the RESTURL for bch-api you want to test against.
  - Ensure the BCHJSTOKEN environment variable is set to an empty string.
  - If working with bch-api locally, eliminate the local IP address from the
    whitelist in bch-api/src/middleware/route-ratelimit.js

  Run this test with this command:
  mocha --timeout=30000 anonymous-rate-limits.js
*/

const assert = require('chai').assert

// const RESTURL = `https://abc.fullstack.cash/v4/`
const RESTURL = 'https://bchn.fullstack.cash/v4/'
// const RESTURL = `http://localhost:3000/v4/`

const BCHJS = require('../../../src/bch-js')
const bchjs = new BCHJS({ restURL: RESTURL })

describe('#anonymous rate limits', () => {
  it('should allow an anonymous call to a full node endpoint', async () => {
    const result = await bchjs.Control.getNetworkInfo()

    assert.property(result, 'version')
  }).timeout(5000)

  it('should allow an anonymous call to an indexer', async () => {
    const addr = 'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf'
    const result = await bchjs.Electrumx.balance(addr)
    // console.log(`result: ${JSON.stringify(result, null, 2)}`)

    assert.property(result, 'balance')
  }).timeout(5000)

  it('should throw error when rate limit exceeded', async () => {
    try {
      for (let i = 0; i < 35; i++) await bchjs.Control.getNetworkInfo()

      assert.fail('Unexpected result')
    } catch (err) {
      assert.include(err.error, 'Too many requests')
    }
  }).timeout(20000)
})
