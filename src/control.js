/*
  API endpoints for basic control and information of the full node.
*/

import axios from 'axios'

// let _this // Global reference to the instance of this class.

class Control {
  constructor (config) {
    this.restURL = config.restURL
    this.authToken = config.authToken
    // Use the shared axios instance if provided, otherwise fall back to axios
    this.axios = config.axios || axios

    this.axiosOptions = {
      headers: {
        authorization: this.authToken
      }
    }
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
      const response = await this.axios.get(
        `${this.restURL}full-node/control/getNetworkInfo`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMemoryInfo () {
    try {
      const response = await this.axios.get(
        `${this.restURL}full-node/control/getMemoryInfo`,
        this.axiosOptions
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

export default Control
