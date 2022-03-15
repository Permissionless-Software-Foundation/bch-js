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

  describe('#_hydrateUtxo', () => {
    // // This captures an important corner-case. When an SLP token is created, the
    // // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
    it('should return details on minting baton from genesis transaction', async () => {
      // Mock the call to REST API
      // sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      // Stub the calls to decodeOpReturn.
      sandbox.stub(uut.Utils, 'decodeOpReturn').resolves({
        tokenType: 1,
        txType: 'GENESIS',
        ticker: 'SLPSDK',
        name: 'SLP SDK example using BITBOX',
        tokenId:
          'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
        documentUri: 'developer.bitcoin.com',
        documentHash: '',
        decimals: 8,
        mintBatonVout: 2,
        qty: '50700000000'
      })

      const utxos = [
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 3,
          amount: 0.00002015,
          satoshis: 2015,
          height: 594892,
          confirmations: 5
        },
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 2,
          amount: 0.00000546,
          satoshis: 546,
          height: 594892,
          confirmations: 5
        }
      ]

      const data = await uut.Utils._hydrateUtxo(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      // assert.equal(data[0], false, "Change UTXO marked as false.")
      assert.property(data[0], 'txid')
      assert.property(data[0], 'vout')
      assert.property(data[0], 'amount')
      assert.property(data[0], 'satoshis')
      assert.property(data[0], 'height')
      assert.property(data[0], 'confirmations')
      assert.property(data[0], 'isValid')
      assert.equal(data[0].isValid, false)

      assert.property(data[1], 'txid')
      assert.property(data[1], 'vout')
      assert.property(data[1], 'amount')
      assert.property(data[1], 'satoshis')
      assert.property(data[1], 'height')
      assert.property(data[1], 'confirmations')
      assert.property(data[1], 'utxoType')
      assert.property(data[1], 'tokenId')
      assert.property(data[1], 'tokenTicker')
      assert.property(data[1], 'tokenName')
      assert.property(data[1], 'tokenDocumentUrl')
      assert.property(data[1], 'tokenDocumentHash')
      assert.property(data[1], 'decimals')
    })

    // 429 means the user is exceeding the rate limits.
    it('should return isValid=null for 429 rate limit error', async () => {
      // Force decodeOpReturn() to throw a 429 error.
      sandbox.stub(uut.Utils, 'decodeOpReturn').rejects(mockData.mock429Error)

      const utxos = [
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 3,
          amount: 0.00002015,
          satoshis: 2015,
          height: 594892,
          confirmations: 5
        },
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 2,
          amount: 0.00000546,
          satoshis: 546,
          height: 594892,
          confirmations: 5
        }
      ]

      const result = await uut.Utils._hydrateUtxo(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result[0].isValid, null)
      assert.equal(result[1].isValid, null)
    })

    // 503 means the server is down or is not responding.
    it('should return isValid=null for 503 rate limit error', async () => {
      // Force decodeOpReturn() to throw a 429 error.
      sandbox.stub(uut.Utils, 'decodeOpReturn').rejects(mockData.mock503Error)

      const utxos = [
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 3,
          amount: 0.00002015,
          satoshis: 2015,
          height: 594892,
          confirmations: 5
        },
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 2,
          amount: 0.00000546,
          satoshis: 546,
          height: 594892,
          confirmations: 5
        }
      ]

      const result = await uut.Utils._hydrateUtxo(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result[0].isValid, null)
      assert.equal(result[1].isValid, null)
    })

    it('should return details for a simple SEND SLP token utxo', async () => {
      // Mock the call to REST API
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: 'SEND',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          amounts: ['200000000', '99887500000000']
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: 'GENESIS',
          ticker: 'TOK-CH',
          name: 'TokyoCash',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          documentUri: '',
          documentHash: '',
          decimals: 8,
          mintBatonVout: 0,
          qty: '2100000000000000'
        })

      // sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            'fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb',
          vout: 1,
          amount: 0.00000546,
          satoshis: 546,
          height: 596089,
          confirmations: 748
        }
      ]

      const data = await uut.Utils._hydrateUtxo(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.property(data[0], 'txid')
      assert.property(data[0], 'vout')
      assert.property(data[0], 'amount')
      assert.property(data[0], 'satoshis')
      assert.property(data[0], 'height')
      assert.property(data[0], 'confirmations')
      assert.property(data[0], 'utxoType')
      assert.property(data[0], 'tokenId')
      assert.property(data[0], 'tokenTicker')
      assert.property(data[0], 'tokenName')
      assert.property(data[0], 'tokenDocumentUrl')
      assert.property(data[0], 'tokenDocumentHash')
      assert.property(data[0], 'decimals')
      assert.property(data[0], 'tokenQty')
      assert.property(data[0], 'isValid')
      assert.equal(data[0].isValid, null)
    })

    // I don't know if this is the ideal behavior, but this is the behavior
    // that is in production, so I wanted to capture it in a test case. This
    // behavior can always be changed in the future.
    it('should throw error if 429 when querying Genesis transaction', async () => {
      try {
        // Mock the call to REST API
        // Stub the calls to decodeOpReturn.
        sandbox
          .stub(uut.Utils, 'decodeOpReturn')
          .onCall(0)
          .resolves({
            tokenType: 1,
            txType: 'SEND',
            tokenId:
              '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
            amounts: ['200000000', '99887500000000']
          })
          .onCall(1)
          .rejects(mockData.mock429Error)

        const utxos = [
          {
            txid:
              'fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb',
            vout: 1,
            amount: 0.00000546,
            satoshis: 546,
            height: 596089,
            confirmations: 748
          }
        ]

        await uut.Utils._hydrateUtxo(utxos)

        assert.fail('Unexpected result')
      } catch (err) {
        // console.log('error: ', err)

        assert.property(err, 'message')
        assert.property(err, 'response')
        assert.equal(err.response.status, 429)
        assert.equal(err.response.statusText, 'Too Many Requests')
        assert.include(err.response.data.error, 'Too many requests')
      }
    })

    it('should add delay if delay is specified', async () => {
      // Mock the call to REST API
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: 'SEND',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          amounts: ['200000000', '99887500000000']
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: 'GENESIS',
          ticker: 'TOK-CH',
          name: 'TokyoCash',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          documentUri: '',
          documentHash: '',
          decimals: 8,
          mintBatonVout: 0,
          qty: '2100000000000000'
        })

      // sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            'fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb',
          vout: 1,
          amount: 0.00000546,
          satoshis: 546,
          height: 596089,
          confirmations: 748
        }
      ]

      const usrObj = {
        utxoDelay: 100
      }

      await uut.Utils._hydrateUtxo(utxos, usrObj)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      // TODO: This test should realy assert that the test took at least 100mS
      // to complete. However, as-is, it exercises the code path, so not
      // throwing an error can be considered a pass.
      assert.equal(true, true)
    })
  })

  describe('#tokenUtxoDetails', () => {
    it('should throw error if input is not an array.', async () => {
      try {
        await uut.Utils.tokenUtxoDetails('test')

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        assert.include(
          err.message,
          'Input must be an array',
          'Expected error message.'
        )
      }
    })

    it('should throw error if utxo does not have txid or tx_hash property.', async () => {
      try {
        const utxos = [
          {
            txid:
              'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
            vout: 3,
            amount: 0.00002015,
            satoshis: 2015,
            height: 594892,
            confirmations: 5
          },
          {
            vout: 2,
            amount: 0.00000546,
            satoshis: 546,
            height: 594892,
            confirmations: 5
          }
        ]

        await uut.Utils.tokenUtxoDetails(utxos)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        assert.include(
          err.message,
          'utxo 1 does not have a txid or tx_hash property',
          'Expected error message.'
        )
      }
    })

    // // This captures an important corner-case. When an SLP token is created, the
    // // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
    it('should return details on minting baton from genesis transaction', async () => {
      // Mock the call to REST API
      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      // Stub the calls to decodeOpReturn.
      sandbox.stub(uut.Utils, 'decodeOpReturn').resolves({
        tokenType: 1,
        txType: 'GENESIS',
        ticker: 'SLPSDK',
        name: 'SLP SDK example using BITBOX',
        tokenId:
          'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
        documentUri: 'developer.bitcoin.com',
        documentHash: '',
        decimals: 8,
        mintBatonVout: 2,
        qty: '50700000000'
      })

      const utxos = [
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 3,
          amount: 0.00002015,
          satoshis: 2015,
          height: 594892,
          confirmations: 5
        },
        {
          txid:
            'bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90',
          vout: 2,
          amount: 0.00000546,
          satoshis: 546,
          height: 594892,
          confirmations: 5
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      // assert.equal(data[0], false, "Change UTXO marked as false.")
      assert.property(data[0], 'txid')
      assert.property(data[0], 'vout')
      assert.property(data[0], 'amount')
      assert.property(data[0], 'satoshis')
      assert.property(data[0], 'height')
      assert.property(data[0], 'confirmations')
      assert.property(data[0], 'isValid')
      assert.equal(data[0].isValid, false)

      assert.property(data[1], 'txid')
      assert.property(data[1], 'vout')
      assert.property(data[1], 'amount')
      assert.property(data[1], 'satoshis')
      assert.property(data[1], 'height')
      assert.property(data[1], 'confirmations')
      assert.property(data[1], 'utxoType')
      assert.property(data[1], 'tokenId')
      assert.property(data[1], 'tokenTicker')
      assert.property(data[1], 'tokenName')
      assert.property(data[1], 'tokenDocumentUrl')
      assert.property(data[1], 'tokenDocumentHash')
      assert.property(data[1], 'decimals')
      assert.property(data[1], 'isValid')
      assert.equal(data[1].isValid, true)
    })

    it('should return details for a MINT token utxo', async () => {
      // Mock the call to REST API

      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: 'MINT',
          tokenId:
            '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0',
          mintBatonVout: 2,
          qty: '1000000000000'
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: 'GENESIS',
          ticker: 'PSF',
          name: 'Permissionless Software Foundation',
          tokenId:
            '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0',
          documentUri: 'psfoundation.cash',
          documentHash: '',
          decimals: 8,
          mintBatonVout: 2,
          qty: '1988209163133'
        })

      // Stub the call to validateTxid
      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            'cf4b922d1e1aa56b52d752d4206e1448ea76c3ebe69b3b97d8f8f65413bd5c76',
          vout: 1,
          amount: 0.00000546,
          satoshis: 546,
          height: 600297,
          confirmations: 76
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.property(data[0], 'txid')
      assert.property(data[0], 'vout')
      assert.property(data[0], 'amount')
      assert.property(data[0], 'satoshis')
      assert.property(data[0], 'height')
      assert.property(data[0], 'confirmations')
      assert.property(data[0], 'utxoType')
      assert.property(data[0], 'transactionType')
      assert.property(data[0], 'tokenId')
      assert.property(data[0], 'tokenTicker')
      assert.property(data[0], 'tokenName')
      assert.property(data[0], 'tokenDocumentUrl')
      assert.property(data[0], 'tokenDocumentHash')
      assert.property(data[0], 'decimals')
      assert.property(data[0], 'mintBatonVout')
      assert.property(data[0], 'tokenQty')
      assert.property(data[0], 'isValid')
      assert.equal(data[0].isValid, true)
    })

    it('should return details for a simple SEND SLP token utxo', async () => {
      // Mock the call to REST API
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: 'SEND',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          amounts: ['200000000', '99887500000000']
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: 'GENESIS',
          ticker: 'TOK-CH',
          name: 'TokyoCash',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          documentUri: '',
          documentHash: '',
          decimals: 8,
          mintBatonVout: 0,
          qty: '2100000000000000'
        })

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            'fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb',
          vout: 1,
          amount: 0.00000546,
          satoshis: 546,
          height: 596089,
          confirmations: 748
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.property(data[0], 'txid')
      assert.property(data[0], 'vout')
      assert.property(data[0], 'amount')
      assert.property(data[0], 'satoshis')
      assert.property(data[0], 'height')
      assert.property(data[0], 'confirmations')
      assert.property(data[0], 'utxoType')
      assert.property(data[0], 'tokenId')
      assert.property(data[0], 'tokenTicker')
      assert.property(data[0], 'tokenName')
      assert.property(data[0], 'tokenDocumentUrl')
      assert.property(data[0], 'tokenDocumentHash')
      assert.property(data[0], 'decimals')
      assert.property(data[0], 'tokenQty')
      assert.property(data[0], 'isValid')
      assert.equal(data[0].isValid, true)
    })

    it('should handle BCH and SLP utxos in the same TX', async () => {
      // Mock external dependencies.
      // sandbox
      //   .stub(uut.Utils, 'validateTxid')
      //   .resolves(mockData.mockDualValidation)
      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: 'SEND',
          tokenId:
            'dd84ca78db4d617221b58eabc6667af8fe2f7eadbfcc213d35be9f1b419beb8d',
          amounts: ['1', '5']
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: 'SEND',
          tokenId:
            'dd84ca78db4d617221b58eabc6667af8fe2f7eadbfcc213d35be9f1b419beb8d',
          amounts: ['1', '5']
        })
        .onCall(2)
        .resolves({
          tokenType: 1,
          txType: 'GENESIS',
          ticker: 'TAP',
          name: 'Thoughts and Prayers',
          tokenId:
            'dd84ca78db4d617221b58eabc6667af8fe2f7eadbfcc213d35be9f1b419beb8d',
          documentUri: '',
          documentHash: '',
          decimals: 0,
          mintBatonVout: 2,
          qty: '1000000'
        })

      const utxos = [
        {
          txid:
            'd56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56',
          vout: 3,
          value: '6816',
          height: 606848,
          confirmations: 13,
          satoshis: 6816
        },
        {
          txid:
            'd56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56',
          vout: 2,
          value: '546',
          height: 606848,
          confirmations: 13,
          satoshis: 546
        }
      ]

      const result = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.equal(result.length, 2)

      assert.property(result[0], 'txid')
      assert.property(result[0], 'vout')
      assert.property(result[0], 'value')
      assert.property(result[0], 'satoshis')
      assert.property(result[0], 'height')
      assert.property(result[0], 'confirmations')
      assert.property(result[0], 'isValid')
      assert.equal(result[0].isValid, false)

      assert.equal(result[1].isValid, true)
      assert.equal(result[1].utxoType, 'token')
      assert.equal(result[1].transactionType, 'send')
    })

    it('should handle problematic utxos', async () => {
      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .onCall(0)
        .throws({ message: 'scriptpubkey not op_return' })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: 'SEND',
          tokenId:
            'f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f',
          amounts: ['5000000', '395010942']
        })
        .onCall(2)
        .resolves({
          tokenType: 1,
          txType: 'GENESIS',
          ticker: 'AUDC',
          name: 'AUD Coin',
          tokenId:
            'f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f',
          documentUri: 'audcoino@gmail.com',
          documentHash: '',
          decimals: 6,
          mintBatonVout: 0,
          qty: '2000000000000000000'
        })

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            '0e3a217fc22612002031d317b4cecd9b692b66b52951a67b23c43041aefa3959',
          vout: 0,
          amount: 0.00018362,
          satoshis: 18362,
          height: 613483,
          confirmations: 124
        },
        {
          txid:
            '67fd3c7c3a6eb0fea9ab311b91039545086220f7eeeefa367fa28e6e43009f19',
          vout: 1,
          amount: 0.00000546,
          satoshis: 546,
          height: 612075,
          confirmations: 1532
        }
      ]

      const result = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.equal(result.length, 2)

      assert.property(result[0], 'txid')
      assert.property(result[0], 'vout')
      assert.property(result[0], 'amount')
      assert.property(result[0], 'satoshis')
      assert.property(result[0], 'height')
      assert.property(result[0], 'confirmations')
      assert.property(result[0], 'isValid')
      assert.equal(result[0].isValid, false)

      assert.equal(result[1].isValid, true)
      assert.equal(result[1].utxoType, 'token')
      assert.equal(result[1].transactionType, 'send')
    })

    it('should return isValid=false for BCH-only UTXOs', async () => {
      // Mock live network calls

      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .throws(new Error('scriptpubkey not op_return'))

      const utxos = [
        {
          txid:
            'a937f792c7c9eb23b4f344ce5c233d1ac0909217d0a504d71e6b1e4efb864a3b',
          vout: 0,
          amount: 0.00001,
          satoshis: 1000,
          confirmations: 0,
          ts: 1578424704
        },
        {
          txid:
            '53fd141c2e999e080a5860887441a2c45e9cbe262027e2bd2ac998fc76e43c44',
          vout: 0,
          amount: 0.00001,
          satoshis: 1000,
          confirmations: 0,
          ts: 1578424634
        }
      ]

      const result = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)

      assert.property(result[0], 'txid')
      assert.property(result[0], 'vout')
      assert.property(result[0], 'amount')
      assert.property(result[0], 'satoshis')
      assert.property(result[0], 'confirmations')
      assert.property(result[0], 'isValid')
      assert.equal(result[0].isValid, false)

      assert.property(result[1], 'txid')
      assert.property(result[1], 'vout')
      assert.property(result[1], 'amount')
      assert.property(result[1], 'satoshis')
      assert.property(result[1], 'confirmations')
      assert.property(result[1], 'isValid')
      assert.equal(result[1].isValid, false)
    })

    it('should decode a Genesis transaction', async () => {
      const slpData = {
        tokenType: 1,
        txType: 'GENESIS',
        ticker: 'SLPTEST',
        name: 'SLP Test Token',
        tokenId:
          'd2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954',
        documentUri: 'https://FullStack.cash',
        documentHash: '',
        decimals: 8,
        mintBatonVout: 2,
        qty: '10000000000'
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox.stub(uut.Utils, 'decodeOpReturn').resolves(slpData)

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            'd2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954',
          vout: 1,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            'd2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954',
          vout: 2,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            'd2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954',
          vout: 3,
          value: '12178',
          confirmations: 0,
          satoshis: 12178
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.isArray(data)

      assert.equal(data[0].utxoType, 'token')
      assert.equal(data[0].tokenQty, 100)
      assert.equal(data[0].isValid, true)
      assert.equal(data[0].tokenType, 1)

      assert.equal(data[1].utxoType, 'minting-baton')
      assert.equal(data[1].isValid, true)
      assert.equal(data[1].tokenType, 1)

      assert.equal(data[2].isValid, false)
    })

    it('should decode a Mint transaction', async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 1,
        txType: 'MINT',
        tokenId:
          '9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136',
        mintBatonVout: 2,
        qty: '10000000000'
      }

      const genesisData = {
        tokenType: 1,
        txType: 'GENESIS',
        ticker: 'SLPTEST',
        name: 'SLP Test Token',
        tokenId:
          '9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136',
        documentUri: 'https://FullStack.cash',
        documentHash: '',
        decimals: 8,
        mintBatonVout: 2,
        qty: '10000000000'
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .resolves(slpData)
        .onCall(1)
        .resolves(genesisData)
        .onCall(2)
        .resolves(slpData)
        .onCall(3)
        .resolves(genesisData)
        .onCall(4)
        .resolves(slpData)

      // Stub the call to validateTxid
      // sandbox
      //   .stub(uut.Utils, 'validateTxid')
      //   .resolves(stubValid)
      //   .onCall(1)
      //   .resolves(stubValid)
      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            '880587f01e3112e779c0fdf1b9b859c242a28e56ead85483eeedcaa52f051a04',
          vout: 1,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            '880587f01e3112e779c0fdf1b9b859c242a28e56ead85483eeedcaa52f051a04',
          vout: 2,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            '880587f01e3112e779c0fdf1b9b859c242a28e56ead85483eeedcaa52f051a04',
          vout: 3,
          value: '10552',
          confirmations: 0,
          satoshis: 10552
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.isArray(data)

      assert.equal(data[0].utxoType, 'token')
      assert.equal(data[0].tokenQty, 100)
      assert.equal(data[0].isValid, true)
      assert.equal(data[0].tokenType, 1)

      assert.equal(data[1].utxoType, 'minting-baton')
      assert.equal(data[1].isValid, true)
      assert.equal(data[1].tokenType, 1)

      assert.equal(data[2].isValid, false)
    })

    it('should decode a NFT Group Genesis transaction', async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 129,
        txType: 'GENESIS',
        ticker: 'NFTTT',
        name: 'NFT Test Token',
        tokenId:
          '4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4',
        documentUri: 'https://FullStack.cash',
        documentHash: '',
        decimals: 0,
        mintBatonVout: 2,
        qty: '1'
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .resolves(slpData)
        .onCall(1)
        .resolves(slpData)
        .onCall(2)
        .resolves(slpData)
        .onCall(3)
        .resolves(slpData)
        .onCall(4)
        .resolves(slpData)

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            '4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4',
          vout: 3,
          value: '15620',
          height: 638207,
          confirmations: 3,
          satoshis: 15620
        },
        {
          txid:
            '4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4',
          vout: 2,
          value: '546',
          height: 638207,
          confirmations: 3,
          satoshis: 546
        },
        {
          txid:
            '4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4',
          vout: 1,
          value: '546',
          height: 638207,
          confirmations: 3,
          satoshis: 546
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.isArray(data)

      assert.equal(data[0].isValid, false)

      assert.equal(data[1].utxoType, 'minting-baton')
      assert.equal(data[1].isValid, true)
      assert.equal(data[1].tokenType, 129)

      assert.equal(data[2].utxoType, 'token')
      assert.equal(data[2].tokenType, 129)
      assert.equal(data[1].isValid, true)
    })

    it('should decode a NFT Group Mint transaction', async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 129,
        txType: 'MINT',
        tokenId:
          'eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981',
        mintBatonVout: 2,
        qty: '10'
      }

      const genesisData = {
        tokenType: 129,
        txType: 'GENESIS',
        ticker: 'NFTTT',
        name: 'NFT Test Token',
        tokenId:
          'eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981',
        documentUri: 'https://FullStack.cash',
        documentHash: '',
        decimals: 0,
        mintBatonVout: 2,
        qty: '1'
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .resolves(slpData)
        .onCall(1)
        .resolves(slpData)
        .onCall(2)
        .resolves(genesisData)
        .onCall(3)
        .resolves(slpData)
        .onCall(4)
        .resolves(genesisData)

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            '35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919',
          vout: 3,
          value: '15620',
          height: 638207,
          confirmations: 3,
          satoshis: 15620
        },
        {
          txid:
            '35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919',
          vout: 2,
          value: '546',
          height: 638207,
          confirmations: 3,
          satoshis: 546
        },
        {
          txid:
            '35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919',
          vout: 1,
          value: '546',
          height: 638207,
          confirmations: 3,
          satoshis: 546
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.isArray(data)

      assert.equal(data[0].isValid, false)

      assert.equal(data[1].utxoType, 'minting-baton')
      assert.equal(data[1].tokenType, 129)
      assert.equal(data[1].isValid, true)

      assert.equal(data[2].utxoType, 'token')
      assert.equal(data[2].tokenType, 129)
      assert.equal(data[2].isValid, true)
    })

    it('should decode a NFT Child Genesis transaction', async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 65,
        txType: 'GENESIS',
        ticker: 'NFTC',
        name: 'NFT Child',
        tokenId:
          '9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683',
        documentUri: 'https://FullStack.cash',
        documentHash: '',
        decimals: 0,
        mintBatonVout: 0,
        qty: '1'
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .resolves(slpData)
        .onCall(1)
        .resolves(slpData)

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            '9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683',
          vout: 1,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            '9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683',
          vout: 2,
          value: '13478',
          confirmations: 0,
          satoshis: 13478
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.isArray(data)

      assert.equal(data[0].utxoType, 'token')
      assert.equal(data[0].tokenType, 65)
      assert.equal(data[0].isValid, true)

      assert.equal(data[1].isValid, false)
    })

    it('should decode an NFT Child Send transaction', async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 65,
        txType: 'SEND',
        tokenId:
          '9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683',
        amounts: ['1']
      }

      const genesisData = {
        tokenType: 65,
        txType: 'GENESIS',
        ticker: 'NFTC',
        name: 'NFT Child',
        tokenId:
          '9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683',
        documentUri: 'https://FullStack.cash',
        documentHash: '',
        decimals: 0,
        mintBatonVout: 0,
        qty: '1'
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .resolves(slpData)
        .onCall(1)
        .resolves(genesisData)
        .onCall(2)
        .resolves(slpData)

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            '6d68a7ffbb63ef851c43025f801a1d365cddda50b00741bca022c743d74cd61a',
          vout: 1,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            '6d68a7ffbb63ef851c43025f801a1d365cddda50b00741bca022c743d74cd61a',
          vout: 2,
          value: '12136',
          confirmations: 0,
          satoshis: 12136
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.isArray(data)

      assert.equal(data[0].utxoType, 'token')
      assert.equal(data[0].transactionType, 'send')
      assert.equal(data[0].tokenType, 65)
      assert.equal(data[0].isValid, true)

      assert.equal(data[1].isValid, false)
    })

    it('should decode an NFT Group Send transaction', async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 129,
        txType: 'SEND',
        tokenId:
          'eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981',
        amounts: ['1', '8']
      }

      const genesisData = {
        tokenType: 129,
        txType: 'GENESIS',
        ticker: 'NFTTT',
        name: 'NFT Test Token',
        tokenId:
          'eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981',
        documentUri: 'https://FullStack.cash',
        documentHash: '',
        decimals: 0,
        mintBatonVout: 2,
        qty: '1'
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .resolves(slpData)
        .onCall(1)
        .resolves(genesisData)
        .onCall(2)
        .resolves(slpData)
        .onCall(3)
        .resolves(genesisData)
        .onCall(4)
        .resolves(slpData)

      sandbox.stub(uut.Utils, 'waterfallValidateTxid').resolves(true)

      const utxos = [
        {
          txid:
            '57cc47c265ce878679e95e2cec510d8a1a9840f5c62feb4743cc5947d57d9766',
          vout: 1,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            '57cc47c265ce878679e95e2cec510d8a1a9840f5c62feb4743cc5947d57d9766',
          vout: 2,
          value: '546',
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            '57cc47c265ce878679e95e2cec510d8a1a9840f5c62feb4743cc5947d57d9766',
          vout: 3,
          value: '10794',
          confirmations: 0,
          satoshis: 10794
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.isArray(data)

      assert.equal(data[0].utxoType, 'token')
      assert.equal(data[0].transactionType, 'send')
      assert.equal(data[0].tokenType, 129)
      assert.equal(data[0].isValid, true)

      assert.equal(data[1].utxoType, 'token')
      assert.equal(data[1].transactionType, 'send')
      assert.equal(data[1].tokenType, 129)
      assert.equal(data[1].isValid, true)

      assert.equal(data[2].isValid, false)
    })

    it('should return null value when 429 recieved', async () => {
      const utxos = [
        {
          height: 654522,
          tx_hash:
            '072a1e2c2d5f1309bf4eef7f88684e4ecd544a903b386b07f3e04b91b13d8af1',
          tx_pos: 0,
          value: 6999,
          satoshis: 6999,
          txid:
            '072a1e2c2d5f1309bf4eef7f88684e4ecd544a903b386b07f3e04b91b13d8af1',
          vout: 0
        },
        {
          height: 654522,
          tx_hash:
            'a72db6a0883ecb8e379f317231b2571e41e041b7b1107e3e54c2e0b3386ac6ca',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'a72db6a0883ecb8e379f317231b2571e41e041b7b1107e3e54c2e0b3386ac6ca',
          vout: 1
        }
      ]

      sandbox.stub(uut.Utils, 'decodeOpReturn').rejects({
        error:
          'Too many requests. Your limits are currently 3 requests per minute. Increase rate limits at https://fullstack.cash'
      })

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      // Values should be 'null' to signal that a determination could not be made
      // due to a throttling issue.
      assert.equal(data[0].isValid, null)
      assert.equal(data[1].isValid, null)
    })

    // it("should handle a dust attack", async () => {
    it('should handle dust attack UTXOs', async () => {
      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .rejects(new Error('lokad id wrong size'))

      const utxos = [
        {
          height: 655965,
          tx_hash:
            'a675af87dcd8d39be782737aa52e0076b52eb2f5ce355ffcb5567a64dd96b77e',
          tx_pos: 151,
          value: 547,
          satoshis: 547,
          txid:
            'a675af87dcd8d39be782737aa52e0076b52eb2f5ce355ffcb5567a64dd96b77e',
          vout: 151,
          address: 'bitcoincash:qq4dw3sm8qvglspy6w2qg0u2ugsy9zcfcqrpeflwww',
          hdIndex: 11
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.equal(data[0].isValid, false)
    })

    it('should invalidate a malformed SLP OP_RETURN', async () => {
      sandbox
        .stub(uut.Utils, 'decodeOpReturn')
        .rejects(new Error('trailing data'))

      const utxos = [
        // Malformed SLP tx
        {
          note: 'Malformed SLP tx',
          tx_hash:
            'f7e5199ef6669ad4d078093b3ad56e355b6ab84567e59ad0f08a5ad0244f783a',
          tx_pos: 1,
          value: 546
        }
      ]

      const data = await uut.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.equal(data[0].isValid, false)
    })
  })
})
