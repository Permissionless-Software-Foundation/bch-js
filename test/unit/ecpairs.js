const assert = require("assert")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

const Buffer = require("safe-buffer").Buffer

const fixtures = require("./fixtures/ecpair.json")

describe("#ECPair", () => {
  describe("#fromWIF", () => {
    fixtures.fromWIF.forEach(fixture => {
      it(`should create ECPair from WIF ${fixture.privateKeyWIF}`, () => {
        const ecpair = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, () => {
        const legacy = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(bchjs.HDNode.toLegacyAddress(legacy), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        const cashAddr = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(bchjs.HDNode.toCashAddress(cashAddr), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, () => {
        const cashAddr = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(
          bchjs.HDNode.toCashAddress(cashAddr, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toWIF", () => {
    fixtures.toWIF.forEach(fixture => {
      it(`should get WIF ${fixture.privateKeyWIF} from ECPair`, () => {
        const ecpair = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        const wif = bchjs.ECPair.toWIF(ecpair)
        assert.equal(wif, fixture.privateKeyWIF)
      })
    })
  })

  describe("#fromPublicKey", () => {
    fixtures.fromPublicKey.forEach(fixture => {
      it(`should create ECPair from public key buffer`, () => {
        const ecpair = bchjs.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, () => {
        const ecpair = bchjs.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(bchjs.HDNode.toLegacyAddress(ecpair), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        const ecpair = bchjs.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(bchjs.HDNode.toCashAddress(ecpair), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, () => {
        const ecpair = bchjs.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(
          bchjs.HDNode.toCashAddress(ecpair, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toPublicKey", () => {
    fixtures.toPublicKey.forEach(fixture => {
      it(`should create a public key buffer from an ECPair`, () => {
        const ecpair = bchjs.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        const pubkeyBuffer = bchjs.ECPair.toPublicKey(ecpair)
        assert.equal(typeof pubkeyBuffer, "object")
      })
    })
  })

  describe("#toLegacyAddress", () => {
    fixtures.toLegacyAddress.forEach(fixture => {
      it(`should create legacy address ${fixture.legacy} from an ECPair`, () => {
        const ecpair = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        const legacyAddress = bchjs.ECPair.toLegacyAddress(ecpair)
        assert.equal(legacyAddress, fixture.legacy)
      })
    })
  })

  describe("#toCashAddress", () => {
    fixtures.toCashAddress.forEach(fixture => {
      it(`should create cash address ${fixture.cashAddr} from an ECPair`, () => {
        const ecpair = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        const cashAddr = bchjs.ECPair.toCashAddress(ecpair)
        assert.equal(cashAddr, fixture.cashAddr)
      })
    })

    fixtures.toCashAddress.forEach(fixture => {
      it(`should create regtest cash address ${fixture.regtestAddr} from an ECPair`, () => {
        const ecpair = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        const regtestAddr = bchjs.ECPair.toCashAddress(ecpair, true)
        assert.equal(regtestAddr, fixture.regtestAddr)
      })
    })
  })

  describe("#sign", () => {
    fixtures.sign.forEach(fixture => {
      it(`should sign 32 byte hash buffer`, () => {
        const ecpair = bchjs.ECPair.fromWIF(fixture.privateKeyWIF)
        const buf = Buffer.from(bchjs.Crypto.sha256(fixture.data), "hex")
        const signatureBuf = bchjs.ECPair.sign(ecpair, buf)
        assert.equal(typeof signatureBuf, "object")
      })
    })
  })

  describe("#verify", () => {
    fixtures.verify.forEach(fixture => {
      it(`should verify signed 32 byte hash buffer`, () => {
        const ecpair1 = bchjs.ECPair.fromWIF(fixture.privateKeyWIF1)
        //const ecpair2 = bchjs.ECPair.fromWIF(fixture.privateKeyWIF2)
        const buf = Buffer.from(bchjs.Crypto.sha256(fixture.data), "hex")
        const signature = bchjs.ECPair.sign(ecpair1, buf)
        const verify = bchjs.ECPair.verify(ecpair1, buf, signature)
        assert.equal(verify, true)
      })
    })
  })
})
