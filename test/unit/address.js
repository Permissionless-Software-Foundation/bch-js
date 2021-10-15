// Public npm libraries.
const assert = require('assert')
const Bitcoin = require('@psf/bitcoincashjs-lib')

// Mocks
const fixtures = require('./fixtures/address.json')

// Unit under test (uut)
const BCHJS = require('../../src/bch-js')
let bchjs

function flatten (arrays) {
  return [].concat.apply([], arrays)
}

const XPUBS = flatten([fixtures.mainnetXPub, fixtures.testnetXPub])

const LEGACY_ADDRESSES = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.legacyTestnetP2PKH
])

const mainnetXpubs = []
fixtures.mainnetXPub.forEach((f, i) => {
  mainnetXpubs.push(f.xpub)
})
const MAINNET_ADDRESSES = flatten([
  mainnetXpubs,
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.cashaddrMainnetP2PKH
])

const testnetXpubs = []
fixtures.testnetXPub.forEach((f, i) => {
  testnetXpubs.push(f.xpub)
})
const TESTNET_ADDRESSES = flatten([
  testnetXpubs,
  fixtures.legacyTestnetP2PKH,
  fixtures.cashaddrTestnetP2PKH
])

const CASHADDR_ADDRESSES = flatten([
  fixtures.cashaddrMainnetP2PKH,
  fixtures.cashaddrMainnetP2SH,
  fixtures.cashaddrTestnetP2PKH
])

const CASHADDR_ADDRESSES_NO_PREFIX = CASHADDR_ADDRESSES.map(address => {
  const parts = address.split(':')
  return parts[1]
})

const REGTEST_ADDRESSES = fixtures.cashaddrRegTestP2PKH

const REGTEST_ADDRESSES_NO_PREFIX = REGTEST_ADDRESSES.map(address => {
  const parts = address.split(':')
  return parts[1]
})

const HASH160_HASHES = flatten([
  fixtures.hash160MainnetP2PKH,
  fixtures.hash160MainnetP2SH,
  fixtures.hash160TestnetP2PKH
])

const P2PKH_ADDRESSES = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyTestnetP2PKH,
  fixtures.cashaddrMainnetP2PKH,
  fixtures.cashaddrTestnetP2PKH,
  fixtures.cashaddrRegTestP2PKH
])

const P2SH_ADDRESSES = flatten([
  fixtures.legacyMainnetP2SH,
  fixtures.cashaddrMainnetP2SH
])

