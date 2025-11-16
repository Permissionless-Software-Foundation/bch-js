/*
  A Mocha test file for running end-to-end (e2e) tests.
*/

// import mocha from "mocha"
import chai from 'chai'

import sendToken from './send-token/send-token.js'
const { assert } = chai

describe('#end-to-end tests', () => {
  describe('#send-tokens', () => {
    it('SLPDB should update balances in less than 10 seconds', async () => {
      const result = await sendToken.sendTokenTest()

      assert(result, true, 'True expected if test passed successfully.')
    })
  })
})
