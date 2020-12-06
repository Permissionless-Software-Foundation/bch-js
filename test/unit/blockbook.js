const chai = require("chai")
const assert = chai.assert
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()
const axios = require("axios")
const sinon = require("sinon")

const mockData = require("./fixtures/blockbook-mock")

describe(`#Blockbook`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe(`#Balance`, () => {
    it(`should GET balance for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "get").resolves({ data: mockData.balance })

      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await bchjs.Blockbook.balance(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAnyKeys(result, [
        "page",
        "totalPages",
        "itemsOnPage",
        "address",
        "balance",
        "totalReceived",
        "totalSent",
        "unconfirmedBalance",
        "unconfirmedTxs",
        "txs",
        "txids"
      ])
      assert.isArray(result.txids)
    })

    it(`should POST request balances for an array of addresses`, async () => {
      // Stub the network call.
      sandbox
        .stub(axios, "post")
        .resolves({ data: [mockData.balance, mockData.balance] })

      const addr = [
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      ]

      const result = await bchjs.Blockbook.balance(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "page",
        "totalPages",
        "itemsOnPage",
        "address",
        "balance",
        "totalReceived",
        "totalSent",
        "unconfirmedBalance",
        "unconfirmedTxs",
        "txs",
        "txids"
      ])
      assert.isArray(result[0].txids)
    })

    it(`should throw an error for improper input`, async () => {
      try {
        // Stub the network call.
        sandbox
          .stub(axios, "post")
          .throws(`Input address must be a string or array of strings`)

        const addr = 12345

        await bchjs.Blockbook.balance(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })
    /*
    it(`should throw error on array size rate limit`, async () => {
      try {
        // Stub the network call.
        sandbox.stub(axios, "post").throws(`Array too large`)

        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bchjs.Blockbook.balance(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
    */
  })

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "get").resolves({ data: mockData.utxo })

      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await bchjs.Blockbook.utxo(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "txid",
        "vout",
        "value",
        "height",
        "confirmations"
      ])
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "post").resolves({ data: mockData.utxos })

      const addr = [
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      ]

      const result = await bchjs.Blockbook.utxo(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0])
      assert.hasAnyKeys(result[0][0], [
        "txid",
        "vout",
        "value",
        "height",
        "confirmations"
      ])
    })

    it(`should throw an error for improper input`, async () => {
      try {
        // Stub the network call.
        sandbox
          .stub(axios, "post")
          .throws(`Input address must be a string or array of strings`)

        const addr = 12345

        await bchjs.Blockbook.utxo(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })
    /*
    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bchjs.Blockbook.utxo(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
    */
  })

  describe(`#tx`, () => {
    it(`should GET tx details for a single txid`, async () => {
      // Stub the network call.
      sandbox.stub(axios, "get").resolves({ data: mockData.utxo })

      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await bchjs.Blockbook.utxo(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "txid",
        "vout",
        "value",
        "height",
        "confirmations"
      ])
    })

    // it(`should POST utxo details for an array of addresses`, async () => {
    //   // Stub the network call.
    //   sandbox.stub(axios, "post").resolves({ data: mockData.utxos })
    //
    //   const addr = [
    //     "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
    //     "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
    //   ]
    //
    //   const result = await bchjs.Blockbook.utxo(addr)
    //   //console.log(`result: ${JSON.stringify(result, null, 2)}`)
    //
    //   assert.isArray(result)
    //   assert.isArray(result[0])
    //   assert.hasAnyKeys(result[0][0], [
    //     "txid",
    //     "vout",
    //     "value",
    //     "height",
    //     "confirmations"
    //   ])
    // })

    // it(`should throw an error for improper input`, async () => {
    //   try {
    //     // Stub the network call.
    //     sandbox
    //       .stub(axios, "post")
    //       .throws(`Input address must be a string or array of strings`)
    //
    //     const addr = 12345
    //
    //     await bchjs.Blockbook.utxo(addr)
    //     assert.equal(true, false, "Unexpected result!")
    //   } catch (err) {
    //     //console.log(`err: `, err)
    //     assert.include(
    //       err.message,
    //       `Input address must be a string or array of strings`
    //     )
    //   }
    // })

    /*
    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bchjs.Blockbook.utxo(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
    */
  })
})
