const randomBytes = require("randombytes")
const Bitcoin = require("bitcoincashjs-lib")

class Crypto {
  /**
   * @api Crypto.sha256() sha256() - Utility for creating sha256 hash.
   * @apiName sha256
   * @apiGroup Crypto
   * @apiDescription Utility for creating sha256 hash digests of data
   *
   * @apiExample Example usage:
   *   // buffer from hex
   *  let buffer = Buffer.from('0101010101010101', 'hex')
   *  bchjs.Crypto.sha256(buffer)
   *  // <Buffer c0 35 7a 32 ed 1f 6a 03 be 92 dd 09 44 76 f7 f1 a2 e2 14 ec>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
   *  bchjs.Crypto.sha256(buffer)
   *  // <Buffer 98 ee ed 79 8e e9 58 d1 65 3e df 2d 85 7d 4a ea ba 97 19 32>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
   *  bchjs.Crypto.sha256(buffer)
   *  // <Buffer 26 b0 78 0a 68 3a 1e 09 8e 9c b8 cf a1 b0 92 42 28 25 00 97>
   *
   * */
  // Translate address from any address format into a specific format.
  static sha256(buffer) {
    return Bitcoin.crypto.sha256(buffer)
  }
  /**
   * @api Crypto.ripemd160() ripemd160()-Utility for creating ripemd160 hash.
   * @apiName ripemd160
   * @apiGroup Crypto
   * @apiDescription Utility for creating ripemd160 hash digests of data
   *
   * @apiExample Example usage:
   *   // buffer from hex
   * let buffer = Buffer.from('0101010101010101', 'hex')
   * bchjs.Crypto.ripemd160(buffer)
   * // <Buffer 58 25 70 1b 4b 97 67 fd 35 06 3b 28 6d ca 35 82 85 3e 06 30>
   *
   * // buffer from hex
   * let buffer = Buffer.from('75618d82d1f6251f2ef1f42f5f0d5040330948a707ff6d69720dbdcb00b48aab', 'hex')
   * bchjs.Crypto.ripemd160(buffer)
   * // <Buffer 88 74 ef 88 8a 9b cb d8 3b 87 d0 6f f7 bc 21 3c 51 49 73 62>
   *
   * // buffer from hex
   * let buffer = Buffer.from('978c09dd46091d1922fa01e9f4a975b91a371f26ba8399de27d53801152121de', 'hex')
   * bchjs.Crypto.ripemd160(buffer)
   * // <Buffer 5f 95 6a 88 86 30 51 ea 52 15 d8 97 0c ed 8e 21 8e b6 15 cf>
   * */
  static ripemd160(buffer) {
    return Bitcoin.crypto.ripemd160(buffer)
  }
  /**
   * @api Crypto.hash256() hash256() - Utility for creating double sha256 hash.
   * @apiName hash256
   * @apiGroup Crypto
   * @apiDescription Utility for creating double sha256 hash digests of data.
   *
   * @apiExample Example usage:
   *   // buffer from hex
   *  let buffer = Buffer.from('0101010101010101', 'hex')
   *  bchjs.Crypto.hash256(buffer)
   *  // <Buffer 72 83 38 d9 9f 35 61 75 c4 94 5e f5 cc cf a6 1b 7b 56 14 3c bb f4 26 dd d0 e0 fc 7c fe 8c 3c 23>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
   *  bchjs.Crypto.hash256(buffer)
   *  // <Buffer 7a d2 a7 4b d5 96 98 71 4a 29 91 a8 2b 71 73 6f 35 42 b2 82 8b 6a c2 4d e4 27 c4 40 da 89 d0 1a>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
   *  bchjs.Crypto.hash256(buffer)
   *  // <Buffer 68 8f 1d 02 9e d5 4c 34 d0 32 0b 83 8b f6 fc 64 f6 2f 38 a6 e9 30 a0 af 5b db 4e 27 d1 a6 84 cd>
   * */
  static hash256(buffer) {
    return Bitcoin.crypto.hash256(buffer)
  }
  /**
   * @api Crypto.hash160() hash160() - Utility for creating ripemd160(sha256()) hash.
   * @apiName hash160
   * @apiGroup Crypto
   * @apiDescription Utility for creating ripemd160(sha256()) hash digests of data.
   *
   * @apiExample Example usage:
   *  // buffer from hex
   *  let buffer = Buffer.from('0101010101010101', 'hex')
   *  bchjs.Crypto.hash160(buffer)
   *  // <Buffer ab af 11 19 f8 3e 38 42 10 fe 8e 22 2e ac 76 e2 f0 da 39 dc>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
   *  bchjs.Crypto.hash160(buffer)
   *  // <Buffer 88 74 ef 88 8a 9b cb d8 3b 87 d0 6f f7 bc 21 3c 51 49 73 62>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
   *  bchjs.Crypto.hash160(buffer)
   *
   * */
  static hash160(buffer) {
    return Bitcoin.crypto.hash160(buffer)
  }
  /**
   * @api Crypto.randomBytes() randomBytes() - Generates cryptographically strong pseudo-random data.
   * @apiName randomBytes
   * @apiGroup Crypto
   * @apiDescription Generates cryptographically strong pseudo-random data. The size argument is a number indicating the number of bytes to generate.
   *
   * @apiExample Example usage:
   * bchjs.Crypto.randomBytes(16)
   * // <Buffer 0e 87 d2 7b c4 c3 d0 06 ef bb f3 a4 e5 ea 87 02>
   *
   * bchjs.Crypto.randomBytes(20)
   * // <Buffer 8b 42 7d ca 52 c0 77 69 a3 f2 32 90 6b a5 a8 50 56 e2 47 0f>
   *
   * bchjs.Crypto.randomBytes(24)
   * // <Buffer 28 69 fc 81 f7 a8 dd 5e 25 92 c4 7b 87 31 02 e8 b3 4c 92 fa c4 c9 1a e2>
   *
   * bchjs.Crypto.randomBytes(28)
   * // <Buffer 80 53 dd 21 b6 02 a9 c7 8f 1c 1d 64 1b 6e 21 3e 3f 01 e1 0f aa 6c 59 50 3a b3 41 a6>
   *
   * bchjs.Crypto.randomBytes(32)
   * // <Buffer ec 44 73 72 ea 48 3e 08 a5 0a 62 b8 40 0f 69 64 a7 75 35 af 20 3d e1 6d ce 3b f9 37 11 19 2b c6>
   * */
  static randomBytes(size = 16) {
    return randomBytes(size)
  }
}

module.exports = Crypto
