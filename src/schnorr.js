const schnorr = require('bip-schnorr')

class Schnorr {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }
  }

  /**
   * @api Schnorr.sign() sign()
   * @apiName sign
   * @apiGroup Schnorr
   * @apiDescription
   * Sign a 32-byte message with the private key, returning a 64-byte signature.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const BigInteger = require("bigi")
   *
   * // signing
   * const privateKey = BigInteger.fromHex(
   * "B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF"
   * )
   * const message = Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * )
   * const createdSignature = bchjs.Schnorr.sign(privateKey, message)
   * console.log("The signature is: " + createdSignature.toString("hex"))
   * // The signature is: 2a298dacae57395a15d0795ddbfd1dcb564da82b0f269bc70a74f8220429ba1d1e51a22ccec35599b8f266912281f8365ffc2d035a230434a1a64dc59f7013fd
   */
  sign (privateKey, message) {
    return schnorr.sign(privateKey, message)
  }

  /**
   * @api Schnorr.verify() verify()
   * @apiName verify
   * @apiGroup Schnorr
   * @apiDescription
   * Verify a 64-byte signature of a 32-byte message against the public key. Throws an Error if verification fails.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const publicKey = Buffer.from(
   * "02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
   * "hex"
   * )
   * const message = Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * )
   * const signatureToVerify = Buffer.from(
   * "2A298DACAE57395A15D0795DDBFD1DCB564DA82B0F269BC70A74F8220429BA1D1E51A22CCEC35599B8F266912281F8365FFC2D035A230434A1A64DC59F7013FD",
   * "hex"
   * )
   * try {
   * bchjs.Schnorr.verify(publicKey, message, signatureToVerify)
   * console.log("The signature is valid.")
   * } catch (e) {
   * console.error("The signature verification failed: " + e)
   * }
   */
  verify (publicKey, message, signatureToVerify) {
    return schnorr.verify(publicKey, message, signatureToVerify)
  }

  /**
   * @api Schnorr.batchVerify() batchVerify()
   * @apiName batchVerify
   * @apiGroup Schnorr
   * @apiDescription
   * Verify a list of 64-byte signatures as a batch operation. Throws an Error if verification fails.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const publicKeys = [
   * Buffer.from(
   * "02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
   * "hex"
   * ),
   * Buffer.from(
   * "03FAC2114C2FBB091527EB7C64ECB11F8021CB45E8E7809D3C0938E4B8C0E5F84B",
   * "hex"
   * ),
   * Buffer.from(
   * "026D7F1D87AB3BBC8BC01F95D9AECE1E659D6E33C880F8EFA65FACF83E698BBBF7",
   * "hex"
   * )
   * ]
   * const messages = [
   * Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * ),
   * Buffer.from(
   * "5E2D58D8B3BCDF1ABADEC7829054F90DDA9805AAB56C77333024B9D0A508B75C",
   * "hex"
   * ),
   * Buffer.from(
   * "B2F0CD8ECB23C1710903F872C31B0FD37E15224AF457722A87C5E0C7F50FFFB3",
   * "hex"
   * )
   * ]
   * const signatures = [
   * Buffer.from(
   * "2A298DACAE57395A15D0795DDBFD1DCB564DA82B0F269BC70A74F8220429BA1D1E51A22CCEC35599B8F266912281F8365FFC2D035A230434A1A64DC59F7013FD",
   * "hex"
   * ),
   * Buffer.from(
   * "00DA9B08172A9B6F0466A2DEFD817F2D7AB437E0D253CB5395A963866B3574BE00880371D01766935B92D2AB4CD5C8A2A5837EC57FED7660773A05F0DE142380",
   * "hex"
   * ),
   * Buffer.from(
   * "68CA1CC46F291A385E7C255562068357F964532300BEADFFB72DD93668C0C1CAC8D26132EB3200B86D66DE9C661A464C6B2293BB9A9F5B966E53CA736C7E504F",
   * "hex"
   * )
   * ]
   * try {
   * bchjs.Schnorr.batchVerify(publicKeys, messages, signatures)
   * console.log("The signatures are valid.")
   * } catch (e) {
   * console.error("The signature verification failed: " + e)
   * }
   */
  batchVerify (publicKeys, messages, signaturesToVerify) {
    return schnorr.batchVerify(publicKeys, messages, signaturesToVerify)
  }

  /**
   * @api Schnorr.nonInteractive() nonInteractive()
   * @apiName nonInteractive
   * @apiGroup Schnorr
   * @apiDescription
   * Aggregates multiple signatures of different private keys over the same message into a single 64-byte signature using a scheme that is safe from rogue-key attacks.
   *
   * This non-interactive scheme requires the knowledge of all private keys that are participating in the multi-signature creation.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const BigInteger = require("bigi")
   *
   * const privateKey1 = BigInteger.fromHex(
   * "B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF"
   * )
   * const privateKey2 = BigInteger.fromHex(
   * "C90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B14E5C7"
   * )
   * const message = Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * )
   * const aggregatedSignature = bchjs.Schnorr.nonInteractive(
   * [privateKey1, privateKey2],
   * message
   * )
   *
   * // verifying an aggregated signature
   * const publicKey1 = Buffer.from(
   * "02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
   * "hex"
   * )
   * const publicKey2 = Buffer.from(
   * "03FAC2114C2FBB091527EB7C64ECB11F8021CB45E8E7809D3C0938E4B8C0E5F84B",
   * "hex"
   * )
   * const X = bchjs.Schnorr.publicKeyCombine([publicKey1, publicKey2])
   * try {
   * bchjs.Schnorr.verify(X, message, aggregatedSignature)
   * console.log("The signature is valid.")
   * } catch (e) {
   * console.error("The signature verification failed: " + e)
   * }
   */
  nonInteractive (privateKeys, message) {
    return schnorr.muSig.nonInteractive(privateKeys, message)
  }

  /**
   * @api Schnorr.computeEll() computeEll()
   * @apiName computeEll
   * @apiGroup Schnorr
   * @apiDescription
   * Generate ell which is the hash over all public keys participating in a session.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const BigInteger = require("bigi")
   *
   * const publicData = {
   * pubKeys: [
   * Buffer.from(
   *   "03846f34fdb2345f4bf932cb4b7d278fb3af24f44224fb52ae551781c3a3cad68a",
   *   "hex"
   * ),
   * Buffer.from(
   *   "02cd836b1d42c51d80cef695a14502c21d2c3c644bc82f6a7052eb29247cf61f4f",
   *   "hex"
   * ),
   * Buffer.from(
   *   "03b8c1765111002f09ba35c468fab273798a9058d1f8a4e276f45a1f1481dd0bdb",
   *   "hex"
   * )
   * ],
   * message: bchjs.Schnorr.hash(Buffer.from("muSig is awesome!", "utf8")),
   * pubKeyHash: null,
   * pubKeyCombined: null,
   * commitments: [],
   * nonces: [],
   * nonceCombined: null,
   * partialSignatures: [],
   * signature: null
   * }
   *
   * // data only known by the individual party, these values are never shared
   * // between the signers!
   * const signerPrivateData = [
   * // signer 1
   * {
   * privateKey: BigInteger.fromHex(
   *   "add2b25e2d356bec3770305391cbc80cab3a40057ad836bcb49ef3eed74a3fee"
   * ),
   * session: null
   * },
   * // signer 2
   * {
   * privateKey: BigInteger.fromHex(
   *   "0a1645eef5a10e1f5011269abba9fd85c4f0cc70820d6f102fb7137f2988ad78"
   * ),
   * session: null
   * },
   * // signer 3
   * {
   * privateKey: BigInteger.fromHex(
   *   "2031e7fed15c770519707bb092a6337215530e921ccea42030c15d86e8eaf0b8"
   * ),
   * session: null
   * }
   * ]
   *
   * // -----------------------------------------------------------------------
   * // Step 1: Combine the public keys
   * // The public keys P_i are combined into the combined public key P.
   * // This can be done by every signer individually or by the initializing
   * // party and then be distributed to every participant.
   * // -----------------------------------------------------------------------
   * publicData.pubKeyHash = bchjs.Schnorr.computeEll(publicData.pubKeys)
   */
  computeEll (publicKeys) {
    return schnorr.muSig.computeEll(publicKeys)
  }

  /**
   * @api Schnorr.publicKeyCombine() publicKeyCombine()
   * @apiName publicKeyCombine
   * @apiGroup Schnorr
   * @apiDescription
   * Creates the special rogue-key-resistant combined public key P by applying the MuSig coefficient to each public key P_i before adding them together.
   *
   * @apiExample Example usage:
   * // continued from above
   * publicData.pubKeyCombined = bchjs.Schnorr.publicKeyCombine(
   * publicData.pubKeys,
   * publicData.pubKeyHash
   * )
   */
  publicKeyCombine (publicKeys, publicKeyHash) {
    return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash)
  }

  /**
   * @api Schnorr.sessionInitialize() sessionInitialize()
   * @apiName sessionInitialize
   * @apiGroup Schnorr
   * @apiDescription
   * Creates a signing session. Each participant must create a session and must not share the content of the session apart from the commitment and later the nonce.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 2: Create the private signing session
   * // Each signing party does this in private. The session ID *must* be
   * // unique for every call to sessionInitialize, otherwise it's trivial for
   * // an attacker to extract the secret key!
   * // -----------------------------------------------------------------------
   * signerPrivateData.forEach((data, idx) => {
   * const sessionId = bchjs.Crypto.randomBytes(32) // must never be reused between sessions!
   * data.session = bchjs.Schnorr.sessionInitialize(
   * sessionId,
   * data.privateKey,
   * publicData.message,
   * publicData.pubKeyCombined,
   * publicData.pubKeyHash,
   * idx
   * )
   * })
   * const signerSession = signerPrivateData[0].session
   */
  sessionInitialize (sessionId, privateKey, message, pubKeyCombined, ell, idx) {
    return schnorr.muSig.sessionInitialize(
      sessionId,
      privateKey,
      message,
      pubKeyCombined,
      ell,
      idx
    )
  }

  /**
   * @api Schnorr.sessionNonceCombine() sessionNonceCombine()
   * @apiName sessionNonceCombine
   * @apiGroup Schnorr
   * @apiDescription
   * Combines multiple nonces R_i into the combined nonce R.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 3: Exchange commitments (communication round 1)
   * // The signers now exchange the commitments H(R_i). This is simulated here
   * // by copying the values from the private data to public data array.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * publicData.commitments[i] = signerPrivateData[i].session.commitment
   * }
   *
   * // -----------------------------------------------------------------------
   * // Step 4: Get nonces (communication round 2)
   * // Now that everybody has commited to the session, the nonces (R_i) can be
   * // exchanged. Again, this is simulated by copying.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * publicData.nonces[i] = signerPrivateData[i].session.nonce
   * }
   *
   * // -----------------------------------------------------------------------
   * // Step 5: Combine nonces
   * // The nonces can now be combined into R. Each participant should do this
   * // and keep track of whether the nonce was negated or not. This is needed
   * // for the later steps.
   * // -----------------------------------------------------------------------
   * publicData.nonceCombined = bchjs.Schnorr.sessionNonceCombine(
   * signerSession,
   * publicData.nonces
   * )
   * signerPrivateData.forEach(
   * data => (data.session.nonceIsNegated = signerSession.nonceIsNegated)
   * )
   */
  sessionNonceCombine (session, nonces) {
    return schnorr.muSig.sessionNonceCombine(session, nonces)
  }

  /**
   * @api Schnorr.partialSign() partialSign()
   * @apiName partialSign
   * @apiGroup Schnorr
   * @apiDescription
   * Creates a partial signature s_i for a participant.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 6: Generate partial signatures
   * // Every participant can now create their partial signature s_i over the
   * // given message.
   * // -----------------------------------------------------------------------
   * signerPrivateData.forEach(data => {
   * data.session.partialSignature = bchjs.Schnorr.partialSign(
   * data.session,
   * publicData.message,
   * publicData.nonceCombined,
   * publicData.pubKeyCombined
   * )
   * })
   */
  partialSign (session, message, nonceCombined, pubKeyCombined) {
    return schnorr.muSig.partialSign(
      session,
      message,
      nonceCombined,
      pubKeyCombined
    )
  }

  /**
   * @api Schnorr.partialSignatureVerify() partialSignatureVerify()
   * @apiName partialSignatureVerify
   * @apiGroup Schnorr
   * @apiDescription
   * Verifies a partial signature s_i against the participant's public key P_i. Throws an Error if verification fails.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 7: Exchange partial signatures (communication round 3)
   * // The partial signature of each signer is exchanged with the other
   * // participants. Simulated here by copying.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * publicData.partialSignatures[i] =
   * signerPrivateData[i].session.partialSignature
   * }
   *
   * // -----------------------------------------------------------------------
   * // Step 8: Verify individual partial signatures
   * // Every participant should verify the partial signatures received by the
   * // other participants.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * bchjs.Schnorr.partialSignatureVerify(
   * signerSession,
   * publicData.partialSignatures[i],
   * publicData.nonceCombined,
   * i,
   * publicData.pubKeys[i],
   * publicData.nonces[i]
   * )
   * }
   */
  partialSignatureVerify (
    session,
    partialSignature,
    nonceCombined,
    idx,
    pubKey,
    nonce
  ) {
    return schnorr.muSig.partialSigVerify(
      session,
      partialSignature,
      nonceCombined,
      idx,
      pubKey,
      nonce
    )
  }

  /**
   * @api Schnorr.partialSignaturesCombine() partialSignaturesCombine()
   * @apiName partialSignaturesCombine
   * @apiGroup Schnorr
   * @apiDescription
   * Combines multiple partial signatures into a Schnorr signature (s, R) that can be verified against the combined public key P.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 9: Combine partial signatures
   * // Finally, the partial signatures can be combined into the full signature
   * // (s, R) that can be verified against combined public key P.
   * // -----------------------------------------------------------------------
   * publicData.signature = bchjs.Schnorr.partialSignaturesCombine(
   * publicData.nonceCombined,
   * publicData.partialSignatures
   * )
   *
   * // -----------------------------------------------------------------------
   * // Step 10: Verify signature
   * // The resulting signature can now be verified as a normal Schnorr
   * // signature (s, R) over the message m and public key P.
   * // -----------------------------------------------------------------------
   * bchjs.Schnorr.verify(
   * publicData.pubKeyCombined,
   * publicData.message,
   * publicData.signature
   * )
   */
  partialSignaturesCombine (nonceCombined, partialSignatures) {
    return schnorr.muSig.partialSigCombine(nonceCombined, partialSignatures)
  }

  bufferToInt (buffer) {
    return schnorr.convert.bufferToInt(buffer)
  }

  intToBuffer (bigInteger) {
    return schnorr.convert.intToBuffer(bigInteger)
  }

  hash (buffer) {
    return schnorr.convert.hash(buffer)
  }

  pointToBuffer (point) {
    return schnorr.convert.pointToBuffer(point)
  }

  pubKeyToPoint (publicKey) {
    return schnorr.convert.pubKeyToPoint(publicKey)
  }
}

module.exports = Schnorr
