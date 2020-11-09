/*
  This library interacts with the ninsight REST API endpoints operated by
  Bitcoin.com
*/

const axios = require("axios")

let _this

class Ninsight {
  constructor(config) {
    // this.restURL = config.restURL
    // this.apiToken = config.apiToken

    // this.ninsightURL = `https://bch-explorer.api.bitcoin.com/v1/`
    if (config) {
      this.ninsightURL = config.ninsightURL
        ? config.ninsightURL
        : `https://rest.bitcoin.com/v2`
    }

    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`,
        timeout: 15000
      }
    }

    _this = this
  }

  /**
   * @api Ninsight.utxo()  utxo()
   * @apiName Ninsight Utxo
   * @apiGroup Ninsight
   * @apiDescription Return list of uxto for address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let utxo = await bchjs.Ninsight.utxo('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  // [
   *  //   {
   *  //     "txid": "d31dc2cf66fe4d3d3ae18e1065def58a64920746b1702b52f060e5edeea9883b",
   *  //     "vout": 1,
   *  //     "value": "1000000",
   *  //     "height": 585570,
   *  //     "confirmations": 10392
   *  //   },
   *  //   {
   *  //     "txid": "41e9a118765ecf7a1ba4487c0863e23dba343cc5880381a72f0365ac2546c5fa",
   *  //     "vout": 0,
   *  //     "value": "1000000",
   *  //     "height": 577125,
   *  //     "confirmations": 18837
   *  //   }
   *  // ]
   *
   */
  async utxo(address) {
    try {
      _checkParam(address)
      _callAxios(address, 'utxo')
    } catch (e) {
      _handleError(e)
    }
  }

  /**
   * @api Ninsight.details()  details()
   * @apiName Ninsight Details
   * @apiGroup Ninsight
   * @apiDescription Return details of address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let details = await bchjs.Ninsight.details('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c');
   *     console.log(details);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  // [
   *  //   //TODO PASTE LOG OUTPUT SAMPLE HERE
   *  // ]
   *
   */
  async details(address) {
    try {
      _checkParam(address)
      _callAxios(address, 'details')
    } catch (e) {
      _handleError(e)
    }
  }

  _checkParam(address) {
    if (typeof address !== "string" && !Array.isArray(address))
      throw new Error(`Input address must be a string or array of strings.`)
  }

  _handleError(error) {
    if (error.response && error.response.data) throw error.response.data
      else throw error
  }

  async _callAxios(address, type) {
    const response = await axios.post(
    `${this.ninsightURL}/address/${type}`,
    {
      addresses: address
    },
     _this.axiosOptions
    )
    console.log('SAMPLE: ${response.data}');
    return response.data
  }
}

module.exports = Ninsight
