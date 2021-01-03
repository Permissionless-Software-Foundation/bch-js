/*
  Integration tests for bchjs control library.
*/

const chai = require('chai')
const assert = chai.assert

const RESTURL = process.env.RESTURL
  ? process.env.RESTURL
  : 'https://testnet3.fullstack.cash/v4/'

const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS({ restURL: RESTURL, apiToken: process.env.BCHJSTOKEN })

describe('#control', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  describe('#getNetworkInfo', () => {
    it('should get info on the full node', async () => {
      const result = await bchjs.Control.getNetworkInfo()
      console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'version')
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
