/*
  Integration tests for the bchjs. Only covers calls made to
  rest.bitcoin.com.

  TODO
*/

const chai = require('chai')
const assert = chai.assert
const BCHJS = require('../../../../src/bch-js')
const bchjs = new BCHJS()

// Inspect utility used for debugging.
const util = require('util')
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe('#rawtransaction', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  /*
    Testing sentRawTransaction isn't really possible with an integration test,
    as the endpoint really needs an e2e test to be properly tested. The tests
    below expect error messages returned from the server, but at least test
    that the server is responding on those endpoints, and responds consistently.
  */
  describe('sendRawTransaction', () => {
    it('should send a single transaction hex', async () => {
      try {
        const hex =
          '01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000'

        await bchjs.RawTransactions.sendRawTransaction(hex)
        // console.log(`result ${JSON.stringify(result, null, 2)}`)

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)

        assert.hasAllKeys(err, ['error'])
        assert.include(err.error, 'Missing inputs')
      }
    })

    it('should send an array of tx hexes', async () => {
      try {
        const hexes = [
          '01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000',
          '01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000'
        ]

        const result = await bchjs.RawTransactions.sendRawTransaction(hexes)
        console.log(`result ${JSON.stringify(result, null, 2)}`)
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)

        assert.hasAllKeys(err, ['error'])
        assert.include(err.error, 'Missing inputs')
      }
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
