const axios = require("axios")
/**
 * @api price.current() current() - Get current price.
 * @apiName Price.
 * @apiGroup Price
 * @apiDescription Return current price of BCH in multiple currencies.
 *
 * @apiExample Example usage:
 *(async () => {
 *  try {
 *    let current = await bchjs.Price.current('usd');
 *    console.log(current);
 *  } catch(error) {
 *   console.error(error)
 *  }
 *})()
 *
 * // 26681
 */
class Price {
  async current(currency = "usd") {
    try {
      const response = await axios.get(
        `https://index-api.bitcoin.com/api/v0/cash/price/${currency.toLowerCase()}`
      )
      return response.data.price
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Price
