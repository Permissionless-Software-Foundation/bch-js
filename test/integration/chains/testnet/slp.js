/*
  Integration tests for the bchjs covering SLP tokens.
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
  depth: 1
}

describe('#SLP', () => {
  beforeEach(async () => {
    // Introduce a delay so that the BVT doesn't trip the rate limits.
    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  describe('#util', () => {
    it('should get information on the Oasis token', async () => {
      const tokenId =
        'a371e9934c7695d08a5eb7f31d3bceb4f3644860cc67520cda1e149423b9ec39'

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

  describe('#decodeOpReturn', () => {
    it('should decode the OP_RETURN for a SEND txid', async () => {
      const txid =
        'ad28116e0818339342dddfc5f58ca8a5379ceb9679b4e4cbd72f4de905415ec1'

      const result = await bchjs.SLP.Utils.decodeOpReturn(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['amounts', 'tokenType', 'tokenId', 'txType'])
    })
  })

  describe('#balancesForAddress', () => {
    it('should fetch all balances for address: slptest:qz0kc67pm4emjyr3gaaa2wstdaykg9m4yqwlzpj3w9', async () => {
      const balances = await bchjs.SLP.Utils.balancesForAddress(
        'slptest:qz0kc67pm4emjyr3gaaa2wstdaykg9m4yqwlzpj3w9'
      )
      // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert.isArray(balances)
      assert.hasAllKeys(balances[0], [
        'tokenId',
        'balanceString',
        'balance',
        'decimalCount',
        'slpAddress'
      ])
    })

    it('should fetch balances for multiple addresses', async () => {
      const addresses = [
        'slptest:qz0kc67pm4emjyr3gaaa2wstdaykg9m4yqwlzpj3w9',
        'slptest:qr5uy4h8ysyhwkp9s245scckdnc7teyjqc5ft2z43h'
      ]

      const balances = await bchjs.SLP.Utils.balancesForAddress(addresses)
      // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert.isArray(balances)
      assert.isArray(balances[0])
      assert.hasAllKeys(balances[0][0], [
        'tokenId',
        'balanceString',
        'balance',
        'decimalCount',
        'slpAddress'
      ])
    })
  })

  describe('#tokenUtxoDetails', () => {
    it('should hydrate UTXOs', async () => {
      const bchAddr = bchjs.SLP.Address.toCashAddress(
        'slptest:qz0kc67pm4emjyr3gaaa2wstdaykg9m4yqwlzpj3w9'
      )

      const utxos = await bchjs.Electrumx.utxo([bchAddr])
      // console.log(`utxos: ${JSON.stringify(utxos, null, 2)}`)

      const utxoInfo = await bchjs.SLP.Utils.tokenUtxoDetails(
        utxos.utxos[0].utxos
      )
      // console.log(`utxoInfo: ${JSON.stringify(utxoInfo, null, 2)}`)

      assert.isArray(utxoInfo)

      // first UTXO should be a PSF test token.
      assert.equal(utxoInfo[0].isValid, true)
    })
  })

  describe('#hydrateUtxos', () => {
    // This test will error out if the LOCAL_RESTURL settings is not set properly
    // in bch-api.
    it('should hydrate UTXOs', async () => {
      const bchAddr = bchjs.SLP.Address.toCashAddress(
        'slptest:qz0kc67pm4emjyr3gaaa2wstdaykg9m4yqwlzpj3w9'
      )

      const utxos = await bchjs.Electrumx.utxo([bchAddr])
      // console.log(`utxos: ${JSON.stringify(utxos, null, 2)}`)

      const utxoInfo = await bchjs.SLP.Utils.hydrateUtxos(utxos.utxos)
      // console.log(`utxoInfo: ${JSON.stringify(utxoInfo, null, 2)}`)

      assert.isArray(utxoInfo.slpUtxos[0].utxos)

      // first UTXO should be a PSF test token.
      assert.equal(utxoInfo.slpUtxos[0].utxos[0].isValid, true)
    })
  })

  describe('#validateTxid2', () => {
    it('should validate a token txid', async () => {
      const txid =
        'ad28116e0818339342dddfc5f58ca8a5379ceb9679b4e4cbd72f4de905415ec1'

      const validated = await bchjs.SLP.Utils.validateTxid(txid)
      // console.log(validated)

      assert.equal(validated[0].valid, true)
    })
  })
})

// Promise-based sleep function
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
