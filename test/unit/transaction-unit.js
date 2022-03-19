/*
  Unit tests for the transaction.js library.
*/

// Public npm libraries
const assert = require('chai').assert
const sinon = require('sinon')
// const cloneDeep = require('lodash.clonedeep')

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

// const mockDataLib = require('./fixtures/transaction-mock.js')

describe('#TransactionLib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    // mockData = cloneDeep(mockDataLib)
  })
  afterEach(() => sandbox.restore())

  describe('#get', () => {
    it('should proxy psf-slp-indexer', async () => {
      // console.log('bchjs.Transaction: ', bchjs.Transaction)
      sandbox.stub(bchjs.Transaction.psfSlpIndexer, 'tx').resolves('test data')

      const result = await bchjs.Transaction.get()

      assert.equal(result, 'test data')
    })
  })
})
