const Bitcoin = require('@psf/bitcoincashjs-lib')
const coininfo = require('@psf/coininfo')
const bip32utils = require('@psf/bip32-utils')
const bchaddrjs = require('bchaddrjs-slp')

class HDNode {
  constructor (address) {
    this._address = address
  }

  /**
   * @api HDNode.fromSeed() fromSeed()
   * @apiName fromSeed
   * @apiGroup HDNode
   * @apiDescription
   * HDNode stands for Hierarchically Deterministic node which can be used to create a HD wallet.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   bchjs.HDNode.fromSeed(seedBuffer);
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   bchjs.HDNode.fromSeed(seedBuffer);
   */
  fromSeed (rootSeedBuffer, network = 'mainnet') {
    let bitcoincash
    if (network === 'bitcoincash' || network === 'mainnet') { bitcoincash = coininfo.bitcoincash.main } else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromSeedBuffer(
      rootSeedBuffer,
      bitcoincashBitcoinJSLib
    )
  }

  /**
   * @api HDNode.toLegacyAddress() toLegacyAddress()
   * @apiName toLegacyAddress
   * @apiGroup HDNode
   * @apiDescription
   * Get legacy address of HDNode
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to legacy address
   *   bchjs.HDNode.toLegacyAddress(hdNode);
   *   // 14apxtw2LDQmXWsS5k4JEhG93Jzjswhvma
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to cash address
   *   bchjs.HDNode.toLegacyAddress(hdNode);
   *   // 14mVsq3H5Ep2Jb6AqoKsmY1BFHKCBGPDLi
   */
  toLegacyAddress (hdNode) {
    return hdNode.getAddress()
  }

