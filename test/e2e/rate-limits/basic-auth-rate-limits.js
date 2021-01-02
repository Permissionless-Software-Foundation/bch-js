/*
  Mocha test that verifies that the bch-api server is enforcing its
  access rules for Basic Authentication.

  To Run Test:
  - Update the restURL for bch-api you want to test against.
  - Update the PRO_PASS value with a current PRO_PASSES string used by bch-api.
*/

const assert = require('chai').assert

const PRO_PASS = 'testpassword'

const BCHJS = require('../../../src/bch-js')
const bchjs = new BCHJS({
  // restURL: `https://bchn.fullstack.cash/v4/`,
  restURL: 'https://abc.fullstack.cash/v4/',
  // restURL: `http://localhost:3000/v4/`,
  authPass: PRO_PASS
})

describe('#Basic Authentication rate limits', () => {
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
      const result = await bchjs.Blockbook.balance(addr)

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
