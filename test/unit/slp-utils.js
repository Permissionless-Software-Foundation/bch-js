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

    it("should decode a NFT Parent transaction", async () => {
      // Mock the call to the REST API.
      sandbox
        .stub(axios, "get")
        .resolves({ data: mockData.txDetailsSLPNftGenesis })

      const txid =
        "4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4"

      const data = await slp.Utils.decodeOpReturn(txid)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.property(data, "tokenType")
      assert2.property(data, "txType")
      assert2.property(data, "ticker")
      assert2.property(data, "name")
      assert2.property(data, "tokenId")
      assert2.property(data, "documentUri")
      assert2.property(data, "documentHash")
      assert2.property(data, "decimals")
      assert2.property(data, "mintBatonVout")
      assert2.property(data, "qty")

      assert2.equal(data.tokenType, 129)
      assert2.equal(data.mintBatonVout, 2)
      assert2.equal(data.qty, 1)
    })

    // it("should decode a NFT Child transaction", async () => {
    //   // Mock the call to the REST API.
    //   // sandbox
    //   //   .stub(axios, "get")
    //   //   .resolves({ data: mockData.txDetailsSLPNftGenesis })
    //
    //   const txid =
    //     "3de3766b10506c9156533f1639979e49d1884521543c13e4af73647df1ed3f76"
    //
    //   const data = await slp.Utils.decodeOpReturn(txid)
    //   console.log(`data: ${JSON.stringify(data, null, 2)}`)
    //
    //   // assert2.property(data, "tokenType")
    //   // assert2.property(data, "txType")
    //   // assert2.property(data, "ticker")
    //   // assert2.property(data, "name")
    //   // assert2.property(data, "tokenId")
    //   // assert2.property(data, "documentUri")
    //   // assert2.property(data, "documentHash")
    //   // assert2.property(data, "decimals")
    //   // assert2.property(data, "mintBatonVout")
    //   // assert2.property(data, "qty")
    //   //
    //   // assert2.equal(data.tokenType, 129)
    //   // assert2.equal(data.mintBatonVout, 2)
    //   // assert2.equal(data.qty, 1)
    // })
  })

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

      // assert2.equal(data[0], false, "Change UTXO marked as false.")
      assert2.property(data[0], "txid")
      assert2.property(data[0], "vout")
      assert2.property(data[0], "amount")
      assert2.property(data[0], "satoshis")
      assert2.property(data[0], "height")
      assert2.property(data[0], "confirmations")
      assert2.property(data[0], "isValid")
      assert2.equal(data[0].isValid, false)

      assert2.property(data[1], "txid")
      assert2.property(data[1], "vout")
      assert2.property(data[1], "amount")
      assert2.property(data[1], "satoshis")
      assert2.property(data[1], "height")
      assert2.property(data[1], "confirmations")
      assert2.property(data[1], "utxoType")
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

      assert2.property(result[0], "txid")
      assert2.property(result[0], "vout")
      assert2.property(result[0], "value")
      assert2.property(result[0], "satoshis")
      assert2.property(result[0], "height")
      assert2.property(result[0], "confirmations")
      assert2.property(result[0], "isValid")
      assert2.equal(result[0].isValid, false)

      assert.equal(result[1].isValid, true)
      assert.equal(result[1].utxoType, "token")
      assert.equal(result[1].transactionType, "send")
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

      assert2.property(result[0], "txid")
      assert2.property(result[0], "vout")
      assert2.property(result[0], "amount")
      assert2.property(result[0], "satoshis")
      assert2.property(result[0], "height")
      assert2.property(result[0], "confirmations")
      assert2.property(result[0], "isValid")
      assert2.equal(result[0].isValid, false)

      assert2.equal(result[1].isValid, true)
      assert.equal(result[1].utxoType, "token")
      assert.equal(result[1].transactionType, "send")
    })

    it("should return isValid=false for BCH-only UTXOs", async () => {
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

      const result = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.isArray(result)

      assert2.property(result[0], "txid")
      assert2.property(result[0], "vout")
      assert2.property(result[0], "amount")
      assert2.property(result[0], "satoshis")
      assert2.property(result[0], "confirmations")
      assert2.property(result[0], "isValid")
      assert2.equal(result[0].isValid, false)

      assert2.property(result[1], "txid")
      assert2.property(result[1], "vout")
      assert2.property(result[1], "amount")
      assert2.property(result[1], "satoshis")
      assert2.property(result[1], "confirmations")
      assert2.property(result[1], "isValid")
      assert2.equal(result[1].isValid, false)
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

      assert2.equal(data[0].utxoType, "token")
      assert2.equal(data[0].tokenQty, 100)
      assert2.equal(data[0].isValid, true)
      assert2.equal(data[0].tokenType, 1)

      assert2.equal(data[1].utxoType, "minting-baton")
      assert2.equal(data[1].isValid, true)
      assert2.equal(data[1].tokenType, 1)

      assert2.equal(data[2].isValid, false)
    })

    it("should decode a Mint transaction", async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 1,
        txType: "MINT",
        tokenId:
          "9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136",
        mintBatonVout: 2,
        qty: "10000000000"
      }

      const genesisData = {
        tokenType: 1,
        txType: "GENESIS",
        ticker: "SLPTEST",
        name: "SLP Test Token",
        tokenId:
          "9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136",
        documentUri: "https://FullStack.cash",
        documentHash: "",
        decimals: 8,
        mintBatonVout: 2,
        qty: "10000000000"
      }

      const stubValid = [
        {
          txid:
            "880587f01e3112e779c0fdf1b9b859c242a28e56ead85483eeedcaa52f051a04",
          valid: true
        }
      ]

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
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
      sandbox
        .stub(slp.Utils, "validateTxid")
        .resolves(stubValid)
        .onCall(1)
        .resolves(stubValid)

      const utxos = [
        {
          txid:
            "880587f01e3112e779c0fdf1b9b859c242a28e56ead85483eeedcaa52f051a04",
          vout: 1,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "880587f01e3112e779c0fdf1b9b859c242a28e56ead85483eeedcaa52f051a04",
          vout: 2,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "880587f01e3112e779c0fdf1b9b859c242a28e56ead85483eeedcaa52f051a04",
          vout: 3,
          value: "10552",
          confirmations: 0,
          satoshis: 10552
        }
      ]

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)

      assert2.equal(data[0].utxoType, "token")
      assert2.equal(data[0].tokenQty, 100)
      assert2.equal(data[0].isValid, true)
      assert2.equal(data[0].tokenType, 1)

      assert2.equal(data[1].utxoType, "minting-baton")
      assert2.equal(data[1].isValid, true)
      assert2.equal(data[1].tokenType, 1)

      assert2.equal(data[2].isValid, false)
    })

    it("should decode a NFT Group Genesis transaction", async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 129,
        txType: "GENESIS",
        ticker: "NFTTT",
        name: "NFT Test Token",
        tokenId:
          "4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4",
        documentUri: "https://FullStack.cash",
        documentHash: "",
        decimals: 0,
        mintBatonVout: 2,
        qty: "1"
      }

      const stubValid = [
        {
          txid:
            "4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4",
          valid: true
        }
      ]

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .resolves(slpData)
        .onCall(1)
        .resolves(slpData)
        .onCall(2)
        .resolves(slpData)
        .onCall(3)
        .resolves(slpData)
        .onCall(4)
        .resolves(slpData)

      // Stub the call to validateTxid
      sandbox
        .stub(slp.Utils, "validateTxid")
        .resolves(stubValid)
        .onCall(1)
        .resolves(stubValid)
        .onCall(2)
        .resolves(stubValid)

      const utxos = [
        {
          txid:
            "4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4",
          vout: 3,
          value: "15620",
          height: 638207,
          confirmations: 3,
          satoshis: 15620
        },
        {
          txid:
            "4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4",
          vout: 2,
          value: "546",
          height: 638207,
          confirmations: 3,
          satoshis: 546
        },
        {
          txid:
            "4ef6eb92950a13a69e97c2c02c7967d806aa874c0e2a6b5546a8880f2cd14bc4",
          vout: 1,
          value: "546",
          height: 638207,
          confirmations: 3,
          satoshis: 546
        }
      ]

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)

      assert2.equal(data[0].isValid, false)

      assert2.equal(data[1].utxoType, "minting-baton")
      assert2.equal(data[1].isValid, true)
      assert2.equal(data[1].tokenType, 129)

      assert2.equal(data[2].utxoType, "token")
      assert2.equal(data[2].tokenType, 129)
      assert2.equal(data[1].isValid, true)
    })

    it("should decode a NFT Group Mint transaction", async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 129,
        txType: "MINT",
        tokenId:
          "eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981",
        mintBatonVout: 2,
        qty: "10"
      }

      const genesisData = {
        tokenType: 129,
        txType: "GENESIS",
        ticker: "NFTTT",
        name: "NFT Test Token",
        tokenId:
          "eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981",
        documentUri: "https://FullStack.cash",
        documentHash: "",
        decimals: 0,
        mintBatonVout: 2,
        qty: "1"
      }

      const stubValid = [
        {
          txid:
            "35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919",
          valid: true
        }
      ]

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .resolves(slpData)
        .onCall(1)
        .resolves(slpData)
        .onCall(2)
        .resolves(genesisData)
        .onCall(3)
        .resolves(slpData)
        .onCall(4)
        .resolves(genesisData)

      // Stub the call to validateTxid
      sandbox
        .stub(slp.Utils, "validateTxid")
        .resolves(stubValid)
        .onCall(1)
        .resolves(stubValid)
        .onCall(2)
        .resolves(stubValid)

      const utxos = [
        {
          txid:
            "35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919",
          vout: 3,
          value: "15620",
          height: 638207,
          confirmations: 3,
          satoshis: 15620
        },
        {
          txid:
            "35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919",
          vout: 2,
          value: "546",
          height: 638207,
          confirmations: 3,
          satoshis: 546
        },
        {
          txid:
            "35846676e7514658bbd2fd60b1f0d4d86195908f6b2de5328d54c8e4a2d05919",
          vout: 1,
          value: "546",
          height: 638207,
          confirmations: 3,
          satoshis: 546
        }
      ]

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)

      assert2.equal(data[0].isValid, false)

      assert2.equal(data[1].utxoType, "minting-baton")
      assert2.equal(data[1].tokenType, 129)
      assert2.equal(data[1].isValid, true)

      assert2.equal(data[2].utxoType, "token")
      assert2.equal(data[2].tokenType, 129)
      assert2.equal(data[2].isValid, true)
    })

    it("should decode a NFT Child Genesis transaction", async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 65,
        txType: "GENESIS",
        ticker: "NFTC",
        name: "NFT Child",
        tokenId:
          "9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683",
        documentUri: "https://FullStack.cash",
        documentHash: "",
        decimals: 0,
        mintBatonVout: 0,
        qty: "1"
      }

      const stubValid = [
        {
          txid:
            "9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683",
          valid: true
        }
      ]

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .resolves(slpData)
        .onCall(1)
        .resolves(slpData)

      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves(stubValid)

      const utxos = [
        {
          txid:
            "9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683",
          vout: 1,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683",
          vout: 2,
          value: "13478",
          confirmations: 0,
          satoshis: 13478
        }
      ]

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)

      assert2.equal(data[0].utxoType, "token")
      assert2.equal(data[0].tokenType, 65)
      assert2.equal(data[0].isValid, true)

      assert2.equal(data[1].isValid, false)
    })

    it("should decode an NFT Child Send transaction", async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 65,
        txType: "SEND",
        tokenId:
          "9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683",
        amounts: ["1"]
      }

      const genesisData = {
        tokenType: 65,
        txType: "GENESIS",
        ticker: "NFTC",
        name: "NFT Child",
        tokenId:
          "9b6db26b64aedcedc0bd9a3037b29b3598573ec5cea99eec03faa838616cd683",
        documentUri: "https://FullStack.cash",
        documentHash: "",
        decimals: 0,
        mintBatonVout: 0,
        qty: "1"
      }

      const stubValid = [
        {
          txid:
            "6d68a7ffbb63ef851c43025f801a1d365cddda50b00741bca022c743d74cd61a",
          valid: true
        }
      ]

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
        .resolves(slpData)
        .onCall(1)
        .resolves(genesisData)
        .onCall(2)
        .resolves(slpData)

      // Stub the call to validateTxid
      sandbox.stub(slp.Utils, "validateTxid").resolves(stubValid)

      const utxos = [
        {
          txid:
            "6d68a7ffbb63ef851c43025f801a1d365cddda50b00741bca022c743d74cd61a",
          vout: 1,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "6d68a7ffbb63ef851c43025f801a1d365cddda50b00741bca022c743d74cd61a",
          vout: 2,
          value: "12136",
          confirmations: 0,
          satoshis: 12136
        }
      ]

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)

      assert2.equal(data[0].utxoType, "token")
      assert2.equal(data[0].transactionType, "send")
      assert2.equal(data[0].tokenType, 65)
      assert2.equal(data[0].isValid, true)

      assert2.equal(data[1].isValid, false)
    })

    it("should decode an NFT Group Send transaction", async () => {
      // Define stubbed data.
      const slpData = {
        tokenType: 129,
        txType: "SEND",
        tokenId:
          "eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981",
        amounts: ["1", "8"]
      }

      const genesisData = {
        tokenType: 129,
        txType: "GENESIS",
        ticker: "NFTTT",
        name: "NFT Test Token",
        tokenId:
          "eee4b82e4bb7113eca433829144363fc45f110693c286494fbf5b5c8043cc981",
        documentUri: "https://FullStack.cash",
        documentHash: "",
        decimals: 0,
        mintBatonVout: 2,
        qty: "1"
      }

      const stubValid = [
        {
          txid:
            "57cc47c265ce878679e95e2cec510d8a1a9840f5c62feb4743cc5947d57d9766",
          valid: true
        }
      ]

      // Mock external dependencies.
      // Stub the calls to decodeOpReturn.
      sandbox
        .stub(slp.Utils, "decodeOpReturn")
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
      sandbox
        .stub(slp.Utils, "validateTxid")
        .resolves(stubValid)
        .onCall(1)
        .resolves(stubValid)

      const utxos = [
        {
          txid:
            "57cc47c265ce878679e95e2cec510d8a1a9840f5c62feb4743cc5947d57d9766",
          vout: 1,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "57cc47c265ce878679e95e2cec510d8a1a9840f5c62feb4743cc5947d57d9766",
          vout: 2,
          value: "546",
          confirmations: 0,
          satoshis: 546
        },
        {
          txid:
            "57cc47c265ce878679e95e2cec510d8a1a9840f5c62feb4743cc5947d57d9766",
          vout: 3,
          value: "10794",
          confirmations: 0,
          satoshis: 10794
        }
      ]

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.isArray(data)

      assert2.equal(data[0].utxoType, "token")
      assert2.equal(data[0].transactionType, "send")
      assert2.equal(data[0].tokenType, 129)
      assert2.equal(data[0].isValid, true)

      assert2.equal(data[1].utxoType, "token")
      assert2.equal(data[1].transactionType, "send")
      assert2.equal(data[1].tokenType, 129)
      assert2.equal(data[1].isValid, true)

      assert2.equal(data[2].isValid, false)
    })

    it("should return null value when 429 recieved", async () => {
      const utxos = [
        {
          height: 654522,
          tx_hash:
            "072a1e2c2d5f1309bf4eef7f88684e4ecd544a903b386b07f3e04b91b13d8af1",
          tx_pos: 0,
          value: 6999,
          satoshis: 6999,
          txid:
            "072a1e2c2d5f1309bf4eef7f88684e4ecd544a903b386b07f3e04b91b13d8af1",
          vout: 0
        },
        {
          height: 654522,
          tx_hash:
            "a72db6a0883ecb8e379f317231b2571e41e041b7b1107e3e54c2e0b3386ac6ca",
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            "a72db6a0883ecb8e379f317231b2571e41e041b7b1107e3e54c2e0b3386ac6ca",
          vout: 1
        }
      ]

      sandbox.stub(slp.Utils, "decodeOpReturn").rejects({
        error:
          "Too many requests. Your limits are currently 3 requests per minute. Increase rate limits at https://fullstack.cash"
      })

      const data = await slp.Utils.tokenUtxoDetails(utxos)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      // Values should be 'null' to signal that a determination could not be made
      // due to a throttling issue.
      assert.equal(data[0].isValid, null)
      assert.equal(data[1].isValid, null)
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

  describe("#hydrateUtxos", () => {
    it("should throw an error if input is not an array", async () => {
      try {
        const utxos = 1234

        await slp.Utils.hydrateUtxos(utxos)

        assert2.equal(true, false, "Uh oh. Code path should not end here.")
      } catch (err) {
        // console.log(`Error: `, err)
        assert2.include(err.message, `Input must be an array.`)
      }
    })
  })
})
