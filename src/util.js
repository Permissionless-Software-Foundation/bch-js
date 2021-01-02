const axios = require('axios')

let _this

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

    _this = this
  }

  /**
   * @api util.validateAddress() validateAddress()
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
          _this.axiosOptions
        )
        return response.data

        // Array of blocks.
      } else if (Array.isArray(address)) {
        const options = {
          method: 'POST',
          url: `${this.restURL}util/validateAddress`,
          data: {
            addresses: address
          },
          headers: {
            authorization: `Token ${this.apiToken}`
          }
        }
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
