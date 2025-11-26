/*
  This library contains useful functions that deal with encryption.
*/

import axios from 'axios'

let _this

class Encryption {
  constructor (config) {
    this.restURL = config.restURL
    this.authToken = config.authToken

    this.axiosOptions = {
      headers: {
        authorization: this.authToken
      }
    }

    // Use the shared axios instance if provided, otherwise fall back to axios
    this.axios = config.axios || axios

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

export default Encryption
