const BCHJSAddress = require('../address')
// const bchAddress = new BCHJSAddress()
let bchAddress

const bchaddrjs = require('bchaddrjs-slp')

class Address extends BCHJSAddress {
  constructor (config) {
    super(config)

    this.restURL = config.restURL

    bchAddress = new BCHJSAddress(config)
  }

  /**
   * @api SLP.Address.toSLPAddress() toSLPAddress()
   * @apiName toSLPAddress
   * @apiGroup SLP
   * @apiDescription Converting legacy or cashaddr to slpAddress format.
   *
   * @apiExample Example usage:
   *  // mainnet legacy
   *  bchjs.SLP.Address.toSLPAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
   *  // simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzd
   *
   *  // mainnet legacy return no prefix
   *  bchjs.SLP.Address.toSLPAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
   *  // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.toSLPAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp
   *
   *  // mainnet slpaddr no prefix
   *  bchjs.SLP.Address.toSLPAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp
   *
   *  // tesnet legacy
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // slptest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   *
   *  // testnet legacy return no prefix
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   *
   *  // tesnet cashaddr
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // slptest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   *
   *  // testnet cashaddr no prefix
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   */
  toSLPAddress (address, prefix = true, regtest = false) {
    this._ensureValidAddress(address)
    const slpAddress = bchaddrjs.toSlpAddress(address)
    if (prefix) return slpAddress
    return slpAddress.split(':')[1]
  }

  /**
   * @api SLP.Address.toCashAddress() toCashAddress()
   * @apiName toCashAddress
   * @apiGroup SLP
   * @apiDescription Converting legacy or slpaddr to cashAddress format.
   *
   * @apiExample Example usage:
   *  // mainnet legacy
   *  bchjs.SLP.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
   *  // bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet legacy return no prefix
   *  bchjs.SLP.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
   *  // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.toCashAddress('simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet slpaddr no prefix
   *  bchjs.SLP.Address.toCashAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // tesnet legacy
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   *
   *  // testnet legacy return no prefix
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   *
   *  // tesnet cashaddr
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   *
   *  // testnet cashaddr no prefix
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   */
  toCashAddress (address, prefix = true, regtest = false) {
    this._ensureValidAddress(address)
    const cashAddress = bchaddrjs.toCashAddress(address)
    if (prefix) return cashAddress
    return cashAddress.split(':')[1]
  }

