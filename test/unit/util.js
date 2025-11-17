/*
  Unit tests for util.js library.
*/

// Global npm libraries
import chai from 'chai'

// Local libraries
import BCHJS from '../../src/bch-js.js'
// import sinon from 'sinon'
const { assert: assert2 } = chai

const bchjs = new BCHJS()

describe('#Util', () => {
  describe('#floor8', () => {
    it('should floor a number to 8 decimals', () => {
      const num = 1.234567891111

      const result = bchjs.Util.floor8(num)
      // console.log(result)

      assert2.equal(result, 1.23456789)
    })

    it('should throw an error for non-number input', () => {
      try {
        const num = 'string'

        bchjs.Util.floor8(num)

        assert2.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert2.include(err.message, 'input must be a number')
      }
    })

    it('should not effect a number with less than 8 decimals', () => {
      const num = 1.23

      const result = bchjs.Util.floor8(num)
      // console.log(result)

      assert2.equal(result, 1.23)
    })
  })

  describe('#floor2', () => {
    it('should round a number to 2 decimals', () => {
      const num = 1.234567891111

      const result = bchjs.Util.floor2(num)
      // console.log(result)

      assert2.equal(result, 1.23)
    })

    it('should throw an error for non-number input', () => {
      try {
        const num = 'string'

        bchjs.Util.floor2(num)

        assert2.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert2.include(err.message, 'input must be a number')
      }
    })

    it('should not effect a number with less than 8 decimals', () => {
      const num = 1.2

      const result = bchjs.Util.floor2(num)
      // console.log(result)

      assert2.equal(result, 1.2)
    })
  })

  describe('#chunk20', () => {
    const thirtyFiveElements = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34
    ]

    it('should split 35 elements into 2 arrays', () => {
      const result = bchjs.Util.chunk20(thirtyFiveElements)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.isArray(result)
      assert2.isArray(result[0])
      assert2.equal(result.length, 2)
      assert2.equal(result[0].length, 20)
    })

    it('should return accurately with an array of less than 20 elements', () => {
      const elems = [0, 1, 2, 3, 4, 5]

      const result = bchjs.Util.chunk20(elems)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.isArray(result)
      assert2.isArray(result[0])
      assert2.equal(result.length, 1)
      assert2.equal(result[0].length, 6)
    })

    it('should throw an error for non-array input', () => {
      try {
        bchjs.Util.chunk20('string')

        assert2.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert2.include(err.message, 'input must be an array')
      }
    })
  })
})
