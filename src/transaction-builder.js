const Bitcoin = require('@psf/bitcoincashjs-lib')
const coininfo = require('@psf/coininfo')
const bip66 = require('bip66')
const bip68 = require('bc-bip68')

class TransactionBuilder {
  static setAddress (address) {
    TransactionBuilder._address = address
  }

  constructor (network = 'mainnet') {
    let bitcoincash
    if (network === 'bitcoincash' || network === 'mainnet') { bitcoincash = coininfo.bitcoincash.main } else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    this.transaction = new Bitcoin.TransactionBuilder(bitcoincashBitcoinJSLib)
    this.DEFAULT_SEQUENCE = 0xffffffff
    this.hashTypes = {
      SIGHASH_ALL: 0x01,
      SIGHASH_NONE: 0x02,
      SIGHASH_SINGLE: 0x03,
      SIGHASH_ANYONECANPAY: 0x80,
      SIGHASH_BITCOINCASH_BIP143: 0x40,
      ADVANCED_TRANSACTION_MARKER: 0x00,
      ADVANCED_TRANSACTION_FLAG: 0x01
    }
    this.signatureAlgorithms = {
      ECDSA: Bitcoin.ECSignature.ECDSA,
      SCHNORR: Bitcoin.ECSignature.SCHNORR
    }
    this.bip66 = bip66
    this.bip68 = bip68
    this.p2shInput = false
    // this.tx
  }

  /**
   * @api Transaction-Builder.addInput() addInput()
   * @apiName AddInput
   * @apiGroup TransactionBuilder
   * @apiDescription Add input to transaction.
   *
   * @apiExample Example usage:
   * // txid of vout
   * let txid = 'f7890915febe580920df2681d2bac0909ae89bd0cc1d3ed763e5eeba7f337f0e';
   * // add input with txid and index of vout
   * transactionBuilder.addInput(txid, 0);
   */
  addInput (txHash, vout, sequence = this.DEFAULT_SEQUENCE, prevOutScript) {
    this.transaction.addInput(txHash, vout, sequence, prevOutScript)
  }

  addInputScript (vout, script) {
    this.tx = this.transaction.buildIncomplete()
    this.tx.setInputScript(vout, script)
    this.p2shInput = true
  }

  addInputScripts (scripts) {
    this.tx = this.transaction.buildIncomplete()
    scripts.forEach(script => {
      this.tx.setInputScript(script.vout, script.script)
    })
    this.p2shInput = true
  }

  /**
   * @api Transaction-Builder.addOutput() addOutput()
   * @apiName AddOutput
   * @apiGroup TransactionBuilder
   * @apiDescription Add output to transaction.
   *
   * @apiExample Example usage:
   *  let originalAmount = 100000;
   *  let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
   *  // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
   *  let sendAmount = originalAmount - byteCount;
   *  // add output w/ address and amount to send
   *  transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
   */
  addOutput (scriptPubKey, amount) {
    try {
      this.transaction.addOutput(
        TransactionBuilder._address.toLegacyAddress(scriptPubKey),
        amount
      )
    } catch (error) {
      this.transaction.addOutput(scriptPubKey, amount)
    }
  }

  /**
   * @api Transaction-Builder.setLockTime() setLockTime()
   * @apiName SetLockTime
   * @apiGroup TransactionBuilder
   * @apiDescription Set locktime.
   *
   * @apiExample Example usage:
   *  let originalAmount = 100000;
   *  let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
   *  // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
   *  let sendAmount = originalAmount - byteCount;
   *  // add output w/ address and amount to send
   *  transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
   *  transactionBuilder.setLockTime(50000)
   */
  setLockTime (locktime) {
    this.transaction.setLockTime(locktime)
  }

  /**
   * @api Transaction-Builder.sign() sign()
   * @apiName Sign.
   * @apiGroup TransactionBuilder
   * @apiDescription Sign transaction. It creates the unlocking script needed to spend an input. Each input has its own script and thus 'sign' must be called for each input even if the keyPair is the same..
   *
   * @apiExample Example usage:
   *  let originalAmount = 100000;
   *  // node of address which is going to spend utxo
   *  let hdnode = bchjs.HDNode.fromXPriv("xprvA3eaDg64MwDr72PVGJ7CkvshNAzCDRz7rn98sYrZVAtDSWCAmNGQhEQeCLDcnmcpSkfjhHevXmu4ZL8ZcT9D4vEbG8LpiToZETrHZttw9Yw");
   *  // keypair
   *  let keyPair = bchjs.HDNode.toKeyPair(hdnode);
   *  // empty redeemScript variable
   *  let redeemScript;
   *  // sign w/ keyPair
   *  transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount, transactionBuilder.signatureAlgorithms.SCHNORR);
   */
  sign (
    vin,
    keyPair,
    redeemScript,
    hashType = this.hashTypes.SIGHASH_ALL,
    value,
    signatureAlgorithm
  ) {
    let witnessScript

    this.transaction.sign(
      vin,
      keyPair,
      redeemScript,
      hashType,
      value,
      witnessScript,
      signatureAlgorithm
    )
  }

  /**
   * @api Transaction-Builder.build() build()
   * @apiName Build.
   * @apiGroup TransactionBuilder
   * @apiDescription Build transaction.
   *
   * @apiExample Example usage:
   * // build tx
   * let tx = bchjs.transactionBuilder.build();
   */
  build () {
    if (this.p2shInput === true) return this.tx

    return this.transaction.build()
  }
}

module.exports = TransactionBuilder
