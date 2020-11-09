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
      _this._validateParam(address)
      return _this._callAxios(address, 'utxo')
    } catch (e) {
      _this._handleError(e);
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
   *  //   {
   *  //      'address': 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9',
   *  //         'satoshis': 2782729129,
   *  //            'height': 534105,
   *  //            'confirmations': 123,
   *  //            'timestamp': 1441068774,
   *  //            'fees': 35436,
   *  //            'outputIndexes': [
   *  //              0
   *  //            ],
   *  //            'inputIndexes': [],
   *  //            'tx': {
   *  //              'hash': 'bb0ec3b96209fac9529570ea6f83a86af2cceedde4aaf2bfcc4796680d23f1c7',
   *  //              'version': 1,
   *  //              'inputs': [
   *  //                {
   *  //                  'prevTxId': 'ea5e5bafbf29cdf6f6097ab344128477e67889d4d6203cb43594836daa6cc425',
   *  //                  'outputIndex': 1,
   *  //                  'sequenceNumber': 4294967294,
   *  //                  'script': '483045022100f4d169783bef70e3943d2a617cce55d9fe4e33fc6f9880b8277265e2f619a97002201238648abcdf52960500664e969046d41755f7fc371971ebc78002fc418465a6012103acdcd31d51272403ce0829447e59e2ac9e08ed0bf92011cbf7420addf24534e6',
   *  //                  'scriptString': '72 0x3045022100f4d169783bef70e3943d2a617cce55d9fe4e33fc6f9880b8277265e2f619a97002201238648abcdf52960500664e969046d41755f7fc371971ebc78002fc418465a601 33 0x03acdcd31d51272403ce0829447e59e2ac9e08ed0bf92011cbf7420addf24534e6',
   *  //                  'output': {
   *  //                    'satoshis': 2796764565,
   *  //                    'script': '76a91488b1fe8aec5ae4358a11447a2f22b2781faedb9b88ac'
   *  //                  }
   *  //                }
   *  //              ],
   *  //              'outputs': [
   *  //                {
   *  //                  'satoshis': 2782729129,
   *  //                  'script': '76a9143583efb5e64a4668c6c54bb5fcc30af4417b4f2d88ac'
   *  //                },
   *  //                {
   *  //                  'satoshis': 14000000,
   *  //                  'script': '76a9149713201957f42379e574d7c70d506ee49c2c8ad688ac'
   *  //                }
   *  //              ],
   *  //             'nLockTime': 534089
   *  //           }
   *  //         }
   *  // ]
   *
   */
  async details(address) {
    try {
      _this._validateParam(address)
      return _this._callAxios(address, 'details')
    } catch (e) {
      _this._handleError(e)
    }
  }

  _validateParam(address) {
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
