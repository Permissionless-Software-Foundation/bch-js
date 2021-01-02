/*
  Integration tests for the bchjs. Only covers calls made to
  rest.bitcoin.com.

  TODO
  - getMempoolEntry() only works on TXs in the mempool, so it needs to be part
  of an e2e test to be properly tested.
*/

const chai = require('chai')
const assert = chai.assert

const RESTURL = process.env.RESTURL
  ? process.env.RESTURL
  : 'https://testnet3.fullstack.cash/v4/'
// if (process.env.RESTURL) RESTURL = process.env.RESTURL

const BCHJS = require('../../../../src/bch-js')
// const bchjs = new BCHJS({ restURL: `https://testnet.bchjs.cash/v4/` })
const bchjs = new BCHJS({ restURL: RESTURL, apiToken: process.env.BCHJSTOKEN })

// Inspect utility used for debugging.
const util = require('util')
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe('#blockchain', () => {
  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  describe('#getBestBlockHash', () => {
    it('should GET best block hash', async () => {
      const result = await bchjs.Blockchain.getBestBlockHash()
      // console.log(`result: ${util.inspect(result)}`)

      assert.isString(result)
      assert.equal(result.length, 64, 'Specific hash length')
    })
  })

  describe('#getBlockHeader', () => {
    it('should GET block header for a single hash', async () => {
      const hash =
        '000000000000c57178ace90210289e6b5383134c5b5306e1cdd8395176e10aaf'

      const result = await bchjs.Blockchain.getBlockHeader(hash)

      assert.hasAllKeys(result, [
        'hash',
        'confirmations',
        'height',
        'version',
        'versionHex',
        'merkleroot',
        'time',
        'mediantime',
        'nonce',
        'bits',
        'difficulty',
        'chainwork',
        'previousblockhash',
        'nextblockhash',
        'nTx'
      ])
    })

    it('should GET block headers for an array of hashes', async () => {
      const hash = [
        '000000000000c57178ace90210289e6b5383134c5b5306e1cdd8395176e10aaf',
        '00000000000b7db4cbae48d852fcbef32f728014582094ad613fe12af6600ff2'
      ]

      const result = await bchjs.Blockchain.getBlockHeader(hash)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        'hash',
        'confirmations',
        'height',
        'version',
        'versionHex',
        'merkleroot',
        'time',
        'mediantime',
        'nonce',
        'bits',
        'difficulty',
        'chainwork',
        'previousblockhash',
        'nextblockhash',
        'nTx'
      ])
    })

    it('should throw error on array size rate limit', async () => {
      try {
        const data = []
        for (let i = 0; i < 25; i++) {
          data.push(
            '00000000000b7db4cbae48d852fcbef32f728014582094ad613fe12af6600ff2'
          )
        }

        await bchjs.Blockchain.getBlockHeader(data)

        // console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.hasAnyKeys(err, ['error'])
        assert.include(err.error, 'Array too large')
      }
    })
  })

  describe('#getMempoolEntry', () => {
    /*
    // To run this test, the txid must be unconfirmed.
    const txid =
      "defea04c38ee00cf73ad402984714ed22dc0dd99b2ae5cb50d791d94343ba79b"

    it(`should GET single mempool entry`, async () => {
      const result = await bchjs.Blockchain.getMempoolEntry(txid)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAnyKeys(result, [
        "size",
        "fee",
        "modifiedfee",
        "time",
        "height",
        "startingpriority",
        "currentpriority",
        "descendantcount",
        "descendantsize",
        "descendantfees",
        "ancestorcount",
        "ancestorsize",
        "ancestorfees",
        "depends"
      ])
    })

    it(`should get an array of mempool entries`, async () => {
      const result = await bchjs.Blockchain.getMempoolEntry([txid, txid])
      console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "size",
        "fee",
        "modifiedfee",
        "time",
        "height",
        "startingpriority",
        "currentpriority",
        "descendantcount",
        "descendantsize",
        "descendantfees",
        "ancestorcount",
        "ancestorsize",
        "ancestorfees",
        "depends"
      ])
    })
    */

    it('should throw an error if txid is not in mempool', async () => {
      try {
        const txid =
          '1f121fb6a33f48cd426dde06aa20ce589dd97becabb835a8d33071cbf40c7d04'

        await bchjs.Blockchain.getMempoolEntry(txid)

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)
        assert.hasAnyKeys(err, ['error'])
        assert.include(err.error, 'Transaction not in mempool')
      }
    })
  })

  describe('#getTxOutProof', () => {
    it('should get single tx out proof', async () => {
      const txid =
        '1f121fb6a33f48cd426dde06aa20ce589dd97becabb835a8d33071cbf40c7d04'

      const result = await bchjs.Blockchain.getTxOutProof(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isString(result)
    })

    it('should get an array of tx out proofs', async () => {
      const txid = [
        '1f121fb6a33f48cd426dde06aa20ce589dd97becabb835a8d33071cbf40c7d04',
        'fc4f696c0ebb3d0994b3975f57d85be75ef752b9fd52c17e361ec3be2fa3e752'
      ]

      const result = await bchjs.Blockchain.getTxOutProof(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isString(result[0])
    })
  })

  describe('#verifyTxOutProof', () => {
    const mockTxOutProof =
      '00000020ac86ce8f2bda235c0dc135d18f6a777c44b121e8f41db8a51ca65000000000000cd4de3c49337712f3a1092c47c3bf73ec2f9b1cfd289ee991ede0b6eab4df229d5b8c5dffff001d82ce005b0700000003ec55d9142eac2c1d2229e5af24898b2590c111b62e2787fa1998d3d713fd432fd557124ed758fa156a6cdc6d317d5575aec2b86dfb159c62ecb4743f28bef1cb52e7a32fbec31e367ec152fdb952f75ee75bd8575f97b394093dbb0e6c694ffc0135'

    it('should verify a single proof', async () => {
      const result = await bchjs.Blockchain.verifyTxOutProof(mockTxOutProof)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isString(result[0])
      assert.equal(
        result[0],
        'fc4f696c0ebb3d0994b3975f57d85be75ef752b9fd52c17e361ec3be2fa3e752'
      )
    })

    it('should verify an array of proofs', async () => {
      const proofs = [mockTxOutProof, mockTxOutProof]
      const result = await bchjs.Blockchain.verifyTxOutProof(proofs)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isString(result[0])
      assert.equal(
        result[0],
        'fc4f696c0ebb3d0994b3975f57d85be75ef752b9fd52c17e361ec3be2fa3e752'
      )
    })

    it('should throw error on array size rate limit', async () => {
      try {
        const data = []
        for (let i = 0; i < 25; i++) data.push(mockTxOutProof)

        const result = await bchjs.Blockchain.verifyTxOutProof(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.hasAnyKeys(err, ['error'])
        assert.include(err.error, 'Array too large')
      }
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
