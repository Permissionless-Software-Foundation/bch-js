// Public npm libraries
const assert = require('chai').assert
const sinon = require('sinon')
const cloneDeep = require('lodash.clonedeep')

// Unit under test
const SLP = require('../../src/slp/slp')
let uut
// let SERVER

const REST_URL = process.env.RESTURL
  ? process.env.RESTURL
  : 'https://bchn.fullstack.cash/v5/'

// Mock data used for unit tests
const mockDataLib = require('./fixtures/slp/mock-utils')
let mockData

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = 'unit'

describe('#SLP Utils', () => {
  let sandbox

  beforeEach(() => {
    // Activate nock if it's inactive.
    // if (!nock.isActive()) nock.activate()

    mockData = cloneDeep(mockDataLib)

    sandbox = sinon.createSandbox()

    uut = new SLP({
      restURL: REST_URL,
      apiToken: process.env.BCHJSTOKEN
    })
    // SERVER = uut.restURL
  })

  afterEach(() => {
    // Clean up HTTP mocks.
    // nock.cleanAll() // clear interceptor list.
    // nock.restore()

    sandbox.restore()
  })

  describe('#decodeOpReturn', () => {
    it('should throw an error for a non-string input', async () => {
      try {
        const txid = 53423 // Not a string.

        await uut.Utils.decodeOpReturn(txid)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)
        assert.include(err.message, 'txid string must be included')
      }
    })

    it('should throw an error for non-SLP transaction', async () => {
      try {
        // Mock the call to the REST API
        sandbox
          .stub(uut.Utils.axios, 'post')
          .resolves({ data: [mockData.nonSLPTxDetailsWithoutOpReturn] })

        const txid =
          '3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec'

        await uut.Utils.decodeOpReturn(txid)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)
        assert.include(err.message, 'scriptpubkey not op_return')
      }
    })

    it('should throw an error for non-SLP transaction with OP_RETURN', async () => {
      try {
        // Mock the call to the REST API
        sandbox
          .stub(uut.Utils.axios, 'post')
          .resolves({ data: [mockData.nonSLPTxDetailsWithOpReturn] })

        const txid =
          '2ff74c48a5d657cf45f699601990bffbbe7a2a516d5480674cbf6c6a4497908f'

        await uut.Utils.decodeOpReturn(txid)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)
        assert.include(err.message, 'SLP not in first chunk')
      }
    })

    it('should decode a genesis transaction', async () => {
      // Mock the call to the REST API
      sandbox
        .stub(uut.Utils.axios, 'post')
        .resolves({ data: [mockData.txDetailsSLPGenesis] })

      const txid =
        'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90'

      const result = await uut.Utils.decodeOpReturn(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        'tokenType',
        'txType',
        'tokenId',
        'ticker',
        'name',
        'documentUri',
        'documentHash',
        'decimals',
        'mintBatonVout',
        'qty'
      ])
    })

    it('should decode a mint transaction', async () => {
      // Mock the call to the REST API
      sandbox
        .stub(uut.Utils.axios, 'post')
        .resolves({ data: [mockData.txDetailsSLPMint] })

      const txid =
        '65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4'

      const result = await uut.Utils.decodeOpReturn(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        'tokenType',
        'txType',
        'tokenId',
        'mintBatonVout',
        'qty'
      ])
    })

    it('should decode a send transaction', async () => {
      // Mock the call to the REST API
      sandbox
        .stub(uut.Utils.axios, 'post')
        .resolves({ data: [mockData.txDetailsSLPSend] })

      const txid =
        '4f922565af664b6fdf0a1ba3924487344be721b3d8815c62cafc8a51e04a8afa'

      const result = await uut.Utils.decodeOpReturn(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['tokenType', 'txType', 'tokenId', 'amounts'])
    })

    it('should properly decode a Genesis transaction with no minting baton', async () => {
      // Mock the call to the REST API.
      sandbox
        .stub(uut.Utils.axios, 'post')
        .resolves({ data: [mockData.txDetailsSLPGenesisNoBaton] })

      const txid =
        '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7'

      const data = await uut.Utils.decodeOpReturn(txid)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.equal(data.mintBatonVout, 0)
    })

    it('should decode a send transaction with alternate encoding', async () => {
      // Mock the call to the REST API
      sandbox
        .stub(uut.Utils.axios, 'post')
        .resolves({ data: [mockData.txDetailsSLPSendAlt] })

      const txid =
        'd94357179775425ebc59c93173bd6dc9854095f090a2eb9dcfe9797398bc8eae'

      const data = await uut.Utils.decodeOpReturn(txid)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.hasAnyKeys(data, [
        'transactionType',
        'txType',
        'tokenId',
        'amounts'
      ])
    })

    // Note: This TX is interpreted as valid by the original decodeOpReturn().
    // Fixing this issue and related issues was the reason for creating the
    // decodeOpReturn2() method using the slp-parser library.
    it('should throw error for invalid SLP transaction', async () => {
      try {
        // Mock the call to the REST API
        sandbox
          .stub(uut.Utils.axios, 'post')
          .resolves({ data: [mockData.mockInvalidSlpSend] })

        const txid =
          'a60a522cc11ad7011b74e57fbabbd99296e4b9346bcb175dcf84efb737030415'

        await uut.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'amount string size not 8 bytes')
      }
    })

    it('should decode a NFT Parent transaction', async () => {
      // Mock the call to the REST API.
      sandbox
        .stub(uut.Utils.axios, 'post')
        .resolves({ data: [mockData.txDetailsSLPNftGenesis] })

      const txid =
        '4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4'

      const data = await uut.Utils.decodeOpReturn(txid)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.property(data, 'tokenType')
      assert.property(data, 'txType')
      assert.property(data, 'ticker')
      assert.property(data, 'name')
      assert.property(data, 'tokenId')
      assert.property(data, 'documentUri')
      assert.property(data, 'documentHash')
      assert.property(data, 'decimals')
      assert.property(data, 'mintBatonVout')
      assert.property(data, 'qty')

      assert.equal(data.tokenType, 129)
      assert.equal(data.mintBatonVout, 2)
      assert.equal(data.qty, 1)
    })

    it('should decode a NFT Child transaction', async () => {
      // Mock the call to the REST API.
      sandbox
        .stub(uut.Utils.axios, 'post')
        .resolves({ data: [mockData.txDetailsSLPNftChild] })

      const txid =
        'eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b'

      const data = await uut.Utils.decodeOpReturn(txid)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.property(data, 'tokenType')
      assert.property(data, 'txType')
      assert.property(data, 'ticker')
      assert.property(data, 'name')
      assert.property(data, 'tokenId')
      assert.property(data, 'documentUri')
      assert.property(data, 'documentHash')
      assert.property(data, 'decimals')
      assert.property(data, 'mintBatonVout')
      assert.property(data, 'qty')

      assert.equal(data.tokenType, 65)
      assert.equal(data.mintBatonVout, 0)
      assert.equal(data.qty, '1')
    })

    // 429 means the user is exceeding the rate limits.
    it('should throw error when axios returns 429 status', async () => {
      try {
        // Mock the call to the REST API
        sandbox.stub(uut.Utils.axios, 'post').rejects(mockData.mock429Error)

        const txid =
          'a60a522cc11ad7011b74e57fbabbd99296e4b9346bcb175dcf84efb737030415'

        await uut.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.fail('Unexpect result')
      } catch (err) {
        // console.log('err: ', err)

        assert.property(err, 'message')
        assert.property(err, 'response')
        assert.equal(err.response.status, 429)
        assert.equal(err.response.statusText, 'Too Many Requests')
        assert.include(err.response.data.error, 'Too many requests')
      }
    })

    // 503 means the service is down.
    it('should throw error when axios returns 503 status', async () => {
      try {
        // Mock the call to the REST API
        sandbox.stub(uut.Utils.axios, 'post').rejects(mockData.mock503Error)

        const txid =
          'a60a522cc11ad7011b74e57fbabbd99296e4b9346bcb175dcf84efb737030415'

        await uut.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.fail('Unexpect result')
      } catch (err) {
        // console.log('err: ', err)

        assert.property(err, 'message')
        assert.property(err, 'response')
        assert.equal(err.response.status, 503)
        assert.equal(err.response.statusText, 'Service Unavailable')
        assert.property(err.response, 'data')
      }
    })
  })
})
