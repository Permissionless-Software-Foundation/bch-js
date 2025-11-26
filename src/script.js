import Bitcoin from '@psf/bitcoincashjs-lib'

// Inline opcodes data to avoid fs/import.meta issues in browser builds.
// This data is from @psf/bitcoincash-ops/index.json
const opcodes = {
  OP_FALSE: 0,
  OP_0: 0,
  OP_PUSHDATA1: 76,
  OP_PUSHDATA2: 77,
  OP_PUSHDATA4: 78,
  OP_1NEGATE: 79,
  OP_RESERVED: 80,
  OP_TRUE: 81,
  OP_1: 81,
  OP_2: 82,
  OP_3: 83,
  OP_4: 84,
  OP_5: 85,
  OP_6: 86,
  OP_7: 87,
  OP_8: 88,
  OP_9: 89,
  OP_10: 90,
  OP_11: 91,
  OP_12: 92,
  OP_13: 93,
  OP_14: 94,
  OP_15: 95,
  OP_16: 96,
  OP_NOP: 97,
  OP_VER: 98,
  OP_IF: 99,
  OP_NOTIF: 100,
  OP_VERIF: 101,
  OP_VERNOTIF: 102,
  OP_ELSE: 103,
  OP_ENDIF: 104,
  OP_VERIFY: 105,
  OP_RETURN: 106,
  OP_TOALTSTACK: 107,
  OP_FROMALTSTACK: 108,
  OP_2DROP: 109,
  OP_2DUP: 110,
  OP_3DUP: 111,
  OP_2OVER: 112,
  OP_2ROT: 113,
  OP_2SWAP: 114,
  OP_IFDUP: 115,
  OP_DEPTH: 116,
  OP_DROP: 117,
  OP_DUP: 118,
  OP_NIP: 119,
  OP_OVER: 120,
  OP_PICK: 121,
  OP_ROLL: 122,
  OP_ROT: 123,
  OP_SWAP: 124,
  OP_TUCK: 125,
  OP_CAT: 126,
  OP_SPLIT: 127,
  OP_NUM2BIN: 128,
  OP_BIN2NUM: 129,
  OP_SIZE: 130,
  OP_INVERT: 131,
  OP_AND: 132,
  OP_OR: 133,
  OP_XOR: 134,
  OP_EQUAL: 135,
  OP_EQUALVERIFY: 136,
  OP_RESERVED1: 137,
  OP_RESERVED2: 138,
  OP_1ADD: 139,
  OP_1SUB: 140,
  OP_2MUL: 141,
  OP_2DIV: 142,
  OP_NEGATE: 143,
  OP_ABS: 144,
  OP_NOT: 145,
  OP_0NOTEQUAL: 146,
  OP_ADD: 147,
  OP_SUB: 148,
  OP_MUL: 149,
  OP_DIV: 150,
  OP_MOD: 151,
  OP_LSHIFT: 152,
  OP_RSHIFT: 153,
  OP_BOOLAND: 154,
  OP_BOOLOR: 155,
  OP_NUMEQUAL: 156,
  OP_NUMEQUALVERIFY: 157,
  OP_NUMNOTEQUAL: 158,
  OP_LESSTHAN: 159,
  OP_GREATERTHAN: 160,
  OP_LESSTHANOREQUAL: 161,
  OP_GREATERTHANOREQUAL: 162,
  OP_MIN: 163,
  OP_MAX: 164,
  OP_WITHIN: 165,
  OP_RIPEMD160: 166,
  OP_SHA1: 167,
  OP_SHA256: 168,
  OP_HASH160: 169,
  OP_HASH256: 170,
  OP_CODESEPARATOR: 171,
  OP_CHECKSIG: 172,
  OP_CHECKSIGVERIFY: 173,
  OP_CHECKMULTISIG: 174,
  OP_CHECKMULTISIGVERIFY: 175,
  OP_NOP1: 176,
  OP_NOP2: 177,
  OP_CHECKLOCKTIMEVERIFY: 177,
  OP_NOP3: 178,
  OP_CHECKSEQUENCEVERIFY: 178,
  OP_NOP4: 179,
  OP_NOP5: 180,
  OP_NOP6: 181,
  OP_NOP7: 182,
  OP_NOP8: 183,
  OP_NOP9: 184,
  OP_NOP10: 185,
  OP_CHECKDATASIG: 186,
  OP_CHECKDATASIGVERIFY: 187,
  OP_REVERSEBYTES: 188,
  OP_PUBKEYHASH: 253,
  OP_PUBKEY: 254,
  OP_INVALIDOPCODE: 255
}

