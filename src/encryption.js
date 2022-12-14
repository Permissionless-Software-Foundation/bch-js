/*
  This library contains useful functions that deal with encryption.
*/

const axios = require('axios')

let _this

class Encryption {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.axios = axios
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
   * @api encryption.getPubKey() getPubKey()
   * @apiName Encryption getPubKey()
   * @apiGroup Encryption
   * @apiDescription Get the public key for an address
   * Given an address, the command will search the blockchain for a public
   * key associated with that address. The address needs to have made at least
   * one spend transaction, in order for its public key to be retrievable.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    const addr = 'bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d'
   *    const pubkey = await bchjs.encryption.getPubKey(addr);
   *    console.log(pubkey);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   */

  // Search the blockchain for a public key associated with a BCH address.
  async getPubKey (addr) {
    try {
      if (!addr || typeof addr !== 'string') {
        throw new Error('Input must be a valid Bitcoin Cash address.')
      }

      const response = await _this.axios.get(
        `${this.restURL}encryption/publickey/${addr}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Encryption
