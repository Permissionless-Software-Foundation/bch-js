const Bitcoin = require("bitcoincashjs-lib")
const sb = require("satoshi-bitcoin")
const bitcoinMessage = require("bitcoinjs-message")
const bs58 = require("bs58")
const bip21 = require("bip21")
const coininfo = require("coininfo")
const bip38 = require("bip38")
const wif = require("wif")

const Buffer = require("safe-buffer").Buffer

class BitcoinCash {
  constructor(address) {
    this._address = address
  }

  /**
   * @api BitcoinCash.toSatoshi() toSatoshi() - Converting Bitcoin Cash units to satoshi units.
   * @apiName toSatoshi
   * @apiGroup BitcoinCash
   * @apiDescription
   * Converting Bitcoin Cash units to satoshi units.
   *
   * @apiExample Example usage:
   * // convert 9 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(9)
   * // 900000000
   *
   * // convert 1 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(1)
   * // 100000000
   *
   * // convert 100 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(100)
   * // 10000000000
   *
   * // convert 42 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(42)
   * // 4200000000
   *
   * // convert 507 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(507)
   * // 50700000000
   */
  // Translate coins to satoshi value
  toSatoshi(coins) {
    return sb.toSatoshi(coins)
  }

  /**
   * @api BitcoinCash.toBitcoinCash() toBitcoinCash() - Converting satoshi units to Bitcoin Cash units.
   * @apiName toBitcoinCash
   * @apiGroup BitcoinCash
   * @apiDescription
   * Converting satoshi units to Bitcoin Cash units.
   *
   * @apiExample Example usage:
   * // convert 900000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(900000000)
   * // 9
   *
   * // convert 100000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(100000000)
   * // 1
   *
   * // convert 10000000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(10000000000)
   * // 100
   *
   * // convert 4200000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(4200000000)
   * // 42
   *
   * // convert 50700000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(50700000000)
   * // 507
   */
  // Translate satoshi to coin value
  toBitcoinCash(satoshis) {
    return sb.toBitcoin(satoshis)
  }

  /**
   * @api BitcoinCash.toBits() toBits() - Converting satoshi units to Bits denomination.
   * @apiName toBits
   * @apiGroup BitcoinCash
   * @apiDescription
   * Converting satoshi units to Bits denomination.
   *
   * @apiExample Example usage:
   * // convert 4242323400 satoshis to 42423.234 bits
   * bchjs.BitcoinCash.toBits(4242323400)
   * // 42423.234
   * // convert 100000000 satoshis to 1000 bits
   * bchjs.BitcoinCash.toBits(100000000)
   * // 1000
   * // convert 314000000 satoshis to 3140 bits
   * bchjs.BitcoinCash.toBits(314000000)
   * // 3140
   * // convert 987600000000 satoshis to 9876000 bits
   * bchjs.BitcoinCash.toBits(987600000000)
   * // 9876000
   * // convert 12300 satoshis to 0.123 bits
   * bchjs.BitcoinCash.toBits(12300)
   * // 0.123
   */
  // Translate satoshi to bits denomination
  toBits(satoshis) {
    return parseFloat(satoshis) / 100
  }

  // Translate satoshi to bits denomination
  // TODO remove in 2.0
  satsToBits(satoshis) {
    return parseFloat(satoshis) / 100
  }

  // Translate bits to satoshi denomination
  // TODO remove in 2.0
  // fromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // // Translate bits to satoshi denomination
  // satsFromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // toInteger(number){
  //   return Math.round(  // round to nearest integer
  //     Number(number)    // type cast your input
  //   );
  // }

  /**
   * @api BitcoinCash.signMessageWithPrivKey() signMessageWithPrivKey() - Sign message with private key.
   * @apiName signMessageWithPrivKey
   * @apiGroup BitcoinCash
   * @apiDescription
   * Sign message with private key.
   *
   * @apiExample Example usage:
   * bchjs.BitcoinCash.signMessageWithPrivKey(
   * 'KxtpRDUJDiutLaTV8Vuavhb6h7zq9YV9ZKA3dU79PCgYmNVmkkvS',
   * 'EARTH'
   * )
   * // IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=
   */
  // sign message
  signMessageWithPrivKey(privateKeyWIF, message) {
    const network = privateKeyWIF.charAt(0) === "c" ? "testnet" : "mainnet"
    let bitcoincash
    if (network === "mainnet") bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    const keyPair = Bitcoin.ECPair.fromWIF(
      privateKeyWIF,
      bitcoincashBitcoinJSLib
    )
    const privateKey = keyPair.d.toBuffer(32)
    return bitcoinMessage
      .sign(message, privateKey, keyPair.compressed)
      .toString("base64")
  }

