/*
  CT 11/11/2020:
  There is no longer a free tier. These tests have been deprecated.

  ----
  Mocha test that verifies that the bch-api server is enforcing its
  full-node access rules

  To Run Test:
  - Update the restURL for bch-api you want to test against.
  - Update the JWT_TOKEN value with a paid tier JWT token.
*/

const assert = require('chai').assert

const JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODhhY2JmMDIyMWMxMDAxMmFkOTNmZiIsImVtYWlsIjoiY2hyaXMudHJvdXRuZXJAZ21haWwuY29tIiwiYXBpTGV2ZWwiOjQwLCJyYXRlTGltaXQiOjMsImlhdCI6MTYwMzIyNzEwNCwiZXhwIjoxNjA1ODE5MTA0fQ.CV36grzdD36Ht3BwZGHG4XU40CVDzMRw9Ars1x1r27M'

const BCHJS = require('../../../src/bch-js')
const bchjs = new BCHJS({
  // restURL: `https://bchn.fullstack.cash/v4/`,
  restURL: 'https:/abc.fullstack.cash/v4/',
  // restURL: `http://localhost:3000/v4/`,
  apiToken: JWT_TOKEN
})

describe('#full node rate limits', () => {
  it('should allow an free call to an indexer', async () => {
    const addr = 'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf'
    const result = await bchjs.Electrumx.balance(addr)
    // console.log(`result: ${JSON.stringify(result, null, 2)}`)

    assert.property(result, 'balance')
  }).timeout(5000)

  // CT 11/8/20: New rate limits make this test invalid.
  // it("should throw error when rate limit exceeded 20 RPM for indexer endpoints", async () => {
  //   const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
  //
  //   try {
  //     for (let i = 0; i < 22; i++) await bchjs.Electrumx.balance(addr)
  //
  //     assert.fail("unexpected result")
  //   } catch (err) {
  //     // console.log(`err: `, err)
  //     assert.include(err.error, "Too many requests")
  //   }
  // }).timeout(10000)

  it('should allow more than 20 RPM to full node', async () => {
    for (let i = 0; i < 22; i++) {
      const result = await bchjs.Control.getNetworkInfo()

      if (i === 5) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, 'version', 'more than 3 calls allowed')
      }

      if (i === 15) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, 'version', 'more than 10 calls allowed')
      }
    }
  }).timeout(20000)

  it('should throw error for more than 100 RPM to fullnode', async () => {
    try {
      console.log('This test usually doesn\'t pass, because of latency.')
      for (let i = 0; i < 100; i++) await bchjs.Control.getNetworkInfo()
    } catch (err) {
      // console.log(`validating after 10th call`)
      // console.log(`err: `, err)
      assert.include(err.error, 'Too many requests')
      assert.include(err.error, 100)
    }
  }).timeout(45000)
})
