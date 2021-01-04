/*
  Unit tests for the TokenType1 library.
*/

const assert = require('chai').assert
const sinon = require('sinon')
// const axios = require("axios")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = 'unit'
// const SERVER = bchjs.restURL

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

// Mock data used for unit tests
// const mockData = require("./fixtures/slp/mock-utils")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = 'unit'

describe('#SLP NFT1', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#newNFTGroupOpReturn', () => {
    it('should generate new NFT Group OP_RETURN code', () => {
      const configObj = {
        name: 'SLP Test Token',
        ticker: 'SLPTEST',
        documentUrl: 'https://bchjs.cash',
        documentHash: '',
        initialQty: 5
      }

      const result = bchjs.SLP.NFT1.newNFTGroupOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe('#mintNFTGroupOpReturn', () => {
    it('should generate NFT Group Mint OP_RETURN code', () => {
      const tokenUtxoData = [
        {
          txid:
            '3de3766b10506c9156533f1639979e49d1884521543c13e4af73647df1ed3f76',
          vout: 2,
          value: '546',
          height: 638207,
          confirmations: 63,
          satoshis: 546,
          utxoType: 'minting-baton',
          transactionType: 'mint',
          tokenId:
            '680967b3f6fe080dbca8dbd370665bd29742e3490db24e2f28d08b424511807e',
          tokenType: 129,
          tokenTicker: 'NFTP',
          tokenName: 'NFT Parent',
          tokenDocumentUrl: 'FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        },
        {
          txid:
            '3de3766b10506c9156533f1639979e49d1884521543c13e4af73647df1ed3f76',
          vout: 1,
          value: '546',
          height: 638207,
          confirmations: 63,
          satoshis: 546,
          utxoType: 'token',
          tokenQty: 10,
          transactionType: 'mint',
          tokenId:
            '680967b3f6fe080dbca8dbd370665bd29742e3490db24e2f28d08b424511807e',
          tokenType: 129,
          tokenTicker: 'NFTP',
          tokenName: 'NFT Parent',
          tokenDocumentUrl: 'FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        }
      ]

      const result = bchjs.SLP.NFT1.mintNFTGroupOpReturn(tokenUtxoData, 10)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe('#generateNFTChildOpReturn', () => {
    it('should generate NFT Genesis OP_RETURN code', () => {
      const configObj = {
        name: 'SLP Test Token',
        ticker: 'SLPTEST',
        documentUrl: 'https://bchjs.cash',
        documentHash: ''
      }

      const result = bchjs.SLP.NFT1.generateNFTChildGenesisOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe('#generateNFTChildSendOpReturn', () => {
    it('should generate send OP_RETURN code for no change', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          txid:
            '81955624a8eb7011769ff5faa607f78f84b0f8152b9145e7db8b1e521c895ee3',
          vout: 1,
          value: '546',
          height: 638273,
          confirmations: 42,
          satoshis: 546,
          utxoType: 'token',
          tokenQty: 1,
          tokenId:
            '81955624a8eb7011769ff5faa607f78f84b0f8152b9145e7db8b1e521c895ee3',
          tokenTicker: 'NFTC',
          tokenName: 'NFT Child',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          tokenType: 129,
          isValid: true
        }
      ]

      const result = bchjs.SLP.NFT1.generateNFTChildSendOpReturn(tokenUtxos, 1)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })

    it('should generate send OP_RETURN code with change', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          txid:
            '81955624a8eb7011769ff5faa607f78f84b0f8152b9145e7db8b1e521c895ee3',
          vout: 1,
          value: '546',
          height: 638273,
          confirmations: 42,
          satoshis: 546,
          utxoType: 'token',
          tokenQty: 4,
          tokenId:
            '81955624a8eb7011769ff5faa607f78f84b0f8152b9145e7db8b1e521c895ee3',
          tokenTicker: 'NFTC',
          tokenName: 'NFT Child',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          tokenType: 129,
          isValid: true
        }
      ]

      const result = bchjs.SLP.NFT1.generateNFTChildSendOpReturn(tokenUtxos, 1)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })

  describe('#generateNFTGroupSendOpReturn', () => {
    it('should generate send OP_RETURN with change', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          txid:
            '35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919',
          vout: 1,
          value: '546',
          height: 638207,
          confirmations: 3,
          satoshis: 546,
          utxoType: 'token',
          tokenQty: 10,
          transactionType: 'mint',
          tokenId:
            'eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981',
          tokenType: 129,
          tokenTicker: 'NFTTT',
          tokenName: 'NFT Test Token',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        }
      ]

      const result = bchjs.SLP.NFT1.generateNFTGroupSendOpReturn(tokenUtxos, 1)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })

    it('should generate send OP_RETURN with no change', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          txid:
            '35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919',
          vout: 1,
          value: '546',
          height: 638207,
          confirmations: 3,
          satoshis: 546,
          utxoType: 'token',
          tokenQty: 10,
          transactionType: 'mint',
          tokenId:
            'eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981',
          tokenType: 129,
          tokenTicker: 'NFTTT',
          tokenName: 'NFT Test Token',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        }
      ]

      const result = bchjs.SLP.NFT1.generateNFTGroupSendOpReturn(tokenUtxos, 10)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })
})
