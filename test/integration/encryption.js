// const assert = require('chai').assert

// const BCHJS = require('../../src/bch-js')
// const bchjs = new BCHJS()

describe('#Encryption', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1500)
  })

  describe('#getPubKey', () => {
    // Commenting out these tests since they are failing in BVT due to 429 errors
    /*
    it('should get a public key', async () => {
      // Add delay for this endpoint.
      await sleep(8000)

      const addr = 'bitcoincash:qpf8jv9hmqcda0502gjp7nm3g24y5h5s4unutghsxq'

      const result = await bchjs.encryption.getPubKey(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)
      assert.property(result, 'publicKey')
    })

    it('should report when public key can not be found', async () => {
      // Add delay for this endpoint.
      await sleep(8000)

      const addr = 'bitcoincash:qrgqqkky28jdkv3w0ctrah0mz3jcsnsklc34gtukrh'

      const result = await bchjs.encryption.getPubKey(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, false)
      assert.property(result, 'publicKey')
      assert.equal(result.publicKey, 'not found')
    })
    */
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