class Script {
  constructor () {
    this.opcodes = opcodes
    this.nullData = Bitcoin.script.nullData
    this.multisig = {
      input: {
        encode: signatures => {
          const sigs = []
          signatures.forEach(sig => {
            sigs.push(sig)
          })
          return Bitcoin.script.multisig.input.encode(sigs)
        },
        decode: Bitcoin.script.multisig.input.decode,
        check: Bitcoin.script.multisig.input.check
      },
      output: {
        encode: (m, pubKeys) => {
          const pks = []
          pubKeys.forEach(pubKey => {
            pks.push(pubKey)
          })
          return Bitcoin.script.multisig.output.encode(m, pks)
        },
        decode: Bitcoin.script.multisig.output.decode,
        check: Bitcoin.script.multisig.output.check
      }
    }
    this.pubKey = Bitcoin.script.pubKey
    this.pubKeyHash = Bitcoin.script.pubKeyHash
    this.scriptHash = Bitcoin.script.scriptHash
  }

  /**
   * @api Script.classifyInput() classifyInput()
   * @apiName classifyInput
   * @apiGroup Script
   * @apiDescription
   * Classify transaction input.
   *
   * @apiExample Example usage:
   * let pubkeyInput = "3045022100ba2c3b717e023966cb16df65ca83f77029e2a5b80c47c47b6956474ac9ff281302201d48ee3292439e284a6654a0e79ac2b8f7fff5c6b0d715260aa296501a239c6441";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(pubkeyInput));
   * // pubkey
   *
   * let pubkeyhashInput = "30440220280d4a9954c5afe24089bdd545466bd7a8caad8b295e30de9d3cb5e56fccf64e022036663b2c53b5fac674b4b935b53e2a4ea88dfc71c9b879870976d82887542ab441 02969479fa9bea3082697dce683ac05b13ae63016b41d5ca1a450ad40f6c543751";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(pubkeyhashInput));
   * // pubkeyhash
   *
   * let multisigInput = "OP_0 3045022100fe324541215798b2df68cbd44039615e23c506d4ec1a05572064392a98196b82022068c849fa6699206da2fc6d7848efc1d3804a5816d6293615fe34c1a7f34e1c2f01 3044022001ab168e80b863fdec694350b587339bb72a37108ac3c989849251444d13ebba02201811272023e3c1038478eb972a82d3ad431bfc2408e88e4da990f1a7ecbb263901 3045022100aaeb7204c17eee2f2c4ff1c9f8b39b79e75e7fbf33e92cc67ac51be8f15b75f90220659eee314a4943a6384d2b154fa5821ef7a084814d7ee2c6f9f7f0ffb53be34b01";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(multisigInput));
   * // multisig
   *
   * let scripthashInput = "OP_0 304402207515cf147d201f411092e6be5a64a6006f9308fad7b2a8fdaab22cd86ce764c202200974b8aca7bf51dbf54150d3884e1ae04f675637b926ec33bf75939446f6ca2801 3045022100ef253c1faa39e65115872519e5f0a33bbecf430c0f35cf562beabbad4da24d8d02201742be8ee49812a73adea3007c9641ce6725c32cd44ddb8e3a3af460015d140501 522102359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1210395a9d84d47d524548f79f435758c01faec5da2b7e551d3b8c995b7e06326ae4a52ae";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(scripthashInput));
   * // scripthash
   */
  classifyInput (script) {
    return Bitcoin.script.classifyInput(script)
  }

  /**
   * @api Script.classifyOutput() classifyOutput()
   * @apiName classifyOutput
   * @apiGroup Script
   * @apiDescription
   * Classify transaction output.
   *
   * @apiExample Example usage:
   * let nullDataOutput = "OP_RETURN 424348466f7245766572796f6e65";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(nullDataOutput));
   * // nulldata
   *
   * let pubkeyOutput = "02359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1 OP_CHECKSIG";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(pubkeyOutput));
   * // pubkey
   *
   * let pubkeyhashOutput = "OP_DUP OP_HASH160 aa4d7985c57e011a8b3dd8e0e5a73aaef41629c5 OP_EQUALVERIFY OP_CHECKSIG";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(pubkeyhashOutput));
   * // pubkeyhash
   *
   * let multisigOutput = "OP_2 02359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1 0395a9d84d47d524548f79f435758c01faec5da2b7e551d3b8c995b7e06326ae4a OP_2 OP_CHECKMULTISIG";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(multisigOutput));
   * // multisig
   *
   * let scripthashOutput = "OP_HASH160 722ff0bc2c3f47b35c20df646c395594da24e90e OP_EQUAL";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(scripthashOutput));
   * // scripthash
   */
  classifyOutput (script) {
    return Bitcoin.script.classifyOutput(script)
  }

