import assert from 'assert'
import axios from 'axios'
import BCHJS from '../../src/bch-js.js'
import sinon from 'sinon'
const bchjs = new BCHJS()

describe('#Control', () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe('#getNetworkInfo', () => {
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
      const resolved = new Promise(resolve => resolve({ data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Control.getNetworkInfo()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getMemoryInfo', () => {
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
      const resolved = new Promise(resolve => resolve({ data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Control.getMemoryInfo()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })
})
