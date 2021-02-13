const assert = require('assert')
const assert2 = require('chai').assert
const axios = require('axios')
const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()
const sinon = require('sinon')

describe('#Util', () => {
  describe('#validateAddress', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should validate address', done => {
      const data = {
        isvalid: true,
        address: 'bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5',
        scriptPubKey: '76a91445e02edc25c701541b9cc6c49d02289afe159ec888ac',
        ismine: false,
        iswatchonly: false,
        isscript: false
      }

      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Util.validateAddress(
        'bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5'
      )
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#floor8', () => {
    it('should floor a number to 8 decimals', () => {
      const num = 1.234567891111

      const result = bchjs.Util.floor8(num)
      // console.log(result)

      assert2.equal(result, 1.23456789)
    })

    it('should throw an error for non-number input', () => {
      try {
        const num = 'string'

        bchjs.Util.floor8(num)

        assert2.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert2.include(err.message, 'input must be a number')
      }
    })

    it('should not effect a number with less than 8 decimals', () => {
      const num = 1.23

      const result = bchjs.Util.floor8(num)
      // console.log(result)

      assert2.equal(result, 1.23)
    })
  })
})
