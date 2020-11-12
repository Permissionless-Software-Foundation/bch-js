const chai = require("chai")
const assert = chai.assert
const axios = require("axios")
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

const mockData = require("./fixtures/ninsight-mock")

describe(`#Ninsight`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Ninsight.utxo(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings.`
        )
      }
    })

    it(`should GET utxos for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.utxo
      })

      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "utxos")
      assert.property(result, "legacyAddress")
      assert.property(result, "cashAddress")
      assert.property(result, "slpAddress")
      assert.property(result, "scriptPubKey")
      assert.property(result, "asm")

      assert.isArray(result.utxos)

      assert.property(result.utxos[0], "txid")
      assert.property(result.utxos[0], "vout")
      assert.property(result.utxos[0], "amount")
      assert.property(result.utxos[0], "satoshis")
      assert.property(result.utxos[0], "height")
      assert.property(result.utxos[0], "confirmations")
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      // Mock the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.utxoPost
      })

      const addr = [
        "bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7",
        "bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr"
      ]

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0].utxos)

      assert.property(result[0], "utxos")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "slpAddress")
      assert.property(result[0], "scriptPubKey")
      assert.property(result[0], "asm")
    })
  })

  describe("#unconfirmed", () => {
    it("should throw an error for improper input", async () => {
      try {
        const addr = 12345

        await bchjs.Ninsight.unconfirmed(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.include(
          err.message,
          "Input address must be a string or array of strings."
        )
      }
    })

    it(`should POST utxos for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.unconfirmed
      })

      const addr = "bitcoincash:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rku6usknlh5"

      const result = await bchjs.Ninsight.unconfirmed(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "utxos")
      assert.property(result, "legacyAddress")
      assert.property(result, "cashAddress")
      assert.property(result, "slpAddress")
      assert.property(result, "scriptPubKey")

      assert.isArray(result.utxos)

      assert.property(result.utxos[0], "txid")
      assert.property(result.utxos[0], "vout")
      assert.property(result.utxos[0], "amount")
      assert.property(result.utxos[0], "satoshis")
      assert.property(result.utxos[0], "confirmations")
      assert.property(result.utxos[0], "ts")
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      // Mock the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.unconfirmedPost
      })

      const addr = [
        "bitcoincash:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rku6usknlh5",
        "bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr"
      ]

      const result = await bchjs.Ninsight.unconfirmed(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0].utxos)

      assert.property(result[0], "utxos")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "slpAddress")
      assert.property(result[0], "scriptPubKey")
    })
  })

  describe(`#transactions`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Ninsight.transactions(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings.`
        )
      }
    })
    it(`should POST transaction history for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.transactionsPost
      })

      const addr = "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"

      const result = await bchjs.Ninsight.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "txs")
      assert.isArray(result[0].txs)
      assert.property(result[0].txs[0], "txid")
      assert.property(result[0].txs[0], "vin")
      assert.property(result[0].txs[0], "vout")
    })
    it(`should POST transaction history for an array of addresses`, async () => {
      // Mock the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.transactionsPost
      })

      const addr = [
        "bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7",
        "bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr"
      ]

      const result = await bchjs.Ninsight.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "txs")
      assert.isArray(result[0].txs)
      assert.property(result[0].txs[0], "txid")
    })
  })
  describe(`#txDetails`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const txid = 12345

        await bchjs.Ninsight.txDetails(txid)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Transaction ID must be a string or array of strings.`
        )
      }
    })
    it(`should POST transaction details for a single TxID`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.detailsPost
      })

      const txid = "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"

      const result = await bchjs.Ninsight.txDetails(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], "txid")
      assert.property(result[0], "version")
      assert.property(result[0], "locktime")
      assert.property(result[0], "vin")
      assert.property(result[0], "vout")
      assert.property(result[0], "blockhash")
      assert.property(result[0], "blockheight")
      assert.property(result[0], "confirmations")
      assert.property(result[0], "time")
      assert.property(result[0], "blocktime")
      assert.property(result[0], "isCoinBase")
      assert.property(result[0], "valueOut")
      assert.property(result[0], "size")
    })
    it(`should POST transaction details for an array of TxIDs`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.detailsPost
      })

      const txid = [
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
      ]

      const result = await bchjs.Ninsight.txDetails(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], "txid")
      assert.property(result[0], "vin")
      assert.property(result[0], "vout")
    })
  })

  describe(`#addrDetails`, () => {
    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bchjs.Ninsight.details(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings.`
        )
      }
    })

    it(`should GET details for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.addrDetail
      })

      const result = await bchjs.Ninsight.details("addr")
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "balance")
      assert.property(result, "balanceSat")
      assert.property(result, "totalReceived")
      assert.property(result, "totalReceivedSat")
      assert.property(result, "totalSent")
      assert.property(result, "totalSentSat")
      assert.property(result, "unconfirmedBalance")
      assert.property(result, "unconfirmedBalanceSat")
      assert.property(result, "unconfirmedTxApperances")
      assert.property(result, "txApperances")
      assert.property(result, "transactions")
      assert.property(result, "legacyAddress")
      assert.property(result, "cashAddress")
      assert.property(result, "slpAddress")
      assert.property(result, "currentPage")
      assert.property(result, "pagesTotal")
    })

    it(`should call constructor with null args`, async () => {
      new bchjs.Ninsight.constructor({})
    })

    it(`should GET details for an array of addresses`, async () => {
      // Mock the network call.
      sandbox.stub(axios, "post").resolves({
        data: mockData.addrDetailArray
      })

      const addr = [
        "bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7",
        "bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr"
      ]

      const result = await bchjs.Ninsight.details(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)

      assert.property(result[0], "balance")
      assert.property(result[0], "balanceSat")
      assert.property(result[0], "totalReceived")
      assert.property(result[0], "totalReceivedSat")
      assert.property(result[0], "totalSent")
      assert.property(result[0], "totalSentSat")
      assert.property(result[0], "unconfirmedBalance")
      assert.property(result[0], "unconfirmedBalanceSat")
      assert.property(result[0], "unconfirmedTxApperances")
      assert.property(result[0], "txApperances")
      assert.property(result[0], "transactions")
      assert.property(result[0], "legacyAddress")
      assert.property(result[1], "cashAddress")
      assert.property(result[1], "slpAddress")
      assert.property(result[1], "currentPage")
      assert.property(result[1], "pagesTotal")

      /*
      If in any way possible, I would like to refactor this test
      according to the DRY principle to share it with the integration tests too
      Would that make sense or does that implicate anything unwanted?

      assertDetails(result[0])

      assertDetails(data) {
            assert.property(data, "satoshis")
            assert.property(data, "height")
            assert.property(data, "confirmations")
            assert.property(data, "timestamp")
            assert.property(data, "fees")
            assert.property(data, "outputIndexes")
            assert.property(data, "inputIndexes")
            assert.property(data, "tx")
      }
      */
    })
  })
})
