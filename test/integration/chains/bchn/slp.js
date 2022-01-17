/*
  Integration tests for the bchjs covering SLP tokens.
  These tests are specific to the ABC chain.
*/

const chai = require('chai')
const assert = chai.assert

const BCHJS = require('../../../../src/bch-js')
let bchjs

// Inspect utility used for debugging.
const util = require('util')
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

describe('#SLP', () => {
  // before(() => {
  //   console.log(`bchjs.SLP.restURL: ${bchjs.SLP.restURL}`)
  //   console.log(`bchjs.SLP.apiToken: ${bchjs.SLP.apiToken}`)
  // })

  beforeEach(async () => {
    // Introduce a delay so that the BVT doesn't trip the rate limits.
    if (process.env.IS_USING_FREE_TIER) await sleep(3000)

    bchjs = new BCHJS()
  })

  if (process.env.TESTSLP) {
    describe('#util', () => {
      describe('#decodeOpReturn', () => {
        it('should decode a NFT Child transaction', async () => {
          const txid =
            'eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b'

          const data = await bchjs.SLP.Utils.decodeOpReturn(txid)
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
      })

      describe('#tokenUtxoDetails', () => {
        it('should handle a range of UTXO types', async () => {
          const utxos = [
            // Malformed SLP tx
            {
              note: 'Malformed SLP tx',
              tx_hash:
                'f7e5199ef6669ad4d078093b3ad56e355b6ab84567e59ad0f08a5ad0244f783a',
              tx_pos: 1,
              value: 546
            },
            // Normal TX (non-SLP)
            {
              note: 'Normal TX (non-SLP)',
              tx_hash:
                '01cdaec2f8b311fc2d6ecc930247bd45fa696dc204ab684596e281fe1b06c1f0',
              tx_pos: 0,
              value: 400000
            },
            // Valid PSF SLP tx
            {
              note: 'Valid PSF SLP tx',
              tx_hash:
                'daf4d8b8045e7a90b7af81bfe2370178f687da0e545511bce1c9ae539eba5ffd',
              tx_pos: 1,
              value: 546
            },
            // Valid SLP token not in whitelist
            {
              note: 'Valid SLP token not in whitelist',
              tx_hash:
                '3a4b628cbcc183ab376d44ce5252325f042268307ffa4a53443e92b6d24fb488',
              tx_pos: 1,
              value: 546
            },
            // Token send on BCHN network.
            {
              note: 'Token send on BCHN network',
              tx_hash:
                '402c663379d9699b6e2dd38737061e5888c5a49fca77c97ab98e79e08959e019',
              tx_pos: 1,
              value: 546
            },
            // Token send on ABC network.
            {
              note: 'Token send on ABC network',
              tx_hash:
                '336bfe2168aac4c3303508a9e8548a0d33797a83b85b76a12d845c8d6674f79d',
              tx_pos: 1,
              value: 546
            },
            // Known invalid SLP token send of PSF tokens.
            {
              note: 'Known invalid SLP token send of PSF tokens',
              tx_hash:
                '2bf691ad3679d928fef880b8a45b93b233f8fa0d0a92cf792313dbe77b1deb74',
              tx_pos: 1,
              value: 546
            }
          ]

          const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
          // console.log(`data: ${JSON.stringify(data, null, 2)}`)

          // Malformed SLP tx
          assert.equal(data[0].tx_hash, utxos[0].tx_hash)
          assert.equal(data[0].isValid, false)

          // Normal TX (non-SLP)
          assert.equal(data[1].tx_hash, utxos[1].tx_hash)
          assert.equal(data[1].isValid, false)

          // Valid PSF SLP tx
          assert.equal(data[2].tx_hash, utxos[2].tx_hash)
          assert.equal(data[2].isValid, true)

          // Valid SLP token not in whitelist
          assert.equal(data[3].tx_hash, utxos[3].tx_hash)
          assert.equal(data[3].isValid, true)

          // Token send on BCHN network
          assert.equal(data[4].tx_hash, utxos[4].tx_hash)
          assert.equal(data[4].isValid, true)

          // Token send on ABC network
          assert.equal(data[5].tx_hash, utxos[5].tx_hash)
          assert.equal(data[5].isValid, null)

          // Known invalid SLP token send of PSF tokens
          assert.equal(data[6].tx_hash, utxos[6].tx_hash)
          assert.equal(data[6].isValid, false)
        })
      })

      describe('#validateTxid3', () => {
        it('should invalidate a known invalid TXID', async () => {
          const txid =
            'f7e5199ef6669ad4d078093b3ad56e355b6ab84567e59ad0f08a5ad0244f783a'

          const result = await bchjs.SLP.Utils.validateTxid3(txid)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.isArray(result)

          assert.property(result[0], 'txid')
          assert.equal(result[0].txid, txid)

          assert.property(result[0], 'valid')
          assert.equal(result[0].valid, null)
        })

        it('should validate a known valid TXID', async () => {
          const txid =
            'daf4d8b8045e7a90b7af81bfe2370178f687da0e545511bce1c9ae539eba5ffd'

          const result = await bchjs.SLP.Utils.validateTxid3(txid)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.isArray(result)

          assert.property(result[0], 'txid')
          assert.equal(result[0].txid, txid)

          assert.property(result[0], 'valid')
          assert.equal(result[0].valid, true)
        })

        it('should handle a mix of valid, invalid, and non-SLP txs', async () => {
          const txids = [
            // Malformed SLP tx
            'f7e5199ef6669ad4d078093b3ad56e355b6ab84567e59ad0f08a5ad0244f783a',
            // Normal TX (non-SLP)
            '01cdaec2f8b311fc2d6ecc930247bd45fa696dc204ab684596e281fe1b06c1f0',
            // Valid PSF SLP tx
            'daf4d8b8045e7a90b7af81bfe2370178f687da0e545511bce1c9ae539eba5ffd',
            // Valid SLP token not in whitelist
            '3a4b628cbcc183ab376d44ce5252325f042268307ffa4a53443e92b6d24fb488',
            // Unprocessed SLP TX
            '402c663379d9699b6e2dd38737061e5888c5a49fca77c97ab98e79e08959e019'
          ]

          const result = await bchjs.SLP.Utils.validateTxid3(txids)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.isArray(result)

          assert.equal(result[0].txid, txids[0])
          assert.equal(result[0].valid, null)

          assert.equal(result[1].txid, txids[1])
          assert.equal(result[1].valid, null)

          assert.equal(result[2].txid, txids[2])
          assert.equal(result[2].valid, true)

          // True in validateTxid() but null in validateTxid3()
          assert.equal(result[3].txid, txids[3])
          assert.equal(result[3].valid, null)

          // Note: This should change from null to true once SLPDB finishes indexing.
          assert.equal(result[4].txid, txids[4])
          assert.equal(result[4].valid, null)
        })
      })

      describe('#validateTxid', () => {
        it('should handle a mix of valid, invalid, and non-SLP txs', async () => {
          const txids = [
            // Malformed SLP tx
            'f7e5199ef6669ad4d078093b3ad56e355b6ab84567e59ad0f08a5ad0244f783a',
            // Normal TX (non-SLP)
            '01cdaec2f8b311fc2d6ecc930247bd45fa696dc204ab684596e281fe1b06c1f0',
            // Valid PSF SLP tx
            'daf4d8b8045e7a90b7af81bfe2370178f687da0e545511bce1c9ae539eba5ffd',
            // Valid SLP token not in whitelist
            '3a4b628cbcc183ab376d44ce5252325f042268307ffa4a53443e92b6d24fb488',
            // Token send on BCHN network.
            '402c663379d9699b6e2dd38737061e5888c5a49fca77c97ab98e79e08959e019',
            // Token send on ABC network.
            '336bfe2168aac4c3303508a9e8548a0d33797a83b85b76a12d845c8d6674f79d'
          ]

          const result = await bchjs.SLP.Utils.validateTxid(txids)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.isArray(result)

          assert.equal(result[0].txid, txids[0])
          assert.equal(result[0].valid, null)

          assert.equal(result[1].txid, txids[1])
          assert.equal(result[1].valid, null)

          assert.equal(result[2].txid, txids[2])
          assert.equal(result[2].valid, true)

          // True in validateTxid() but null in validateTxid3()
          assert.equal(result[3].txid, txids[3])
          assert.equal(result[3].valid, true)

          assert.equal(result[4].txid, txids[4])
          assert.equal(result[4].valid, true)

          assert.equal(result[5].txid, txids[5])
          assert.equal(result[5].valid, null)
        })
      })
    })
    describe('#nft1', () => {
      describe('#listNFTGroupChildren', () => {
        it('should return array of children GENESIS transactions IDs', async () => {
          const groupId =
            '68cd33ecd909068fbea318ae5ff1d6207cf754e53b191327d6d73b6916424c0a'
          const result = await bchjs.SLP.NFT1.listNFTGroupChildren(groupId)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)
          assert.property(result, 'nftChildren')
          assert.isArray(result.nftChildren)
        })
      })
      describe('#parentNFTGroup', () => {
        it('should return parent NFT group information', async () => {
          const tokenId =
            '45a30085691d6ea586e3ec2aa9122e9b0e0d6c3c1fd357decccc15d8efde48a9'
          const result = await bchjs.SLP.NFT1.parentNFTGroup(tokenId)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)
          assert.property(result, 'nftGroup')
          assert.property(result.nftGroup, 'id')
          assert.property(result.nftGroup, 'name')
          assert.property(result.nftGroup, 'symbol')
          assert.property(result.nftGroup, 'documentUri')
          assert.property(result.nftGroup, 'versionType')
          assert.property(result.nftGroup, 'initialTokenQty')
        })
      })
    })
  }
})

// Promise-based sleep function
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
