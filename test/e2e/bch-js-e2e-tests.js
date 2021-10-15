/*
  A Mocha test file for running end-to-end (e2e) tests.
*/

// const mocha = require("mocha")
const assert = require('chai').assert

const sendToken = require('./send-token/send-token')

describe('#end-to-end tests', () => {
  describe('#send-tokens', () => {
    it('SLPDB should update balances in less than 10 seconds', async () => {
      const result = await sendToken.sendTokenTest()

      assert(result, true, 'True expected if test passed successfully.')
    })
  })
})
