/*
  Unit tests for the transaction.js library.
*/

// Public npm libraries
import chai from 'chai'
import sinon from 'sinon'
// import cloneDeep from 'lodash.clonedeep'

import BCHJS from '../../src/bch-js.js'
const { assert } = chai
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
