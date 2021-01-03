const axios = require('axios')

let _this

class Price {
  constructor (config) {
    _this = this

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

    this.axios = axios
  }

  // This endpoint is deprecated. Documentation removed.
  async current (currency = 'usd') {
    try {
      const response = await this.axios.get(
        `https://index-api.bitcoin.com/api/v0/cash/price/${currency.toLowerCase()}`
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.price
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getUsd() getUsd()
   * @apiName Price getUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in USD.
   * This endpoint gets the USD price of BCH from the Coinbase API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.err(err)
   *  }
   *})()
   *
   * // 266.81
   */
  async getUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/usd`,
        _this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.rates() rates()
   * @apiName Price rates()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in several different currencies.
   * This endpoint gets the price of BCH from the Coinbase API in many different
   * currencies. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.rates();
   *    console.log(current);
   *  } catch(err) {
   *   console.err(err)
   *  }
   *})()
   *
   * {
   *   AED: "915.049218",
   *   AFN: "19144.48874646",
   *   ALGO: "826.6633482661356600405",
   *   ...
   *   ZRX: "644.844402797695193656",
   *   ZWL: "80215.03"
   * }
   */
  async rates () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/rates`,
        _this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getBchaUsd() getBchaUsd()
   * @apiName Price getBchaUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCHA in USD.
   * This endpoint gets the USD price of BCHA from the Coinex API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getBchaUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.err(err)
   *  }
   *})()
   *
   * // 18.81
   */
  async getBchaUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/bchausd`,
        _this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }
}

module.exports = Price
