/*
  Integration tests for the bchjs. Only covers calls made to
  rest.bitcoin.com.
*/

// import chai from 'chai'
// import BCHJS from '../../../../src/bch-js.js'

// Inspect utility used for debugging.
import util from 'util'
// const assert = chai.assert
// const bchjs = new BCHJS()
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe('#util', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1500)
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