  /**
   * @api BitcoinCash.verifyMessage() verifyMessage() - Verify message.
   * @apiName verifyMessage
   * @apiGroup BitcoinCash
   * @apiDescription
   * Verify message.
   *
   * @apiExample Example usage:
   * bchjs.BitcoinCash.verifyMessage(
   * 'bitcoincash:qp2zvw3zpk5xx43w4tve7mtekd9kaxwj4uenq9eupv',
   * 'IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=',
   * 'EARTH'
   * )
   * // true
   */
  // verify message
  verifyMessage(address, signature, message) {
    return bitcoinMessage.verify(
      message,
      this._address.toLegacyAddress(address),
      signature
    )
  }

  /**
   * @api BitcoinCash.encodeBase58Check() encodeBase58Check() - Encodes hex string as base58Check.
   * @apiName encodeBase58Check
   * @apiGroup BitcoinCash
   * @apiDescription
   * Encodes hex string as base58Check.
   *
   * @apiExample Example usage:
   * // encode 0079bd35d306f648350818470c9f18903df6e06902a026f2a7 as base58check
   * let hex = '0079bd35d306f648350818470c9f18903df6e06902a026f2a7'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar
   *
   * // encode 006da742680accf2282df5fade8e9b7a01a517e779289b52cc as base58check
   * let hex = '006da742680accf2282df5fade8e9b7a01a517e779289b52cc'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK
   *
   * // encode 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672 as base58check
   * let hex = '00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs
   *
   * // encode 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5 as base58check
   * let hex = '00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6
   *
   * // encode 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b as base58check
   * let hex = '00db04c2e6f104997cb04c956bf25da6078e559d303127f08b'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg
   */
  // encode base58Check
  encodeBase58Check(hex) {
    return bs58.encode(Buffer.from(hex, "hex"))
  }

  /**
   * @api BitcoinCash.decodeBase58Check() decodeBase58Check() - Decodes base58Check encoded string to hex.
   * @apiName decodeBase58Check
   * @apiGroup BitcoinCash
   * @apiDescription
   * Decodes base58Check encoded string to hex.
   *
   * @apiExample Example usage:
   * // decode 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar to hex
   * let base58check = '1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 0079bd35d306f648350818470c9f18903df6e06902a026f2a7
   *
   * // decode 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK to hex
   * let base58check = '1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 006da742680accf2282df5fade8e9b7a01a517e779289b52cc
   *
   * // decode 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs to hex
   * let base58check = '1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672
   *
   * // decode 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6 to hex
   * let base58check = '1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5
   *
   * // decode 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg to hex
   * let base58check = '1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b
   */
  // decode base58Check
  decodeBase58Check(address) {
    return bs58.decode(address).toString("hex")
  }

  /**
   * @api BitcoinCash.encodeBIP21() encodeBIP21() - Encodes address and options as BIP21 uri.
   * @apiName encodeBIP21
   * @apiGroup BitcoinCash
   * @apiDescription
   * Encodes address and options as BIP21 uri.
   *
   * @apiExample Example usage:
   * let address = 'bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s'
   * let options = {
   * amount: 1,
   * label: '#BCHForEveryone',
   * }
   * bchjs.BitcoinCash.encodeBIP21(address, options)
   * // bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone
   *
   * let address = '1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar'
   * let options = {
   * amount: 12.5,
   * label: 'coinbase donation',
   * message: "and ya don't stop",
   * }
   * bchjs.BitcoinCash.encodeBIP21(address, options)
   * // bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop
   *
   * let address = 'qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03'
   * let options = {
   *  amount: 42,
   *  label: 'no prefix',
   * }
   * bchjs.BitcoinCash.encodeBIP21(address, options)
   * // bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix
   */
  // encode bip21 url
  encodeBIP21(address, options, regtest = false) {
    return bip21.encode(
      this._address.toCashAddress(address, true, regtest),
      options
    )
  }

  /**
   * @api BitcoinCash.decodeBIP21() decodeBIP21() - Decodes BIP21 uri.
   * @apiName decodeBIP21
   * @apiGroup BitcoinCash
   * @apiDescription
   * Decodes BIP21 uri.
   *
   * @apiExample Example usage:
   * let bip21 =
   * 'bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone'
   * bchjs.BitcoinCash.decodeBIP21(bip21)
   * // { address: 'qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s', options: { amount: 1, label: '#BCHForEveryone' } }
   *
   * let bip21 =
   * 'bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop'
   * bchjs.BitcoinCash.decodeBIP21(bip21)
   * // { address: 'qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny',
   * //   options:
   * //    { amount: 12.5,
   * //      label: 'coinbase donation',
   * //      message: 'and ya don\'t stop'
   * //    }
   * // }
   *
   * let bip21 =
   * 'bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix'
   * bchjs.BitcoinCash.decodeBIP21(bip21)
   * // { address: 'qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03', options: { amount: 42, label: 'no prefix' } }
   */
  // decode bip21 url
  decodeBIP21(url) {
    return bip21.decode(url)
  }

