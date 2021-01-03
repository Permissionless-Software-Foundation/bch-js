/*
  Mocha test that verifies that the bch-api server is enforcing its
  indexer access rules

  To Run Test:
  - Update the restURL for bch-api you want to test against.
  - Update the JWT_TOKEN value with a current indexer-level JWT token.
*/

const assert = require('chai').assert

const JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODhhY2JmMDIyMWMxMDAxMmFkOTNmZiIsImVtYWlsIjoiY2hyaXMudHJvdXRuZXJAZ21haWwuY29tIiwiYXBpTGV2ZWwiOjQwLCJyYXRlTGltaXQiOjMsImlhdCI6MTYwMzIyNzEwNCwiZXhwIjoxNjA1ODE5MTA0fQ.CV36grzdD36Ht3BwZGHG4XU40CVDzMRw9Ars1x1r27M'

const BCHJS = require('../../../src/bch-js')
const bchjs = new BCHJS({
  // restURL: `https://bchn.fullstack.cash/v4/`,
  restURL: 'https://abc.fullstack.cash/v4/',
  // restURL: `http://localhost:3000/v4/`,
  apiToken: JWT_TOKEN
})

describe('#Indexer rate limits', () => {
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
  }).timeout(45000)

  it('should allow more than 20 RPM to an indexer', async () => {
    const addr = 'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf'

    for (let i = 0; i < 22; i++) {
      const result = await bchjs.Electrumx.balance(addr)

      if (i === 5) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, 'balance', 'more than 3 calls allowed')
      }

      if (i === 15) {
        // console.log(`validating 5th call: ${i}`)
        assert.property(result, 'balance', 'more than 10 calls allowed')
      }
    }
  }).timeout(45000)
})
