const chai = require('chai')
const assert = chai.assert
const axios = require('axios')
const sinon = require('sinon')

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

const mockData = require('./fixtures/electrumx-mock')

describe('#ElectrumX', () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe('#utxo', () => {
    it('should throw an error for improper input', async () => {
      try {
        const addr = 12345

        await bchjs.Electrumx.utxo(addr)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(
          err.message,
          'Input address must be a string or array of strings'
        )
      }
    })

    it('should GET utxos for a single address', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'get').resolves({ data: mockData.utxo })

      const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'

      const result = await bchjs.Electrumx.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'utxos')
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], 'height')
      assert.property(result.utxos[0], 'tx_hash')
      assert.property(result.utxos[0], 'tx_pos')
      assert.property(result.utxos[0], 'value')
    })

    it('should POST utxo details for an array of addresses', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.utxos })

      const addr = [
        'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf',
        'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v'
      ]

      const result = await bchjs.Electrumx.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'utxos')
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], 'utxos')
      assert.isArray(result.utxos[0].utxos)
      assert.property(result.utxos[0], 'address')

      assert.property(result.utxos[0].utxos[0], 'height')
      assert.property(result.utxos[0].utxos[0], 'tx_hash')
      assert.property(result.utxos[0].utxos[0], 'tx_pos')
      assert.property(result.utxos[0].utxos[0], 'value')
    })
  })

  describe('#balance', () => {
    it('should throw an error for improper input', async () => {
      try {
        const addr = 12345

        await bchjs.Electrumx.balance(addr)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(
          err.message,
          'Input address must be a string or array of strings'
        )
      }
    })

    it('should GET balance for a single address', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'get').resolves({ data: mockData.balance })

      const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'

      const result = await bchjs.Electrumx.balance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'balance')
      assert.property(result.balance, 'confirmed')
      assert.property(result.balance, 'unconfirmed')
    })

    it('should POST balance for an array of addresses', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.balances })

      const addr = [
        'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf',
        'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v'
      ]

      const result = await bchjs.Electrumx.balance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'balances')
      assert.isArray(result.balances)

      assert.property(result.balances[0], 'address')
      assert.property(result.balances[0], 'balance')
      assert.property(result.balances[0].balance, 'confirmed')
      assert.property(result.balances[0].balance, 'unconfirmed')
    })
  })

  describe('#transactions', () => {
    it('should throw an error for improper input', async () => {
      try {
        const addr = 12345

        await bchjs.Electrumx.transactions(addr)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(
          err.message,
          'Input address must be a string or array of strings'
        )
      }
    })

    it('should GET transactions for a single address', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'get').resolves({ data: mockData.transaction })

      const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'

      const result = await bchjs.Electrumx.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'transactions')
      assert.isArray(result.transactions)
      assert.property(result.transactions[0], 'height')
      assert.property(result.transactions[0], 'tx_hash')
    })

    it('should POST transaction history for an array of addresses', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.transactions })

      const addr = [
        'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf',
        'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v'
      ]

      const result = await bchjs.Electrumx.transactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'transactions')
      assert.isArray(result.transactions)

      assert.property(result.transactions[0], 'address')
      assert.property(result.transactions[0], 'transactions')
      assert.isArray(result.transactions[0].transactions)
      assert.property(result.transactions[0].transactions[0], 'height')
      assert.property(result.transactions[0].transactions[0], 'tx_hash')
    })
  })

  describe('#unconfirmed', () => {
    it('should throw an error for improper input', async () => {
      try {
        const addr = 12345

        await bchjs.Electrumx.unconfirmed(addr)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(
          err.message,
          'Input address must be a string or array of strings'
        )
      }
    })

    it('should GET unconfirmed utxos for a single address', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'get').resolves({ data: mockData.unconfirmed })

      const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'

      const result = await bchjs.Electrumx.unconfirmed(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'utxos')
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], 'height')
      assert.property(result.utxos[0], 'tx_hash')
      assert.property(result.utxos[0], 'fee')
    })

    it('should POST unconfirmed utxo details for an array of addresses', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.unconfirmedArray })

      const addr = [
        'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf',
        'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v'
      ]

      const result = await bchjs.Electrumx.unconfirmed(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'utxos')
      assert.isArray(result.utxos)

      assert.property(result.utxos[0], 'utxos')
      assert.isArray(result.utxos[0].utxos)
      assert.property(result.utxos[0], 'address')

      assert.property(result.utxos[0].utxos[0], 'height')
      assert.property(result.utxos[0].utxos[0], 'tx_hash')
      assert.property(result.utxos[0].utxos[0], 'fee')
    })
  })

  describe('#blockHeader', () => {
    it('should throw an error for improper height input', async () => {
      try {
        // Mock network calls.
        sandbox.stub(axios, 'get').rejects({
          response: {
            data: {
              success: false,
              error: 'height must be a positive number'
            }
          }
        })

        const height = -10
        await bchjs.Electrumx.blockHeader(height)

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'height must be a positive number')
      }
    })

    it('should throw an error for improper count input', async () => {
      try {
        // Mock network calls.
        sandbox.stub(axios, 'get').rejects({
          response: {
            data: {
              success: false,
              error: 'count must be a positive number'
            }
          }
        })

        const height = 42
        const count = -10

        await bchjs.Electrumx.blockHeader(height, count)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'count must be a positive number')
      }
    })

    it('should GET block headers for a given height', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'get').resolves({ data: mockData.blockHeaders })

      const height = 42

      const result = await bchjs.Electrumx.blockHeader(height)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      assert.isArray(result)
      assert.equal(result.length, 2)
    })
  })

  describe('#txData', () => {
    it('should throw an error for improper input', async () => {
      try {
        const txid = 12345

        await bchjs.Electrumx.txData(txid)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(
          err.message,
          'Input txId must be a string or array of strings'
        )
      }
    })

    it('should GET details data for a single transaction', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'get').resolves({ data: mockData.details })

      const txid =
        '4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251'

      const result = await bchjs.Electrumx.txData(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'details')
      assert.isObject(result.details)

      assert.property(result.details, 'blockhash')
      assert.property(result.details, 'hash')
      assert.property(result.details, 'hex')
      assert.property(result.details, 'vin')
      assert.property(result.details, 'vout')
      assert.equal(result.details.hash, txid)
    })

    it('should POST details for an array of transactions', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.detailsArray })

      const txids = [
        '4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251',
        '4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251'
      ]

      const result = await bchjs.Electrumx.txData(txids)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'transactions')
      assert.isArray(result.transactions)

      assert.property(result.transactions[0], 'txid')
      assert.property(result.transactions[0], 'details')

      assert.property(result.transactions[0].details, 'blockhash')
      assert.property(result.transactions[0].details, 'hash')
      assert.property(result.transactions[0].details, 'hex')
      assert.property(result.transactions[0].details, 'vin')
      assert.property(result.transactions[0].details, 'vout')

      assert.equal(result.transactions.length, 2, '2 outputs for 2 inputs')
    })
  })

  describe('#broadcast', () => {
    it('should throw an error for improper input', async () => {
      try {
        const txHex = 12345

        await bchjs.Electrumx.broadcast(txHex)
        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        // console.log(`err: `, err)
        assert.include(err.message, 'Input txHex must be a string.')
      }
    })

    it('should broadcast a single transaction', async () => {
      // Stub the network call.
      sandbox.stub(axios, 'post').resolves({ data: mockData.broadcast })

      const tx = mockData.details
      const txid = tx.details.txid
      const result = await bchjs.Electrumx.broadcast(tx.details.hex)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'txid')
      assert.equal(result.txid, txid)
    })
  })

  describe('#sortConfTxs', () => {
    it('should sort in ascending order', () => {
      const result = bchjs.Electrumx.sortConfTxs(mockData.transaction.transactions, 'ASCENDING')
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isBelow(result[0].height, result[1].height)
    })

    it('should sort in descending order by default', () => {
      const result = bchjs.Electrumx.sortConfTxs(mockData.transaction.transactions)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isAbove(result[0].height, result[1].height)
    })

    it('should ignore unconfirmed txs', () => {
      const result = bchjs.Electrumx.sortConfTxs(mockData.txHistoryWithUnconfirmed.transactions)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isAbove(result[0].height, 0)
    })

    it('should handle errors', () => {
      try {
        bchjs.Electrumx.sortConfTxs('abc')

        assert.fail('Unexpected result')
      } catch (err) {
        // console.log(err.message)
        assert.equal(err.message, 'txs.filter is not a function')
      }
    })
  })

  // These tests use mocked data that contains unconfirmed transactions.
  describe('#sortAllTxs', () => {
    it('should sort in ascending', async () => {
      // Stub network calls
      sandbox.stub(bchjs.Electrumx.blockchain, 'getBlockCount').resolves(672141)

      const result = await bchjs.Electrumx.sortAllTxs(mockData.txHistoryWithUnconfirmed.transactions, 'ASCENDING')
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isBelow(result[0].height, result[1].height)
    })

    it('should sort in descending order by default', async () => {
      // Stub network calls
      sandbox.stub(bchjs.Electrumx.blockchain, 'getBlockCount').resolves(672141)

      const result = await bchjs.Electrumx.sortAllTxs(mockData.txHistoryWithUnconfirmed.transactions)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isAbove(result[1].height, result[2].height)
    })

    it('should handle errors', async () => {
      try {
        // Stub network calls
        sandbox.stub(bchjs.Electrumx.blockchain, 'getBlockCount').resolves(672141)

        await bchjs.Electrumx.sortAllTxs('abc')

        assert.fail('Unexpected result')
      } catch (err) {
        // console.log(err.message)
        assert.equal(err.message, 'txs.map is not a function')
      }
    })
  })
})
