const assert = require('chai').assert
const BCHJS = require('../../src/bch-js')
const sinon = require('sinon')

const mockDataLib = require('./fixtures/price-mocks')
let mockData

describe('#price', () => {
  let sandbox
  let bchjs

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    bchjs = new BCHJS()

    mockData = Object.assign({}, mockDataLib)
  })

  afterEach(() => sandbox.restore())

  describe('#current', () => {
    it('should get current price for single currency', async () => {
      sandbox
        .stub(bchjs.Price.axios, 'get')
        .resolves({ data: { price: 24905 } })

      const result = await bchjs.Price.current('usd')
      // console.log(result)

      assert.isNumber(result)
    })
  })

  describe('#getUsd', () => {
    it('should get the USD price of BCH', async () => {
      sandbox.stub(bchjs.Price.axios, 'get').resolves({ data: { usd: 249.87 } })

      const result = await bchjs.Price.getUsd()
      // console.log(result)

      assert.isNumber(result)
    })
  })

  describe('#rates', () => {
    it('should get the price of BCH in several currencies', async () => {
      sandbox
        .stub(bchjs.Price.axios, 'get')
        .resolves({ data: mockData.mockRates })

      const result = await bchjs.Price.rates()
      // console.log(result)

      assert.property(result, 'USD')
      assert.property(result, 'CAD')
    })
  })

  describe('#getBchaUsd', () => {
    it('should get the USD price of BCHA', async () => {
      sandbox.stub(bchjs.Price.axios, 'get').resolves({ data: { usd: 18.87 } })

      const result = await bchjs.Price.getBchaUsd()
      // console.log(result)

      assert.isNumber(result)
    })
  })
})
