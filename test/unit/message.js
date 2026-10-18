import assert from 'assert'
import BCHJS from '../../src/bch-js.js'
import message from '../../src/message.js'

describe('#message', () => {
  const wif = 'Ky54Y7sxkGovqTi5ogipFUToqsz4NCepLn3bitzHyiF3JaYULMbP'

  function keyPairFor (compressed) {
    const bchjs = new BCHJS({ restURL: 'http://localhost:3000/v5/' })
    const keyPair = bchjs.ECPair.fromWIF(wif)
    keyPair.compressed = compressed
    return { bchjs, keyPair }
  }

  it('should sign and verify a buffer message', () => {
    const { keyPair } = keyPairFor(true)
    const payload = Buffer.from('buffer message')
    const signature = message.sign(payload, keyPair)

    assert.strictEqual(Buffer.isBuffer(signature), true)
    assert.strictEqual(message.verify(payload, keyPair.getAddress(), signature), true)
  })

  it('should sign and verify an uncompressed key', () => {
    const { bchjs, keyPair } = keyPairFor(false)
    const signature = message.sign('uncompressed', keyPair).toString('base64')

    assert.strictEqual(
      bchjs.BitcoinCash.verifyMessage(keyPair.getAddress(), signature, 'uncompressed'),
      true
    )
  })

  it('should sign a message long enough for a 16-bit length prefix', () => {
    const { keyPair } = keyPairFor(true)
    const signature = message.sign('a'.repeat(300), keyPair)

    assert.strictEqual(signature.length, 65)
  })

  it('should sign a message long enough for a 32-bit length prefix', () => {
    const { keyPair } = keyPairFor(true)
    const signature = message.sign('a'.repeat(70000), keyPair)

    assert.strictEqual(signature.length, 65)
  })

  it('should reject a signature whose recovery id does not yield a public key', () => {
    const { keyPair } = keyPairFor(true)
    const signature = message.sign('recover', keyPair)
    signature[0] = 34

    assert.strictEqual(message.verify('recover', keyPair.getAddress(), signature.toString('base64')), false)
  })

  it('should throw when no recovery id matches the public key', () => {
    const { keyPair } = keyPairFor(true)
    keyPair.getPublicKeyBuffer = () => Buffer.alloc(33, 1)

    assert.throws(() => message.sign('mismatch', keyPair), /Unable to sign message/)
  })
})