  /**
   * @api HDNode.toCashAddress() toCashAddress()
   * @apiName toCashAddress
   * @apiGroup HDNode
   * @apiDescription
   * Get cash address of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to cash address
   *   bchjs.HDNode.toCashAddress(hdNode);
   *   // bitcoincash:qqrz6kqw6nvhwgwrt4g7fggepvewtkr7nukkeqf4rw
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to cash address
   *   bchjs.HDNode.toCashAddress(hdNode);
   *   // bitcoincash:qq549jxsjv66kw0smdju4es2axnk7hhe9cquhjg4gt
   */
  toCashAddress (hdNode, regtest = false) {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  /**
   * @api SLP.HDNode.toSLPAddress() toSLPAddress()
   * @apiName toSLPAddress
   * @apiGroup HDNode
   * @apiDescription Get slp address of HDNode.
   *
   * @apiExample Example usage:
   * // create mnemonic
   * let mnemonic = bchjs.Mnemonic.generate(128);
   * // create seed buffer from mnemonic
   * let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   * // create HDNode from seed buffer
   * let hdNode = bchjs.SLP.HDNode.fromSeed(seedBuffer);
   * // to cash address
   * bchjs.SLP.HDNode.toSLPAddress(hdNode);
   * // simpleledger:qpst7ganm0ucmj3yl7jxvdqrm7tg3zhveg89xjh25d
   *
   * // generate entropy
   * let entropy = bchjs.Crypto.randomBytes(32);
   * // create mnemonic from entropy
   * let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   * // create seed buffer from mnemonic
   * let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   * // create HDNode from seed buffer
   * let hdNode = bchjs.SLP.HDNode.fromSeed(seedBuffer);
   * // to cash address
   * bchjs.SLP.HDNode.toSLPAddress(hdNode);
   * // simpleledger:qqxh2z2z397m4c6u9s5x6wjtku742q8rpvm6al2nrf
   */
  toSLPAddress (hdNode) {
    const cashAddr = this.toCashAddress(hdNode)
    return bchaddrjs.toSlpAddress(cashAddr)
  }

  /**
   * @api HDNode.toWIF() toWIF()
   * @apiName toWIF
   * @apiGroup HDNode
   * @apiDescription
   * Get private key in wallet import format (WIF) of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to WIF
   *   bchjs.HDNode.toWIF(hdNode);
   *   // L5E8QjFnLukp8BuF4uu9gmvvSrbafioURGdBve5tA3Eq5ptzbMCJ
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to WIF
   *   bchjs.HDNode.toWIF(hdNode);
   *   // KwobPFhv3AuXc3ps6YtWfMVRpLBDBA7jnJddurfELTyTNcFhZYpJ
   */
  toWIF (hdNode) {
    return hdNode.keyPair.toWIF()
  }

  /**
   * @api HDNode.toXPub() toXPub()
   * @apiName toXPub
   * @apiGroup HDNode
   * @apiDescription
   * Get extended public key of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended public key
   *   bchjs.HDNode.toXPub(hdNode);
   *   // xpub661MyMwAqRbcG4CnhNYoK1r1TKLwQQ1UdC3LHoWFK61rsnzh7Hx35qQ9Z53ucYcE5WvA7GEDXhqqKjSY2e6Y8n7WNVLYHpXCuuX945VPuYn
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended public key
   *   bchjs.HDNode.toXPub(hdNode);
   *   // xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ
   */
  toXPub (hdNode) {
    return hdNode.neutered().toBase58()
  }

  /**
   * @api HDNode.toXPriv() toXPriv()
   * @apiName toXPriv
   * @apiGroup HDNode
   * @apiDescription
   * Get extended private key of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended private key
   *   bchjs.HDNode.toXPriv(hdNode);
   *   // xprv9s21ZrQH143K2eMCcbT4qwwRhw6qZaPaEDWB792bnrxQZPoP2JUk4kfEx9eeV1uGTAWAfCqYr4wDWo52qALiukizKwQzvEyNR1fWZJi97Kv
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended private key
   *   bchjs.HDNode.toXPriv(hdNode);
   *   // xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v
   */
  toXPriv (hdNode) {
    return hdNode.toBase58()
  }

  /**
   * @api HDNode.toKeyPair() toKeyPair()
   * @apiName toKeyPair
   * @apiGroup HDNode
   * @apiDescription
   * Get the ECPair of an HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create root seed buffer from mnemonic
   *   let rootSeed= await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from root seed
   *   let hdNode = bchjs.HDNode.fromSeed(rootSeed);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toKeyPair(hdNode);
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toKeyPair(hdNode);
   */
  toKeyPair (hdNode) {
    return hdNode.keyPair
  }

  /**
   * @api HDNode.toPublicKey() toPublicKey()
   * @apiName toPublicKey
   * @apiGroup HDNode
   * @apiDescription
   * Get the public key of an HDNode as a buffer.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create root seed buffer from mnemonic
   *   let rootSeed= await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from root seed
   *   let hdNode = bchjs.HDNode.fromSeed(rootSeed);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toPublicKey(hdNode);
   *   // <Buffer 03 86 d6 d3 db ec 1a 93 8c 2c a2 63 c9 79 8f eb e9 16 09 c5 a2 9b 07 65 c4 79 1f d9 0f fa 4d 27 20>
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toPublicKey(hdNode);
   *   // <Buffer 02 d2 26 74 6e 78 03 ac 11 e0 96 c6 24 de e8 dd 62 52 e7 8e 51 56 8a c1 18 62 aa 2a 72 50 1d ea 7d>
   */
  toPublicKey (hdNode) {
    return hdNode.getPublicKeyBuffer()
  }

  /**
   * @api HDNode.fromXPriv() fromXPriv()
   * @apiName fromXPriv
   * @apiGroup HDNode
   * @apiDescription
   * Generate HDNode from extended private key.
   *
   * @apiExample Example usage:
   *   // mainnet xpriv
   *   bchjs.HDNode.fromXPriv('xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v');
   *
   *   // testnet xpriv
   *   bchjs.HDNode.fromXPriv('tprv8gQ3zr1F5pRHMebqqhorrorYNvUG3XkcZjSWVs2cEtRwwJy1TRhgRx4XcF8dYHM2eyTbTCcdKYNhqgyBQphxwRoVyVKr9zuyoA8WxNDRvom');
   */
  fromXPriv (xpriv) {
    let bitcoincash
    if (xpriv[0] === 'x') bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === 't') bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  /**
   * @api HDNode.fromXPub() fromXPub()
   * @apiName fromXPub
   * @apiGroup HDNode
   * @apiDescription
   * Generate HDNode from extended public key.
   *
   * @apiExample Example usage:
   *   // mainnet xpub
   *   bchjs.HDNode.fromXPub('xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ');
   *
   *   // testnet xpub
   *   bchjs.HDNode.fromXPub('tpubDD669G3VEC6xF7ddjMUTGDWewwzCCrwX933HnP4ufAELmoDn5pXGcSgPnLodjFvWQwRXkG94f77BatEDA8dfQ99yy97kRYynUpNLENEqTBo');
   */
  fromXPub (xpub) {
    let bitcoincash
    if (xpub[0] === 'x') bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === 't') bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  /**
   * @api HDNode.derivePath() derivePath()
   * @apiName derivePath
   * @apiGroup HDNode
   * @apiDescription
   * Derive child HDNode from path
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // derive hardened child HDNode
   *   bchjs.HDNode.derivePath(hdNode, "m/44'/145'/0'");
   */
  derivePath (hdnode, path) {
    return hdnode.derivePath(path)
  }

  /**
   * @api HDNode.derive() derive()
   * @apiName derive
   * @apiGroup HDNode
   * @apiDescription
   * Derive non hardened child HDNode
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // derive unhardened child HDNode
   *   bchjs.HDNode.derive(hdNode, 0);
   */
  derive (hdnode, path) {
    return hdnode.derive(path)
  }

  /**
   * @api HDNode.deriveHardened() deriveHardened()
   * @apiName deriveHardened
   * @apiGroup HDNode
   * @apiDescription
   * Derive hardened child HDNode
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // derive hardened child HDNode
   *   bchjs.HDNode.deriveHardened(hdNode, 0);
   */
  deriveHardened (hdnode, path) {
    return hdnode.deriveHardened(path)
  }

  /**
   * @api HDNode.sign() sign()
   * @apiName sign
   * @apiGroup HDNode
   * @apiDescription
   * Sign 32 byte hash encoded as a buffer.
   *
   * @apiExample Example usage:
   *   // mainnet xpriv
   *   let xpriv = 'xprv9z2uWrGjbYPxc728rvtMi4jt4SudRiSfYn6Tdif5XN17pJ1NTbHoHK6JePkPLY1NHXLaQcA6sWudpZDm7DwKhbsGQieAp9wx46Wbio4iXg9';
   *   // hdnode from xpriv
   *   let hdnode = bchjs.HDNode.fromXPriv(xpriv);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   bchjs.HDNode.sign(hdnode, buf);
   *
   *   // testnet xpriv
   *   let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   // hdnode from xpriv
   *   let hdnode = bchjs.HDNode.fromXPriv(xpriv);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   bchjs.HDNode.sign(hdnode, buf);
   */
  sign (hdnode, buffer) {
    return hdnode.sign(buffer)
  }

  /**
   * @api HDNode.verify() verify()
   * @apiName verify
   * @apiGroup HDNode
   * @apiDescription
   * Verify signed 32 byte hash encoded as a buffer.
   *
   * @apiExample Example usage:
   *   // mainnet xprivs
   *   let xpriv1 = 'xprv9ys4cvcoU8RoqvzxGj886r4Ey3w1WfVNYH8sMnVPVzyQtaPPM6Q8pHm3D9WPWvEupGEgcJ1xLaGaZDcvKfoAurE2AzHRRRup5FuHzDr8n15';
   *   let xpriv2 = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
   *   // hdnodes from xprivs
   *   let hdnode1 = bchjs.HDNode.fromXPriv(xpriv1);
   *   let hdnode2 = bchjs.HDNode.fromXPriv(xpriv2);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   let signature = bchjs.HDNode.sign(hdnode1, buf);
   *   // verify
   *   bchjs.HDNode.verify(hdnode1, buf, signature);
   *   // true
   *   bchjs.HDNode.verify(hdnode2, buf, signature);
   *   // false
   *
   *   // testnet xprivs
   *   let xpriv1 = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   let xpriv2 = 'tprv8ggxJ8SG5EdqiM6Dn63QwHScQ7HS5hXqUMxSD1NEbDyPw6VtoUMFZBAohpTMsPz9cYbpHELmA4Zm79NKRvEvFdhWRX2bSmu7V7PiNb364nv';
   *   // hdnodes from xprivs
   *   let hdnode1 = bchjs.HDNode.fromXPriv(xpriv1);
   *   let hdnode2 = bchjs.HDNode.fromXPriv(xpriv2);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   let signature = bchjs.ECPair.sign(hdnode1, buf);
   *   // verify
   *   bchjs.HDNode.verify(hdnode1, buf, signature);
   *   // true
   *   bchjs.HDNode.verify(hdnode2, buf, signature);
   *   // false
   */
  verify (hdnode, buffer, signature) {
    return hdnode.verify(buffer, signature)
  }

  /**
   * @api HDNode.isPublic() isPublic()
   * @apiName isPublic
   * @apiGroup HDNode
   * @apiDescription
   * Check if an HDNode can only derive public keys and children
   *
   * @apiExample Example usage:
   *   // mainnet xpub
   *   let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPublic(node);
   *   // true
   *
   *   // mainnet xpriv
   *   let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPublic(node);
   *   // false
   *
   *   // testnet xpub
   *   let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPublic(node);
   *   // true
   *
   *   // testnet xpriv
   *   let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPublic(node);
   *   // false
   */
  isPublic (hdnode) {
    return hdnode.isNeutered()
  }

  /**
   * @api HDNode.isPrivate() isPrivate()
   * @apiName isPrivate
   * @apiGroup HDNode
   * @apiDescription
   * Check if an HDNode can derive both public and private keys and children
   *
   * @apiExample Example usage:
   *   // mainnet xpub
   *   let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPrivate(node);
   *   // false
   *
   *   // mainnet xpriv
   *   let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPrivate(node);
   *   // true
   *
   *   // testnet xpub
   *   let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPrivate(node);
   *   // false
   *
   *   // testnet xpriv
   *   let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPrivate(node);
   *   // true
   */
  isPrivate (hdnode) {
    return !hdnode.isNeutered()
  }

  /**
   * @api HDNode.toIdentifier() toIdentifier()
   * @apiName toIdentifier
   * @apiGroup HDNode
   * @apiDescription
   * hash160 of Node’s public key. The same value you would see in a scriptPubKey.
   *
   * @apiExample Example usage:
   *   // mainnet
   *   let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.toIdentifier(node);
   *   // <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>
   *   // the same as if we hash160ed it's publicKey
   *   let publicKeyBuffer = bchjs.HDNode.toPublicKey(node);
   *   bchjs.Crypto.hash160(publicKeyBuffer);
   *   // <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>
   *
   *   // testnet
   *   let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.toIdentifier(node);
   *   // <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>
   *   // the same as if we hash160ed it's publicKey
   *   let publicKeyBuffer = bchjs.HDNode.toPublicKey(node);
   *   bchjs.Crypto.hash160(publicKeyBuffer);
   *   // <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>
   */
  toIdentifier (hdnode) {
    return hdnode.getIdentifier()
  }

  fromBase58 (base58, network) {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  /**
   * @api HDNode.createAccount() createAccount()
   * @apiName createAccount
   * @apiGroup HDNode
   * @apiDescription
   * Has getChainAddress and nextChainAddress helper methods.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create root seed buffer
   *   let rootSeedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create master hd node
   *   let masterHDNode = bchjs.HDNode.fromSeed(rootSeedBuffer);
   *   // derive child node
   *   let childNode = masterHDNode.derivePath("m/44'/145'/0'/0");
   *   // create account
   *   let account = bchjs.HDNode.createAccount([childNode]);
   */
  createAccount (hdNodes) {
    const arr = hdNodes.map(
      (item, index) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain (hdNode) {
    return new bip32utils.Chain(hdNode)
  }
}

module.exports = HDNode
