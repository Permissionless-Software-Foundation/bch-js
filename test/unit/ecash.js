/*
  Unit tests for eCash library.
*/

// Global npm libraries
const assert = require('chai').assert
const Ecash = require('../../src/ecash')
const uut = new Ecash()

describe('#eCash', () => {
  describe('#toSatoshi', () => {
    it('should convert XEC to satoshis', () => {
      const xec = 10704.35

      const result = uut.toSatoshi(xec)

      assert.equal(result, 1070435)
    })

    it('should throw an error if input is not a number', () => {
      try {
        uut.toSatoshi('test')

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(
          err.message,
          'input must be a floating number representing XEC'
        )
      }
    })
  })

  describe('#toXec', () => {
    it('should convert satoshis to XEC', () => {
      const sats = 1070435

      const result = uut.toXec(sats)

      assert.equal(result, 10704.35)
    })

    it('should throw an error if input is not a number', () => {
      try {
        uut.toXec('test')

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(
          err.message,
          'input must be a floating number representing satoshis'
        )
      }
    })
  })
})
