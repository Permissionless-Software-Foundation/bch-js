/*
  API endpoints for basic control and information of the full node.
*/

const axios = require('axios')

let _this // Global reference to the instance of this class.

class Control {
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
   * @api Control.getNetworkInfo() getNetworkInfo()
   * @apiName getNetworkInfo
   * @apiGroup Control
   * @apiDescription Returns an object containing various network info.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let getInfo = await bchjs.Control.getNetworkInfo();
   *     console.log(getInfo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   * { version: 190500,
   *   subversion: '/Bitcoin ABC:0.19.5(EB32.0)/',
   *   protocolversion: 70015,
   *   localservices: '0000000000000425',
   *   localrelay: true,
   *   timeoffset: 0,
   *   networkactive: true,
   *   connections: 17,
   *   networks:
   *   [ { name: 'ipv4',
   *       limited: false,
   *       reachable: true,
   *       proxy: '',
   *       proxy_randomize_credentials: false },
   *     { name: 'ipv6',
   *       limited: false,
   *       reachable: true,
   *       proxy: '',
   *       proxy_randomize_credentials: false },
   *     { name: 'onion',
   *       limited: true,
   *       reachable: false,
   *       proxy: '',
   *       proxy_randomize_credentials: false } ],
   *   relayfee: 0.00001,
   *   excessutxocharge: 0,
   *   warnings:
   *   'Warning: Unknown block versions being mined! It\'s possible unknown rules are in effect' }}
   */
  async getNetworkInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}control/getNetworkInfo`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMemoryInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}control/getMemoryInfo`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
  //
  // stop() {
  //   // Stop Bitcoin Cash server.
  //   return axios.post(`${this.restURL}control/stop`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
}

module.exports = Control
