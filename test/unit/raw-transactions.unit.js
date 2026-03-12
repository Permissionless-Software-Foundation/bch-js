/*
  Focused unit tests for retry behavior in raw-transactions.js.
*/

import assert from 'assert'
import sinon from 'sinon'

import RawTransactions from '../../src/raw-transactions.js'

describe('#RawTransactions Retry Logic', () => {
  afterEach(() => sinon.restore())

  it('retries once on ECONNRESET and succeeds', async () => {
    const axiosStub = sinon.stub()
    axiosStub.onCall(0).rejects(Object.assign(new Error('socket hang up'), { code: 'ECONNRESET' }))
    axiosStub.onCall(1).resolves({ data: ['txid-123'] })

    const uut = new RawTransactions({
      restURL: 'http://localhost:5942/v6/',
      authToken: '',
      axios: axiosStub
    })
    uut.broadcastRetryDelayMs = 0

    const result = await uut.sendRawTransaction(['abcd'])

    assert.deepStrictEqual(result, ['txid-123'])
    assert.equal(axiosStub.callCount, 2)
    assert.equal(axiosStub.getCall(0).args[0].headers.Connection, 'close')
    assert.equal(axiosStub.getCall(1).args[0].headers.Connection, 'close')
  })

  it('does not retry on non-transient errors', async () => {
    const axiosStub = sinon.stub()
    axiosStub.rejects(new Error('RPC validation error'))

    const uut = new RawTransactions({
      restURL: 'http://localhost:5942/v6/',
      authToken: '',
      axios: axiosStub
    })
    uut.broadcastRetryDelayMs = 0

    await assert.rejects(
      uut.sendRawTransaction(['abcd']),
      /RPC validation error/
    )
    assert.equal(axiosStub.callCount, 1)
  })

  it('enforces retry cap for repeated transient failures', async () => {
    const axiosStub = sinon.stub()
    axiosStub.rejects(Object.assign(new Error('socket hang up'), { code: 'ECONNRESET' }))

    const uut = new RawTransactions({
      restURL: 'http://localhost:5942/v6/',
      authToken: '',
      axios: axiosStub
    })
    uut.broadcastRetryDelayMs = 0
    uut.maxBroadcastRetries = 3

    await assert.rejects(
      uut.sendRawTransaction(['abcd']),
      /socket hang up/
    )

    // 1 initial attempt + 2 retries.
    assert.equal(axiosStub.callCount, 4)
  })
})