  /**
   * @api Script.decode() decode()
   * @apiName decode
   * @apiGroup Script
   * @apiDescription
   * Decode a Script buffer.
   *
   * @apiExample Example usage:
   * // decode P2PKH scriptSig buffer
   * let scriptSigBuffer = Buffer.from("483045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a6012102fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb", 'hex');
   * bchjs.Script.decode(scriptSigBuffer);
   * // [ <Buffer 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 2b ... >, <Buffer 02 fb 72 1b 92 02 5e 77 5b 1b 84 77 4e 65 d5 68 d2 46 45 cb 63 32 75 f5 c2 6f 5c 31 01 b2 14 a8 fb> ]
   *
   * // decode P2PKH scriptPubKey buffer
   * let scriptPubKeyBuffer = Buffer.from("76a91424e9c07804d0ee7e5bda934e0a3ae8710fc007dd88ac", 'hex');
   * bchjs.Script.decode(scriptPubKeyBuffer);
   * // [ 118,
   * // 169,
   * // <Buffer 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd>,
   * // 136,
   * // 172 ]
   */
  decode (scriptBuffer) {
    return Bitcoin.script.decompile(scriptBuffer)
  }

  /**
   * @api Script.encode() encode()
   * @apiName encode
   * @apiGroup Script
   * @apiDescription
   * Encode a Script buffer with minimal push data. This function is used for
   * Script files like CashScript. However, it will mangle the OP_RETURN of
   * an SLP token transaction and will burn the tokens as a result. Use encode2()
   * instead for that.
   *
   * @apiExample Example usage:
   * // encode P2PKH scriptSig to buffer
   * let scriptSig = [
   * Buffer.from('3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601', 'hex'),
   * Buffer.from('02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex')
   * ]
   * bchjs.Script.encode(scriptSig);
   * // <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >
   *
   * // encode P2PKH scriptPubKey to buffer
   * let scriptPubKey = [
   * 118,
   * 169,
   * Buffer.from('24e9c07804d0ee7e5bda934e0a3ae8710fc007dd', 'hex'),
   * 136,
   * 172
   * ];
   * bchjs.Script.encode(scriptPubKey);
   * // <Buffer 76 a9 14 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd 88 ac>
   */
  encode (scriptChunks) {
    const arr = []
    scriptChunks.forEach(chunk => {
      arr.push(chunk)
    })
    return Bitcoin.script.compile(arr)
  }

  /**
   * @api Script.encode2() encode2()
   * @apiName encode2
   * @apiGroup Script
   * @apiDescription
   * Encode a Script buffer without minimal push data. This should be used if
   * encode() does not produce the desired results. This should be used for compiling
   * SLP OP_RETURNs.
   *
   * @apiExample Example usage:
   * // encode P2PKH scriptSig to buffer
   * let scriptSig = [
   * Buffer.from('3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601', 'hex'),
   * Buffer.from('02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex')
   * ]
   * bchjs.Script.encode2(scriptSig);
   * // <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >
   *
   * // encode P2PKH scriptPubKey to buffer
   * let scriptPubKey = [
   * 118,
   * 169,
   * Buffer.from('24e9c07804d0ee7e5bda934e0a3ae8710fc007dd', 'hex'),
   * 136,
   * 172
   * ];
   * bchjs.Script.encode2(scriptPubKey);
   * // <Buffer 76 a9 14 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd 88 ac>
   */
  encode2 (scriptChunks) {
    const arr = []
    scriptChunks.forEach(chunk => {
      arr.push(chunk)
    })
    return Bitcoin.script.compile2(arr)
  }

  /**
   * @api Script.toASM() toASM()
   * @apiName toASM
   * @apiGroup Script
   * @apiDescription
   * Script buffer to ASM.
   *
   * @apiExample Example usage:
   * // P2PKH scriptSig
   * let scriptSigBuffer = Buffer.from('483045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a6012102fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex');
   * bchjs.Script.toASM(scriptSigBuffer);
   * // 3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601 02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb
   *
   * // P2PKH scriptPubKey
   * let scriptBuffer = Buffer.from("76a914bee4182d9fbc8931a728410a0cd3e0f340f2995a88ac", 'hex');
   * bchjs.Script.toASM(scriptBuffer);
   * // OP_DUP OP_HASH160 bee4182d9fbc8931a728410a0cd3e0f340f2995a OP_EQUALVERIFY OP_CHECKSIG
   */
  toASM (buffer) {
    return Bitcoin.script.toASM(buffer)
  }

  /**
   * @api Script.fromASM() fromASM()
   * @apiName fromASM
   * @apiGroup Script
   * @apiDescription
   * Script ASM to buffer.
   *
   * @apiExample Example usage:
   * // P2PKH scriptSig
   * let scriptSigASM = "3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601 02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb";
   * bchjs.Script.fromASM(scriptSigASM);
   * // <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >
   *
   * // P2PKH scriptPubKey
   * let scriptPubKeyASM = "OP_DUP OP_HASH160 bee4182d9fbc8931a728410a0cd3e0f340f2995a OP_EQUALVERIFY OP_CHECKSIG";
   * bchjs.Script.fromASM(scriptPubKeyASM);
   * // <Buffer 76 a9 14 be e4 18 2d 9f bc 89 31 a7 28 41 0a 0c d3 e0 f3 40 f2 99 5a 88 ac>
   */
  fromASM (asm) {
    return Bitcoin.script.fromASM(asm)
  }
}

export default Script
