import chai from 'chai'
import BCHJS from '../../src/bch-js.js'
const { assert } = chai
const bchjs = new BCHJS()

describe('#price', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1500)
  })

  describe('#getBchUsd', () => {
    it('should get the USD price of BCH', async () => {
      const result = await bchjs.Price.getBchUsd()
      console.log(result)

      assert.isNumber(result)
    })
  })

  describe('#getPsffppPrice', () => {
    it('should get the price of BCH in several currencies', async () => {
      const result = await bchjs.Price.getPsffppPrice()
      // console.log(result)

      assert.isNumber(result)
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