  /**
   * @api BitcoinCash.getByteCount() getByteCount() - Get byte count of transaction.
   * @apiName getByteCount
   * @apiGroup BitcoinCash
   * @apiDescription
   * Get byte count of transaction.
   *
   * @apiExample Example usage:
   * // 1 P2PKH input
   * let inputs = {
   * P2PKH: 1,
   * }
   * // 1 P2SH output
   * let outputs = {
   *  P2SH: 1,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 190
   *
   * // 4 MULTISIG-P2SH 2-of-4 and 10 P2PKH inputs
   * let inputs = {
   * 'MULTISIG-P2SH:2-4': 4,
   * P2PKH: 10,
   * }
   * // 23 P2PKH outputs
   * let outputs = {
   * P2PKH: 23,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 2750
   *
   * // 2 MULTISIG-P2SH 3-of-5 inputs
   * let inputs = {
   * 'MULTISIG-P2SH:3-5': 2,
   * }
   * // 2 P2PKH outputs
   * let outputs = {
   * P2PKH: 2,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 565
   *
   * // 111 P2PKH inputs
   * let inputs = {
   * P2PKH: 111,
   * }
   * // 2 P2PKH outputs
   * let outputs = {
   * P2PKH: 2,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 16506
   *
   * // 10 P2PKH and 1 MULTISIG-P2SH 1-of-2 input
   * let inputs = {
   * P2PKH: 10,
   * 'MULTISIG-P2SH:1-2': 1,
   * }
   * // 2 P2PKH and 1 P2SH outputs
   * let outputs = {
   * P2PKH: 2,
   * P2SH: 1,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 1780
   */
  getByteCount(inputs, outputs) {
    // from https://github.com/bitcoinjs/bitcoinjs-lib/issues/921#issuecomment-354394004
    let totalWeight = 0
    let hasWitness = false
    // assumes compressed pubkeys in all cases.
    const types = {
      inputs: {
        "MULTISIG-P2SH": 49 * 4,
        "MULTISIG-P2WSH": 6 + 41 * 4,
        "MULTISIG-P2SH-P2WSH": 6 + 76 * 4,
        P2PKH: 148 * 4,
        P2WPKH: 108 + 41 * 4,
        "P2SH-P2WPKH": 108 + 64 * 4
      },
      outputs: {
        P2SH: 32 * 4,
        P2PKH: 34 * 4,
        P2WPKH: 31 * 4,
        P2WSH: 43 * 4
      }
    }

    Object.keys(inputs).forEach(function(key) {
      if (key.slice(0, 8) === "MULTISIG") {
        // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
        const keyParts = key.split(":")
        if (keyParts.length !== 2) throw new Error(`invalid input: ${key}`)
        const newKey = keyParts[0]
        const mAndN = keyParts[1].split("-").map(function(item) {
          return parseInt(item)
        })

        totalWeight += types.inputs[newKey] * inputs[key]
        const multiplyer = newKey === "MULTISIG-P2SH" ? 4 : 1
        totalWeight += (73 * mAndN[0] + 34 * mAndN[1]) * multiplyer
      } else {
        totalWeight += types.inputs[key] * inputs[key]
      }
      if (key.indexOf("W") >= 0) hasWitness = true
    })

    Object.keys(outputs).forEach(function(key) {
      totalWeight += types.outputs[key] * outputs[key]
    })

    if (hasWitness) totalWeight += 2

    totalWeight += 10 * 4

    return Math.ceil(totalWeight / 4)
  }

  /**
   * @api BitcoinCash.encryptBIP38() encryptBIP38() - BIP38 encrypt privkey WIFs.
   * @apiName encryptBIP38
   * @apiGroup BitcoinCash
   * @apiDescription
   * BIP38 encrypt privkey WIFs.
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.BitcoinCash.encryptBIP38(
   *  'L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu',
   * '9GKVkabAHBMyAf'
   * )
   * // 6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G
   *
   * // testnet
   * bchjs.BitcoinCash.encryptBIP38(
   *  'cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm',
   * '1EBPIyj55eR8bVUov9'
   * )
   * // 6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735
   */
  encryptBIP38(privKeyWIF, passphrase) {
    const decoded = wif.decode(privKeyWIF)

    return bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase)
  }

  /**
   * @api BitcoinCash.decryptBIP38() decryptBIP38() - BIP38 encrypt privkey WIFs.
   * @apiName decryptBIP38
   * @apiGroup BitcoinCash
   * @apiDescription
   * BIP38 encrypt privkey WIFs.
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.BitcoinCash.decryptBIP38(
   * '6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G',
   * '9GKVkabAHBMyAf',
   * 'mainnet'
   * )
   * // L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu
   *
   * // testnet
   * bchjs.BitcoinCash.decryptBIP38(
   * '6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735',
   * '1EBPIyj55eR8bVUov9',
   * 'testnet'
   * )
   * // cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm
   */
  decryptBIP38(encryptedKey, passphrase, network = "mainnet") {
    const decryptedKey = bip38.decrypt(encryptedKey, passphrase)
    let prefix
    if (network === "testnet") prefix = 0xef
    else prefix = 0x80

    return wif.encode(prefix, decryptedKey.privateKey, decryptedKey.compressed)
  }
}

module.exports = BitcoinCash
