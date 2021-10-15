// Public npm libraries
const assert = require('assert')
const axios = require('axios')
const sinon = require('sinon')

// Unit under test (uut)
const BCHJS = require('../../src/bch-js')
// const bchjs = new BCHJS()
let bchjs

describe('#Generating', () => {
  beforeEach(() => {
    bchjs = new BCHJS()
  })

  describe('#generateToAddress', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should generate', done => {
      const data = []
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'post').returns(resolved)

      bchjs.Generating.generateToAddress(
        1,
        'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf'
      )
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })
})
