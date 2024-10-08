const assert = require('chai').assert
const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

describe('#price', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1500)
  })

  // describe('#current', () => {
  //   describe('#single currency', () => {
  //     it('should get current price for single currency', async () => {
  //       const result = await bchjs.Price.current('usd')
  //       assert.notEqual(0, result)
  //     })
  //   })
  // })

  describe('#getUsd', () => {
    it('should get the USD price of BCH', async () => {
      const result = await bchjs.Price.getUsd()
      // console.log(result)

      assert.isNumber(result)
    })
  })

  describe('#getBchaUsd', () => {
    it('should get the USD price of BCHA', async () => {
      const result = await bchjs.Price.getBchaUsd()
      console.log(result)

      assert.isNumber(result)
    })
  })

  describe('#getBchUsd', () => {
    it('should get the USD price of BCH', async () => {
      const result = await bchjs.Price.getBchUsd()
      console.log(result)

      assert.isNumber(result)
    })
  })

  describe('#rates', () => {
    it('should get the price of BCH in several currencies', async () => {
      const result = await bchjs.Price.rates()
      // console.log(result)

      assert.property(result, 'USD')
      assert.property(result, 'CAD')
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
