const axios = require('axios')

let _this

class DSProof {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken
    this.axios = axios

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
   * @api DSProof.getDSProof() getDSProof()
   * @apiName getDSProof
   * @apiGroup DSProof
   * @apiDescription Checks if a transaction generated a double-spend proof.
   *
   * If a double-spend is attempted, one of the transactions will generate a
   * 'double spend proof'. This call can be used to check if a transaction
   * generated such a proof.
   *
   * Merchants should wait 3-5 seconds after receiving notification of a
   * transaction before calling this endpoint, to see if the TXID generated a
   * proof. If this method returns no data, then the TX can be considered 'safe'
   * and not a double spend. If proof data is returned by this method, then
   * the transaction generated a proof and can be considered a 'double spend'.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const txid = 'ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e'
   *     const result = await bchjs.DSProof.getDSProof(txid)
   *     console.log(result);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   * null
   */
  async getDSProof (txid) {
    try {
      if (!txid) {
        throw new Error('txid is required')
      }
      if (txid.length !== 64) {
        throw new Error(`txid must be of length 64 (not ${txid.length})`)
      }
      const response = await _this.axios.get(
        `${this.restURL}dsproof/getdsproof/${txid}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = DSProof
