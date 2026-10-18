import BigInteger from 'bigi'
import ecurve from 'ecurve'
import Bitcoin from '@psf/bitcoincashjs-lib'

const curve = ecurve.getCurveByName('secp256k1')
const MESSAGE_PREFIX = Buffer.from('\u0018Bitcoin Signed Message:\n', 'utf8')

function encodeVarint (value) {
  if (value < 0xfd) return Buffer.from([value])

  if (value <= 0xffff) {
    const buffer = Buffer.allocUnsafe(3)
    buffer.writeUInt8(0xfd, 0)
    buffer.writeUInt16LE(value, 1)
    return buffer
  }

  const buffer = Buffer.allocUnsafe(5)
  buffer.writeUInt8(0xfe, 0)
  buffer.writeUInt32LE(value, 1)
  return buffer
}

function magicHash (message) {
  const messageBuffer = Buffer.isBuffer(message) ? message : Buffer.from(message, 'utf8')
  return Bitcoin.crypto.hash256(Buffer.concat([
    MESSAGE_PREFIX,
    encodeVarint(messageBuffer.length),
    messageBuffer
  ]))
}

function recoverPublicKey (hash, signature, recovery) {
  const n = curve.n
  const G = curve.G
  const r = signature.r
  const s = signature.s
  const isYOdd = (recovery & 1) === 1
  const isSecondKey = recovery >> 1
  const x = isSecondKey ? r.add(n) : r

  if (x.compareTo(curve.p) >= 0) return null

  let R
  try {
    R = curve.pointFromX(isYOdd, x)
  } catch {
    return null
  }

  if (!curve.isInfinity(R.multiply(n))) return null

  const e = BigInteger.fromBuffer(hash)
  const rInv = r.modInverse(n)
  const Q = R.multiply(s).add(G.multiply(e).negate()).multiply(rInv)
  if (curve.isInfinity(Q)) return null
  return Q
}

function sign (message, keyPair) {
  const hash = magicHash(message)
  const signature = keyPair.sign(hash)
  const publicKey = keyPair.getPublicKeyBuffer()

  for (let recovery = 0; recovery < 4; recovery++) {
    const point = recoverPublicKey(hash, signature, recovery)
    if (!point) continue
    if (!point.getEncoded(keyPair.compressed).equals(publicKey)) continue
    return signature.toCompact(recovery, keyPair.compressed)
  }

  throw new Error('Unable to sign message')
}

function verify (message, address, signature) {
  const signatureBuffer = Buffer.isBuffer(signature)
    ? signature
    : Buffer.from(signature, 'base64')
  const parsed = Bitcoin.ECSignature.parseCompact(signatureBuffer)
  const hash = magicHash(message)
  const point = recoverPublicKey(hash, parsed.signature, parsed.i)
  if (!point) return false

  const actual = Bitcoin.crypto.hash160(point.getEncoded(parsed.compressed))
  const expected = Bitcoin.address.fromBase58Check(address).hash
  return actual.equals(expected)
}

export default {
  sign,
  verify
}
