// Public npm libraries
const assert = require('assert')
const Buffer = require('safe-buffer').Buffer

// Mocks
const fixtures = require('./fixtures/script.json')

// Unit under test (uut)
const BCHJS = require('../../src/bch-js')
let bchjs

describe('#Script', () => {
  beforeEach(() => {
    bchjs = new BCHJS()
  })

  describe('#decode', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.decodeScriptSig.forEach(fixture => {
        it('should decode scriptSig buffer', () => {
          const decodedScriptSig = bchjs.Script.decode(
            Buffer.from(fixture.scriptSigHex, 'hex')
          )
          assert.equal(typeof decodedScriptSig, 'object')
        })

        it(`should decode scriptSig buffer to cash address ${fixture.cashAddress}`, () => {
          const decodedScriptSig = bchjs.Script.decode(
            Buffer.from(fixture.scriptSigHex, 'hex')
          )
          const address = bchjs.HDNode.toCashAddress(
            bchjs.ECPair.fromPublicKey(decodedScriptSig[1])
          )
          assert.equal(address, fixture.cashAddress)
        })

        it(`should decode scriptSig buffer to legacy address ${fixture.legacyAddress}`, () => {
          const decodedScriptSig = bchjs.Script.decode(
            Buffer.from(fixture.scriptSigHex, 'hex')
          )
          const address = bchjs.HDNode.toLegacyAddress(
            bchjs.ECPair.fromPublicKey(decodedScriptSig[1])
          )
          assert.equal(address, fixture.legacyAddress)
        })
      })
    })

    describe('P2PKH scriptPubKey', () => {
      fixtures.decodeScriptPubKey.forEach(fixture => {
        it('should decode scriptSig buffer', () => {
          const decodedScriptPubKey = bchjs.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, 'hex')
          )
          assert.equal(decodedScriptPubKey.length, 5)
        })

        it(`should match hashed pubKey ${fixture.pubKeyHex}`, () => {
          const decodedScriptPubKey = bchjs.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, 'hex')
          )
          const data = Buffer.from(fixture.pubKeyHex, 'hex')
          const hash160 = bchjs.Crypto.hash160(data).toString('hex')
          assert.equal(decodedScriptPubKey[2].toString('hex'), hash160)
        })
      })
    })
  })

  describe('#encode', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.encodeScriptSig.forEach(fixture => {
        it('should encode scriptSig chunks to buffer', () => {
          const arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ]
          const encodedScriptSig = bchjs.Script.encode(arr)
          assert.equal(typeof encodedScriptSig, 'object')
        })
      })
    })

    describe('P2PKH scriptPubKey', () => {
      fixtures.encodeScriptPubKey.forEach(fixture => {
        it('should encode scriptPubKey buffer', () => {
          const decodedScriptPubKey = bchjs.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, 'hex')
          )
          const compiledScriptPubKey = bchjs.Script.encode(decodedScriptPubKey)
          assert.equal(
            compiledScriptPubKey.toString('hex'),
            fixture.scriptPubKeyHex
          )
        })
      })
    })

    describe('Encode SLP SEND OP_RETURN properly', () => {
      it('should correctly compile OP_RETURN SLP SEND transaction', () => {
        const scriptArr = [
          bchjs.Script.opcodes.OP_RETURN,
          Buffer.from('534c5000', 'hex'),
          Buffer.from('01', 'hex'),
          Buffer.from('SEND'),
          Buffer.from(
            '73db55368981e4878440637e448d4abe7f661be5c3efdcbcb63bd86a01a76b5a',
            'hex'
          ),
          Buffer.from('00000001', 'hex')
        ]

        const data = bchjs.Script.encode2(scriptArr)

        // convert data to a hex string
        let str = ''
        for (let i = 0; i < data.length; i++) {
          let hex = Number(data[i]).toString(16)

          // zero pad when its a single digit.
          hex = `0${hex}`
          hex = hex.slice(-2)
          // console.log(`hex: ${hex}`)

          str += hex
        }
        console.log(`Hex string: ${str}`)

        // console.log(`scriptArr: ${JSON.stringify(data,null,2)}`)

        const correctStr =
          '6a04534c500001010453454e442073db55368981e4878440637e448d4abe7f661be5c3efdcbcb63bd86a01a76b5a0400000001'

        assert.equal(str, correctStr)
      })
    })
  })

  describe('#toASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigToASM.forEach(fixture => {
        it(`should encode scriptSig buffer to ${fixture.asm}`, () => {
          const arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ]
          const compiledScriptSig = bchjs.Script.encode(arr)
          const asm = bchjs.Script.toASM(compiledScriptSig)
          assert.equal(asm, fixture.asm)
        })
      })
    })

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyToASM.forEach(fixture => {
        it(`should compile scriptPubKey buffer to ${fixture.asm}`, () => {
          const asm = bchjs.Script.toASM(
            Buffer.from(fixture.scriptPubKeyHex, 'hex')
          )
          assert.equal(asm, fixture.asm)
        })
      })
    })
  })

  describe('#fromASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigFromASM.forEach(fixture => {
        it('should decode scriptSig asm to buffer', () => {
          const buf = bchjs.Script.fromASM(fixture.asm)
          assert.equal(typeof buf, 'object')
        })
      })
    })

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyFromASM.forEach(fixture => {
        it('should decode scriptPubKey asm to buffer', () => {
          const buf = bchjs.Script.fromASM(fixture.asm)
          assert.equal(typeof buf, 'object')
        })
      })
    })
  })

  describe('#OPCodes', () => {
    for (const opcode in fixtures.opcodes) {
      it(`should have OP Code ${opcode}`, () => {
        assert.equal(bchjs.Script.opcodes[opcode], fixtures.opcodes[opcode])
      })
    }
  })

  describe('#classifyInput', () => {
    fixtures.classifyInput.forEach(fixture => {
      it(`should classify input type ${fixture.type}`, () => {
        const type = bchjs.Script.classifyInput(
          bchjs.Script.fromASM(fixture.script)
        )
        assert.equal(type, fixture.type)
      })
    })
  })

  describe('#classifyOutput', () => {
    fixtures.classifyOutput.forEach(fixture => {
      it(`should classify ouput type ${fixture.type}`, () => {
        const type = bchjs.Script.classifyOutput(
          bchjs.Script.fromASM(fixture.script)
        )
        assert.equal(type, fixture.type)
      })
    })
  })

  describe('#nullDataTemplate', () => {
    fixtures.nullDataTemplate.forEach(fixture => {
      it('should encode nulldata output', () => {
        const buf = bchjs.Script.nullData.output.encode(
          Buffer.from(`${fixture.data}`, 'ascii')
        )
        assert.equal(buf.toString('hex'), fixture.hex)
      })

      it('should decode nulldata output', () => {
        const buf = bchjs.Script.nullData.output.decode(
          Buffer.from(`${fixture.hex}`, 'hex')
        )
        assert.equal(buf.toString('ascii'), fixture.data)
      })

      it('should confirm correctly formatted nulldata output', () => {
        const buf = bchjs.Script.nullData.output.encode(
          Buffer.from(`${fixture.data}`, 'ascii')
        )
        const valid = bchjs.Script.nullData.output.check(buf)
        assert.equal(valid, true)
      })
    })
  })

  describe('#pubKeyTemplate', () => {
    describe('#pubKeyInputTemplate', () => {
      fixtures.pubKeyInputTemplate.forEach(fixture => {
        it('should encode pubKey input', () => {
          const buf = bchjs.Script.pubKey.input.encode(
            Buffer.from(fixture.signature, 'hex')
          )
          assert.equal(buf.toString('hex'), fixture.hex)
        })

        it('should decode pubKey input', () => {
          const buf = bchjs.Script.pubKey.input.decode(
            Buffer.from(fixture.hex, 'hex')
          )
          assert.equal(buf.toString('hex'), fixture.signature)
        })

        it('should confirm correctly formatted pubKeyHash input', () => {
          const buf = bchjs.Script.pubKey.input.encode(
            Buffer.from(fixture.signature, 'hex')
          )
          const valid = bchjs.Script.pubKey.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe('#pubKeyOutputTemplate', () => {
      fixtures.pubKeyOutputTemplate.forEach(fixture => {
        it('should encode pubKey output', () => {
          const buf = bchjs.Script.pubKey.output.encode(
            Buffer.from(fixture.pubKey, 'hex')
          )
          assert.equal(buf.toString('hex'), fixture.hex)
        })

        it('should decode pubKey output', () => {
          const buf = bchjs.Script.pubKey.output.decode(
            Buffer.from(`${fixture.hex}`, 'hex')
          )
          assert.equal(buf.toString('hex'), fixture.pubKey)
        })

        it('should confirm correctly formatted pubKey output', () => {
          const buf = bchjs.Script.pubKey.output.encode(
            Buffer.from(fixture.pubKey, 'hex')
          )
          const valid = bchjs.Script.pubKey.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe('#pubKeyHashTemplate', () => {
    describe('#pubKeyHashInputTemplate', () => {
      fixtures.pubKeyHashInputTemplate.forEach(fixture => {
        it('should encode pubKeyHash input', () => {
          const buf = bchjs.Script.pubKeyHash.input.encode(
            Buffer.from(fixture.signature, 'hex'),
            Buffer.from(fixture.pubKey, 'hex')
          )
          assert.equal(buf.toString('hex'), fixture.hex)
        })

        it('should decode pubKeyHash input signature', () => {
          const buf = bchjs.Script.pubKeyHash.input.decode(
            Buffer.from(fixture.hex, 'hex')
          )
          assert.equal(buf.signature.toString('hex'), fixture.signature)
        })

        it('should decode pubKeyHash input pubkey', () => {
          const buf = bchjs.Script.pubKeyHash.input.decode(
            Buffer.from(fixture.hex, 'hex')
          )
          assert.equal(buf.pubKey.toString('hex'), fixture.pubKey)
        })

        it('should confirm correctly formatted pubKeyHash input', () => {
          const buf = bchjs.Script.pubKeyHash.input.encode(
            Buffer.from(fixture.signature, 'hex'),
            Buffer.from(fixture.pubKey, 'hex')
          )
          const valid = bchjs.Script.pubKeyHash.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe('#pubKeyHashOutputTemplate', () => {
      it('should exercise pubKeyHashOutputTemplate', () => {
        fixtures.pubKeyHashOutputTemplate.forEach(fixture => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const identifier = bchjs.HDNode.toIdentifier(node)
          it('should encode pubKeyHash output', () => {
            const buf = bchjs.Script.pubKeyHash.output.encode(identifier)
            assert.equal(buf.toString('hex'), fixture.hex)
          })

          it('should decode pubKeyHash output', () => {
            const buf = bchjs.Script.pubKeyHash.output.decode(
              Buffer.from(`${fixture.hex}`, 'hex')
            )
            assert.equal(buf.toString('hex'), identifier.toString('hex'))
          })

          it('should confirm correctly formatted pubKeyHash output', () => {
            const buf = bchjs.Script.pubKeyHash.output.encode(identifier)
            const valid = bchjs.Script.pubKeyHash.output.check(buf)
            assert.equal(valid, true)
          })
        })
      })
    })
  })

  describe('#multisigTemplate', () => {
    describe('#multisigInputTemplate', () => {
      fixtures.multisigInputTemplate.forEach(fixture => {
        it('should encode multisig input', () => {
          const signatures = fixture.signatures.map(signature =>
            signature
              ? Buffer.from(signature, 'hex')
              : bchjs.Script.opcodes.OP_0
          )

          const buf = bchjs.Script.multisig.input.encode(signatures)
          assert.equal(buf.toString('hex'), fixture.hex)
        })

        it('should decode multisig input', () => {
          const buf = bchjs.Script.multisig.input.decode(
            Buffer.from(fixture.hex, 'hex')
          )
          assert.equal(buf[0].toString('hex'), fixture.signatures[0])
        })

        it('should confirm correctly formatted multisig input', () => {
          const signatures = fixture.signatures.map(signature =>
            signature
              ? Buffer.from(signature, 'hex')
              : bchjs.Script.opcodes.OP_0
          )

          const buf = bchjs.Script.multisig.input.encode(signatures)
          const valid = bchjs.Script.multisig.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe('#multisigOutputTemplate', () => {
      fixtures.multisigOutputTemplate.forEach(fixture => {
        it('should encode multisig output', () => {
          const pubKeys = fixture.pubKeys.map(p => Buffer.from(p, 'hex'))
          const m = pubKeys.length
          const buf = bchjs.Script.multisig.output.encode(m, pubKeys)

          assert.equal(buf.toString('hex'), fixture.hex)
        })

        it('should decode multisig output', () => {
          const output = bchjs.Script.multisig.output.decode(
            Buffer.from(`${fixture.hex}`, 'hex')
          )
          assert.equal(output.m, fixture.pubKeys.length)
        })

        it('should confirm correctly formatted multisig output', () => {
          const pubKeys = fixture.pubKeys.map(p => Buffer.from(p, 'hex'))
          const m = pubKeys.length
          const buf = bchjs.Script.multisig.output.encode(m, pubKeys)
          const valid = bchjs.Script.multisig.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe('#scriptHashTemplate', () => {
    describe('#scriptHashInputTemplate', () => {
      fixtures.scriptHashInputTemplate.forEach(fixture => {
        it('should encode scriptHash input', () => {
          const buf = bchjs.Script.scriptHash.input.encode(
            bchjs.Script.fromASM(fixture.redeemScriptSig),
            bchjs.Script.fromASM(fixture.redeemScript)
          )
          assert.equal(buf.toString('hex'), fixture.hex)
        })

        it('should decode scriptHash input', () => {
          const redeemScriptSig = bchjs.Script.fromASM(fixture.redeemScriptSig)
          const redeemScript = bchjs.Script.fromASM(fixture.redeemScript)
          assert.deepEqual(
            bchjs.Script.scriptHash.input.decode(
              Buffer.from(fixture.hex, 'hex')
            ),
            {
              redeemScriptSig: redeemScriptSig,
              redeemScript: redeemScript
            }
          )
        })

        it('should confirm correctly formatted scriptHash input', () => {
          const buf = bchjs.Script.scriptHash.input.encode(
            bchjs.Script.fromASM(fixture.redeemScriptSig),
            bchjs.Script.fromASM(fixture.redeemScript)
          )
          const valid = bchjs.Script.scriptHash.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe('#scriptHashOutputTemplate', () => {
      fixtures.scriptHashOutputTemplate.forEach(fixture => {
        it('should encode scriptHash output', () => {
          const redeemScript = bchjs.Script.fromASM(fixture.output)
          const scriptHash = bchjs.Crypto.hash160(redeemScript)
          const buf = bchjs.Script.scriptHash.output.encode(scriptHash)

          assert.equal(buf.toString('hex'), fixture.hex)
        })

        it('should decode scriptHash output', () => {
          const redeemScript = bchjs.Script.fromASM(fixture.output)
          const scriptHash = bchjs.Crypto.hash160(redeemScript)
          const buf = bchjs.Script.scriptHash.output.decode(
            Buffer.from(`${fixture.hex}`, 'hex')
          )
          assert.deepEqual(buf, scriptHash)
        })

        it('should confirm correctly formatted scriptHash output', () => {
          const redeemScript = bchjs.Script.fromASM(fixture.output)
          const scriptHash = bchjs.Crypto.hash160(redeemScript)
          const buf = bchjs.Script.scriptHash.output.encode(scriptHash)
          const valid = bchjs.Script.scriptHash.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })
})