describe('#address.js', () => {
  beforeEach(() => {
    bchjs = new BCHJS()
  })

  describe('#addressConversion', () => {
    describe('#toLegacyAddress', () => {
      it('should translate legacy address format to itself correctly', () => {
        assert.deepStrictEqual(
          LEGACY_ADDRESSES.map(address =>
            bchjs.Address.toLegacyAddress(address)
          ),
          LEGACY_ADDRESSES
        )
      })

      it('should convert cashaddr address to legacy base58Check', () => {
        assert.deepStrictEqual(
          CASHADDR_ADDRESSES.map(address =>
            bchjs.Address.toLegacyAddress(address)
          ),
          LEGACY_ADDRESSES
        )
      })

      it('should convert cashaddr regtest address to legacy base58Check', () => {
        assert.deepStrictEqual(
          REGTEST_ADDRESSES.map(address =>
            bchjs.Address.toLegacyAddress(address)
          ),
          fixtures.legacyTestnetP2PKH
        )
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.toLegacyAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.toLegacyAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe('#toCashAddress', () => {
      it('should convert legacy base58Check address to cashaddr', () => {
        assert.deepStrictEqual(
          LEGACY_ADDRESSES.map(address =>
            bchjs.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it('should convert legacy base58Check address to regtest cashaddr', () => {
        assert.deepStrictEqual(
          fixtures.legacyTestnetP2PKH.map(address =>
            bchjs.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it('should translate cashaddr address format to itself correctly', () => {
        assert.deepStrictEqual(
          CASHADDR_ADDRESSES.map(address =>
            bchjs.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it('should translate regtest cashaddr address format to itself correctly', () => {
        assert.deepStrictEqual(
          REGTEST_ADDRESSES.map(address =>
            bchjs.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it('should translate no-prefix cashaddr address format to itself correctly', () => {
        assert.deepStrictEqual(
          CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
            bchjs.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it('should translate no-prefix regtest cashaddr address format to itself correctly', () => {
        assert.deepStrictEqual(
          REGTEST_ADDRESSES_NO_PREFIX.map(address =>
            bchjs.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it('should translate cashaddr address format to itself of no-prefix correctly', () => {
        CASHADDR_ADDRESSES.forEach(address => {
          const noPrefix = bchjs.Address.toCashAddress(address, false)
          assert.strictEqual(address.split(':')[1], noPrefix)
        })
      })

      it('should translate regtest cashaddr address format to itself of no-prefix correctly', () => {
        REGTEST_ADDRESSES.forEach(address => {
          const noPrefix = bchjs.Address.toCashAddress(address, false, true)
          assert.strictEqual(address.split(':')[1], noPrefix)
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.BitcoinCash.Address.toCashAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.BitcoinCash.Address.toCashAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe('#toHash160', () => {
      it('should convert legacy base58check address to hash160', () => {
        assert.deepStrictEqual(
          LEGACY_ADDRESSES.map(address => bchjs.Address.toHash160(address)),
          HASH160_HASHES
        )
      })

      it('should convert cashaddr address to hash160', () => {
        assert.deepStrictEqual(
          CASHADDR_ADDRESSES.map(address => bchjs.Address.toHash160(address)),
          HASH160_HASHES
        )
      })

      it('should convert　regtest cashaddr address to hash160', () => {
        assert.deepStrictEqual(
          REGTEST_ADDRESSES.map(address => bchjs.Address.toHash160(address)),
          fixtures.hash160TestnetP2PKH
        )
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.toHash160()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.toHash160('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe('#fromHash160', () => {
      it('should convert hash160 to mainnet P2PKH legacy base58check address', () => {
        assert.deepStrictEqual(
          fixtures.hash160MainnetP2PKH.map(hash160 =>
            bchjs.Address.hash160ToLegacy(hash160)
          ),
          fixtures.legacyMainnetP2PKH
        )
      })

      it('should convert hash160 to mainnet P2SH legacy base58check address', () => {
        assert.deepStrictEqual(
          fixtures.hash160MainnetP2SH.map(hash160 =>
            bchjs.Address.hash160ToLegacy(
              hash160,
              Bitcoin.networks.bitcoin.scriptHash
            )
          ),
          fixtures.legacyMainnetP2SH
        )
      })

      it('should convert hash160 to testnet P2PKH legacy base58check address', () => {
        assert.deepStrictEqual(
          fixtures.hash160TestnetP2PKH.map(hash160 =>
            bchjs.Address.hash160ToLegacy(
              hash160,
              Bitcoin.networks.testnet.pubKeyHash
            )
          ),
          fixtures.legacyTestnetP2PKH
        )
      })

      it('should convert hash160 to mainnet P2PKH cash address', () => {
        assert.deepStrictEqual(
          fixtures.hash160MainnetP2PKH.map(hash160 =>
            bchjs.Address.hash160ToCash(hash160)
          ),
          fixtures.cashaddrMainnetP2PKH
        )
      })

      it('should convert hash160 to mainnet P2SH cash address', () => {
        assert.deepStrictEqual(
          fixtures.hash160MainnetP2SH.map(hash160 =>
            bchjs.Address.hash160ToCash(
              hash160,
              Bitcoin.networks.bitcoin.scriptHash
            )
          ),
          fixtures.cashaddrMainnetP2SH
        )
      })

      it('should convert hash160 to testnet P2PKH cash address', () => {
        assert.deepStrictEqual(
          fixtures.hash160TestnetP2PKH.map(hash160 =>
            bchjs.Address.hash160ToCash(
              hash160,
              Bitcoin.networks.testnet.pubKeyHash
            )
          ),
          fixtures.cashaddrTestnetP2PKH
        )
      })

      it('should convert hash160 to regtest P2PKH cash address', () => {
        assert.deepStrictEqual(
          fixtures.hash160TestnetP2PKH.map(hash160 =>
            bchjs.Address.hash160ToCash(
              hash160,
              Bitcoin.networks.testnet.pubKeyHash,
              true
            )
          ),
          REGTEST_ADDRESSES
        )
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.hash160ToLegacy()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.hash160ToLegacy('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.hash160ToCash()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.hash160ToCash('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe('address format detection', () => {
    describe('#isLegacyAddress', () => {
      describe('is legacy', () => {
        LEGACY_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a legacy base58Check address`, () => {
            const isBase58Check = bchjs.Address.isLegacyAddress(address)
            assert.strictEqual(isBase58Check, true)
          })
        })
      })
      describe('is not legacy', () => {
        CASHADDR_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isBase58Check = bchjs.Address.isLegacyAddress(address)
            assert.strictEqual(isBase58Check, false)
          })
        })

        REGTEST_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isBase58Check = bchjs.Address.isLegacyAddress(address)
            assert.strictEqual(isBase58Check, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isLegacyAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isLegacyAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe('#isCashAddress', () => {
      describe('is cashaddr', () => {
        CASHADDR_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a cashaddr address`, () => {
            const isCashaddr = bchjs.Address.isCashAddress(address)
            assert.strictEqual(isCashaddr, true)
          })
        })

        REGTEST_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a cashaddr address`, () => {
            const isCashaddr = bchjs.Address.isCashAddress(address)
            assert.strictEqual(isCashaddr, true)
          })
        })
      })

      describe('is not cashaddr', () => {
        LEGACY_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a cashaddr address`, () => {
            const isCashaddr = bchjs.Address.isCashAddress(address)
            assert.strictEqual(isCashaddr, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isCashAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isCashAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })
    describe('#isHash160', () => {
      describe('is hash160', () => {
        HASH160_HASHES.forEach(address => {
          it(`should detect ${address} is a hash160 hash`, () => {
            const isHash160 = bchjs.Address.isHash160(address)
            assert.strictEqual(isHash160, true)
          })
        })
      })
      describe('is not hash160', () => {
        LEGACY_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a hash160 hash`, () => {
            const isHash160 = bchjs.Address.isHash160(address)
            assert.strictEqual(isHash160, false)
          })
        })

        CASHADDR_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a hash160 hash`, () => {
            const isHash160 = bchjs.Address.isHash160(address)
            assert.strictEqual(isHash160, false)
          })
        })

        REGTEST_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isHash160 = bchjs.Address.isHash160(address)
            assert.strictEqual(isHash160, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isHash160()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isHash160('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe('network detection', () => {
    describe('#isMainnetAddress', () => {
      describe('is mainnet', () => {
        MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a mainnet address`, () => {
            const isMainnet = bchjs.Address.isMainnetAddress(address)
            assert.strictEqual(isMainnet, true)
          })
        })
      })

      describe('is not mainnet', () => {
        TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a mainnet address`, () => {
            const isMainnet = bchjs.Address.isMainnetAddress(address)
            assert.strictEqual(isMainnet, false)
          })
        })

        REGTEST_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a mainnet address`, () => {
            const isMainnet = bchjs.Address.isMainnetAddress(address)
            assert.strictEqual(isMainnet, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isMainnetAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isMainnetAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe('#isTestnetAddress', () => {
      describe('is testnet', () => {
        TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a testnet address`, () => {
            const isTestnet = bchjs.Address.isTestnetAddress(address)
            assert.strictEqual(isTestnet, true)
          })
        })
      })

      describe('is not testnet', () => {
        MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a testnet address`, () => {
            const isTestnet = bchjs.Address.isTestnetAddress(address)
            assert.strictEqual(isTestnet, false)
          })
        })

        REGTEST_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a testnet address`, () => {
            const isTestnet = bchjs.Address.isTestnetAddress(address)
            assert.strictEqual(isTestnet, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isTestnetAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isTestnetAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe('#isRegTestAddress', () => {
      describe('is testnet', () => {
        REGTEST_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a regtest address`, () => {
            const isRegTest = bchjs.Address.isRegTestAddress(address)
            assert.strictEqual(isRegTest, true)
          })
        })
      })

      describe('is not testnet', () => {
        MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a regtest address`, () => {
            const isRegTest = bchjs.Address.isRegTestAddress(address)
            assert.strictEqual(isRegTest, false)
          })
        })

        TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a regtest address`, () => {
            const isRegTest = bchjs.Address.isRegTestAddress(address)
            assert.strictEqual(isRegTest, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isRegTestAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isRegTestAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe('address type detection', () => {
    describe('#isP2PKHAddress', () => {
      describe('is P2PKH', () => {
        P2PKH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a P2PKH address`, () => {
            const isP2PKH = bchjs.Address.isP2PKHAddress(address)
            assert.strictEqual(isP2PKH, true)
          })
        })
      })

      describe('is not P2PKH', () => {
        P2SH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a P2PKH address`, () => {
            const isP2PKH = bchjs.Address.isP2PKHAddress(address)
            assert.strictEqual(isP2PKH, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isP2PKHAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isP2PKHAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe('#isP2SHAddress', () => {
      describe('is P2SH', () => {
        P2SH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a P2SH address`, () => {
            const isP2SH = bchjs.Address.isP2SHAddress(address)
            assert.strictEqual(isP2SH, true)
          })
        })
      })

      describe('is not P2SH', () => {
        P2PKH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a P2SH address`, () => {
            const isP2SH = bchjs.Address.isP2SHAddress(address)
            assert.strictEqual(isP2SH, false)
          })
        })
      })

      describe('errors', () => {
        it('should fail when called with an invalid address', () => {
          assert.throws(() => {
            bchjs.Address.isP2SHAddress()
          }, bchjs.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bchjs.Address.isP2SHAddress('some invalid address')
          }, bchjs.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe('cashaddr prefix detection', () => {
    it('should return the same result for detectAddressFormat', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.detectAddressFormat(address)
        ),
        CASHADDR_ADDRESSES.map(address =>
          bchjs.Address.detectAddressFormat(address)
        )
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.detectAddressFormat(address)
        ),
        REGTEST_ADDRESSES.map(address =>
          bchjs.Address.detectAddressFormat(address)
        )
      )
    })
    it('should return the same result for detectAddressNetwork', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.detectAddressNetwork(address)
        ),
        CASHADDR_ADDRESSES.map(address =>
          bchjs.Address.detectAddressNetwork(address)
        )
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.detectAddressNetwork(address)
        ),
        REGTEST_ADDRESSES.map(address =>
          bchjs.Address.detectAddressNetwork(address)
        )
      )
    })
    it('should return the same result for detectAddressType', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.detectAddressType(address)
        ),
        CASHADDR_ADDRESSES.map(address =>
          bchjs.Address.detectAddressType(address)
        )
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.detectAddressType(address)
        ),
        REGTEST_ADDRESSES.map(address =>
          bchjs.Address.detectAddressType(address)
        )
      )
    })
    it('should return the same result for toLegacyAddress', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.toLegacyAddress(address)
        ),
        CASHADDR_ADDRESSES.map(address =>
          bchjs.Address.toLegacyAddress(address)
        )
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.toLegacyAddress(address)
        ),
        REGTEST_ADDRESSES.map(address => bchjs.Address.toLegacyAddress(address))
      )
    })
    it('should return the same result for isLegacyAddress', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isLegacyAddress(address)
        ),
        CASHADDR_ADDRESSES.map(address =>
          bchjs.Address.isLegacyAddress(address)
        )
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isLegacyAddress(address)
        ),
        REGTEST_ADDRESSES.map(address => bchjs.Address.isLegacyAddress(address))
      )
    })
    it('should return the same result for isCashAddress', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isCashAddress(address)
        ),
        CASHADDR_ADDRESSES.map(address => bchjs.Address.isCashAddress(address))
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isCashAddress(address)
        ),
        REGTEST_ADDRESSES.map(address => bchjs.Address.isCashAddress(address))
      )
    })
    it('should return the same result for isMainnetAddress', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isMainnetAddress(address)
        ),
        CASHADDR_ADDRESSES.map(address =>
          bchjs.Address.isMainnetAddress(address)
        )
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isMainnetAddress(address)
        ),
        REGTEST_ADDRESSES.map(address =>
          bchjs.Address.isMainnetAddress(address)
        )
      )
    })

    it('should return the same result for isTestnetAddress', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isTestnetAddress(address)
        ),
        CASHADDR_ADDRESSES.map(address =>
          bchjs.Address.isTestnetAddress(address)
        )
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isTestnetAddress(address)
        ),
        REGTEST_ADDRESSES.map(address =>
          bchjs.Address.isTestnetAddress(address)
        )
      )
    })

    it('should return the same result for isP2PKHAddress', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isP2PKHAddress(address)
        ),
        CASHADDR_ADDRESSES.map(address => bchjs.Address.isP2PKHAddress(address))
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isP2PKHAddress(address)
        ),
        REGTEST_ADDRESSES.map(address => bchjs.Address.isP2PKHAddress(address))
      )
    })

    it('should return the same result for isP2SHAddress', () => {
      assert.deepStrictEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isP2SHAddress(address)
        ),
        CASHADDR_ADDRESSES.map(address => bchjs.Address.isP2SHAddress(address))
      )
      assert.deepStrictEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map(address =>
          bchjs.Address.isP2SHAddress(address)
        ),
        REGTEST_ADDRESSES.map(address => bchjs.Address.isP2SHAddress(address))
      )
    })
  })

  describe('#detectAddressFormat', () => {
    LEGACY_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a legacy base58Check address`, () => {
        const isBase58Check = bchjs.Address.detectAddressFormat(address)
        assert.strictEqual(isBase58Check, 'legacy')
      })
    })

    CASHADDR_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a legacy cashaddr address`, () => {
        const isCashaddr = bchjs.Address.detectAddressFormat(address)
        assert.strictEqual(isCashaddr, 'cashaddr')
      })
    })

    REGTEST_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a legacy cashaddr address`, () => {
        const isCashaddr = bchjs.Address.detectAddressFormat(address)
        assert.strictEqual(isCashaddr, 'cashaddr')
      })
    })

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          bchjs.Address.detectAddressFormat()
        }, bchjs.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          bchjs.Address.detectAddressFormat('some invalid address')
        }, bchjs.BitcoinCash.InvalidAddressError)
      })
    })
  })

  describe('#detectAddressNetwork', () => {
    MAINNET_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a mainnet address`, () => {
        const isMainnet = bchjs.Address.detectAddressNetwork(address)
        assert.strictEqual(isMainnet, 'mainnet')
      })
    })

    TESTNET_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a testnet address`, () => {
        const isTestnet = bchjs.Address.detectAddressNetwork(address)
        assert.strictEqual(isTestnet, 'testnet')
      })
    })

    REGTEST_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a testnet address`, () => {
        const isTestnet = bchjs.Address.detectAddressNetwork(address)
        assert.strictEqual(isTestnet, 'regtest')
      })
    })

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          bchjs.Address.detectAddressNetwork()
        }, bchjs.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          bchjs.Address.detectAddressNetwork('some invalid address')
        }, bchjs.BitcoinCash.InvalidAddressError)
      })
    })
  })

  describe('#detectAddressType', () => {
    P2PKH_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a P2PKH address`, () => {
        const isP2PKH = bchjs.Address.detectAddressType(address)
        assert.strictEqual(isP2PKH, 'p2pkh')
      })
    })

    P2SH_ADDRESSES.forEach(address => {
      it(`should detect ${address} is a P2SH address`, () => {
        const isP2SH = bchjs.Address.detectAddressType(address)
        assert.strictEqual(isP2SH, 'p2sh')
      })
    })

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          bchjs.Address.detectAddressType()
        }, bchjs.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          bchjs.Address.detectAddressType('some invalid address')
        }, bchjs.BitcoinCash.InvalidAddressError)
      })
    })
  })

  describe('#fromXPub', () => {
    XPUBS.forEach((xpub, i) => {
      xpub.addresses.forEach((address, j) => {
        it(`generate public external change address ${j} for ${xpub.xpub}`, () => {
          assert.strictEqual(bchjs.Address.fromXPub(xpub.xpub, `0/${j}`), address)
        })
      })
    })
  })

  describe('#fromOutputScript', () => {
    it('generate address from output script', () => {
      const script = bchjs.Script.encode([
        Buffer.from('BOX', 'ascii'),
        bchjs.Script.opcodes.OP_CAT,
        Buffer.from('BITBOX', 'ascii'),
        bchjs.Script.opcodes.OP_EQUAL
      ])

      // hash160 script buffer
      const p2shHash160 = bchjs.Crypto.hash160(script)

      // encode hash160 as P2SH output
      const scriptPubKey = bchjs.Script.scriptHash.output.encode(p2shHash160)
      const p2shAddress = bchjs.Address.fromOutputScript(scriptPubKey)

      fixtures.p2shMainnet.forEach((address, i) => {
        assert.strictEqual(p2shAddress, address)
      })
    })
  })
})