  /**
   * @api SLP.Address.toLegacyAddress() toLegacyAddress()
   * @apiName toLegacyAddress
   * @apiGroup SLP
   * @apiDescription Converting cashaddr or slpaddr to legacy address format.
   *
   * @apiExample Example usage:
   *
   *  // mainnet cashaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // mainnet slpaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // testnet cashaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   *
   *  // testnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   *
   *  // testnet slpaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   *
   *  // testnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   */
  toLegacyAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.toLegacyAddress(cashAddr)
  }

  isLegacyAddress (address) {
    this._ensureValidAddress(address)
    return bchAddress.isLegacyAddress(address)
  }

  isCashAddress (address) {
    this._ensureValidAddress(address)
    if (bchaddrjs.isSlpAddress(address)) return false

    return bchAddress.isCashAddress(address)
  }

  /**
   * @api SLP.Address.isSLPAddress() isSLPAddress()
   * @apiName isSLPAddress
   * @apiGroup SLP
   * @apiDescription Detect if slpAddr encoded address.
   *
   * @apiExample Example usage:
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isSLPAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isSLPAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.isSLPAddress('18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj')
   *  // false
   *
   *  // testnet w/ slpaddr prefix
   *  bchjs.SLP.Address.isSLPAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isSLPAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet legacy
   *  bchjs.SLP.Address.isSLPAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // false
   */
  isSLPAddress (address) {
    this._ensureValidAddress(address)
    return bchaddrjs.isSlpAddress(address)
  }

  /**
   * @api SLP.Address.isMainnetAddress() isMainnetAddress()
   * @apiName isMainnetAddress
   * @apiGroup SLP
   * @apiDescription Detect if mainnet address.
   *
   * @apiExample Example usage:
   *
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isMainnetAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.isMainnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   *  // true
   *
   *  // testnet cashaddr
   *  bchjs.SLP.Address.isMainnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // testnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // testnet slpaddr
   *  bchjs.SLP.Address.isMainnetAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // testnet legacy
   *  bchjs.SLP.Address.isMainnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // false
   */
  isMainnetAddress (address) {
    this._ensureValidAddress(address)
    const cashaddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isMainnetAddress(cashaddr)
  }

  /**
   * @api SLP.Address.isTestnetAddress() isTestnetAddress()
   * @apiName isTestnetAddress
   * @apiGroup SLP
   * @apiDescription Detect if testnet address.
   *
   * @apiExample Example usage:
   *  // cashaddr mainnet
   *  bchjs.SLP.Address.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  //false
   *
   *  // w/ no cashaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // slpaddr mainnet
   *  bchjs.SLP.Address.isTestnetAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  //false
   *
   *  // w/ no slpaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // false
   *
   *  // legacy mainnet
   *  bchjs.SLP.Address.isTestnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   *  // false
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.isTestnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // testnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.isTestnetAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet legacy
   *  bchjs.SLP.Address.isTestnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // true
   */
  isTestnetAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isTestnetAddress(cashAddr)
  }

  /**
   * @api SLP.Address.isP2PKHAddress() isP2PKHAddress()
   * @apiName isP2PKHAddress
   * @apiGroup SLP
   * @apiDescription Detect if p2pkh address.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isP2PKHAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // legacy
   *  bchjs.SLP.Address.isP2PKHAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   *  // true
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.isP2PKHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // testnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.isP2PKHAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // true
   */
  isP2PKHAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isP2PKHAddress(cashAddr)
  }

  /**
   * @api SLP.Address.isP2SHAddress() isP2SHAddress()
   * @apiName isP2SHAddress
   * @apiGroup SLP
   * @apiDescription Detect if p2sh address.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isP2SHAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // false
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // false
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.isP2SHAddress('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // false
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.isP2SHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.isP2SHAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.isP2SHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // false
   */
  isP2SHAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isP2SHAddress(cashAddr)
  }

  /**
   * @api SLP.Address.detectAddressFormat() detectAddressFormat()
   * @apiName detectAddressFormat
   * @apiGroup SLP
   * @apiDescription Detect address format.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // cashaddr
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // cashaddr
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.detectAddressFormat('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // slpaddr
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // slpaddr
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.detectAddressFormat('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // legacy
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.detectAddressFormat('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // cashaddr
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // cashaddr
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.detectAddressFormat('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // slpaddr
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // slpaddr
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.detectAddressFormat('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // legacy
   */
  detectAddressFormat (address) {
    this._ensureValidAddress(address)
    if (bchaddrjs.isSlpAddress(address)) return 'slpaddr'

    return bchAddress.detectAddressFormat(address)
  }

  /**
   * @api SLP.Address.detectAddressNetwork() detectAddressNetwork()
   * @apiName detectAddressNetwork
   * @apiGroup SLP
   * @apiDescription Detect address network.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // mainnet
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // mainnet
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.detectAddressNetwork('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // mainnet
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // mainnet
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.detectAddressNetwork('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // mainnet
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.detectAddressNetwork('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // testnet
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // testnet
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.detectAddressNetwork('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // testnet
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // testnet
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.detectAddressNetwork('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // testnet
   */
  detectAddressNetwork (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.detectAddressNetwork(cashAddr)
  }

  /**
   * @api SLP.Address.detectAddressType() detectAddressType()
   * @apiName detectAddressType
   * @apiGroup SLP
   * @apiDescription Detect address type.
   *
   * @apiExample Example usage:
   *  // mainet cashaddr
   *  bchjs.SLP.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
   *  // p2pkh
   *
   *  // mainet cashaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
   *  // p2pkh
   *
   *  // mainet slpaddr
   *  bchjs.SLP.Address.detectAddressType('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w');
   *  // p2pkh
   *
   *  // mainet slpaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w');
   *  // p2pkh
   *
   *  // mainet legacy
   *  bchjs.SLP.Address.detectAddressType('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74');
   *  // p2pkh
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.detectAddressType('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
   *  // p2pkh
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
   *  // p2pkh
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.detectAddressType('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse');
   *  // p2pkh
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse');
   *  // p2pkh
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.detectAddressType('mqc1tmwY2368LLGktnePzEyPAsgADxbksi');
   *  // p2pkh
   */
  detectAddressType (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.detectAddressType(cashAddr)
  }

  /*
  async details(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.details(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.details(address)
  }

  async utxo(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.utxo(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.utxo(address)
  }

  async unconfirmed(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.unconfirmed(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.unconfirmed(address)
  }

  async transactions(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.transactions(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.transactions(address)
  }
*/
  _ensureValidAddress (address) {
    try {
      bchaddrjs.toCashAddress(address)
    } catch (err) {
      throw new Error(
        `Invalid BCH address. Double check your address is valid: ${address}`
      )
    }
  }
}

module.exports = Address
