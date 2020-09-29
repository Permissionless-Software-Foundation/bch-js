/*
  Integration tests for the bchjs covering SLP tokens.
*/

const chai = require("chai")
const assert = chai.assert

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

describe(`#SLP`, () => {
  // before(() => {
  //   console.log(`bchjs.SLP.restURL: ${bchjs.SLP.restURL}`)
  //   console.log(`bchjs.SLP.apiToken: ${bchjs.SLP.apiToken}`)
  // })

  beforeEach(async () => {
    // Introduce a delay so that the BVT doesn't trip the rate limits.
    await sleep(1000)
  })

  describe("#util", () => {
    describe("#list", () => {
      it(`should get information on the Spice token`, async () => {
        const tokenId = `4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf`

        const result = await bchjs.SLP.Utils.list(tokenId)
        //console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAnyKeys(result, [
          "decimals",
          "timestamp",
          "timestamp_unix",
          "versionType",
          "documentUri",
          "symbol",
          "name",
          "containsBaton",
          "id",
          "documentHash",
          "initialTokenQty",
          "blockCreated",
          "blockLastActiveSend",
          "blockLastActiveMint",
          "txnsSinceGenesis",
          "validAddress",
          "totalMinted",
          "totalBurned",
          "circulatingSupply",
          "mintingBatonStatus"
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

    describe("#decodeOpReturn", () => {
      it("should decode the OP_RETURN for a SEND txid", async () => {
        const txid =
          "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1"

        const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAllKeys(result, ["tokenType", "txType", "tokenId", "amounts"])
        assert.equal(
          result.tokenId,
          "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"
        )

        // Verify outputs
        assert.equal(result.amounts.length, 2)
        assert.equal(result.amounts[0], "100000000")
        assert.equal(result.amounts[1], "99883300000000")
      })

      it("should decode the OP_RETURN for a GENESIS txid", async () => {
        const txid =
          "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"

        const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAllKeys(result, [
          "tokenType",
          "txType",
          "tokenId",
          "ticker",
          "name",
          "documentUri",
          "documentHash",
          "decimals",
          "mintBatonVout",
          "qty"
        ])
        assert.equal(
          result.tokenId,
          "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"
        )
        assert.equal(result.txType, "GENESIS")
        assert.equal(result.ticker, "TOK-CH")
        assert.equal(result.name, "TokyoCash")
      })

      it("should decode the OP_RETURN for a MINT txid", async () => {
        const txid =
          "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4"

        const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.hasAllKeys(result, [
          "tokenType",
          "txType",
          "tokenId",
          "mintBatonVout",
          "qty"
        ])
      })

      it("should throw an error for a non-SLP transaction", async () => {
        try {
          const txid =
            "3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec"

          await bchjs.SLP.Utils.decodeOpReturn(txid)

          assert.equal(true, false, "Unexpected result")
        } catch (err) {
          // console.log(`err: `, err)
          assert.include(err.message, "scriptpubkey not op_return")
        }
      })

      // Note: This TX is interpreted as valid by the original decodeOpReturn().
      // Fixing this issue and related issues was the reason for creating the
      // decodeOpReturn2() method using the slp-parser library.
      it("should throw error for invalid SLP transaction", async () => {
        try {
          const txid =
            "a60a522cc11ad7011b74e57fbabbd99296e4b9346bcb175dcf84efb737030415"

          await bchjs.SLP.Utils.decodeOpReturn(txid)
          // console.log(`result: ${JSON.stringify(result, null, 2)}`)
        } catch (err) {
          // console.log(`err: `, err)
          assert.include(err.message, "amount string size not 8 bytes")
        }
      })
    })

    describe("#tokenUtxoDetails", () => {
      // // This captures an important corner-case. When an SLP token is created, the
      // // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
      it("should return details on minting baton from genesis transaction", async () => {
        const utxos = [
          {
            txid:
              "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
            vout: 3,
            amount: 0.00002015,
            satoshis: 2015,
            height: 594892,
            confirmations: 5
          },
          {
            txid:
              "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
            vout: 2,
            amount: 0.00000546,
            satoshis: 546,
            height: 594892,
            confirmations: 5
          }
        ]

        const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`data: ${JSON.stringify(data, null, 2)}`)

        assert.equal(data[0].isValid, false, "Change UTXO marked as false.")

        assert.property(data[1], "txid")
        assert.property(data[1], "vout")
        assert.property(data[1], "amount")
        assert.property(data[1], "satoshis")
        assert.property(data[1], "height")
        assert.property(data[1], "confirmations")
        assert.property(data[1], "utxoType")
        assert.property(data[1], "tokenId")
        assert.property(data[1], "tokenTicker")
        assert.property(data[1], "tokenName")
        assert.property(data[1], "tokenDocumentUrl")
        assert.property(data[1], "tokenDocumentHash")
        assert.property(data[1], "decimals")
        assert.property(data[1], "isValid")
        assert.equal(data[1].isValid, true)
      })

      it("should return details for a MINT token utxo", async () => {
        // Mock the call to REST API

        const utxos = [
          {
            txid:
              "cf4b922d1e1aa56b52d752d4206e1448ea76c3ebe69b3b97d8f8f65413bd5c76",
            vout: 1,
            amount: 0.00000546,
            satoshis: 546,
            height: 600297,
            confirmations: 76
          }
        ]

        const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`data: ${JSON.stringify(data, null, 2)}`)

        assert.property(data[0], "txid")
        assert.property(data[0], "vout")
        assert.property(data[0], "amount")
        assert.property(data[0], "satoshis")
        assert.property(data[0], "height")
        assert.property(data[0], "confirmations")
        assert.property(data[0], "utxoType")
        assert.property(data[0], "transactionType")
        assert.property(data[0], "tokenId")
        assert.property(data[0], "tokenTicker")
        assert.property(data[0], "tokenName")
        assert.property(data[0], "tokenDocumentUrl")
        assert.property(data[0], "tokenDocumentHash")
        assert.property(data[0], "decimals")
        assert.property(data[0], "mintBatonVout")
        assert.property(data[0], "tokenQty")
        assert.property(data[0], "isValid")
        assert.equal(data[0].isValid, true)
      })

      it("should return details for a simple SEND SLP token utxo", async () => {
        const utxos = [
          {
            txid:
              "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
            vout: 1,
            amount: 0.00000546,
            satoshis: 546,
            height: 596089,
            confirmations: 748
          }
        ]

        const data = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
        // console.log(`data: ${JSON.stringify(data, null, 2)}`)

        assert.property(data[0], "txid")
        assert.property(data[0], "vout")
        assert.property(data[0], "amount")
        assert.property(data[0], "satoshis")
        assert.property(data[0], "height")
        assert.property(data[0], "confirmations")
        assert.property(data[0], "utxoType")
        assert.property(data[0], "tokenId")
        assert.property(data[0], "tokenTicker")
        assert.property(data[0], "tokenName")
        assert.property(data[0], "tokenDocumentUrl")
        assert.property(data[0], "tokenDocumentHash")
        assert.property(data[0], "decimals")
        assert.property(data[0], "tokenQty")
        assert.property(data[0], "isValid")
        assert.equal(data[0].isValid, true)
      })

      it("should handle BCH and SLP utxos in the same TX", async () => {
        const utxos = [
          {
            txid:
              "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
            vout: 3,
            value: "6816",
            height: 606848,
            confirmations: 13,
            satoshis: 6816
          },
          {
            txid:
              "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
            vout: 2,
            value: "546",
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

      it("should handle problematic utxos", async () => {
        const utxos = [
          {
            txid:
              "0e3a217fc22612002031d317b4cecd9b692b66b52951a67b23c43041aefa3959",
            vout: 0,
            amount: 0.00018362,
            satoshis: 18362,
            height: 613483,
            confirmations: 124
          },
          {
            txid:
              "67fd3c7c3a6eb0fea9ab311b91039545086220f7eeeefa367fa28e6e43009f19",
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

      it("should return false for BCH-only UTXOs", async () => {
        const utxos = [
          {
            txid:
              "a937f792c7c9eb23b4f344ce5c233d1ac0909217d0a504d71e6b1e4efb864a3b",
            vout: 0,
            amount: 0.00001,
            satoshis: 1000,
            confirmations: 0,
            ts: 1578424704
          },
          {
            txid:
              "53fd141c2e999e080a5860887441a2c45e9cbe262027e2bd2ac998fc76e43c44",
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
    })

    describe("#balancesForAddress", () => {
      it(`should throw an error if input is not a string or array of strings`, async () => {
        try {
          const address = 1234

          await bchjs.SLP.Utils.balancesForAddress(address)

          assert.equal(true, false, "Uh oh. Code path should not end here.")
        } catch (err) {
          //console.log(`Error: `, err)
          assert.include(
            err.message,
            `Input address must be a string or array of strings`
          )
        }
      })

      it(`should fetch all balances for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
        const balances = await bchjs.SLP.Utils.balancesForAddress(
          "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9"
        )
        // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

        assert.isArray(balances)
        assert.hasAllKeys(balances[0], [
          "tokenId",
          "balanceString",
          "balance",
          "decimalCount",
          "slpAddress"
        ])
      })

      it(`should fetch balances for multiple addresses`, async () => {
        const addresses = [
          "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
          "simpleledger:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5ucdyl3r57"
        ]

        const balances = await bchjs.SLP.Utils.balancesForAddress(addresses)
        // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

        assert.isArray(balances)
        assert.isArray(balances[0])
        assert.hasAllKeys(balances[0][0], [
          "tokenId",
          "balanceString",
          "balance",
          "decimalCount",
          "slpAddress"
        ])
      })
    })

    describe("#hydrateUtxos", () => {
      it("should throw an error if input is not an array", async () => {
        try {
          const utxos = 1234

          await bchjs.SLP.Utils.hydrateUtxos(utxos)

          assert.equal(true, false, "Uh oh. Code path should not end here.")
        } catch (err) {
          // console.log(`Error: `, err)
          assert.include(err.message, `Input must be an array.`)
        }
      })

      it("should hydrate UTXOs", async () => {
        const utxos = [
          {
            utxos: [
              {
                txid:
                  "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
                vout: 3,
                value: "6816",
                height: 606848,
                confirmations: 13,
                satoshis: 6816
              },
              {
                txid:
                  "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
                vout: 2,
                value: "546",
                height: 606848,
                confirmations: 13,
                satoshis: 546
              }
            ]
          }
        ]

        const result = await bchjs.SLP.Utils.hydrateUtxos(utxos)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        // Test the general structure of the output.
        assert.isArray(result.slpUtxos)
        assert.equal(result.slpUtxos.length, 1)
        assert.equal(result.slpUtxos[0].utxos.length, 2)

        // Test the non-slp UTXO.
        assert.property(result.slpUtxos[0].utxos[0], "txid")
        assert.property(result.slpUtxos[0].utxos[0], "vout")
        assert.property(result.slpUtxos[0].utxos[0], "value")
        assert.property(result.slpUtxos[0].utxos[0], "height")
        assert.property(result.slpUtxos[0].utxos[0], "confirmations")
        assert.property(result.slpUtxos[0].utxos[0], "satoshis")
        assert.property(result.slpUtxos[0].utxos[0], "isValid")
        assert.equal(result.slpUtxos[0].utxos[0].isValid, false)

        // Test the slp UTXO.
        assert.property(result.slpUtxos[0].utxos[1], "txid")
        assert.property(result.slpUtxos[0].utxos[1], "vout")
        assert.property(result.slpUtxos[0].utxos[1], "value")
        assert.property(result.slpUtxos[0].utxos[1], "height")
        assert.property(result.slpUtxos[0].utxos[1], "confirmations")
        assert.property(result.slpUtxos[0].utxos[1], "satoshis")
        assert.property(result.slpUtxos[0].utxos[1], "isValid")
        assert.equal(result.slpUtxos[0].utxos[1].isValid, true)
        assert.property(result.slpUtxos[0].utxos[1], "transactionType")
        assert.property(result.slpUtxos[0].utxos[1], "tokenId")
        assert.property(result.slpUtxos[0].utxos[1], "tokenTicker")
        assert.property(result.slpUtxos[0].utxos[1], "tokenName")
        assert.property(result.slpUtxos[0].utxos[1], "tokenDocumentUrl")
        assert.property(result.slpUtxos[0].utxos[1], "tokenDocumentHash")
        assert.property(result.slpUtxos[0].utxos[1], "decimals")
        assert.property(result.slpUtxos[0].utxos[1], "tokenType")
        assert.property(result.slpUtxos[0].utxos[1], "tokenQty")
      })

      it("should process data directly from Electrumx", async () => {
        const addrs = [
          "bitcoincash:qq6mvsm7l92d77zpymmltvaw09p5uzghyuyx7spygg",
          "bitcoincash:qpjdrs8qruzh8xvusdfmutjx62awcepnhyperm3g89",
          "bitcoincash:qzygn28zpgeemnptkn26xzyuzzfu9l8f9vfvq7kptk"
        ]

        const utxos = await bchjs.Electrumx.utxo(addrs)
        // console.log(`utxos: ${JSON.stringify(utxos, null, 2)}`)

        const result = await bchjs.SLP.Utils.hydrateUtxos(utxos.utxos)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        // Test the general structure of the output.
        assert.isArray(result.slpUtxos)
        assert.equal(result.slpUtxos.length, 3)
        assert.equal(result.slpUtxos[0].utxos.length, 1)
        assert.equal(result.slpUtxos[1].utxos.length, 1)
        assert.equal(result.slpUtxos[2].utxos.length, 2)

        try {
          // Test the expected values.
          assert.equal(result.slpUtxos[0].utxos[0].isValid, false)
          assert.equal(result.slpUtxos[1].utxos[0].isValid, true)
          assert.equal(result.slpUtxos[1].utxos[0].tokenTicker, "TROUT")
          assert.equal(result.slpUtxos[2].utxos[0].isValid, false)
          assert.equal(result.slpUtxos[2].utxos[1].isValid, true)
          assert.equal(result.slpUtxos[2].utxos[1].tokenTicker, "VALENTINE")
        } catch (err) {
          console.error(
            'The hydrateUtxos call may hitting rate limits, or SLPDB may be having issues if "isValid" results are "null"'
          )
          console.log("Error: ", err)
        }
      })
    })
  })

  describe("#tokentype1", () => {
    describe("#getHexOpReturn", () => {
      it("should return OP_RETURN object ", async () => {
        const tokenUtxos = [
          {
            tokenId:
              "0a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1",
            decimals: 0,
            tokenQty: 2
          }
        ]
        const sendQty = 1.5

        const result = await bchjs.SLP.TokenType1.getHexOpReturn(
          tokenUtxos,
          sendQty
        )
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.property(result, "script")
        assert.isString(result.script)

        assert.property(result, "outputs")
        assert.isNumber(result.outputs)
      })
    })
  })
})

// Promise-based sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
