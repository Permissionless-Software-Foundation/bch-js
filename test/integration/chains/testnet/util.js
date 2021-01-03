/*
  Integration tests for the bchjs. Only covers calls made to
  rest.bitcoin.com.
*/

const chai = require('chai')
const assert = chai.assert

const RESTURL = process.env.RESTURL
  ? process.env.RESTURL
  : 'https://testnet3.fullstack.cash/v4/'
// if (process.env.RESTURL) RESTURL = process.env.RESTURL

const BCHJS = require('../../../../src/bch-js')
// const bchjs = new BCHJS({ restURL: `https://testnet.bchjs.cash/v4/` })
const bchjs = new BCHJS({ restURL: RESTURL, apiToken: process.env.BCHJSTOKEN })

// Inspect utility used for debugging.
const util = require('util')
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe('#util', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  describe('#validateAddress', () => {
    it('should return false for testnet addr on mainnet', async () => {
      const address = 'bitcoincash:qp4k8fjtgunhdr7yq30ha4peu'

      const result = await bchjs.Util.validateAddress(address)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['isvalid'])
      assert.equal(result.isvalid, false)
    })

    it('should return false for bad address', async () => {
      const address = 'bchtest:qqqk4y6lsl5da64sg53xezmplyu5kmpyz2ysaa5y'

      const result = await bchjs.Util.validateAddress(address)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['isvalid'])
      assert.equal(result.isvalid, false)
    })

    it('should validate valid address', async () => {
      const address = 'bchtest:qqqk4y6lsl5da64sg5qc3xezmplyu5kmpyz2ysaa5y'

      const result = await bchjs.Util.validateAddress(address)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAnyKeys(result, [
        'isvalid',
        'address',
        'scriptPubKey',
        // "ismine",
        // "iswatchonly",
        'isscript'
      ])
      assert.equal(result.isvalid, true)
    })

    it('should validate an array of addresses', async () => {
      const address = [
        'bchtest:qqqk4y6lsl5da64sg5qc3xezmplyu5kmpyz2ysaa5y',
        'bchtest:pq6k9969f6v6sg7a75jkru4n7wn9sknv5cztcp0dnh'
      ]

      const result = await bchjs.Util.validateAddress(address)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        'isvalid',
        'address',
        'scriptPubKey',
        // "ismine",
        // "iswatchonly",
        'isscript'
      ])
    })

    it('should throw error on array size rate limit', async () => {
      try {
        const dataMock = 'bchtest:pq6k9969f6v6sg7a75jkru4n7wn9sknv5cztcp0dnh'
        const data = []
        for (let i = 0; i < 25; i++) data.push(dataMock)

        const result = await bchjs.Util.validateAddress(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.hasAnyKeys(err, ['error'])
        assert.include(err.error, 'Array too large')
      }
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
