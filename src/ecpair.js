const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")

class ECPair {
  static setAddress(address) {
    ECPair._address = address
  }
  /**
   * @api Ecpair.fromWIF() fromWIF() - Generates an ECPair from a private key in wallet import format (WIF).
   * @apiName fromWIF
   * @apiGroup ECPair
   * @apiDescription Generates an ECPair from a private key in wallet import format (WIF). Follow these steps to go from a private key to a WIF. This method only works with a compressed private key.
   *
   * @apiExample Example usage:
   *  // mainnet WIF
   *  let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
   *  bchjs.ECPair.fromWIF(wif);
   *
   *  // testnet WIF
   *  let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW'
   *  bchjs.ECPair.fromWIF(wif)
   * */
  static fromWIF(privateKeyWIF) {
    let network
    if (privateKeyWIF[0] === "L" || privateKeyWIF[0] === "K")
      network = "mainnet"
    else if (privateKeyWIF[0] === "c") network = "testnet"

    let bitcoincash
    if (network === "mainnet") bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()

    return Bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoincashBitcoinJSLib)
  }
  /**
   * @api Ecpair.toWIF() toWIF() - Gets a private key in wallet import format from an ECPair.
   * @apiName toWIF
   * @apiGroup ECPair
   * @apiDescription Gets a private key in wallet import format from an ECPair.
   *
   * @apiExample Example usage:
   *  // mainnet wif
   *  let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // wif from ecpair
   *  bchjs.ECPair.toWIF(ecpair);
   *  // L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1
   *
   *  // testnet wif
   *  let wif = 'cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // wif from ecpair
   *  bchjs.ECPair.toWIF(ecpair);
   *  // cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA
   * */
  static toWIF(ecpair) {
    return ecpair.toWIF()
  }

  static sign(ecpair, buffer) {
    return ecpair.sign(buffer)
  }

  static verify(ecpair, buffer, signature) {
    return ecpair.verify(buffer, signature)
  }
  /**
   * @api Ecpair.fromPublicKey() fromPublicKey() - Generates an ECPair from a public key buffer.
   * @apiName fromPublicKey
   * @apiGroup ECPair
   * @apiDescription Generates an ECPair from a public key buffer.
   *
   * @apiExample Example usage:
   *  // create ECPair from mainnet pubkeyBuffer
   *  let pubkeyBuffer = Buffer.from("02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb", 'hex');
   *  bchjs.ECPair.fromPublicKey(pubkeyBuffer);
   *
   *  // create ECPair from testnet pubkeyBuffer
   *  let pubkeyBuffer = Buffer.from("024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6", 'hex');
   *  bchjs.ECPair.fromPublicKey(pubkeyBuffer);
   * */
  static fromPublicKey(pubkeyBuffer) {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer)
  }
  /**
   * @api Ecpair.toPublicKey() toPublicKey() - Get the public key of an ECPair as a buffer.
   * @apiName toPublicKey
   * @apiGroup ECPair
   * @apiDescription Get the public key of an ECPair as a buffer.
   *
   * @apiExample Example usage:
   *  // create ecpair from mainnet public key buffer
   *  let ecpair = bchjs.ECPair.fromPublicKey(Buffer.from('02d305772e0873fba6c1c7ff353ce374233316eb5820acd7ff3d7d9b82d514126b', 'hex'));
   *  // create public key buffer
   *  bchjs.ECPair.toPublicKey(ecpair);
   *  //
   *
   *  // create ecpair from testnet public key buffer
   *  let ecpair = bchjs.ECPair.fromPublicKey(Buffer.from('024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6', 'hex'));
   *  // create public key buffer
   *  bchjs.ECPair.toPublicKey(ecpair);
   *  //
   * */
  static toPublicKey(ecpair) {
    return ecpair.getPublicKeyBuffer()
  }
  /**
   * @api Ecpair.toLegacyAddress() toLegacyAddress() - Get legacy address of ECPair.
   * @apiName toLegacyAddress
   * @apiGroup ECPair
   * @apiDescription Get legacy address of ECPair.
   *
   * @apiExample Example usage:
   *  // mainnet wif
   *  let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toLegacyAddress(ecpair);
   *  // 1DgxdA5bbMcCNWg3yB2MgKqFazV92BXgxK
   *
   *  // testnet wif
   *  let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toLegacyAddress(ecpair);
   *  // mg4PygFcXoyNJGJkM2Dcpe25av9wXzz1My
   * */
  static toLegacyAddress(ecpair) {
    return ecpair.getAddress()
  }
  /**
   * @api Ecpair.toCashAddress() toCashAddress() - Get cash address of ECPair.
   * @apiName toCashAddress
   * @apiGroup ECPair
   * @apiDescription Get cash address of ECPair.
   *
   * @apiExample Example usage:
   *  // mainnet wif
   *  let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toCashAddress(ecpair);
   *  // bitcoincash:qz9nq206kteyv2t7trhdr4vzzkej60kqtytn7sxkxm
   *
   *  // testnet wif
   *  let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toCashAddress(ecpair);
   *  // bchtest:qqzly4vrcxcjw62u4yq4nv86ltk2mc9v0yvq8mvj6m
   * */
  static toCashAddress(ecpair, regtest = false) {
    return ECPair._address.toCashAddress(ecpair.getAddress(), true, regtest)
  }
}

module.exports = ECPair
