const assert = require("assert")
const assert2 = require("chai").assert

const SLP = require("../../src/slp/slp")
//const slp = new SLP("http://decatur.hopto.org:12400/v3/")
//const slp = new SLP("https://rest.bitcoin.com/v2/")
const slp = new SLP({
  restURL: "https://api.fullstack.cash/v3/",
  apiToken: process.env.BCHJSTOKEN
})

const nock = require("nock") // http call mocking
const sinon = require("sinon")
const axios = require("axios")

// Mock data used for unit tests
const mockData = require("./fixtures/slp/mock-utils")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = "unit"
const SERVER = slp.restURL

// Used for debugging and iterrogating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

describe("#SLP Utils", () => {
  let sandbox

  beforeEach(() => {
    // Activate nock if it's inactive.
    if (!nock.isActive()) nock.activate()

    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    // Clean up HTTP mocks.
    nock.cleanAll() // clear interceptor list.
    nock.restore()

    sandbox.restore()
  })

  describe("#list", () => {
    it(`should list all SLP tokens`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockList)
      }

      const list = await slp.Utils.list()
      //console.log(`list: ${JSON.stringify(list, null, 2)}`)

      assert2.isArray(list)
      assert2.hasAllKeys(list[0], [
        "blockCreated",
        "blockLastActiveMint",
        "blockLastActiveSend",
        "circulatingSupply",
        "containsBaton",
        "decimals",
        "documentHash",
        "documentUri",
        "id",
        "initialTokenQty",
        "mintingBatonStatus",
        "name",
        "symbol",
        "timestamp",
        "timestampUnix",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "versionType"
      ])
    })

    it(`should list single SLP token by id: 4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockToken)
      }

      const tokenId =
        "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84"

      const list = await slp.Utils.list(tokenId)
      //console.log(`list: ${JSON.stringify(list, null, 2)}`)

      assert2.hasAllKeys(list, [
        "blockCreated",
        "blockLastActiveMint",
        "blockLastActiveSend",
        "circulatingSupply",
        "containsBaton",
        "decimals",
        "documentHash",
        "documentUri",
        "id",
        "initialTokenQty",
        "mintingBatonStatus",
        "name",
        "symbol",
        "timestamp",
        "timestampUnix",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "versionType"
      ])
      assert.equal(list.id, tokenId)
    })

    it(`should list multiple SLP tokens by array of ids`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .post(uri => uri.includes("/"))
          .reply(200, mockData.mockTokens)
      }

      const tokenIds = [
        "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
        "b3f4f132dc3b9c8c96316346993a8d54d729715147b7b11aa6c8cd909e955313"
      ]

      const list = await slp.Utils.list(tokenIds)
      // console.log(`list: ${JSON.stringify(list, null, 2)}`)

      assert2.hasAllKeys(list[0], [
        "blockCreated",
        "blockLastActiveMint",
        "blockLastActiveSend",
        "circulatingSupply",
        "containsBaton",
        "decimals",
        "documentHash",
        "documentUri",
        "id",
        "initialTokenQty",
        "mintingBatonStatus",
        "name",
        "symbol",
        "timestamp",
        "timestampUnix",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "versionType"
      ])
      assert.equal(list[0].id, tokenIds[0])
    })
  })

  describe("#balancesForAddress", () => {
    it(`should throw an error if input is not a string or array of strings`, async () => {
      try {
        const address = 1234

        await slp.Utils.balancesForAddress(address)

        assert2.equal(true, false, "Uh oh. Code path should not end here.")
      } catch (err) {
        //console.log(`Error: `, err)
        assert2.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should fetch all balances for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "get")
          .resolves({ data: mockData.balancesForAddress })
      }
      //sandbox
      //  .stub(slp.Utils, "balancesForAddress")
      //  .resolves(mockData.balancesForAddress)

      const balances = await slp.Utils.balancesForAddress(
        "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9"
      )
      // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert2.isArray(balances)
      assert2.hasAllKeys(balances[0], [
        "tokenId",
        "balanceString",
        "balance",
        "decimalCount",
        "slpAddress"
      ])
    })

    it(`should fetch balances for multiple addresses.`, async () => {
      const addresses = [
        "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
        "simpleledger:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5ucdyl3r57"
      ]

      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "post")
          .resolves({ data: mockData.balancesForAddresses })
      }

      const balances = await slp.Utils.balancesForAddress(addresses)
      //console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert2.isArray(balances)
      assert2.isArray(balances[0])
      assert2.hasAllKeys(balances[0][0], [
        "tokenId",
        "balanceString",
        "balance",
        "decimalCount",
        "slpAddress"
      ])
    })
  })

  describe("#balance", () => {
    it(`should fetch balance of single token for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit")
        sandbox.stub(axios, "get").resolves({ data: mockData.mockBalance })

      const balance = await slp.Utils.balance(
        "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      //console.log(`balance: ${JSON.stringify(balance, null, 2)}`)

      assert2.hasAllKeys(balance, ["tokenId", "balance", "balanceString"])
    })
  })

  describe("#validateTxid", () => {
    it(`should validate slp txid`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .post(uri => uri.includes("/"))
          .reply(200, mockData.mockIsValidTxid)
      }

      const isValid = await slp.Utils.validateTxid(
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      assert.deepEqual(isValid, [
        {
          txid:
            "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
          valid: true
        }
      ])
    })
  })

  describe("#balancesForToken", () => {
    it(`should retrieve token balances for a given tokenId`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockBalancesForToken)
      }

      const balances = await slp.Utils.balancesForToken(
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      assert2.hasAnyKeys(balances[0], ["tokenBalance", "slpAddress"])
    })
  })

  describe("#tokenStats", () => {
    it(`should retrieve stats for a given tokenId`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockTokenStats)
      }

      const tokenStats = await slp.Utils.tokenStats(
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      assert2.hasAnyKeys(tokenStats, [
        "circulatingSupply",
        "decimals",
        "documentUri",
        "name",
        "satoshisLockedUp",
        "symbol",
        "tokenId",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "validUtxos"
      ])
    })
  })

  describe("#transactions", () => {
    it(`should retrieve transactions for a given tokenId and address`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockTransactions)
      }

      const transactions = await slp.Utils.transactions(
        "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
        "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu"
      )
      assert2.hasAnyKeys(transactions[0], ["txid", "tokenDetails"])
    })
  })

  describe("#burnTotal", () => {
    it(`should retrieve input, output and burn totals`, async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockBurnTotal)
      }

      const burnTotal = await slp.Utils.burnTotal(
        "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de"
      )
      //console.log(`burnTotal: ${JSON.stringify(burnTotal, null, 2)}`)

      assert2.hasAnyKeys(burnTotal, [
        "transactionId",
        "inputTotal",
        "outputTotal",
        "burnTotal"
      ])
    })
  })

  // describe("#decodeOpReturn", () => {
  //   it("should throw an error for a non-string input", async () => {
  //     try {
  //       const txid = 53423 // Not a string.
  //
  //       await slp.Utils.decodeOpReturn(txid)
  //
  //       assert2.equal(true, false, "Unexpected result.")
  //     } catch (err) {
  //       //console.log(`err: ${util.inspect(err)}`)
  //       assert2.include(err.message, `txid string must be included`)
  //     }
  //   })
  //
  //   it("should throw an error for non-SLP transaction", async () => {
  //     try {
  //       // Mock the call to the REST API
  //       if (process.env.TEST === "unit") {
  //         sandbox
  //           .stub(axios, "get")
  //           .resolves({ data: mockData.nonSLPTxDetailsWithoutOpReturn })
  //       }
  //
  //       const txid =
  //         "3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec"
  //
  //       await slp.Utils.decodeOpReturn(txid)
  //
  //       assert2.equal(true, false, "Unexpected result.")
  //     } catch (err) {
  //       assert2.include(err.message, `Not an OP_RETURN`)
  //       //console.log(`err: ${util.inspect(err)}`)
  //     }
  //   })
  //
  //   it("should throw an error for non-SLP transaction with OP_RETURN", async () => {
  //     try {
  //       // Mock the call to the REST API
  //       if (process.env.TEST === "unit") {
  //         sandbox
  //           .stub(axios, "get")
  //           .resolves({ data: mockData.nonSLPTxDetailsWithOpReturn })
  //       }
  //
  //       const txid =
  //         "2ff74c48a5d657cf45f699601990bffbbe7a2a516d5480674cbf6c6a4497908f"
  //
  //       await slp.Utils.decodeOpReturn(txid)
  //
  //       assert2.equal(true, false, "Unexpected result.")
  //     } catch (err) {
  //       assert2.include(err.message, `Not a SLP OP_RETURN`)
  //       //console.log(`err: ${util.inspect(err)}`)
  //     }
  //   })
  //
  //   it("should decode a genesis transaction", async () => {
  //     // Mock the call to the REST API
  //     if (process.env.TEST === "unit") {
  //       sandbox
  //         .stub(axios, "get")
  //         .resolves({ data: mockData.txDetailsSLPGenesis })
  //     }
  //
  //     const txid =
  //       "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90"
  //
  //     const data = await slp.Utils.decodeOpReturn(txid)
  //     //console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.hasAnyKeys(data, [
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
  //   it("should decode a mint transaction", async () => {
  //     // Mock the call to the REST API
  //     if (process.env.TEST === "unit")
  //       sandbox.stub(axios, "get").resolves({ data: mockData.txDetailsSLPMint })
  //
  //     const txid =
  //       "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4"
  //
  //     const data = await slp.Utils.decodeOpReturn(txid)
  //     //console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.hasAnyKeys(data, [
  //       "transactionType",
  //       "tokenType",
  //       "tokenId",
  //       "mintBatonVout",
  //       "batonStillExists",
  //       "quantity",
  //       "tokensSentTo",
  //       "batonHolder"
  //     ])
  //   })
  //
  //   it("should decode a send transaction", async () => {
  //     // Mock the call to the REST API
  //     if (process.env.TEST === "unit")
  //       sandbox.stub(axios, "get").resolves({ data: mockData.txDetailsSLPSend })
  //
  //     const txid =
  //       "4f922565af664b6fdf0a1ba3924487344be721b3d8815c62cafc8a51e04a8afa"
  //
  //     const data = await slp.Utils.decodeOpReturn(txid)
  //     //console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.hasAnyKeys(data, [
  //       "transactionType",
  //       "tokenType",
  //       "tokenId",
  //       "spendData"
  //     ])
  //     assert2.isArray(data.spendData)
  //     assert2.hasAnyKeys(data.spendData[0], ["quantity", "sentTo", "vout"])
  //   })
  //
  //   it("should properly decode a Genesis transaction with no minting baton", async () => {
  //     // Mock the call to the REST API.
  //     if (process.env.TEST === "unit") {
  //       sandbox
  //         .stub(axios, "get")
  //         .resolves({ data: mockData.txDetailsSLPGenesisNoBaton })
  //     }
  //
  //     const txid =
  //       "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"
  //
  //     const data = await slp.Utils.decodeOpReturn(txid)
  //     //console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.include(data.batonHolder, "NEVER_CREATED")
  //   })
  //
  //   it("should decode a send transaction with alternate encoding", async () => {
  //     // Mock the call to rest.bitcoin.com
  //     if (process.env.TEST === "unit") {
  //       sandbox
  //         .stub(axios, "get")
  //         .resolves({ data: mockData.txDetailsSLPSendAlt })
  //     }
  //
  //     const txid =
  //       "d94357179775425ebc59c93173bd6dc9854095f090a2eb9dcfe9797398bc8eae"
  //
  //     const data = await slp.Utils.decodeOpReturn(txid)
  //     //console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.hasAnyKeys(data, [
  //       "transactionType",
  //       "tokenType",
  //       "tokenId",
  //       "spendData"
  //     ])
  //     assert2.isArray(data.spendData)
  //     assert2.hasAnyKeys(data.spendData[0], ["quantity", "sentTo", "vout"])
  //   })
  // })

  describe("#decodeOpReturn", () => {
    it("should throw an error for a non-string input", async () => {
      try {
        const txid = 53423 // Not a string.

        await slp.Utils.decodeOpReturn(txid)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        //console.log(`err: ${util.inspect(err)}`)
        assert2.include(err.message, `txid string must be included`)
      }
    })

    it("should throw an error for non-SLP transaction", async () => {
      try {
        // Mock the call to the REST API
        if (process.env.TEST === "unit") {
          sandbox
            .stub(axios, "get")
            .resolves({ data: mockData.nonSLPTxDetailsWithoutOpReturn })
        }

        const txid =
          "3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec"

        await slp.Utils.decodeOpReturn(txid)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)
        assert2.include(err.message, `scriptpubkey not op_return`)
      }
    })

    it("should throw an error for non-SLP transaction with OP_RETURN", async () => {
      try {
        // Mock the call to the REST API
        if (process.env.TEST === "unit") {
          sandbox
            .stub(axios, "get")
            .resolves({ data: mockData.nonSLPTxDetailsWithOpReturn })
        }

        const txid =
          "2ff74c48a5d657cf45f699601990bffbbe7a2a516d5480674cbf6c6a4497908f"

        await slp.Utils.decodeOpReturn(txid)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)
        assert2.include(err.message, `SLP not in first chunk`)
      }
    })

    it("should decode a genesis transaction", async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "get")
          .resolves({ data: mockData.txDetailsSLPGenesis })
      }

      const txid =
        "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90"

      const result = await slp.Utils.decodeOpReturn(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.hasAllKeys(result, [
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
    })

    it("should decode a mint transaction", async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit")
        sandbox.stub(axios, "get").resolves({ data: mockData.txDetailsSLPMint })

      const txid =
        "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4"

      const result = await slp.Utils.decodeOpReturn(txid)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.hasAllKeys(result, [
        "tokenType",
        "txType",
        "tokenId",
        "mintBatonVout",
        "qty"
      ])
    })

    it("should decode a send transaction", async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit")
        sandbox.stub(axios, "get").resolves({ data: mockData.txDetailsSLPSend })

      const txid =
        "4f922565af664b6fdf0a1ba3924487344be721b3d8815c62cafc8a51e04a8afa"

      const result = await slp.Utils.decodeOpReturn(txid)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.hasAllKeys(result, ["tokenType", "txType", "tokenId", "amounts"])
    })

    it("should properly decode a Genesis transaction with no minting baton", async () => {
      // Mock the call to the REST API.
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "get")
          .resolves({ data: mockData.txDetailsSLPGenesisNoBaton })
      }

      const txid =
        "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"

      const data = await slp.Utils.decodeOpReturn(txid)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.equal(data.mintBatonVout, 0)
    })

    it("should decode a send transaction with alternate encoding", async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "get")
          .resolves({ data: mockData.txDetailsSLPSendAlt })
      }

      const txid =
        "d94357179775425ebc59c93173bd6dc9854095f090a2eb9dcfe9797398bc8eae"

      const data = await slp.Utils.decodeOpReturn(txid)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.hasAnyKeys(data, [
        "transactionType",
        "txType",
        "tokenId",
        "amounts"
      ])
    })

    // Note: This TX is interpreted as valid by the original decodeOpReturn().
    // Fixing this issue and related issues was the reason for creating the
    // decodeOpReturn2() method using the slp-parser library.
    it("should throw error for invalid SLP transaction", async () => {
      try {
        // Mock the call to rest.bitcoin.com
        if (process.env.TEST === "unit") {
          sandbox
            .stub(axios, "get")
            .resolves({ data: mockData.mockInvalidSlpSend })
        }

        const txid =
          "a60a522cc11ad7011b74e57fbabbd99296e4b9346bcb175dcf84efb737030415"

        await slp.Utils.decodeOpReturn(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      } catch (err) {
        // console.log(`err: `, err)
        assert2.include(err.message, "amount string size not 8 bytes")
      }
    })
  })

  describe("#isTokenUtxo", () => {
    it("should throw error if input is not an array.", async () => {
      try {
        await slp.Utils.isTokenUtxo("test")

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `Input must be an array`,
          "Expected error message."
        )
      }
    })

    it("should throw error if utxo does not have satoshis or value property.", async () => {
      try {
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
            height: 594892,
            confirmations: 5
          }
        ]

        await slp.Utils.isTokenUtxo(utxos)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `utxo 1 does not have a satoshis or value property`,
          "Expected error message."
        )
      }
    })

    it("should throw error if utxo does not have txid or tx_hash property.", async () => {
      try {
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
            vout: 2,
            amount: 0.00000546,
            satoshis: 546,
            height: 594892,
            confirmations: 5
          }
        ]

        await slp.Utils.isTokenUtxo(utxos)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `utxo 1 does not have a txid or tx_hash property`,
          "Expected error message."
        )
      }
    })

    it("should return false for change in an SLP token creation transaction", async () => {
      // Mock the call to the REST API
      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves([
        {
          txid:
            "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
          valid: true
        }
      ])

      // Stub the calls to decodeOpReturn2.
      sandbox.stub(slp.Utils, "decodeOpReturn").resolves({
        tokenType: 1,
        txType: "GENESIS",
        ticker: "SLPSDK",
        name: "SLP SDK example using BITBOX",
        tokenId:
          "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
        documentUri: "developer.bitcoin.com",
        documentHash: "",
        decimals: 8,
        mintBatonVout: 2,
        qty: "50700000000"
      })

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

      const data = await slp.Utils.isTokenUtxo(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.equal(
        data[0].isSlp,
        false,
        "Change should not be identified as SLP utxo."
      )
      assert.equal(data[1].isSlp, true, "SLP UTXO correctly identified.")
    })

    it("should return true for a simple SEND SLP token utxo", async () => {
      // Mock the call to the REST API

      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves([
        {
          txid:
            "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
          valid: true
        }
      ])

      // Stub the calls to decodeOpReturn.
      sandbox.stub(slp.Utils, "decodeOpReturn").resolves({
        tokenType: 1,
        txType: "SEND",
        tokenId:
          "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
        amounts: ["200000000", "99887500000000"]
      })

      // Input object.
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

      const data = await slp.Utils.isTokenUtxo(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.equal(data[0].isSlp, true, "Simple send UTXO correctly identified")
    })

    it("should accurately analyze non-slp UTXO from Electrumx", async () => {
      try {
        // Mock the call to the REST API
        // Stub the call to validateTxid
        sandbox.stub(slp.Utils, "validateTxid").resolves([
          {
            txid:
              "2069e99a90499693e42cd1db82147e3e0acfe5e7315c6cc2f0252432f45300d7",
            valid: false
          }
        ])

        // Simulate the utxos array returned by Electrumx.
        const utxos = [
          {
            height: 636885,
            tx_hash:
              "2069e99a90499693e42cd1db82147e3e0acfe5e7315c6cc2f0252432f45300d7",
            tx_pos: 0,
            value: 600
          }
        ]

        const isTokenUtxos = await slp.Utils.isTokenUtxo(utxos)
        // console.log(`isTokenUtxos: ${JSON.stringify(isTokenUtxos, null, 2)}`)

        assert.equal(
          isTokenUtxos[0].isSlp,
          false,
          "Non-slp UTXO correctly identified"
        )
      } catch (err) {
        console.log(`Error: `, err)
      }
    })

    it("should accurately analyze slp UTXO from Electrumx", async () => {
      try {
        // Mock the call to the REST API
        // Stub the call to validateTxid
        sandbox.stub(slp.Utils, "validateTxid").resolves([
          {
            txid:
              "99093e8a19e0a649bf943dbc33d926feb09c02e61258c1bdaf2caffa7183c730",
            valid: true
          }
        ])

        // Stub the calls to decodeOpReturn.
        sandbox.stub(slp.Utils, "decodeOpReturn").resolves({
          tokenType: 1,
          txType: "SEND",
          tokenId:
            "a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2",
          amounts: ["100", "198999900"]
        })

        // Simulate the utxos array returned by Electrumx.
        const utxos = [
          {
            height: 636885,
            tx_hash:
              "99093e8a19e0a649bf943dbc33d926feb09c02e61258c1bdaf2caffa7183c730",
            tx_pos: 1,
            value: 546
          }
        ]

        const isTokenUtxos = await slp.Utils.isTokenUtxo(utxos)
        // console.log(`isTokenUtxos: ${JSON.stringify(isTokenUtxos, null, 2)}`)

        assert.equal(
          isTokenUtxos[0].isSlp,
          true,
          "Slp UTXO correctly identified"
        )
      } catch (err) {
        console.log(`Error: `, err)
      }
    })
  })

  // describe("#tokenUtxoDetails", () => {
  //   it("should throw error if input is not an array.", async () => {
  //     try {
  //       await slp.Utils.tokenUtxoDetails("test")
  //
  //       assert2.equal(true, false, "Unexpected result.")
  //     } catch (err) {
  //       assert2.include(
  //         err.message,
  //         `Input must be an array`,
  //         "Expected error message."
  //       )
  //     }
  //   })
  //
  //   it("should throw error if utxo does not have satoshis property.", async () => {
  //     try {
  //       const utxos = [
  //         {
  //           txid:
  //             "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  //           vout: 3,
  //           amount: 0.00002015,
  //           satoshis: 2015,
  //           height: 594892,
  //           confirmations: 5
  //         },
  //         {
  //           txid:
  //             "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  //           vout: 2,
  //           amount: 0.00000546,
  //           height: 594892,
  //           confirmations: 5
  //         }
  //       ]
  //
  //       await slp.Utils.tokenUtxoDetails(utxos)
  //
  //       assert2.equal(true, false, "Unexpected result.")
  //     } catch (err) {
  //       assert2.include(
  //         err.message,
  //         `utxo 1 does not have a satoshis property`,
  //         "Expected error message."
  //       )
  //     }
  //   })
  //
  //   it("should throw error if utxo does not have txid property.", async () => {
  //     try {
  //       const utxos = [
  //         {
  //           txid:
  //             "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  //           vout: 3,
  //           amount: 0.00002015,
  //           satoshis: 2015,
  //           height: 594892,
  //           confirmations: 5
  //         },
  //         {
  //           vout: 2,
  //           amount: 0.00000546,
  //           satoshis: 546,
  //           height: 594892,
  //           confirmations: 5
  //         }
  //       ]
  //
  //       await slp.Utils.tokenUtxoDetails(utxos)
  //
  //       assert2.equal(true, false, "Unexpected result.")
  //     } catch (err) {
  //       assert2.include(
  //         err.message,
  //         `utxo 1 does not have a txid property`,
  //         "Expected error message."
  //       )
  //     }
  //   })
  //
  //   // This captures an important corner-case. When an SLP token is created, the
  //   // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
  //   it("should return details on minting baton from genesis transaction", async () => {
  //     // Mock the call to REST API
  //     if (process.env.TEST === "unit") {
  //       // Stub the call to validateTxid
  //       sandbox.stub(slp.Utils, "validateTxid").resolves([
  //         {
  //           txid:
  //             "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  //           valid: true
  //         }
  //       ])
  //
  //       // Stub the calls to decodeOpReturn.
  //       sandbox.stub(slp.Utils, "decodeOpReturn").resolves({
  //         tokenType: 1,
  //         transactionType: "genesis",
  //         ticker: "SLPSDK",
  //         name: "SLP SDK example using BITBOX",
  //         documentUrl: "developer.bitcoin.com",
  //         documentHash: "",
  //         decimals: 8,
  //         mintBatonVout: 2,
  //         initialQty: 507,
  //         tokensSentTo:
  //           "bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05",
  //         batonHolder: "bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05"
  //       })
  //     }
  //
  //     const utxos = [
  //       {
  //         txid:
  //           "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  //         vout: 3,
  //         amount: 0.00002015,
  //         satoshis: 2015,
  //         height: 594892,
  //         confirmations: 5
  //       },
  //       {
  //         txid:
  //           "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  //         vout: 2,
  //         amount: 0.00000546,
  //         satoshis: 546,
  //         height: 594892,
  //         confirmations: 5
  //       }
  //     ]
  //
  //     const data = await slp.Utils.tokenUtxoDetails(utxos)
  //     // console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.equal(data[0], false, "Change UTXO marked as false.")
  //
  //     assert2.property(data[1], "txid")
  //     assert2.property(data[1], "vout")
  //     assert2.property(data[1], "amount")
  //     assert2.property(data[1], "satoshis")
  //     assert2.property(data[1], "height")
  //     assert2.property(data[1], "confirmations")
  //     assert2.property(data[1], "tokenType")
  //     assert2.property(data[1], "tokenId")
  //     assert2.property(data[1], "tokenTicker")
  //     assert2.property(data[1], "tokenName")
  //     assert2.property(data[1], "tokenDocumentUrl")
  //     assert2.property(data[1], "tokenDocumentHash")
  //     assert2.property(data[1], "decimals")
  //     assert2.property(data[1], "isValid")
  //     assert2.equal(data[1].isValid, true)
  //   })
  //
  //   it("should return details for a MINT token utxo", async () => {
  //     // Mock the call to REST API
  //     if (process.env.TEST === "unit") {
  //       // Stub the call to validateTxid
  //       sandbox.stub(slp.Utils, "validateTxid").resolves([
  //         {
  //           txid:
  //             "cf4b922d1e1aa56b52d752d4206e1448ea76c3ebe69b3b97d8f8f65413bd5c76",
  //           valid: true
  //         }
  //       ])
  //
  //       // Stub the calls to decodeOpReturn.
  //       sandbox
  //         .stub(slp.Utils, "decodeOpReturn")
  //         .onCall(0)
  //         .resolves({
  //           tokenType: 1,
  //           transactionType: "mint",
  //           tokenId:
  //             "38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0",
  //           mintBatonVout: 2,
  //           batonStillExists: true,
  //           quantity: "1000000000000",
  //           tokensSentTo:
  //             "bitcoincash:qpszr2za8hht020trekw4jc9kar2v7jva5xej5uqns"
  //         })
  //         .onCall(1)
  //         .resolves({
  //           tokenType: 1,
  //           transactionType: "genesis",
  //           ticker: "PSF",
  //           name: "Permissionless Software Foundation",
  //           documentUrl: "psfoundation.cash",
  //           documentHash: "",
  //           decimals: 8,
  //           mintBatonVout: 2,
  //           initialQty: 19882.09163133,
  //           tokensSentTo:
  //             "bitcoincash:qpgeu2kvk4assnj3klez6yv8z2mv6q9vdy48m62vhn",
  //           batonHolder:
  //             "bitcoincash:qpgeu2kvk4assnj3klez6yv8z2mv6q9vdy48m62vhn"
  //         })
  //     }
  //
  //     const utxos = [
  //       {
  //         txid:
  //           "cf4b922d1e1aa56b52d752d4206e1448ea76c3ebe69b3b97d8f8f65413bd5c76",
  //         vout: 1,
  //         amount: 0.00000546,
  //         satoshis: 546,
  //         height: 600297,
  //         confirmations: 76
  //       }
  //     ]
  //
  //     const data = await slp.Utils.tokenUtxoDetails(utxos)
  //     // console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.property(data[0], "txid")
  //     assert2.property(data[0], "vout")
  //     assert2.property(data[0], "amount")
  //     assert2.property(data[0], "satoshis")
  //     assert2.property(data[0], "height")
  //     assert2.property(data[0], "confirmations")
  //     assert2.property(data[0], "utxoType")
  //     assert2.property(data[0], "transactionType")
  //     assert2.property(data[0], "tokenId")
  //     assert2.property(data[0], "tokenTicker")
  //     assert2.property(data[0], "tokenName")
  //     assert2.property(data[0], "tokenDocumentUrl")
  //     assert2.property(data[0], "tokenDocumentHash")
  //     assert2.property(data[0], "decimals")
  //     assert2.property(data[0], "mintBatonVout")
  //     assert2.property(data[0], "batonStillExists")
  //     assert2.property(data[0], "tokenQty")
  //     assert2.property(data[0], "isValid")
  //     assert.equal(data[0].isValid, true)
  //   })
  //
  //   it("should return details for a simple SEND SLP token utxo", async () => {
  //     // // Mock the call to REST API
  //     if (process.env.TEST === "unit") {
  //       // Stub the call to validateTxid
  //       sandbox.stub(slp.Utils, "validateTxid").resolves([
  //         {
  //           txid:
  //             "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
  //           valid: true
  //         }
  //       ])
  //
  //       // Stub the calls to decodeOpReturn.
  //       sandbox
  //         .stub(slp.Utils, "decodeOpReturn")
  //         .onCall(0)
  //         .resolves({
  //           tokenType: 1,
  //           transactionType: "send",
  //           tokenId:
  //             "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
  //           spendData: [
  //             {
  //               quantity: "200000000",
  //               sentTo:
  //                 "bitcoincash:qqll3st8xl0k8cgv8dgrrrkntv6hqdn8huv3xm2ztf",
  //               vout: 1
  //             },
  //             {
  //               quantity: "99887500000000",
  //               sentTo:
  //                 "bitcoincash:qzv7t2pzn2d0pklnetdjt65crh6fe8vnhuwvhsk2nn",
  //               vout: 2
  //             }
  //           ]
  //         })
  //         .onCall(1)
  //         .resolves({
  //           tokenType: 1,
  //           transactionType: "genesis",
  //           ticker: "TOK-CH",
  //           name: "TokyoCash",
  //           documentUrl: "",
  //           documentHash: "",
  //           decimals: 8,
  //           mintBatonVout: 0,
  //           initialQty: 21000000,
  //           tokensSentTo:
  //             "bitcoincash:qqtuq6rzdgggt2mc9w20u4thkeaez69pmy6ur897sr",
  //           batonHolder: "NEVER_CREATED"
  //         })
  //     }
  //
  //     const utxos = [
  //       {
  //         txid:
  //           "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
  //         vout: 1,
  //         amount: 0.00000546,
  //         satoshis: 546,
  //         height: 596089,
  //         confirmations: 748
  //       }
  //     ]
  //
  //     const data = await slp.Utils.tokenUtxoDetails(utxos)
  //     // console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.property(data[0], "txid")
  //     assert2.property(data[0], "vout")
  //     assert2.property(data[0], "amount")
  //     assert2.property(data[0], "satoshis")
  //     assert2.property(data[0], "height")
  //     assert2.property(data[0], "confirmations")
  //     assert2.property(data[0], "utxoType")
  //     assert2.property(data[0], "tokenId")
  //     assert2.property(data[0], "tokenTicker")
  //     assert2.property(data[0], "tokenName")
  //     assert2.property(data[0], "tokenDocumentUrl")
  //     assert2.property(data[0], "tokenDocumentHash")
  //     assert2.property(data[0], "decimals")
  //     assert2.property(data[0], "tokenQty")
  //     assert2.property(data[0], "isValid")
  //     assert.equal(data[0].isValid, true)
  //   })
  //
  //   it("should handle BCH and SLP utxos in the same TX", async () => {
  //     // Mock external dependencies.
  //     sandbox
  //       .stub(slp.Utils, "validateTxid")
  //       .resolves(mockData.mockDualValidation)
  //     sandbox
  //       .stub(slp.Utils, "decodeOpReturn")
  //       .resolves(mockData.mockDualOpData)
  //
  //     const utxos = [
  //       {
  //         txid:
  //           "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
  //         vout: 3,
  //         value: "6816",
  //         height: 606848,
  //         confirmations: 13,
  //         satoshis: 6816
  //       },
  //       {
  //         txid:
  //           "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
  //         vout: 2,
  //         value: "546",
  //         height: 606848,
  //         confirmations: 13,
  //         satoshis: 546
  //       }
  //     ]
  //
  //     const result = await slp.Utils.tokenUtxoDetails(utxos)
  //     // console.log(`result: ${JSON.stringify(result, null, 2)}`)
  //
  //     assert2.isArray(result)
  //     assert2.equal(result.length, 2)
  //     assert2.equal(result[0], false)
  //     assert.equal(result[1].isValid, true)
  //   })
  //
  //   it("should handle problematic utxos", async () => {
  //     // Mock external dependencies.
  //     if (process.env.TEST === "unit") {
  //       // Stub the call to validateTxid
  //       sandbox.stub(slp.Utils, "validateTxid").resolves([
  //         {
  //           txid:
  //             "67fd3c7c3a6eb0fea9ab311b91039545086220f7eeeefa367fa28e6e43009f19",
  //           valid: true
  //         }
  //       ])
  //
  //       // Stub the calls to decodeOpReturn.
  //       sandbox
  //         .stub(slp.Utils, "decodeOpReturn")
  //         .onCall(0)
  //         .throws({ message: "Not an OP_RETURN" })
  //         .onCall(1)
  //         .resolves({
  //           tokenType: 1,
  //           transactionType: "send",
  //           tokenId:
  //             "f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f",
  //           spendData: [
  //             {
  //               quantity: "5000000",
  //               sentTo:
  //                 "bitcoincash:qr06e2fetka9fyh207ff3cq8xh9zfe78gyx24yadjz",
  //               vout: 1
  //             },
  //             {
  //               quantity: "395010942",
  //               sentTo:
  //                 "bitcoincash:qqzjzzlmx8h3hum3drsuk894jnf8r909kueykgrkk2",
  //               vout: 2
  //             }
  //           ]
  //         })
  //         .onCall(2)
  //         .resolves({
  //           tokenType: 1,
  //           transactionType: "genesis",
  //           ticker: "AUDC",
  //           name: "AUD Coin",
  //           documentUrl: "audcoino@gmail.com",
  //           documentHash: "",
  //           decimals: 6,
  //           mintBatonVout: 0,
  //           initialQty: 2000000000000,
  //           tokensSentTo:
  //             "bitcoincash:qp5pup5vpdcq3qyq8f858nuqmgfq8krupvsxxuxctx",
  //           batonHolder: "NEVER_CREATED"
  //         })
  //     }
  //
  //     const utxos = [
  //       {
  //         txid:
  //           "0e3a217fc22612002031d317b4cecd9b692b66b52951a67b23c43041aefa3959",
  //         vout: 0,
  //         amount: 0.00018362,
  //         satoshis: 18362,
  //         height: 613483,
  //         confirmations: 124
  //       },
  //       {
  //         txid:
  //           "67fd3c7c3a6eb0fea9ab311b91039545086220f7eeeefa367fa28e6e43009f19",
  //         vout: 1,
  //         amount: 0.00000546,
  //         satoshis: 546,
  //         height: 612075,
  //         confirmations: 1532
  //       }
  //     ]
  //
  //     const result = await slp.Utils.tokenUtxoDetails(utxos)
  //     // console.log(`result: ${JSON.stringify(result, null, 2)}`)
  //
  //     assert2.isArray(result)
  //     assert2.equal(result.length, 2)
  //     assert2.equal(result[0], false)
  //     assert2.equal(result[1].isValid, true)
  //   })
  //
  //   it("should return false for BCH-only UTXOs", async () => {
  //     // Mock live network calls
  //     if (process.env.TEST === "unit") {
  //       sandbox
  //         .stub(slp.Utils, "decodeOpReturn")
  //         .throws(new Error("Not an OP_RETURN"))
  //       // sandbox.stub(slp.Utils, "validateTxid").resolves([null, null])
  //     }
  //
  //     const utxos = [
  //       {
  //         txid:
  //           "a937f792c7c9eb23b4f344ce5c233d1ac0909217d0a504d71e6b1e4efb864a3b",
  //         vout: 0,
  //         amount: 0.00001,
  //         satoshis: 1000,
  //         confirmations: 0,
  //         ts: 1578424704
  //       },
  //       {
  //         txid:
  //           "53fd141c2e999e080a5860887441a2c45e9cbe262027e2bd2ac998fc76e43c44",
  //         vout: 0,
  //         amount: 0.00001,
  //         satoshis: 1000,
  //         confirmations: 0,
  //         ts: 1578424634
  //       }
  //     ]
  //
  //     const data = await slp.Utils.tokenUtxoDetails(utxos)
  //     // console.log(`data: ${JSON.stringify(data, null, 2)}`)
  //
  //     assert2.isArray(data)
  //     assert2.equal(false, data[0])
  //     assert2.equal(false, data[1])
  //   })
  // })

  describe("#tokenUtxoDetails", () => {
    it("should throw error if input is not an array.", async () => {
      try {
        await slp.Utils.tokenUtxoDetails("test")

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `Input must be an array`,
          "Expected error message."
        )
      }
    })

    it("should throw error if utxo does not have satoshis or value property.", async () => {
      try {
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
            height: 594892,
            confirmations: 5
          }
        ]

        await slp.Utils.tokenUtxoDetails(utxos)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `utxo 1 does not have a satoshis or value property`,
          "Expected error message."
        )
      }
    })

    it("should throw error if utxo does not have txid or tx_hash property.", async () => {
      try {
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
            vout: 2,
            amount: 0.00000546,
            satoshis: 546,
            height: 594892,
            confirmations: 5
          }
        ]

        await slp.Utils.tokenUtxoDetails(utxos)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `utxo 1 does not have a txid or tx_hash property`,
          "Expected error message."
        )
      }
    })

    // // This captures an important corner-case. When an SLP token is created, the
    // // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
    it("should return details on minting baton from genesis transaction", async () => {
      // Mock the call to REST API
      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves([
        {
          txid:
            "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
          valid: true
        }
      ])

      // Stub the calls to decodeOpReturn.
      sandbox.stub(slp.Utils, "decodeOpReturn").resolves({
        tokenType: 1,
        txType: "GENESIS",
        ticker: "SLPSDK",
        name: "SLP SDK example using BITBOX",
        tokenId:
          "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
        documentUri: "developer.bitcoin.com",
        documentHash: "",
        decimals: 8,
        mintBatonVout: 2,
        qty: "50700000000"
      })

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

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.equal(data[0], false, "Change UTXO marked as false.")

      assert2.property(data[1], "txid")
      assert2.property(data[1], "vout")
      assert2.property(data[1], "amount")
      assert2.property(data[1], "satoshis")
      assert2.property(data[1], "height")
      assert2.property(data[1], "confirmations")
      assert2.property(data[1], "tokenType")
      assert2.property(data[1], "tokenId")
      assert2.property(data[1], "tokenTicker")
      assert2.property(data[1], "tokenName")
      assert2.property(data[1], "tokenDocumentUrl")
      assert2.property(data[1], "tokenDocumentHash")
      assert2.property(data[1], "decimals")
      assert2.property(data[1], "isValid")
      assert2.equal(data[1].isValid, true)
    })

    it("should return details for a MINT token utxo", async () => {
      // Mock the call to REST API

      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: "MINT",
          tokenId:
            "38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0",
          mintBatonVout: 2,
          qty: "1000000000000"
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: "GENESIS",
          ticker: "PSF",
          name: "Permissionless Software Foundation",
          tokenId:
            "38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0",
          documentUri: "psfoundation.cash",
          documentHash: "",
          decimals: 8,
          mintBatonVout: 2,
          qty: "1988209163133"
        })

      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves([
        {
          txid:
            "cf4b922d1e1aa56b52d752d4206e1448ea76c3ebe69b3b97d8f8f65413bd5c76",
          valid: true
        }
      ])

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

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.property(data[0], "txid")
      assert2.property(data[0], "vout")
      assert2.property(data[0], "amount")
      assert2.property(data[0], "satoshis")
      assert2.property(data[0], "height")
      assert2.property(data[0], "confirmations")
      assert2.property(data[0], "utxoType")
      assert2.property(data[0], "transactionType")
      assert2.property(data[0], "tokenId")
      assert2.property(data[0], "tokenTicker")
      assert2.property(data[0], "tokenName")
      assert2.property(data[0], "tokenDocumentUrl")
      assert2.property(data[0], "tokenDocumentHash")
      assert2.property(data[0], "decimals")
      assert2.property(data[0], "mintBatonVout")
      assert2.property(data[0], "tokenQty")
      assert2.property(data[0], "isValid")
      assert.equal(data[0].isValid, true)
    })

    it("should return details for a simple SEND SLP token utxo", async () => {
      // Mock the call to REST API
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: "SEND",
          tokenId:
            "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
          amounts: ["200000000", "99887500000000"]
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: "GENESIS",
          ticker: "TOK-CH",
          name: "TokyoCash",
          tokenId:
            "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
          documentUri: "",
          documentHash: "",
          decimals: 8,
          mintBatonVout: 0,
          qty: "2100000000000000"
        })

      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves([
        {
          txid:
            "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
          valid: true
        }
      ])

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

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.property(data[0], "txid")
      assert2.property(data[0], "vout")
      assert2.property(data[0], "amount")
      assert2.property(data[0], "satoshis")
      assert2.property(data[0], "height")
      assert2.property(data[0], "confirmations")
      assert2.property(data[0], "utxoType")
      assert2.property(data[0], "tokenId")
      assert2.property(data[0], "tokenTicker")
      assert2.property(data[0], "tokenName")
      assert2.property(data[0], "tokenDocumentUrl")
      assert2.property(data[0], "tokenDocumentHash")
      assert2.property(data[0], "decimals")
      assert2.property(data[0], "tokenQty")
      assert2.property(data[0], "isValid")
      assert.equal(data[0].isValid, true)
    })

    it("should handle BCH and SLP utxos in the same TX", async () => {
      // Mock external dependencies.
      sandbox
        .stub(slp.Utils, "validateTxid")
        .resolves(mockData.mockDualValidation)

      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .onCall(0)
        .resolves({
          tokenType: 1,
          txType: "SEND",
          tokenId:
            "dd84ca78db4d617221b58eabc6667af8fe2f7eadbfcc213d35be9f1b419beb8d",
          amounts: ["1", "5"]
        })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: "SEND",
          tokenId:
            "dd84ca78db4d617221b58eabc6667af8fe2f7eadbfcc213d35be9f1b419beb8d",
          amounts: ["1", "5"]
        })
        .onCall(2)
        .resolves({
          tokenType: 1,
          txType: "GENESIS",
          ticker: "TAP",
          name: "Thoughts and Prayers",
          tokenId:
            "dd84ca78db4d617221b58eabc6667af8fe2f7eadbfcc213d35be9f1b419beb8d",
          documentUri: "",
          documentHash: "",
          decimals: 0,
          mintBatonVout: 2,
          qty: "1000000"
        })

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

      const result = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.isArray(result)
      assert2.equal(result.length, 2)
      assert2.equal(result[0], false)
      assert.equal(result[1].isValid, true)
    })

    it("should handle problematic utxos", async () => {
      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .onCall(0)
        .throws({ message: "scriptpubkey not op_return" })
        .onCall(1)
        .resolves({
          tokenType: 1,
          txType: "SEND",
          tokenId:
            "f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f",
          amounts: ["5000000", "395010942"]
        })
        .onCall(2)
        .resolves({
          tokenType: 1,
          txType: "GENESIS",
          ticker: "AUDC",
          name: "AUD Coin",
          tokenId:
            "f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f",
          documentUri: "audcoino@gmail.com",
          documentHash: "",
          decimals: 6,
          mintBatonVout: 0,
          qty: "2000000000000000000"
        })

      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves([
        {
          txid:
            "67fd3c7c3a6eb0fea9ab311b91039545086220f7eeeefa367fa28e6e43009f19",
          valid: true
        }
      ])

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

      const result = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.isArray(result)
      assert2.equal(result.length, 2)
      assert2.equal(result[0], false)
      assert2.equal(result[1].isValid, true)
    })

    it("should return false for BCH-only UTXOs", async () => {
      // Mock live network calls

      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .throws(new Error("scriptpubkey not op_return"))

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

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)
      assert2.equal(false, data[0])
      assert2.equal(false, data[1])
    })

    it("should decode a Genesis transaction", async () => {
      const slpData = {
        tokenType: 1,
        txType: "GENESIS",
        ticker: "SLPTEST",
        name: "SLP Test Token",
        tokenId:
          "d2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954",
        documentUri: "https://FullStack.cash",
        documentHash: "",
        decimals: 8,
        mintBatonVout: 2,
        qty: "10000000000"
      }

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox.stub(slp.Utils, "decodeOpReturn").resolves(slpData)

      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves([
        {
          txid:
            "d2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954",
          valid: true
        }
      ])

      const utxos = [
        {
          txid:
            "d2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954",
          vout: 1,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "d2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954",
          vout: 2,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "d2ec6abff5d1c8ed9ab5db6d140dcaebb813463e42933a4a4db171e7222a0954",
          vout: 3,
          value: "12178",
          confirmations: 0,
          satoshis: 12178
        }
      ]

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)
      assert2.equal(data[0].tokenType, "token")
      assert2.equal(data[0].tokenQty, 100)
      assert2.equal(data[1].tokenType, "minting-baton")
      assert2.equal(false, data[2])
    })
  })

  describe("#txDetails", () => {
    it("should throw an error if txid is not included", async () => {
      try {
        await slp.Utils.txDetails()
      } catch (err) {
        assert2.include(
          err.message,
          `txid string must be included`,
          "Expected error message."
        )
      }
    })

    it("should throw error for non-existent txid", async () => {
      try {
        // Mock the call to the REST API
        if (process.env.TEST === "unit") {
          sandbox
            .stub(axios, "get")
            //.resolves({ data: mockData.nonSLPTxDetailsWithoutOpReturn })
            .throws({ error: `TXID not found` })
        }

        const txid = `d284e71227ec89f714b964d8eda595be6392bebd2fac46082bc5a9ce6fb7b33e`

        const result = await slp.Utils.txDetails(txid)
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      } catch (err) {
        // console.log(`err: `, err)
        assert2.include(err.error, `TXID not found`, "Expected error message.")
      }
    })

    it("should return details for an SLP txid", async () => {
      // Mock the call to the REST API
      if (process.env.TEST === "unit")
        sandbox.stub(axios, "get").resolves({ data: mockData.mockTxDetails })

      const txid = `9dbaaafc48c49a21beabada8de632009288a2cd52eecefd0c00edcffca9955d0`

      const result = await slp.Utils.txDetails(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.hasAnyKeys(result, [
        "txid",
        "version",
        "locktime",
        "vin",
        "vout",
        "blockhash",
        "blockheight",
        "confirmations",
        "time",
        "blocktime",
        "valueOut",
        "size",
        "valueIn",
        "fees",
        "tokenInfo",
        "tokenIsValid"
      ])
    })
  })
})
