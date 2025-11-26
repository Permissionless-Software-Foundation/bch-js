import assert from 'assert'

import { createRequire } from 'module'

import BCHJS from '../../src/bch-js.js'
const require = createRequire(import.meta.url)
const fixtures = require('./fixtures/slp/ecpair.json')
let slp

// const SLP = require("../../src/slp/slp")
// const slp = new SLP({ restURL: "http://fakeurl.com/" })

describe('#SLP ECPair', () => {
  beforeEach(() => {
    const bchjs = new BCHJS()
    slp = bchjs.SLP
  })

  describe('#toSLPAddress', () => {
    it('should return slp address for ecpair', async () => {
      fixtures.wif.forEach((wif, index) => {
        const ecpair = slp.ECPair.fromWIF(wif)
        const slpAddr = slp.ECPair.toSLPAddress(ecpair)
        assert.equal(slpAddr, fixtures.address[index])
      })
    })
  })
})
