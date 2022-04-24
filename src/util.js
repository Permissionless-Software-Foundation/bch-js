const axios = require('axios')

// let _this

class Util {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // _this = this
  }

  /**
   * @api Util.floor8() floor8()
   * @apiName floor8
   * @apiGroup Util
   * @apiDescription Round a number down to 8 decimal places.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const num = 1.234567891111
   *     const result = bchjs.Util.floor8(num)
   *     console.log(result)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  1.23456789
   */
  // floor8 - round to 8 decimal places
  // Takes a number and returns it, rounded to the nearest 8 decimal place.
  floor8 (num) {
    const thisNum = Number(num)

    if (isNaN(thisNum)) throw new Error('input must be a number')

    let tempNum = thisNum * 100000000
    tempNum = Math.floor(tempNum)
    tempNum = tempNum / 100000000

    return tempNum
  }

  /**
   * @api Util.floor2() floor2()
   * @apiName floor2
   * @apiGroup Util
   * @apiDescription Round a number down to 2 decimal places.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const num = 1.234567891111
   *     const result = bchjs.Util.floor2(num)
   *     console.log(result)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  1.23
   */
  // floor2 - round down to 2 decimal places
  // Takes a number and returns it, rounded to the nearest 2 decimal place.
  floor2 (num) {
    const thisNum = Number(num)

    if (isNaN(thisNum)) throw new Error('input must be a number')

    let tempNum = thisNum * 100
    tempNum = Math.floor(tempNum)
    tempNum = tempNum / 100

    return tempNum
  }

  /**
   * @api Util.chunk20() chunk20()
   * @apiName chunk20
   * @apiGroup Util
   * @apiDescription chunk up an array into multiple arrays of 20 elements each.
   * Input: arrayToSlice - a one-dimensional array of elements.
   * Returns a two-dimensional array. An array of 20-element arrays.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *      const bigArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
   *
   *      const chunked = bchjs.Util.chunk20(bigArray)
   *      console.log(chunked)
   *   } catch(error) {
   *      console.error(error)
   *   }
   * })()
   *
   * // returns
   *  [
   *    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
   *    [20,21,22,23,24,25,26]
   *  ]
   */
  // chunk20 - chunk up an array into multiple arrays of 20 elements each.
  // Input: arrayToSlice - a one-dimensional array of elements.
  // Returns a two-dimensional array. An array of 20-element arrays.
  chunk20 (arrayToSlice) {
    try {
      // Validate inputs
      if (!Array.isArray(arrayToSlice)) {
        throw new Error('input must be an array')
      }

      let offset = 0
      const result = []

      // Loop over the array and slice off chunks of 20 elements.
      while (offset < arrayToSlice.length) {
        const chunk = arrayToSlice.slice(offset, offset + 20)
        result.push(chunk)
        offset = offset + 20
      }

      return result
    } catch (err) {
      console.error('Error in chunk20()')
      throw err
    }
  }

  /**
   * @api Util.chunk100() chunk100()
   * @apiName chunk100
   * @apiGroup Util
   * @apiDescription chunk up an array into multiple arrays of 100 elements each.
   * Input: arrayToSlice - a one-dimensional array of elements.
   * Returns a two-dimensional array. An array of 100-element arrays.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *      const bigArray = [0,1,2,3,4,5,6,7,8,9,10,...,148, 149, 150]
   *
   *      const chunked = bchjs.Util.chunk20(bigArray)
   *      console.log(chunked)
   *   } catch(error) {
   *      console.error(error)
   *   }
   * })()
   *
   * // returns
   *  [
   *    [0,1,2,3,4,5,6,7,8,9,10,11,...,98,99],
   *    [100,101,102,...,148,149,150]
   *  ]
   */
  chunk100 (arrayToSlice) {
    try {
      // Validate inputs
      if (!Array.isArray(arrayToSlice)) {
        throw new Error('input must be an array')
      }

      let offset = 0
      const result = []

      // Loop over the array and slice off chunks of 100 elements.
      while (offset < arrayToSlice.length) {
        const chunk = arrayToSlice.slice(offset, offset + 100)
        result.push(chunk)
        offset = offset + 100
      }

      return result
    } catch (err) {
      console.error('Error in chunk100()')
      throw err
    }
  }

  /**
   * @api Util.sleep() sleep()
   * @apiName sleep
   * @apiGroup Util
   * @apiDescription Promise-based delay.
   * Expects an integer as input, which represents milliseconds. This function
   * will return a Promise that resolves that many milliseconds later.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const tenSeconds = 10000
   *     await bchjs.Util.sleep(tenSeconds)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   */
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * @api Util.validateAddress() validateAddress()
   * @apiName Validate Address.
   * @apiGroup Util
   * @apiDescription Return information about the given bitcoin address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let validateAddress = await bchjs.Util.validateAddress("bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f");
   *     console.log(validateAddress);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // { isvalid: true,
   * // address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
   * // scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
   * // ismine: true,
   * // iswatchonly: false,
   * // isscript: false,
   * // pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
   * // iscompressed: true,
   * // account: 'Test' }
   *
   * (async () => {
   *   try {
   *     let validateAddress = await bchjs.Util.validateAddress(["bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f"]);
   *     console.log(validateAddress);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // [{ isvalid: true,
   * // address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
   * // scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
   * // ismine: true,
   * // iswatchonly: false,
   * // isscript: false,
   * // pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
   * // iscompressed: true,
   * // account: 'Test' }]
   */
  async validateAddress (address) {
    try {
      // Single block
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}util/validateAddress/${address}`,
          this.axiosOptions
        )
        return response.data

        // Array of blocks.
      } else if (Array.isArray(address)) {
        const options1 = {
          method: 'POST',
          url: `${this.restURL}util/validateAddress`,
          data: {
            addresses: address
          }
          // headers: {
          //   authorization: `Token ${this.apiToken}`
          // }
        }
        const options = Object.assign({}, options1, this.axiosOptions)
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Util
