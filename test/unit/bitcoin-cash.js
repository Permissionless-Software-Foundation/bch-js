const fixtures = require("./fixtures/bitcoincash.json")
const assert = require("assert")
const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

// TODO
// 1. generate testnet p2sh
// 2. generate cashaddr mainnet p2sh
// 3. generate cashaddr testnet p2sh
// 4. create bchjs fromBase58 method
//   * confirm xpub cannot generate WIF
//   * confirm xpriv can generate WIF
// 5. create fromXPriv method w/ tests and docs
// 1. mainnet
//   * confirm xpriv generates address
//   * confirm xpriv generates WIF
// 2. testnet
//   * confirm xpriv generates address
//   * confirm xpriv generates WIF
// 6. More error test cases.

describe("#BitcoinCash", () => {
  describe("price conversion", () => {
    describe("#toBitcoinCash", () => {
      fixtures.conversion.toBCH.satoshis.forEach(satoshi => {
        it(`should convert ${satoshi[0]} Satoshis to ${
          satoshi[1]
        } $BCH`, () => {
          assert.equal(bchjs.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1])
        })
      })

      fixtures.conversion.toBCH.strings.forEach(satoshi => {
        it(`should convert "${satoshi[0]}" Satoshis as a string to ${
          satoshi[1]
        } $BCH`, () => {
          assert.equal(bchjs.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1])
        })
      })

      fixtures.conversion.toBCH.not.forEach(bch => {
        it(`converts ${bch[0]} to Bitcoin Cash, not to ${
          bch[1]
        } Satoshi`, () => {
          assert.notEqual(bchjs.BitcoinCash.toBitcoinCash(bch[0]), bch[1])
        })
      })

      fixtures.conversion.toBCH.rounding.forEach(satoshi => {
        it(`rounding ${satoshi[0]} to ${satoshi[1]} $BCH`, () => {
          assert.equal(bchjs.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1])
        })
      })
    })

    describe("#toSatoshi", () => {
      fixtures.conversion.toSatoshi.bch.forEach(bch => {
        it(`should convert ${bch[0]} $BCH to ${bch[1]} Satoshis`, () => {
          assert.equal(bchjs.BitcoinCash.toSatoshi(bch[0]), bch[1])
        })
      })

      fixtures.conversion.toSatoshi.strings.forEach(bch => {
        it(`should convert "${bch[0]}" $BCH as a string to ${
          bch[1]
        } Satoshis`, () => {
          assert.equal(bchjs.BitcoinCash.toSatoshi(bch[0]), bch[1])
        })
      })

      fixtures.conversion.toSatoshi.not.forEach(satoshi => {
        it(`converts ${satoshi[0]} to Satoshi, not to ${
          satoshi[1]
        } Bitcoin Cash`, () => {
          assert.notEqual(bchjs.BitcoinCash.toSatoshi(satoshi[0]), satoshi[1])
        })
      })

      fixtures.conversion.toSatoshi.rounding.forEach(bch => {
        it(`rounding ${bch[0]} to ${bch[1]} Satoshi`, () => {
          assert.equal(bchjs.BitcoinCash.toSatoshi(bch[0]), bch[1])
        })
      })
    })

    describe("#satsToBits", () => {
      fixtures.conversion.satsToBits.bch.forEach(bch => {
        it(`should convert ${bch[0]} BCH to ${bch[1]} bits`, () => {
          assert.equal(
            bchjs.BitcoinCash.satsToBits(bchjs.BitcoinCash.toSatoshi(bch[0])),
            bch[1]
          )
        })
      })

      fixtures.conversion.satsToBits.strings.forEach(bch => {
        it(`should convert "${bch[0]}" BCH as a string to ${
          bch[1]
        } bits`, () => {
          assert.equal(
            bchjs.BitcoinCash.satsToBits(bchjs.BitcoinCash.toSatoshi(bch[0])),
            bch[1]
          )
        })
      })
    })
    //
    // describe('#satsFromBits', () => {
    //   fixtures.conversion.satsFromBits.bch.forEach((bch) => {
    //     it(`should convert ${bch[1]} bits to ${bch[0]} satoshis`, () => {
    //       assert.equal(bchjs.BitcoinCash.satsFromBits(bch[1]), bch[0]);
    //     });
    //   });
    //
    //   fixtures.conversion.satsFromBits.strings.forEach((bch) => {
    //     it(`should convert "${bch[1]}" bits as a string to ${bch[0]} satoshis`, () => {
    //       assert.equal(bchjs.BitcoinCash.satsFromBits(bch[1]), bch[0]);
    //     });
    //   });
    // });
  })

  describe("sign and verify messages", () => {
    describe("#signMessageWithPrivKey", () => {
      fixtures.signatures.sign.forEach(sign => {
        it(`should sign a message w/ ${sign.network} ${sign.privateKeyWIF}`, () => {
          const privateKeyWIF = sign.privateKeyWIF
          const message = sign.message
          const signature = bchjs.BitcoinCash.signMessageWithPrivKey(
            privateKeyWIF,
            message
          )
          assert.equal(signature, sign.signature)
        })
      })
    })

    describe("#verifyMessage", () => {
      fixtures.signatures.verify.forEach(sign => {
        it(`should verify a valid signed message from ${sign.network} cashaddr address ${sign.address}`, () => {
          assert.equal(
            bchjs.BitcoinCash.verifyMessage(
              sign.address,
              sign.signature,
              sign.message
            ),
            true
          )
        })
      })

      fixtures.signatures.verify.forEach(sign => {
        const legacyAddress = bchjs.Address.toLegacyAddress(sign.address)
        it(`should verify a valid signed message from ${sign.network} legacy address ${legacyAddress}`, () => {
          assert.equal(
            bchjs.BitcoinCash.verifyMessage(
              legacyAddress,
              sign.signature,
              sign.message
            ),
            true
          )
        })
      })

      fixtures.signatures.verify.forEach(sign => {
        const legacyAddress = bchjs.Address.toLegacyAddress(sign.address)
        it(`should not verify an invalid signed message from ${sign.network} cashaddr address ${sign.address}`, () => {
          assert.equal(
            bchjs.BitcoinCash.verifyMessage(
              sign.address,
              sign.signature,
              "nope"
            ),
            false
          )
        })
      })
    })
  })

  describe("encode and decode to base58Check", () => {
    describe("#encodeBase58Check", () => {
      fixtures.encodeBase58Check.forEach((base58Check, i) => {
        it(`encode ${base58Check.hex} as base58Check ${base58Check.base58Check}`, () => {
          assert.equal(
            bchjs.BitcoinCash.encodeBase58Check(base58Check.hex),
            base58Check.base58Check
          )
        })
      })
    })

    describe("#decodeBase58Check", () => {
      fixtures.encodeBase58Check.forEach((base58Check, i) => {
        it(`decode ${base58Check.base58Check} as ${base58Check.hex}`, () => {
          assert.equal(
            bchjs.BitcoinCash.decodeBase58Check(base58Check.base58Check),
            base58Check.hex
          )
        })
      })
    })
  })

  describe("encode and decode BIP21 urls", () => {
    describe("#encodeBIP21", () => {
      fixtures.bip21.valid.forEach((bip21, i) => {
        it(`encode ${bip21.address} as url`, () => {
          const url = bchjs.BitcoinCash.encodeBIP21(
            bip21.address,
            bip21.options
          )
          assert.equal(url, bip21.url)
        })
      })
      fixtures.bip21.valid_regtest.forEach((bip21, i) => {
        it(`encode ${bip21.address} as url`, () => {
          const url = bchjs.BitcoinCash.encodeBIP21(
            bip21.address,
            bip21.options,
            true
          )
          assert.equal(url, bip21.url)
        })
      })
    })

    describe("#decodeBIP21", () => {
      fixtures.bip21.valid.forEach((bip21, i) => {
        it(`decodes ${bip21.url}`, () => {
          const decoded = bchjs.BitcoinCash.decodeBIP21(bip21.url)
          assert.equal(decoded.options.amount, bip21.options.amount)
          assert.equal(decoded.options.label, bip21.options.label)
          assert.equal(
            bchjs.Address.toCashAddress(decoded.address),
            bchjs.Address.toCashAddress(bip21.address)
          )
        })
      })
      // fixtures.bip21.valid_regtest.forEach((bip21, i) => {
      //   it(`decodes ${bip21.url}`, () => {
      //     const decoded = bchjs.BitcoinCash.decodeBIP21(bip21.url)
      //     assert.equal(decoded.options.amount, bip21.options.amount)
      //     assert.equal(decoded.options.label, bip21.options.label)
      //     assert.equal(
      //       bchjs.Address.toCashAddress(decoded.address, true, true),
      //       bchjs.Address.toCashAddress(bip21.address, true, true)
      //     )
      //   })
      // })
    })
  })

  describe("#getByteCount", () => {
    fixtures.getByteCount.forEach(fixture => {
      it(`get byte count`, () => {
        const byteCount = bchjs.BitcoinCash.getByteCount(
          fixture.inputs,
          fixture.outputs
        )
        assert.equal(byteCount, fixture.byteCount)
      })
    })
  })

  describe("#bip38", () => {
    describe("#encryptBIP38", () => {
      fixtures.bip38.encrypt.mainnet.forEach(fixture => {
        it(`BIP 38 encrypt wif ${fixture.wif} with password ${fixture.password} on mainnet`, () => {
          const encryptedKey = bchjs.BitcoinCash.encryptBIP38(
            fixture.wif,
            fixture.password
          )
          assert.equal(encryptedKey, fixture.encryptedKey)
        })
      })

      fixtures.bip38.encrypt.testnet.forEach(fixture => {
        it(`BIP 38 encrypt wif ${fixture.wif} with password ${fixture.password} on testnet`, () => {
          const encryptedKey = bchjs.BitcoinCash.encryptBIP38(
            fixture.wif,
            fixture.password
          )
          assert.equal(encryptedKey, fixture.encryptedKey)
        })
      })
    })

    describe("#decryptBIP38", () => {
      fixtures.bip38.decrypt.mainnet.forEach(fixture => {
        it(`BIP 38 decrypt encrypted key ${fixture.encryptedKey} on mainnet`, () => {
          const wif = bchjs.BitcoinCash.decryptBIP38(
            fixture.encryptedKey,
            fixture.password,
            "mainnet"
          )
          assert.equal(wif, fixture.wif)
        })
      })

      fixtures.bip38.decrypt.testnet.forEach(fixture => {
        it(`BIP 38 decrypt encrypted key ${fixture.encryptedKey} on testnet`, () => {
          const wif = bchjs.BitcoinCash.decryptBIP38(
            fixture.encryptedKey,
            fixture.password,
            "testnet"
          )
          assert.equal(wif, fixture.wif)
        })
      })
    })
  })
})
