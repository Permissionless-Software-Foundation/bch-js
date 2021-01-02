const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS({ ninsightURL: 'https://rest.bitcoin.com/v2' })

describe('#Ninsight', () => {
  let sandbox

  beforeEach(async () => {
    sandbox = sinon.createSandbox()

    if (process.env.IS_USING_FREE_TIER) await sleep(1000)
  })

  afterEach(() => sandbox.restore())

  describe('#utxo', () => {
    it('should GET utxos for a single address', async () => {
      const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result[0], 'utxos')
      assert.property(result[0], 'legacyAddress')
      assert.property(result[0], 'cashAddress')
      assert.property(result[0], 'slpAddress')
      assert.property(result[0], 'scriptPubKey')
      assert.property(result[0], 'asm')

      assert.isArray(result[0].utxos)

      assert.property(result[0].utxos[0], 'txid')
      assert.property(result[0].utxos[0], 'vout')
      assert.property(result[0].utxos[0], 'amount')
      assert.property(result[0].utxos[0], 'satoshis')
      assert.property(result[0].utxos[0], 'height')
      assert.property(result[0].utxos[0], 'confirmations')
    })

    it('should POST utxo details for an array of addresses', async () => {
      const addr = [
        'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7',
        'bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr'
      ]

      const result = await bchjs.Ninsight.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.isArray(result[0].utxos)

      assert.property(result[0], 'utxos')
      assert.property(result[0], 'legacyAddress')
      assert.property(result[0], 'cashAddress')
      assert.property(result[0], 'slpAddress')
      assert.property(result[0], 'scriptPubKey')
      assert.property(result[0], 'asm')
    })
  })
  describe('#transactions', () => {
    it('should POST transactions history for a single address', async () => {
      const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'

      const result = await bchjs.Ninsight.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'cashAddress')
      assert.property(result[0], 'legacyAddress')
      assert.property(result[0], 'txs')
      assert.isArray(result[0].txs)
      assert.property(result[0].txs[0], 'txid')
      assert.property(result[0].txs[0], 'vin')
      assert.property(result[0].txs[0], 'vout')
    })
    it('should POST transactions history for an array of addresses', async () => {
      const addr = [
        'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7',
        'bitcoincash:qz0us0z6ucpqt07jgpad0shgh7xmwxyr3ynlcsq0wr'
      ]

      const result = await bchjs.Ninsight.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'cashAddress')
      assert.property(result[0], 'legacyAddress')
      assert.property(result[0], 'txs')
      assert.isArray(result[0].txs)
      assert.property(result[0].txs[0], 'txid')
      assert.property(result[0].txs[0], 'vin')
      assert.property(result[0].txs[0], 'vout')
    })
  })
  describe('#txDetails', () => {
    it('should POST transactions details for a single address', async () => {
      const txid = 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33'

      const result = await bchjs.Ninsight.txDetails(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'txid')
      assert.property(result[0], 'version')
      assert.property(result[0], 'locktime')
      assert.property(result[0], 'vin')
      assert.property(result[0], 'vout')
      assert.property(result[0], 'blockhash')
      assert.property(result[0], 'blockheight')
      assert.property(result[0], 'confirmations')
      assert.property(result[0], 'time')
      assert.property(result[0], 'blocktime')
      assert.property(result[0], 'valueOut')
      assert.property(result[0], 'size')
    })
    it('should POST transactions details for an array of addresses', async () => {
      const txid = [
        'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
        '4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251'
      ]

      const result = await bchjs.Ninsight.txDetails(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.property(result[0], 'txid')
      assert.property(result[0], 'vin')
      assert.property(result[0], 'vout')
    })
  })
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
