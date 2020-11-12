const chai = require("chai")
const assert = chai.assert
const sinon = require("sinon")

const BCHJS = require("../../../src/bch-js")
const bchjs = new BCHJS({
  ninsightURL: "https://trest.bitcoin.com/v2"
})

describe(`#Ninsight`, () => {
  let sandbox

  beforeEach(async () => {
    if (process.env.IS_USING_FREE_TIER) await sleep(1000)

    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr"

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result[0], "utxos")
      assert.property(result[0], "legacyAddress")
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "slpAddress")
      assert.property(result[0], "scriptPubKey")
      assert.property(result[0], "asm")

      assert.isArray(result[0].utxos)

      assert.property(result[0].utxos[0], "txid")
      assert.property(result[0].utxos[0], "vout")
      assert.property(result[0].utxos[0], "amount")
      assert.property(result[0].utxos[0], "satoshis")
      assert.property(result[0].utxos[0], "height")
      assert.property(result[0].utxos[0], "confirmations")
    })

    it(`should POST utxo details for an array of addresses`, async () => {
      const addr = [
        "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr",
        "bchtest:qp6hgvevf4gzz6l7pgcte3gaaud9km0l459fa23dul"
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

      // assert.hasAnyKeys(result[0][0], [
      //   "txid",
      //   "vout",
      //   "value",
      //   "height",
      //   "confirmations"
      // ])
    })
  })
  describe(`#transactions`, () => {
    it(`should POST transactions history for a single address`, async () => {
      const addr = "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr"

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
    it(`should POST transactions history for an array of addresses`, async () => {
      const addr = [
        "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr",
        "bchtest:qp6hgvevf4gzz6l7pgcte3gaaud9km0l459fa23dul"
      ]

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
  })
  describe(`#txDetails`, () => {
    it(`should POST transactions details for a single address`, async () => {
      const txid = "76856d82e00b2696acd8d989e1fa6c46b431005046a285ce905814cac0ff8fea"

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
      assert.property(result[0], "valueOut")
      assert.property(result[0], "size")
    })
    it(`should POST transactions details for an array of addresses`, async () => {
      const txid = [
        "f191d1062789d7071da6f2168ba306869a829294f6b1c09d03492db4ca3a8e77",
        "76856d82e00b2696acd8d989e1fa6c46b431005046a285ce905814cac0ff8fea"
      ]

      const result = await bchjs.Ninsight.txDetails(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], "txid")
      assert.property(result[0], "vin")
      assert.property(result[0], "vout")
    })
  })

  describe(`#detailsAddress`, () => {
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

    it(`should POST address details for a single address`, async () => {
      const addr = "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr"

      const result = await bchjs.Ninsight.details(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)
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
      assert.property(result[0], "cashAddress")
      assert.property(result[0], "slpAddress")
      assert.property(result[0], "currentPage")
      assert.property(result[0], "pagesTotal")
    })

    it(`should POST address details for an array of addresses`, async () => {
      const addr = [
        "bchtest:qzjtnzcvzxx7s0na88yrg3zl28wwvfp97538sgrrmr",
        "bchtest:qp6hgvevf4gzz6l7pgcte3gaaud9km0l459fa23dul"
      ]

      const result = await bchjs.Ninsight.details(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

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
        assert.property(data, "balance")
        assert.property(data, "balanceSat")
        assert.property(data, "totalReceived")
        assert.property(data, "totalReceivedSat")
        assert.property(data, "totalSent")
        assert.property(data, "totalSentSat")
      }
      */
    })
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
