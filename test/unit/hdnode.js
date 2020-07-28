const fixtures = require("./fixtures/hdnode.json")
const slpFixtures = require("./fixtures/slp/address.json")
const assert = require("assert")
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()
const Buffer = require("safe-buffer").Buffer

describe("#HDNode", () => {
  describe("#fromSeed", () => {
    fixtures.fromSeed.forEach(mnemonic => {
      it(`should create an HDNode from root seed buffer`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        assert.notEqual(hdNode, null)
      })
    })
  })

  describe("#derive", () => {
    fixtures.derive.forEach(derive => {
      it(`should derive non hardened child HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(derive.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = bchjs.HDNode.derive(hdNode, 0)
        assert.equal(bchjs.HDNode.toXPub(childHDNode), derive.xpub)
        assert.equal(bchjs.HDNode.toXPriv(childHDNode), derive.xpriv)
      })
    })
  })

  describe("#deriveHardened", () => {
    fixtures.deriveHardened.forEach(derive => {
      it(`should derive hardened child HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(derive.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = bchjs.HDNode.deriveHardened(hdNode, 0)
        assert.equal(bchjs.HDNode.toXPub(childHDNode), derive.xpub)
        assert.equal(bchjs.HDNode.toXPriv(childHDNode), derive.xpriv)
      })
    })

    describe("derive BIP44 $BCH account", () => {
      fixtures.deriveBIP44.forEach(derive => {
        it(`should derive BIP44 $BCH account`, async () => {
          const rootSeedBuffer = await bchjs.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
          const purpose = bchjs.HDNode.deriveHardened(hdNode, 44)
          const coin = bchjs.HDNode.deriveHardened(purpose, 145)
          const childHDNode = bchjs.HDNode.deriveHardened(coin, 0)
          assert.equal(bchjs.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bchjs.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })
  })

  describe("#derivePath", () => {
    describe("derive non hardened Path", () => {
      fixtures.derivePath.forEach(derive => {
        it(`should derive non hardened child HDNode from path`, async () => {
          const rootSeedBuffer = await bchjs.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode = bchjs.HDNode.derivePath(hdNode, "0")
          assert.equal(bchjs.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bchjs.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })

    describe("derive hardened Path", () => {
      fixtures.deriveHardenedPath.forEach(derive => {
        it(`should derive hardened child HDNode from path`, async () => {
          const rootSeedBuffer = await bchjs.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode = bchjs.HDNode.derivePath(hdNode, "0'")
          assert.equal(bchjs.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bchjs.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })

    describe("derive BIP44 $BCH account", () => {
      fixtures.deriveBIP44.forEach(derive => {
        it(`should derive BIP44 $BCH account`, async () => {
          const rootSeedBuffer = await bchjs.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode = bchjs.HDNode.derivePath(hdNode, "44'/145'/0'")
          assert.equal(bchjs.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bchjs.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })
  })

  describe("#toLegacyAddress", () => {
    fixtures.toLegacyAddress.forEach(fixture => {
      it(`should get address ${fixture.address} from HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = bchjs.HDNode.derivePath(hdNode, "0")
        const addy = bchjs.HDNode.toLegacyAddress(childHDNode)
        assert.equal(addy, fixture.address)
      })
    })
  })

  describe("#toCashAddress", () => {
    fixtures.toCashAddress.forEach(fixture => {
      it(`should get address ${fixture.address} from HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = bchjs.HDNode.derivePath(hdNode, "0")
        const addy = bchjs.HDNode.toCashAddress(childHDNode)
        assert.equal(addy, fixture.address)
      })

      it(`should get address ${fixture.regtestAddress} from HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = bchjs.HDNode.derivePath(hdNode, "0")
        const addr = bchjs.HDNode.toCashAddress(childHDNode, true)
        assert.equal(addr, fixture.regtestAddress)
      })
    })
  })

  describe("#toWIF", () => {
    fixtures.toWIF.forEach(fixture => {
      it(`should get privateKeyWIF ${fixture.privateKeyWIF} from HDNode`, () => {
        const hdNode = bchjs.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(bchjs.HDNode.toWIF(hdNode), fixture.privateKeyWIF)
      })
    })
  })

  describe("#toXPub", () => {
    fixtures.toXPub.forEach(fixture => {
      it(`should create xpub ${fixture.xpub} from an HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const xpub = bchjs.HDNode.toXPub(hdNode)
        assert.equal(xpub, fixture.xpub)
      })
    })
  })

  describe("#toXPriv", () => {
    fixtures.toXPriv.forEach(fixture => {
      it(`should create xpriv ${fixture.xpriv} from an HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const xpriv = bchjs.HDNode.toXPriv(hdNode)
        assert.equal(xpriv, fixture.xpriv)
      })
    })
  })

  describe("#toKeyPair", () => {
    fixtures.toKeyPair.forEach(fixture => {
      it(`should get ECPair from an HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const keyPair = bchjs.HDNode.toKeyPair(hdNode)
        assert.equal(typeof keyPair, "object")
      })
    })
  })

  describe("#toPublicKey", () => {
    fixtures.toPublicKey.forEach(fixture => {
      it(`should create public key buffer from an HDNode`, async () => {
        const rootSeedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = bchjs.HDNode.fromSeed(rootSeedBuffer)
        const publicKeyBuffer = bchjs.HDNode.toPublicKey(hdNode)
        assert.equal(typeof publicKeyBuffer, "object")
      })
    })
  })

  describe("#fromXPriv", () => {
    fixtures.fromXPriv.forEach(fixture => {
      const hdNode = bchjs.HDNode.fromXPriv(fixture.xpriv)
      it(`should create HDNode from xpriv ${fixture.xpriv}`, () => {
        assert.notEqual(hdNode, null)
      })

      it(`should export xpriv ${fixture.xpriv}`, () => {
        assert.equal(bchjs.HDNode.toXPriv(hdNode), fixture.xpriv)
      })

      it(`should export xpub ${fixture.xpub}`, () => {
        assert.equal(bchjs.HDNode.toXPub(hdNode), fixture.xpub)
      })

      it(`should export legacy address ${fixture.legacy}`, () => {
        assert.equal(bchjs.HDNode.toLegacyAddress(hdNode), fixture.legacy)
      })

      it(`should export cashaddress ${fixture.cashaddress}`, () => {
        assert.equal(bchjs.HDNode.toCashAddress(hdNode), fixture.cashaddress)
      })

      it(`should export regtest cashaddress ${fixture.regtestaddress}`, () => {
        assert.equal(
          bchjs.HDNode.toCashAddress(hdNode, true),
          fixture.regtestaddress
        )
      })

      it(`should export privateKeyWIF ${fixture.privateKeyWIF}`, () => {
        assert.equal(bchjs.HDNode.toWIF(hdNode), fixture.privateKeyWIF)
      })
    })
  })

  describe("#fromXPub", () => {
    fixtures.fromXPub.forEach(fixture => {
      const hdNode = bchjs.HDNode.fromXPub(fixture.xpub)
      it(`should create HDNode from xpub ${fixture.xpub}`, () => {
        assert.notEqual(hdNode, null)
      })

      it(`should export xpub ${fixture.xpub}`, () => {
        assert.equal(bchjs.HDNode.toXPub(hdNode), fixture.xpub)
      })

      it(`should export legacy address ${fixture.legacy}`, () => {
        assert.equal(bchjs.HDNode.toLegacyAddress(hdNode), fixture.legacy)
      })

      it(`should export cashaddress ${fixture.cashaddress}`, () => {
        assert.equal(bchjs.HDNode.toCashAddress(hdNode), fixture.cashaddress)
      })

      it(`should export regtest cashaddress ${fixture.regtestaddress}`, () => {
        assert.equal(
          bchjs.HDNode.toCashAddress(hdNode, true),
          fixture.regtestaddress
        )
      })
    })
  })

  describe("#bip32", () => {
    describe("create accounts and addresses", () => {
      fixtures.accounts.forEach(async fixture => {
        const seedBuffer = await bchjs.Mnemonic.toSeed(fixture.mnemonic)
        console.log(`seedBuffer: ${seedBuffer.toString()}`)
        const hdNode = bchjs.HDNode.fromSeed(seedBuffer)
        const a = bchjs.HDNode.derivePath(hdNode, "0'")
        const external = bchjs.HDNode.derivePath(a, "0")
        const account = bchjs.HDNode.createAccount([external])

        it(`#createAccount`, () => {
          assert.notEqual(account, null)
        })

        describe("#getChainAddress", () => {
          const external1 = bchjs.Address.toCashAddress(
            account.getChainAddress(0)
          )
          it(`should create external change address ${external1}`, () => {
            assert.equal(external1, fixture.externals[0])
          })
        })

        describe("#nextChainAddress", () => {
          for (let i = 0; i < 4; i++) {
            const ex = bchjs.Address.toCashAddress(account.nextChainAddress(0))
            it(`should create external change address ${ex}`, () => {
              assert.equal(ex, fixture.externals[i + 1])
            })
          }
        })
      })
    })
  })

  describe("#sign", () => {
    fixtures.sign.forEach(fixture => {
      it(`should sign 32 byte hash buffer`, () => {
        const hdnode = bchjs.HDNode.fromXPriv(fixture.privateKeyWIF)
        const buf = Buffer.from(bchjs.Crypto.sha256(fixture.data), "hex")
        const signatureBuf = bchjs.HDNode.sign(hdnode, buf)
        assert.equal(typeof signatureBuf, "object")
      })
    })
  })

  describe("#verify", () => {
    fixtures.verify.forEach(fixture => {
      it(`should verify signed 32 byte hash buffer`, () => {
        const hdnode1 = bchjs.HDNode.fromXPriv(fixture.privateKeyWIF1)
        const buf = Buffer.from(bchjs.Crypto.sha256(fixture.data), "hex")
        const signature = bchjs.HDNode.sign(hdnode1, buf)
        const verify = bchjs.HDNode.verify(hdnode1, buf, signature)
        assert.equal(verify, true)
      })
    })
  })

  describe("#isPublic", () => {
    fixtures.isPublic.forEach(fixture => {
      it(`should verify hdnode is public`, () => {
        const node = bchjs.HDNode.fromXPub(fixture.xpub)
        assert.equal(bchjs.HDNode.isPublic(node), true)
      })
    })

    fixtures.isPublic.forEach(fixture => {
      it(`should verify hdnode is not public`, () => {
        const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(bchjs.HDNode.isPublic(node), false)
      })
    })
  })

  describe("#isPrivate", () => {
    fixtures.isPrivate.forEach(fixture => {
      it(`should verify hdnode is not private`, () => {
        const node = bchjs.HDNode.fromXPub(fixture.xpub)
        assert.equal(bchjs.HDNode.isPrivate(node), false)
      })
    })

    fixtures.isPrivate.forEach(fixture => {
      it(`should verify hdnode is private`, () => {
        const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(bchjs.HDNode.isPrivate(node), true)
      })
    })
  })

  describe("#toIdentifier", () => {
    fixtures.toIdentifier.forEach(fixture => {
      it(`should get identifier of hdnode`, () => {
        const node = bchjs.HDNode.fromXPriv(fixture.xpriv)
        const publicKeyBuffer = bchjs.HDNode.toPublicKey(node)
        const hash160 = bchjs.Crypto.hash160(publicKeyBuffer)
        const identifier = bchjs.HDNode.toIdentifier(node)
        assert.equal(identifier.toString("hex"), hash160.toString("hex"))
      })
    })
  })
})
