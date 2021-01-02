const assert = require('chai').assert
const sinon = require('sinon')

const BCHJS = require('../../src/bch-js')
// const bchjs = new BCHJS()
let bchjs

const mockData = require('./fixtures/encryption-mock')

describe('#Encryption', () => {
  let sandbox

  beforeEach(() => {
    bchjs = new BCHJS()
    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe('#getPubKey', () => {
    it('should throw error if BCH address is not provided.', async () => {
      try {
        await bchjs.encryption.getPubKey()

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(
          err.message,
          'Input must be a valid Bitcoin Cash address'
        )
      }
    })

    it('should report when public key can not be found', async () => {
      // Stub the network call.
      sandbox
        .stub(bchjs.encryption.axios, 'get')
        .resolves({ data: mockData.failureMock })

      const addr = 'bitcoincash:qpxqr2pmcverj4vukgjqssvk2zju8tp9xsgz2nqagx'

      const result = await bchjs.encryption.getPubKey(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, false)
      assert.property(result, 'publicKey')
      assert.equal(result.publicKey, 'not found')
    })

    it('should get a public key', async () => {
      // Stub the network call.
      sandbox
        .stub(bchjs.encryption.axios, 'get')
        .resolves({ data: mockData.successMock })

      const addr = 'bitcoincash:qpf8jv9hmqcda0502gjp7nm3g24y5h5s4unutghsxq'

      const result = await bchjs.encryption.getPubKey(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)
      assert.property(result, 'publicKey')
    })
  })
})
