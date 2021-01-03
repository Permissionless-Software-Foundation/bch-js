const fixtures = require('./fixtures/transaction-builder.json')
const assert = require('assert')
const assert2 = require('chai').assert
const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()
const Buffer = require('safe-buffer').Buffer

describe('#TransactionBuilder', () => {
  describe('#hashTypes', () => {
    const transactionBuilder = new bchjs.TransactionBuilder('mainnet')
    fixtures.hashTypes.forEach(fixture => {
      it('should match hash type', () => {
        assert2.equal(
          fixture[Object.keys(fixture)[0]],
          transactionBuilder.hashTypes[Object.keys(fixture)[0]]
        )
      })
    })
  })

  describe('#P2PK', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.toOne.mainnet.forEach(fixture => {
          it('should create 1-to-1 P2PK transaction on mainnet', () => {
            const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
            const transactionBuilder = new bchjs.TransactionBuilder()
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey = bchjs.HDNode.toPublicKey(node)
            const buf = bchjs.Script.pubKey.output.encode(pubKey)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf, sendAmount)
            const keyPair = bchjs.HDNode.toKeyPair(node)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.toOne.testnet.forEach(fixture => {
          it('should create 1-to-1 P2PK transaction on testnet', () => {
            const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey = bchjs.HDNode.toPublicKey(node)
            const buf = bchjs.Script.pubKey.output.encode(pubKey)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf, sendAmount)
            const keyPair = bchjs.HDNode.toKeyPair(node)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
    })

    describe('#toMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.toMany.mainnet.forEach(fixture => {
          it('should create 1-to-many P2PK transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const buf1 = bchjs.Script.pubKey.output.encode(pubKey1)
            const buf2 = bchjs.Script.pubKey.output.encode(pubKey2)
            const buf3 = bchjs.Script.pubKey.output.encode(pubKey3)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf2, Math.floor(sendAmount / 2))
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2))
            const keyPair = bchjs.HDNode.toKeyPair(node1)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.toMany.testnet.forEach(fixture => {
          it('should create 1-to-many P2PK transaction on testnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const buf1 = bchjs.Script.pubKey.output.encode(pubKey1)
            const buf2 = bchjs.Script.pubKey.output.encode(pubKey2)
            const buf3 = bchjs.Script.pubKey.output.encode(pubKey3)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf2, Math.floor(sendAmount / 2))
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2))
            const keyPair = bchjs.HDNode.toKeyPair(node1)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
    })

    describe('#manyToMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.manyToMany.mainnet.forEach(fixture => {
          it('should create many-to-many P2PK transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const node4 = bchjs.HDNode.fromXPriv(fixture.xprivs[3])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const pubKey4 = bchjs.HDNode.toPublicKey(node4)
            const buf1 = bchjs.Script.pubKey.output.encode(pubKey1)
            const buf2 = bchjs.Script.pubKey.output.encode(pubKey2)
            const buf3 = bchjs.Script.pubKey.output.encode(pubKey3)
            const buf4 = bchjs.Script.pubKey.output.encode(pubKey4)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf2
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2))
            transactionBuilder.addOutput(buf4, Math.floor(sendAmount / 2))
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.manyToMany.testnet.forEach(fixture => {
          it('should create many-to-many P2PK transaction on testnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const node4 = bchjs.HDNode.fromXPriv(fixture.xprivs[3])
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const pubKey4 = bchjs.HDNode.toPublicKey(node4)
            const buf1 = bchjs.Script.pubKey.output.encode(pubKey1)
            const buf2 = bchjs.Script.pubKey.output.encode(pubKey2)
            const buf3 = bchjs.Script.pubKey.output.encode(pubKey3)
            const buf4 = bchjs.Script.pubKey.output.encode(pubKey4)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf2
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2))
            transactionBuilder.addOutput(buf4, Math.floor(sendAmount / 2))
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
    })

    describe('#fromMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.fromMany.mainnet.forEach(fixture => {
          it('should create many-to-1 P2PK transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const buf1 = bchjs.Script.pubKey.output.encode(pubKey1)
            const buf2 = bchjs.Script.pubKey.output.encode(pubKey2)
            const buf3 = bchjs.Script.pubKey.output.encode(pubKey3)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf2
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf3, sendAmount)
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.fromMany.testnet.forEach(fixture => {
          it('should create many-to-1 P2PK transaction on testnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const originalAmount = fixture.amount
            const txid = fixture.txHash
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const buf1 = bchjs.Script.pubKey.output.encode(pubKey1)
            const buf2 = bchjs.Script.pubKey.output.encode(pubKey2)
            const buf3 = bchjs.Script.pubKey.output.encode(pubKey3)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf2
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf3, sendAmount)
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
    })
  })

  describe('#P2PKH', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pkh.toOne.mainnet.forEach(fixture => {
          it('should create 1-to-1 P2PKH transaction on mainnet', () => {
            const hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv)
            const transactionBuilder = new bchjs.TransactionBuilder()
            const keyPair = bchjs.HDNode.toKeyPair(hdnode)
            const txHash = fixture.txHash
            // original amount of satoshis in vin
            const originalAmount = fixture.amount
            transactionBuilder.addInput(txHash, fixture.vout)
            // get byte count to calculate fee. paying 1 sat/byte
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 1 }
            )
            // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
            const sendAmount = originalAmount - byteCount
            // add output w/ address and amount to send
            let redeemScript
            transactionBuilder.addOutput(fixture.outputs[0], sendAmount)
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )

            // build tx
            const tx = transactionBuilder.build()
            // output rawhex
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pkh.toOne.testnet.forEach(fixture => {
          it('should create 1-to-1 P2PKH transaction on testnet', () => {
            const hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv, 'testnet')
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const keyPair = bchjs.HDNode.toKeyPair(hdnode)
            const txHash = fixture.txHash
            // original amount of satoshis in vin
            const originalAmount = fixture.amount
            transactionBuilder.addInput(txHash, fixture.vout)
            // get byte count to calculate fee. paying 1 sat/byte
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 1 }
            )
            // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
            const sendAmount = originalAmount - byteCount * 15
            // add output w/ address and amount to send
            let redeemScript
            transactionBuilder.addOutput(fixture.outputs[0], sendAmount)
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )

            // build tx
            const tx = transactionBuilder.build()
            // output rawhex
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
      /*
      describe("#RegTest", () => {
        fixtures.scripts.p2pkh.toOne.regtest.forEach(fixture => {
          it(`should create 1-to-1 P2PKH transaction on regtest`, () => {
            const hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv)
            const transactionBuilder = new bchjs.TransactionBuilder("regtest")
            const keyPair = bchjs.HDNode.toKeyPair(hdnode)
            const txHash = fixture.txHash
            // original amount of satoshis in vin
            const originalAmount = fixture.amount
            transactionBuilder.addInput(txHash, fixture.vout)
            // get byte count to calculate fee. paying 1 sat/byte
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 1 }
            )
            // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
            const sendAmount = originalAmount - byteCount * 15
            // add output w/ address and amount to send
            let redeemScript
            transactionBuilder.addOutput(fixture.outputs[0], sendAmount)
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )

            // build tx
            const tx = transactionBuilder.build()
            // output rawhex
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
      */
    })

    describe('#toMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pkh.toMany.mainnet.forEach(fixture => {
          it('should create 1-to-2 P2PKH transaction on mainnet', () => {
            const hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv)
            const transactionBuilder = new bchjs.TransactionBuilder()
            const keyPair = bchjs.HDNode.toKeyPair(hdnode)
            const txHash = fixture.txHash
            // original amount of satoshis in vin
            const originalAmount = fixture.amount
            transactionBuilder.addInput(txHash, fixture.vout)
            // get byte count to calculate fee. paying 1 sat/byte
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 2 }
            )
            // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
            const sendAmount = originalAmount - byteCount
            // add output w/ address and amount to send
            transactionBuilder.addOutput(
              fixture.outputs[0],
              Math.floor(sendAmount / 2)
            )
            transactionBuilder.addOutput(
              fixture.outputs[1],
              Math.floor(sendAmount / 2)
            )
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            // build tx
            const tx = transactionBuilder.build()
            // output rawhex
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pkh.toMany.testnet.forEach(fixture => {
          // TODO pass in tesnet network config
          it('should create 1-to-2 P2PKH transaction on testnet', () => {
            const hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv)
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const keyPair = bchjs.HDNode.toKeyPair(hdnode)
            const txHash = fixture.txHash
            // original amount of satoshis in vin
            const originalAmount = fixture.amount
            transactionBuilder.addInput(txHash, fixture.vout)
            // get byte count to calculate fee. paying 1 sat/byte
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 2 }
            )
            // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
            const sendAmount = originalAmount - byteCount * 15
            // add output w/ address and amount to send
            transactionBuilder.addOutput(
              fixture.outputs[0],
              Math.floor(sendAmount / 2)
            )
            transactionBuilder.addOutput(
              fixture.outputs[1],
              Math.floor(sendAmount / 2)
            )
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            // build tx
            const tx = transactionBuilder.build()
            // output rawhex
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
      /*
      describe("#RegTest", () => {
        fixtures.scripts.p2pkh.toMany.regtest.forEach(fixture => {
          // TODO pass in tesnet network config
          it(`should create 1-to-2 P2PKH transaction on regtest`, () => {
            const hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv)
            const transactionBuilder = new bchjs.TransactionBuilder("regtest")
            const keyPair = bchjs.HDNode.toKeyPair(hdnode)
            const txHash = fixture.txHash
            // original amount of satoshis in vin
            const originalAmount = fixture.amount
            transactionBuilder.addInput(txHash, fixture.vout)
            // get byte count to calculate fee. paying 1 sat/byte
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 1 },
              { P2PKH: 2 }
            )
            // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
            const sendAmount = originalAmount - byteCount * 15
            // add output w/ address and amount to send
            transactionBuilder.addOutput(
              fixture.outputs[0],
              Math.floor(sendAmount / 2)
            )
            transactionBuilder.addOutput(
              fixture.outputs[1],
              Math.floor(sendAmount / 2)
            )
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            // build tx
            const tx = transactionBuilder.build()
            // output rawhex
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      }) */
    })

    describe('#manyToMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pkh.manyToMany.mainnet.forEach(fixture => {
          it('should create 2-to-2 P2PKH transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txHash = fixture.txHash
            const originalAmount = fixture.amounts[0] + fixture.amounts[1]
            transactionBuilder.addInput(txHash, 0)
            transactionBuilder.addInput(txHash, 1)
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 2 },
              { P2PKH: 2 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(
              fixture.outputs[0],
              Math.floor(sendAmount / 2)
            )
            transactionBuilder.addOutput(
              fixture.outputs[1],
              Math.floor(sendAmount / 2)
            )
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[0]
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[1]
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pkh.manyToMany.testnet.forEach(fixture => {
          it('should create 2-to-2 P2PKH transaction on testnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const txHash = fixture.txHash
            const originalAmount = fixture.amounts[0] + fixture.amounts[1]
            transactionBuilder.addInput(txHash, 0)
            transactionBuilder.addInput(txHash, 1)
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 2 },
              { P2PKH: 2 }
            )
            const sendAmount = originalAmount - byteCount * 15
            transactionBuilder.addOutput(
              fixture.outputs[0],
              Math.floor(sendAmount / 2)
            )
            transactionBuilder.addOutput(
              fixture.outputs[1],
              Math.floor(sendAmount / 2)
            )
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[0]
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[1]
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
      /*
      describe("#RegTest", () => {
        fixtures.scripts.p2pkh.manyToMany.regtest.forEach(fixture => {
          it(`should create 2-to-2 P2PKH transaction on regtest`, () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const transactionBuilder = new bchjs.TransactionBuilder("regtest")
            const txHash = fixture.txHash
            const originalAmount = fixture.amounts[0] + fixture.amounts[1]
            transactionBuilder.addInput(txHash, 0)
            transactionBuilder.addInput(txHash, 1)
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 2 },
              { P2PKH: 2 }
            )
            const sendAmount = originalAmount - byteCount * 15
            transactionBuilder.addOutput(
              fixture.outputs[0],
              Math.floor(sendAmount / 2)
            )
            transactionBuilder.addOutput(
              fixture.outputs[1],
              Math.floor(sendAmount / 2)
            )
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[0]
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[1]
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
      */
    })

    describe('#fromMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pkh.fromMany.mainnet.forEach(fixture => {
          it('should create 2-to-1 P2PKH transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txHash = fixture.txHash
            const originalAmount = fixture.amounts[0] + fixture.amounts[1]
            transactionBuilder.addInput(txHash, 0)
            transactionBuilder.addInput(txHash, 1)
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 2 },
              { P2PKH: 1 }
            )
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(fixture.outputs[0], sendAmount)
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[0]
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[1]
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      describe('#Testnet', () => {
        fixtures.scripts.p2pkh.fromMany.testnet.forEach(fixture => {
          it('should create 2-to-1 P2PKH transaction on testnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const transactionBuilder = new bchjs.TransactionBuilder('testnet')
            const txHash = fixture.txHash
            const originalAmount = fixture.amounts[0] + fixture.amounts[1]
            transactionBuilder.addInput(txHash, 0)
            transactionBuilder.addInput(txHash, 1)
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 2 },
              { P2PKH: 1 }
            )
            const sendAmount = originalAmount - byteCount * 15
            transactionBuilder.addOutput(fixture.outputs[0], sendAmount)
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[0]
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[1]
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
      /*
      describe("#RegTest", () => {
        fixtures.scripts.p2pkh.fromMany.regtest.forEach(fixture => {
          it(`should create 2-to-1 P2PKH transaction on regtest`, () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const transactionBuilder = new bchjs.TransactionBuilder("regtest")
            const txHash = fixture.txHash
            const originalAmount = fixture.amounts[0] + fixture.amounts[1]
            transactionBuilder.addInput(txHash, 0)
            transactionBuilder.addInput(txHash, 1)
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 2 },
              { P2PKH: 1 }
            )
            const sendAmount = originalAmount - byteCount * 15
            transactionBuilder.addOutput(fixture.outputs[0], sendAmount)
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            let redeemScript
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[0]
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              fixture.amounts[1]
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })
      */
    })
  })

  describe('#op_return', () => {
    describe('#Mainnet', () => {
      fixtures.nulldata.mainnet.forEach(fixture => {
        it('should create transaction w/ OP_RETURN output on mainnet', () => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const transactionBuilder = new bchjs.TransactionBuilder()
          const txHash = fixture.txHash
          const originalAmount = fixture.amount
          transactionBuilder.addInput(txHash, 0)
          const byteCount = bchjs.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 5 }
          )
          const sendAmount = originalAmount - byteCount
          transactionBuilder.addOutput(fixture.output, sendAmount)
          const data = fixture.data
          const buf = bchjs.Script.nullData.output.encode(
            Buffer.from(data, 'ascii')
          )
          transactionBuilder.addOutput(buf, 0)
          const keyPair = bchjs.HDNode.toKeyPair(node)
          let redeemScript
          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            fixture.amount
          )
          const tx = transactionBuilder.build()
          const hex = tx.toHex()
          assert.strictEqual(hex, fixture.hex)
        })
      })
    })

    describe('#Testnet', () => {
      fixtures.nulldata.testnet.forEach(fixture => {
        it('should create transaction w/ OP_RETURN output on testnet', () => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const transactionBuilder = new bchjs.TransactionBuilder('testnet')
          const txHash = fixture.txHash
          const originalAmount = fixture.amount
          transactionBuilder.addInput(txHash, 0)
          const byteCount = bchjs.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 5 }
          )
          const sendAmount = originalAmount - byteCount
          transactionBuilder.addOutput(fixture.output, sendAmount)
          const data = fixture.data
          const buf = bchjs.Script.nullData.output.encode(
            Buffer.from(data, 'ascii')
          )
          transactionBuilder.addOutput(buf, 0)
          const keyPair = bchjs.HDNode.toKeyPair(node)
          let redeemScript
          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            fixture.amount
          )
          const tx = transactionBuilder.build()
          const hex = tx.toHex()
          assert.strictEqual(hex, fixture.hex)
        })
      })
    })
    /*
    describe("#RegTest", () => {
      fixtures.nulldata.regtest.forEach(fixture => {
        it(`should create transaction w/ OP_RETURN output on regtest`, () => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const transactionBuilder = new bchjs.TransactionBuilder("regtest")
          const txHash = fixture.txHash
          const originalAmount = fixture.amount
          transactionBuilder.addInput(txHash, 0)
          const byteCount = bchjs.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 5 }
          )
          const sendAmount = originalAmount - byteCount
          transactionBuilder.addOutput(fixture.output, sendAmount)
          const data = fixture.data
          const buf = bchjs.Script.nullData.output.encode(
            Buffer.from(data, "ascii")
          )
          transactionBuilder.addOutput(buf, 0)
          const keyPair = bchjs.HDNode.toKeyPair(node)
          let redeemScript
          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            fixture.amount
          )
          const tx = transactionBuilder.build()
          const hex = tx.toHex()
          assert.strictEqual(hex, fixture.hex)
        })
      })
    })
    */
  })

  describe('#P2MS', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.toOne.mainnet.forEach(fixture => {
          it('should create 1-to-1 1-of-2 P2MS transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const node4 = bchjs.HDNode.fromXPriv(fixture.xprivs[3])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const buf1 = bchjs.Script.multisig.output.encode(1, [
              pubKey1,
              pubKey2
            ])
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const pubKey4 = bchjs.HDNode.toPublicKey(node4)
            const buf2 = bchjs.Script.multisig.output.encode(1, [
              pubKey3,
              pubKey4
            ])
            const sendAmount = originalAmount - byteCount
            transactionBuilder.addOutput(buf2, sendAmount)
            let redeemScript
            const keyPair = bchjs.HDNode.toKeyPair(node1)
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      // describe('#Testnet', () => {
      //   fixtures.scripts.p2ms.toOne.testnet.forEach((fixture) => {
      //     it(`should create 1-to-1 P2MS transaction on testnet`, () => {
      //       let hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv, 'testnet');
      //       let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //       let keyPair = bchjs.HDNode.toKeyPair(hdnode);
      //       let txHash = fixture.txHash;
      //       // original amount of satoshis in vin
      //       let originalAmount = fixture.amount;
      //       transactionBuilder.addInput(txHash, fixture.vout);
      //       // get byte count to calculate fee. paying 1 sat/byte
      //       let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
      //       // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      //       let sendAmount = originalAmount - (byteCount * 15);
      //       // add output w/ address and amount to send
      //       let redeemScript
      //       transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
      //       transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
      //
      //       // build tx
      //       let tx = transactionBuilder.build();
      //       // output rawhex
      //       let hex = tx.toHex();
      //       assert.strictEqual(hex, fixture.hex);
      //     });
      //   });
      // });
    })

    describe('#toMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.toMany.mainnet.forEach(fixture => {
          it('should create 1-to-2 P2MS transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const node4 = bchjs.HDNode.fromXPriv(fixture.xprivs[3])
            const node5 = bchjs.HDNode.fromXPriv(fixture.xprivs[4])
            const node6 = bchjs.HDNode.fromXPriv(fixture.xprivs[5])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const buf1 = bchjs.Script.multisig.output.encode(1, [
              pubKey1,
              pubKey2
            ])
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const pubKey4 = bchjs.HDNode.toPublicKey(node4)
            const buf2 = bchjs.Script.multisig.output.encode(1, [
              pubKey3,
              pubKey4
            ])
            transactionBuilder.addOutput(buf2, Math.floor(sendAmount / 2))
            const pubKey5 = bchjs.HDNode.toPublicKey(node5)
            const pubKey6 = bchjs.HDNode.toPublicKey(node6)
            const buf3 = bchjs.Script.multisig.output.encode(1, [
              pubKey5,
              pubKey6
            ])
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2))
            let redeemScript
            const keyPair = bchjs.HDNode.toKeyPair(node1)
            transactionBuilder.sign(
              0,
              keyPair,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      //   describe('#Testnet', () => {
      //     fixtures.scripts.p2ms.toMany.testnet.forEach((fixture) => {
      //       // TODO pass in tesnet network config
      //       it(`should create 1-to-2 P2MS transaction on testnet`, () => {
      //         let hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv);
      //         let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //         let keyPair = bchjs.HDNode.toKeyPair(hdnode);
      //         let txHash = fixture.txHash;
      //         // original amount of satoshis in vin
      //         let originalAmount = fixture.amount;
      //         transactionBuilder.addInput(txHash, fixture.vout);
      //         // get byte count to calculate fee. paying 1 sat/byte
      //         let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
      //         // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      //         let sendAmount = originalAmount - (byteCount * 15);
      //         // add output w/ address and amount to send
      //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
      //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
      //         let redeemScript
      //         transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
      //         // build tx
      //         let tx = transactionBuilder.build();
      //         // output rawhex
      //         let hex = tx.toHex();
      //         assert.strictEqual(hex, fixture.hex);
      //       });
      //     });
      //   });
    })

    describe('#manyToMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.manyToMany.mainnet.forEach(fixture => {
          it('should create 2-to-2 P2MS transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const node4 = bchjs.HDNode.fromXPriv(fixture.xprivs[3])
            const node5 = bchjs.HDNode.fromXPriv(fixture.xprivs[4])
            const node6 = bchjs.HDNode.fromXPriv(fixture.xprivs[5])
            const node7 = bchjs.HDNode.fromXPriv(fixture.xprivs[6])
            const node8 = bchjs.HDNode.fromXPriv(fixture.xprivs[7])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const buf1 = bchjs.Script.multisig.output.encode(1, [
              pubKey1,
              pubKey2
            ])
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const pubKey4 = bchjs.HDNode.toPublicKey(node4)
            const buf2 = bchjs.Script.multisig.output.encode(1, [
              pubKey3,
              pubKey4
            ])
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf2
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            const pubKey5 = bchjs.HDNode.toPublicKey(node5)
            const pubKey6 = bchjs.HDNode.toPublicKey(node6)
            const buf3 = bchjs.Script.multisig.output.encode(1, [
              pubKey5,
              pubKey6
            ])
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2))
            const pubKey7 = bchjs.HDNode.toPublicKey(node7)
            const pubKey8 = bchjs.HDNode.toPublicKey(node8)
            const buf4 = bchjs.Script.multisig.output.encode(1, [
              pubKey7,
              pubKey8
            ])
            transactionBuilder.addOutput(buf4, Math.floor(sendAmount / 2))
            let redeemScript
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node3)
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      //   describe('#Testnet', () => {
      //     fixtures.scripts.p2ms.manyToMany.testnet.forEach((fixture) => {
      //       it(`should create 2-to-2 P2MS transaction on testnet`, () => {
      //         let node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0]);
      //         let node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1]);
      //         let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //         let txHash = fixture.txHash;
      //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
      //         transactionBuilder.addInput(txHash, 0);
      //         transactionBuilder.addInput(txHash, 1);
      //         let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
      //         let sendAmount = originalAmount - (byteCount * 15);
      //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
      //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
      //         let keyPair1 = bchjs.HDNode.toKeyPair(node1);
      //         let keyPair2 = bchjs.HDNode.toKeyPair(node2);
      //         let redeemScript;
      //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
      //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
      //         let tx = transactionBuilder.build();
      //         let hex = tx.toHex();
      //         assert.strictEqual(hex, fixture.hex);
      //       });
      //     });
      //   });
    })

    describe('#fromMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.fromMany.mainnet.forEach(fixture => {
          it('should create 2-to-1 P2MS transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const node4 = bchjs.HDNode.fromXPriv(fixture.xprivs[3])
            const node5 = bchjs.HDNode.fromXPriv(fixture.xprivs[4])
            const node6 = bchjs.HDNode.fromXPriv(fixture.xprivs[5])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const pubKey1 = bchjs.HDNode.toPublicKey(node1)
            const pubKey2 = bchjs.HDNode.toPublicKey(node2)
            const buf1 = bchjs.Script.multisig.output.encode(1, [
              pubKey1,
              pubKey2
            ])
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf1
            )
            const pubKey3 = bchjs.HDNode.toPublicKey(node3)
            const pubKey4 = bchjs.HDNode.toPublicKey(node4)
            const buf2 = bchjs.Script.multisig.output.encode(1, [
              pubKey3,
              pubKey4
            ])
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              buf2
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 3 }
            )
            const sendAmount = originalAmount - byteCount
            const pubKey5 = bchjs.HDNode.toPublicKey(node5)
            const pubKey6 = bchjs.HDNode.toPublicKey(node6)
            const buf3 = bchjs.Script.multisig.output.encode(1, [
              pubKey5,
              pubKey6
            ])
            transactionBuilder.addOutput(buf3, sendAmount)
            let redeemScript
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node3)
            transactionBuilder.sign(
              0,
              keyPair1,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              redeemScript,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      //   describe('#Testnet', () => {
      //     fixtures.scripts.p2ms.fromMany.testnet.forEach((fixture) => {
      //       it(`should create 2-to-1 P2MS transaction on testnet`, () => {
      //         let node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0]);
      //         let node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1]);
      //         let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //         let txHash = fixture.txHash;
      //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
      //         transactionBuilder.addInput(txHash, 0);
      //         transactionBuilder.addInput(txHash, 1);
      //         let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
      //         let sendAmount = originalAmount - (byteCount * 15);
      //         transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
      //         let keyPair1 = bchjs.HDNode.toKeyPair(node1);
      //         let keyPair2 = bchjs.HDNode.toKeyPair(node2);
      //         let redeemScript;
      //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
      //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
      //         let tx = transactionBuilder.build();
      //         let hex = tx.toHex();
      //         assert.strictEqual(hex, fixture.hex);
      //       });
      //     });
      //   });
    })
  })

  describe('#P2SH', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.toOne.mainnet.forEach(fixture => {
          it('should create 1-to-1 P2SH transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const identifier1 = bchjs.HDNode.toIdentifier(node1)
            const buf1 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier1,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash1 = bchjs.Crypto.hash160(buf1)
            const data1 = bchjs.Script.scriptHash.output.encode(scriptHash1)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              data1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 2 },
              { P2PKH: 1 }
            )
            const sendAmount = originalAmount - byteCount
            const identifier2 = bchjs.HDNode.toIdentifier(node2)
            const buf2 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier2,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])

            const scriptHash2 = bchjs.Crypto.hash160(buf2)
            const data2 = bchjs.Script.scriptHash.output.encode(scriptHash2)
            transactionBuilder.addOutput(data2, sendAmount)
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            transactionBuilder.sign(
              0,
              keyPair1,
              buf1,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      // describe('#Testnet', () => {
      //   fixtures.scripts.p2sh.toOne.testnet.forEach((fixture) => {
      //     it(`should create 1-to-1 P2SH transaction on testnet`, () => {
      //       let hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv, 'testnet');
      //       let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //       let keyPair = bchjs.HDNode.toKeyPair(hdnode);
      //       let txHash = fixture.txHash;
      //       // original amount of satoshis in vin
      //       let originalAmount = fixture.amount;
      //       transactionBuilder.addInput(txHash, fixture.vout);
      //       // get byte count to calculate fee. paying 1 sat/byte
      //       let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
      //       // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      //       let sendAmount = originalAmount - (byteCount * 15);
      //       // add output w/ address and amount to send
      //       let redeemScript
      //       transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
      //       transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
      //
      //       // build tx
      //       let tx = transactionBuilder.build();
      //       // output rawhex
      //       let hex = tx.toHex();
      //       assert.strictEqual(hex, fixture.hex);
      //     });
      //   });
      // });
    })

    describe('#toMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.toMany.mainnet.forEach(fixture => {
          it('should create 1-to-2 P2SH transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const identifier1 = bchjs.HDNode.toIdentifier(node1)
            const buf1 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier1,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash1 = bchjs.Crypto.hash160(buf1)
            const data1 = bchjs.Script.scriptHash.output.encode(scriptHash1)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              data1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 2 }
            )
            const sendAmount = originalAmount - byteCount
            const identifier2 = bchjs.HDNode.toIdentifier(node2)
            const buf2 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier2,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash2 = bchjs.Crypto.hash160(buf2)
            const data2 = bchjs.Script.scriptHash.output.encode(scriptHash2)
            transactionBuilder.addOutput(data2, Math.floor(sendAmount / 2))
            const identifier3 = bchjs.HDNode.toIdentifier(node3)
            const buf3 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier3,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash3 = bchjs.Crypto.hash160(buf3)
            const data3 = bchjs.Script.scriptHash.output.encode(scriptHash3)
            transactionBuilder.addOutput(data3, Math.floor(sendAmount / 2))
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            transactionBuilder.sign(
              0,
              keyPair1,
              buf1,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      //   describe('#Testnet', () => {
      //     fixtures.scripts.p2sh.toMany.testnet.forEach((fixture) => {
      //       // TODO pass in tesnet network config
      //       it(`should create 1-to-2 P2SH transaction on testnet`, () => {
      //         let hdnode = bchjs.HDNode.fromXPriv(fixture.xpriv);
      //         let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //         let keyPair = bchjs.HDNode.toKeyPair(hdnode);
      //         let txHash = fixture.txHash;
      //         // original amount of satoshis in vin
      //         let originalAmount = fixture.amount;
      //         transactionBuilder.addInput(txHash, fixture.vout);
      //         // get byte count to calculate fee. paying 1 sat/byte
      //         let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
      //         // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      //         let sendAmount = originalAmount - (byteCount * 15);
      //         // add output w/ address and amount to send
      //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
      //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
      //         let redeemScript
      //         transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
      //         // build tx
      //         let tx = transactionBuilder.build();
      //         // output rawhex
      //         let hex = tx.toHex();
      //         assert.strictEqual(hex, fixture.hex);
      //       });
      //     });
      //   });
    })

    describe('#manyToMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.manyToMany.mainnet.forEach(fixture => {
          it('should create 2-to-2 P2SH transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const node4 = bchjs.HDNode.fromXPriv(fixture.xprivs[3])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const identifier1 = bchjs.HDNode.toIdentifier(node1)
            const buf1 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier1,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash1 = bchjs.Crypto.hash160(buf1)
            const data1 = bchjs.Script.scriptHash.output.encode(scriptHash1)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              data1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 5 },
              { P2PKH: 5 }
            )
            const sendAmount = originalAmount - byteCount
            const identifier2 = bchjs.HDNode.toIdentifier(node2)
            const buf2 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier2,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash2 = bchjs.Crypto.hash160(buf2)
            const data2 = bchjs.Script.scriptHash.output.encode(scriptHash2)
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              data2
            )
            const identifier3 = bchjs.HDNode.toIdentifier(node3)
            const buf3 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier3,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash3 = bchjs.Crypto.hash160(buf3)
            const data3 = bchjs.Script.scriptHash.output.encode(scriptHash3)
            transactionBuilder.addOutput(data3, Math.floor(sendAmount / 2))
            const identifier4 = bchjs.HDNode.toIdentifier(node4)
            const buf4 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier4,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash4 = bchjs.Crypto.hash160(buf4)
            const data4 = bchjs.Script.scriptHash.output.encode(scriptHash4)
            transactionBuilder.addOutput(data4, Math.floor(sendAmount / 2))
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            transactionBuilder.sign(
              0,
              keyPair1,
              buf1,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              buf2,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      //   describe('#Testnet', () => {
      //     fixtures.scripts.p2sh.manyToMany.testnet.forEach((fixture) => {
      //       it(`should create 2-to-2 P2SH transaction on testnet`, () => {
      //         let node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0]);
      //         let node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1]);
      //         let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //         let txHash = fixture.txHash;
      //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
      //         transactionBuilder.addInput(txHash, 0);
      //         transactionBuilder.addInput(txHash, 1);
      //         let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
      //         let sendAmount = originalAmount - (byteCount * 15);
      //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
      //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
      //         let keyPair1 = bchjs.HDNode.toKeyPair(node1);
      //         let keyPair2 = bchjs.HDNode.toKeyPair(node2);
      //         let redeemScript;
      //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
      //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
      //         let tx = transactionBuilder.build();
      //         let hex = tx.toHex();
      //         assert.strictEqual(hex, fixture.hex);
      //       });
      //     });
      //   });
    })

    describe('#fromMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.fromMany.mainnet.forEach(fixture => {
          it('should create 2-to-1 P2SH transaction on mainnet', () => {
            const node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0])
            const node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1])
            const node3 = bchjs.HDNode.fromXPriv(fixture.xprivs[2])
            const transactionBuilder = new bchjs.TransactionBuilder()
            const txid = fixture.txHash
            const originalAmount = fixture.amount
            const identifier1 = bchjs.HDNode.toIdentifier(node1)
            const buf1 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier1,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash1 = bchjs.Crypto.hash160(buf1)
            const data1 = bchjs.Script.scriptHash.output.encode(scriptHash1)
            transactionBuilder.addInput(
              txid,
              0,
              transactionBuilder.DEFAULT_SEQUENCE,
              data1
            )
            const byteCount = bchjs.BitcoinCash.getByteCount(
              { P2PKH: 3 },
              { P2PKH: 2 }
            )
            const sendAmount = originalAmount - byteCount
            const identifier2 = bchjs.HDNode.toIdentifier(node2)
            const buf2 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier2,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash2 = bchjs.Crypto.hash160(buf2)
            const data2 = bchjs.Script.scriptHash.output.encode(scriptHash2)
            transactionBuilder.addInput(
              txid,
              1,
              transactionBuilder.DEFAULT_SEQUENCE,
              data2
            )
            const identifier3 = bchjs.HDNode.toIdentifier(node3)
            const buf3 = bchjs.Script.encode([
              bchjs.Script.opcodes.OP_DUP,
              bchjs.Script.opcodes.OP_HASH160,
              identifier3,
              bchjs.Script.opcodes.OP_EQUALVERIFY,
              bchjs.Script.opcodes.OP_CHECKSIG
            ])
            const scriptHash3 = bchjs.Crypto.hash160(buf3)
            const data3 = bchjs.Script.scriptHash.output.encode(scriptHash3)
            transactionBuilder.addOutput(data3, sendAmount)
            const keyPair1 = bchjs.HDNode.toKeyPair(node1)
            const keyPair2 = bchjs.HDNode.toKeyPair(node2)
            transactionBuilder.sign(
              0,
              keyPair1,
              buf1,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            transactionBuilder.sign(
              1,
              keyPair2,
              buf2,
              transactionBuilder.hashTypes.SIGHASH_ALL,
              originalAmount / 2
            )
            const tx = transactionBuilder.build()
            const hex = tx.toHex()
            assert.strictEqual(hex, fixture.hex)
          })
        })
      })

      //   describe('#Testnet', () => {
      //     fixtures.scripts.p2sh.fromMany.testnet.forEach((fixture) => {
      //       it(`should create 2-to-1 P2SH transaction on testnet`, () => {
      //         let node1 = bchjs.HDNode.fromXPriv(fixture.xprivs[0]);
      //         let node2 = bchjs.HDNode.fromXPriv(fixture.xprivs[1]);
      //         let transactionBuilder = new bchjs.TransactionBuilder('testnet');
      //         let txHash = fixture.txHash;
      //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
      //         transactionBuilder.addInput(txHash, 0);
      //         transactionBuilder.addInput(txHash, 1);
      //         let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
      //         let sendAmount = originalAmount - (byteCount * 15);
      //         transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
      //         let keyPair1 = bchjs.HDNode.toKeyPair(node1);
      //         let keyPair2 = bchjs.HDNode.toKeyPair(node2);
      //         let redeemScript;
      //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
      //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
      //         let tx = transactionBuilder.build();
      //         let hex = tx.toHex();
      //         assert.strictEqual(hex, fixture.hex);
      //       });
      //     });
      //   });
    })
  })

  describe('#op_return', () => {
    describe('#Mainnet', () => {
      fixtures.nulldata.mainnet.forEach(fixture => {
        it('should create transaction w/ OP_RETURN output on mainnet', () => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const transactionBuilder = new bchjs.TransactionBuilder()
          const txHash = fixture.txHash
          const originalAmount = fixture.amount
          transactionBuilder.addInput(txHash, 0)
          const byteCount = bchjs.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 5 }
          )
          const sendAmount = originalAmount - byteCount
          transactionBuilder.addOutput(fixture.output, sendAmount)
          const data = fixture.data
          const buf = bchjs.Script.nullData.output.encode(
            Buffer.from(data, 'ascii')
          )
          transactionBuilder.addOutput(buf, 0)
          const keyPair = bchjs.HDNode.toKeyPair(node)
          let redeemScript
          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            fixture.amount
          )
          const tx = transactionBuilder.build()
          const hex = tx.toHex()
          assert.strictEqual(hex, fixture.hex)
        })
      })
    })

    describe('#Testnet', () => {
      fixtures.nulldata.testnet.forEach(fixture => {
        it('should create transaction w/ OP_RETURN output on testnet', () => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const transactionBuilder = new bchjs.TransactionBuilder('testnet')
          const txHash = fixture.txHash
          const originalAmount = fixture.amount
          transactionBuilder.addInput(txHash, 0)
          const byteCount = bchjs.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 5 }
          )
          const sendAmount = originalAmount - byteCount
          transactionBuilder.addOutput(fixture.output, sendAmount)
          const data = fixture.data
          const buf = bchjs.Script.nullData.output.encode(
            Buffer.from(data, 'ascii')
          )
          transactionBuilder.addOutput(buf, 0)
          const keyPair = bchjs.HDNode.toKeyPair(node)
          let redeemScript
          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            fixture.amount
          )
          const tx = transactionBuilder.build()
          const hex = tx.toHex()
          assert.strictEqual(hex, fixture.hex)
        })
      })
    })
    /*
    describe("#RegTest", () => {
      fixtures.nulldata.regtest.forEach(fixture => {
        it(`should create transaction w/ OP_RETURN output on regtest`, () => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const transactionBuilder = new bchjs.TransactionBuilder("regtest")
          const txHash = fixture.txHash
          const originalAmount = fixture.amount
          transactionBuilder.addInput(txHash, 0)
          const byteCount = bchjs.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 5 }
          )
          const sendAmount = originalAmount - byteCount
          transactionBuilder.addOutput(fixture.output, sendAmount)
          const data = fixture.data
          const buf = bchjs.Script.nullData.output.encode(
            Buffer.from(data, "ascii")
          )
          transactionBuilder.addOutput(buf, 0)
          const keyPair = bchjs.HDNode.toKeyPair(node)
          let redeemScript
          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            fixture.amount
          )
          const tx = transactionBuilder.build()
          const hex = tx.toHex()
          assert.strictEqual(hex, fixture.hex)
        })
      })
    })
*/
  })

  describe('#bip66', () => {
    fixtures.bip66.forEach(fixture => {
      it(`should bip66 encode as ${fixture.DER}`, () => {
        const transactionBuilder = new bchjs.TransactionBuilder()
        const r = Buffer.from(fixture.r, 'hex')
        const s = Buffer.from(fixture.s, 'hex')
        const DER = transactionBuilder.bip66.encode(r, s)
        assert.strictEqual(DER.toString('hex'), fixture.DER)
      })
    })

    fixtures.bip66.forEach(fixture => {
      it(`should bip66 decode ${fixture.DER}`, () => {
        const transactionBuilder = new bchjs.TransactionBuilder()
        const buffer = Buffer.from(fixture.DER, 'hex')
        const signature = transactionBuilder.bip66.decode(buffer)
        assert.strictEqual(signature.r.toString('hex'), fixture.r)
        assert.strictEqual(signature.s.toString('hex'), fixture.s)
      })
    })

    fixtures.bip66.forEach(fixture => {
      it(`should bip66 check ${fixture.DER}`, () => {
        const transactionBuilder = new bchjs.TransactionBuilder()
        const buffer = Buffer.from(fixture.DER, 'hex')
        assert.strictEqual(transactionBuilder.bip66.check(buffer), true)
      })
    })
  })

  describe('#bip68', () => {
    fixtures.bip68.encode.forEach(fixture => {
      it(`should bip68 encode as ${fixture.result}`, () => {
        const transactionBuilder = new bchjs.TransactionBuilder()
        const obj = {}
        obj[fixture.type] = fixture.value
        const encode = transactionBuilder.bip68.encode(obj)
        assert2.equal(encode, fixture.result)
      })
    })

    fixtures.bip68.decode.forEach(fixture => {
      it(`should bip68 decode ${fixture.result}`, () => {
        const transactionBuilder = new bchjs.TransactionBuilder()
        // const obj = {}
        const decode = transactionBuilder.bip68.decode(fixture.result)
        assert2.equal(Object.keys(decode)[0], fixture.type)
        assert2.equal(decode[Object.keys(decode)[0]], fixture.value)
      })
    })
  })

  describe('#LockTime', () => {
    describe('#Mainnet', () => {
      fixtures.locktime.mainnet.forEach(fixture => {
        it('should create transaction with nLockTime on mainnet', () => {
          const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
          const transactionBuilder = new bchjs.TransactionBuilder()

          const txHash = fixture.txHash
          const originalAmount = fixture.amount
          transactionBuilder.addInput(txHash, 0, 1)
          const byteCount = bchjs.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 1 }
          )
          const sendAmount = originalAmount - byteCount
          transactionBuilder.addOutput(fixture.output, sendAmount)
          const lockTime = fixture.lockTime
          transactionBuilder.setLockTime(lockTime)
          const keyPair = bchjs.HDNode.toKeyPair(node)
          let redeemScript
          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            fixture.amount
          )
          const tx = transactionBuilder.build()
          const hex = tx.toHex()
          assert.strictEqual(hex, fixture.hex)
        })
      })
    })
  })
})
