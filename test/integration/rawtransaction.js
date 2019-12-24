/*
  Integration tests for the bchjs. Only covers calls made to
  rest.bitcoin.com.

  TODO
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
  depth: 3
}

describe("#rawtransaction", () => {
  describe("#decodeRawTransaction", () => {
    it("should decode tx for a single hex", async () => {
      const hex =
        "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000"

      const result = await bchjs.RawTransactions.decodeRawTransaction(hex)
      //console.log(`result ${JSON.stringify(result, null, 2)}`)

      assert.hasAnyKeys(result, [
        "txid",
        "hash",
        "size",
        "version",
        "locktime",
        "vin",
        "vout"
      ])
      assert.isArray(result.vin)
      assert.isArray(result.vout)
    })

    it("should decode an array of tx hexes", async () => {
      const hexes = [
        "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000",
        "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000"
      ]

      const result = await bchjs.RawTransactions.decodeRawTransaction(hexes)
      //console.log(`result ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "txid",
        "hash",
        "size",
        "version",
        "locktime",
        "vin",
        "vout"
      ])
      assert.isArray(result[0].vin)
      assert.isArray(result[0].vout)
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const addr = 12345

        await bchjs.RawTransactions.decodeRawTransaction(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings.`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const data = []
        for (let i = 0; i < 25; i++) {
          data.push(
            "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000"
          )
        }

        const result = await bchjs.RawTransactions.decodeRawTransaction(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe("#getRawTransaction", () => {
    it("should decode a single txid, with concise output", async () => {
      const txid =
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1"
      const verbose = false

      const result = await bchjs.RawTransactions.getRawTransaction(
        txid,
        verbose
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isString(result)
    })

    it("should decode a single txid, with verbose output", async () => {
      const txid =
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1"
      const verbose = true

      const result = await bchjs.RawTransactions.getRawTransaction(
        txid,
        verbose
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAnyKeys(result, [
        "hex",
        "txid",
        "hash",
        "size",
        "version",
        "locktime",
        "vin",
        "vout",
        "blockhash",
        "confirmations",
        "time",
        "blocktime"
      ])
      assert.isArray(result.vin)
      assert.isArray(result.vout)
    })

    it("should decode an array of txids, with a concise output", async () => {
      const txid = [
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
        "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
      ]
      const verbose = false

      const result = await bchjs.RawTransactions.getRawTransaction(
        txid,
        verbose
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isString(result[0])
    })

    it("should decode an array of txids, with a verbose output", async () => {
      const txid = [
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
        "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
      ]
      const verbose = true

      const result = await bchjs.RawTransactions.getRawTransaction(
        txid,
        verbose
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "hex",
        "txid",
        "hash",
        "size",
        "version",
        "locktime",
        "vin",
        "vout",
        "blockhash",
        "confirmations",
        "time",
        "blocktime"
      ])
      assert.isArray(result[0].vin)
      assert.isArray(result[0].vout)
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const dataMock =
          "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1"
        const data = []
        for (let i = 0; i < 25; i++) data.push(dataMock)

        const result = await bchjs.RawTransactions.getRawTransaction(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe("#decodeScript", () => {
    it("should decode script for a single hex", async () => {
      const hex =
        "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16"

      const result = await bchjs.RawTransactions.decodeScript(hex)
      //console.log(`result ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["asm", "type", "p2sh"])
    })

    // CT 2/20/19 - Waiting for this PR to be merged complete the test:
    // https://github.com/Bitcoin-com/rest.bitcoin.com/pull/312
    /*
    it("should decode an array of tx hexes", async () => {
      const hexes = [
        "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16",
        "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16"
      ]

      const result = await bchjs.RawTransactions.decodeScript(hexes)
      console.log(`result ${JSON.stringify(result, null, 2)}`)
    })
*/
    /*
    it(`should throw an error for improper single input`, async () => {
      try {
        const addr = 12345

        await bchjs.RawTransactions.decodeRawTransaction(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings.`
        )
      }
    })
*/
  })

  /*
    Testing sentRawTransaction isn't really possible with an integration test,
    as the endpoint really needs an e2e test to be properly tested. The tests
    below expect error messages returned from the server, but at least test
    that the server is responding on those endpoints, and responds consistently.
  */
  describe("sendRawTransaction", () => {
    it("should send a single transaction hex", async () => {
      try {
        const hex =
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000"

        await bchjs.RawTransactions.sendRawTransaction(hex)
        //console.log(`result ${JSON.stringify(result, null, 2)}`)

        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: ${util.inspect(err)}`)

        assert.hasAllKeys(err, ["error"])
        assert.include(err.error, "Missing inputs")
      }
    })

    it("should send an array of tx hexes", async () => {
      try {
        const hexes = [
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000",
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000"
        ]

        const result = await bchjs.RawTransactions.sendRawTransaction(hexes)
        console.log(`result ${JSON.stringify(result, null, 2)}`)
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)

        assert.hasAllKeys(err, ["error"])
        assert.include(err.error, "Missing inputs")
      }
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const addr = 12345

        await bchjs.RawTransactions.sendRawTransaction(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input hex must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const dataMock =
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000"
        const data = []
        for (let i = 0; i < 25; i++) data.push(dataMock)

        const result = await bchjs.RawTransactions.sendRawTransaction(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
