// Public npm libraries
import assert from 'assert'
import axios from 'axios'
import sinon from 'sinon'

// Unit under test (uut)
import BCHJS from '../../src/bch-js.js'
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
      const resolved = new Promise(resolve => resolve({ data }))
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
