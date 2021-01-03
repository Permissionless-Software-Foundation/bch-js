const assert = require('assert')
const axios = require('axios')
const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()
const sinon = require('sinon')

describe('#Control', () => {
  describe('#getNetworkInfo', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should get info', done => {
      const data = {
        version: 170000,
        protocolversion: 70015,
        blocks: 527813,
        timeoffset: 0,
        connections: 21,
        proxy: '',
        difficulty: 581086703759.5878,
        testnet: false,
        paytxfee: 0,
        relayfee: 0.00001,
        errors: ''
      }
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Control.getNetworkInfo()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getMemoryInfo', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should get memory info', done => {
      const data = {
        locked: {
          used: 0,
          free: 65536,
          total: 65536,
          locked: 65536,
          chunks_used: 0,
          chunks_free: 1
        }
      }
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Control.getMemoryInfo()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })
})
