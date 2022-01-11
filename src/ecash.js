/*
  Utility library for converting units with eCash.
*/

class eCash {
  /**
   * @api eCash.toSatoshi() toSatoshi()
   * @apiName toSatoshi
   * @apiGroup eCash
   * @apiDescription
   * Convert XEC units into satoshi units
   *
   * @apiExample Example usage:
   * // convert 10,704.35 XEC to satoshis:
   * bchjs.eCash.toSatoshi(10704.35)
   * // 1070435
   */
  toSatoshi (xec) {
    if (typeof xec !== 'number') {
      throw new Error('input must be a floating number representing XEC')
    }

    return Math.floor(xec * 100)
  }

  /**
   * @api eCash.toXec() toXec()
   * @apiName toXec
   * @apiGroup eCash
   * @apiDescription
   * Convert satoshi units to XEC units
   *
   * @apiExample Example usage:
   * // convert 1,070,435 satoshis to XEC:
   * bchjs.eCash.toSatoshi(1070435)
   * // 10704.35
   */
  toXec (sats) {
    if (typeof sats !== 'number') {
      throw new Error('input must be a floating number representing satoshis')
    }

    return sats / 100
  }
}

module.exports = eCash
