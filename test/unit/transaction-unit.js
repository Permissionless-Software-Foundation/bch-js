/*
  Unit tests for the transaction.js library.
*/

// Public npm libraries
const assert = require('chai').assert
const sinon = require('sinon')
const cloneDeep = require('lodash.clonedeep')

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

const mockDataLib = require('./fixtures/transaction-mock.js')

describe('#TransactionLib', () => {
  let sandbox, mockData

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    mockData = cloneDeep(mockDataLib)
  })
  afterEach(() => sandbox.restore())

  describe('#get', () => {
    it('should throw an error if txid is not specified', async () => {
      try {
        await bchjs.Transaction.get()

        assert.fail('Unexpected code path!')
      } catch (err) {
        assert.include(
          err.message,
          'Input to Transaction.get() must be a string containing a TXID.'
        )
      }
    })

    it('should get details about a non-SLP transaction', async () => {
      const txid =
        '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.nonSlpTxDetails)

      const result = await bchjs.Transaction.get(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[0].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')
      assert.property(result, 'isValidSLPTx')
      assert.equal(result.isValidSLPTx, false)
    })

    it('should get details about a SLP transaction', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.slpTxDetails)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.mockOpReturnData01)
        .onCall(1)
        .resolves(mockData.mockOpReturnData02)
        .onCall(2)
        .resolves(mockData.mockOpReturnData03)
        .onCall(3)
        .rejects(new Error('No OP_RETURN'))
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'waterfallValidateTxid')
        .resolves(true)

      const txid =
        '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1'

      const result = await bchjs.Transaction.get(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vout[0], 'tokenQty')
      assert.equal(result.vout[0].tokenQty, null)
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')
      assert.property(result.vin[0], 'tokenQty')
      assert.property(result, 'isValidSLPTx')
      assert.equal(result.isValidSLPTx, true)
    })

    it('should catch and throw error on network error', async () => {
      try {
        const txid =
          '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

        // Force an error
        sandbox
          .stub(bchjs.Transaction.rawTransaction, 'getTxData')
          .rejects(new Error('test error'))

        await bchjs.Transaction.get(txid)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    // This test case was created in response to a bug. When the input TX
    // was a Genesis SLP transaction, the inputs of the transaction were not
    // being hydrated properly.
    it('should get input details when input is a genesis tx', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.genesisTestInputTx)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.genesisTestOpReturnData01)
        .onCall(1)
        .resolves(mockData.genesisTestOpReturnData02)
        .onCall(2)
        .resolves(mockData.genesisTestOpReturnData02)
        .onCall(3)
        .resolves(mockData.genesisTestOpReturnData02)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'waterfallValidateTxid')
        .resolves(true)

      const txid =
        '874306bda204d3a5dd15e03ea5732cccdca4c33a52df35162cdd64e30ea7f04e'

      const result = await bchjs.Transaction.get(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vout[0], 'tokenQty')
      assert.equal(result.vout[0].tokenQty, null)
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')
      assert.property(result.vin[0], 'tokenQty')
      assert.property(result, 'isValidSLPTx')
      assert.equal(result.isValidSLPTx, true)

      // Assert inputs values unique to a Genesis input have the proper values.
      assert.equal(result.vin[0].tokenQty, 10000000)
      assert.equal(result.vin[1].tokenQty, null)
    })

    it('should get input details when input is a mint tx', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.mintTestInputTx)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.mintTestOpReturnData01)
        .onCall(1)
        .resolves(mockData.mintTestOpReturnData02)
        .onCall(2)
        .resolves(mockData.mintTestOpReturnData02)
        .onCall(3)
        .resolves(mockData.mintTestOpReturnData03)
        .onCall(4)
        .resolves(mockData.mintTestOpReturnData03)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'waterfallValidateTxid')
        .resolves(true)

      const txid =
        '4640a734063ea79fa587a3cac38a70a2f6f3db0011e23514024185982110d0fa'

      const result = await bchjs.Transaction.get(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vout[0], 'tokenQty')
      assert.equal(result.vout[0].tokenQty, null)
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')
      assert.property(result.vin[0], 'tokenQty')
      assert.property(result, 'isValidSLPTx')
      assert.equal(result.isValidSLPTx, true)

      // Assert inputs values unique to a Mint input have the proper values.
      assert.equal(result.vin[0].tokenQty, 43545.34534)
      assert.equal(result.vin[1].tokenQty, 2.34123)
      assert.equal(result.vin[2].tokenQty, null)
    })

    // This test case was generated from the problematic transaction that
    // used inputs in a 'non-standard' way.
    it('should correctly assign quantities to mixed mint inputs', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.sendTestInputTx01)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.sendTestOpReturnData01)
        .onCall(1)
        .resolves(mockData.sendTestOpReturnData02)
        .onCall(2)
        .resolves(mockData.sendTestOpReturnData03)
        .onCall(3)
        .resolves(mockData.sendTestOpReturnData03)
        .onCall(4)
        .resolves(mockData.sendTestOpReturnData04)
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'waterfallValidateTxid')
        .resolves(true)

      const txid =
        '6bc111fbf5b118021d68355ca19a0e77fa358dd931f284b2550f79a51ab4792a'

      const result = await bchjs.Transaction.get(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vout[0], 'tokenQty')
      assert.equal(result.vout[0].tokenQty, null)
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')
      assert.property(result.vin[0], 'tokenQty')
      assert.property(result, 'isValidSLPTx')
      assert.equal(result.isValidSLPTx, true)

      // Assert inputs values unique to a Mint input have the proper values.
      assert.equal(result.vin[0].tokenQty, 100000000)
      assert.equal(result.vin[1].tokenQty, null)
      assert.equal(result.vin[2].tokenQty, 99000000)
    })
  })

  describe('#get3', () => {
    it('should throw an error if txid is not specified', async () => {
      try {
        await bchjs.Transaction.get3()

        assert.fail('Unexpected code path!')
      } catch (err) {
        assert.include(
          err.message,
          'Input to Transaction.get() must be a string containing a TXID.'
        )
      }
    })

    it('should get details about a non-SLP transaction', async () => {
      const txid =
        '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.nonSlpTxDetails)
      sandbox
        .stub(bchjs.Transaction.blockchain, 'getBlockHeader')
        .resolves({ height: 602405 })
      sandbox.stub(bchjs.Transaction,'getTokenInfo').resolves(false)

      const result = await bchjs.Transaction.get3(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[0].scriptPubKey, 'addresses')

      // Assert that added properties exist.
      assert.property(result.vin[0], 'address')
      assert.property(result.vin[0], 'value')

      // Assert blockheight is added
      assert.equal(result.blockheight, 602405)
      assert.equal(result.isSlpTx, false)
    })

    it('should get details about a SLP SEND tx with SEND input', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.slpTxDetails)
      sandbox
        .stub(bchjs.Transaction.blockchain, 'getBlockHeader')
        .resolves({ height: 603424 })
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.mockOpReturnData01)
        .onCall(1)
        .resolves(mockData.mockOpReturnData02)
        .onCall(2)
        .resolves(mockData.mockOpReturnData03)
        .onCall(3)
        .rejects(new Error('No OP_RETURN'))

      const txid =
        '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1'

      const result = await bchjs.Transaction.get3(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert outputs have expected properties
      assert.equal(result.vout[0].tokenQty, null)
      assert.equal(result.vout[0].tokenQtyStr, null)
      assert.equal(result.vout[1].tokenQty, 1)
      assert.equal(result.vout[1].tokenQtyStr, "1")
      assert.equal(result.vout[2].tokenQty, 998833)
      assert.equal(result.vout[2].tokenQtyStr, "998833")
      assert.equal(result.vout[3].tokenQty, null)
      assert.equal(result.vout[3].tokenQtyStr, null)

      // Assert that inputs have expected properties
      assert.equal(result.vin[0].tokenQtyStr, "998834")
      assert.equal(result.vin[0].tokenQty, 998834)
      assert.equal(result.vin[0].tokenId, "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7")
      assert.equal(result.vin[1].tokenQtyStr, "0")
      assert.equal(result.vin[1].tokenQty, 0)
      assert.equal(result.vin[1].tokenId, null)

      // Assert blockheight is added
      assert.equal(result.blockheight, 603424)
      assert.equal(result.isSlpTx, true)
    })

    it('should catch and throw error on network error', async () => {
      try {
        const txid =
          '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7'

        // Force an error
        sandbox
          .stub(bchjs.Transaction.rawTransaction, 'getTxData')
          .rejects(new Error('test error'))

        await bchjs.Transaction.get3(txid)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'test error')
      }
    })

    // This test case was created in response to a bug. When the input TX
    // was a Genesis SLP transaction, the inputs of the transaction were not
    // being hydrated properly.
    it('should get details about a SLP SEND tx with GENSIS input', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.genesisTestInputTx)
      sandbox
        .stub(bchjs.Transaction.blockchain, 'getBlockHeader')
        .resolves({ height: 543409 })
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.genesisTestOpReturnData01)
        .onCall(1)
        .resolves(mockData.genesisTestOpReturnData02)
        .onCall(2)
        .resolves(mockData.genesisTestOpReturnData02)
        .onCall(3)
        .resolves(mockData.genesisTestOpReturnData02)

      const txid =
        '874306bda204d3a5dd15e03ea5732cccdca4c33a52df35162cdd64e30ea7f04e'

      const result = await bchjs.Transaction.get3(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert outputs have expected properties and values
      assert.equal(result.vout[0].tokenQty, null)
      assert.equal(result.vout[0].tokenQtyStr, null)
      assert.equal(result.vout[1].tokenQty, 5000000)
      assert.equal(result.vout[1].tokenQtyStr, "5000000")
      assert.equal(result.vout[2].tokenQty, 5000000)
      assert.equal(result.vout[2].tokenQtyStr, "5000000")
      assert.equal(result.vout[3].tokenQty, null)
      assert.equal(result.vout[3].tokenQtyStr, null)

      // Assert inputs have expected properties and values
      assert.equal(result.vin[0].tokenQty, 10000000)
      assert.equal(result.vin[0].tokenQtyStr, "10000000")
      assert.equal(result.vin[0].tokenId, "323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35")
      assert.equal(result.vin[1].tokenQty, 0)
      assert.equal(result.vin[1].tokenQtyStr, "0")
      assert.equal(result.vin[1].tokenId, null)

      // Assert blockheight is added
      assert.equal(result.blockheight, 543409)
      assert.equal(result.isSlpTx, true)
    })

    it('should get details about a SLP SEND tx with MINT (and GENESIS) input', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.mintTestInputTx)
      sandbox
        .stub(bchjs.Transaction.blockchain, 'getBlockHeader')
        .resolves({ height: 543614 })
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.mintTestOpReturnData01)
        .onCall(1)
        .resolves(mockData.mintTestOpReturnData02)
        .onCall(2)
        .resolves(mockData.mintTestOpReturnData02)
        .onCall(3)
        .resolves(mockData.mintTestOpReturnData03)
        .onCall(4)
        .resolves(mockData.mintTestOpReturnData03)

      const txid =
        '4640a734063ea79fa587a3cac38a70a2f6f3db0011e23514024185982110d0fa'

      const result = await bchjs.Transaction.get3(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert expected output properties and values exist.
      assert.equal(result.vout[0].tokenQty, null)
      assert.equal(result.vout[1].tokenQty, 43547.68657)
      assert.equal(result.vout[1].tokenQtyStr, "43547.68657")
      assert.equal(result.vout[2].tokenQty, null)

      // Assert expected input properties and values exist.
      assert.equal(result.vin[0].tokenQty, 43545.34534)
      assert.equal(result.vin[0].tokenQtyStr, "43545.34534")
      assert.equal(result.vin[0].tokenId, "938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8")
      assert.equal(result.vin[1].tokenQty, 2.34123)
      assert.equal(result.vin[1].tokenQtyStr, "2.34123")
      assert.equal(result.vin[1].tokenId, "938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8")
      assert.equal(result.vin[2].tokenQty, 0)
      assert.equal(result.vin[2].tokenQtyStr, "0")
      assert.equal(result.vin[2].tokenId, null)

      // Assert blockheight is added
      assert.equal(result.blockheight, 543614)
      assert.equal(result.isSlpTx, true)
    })

    // This test case was generated from the problematic transaction that
    // used inputs in a 'non-standard' way.
    it('should get details about a SLP SEND tx with MINT (and SEND) input', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.sendTestInputTx01)
      sandbox
        .stub(bchjs.Transaction.blockchain, 'getBlockHeader')
        .resolves({ height: 543957 })
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.sendTestOpReturnData01)
        .onCall(1)
        .resolves(mockData.sendTestOpReturnData02)
        .onCall(2)
        .resolves(mockData.sendTestOpReturnData03)
        .onCall(3)
        .resolves(mockData.sendTestOpReturnData03)
        .onCall(4)
        .resolves(mockData.sendTestOpReturnData04)

      const txid =
        '6bc111fbf5b118021d68355ca19a0e77fa358dd931f284b2550f79a51ab4792a'

      const result = await bchjs.Transaction.get3(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      // Assert that there are stanardized properties.
      assert.property(result, 'txid')
      assert.property(result, 'vin')
      assert.property(result, 'vout')
      assert.property(result.vout[0], 'value')
      assert.property(result.vout[1].scriptPubKey, 'addresses')

      // Assert the outputs have expected properties and values.
      assert.equal(result.vout[0].tokenQty, null)
      assert.equal(result.vout[1].tokenQty, 1000000)
      assert.equal(result.vout[1].tokenQtyStr, "1000000")
      assert.equal(result.vout[2].tokenQty, 198000000)
      assert.equal(result.vout[2].tokenQtyStr, "198000000")
      assert.equal(result.vout[3].tokenQty, null)

      // Assert the inputs have expected properties and values.
      assert.equal(result.vin[0].tokenQty, 100000000)
      assert.equal(result.vin[0].tokenQtyStr, "100000000")
      assert.equal(result.vin[0].tokenId, "550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b35")
      assert.equal(result.vin[1].tokenQty, 0)
      assert.equal(result.vin[1].tokenQtyStr, 0)
      assert.equal(result.vin[1].tokenId, null)
      assert.equal(result.vin[2].tokenQty, 99000000)
      assert.equal(result.vin[2].tokenQtyStr, "99000000")
      assert.equal(result.vin[2].tokenId, "550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b35")

      // Assert blockheight is added
      assert.equal(result.blockheight, 543957)
      assert.equal(result.isSlpTx, true)
    })

    // This was a problematic TX
    it('should process MINT TX with GENESIS input', async () => {
      // Mock dependencies
      sandbox
        .stub(bchjs.Transaction.rawTransaction, 'getTxData')
        .resolves(mockData.mintTestInputTx02)
      sandbox
        .stub(bchjs.Transaction.blockchain, 'getBlockHeader')
        .resolves({ height: 543614 })
      sandbox
        .stub(bchjs.Transaction.slpUtils, 'decodeOpReturn')
        .onCall(0)
        .resolves(mockData.mintTestOpReturnData04)
      //   .onCall(1)
      //   .resolves(mockData.sendTestOpReturnData02)
      //   .onCall(2)
      //   .resolves(mockData.sendTestOpReturnData03)
      //   .onCall(3)
      //   .resolves(mockData.sendTestOpReturnData03)
      //   .onCall(4)
      //   .resolves(mockData.sendTestOpReturnData04)

      const txid =
        'ee9d3cf5153599c134147e3fac9844c68e216843f4452a1ce15a29452af6db34'

      const result = await bchjs.Transaction.get3(txid)
      console.log(`result: ${JSON.stringify(result, null, 2)}`)
    })

    // It should process a GENESIS tx
  })
})
