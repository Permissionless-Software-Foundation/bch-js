/*
  Integration tests for the bchjs covering SLP tokens.
*/

import chai from 'chai'

import BCHJS from '../../src/bch-js.js'

// Inspect utility used for debugging.
import util from 'util'
const assert = chai.assert
let bchjs
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

  describe('#util', () => {
    if (process.env.TESTSLP) {
      describe('#list', () => {
        it('should get information on the Spice token', async () => {
          const tokenId =
            '4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf'

          const result = await bchjs.SLP.Utils.list(tokenId)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.hasAnyKeys(result, [
            'decimals',
            'timestamp',
            'timestamp_unix',
            'versionType',
            'documentUri',
            'symbol',
            'name',
            'containsBaton',
            'id',
            'documentHash',
            'initialTokenQty',
            'blockCreated',
            'blockLastActiveSend',
            'blockLastActiveMint',
            'txnsSinceGenesis',
            'validAddress',
            'totalMinted',
            'totalBurned',
            'circulatingSupply',
            'mintingBatonStatus'
          ])
        })
      })

      // describe("#decodeOpReturn", () => {
      //   it("should decode the OP_RETURN for a SEND txid", async () => {
      //     const txid =
      //       "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1"
      //
      //     const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
      //     // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      //
      //     assert.hasAllKeys(result, [
      //       "tokenType",
      //       "transactionType",
      //       "tokenId",
      //       "spendData"
      //     ])
      //   })
      //
      //   it("should decode the OP_RETURN for a GENESIS txid", async () => {
      //     const txid =
      //       "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"
      //
      //     const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
      //     // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      //
      //     assert.hasAllKeys(result, [
      //       "tokenType",
      //       "transactionType",
      //       "ticker",
      //       "name",
      //       "documentUrl",
      //       "documentHash",
      //       "decimals",
      //       "mintBatonVout",
      //       "initialQty",
      //       "tokensSentTo",
      //       "batonHolder"
      //     ])
      //   })
      //
      //   it("should decode the OP_RETURN for a MINT txid", async () => {
      //     const txid =
      //       "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4"
      //
      //     const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
      //     // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      //
      //     assert.hasAllKeys(result, [
      //       "tokenType",
      //       "transactionType",
      //       "tokenId",
      //       "mintBatonVout",
      //       "batonStillExists",
      //       "quantity",
      //       "tokensSentTo",
      //       "batonHolder"
      //     ])
      //   })
      //
      //   it("should throw an error for a non-SLP transaction", async () => {
      //     try {
      //       const txid =
      //         "3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec"
      //
      //       await bchjs.SLP.Utils.decodeOpReturn(txid)
      //
      //       assert.equal(true, false, "Unexpected result")
      //     } catch (err) {
      //       // console.log(`err: `, err)
      //       assert.include(err.message, "Not an OP_RETURN")
      //     }
      //   })
      // })

      describe('#decodeOpReturn', () => {
        it('should decode the OP_RETURN for a SEND txid', async () => {
          const txid =
            '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1'

          const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.hasAllKeys(result, [
            'tokenType',
            'txType',
            'tokenId',
            'amounts'
          ])
          assert.equal(
            result.tokenId,
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7'
          )

          // Verify outputs
          assert.equal(result.amounts.length, 2)
          assert.equal(result.amounts[0], '100000000')
          assert.equal(result.amounts[1], '99883300000000')
        })

        it('should decode the OP_RETURN for a GENESIS txid', async () => {
          const txid =
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7'

          const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
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
          assert.equal(
            result.tokenId,
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7'
          )
          assert.equal(result.txType, 'GENESIS')
          assert.equal(result.ticker, 'TOK-CH')
          assert.equal(result.name, 'TokyoCash')
        })

        it('should decode the OP_RETURN for a MINT txid', async () => {
          const txid =
            '65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4'

          const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.hasAllKeys(result, [
            'tokenType',
            'txType',
            'tokenId',
            'mintBatonVout',
            'qty'
          ])
        })

        it('should throw an error for a non-SLP transaction', async () => {
          try {
            const txid =
              '3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec'

            await bchjs.SLP.Utils.decodeOpReturn(txid)

            assert.equal(true, false, 'Unexpected result')
          } catch (err) {
            // console.log(`err: `, err)
            assert.include(err.message, 'scriptpubkey not op_return')
          }
        })

        // Note: This TX is interpreted as valid by the original decodeOpReturn().
        // Fixing this issue and related issues was the reason for creating the
        // decodeOpReturn2() method using the slp-parser library.
        it('should throw error for invalid SLP transaction', async () => {
          try {
            const txid =
              'a60a522cc11ad7011b74e57fbabbd99296e4b9346bcb175dcf84efb737030415'

            await bchjs.SLP.Utils.decodeOpReturn(txid)
            // console.log(`result: ${JSON.stringify(result, null, 2)}`)
          } catch (err) {
            // console.log(`err: `, err)
            assert.include(err.message, 'amount string size not 8 bytes')
          }
        })
      })

      describe('#tokenUtxoDetails', () => {
        // // This captures an important corner-case. When an SLP token is created, the
        // // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
        it('should return details on minting baton from genesis transaction', async () => {
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

          const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
          // console.log(`data: ${JSON.stringify(data, null, 2)}`)

          assert.equal(data[0].isValid, false, 'Change UTXO marked as false.')

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

          const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
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

          const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
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

          const result = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.isArray(result)
          assert.equal(result.length, 2)
          assert.equal(result[0].isValid, false)
          assert.equal(result[1].isValid, true)
        })

        it('should handle problematic utxos', async () => {
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

          const result = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)

          assert.isArray(result)
          assert.equal(result.length, 2)
          assert.equal(result[0].isValid, false)
          assert.equal(result[1].isValid, true)
        })

        it('should return false for BCH-only UTXOs', async () => {
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

          const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
          // console.log(`data: ${JSON.stringify(data, null, 2)}`)

          assert.isArray(data)
          assert.equal(data[0].isValid, false)
          assert.equal(data[1].isValid, false)
        })

        it('should handle a dust attack', async () => {
          // it("#dustattack", async () => {
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

          const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
          // console.log(`data: ${JSON.stringify(data, null, 2)}`)

          assert.equal(data[0].isValid, false)
        })

        it('should handle null SLPDB validations', async () => {
          const utxos = [
            {
              height: 665577,
              tx_hash:
                '4b89405c54d1c0bde8aa476a47561a42a6e7a5e927daa2ec69d428810eae3419',
              tx_pos: 1,
              value: 546
            },
            {
              height: 665577,
              tx_hash:
                '3a4b628cbcc183ab376d44ce5252325f042268307ffa4a53443e92b6d24fb488',
              tx_pos: 1,
              value: 546
            }
          ]

          const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
          // console.log(`data: ${JSON.stringify(data, null, 2)}`)

          assert.isArray(data)
          // assert.equal(data[0].isValid, null)
        })
      })

      describe('#tokentype1', () => {
        describe('#getHexOpReturn', () => {
          it('should return OP_RETURN object ', async () => {
            const tokenUtxos = [
              {
                tokenId:
                  '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0',
                decimals: 8,
                tokenQty: 2
              }
            ]
            const sendQty = 1.5

            const result = await bchjs.SLP.TokenType1.getHexOpReturn(
              tokenUtxos,
              sendQty
            )
            // console.log(`result: ${JSON.stringify(result, null, 2)}`)

            assert.property(result, 'script')
            assert.isString(result.script)

            assert.property(result, 'outputs')
            assert.isNumber(result.outputs)
          })
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
})

// Promise-based sleep function
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
