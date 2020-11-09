/*
  This library interacts with the REST API endpoints in bch-api that communicate
  with the Blockbook API.
*/

const axios = require("axios")

let _this

class Blockbook {
  constructor(config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    // console.log(`Blockbook apiToken: ${this.apiToken}`)

    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`
      }
    }

    _this = this
  }

  /**
   * @api Blockbook.balance() balance()
   * @apiName Blockbook Balance
   * @apiGroup Blockbook
   * @apiDescription Return Balance about an address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let balance = await bchjs.Blockbook.balance('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c');
   *     console.log(balance)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  //{
   *  //  "page": 1,
   *  //  "totalPages": 1,
   *  //  "itemsOnPage": 1000,
   *  //  "address": "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   *  //  "balance": "6000000",
   *  //  "totalReceived": "10185868",
   *  //  "totalSent": "4185868",
   *  //  "unconfirmedBalance": "0",
   *  //  "unconfirmedTxs": 0,
   *  //  "txs": 41,
   *  //  "txids": [
   *  //    "d31dc2cf66fe4d3d3ae18e1065def58a64920746b1702b52f060e5edeea9883b",
   *  //    "41e9a118765ecf7a1ba4487c0863e23dba343cc5880381a72f0365ac2546c5fa",
   *  //    "2f902dec880568511cefa87b9dd761563edeba9c8ba784dc9fca2f7c8c4e6f97",
   *  //    "eea57285462dd70dadcd431fc814857b3f81fe4d0a059a8c02c12fd7d33c02d1",
   *  //    "282b3b296b6aed7122586ed69f7a57d35584eaf94a4d1b1ad7d1b05d36cb79d1",
   *  //    "ac444896b3e32d17824fa6573eed3b89768c5c9085b7a71f3ba88e9d5ba67355",
   *  //    "a5f972572ee1753e2fd2457dd61ce5f40fa2f8a30173d417e49feef7542c96a1",
   *  //    "5165dc531aad05d1149bb0f0d9b7bda99c73e2f05e314bcfb5b4bb9ca5e1af5e",
   *  //    "54edaa42ff3d6559884a84ebb9bf5ef255635902f5f23b4854245d6b093d41d4",
   *  //    "2b0825188e909410a20a6fbdc58ff5ccf368844273f93f551222c91e6d0fa888",
   *  //    "7a12ea2c83d0c8a5d0f643974b0f04bc19be185c9011ed8fc33255a61d3198bb",
   *  //    "bd6aeeb0748251bb5dba7252ac766fb208c9909d7663c099568225d3bc998a7f",
   *  //    "7898bb1a8c5d933f9c2b24270522e8705b897c2f8d5b1c3477a6b952f2fe22ae",
   *  //    "8d35668a6838de8faa8dff5d8dedeb114bd8ffe6ae73d926264bc8328b2c46b5",
   *  //    "741b4692a14088438ab142cf0865fcbf3977aa7dbd2aafa9bf5f45e75e5e199a",
   *  //    "15f6a584080b04911121fbaca7bfcf3dd64ef2bfa5a01daf31e05a296c3e5e9e",
   *  //    "376de807f63253584c3edb80f92832ea90e8fdd7d8e68b2602e230d1b015e311",
   *  //    "eb5d0902e4a303f38223ecebb06bbf14da8a07d1ebb2d77a89dfb9e00e286c10",
   *  //    "11205c557af139f382c43f1f09f223cf28c64d939951fd569e5a30eee6178ccd",
   *  //    "ae05a78086b8d64db26d3047de3d6959a68f2a1ed3017ddf927e2c3b20a80b31",
   *  //    "7e0fc3cac7504d45b0f2ce68e807e592f0edf17914ab618a4cb4d93403d11c98",
   *  //    "1cafaacdfb85b0c33f496bf2c03c4f2ede508479bbad56ae99164dfd823a823f",
   *  //    "788add6a5cd961bdf7ca6145a3112462e0e51523d84a4a48047407a795433947",
   *  //    "49f09b616824a05eb14ae50c9fbc5d6a0c414d66a7d0b217aa75340c00ed8b85",
   *  //    "00f075805adf2a34563ecca33071d660a4c1e91d7d7045282c54554ee4844739",
   *  //    "8d048fd00cf375ba9bbea43730da1ce86fc3cb4026e1dd0e751c07fa50a652c6",
   *  //    "ac0e82ea84f93444602a99199dd80793f79a8ece5ac86156d2fff34f0bad44b2",
   *  //    "342f6815845797e0748f4716c923a0dc9b87de649b69925b36422f6d2dc23b7f",
   *  //    "0839a16b2411a1220c64c4d32a4c9b1e77ac5f47558921cf7c0a2adf25e0eb41",
   *  //    "62f42995711cb0308dac4203c5deaa2985f120559131e66aebc5164426fb6cee",
   *  //    "2ada093fe13c9c04da9582bb304923ce08312eaec92560b9128cdb9e93c5f52f",
   *  //    "e0aadd861a06993e39af932bb0b9ad69e7b37ef5843a13c6724789e1c94f3513",
   *  //    "925490ce60334aca204d82a61b634d89fe4cc9de429c7b6cb5ec420df3e3be5e",
   *  //    "60cb69f29c150378abe21d157858713f82c4e2122867597a2573474763a9e94e",
   *  //    "369a589173969c1c882cfb2d82b1e0ec90076ec827ff9d0f32ffc115690c93c3",
   *  //    "43324ef3f5fdd55b645ba14de8c0667be9b223d60b3d1dcd76cf8fdeb0fd32e4",
   *  //    "d2985c9b1c5c18fc2f6a963b7cb850606c4a18fcb85619057211ce3c8bcec696",
   *  //    "dded59fe377517e52918deae8912a096658ebf5ae61992d39953c8bc3932a11b",
   *  //    "2dc053f55a666a3d2a08b1c680b704d62a55506d14ad884add87edcc56b9277d",
   *  //    "544c15ce35c0f2e808d28f29d6587f1ec9276233e29856b7f2938cf0daef0026",
   *  //    "81039b1d7b855b133f359f9dc65f776bd105650153a941675fedc504228ddbd3"
   *  //  ]
   *  //}
   *
   *(async () => {
   *   try {
   *     let balance = await bchjs.Blockbook.balance(['bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c','1BFHGm4HzqgXXyNX8n7DsQno5DAC4iLMRA']);
   *     console.log(balance)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * //[
   * // {
   * //   "page": 1,
   * //   "totalPages": 1,
   * //   "itemsOnPage": 1000,
   * //   "address": "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c",
   * //   "balance": "6000000",
   * //   "totalReceived": "10185868",
   * //   "totalSent": "4185868",
   * //   "unconfirmedBalance": "0",
   * //   "unconfirmedTxs": 0,
   * //   "txs": 41,
   * //   "txids": [
   * //     "d31dc2cf66fe4d3d3ae18e1065def58a64920746b1702b52f060e5edeea9883b",
   * //     "41e9a118765ecf7a1ba4487c0863e23dba343cc5880381a72f0365ac2546c5fa",
   * //     "2f902dec880568511cefa87b9dd761563edeba9c8ba784dc9fca2f7c8c4e6f97",
   * //     "eea57285462dd70dadcd431fc814857b3f81fe4d0a059a8c02c12fd7d33c02d1",
   * //     "282b3b296b6aed7122586ed69f7a57d35584eaf94a4d1b1ad7d1b05d36cb79d1",
   * //     "ac444896b3e32d17824fa6573eed3b89768c5c9085b7a71f3ba88e9d5ba67355",
   * //     "a5f972572ee1753e2fd2457dd61ce5f40fa2f8a30173d417e49feef7542c96a1",
   * //     "5165dc531aad05d1149bb0f0d9b7bda99c73e2f05e314bcfb5b4bb9ca5e1af5e",
   * //     "54edaa42ff3d6559884a84ebb9bf5ef255635902f5f23b4854245d6b093d41d4",
   * //     "2b0825188e909410a20a6fbdc58ff5ccf368844273f93f551222c91e6d0fa888",
   * //     "7a12ea2c83d0c8a5d0f643974b0f04bc19be185c9011ed8fc33255a61d3198bb",
   * //     "bd6aeeb0748251bb5dba7252ac766fb208c9909d7663c099568225d3bc998a7f",
   * //     "7898bb1a8c5d933f9c2b24270522e8705b897c2f8d5b1c3477a6b952f2fe22ae",
   * //     "8d35668a6838de8faa8dff5d8dedeb114bd8ffe6ae73d926264bc8328b2c46b5",
   * //     "741b4692a14088438ab142cf0865fcbf3977aa7dbd2aafa9bf5f45e75e5e199a",
   * //     "15f6a584080b04911121fbaca7bfcf3dd64ef2bfa5a01daf31e05a296c3e5e9e",
   * //     "376de807f63253584c3edb80f92832ea90e8fdd7d8e68b2602e230d1b015e311",
   * //     "eb5d0902e4a303f38223ecebb06bbf14da8a07d1ebb2d77a89dfb9e00e286c10",
   * //     "11205c557af139f382c43f1f09f223cf28c64d939951fd569e5a30eee6178ccd",
   * //     "ae05a78086b8d64db26d3047de3d6959a68f2a1ed3017ddf927e2c3b20a80b31",
   * //     "7e0fc3cac7504d45b0f2ce68e807e592f0edf17914ab618a4cb4d93403d11c98",
   * //     "1cafaacdfb85b0c33f496bf2c03c4f2ede508479bbad56ae99164dfd823a823f",
   * //     "788add6a5cd961bdf7ca6145a3112462e0e51523d84a4a48047407a795433947",
   * //     "49f09b616824a05eb14ae50c9fbc5d6a0c414d66a7d0b217aa75340c00ed8b85",
   * //     "00f075805adf2a34563ecca33071d660a4c1e91d7d7045282c54554ee4844739",
   * //     "8d048fd00cf375ba9bbea43730da1ce86fc3cb4026e1dd0e751c07fa50a652c6",
   * //     "ac0e82ea84f93444602a99199dd80793f79a8ece5ac86156d2fff34f0bad44b2",
   * //     "342f6815845797e0748f4716c923a0dc9b87de649b69925b36422f6d2dc23b7f",
   * //     "0839a16b2411a1220c64c4d32a4c9b1e77ac5f47558921cf7c0a2adf25e0eb41",
   * //     "62f42995711cb0308dac4203c5deaa2985f120559131e66aebc5164426fb6cee",
   * //     "2ada093fe13c9c04da9582bb304923ce08312eaec92560b9128cdb9e93c5f52f",
   * //     "e0aadd861a06993e39af932bb0b9ad69e7b37ef5843a13c6724789e1c94f3513",
   * //     "925490ce60334aca204d82a61b634d89fe4cc9de429c7b6cb5ec420df3e3be5e",
   * //     "60cb69f29c150378abe21d157858713f82c4e2122867597a2573474763a9e94e",
   * //     "369a589173969c1c882cfb2d82b1e0ec90076ec827ff9d0f32ffc115690c93c3",
   * //     "43324ef3f5fdd55b645ba14de8c0667be9b223d60b3d1dcd76cf8fdeb0fd32e4",
   * //     "d2985c9b1c5c18fc2f6a963b7cb850606c4a18fcb85619057211ce3c8bcec696",
   * //     "dded59fe377517e52918deae8912a096658ebf5ae61992d39953c8bc3932a11b",
   * //     "2dc053f55a666a3d2a08b1c680b704d62a55506d14ad884add87edcc56b9277d",
   * //     "544c15ce35c0f2e808d28f29d6587f1ec9276233e29856b7f2938cf0daef0026",
   * //     "81039b1d7b855b133f359f9dc65f776bd105650153a941675fedc504228ddbd3"
   * //   ]
   * // },
   * // {
   * //   "page": 1,
   * //   "totalPages": 1,
   * //   "itemsOnPage": 1000,
   * //   "address": "bitcoincash:qpcxf2sv9hjw08nvpgffpamfus9nmksm3chv5zqtnz",
   * //   "balance": "0",
   * //   "totalReceived": "36781097",
   * //   "totalSent": "36781097",
   * //   "unconfirmedBalance": "0",
   * //   "unconfirmedTxs": 0,
   * //   "txs": 11,
   * //   "txids": [
   * //     "11205c557af139f382c43f1f09f223cf28c64d939951fd569e5a30eee6178ccd",
   * //     "ae05a78086b8d64db26d3047de3d6959a68f2a1ed3017ddf927e2c3b20a80b31",
   * //     "7e0fc3cac7504d45b0f2ce68e807e592f0edf17914ab618a4cb4d93403d11c98",
   * //     "60cb69f29c150378abe21d157858713f82c4e2122867597a2573474763a9e94e",
   * //     "f737485aaee3c10b13013fa109bb6294b099246134ca9885f4cc332dbc6c9bb4",
   * //     "decd5b9c0c959e4e543182093e8f7f8bc7a6ecd96a8a062daaeff3667f8feca7",
   * //     "94e69a627a34ae27fca81d15fff4323a7ce1f7c275c7485762ce018221017632",
   * //     "e67c70787af7f3506263c9eda007f3d2d24bd750ff95b5c50a120d9118dfd807",
   * //     "8e5e00704a147d54028f94d52df7730e821b9c6cd4bd29494e5636f49c199d6a",
   * //     "15102827c108566ea5daf725c09079c1a3f42ef99d1eb68ea8c584f7b16ab87a",
   * //     "cc27be8846276612dfce5924b7be96556212f0f0e62bd17641732175edb9911e"
   * //   ]
   * // }
   * //
   *
   */

  async balance(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response = await axios.get(
          `${this.restURL}blockbook/balance/${address}`,
          _this.axiosOptions
        )

        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}blockbook/balance`,
          {
            addresses: address
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockbook.utxo()  utxo()
   * @apiName Blockbook Utxo
   * @apiGroup Blockbook
   * @apiDescription Return list of uxto for address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let utxo = await bchjs.Blockbook.utxo('bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * [{
   *    "txid": "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
   *    "vout": 0,
   *    "value": "1000",
   *    "height": 604392,
   *    "confirmations": 25530,
   *    "satoshis": 1000
   * }]
   *
   *
   * (async () => {
   *   try {
   *     let utxo = await bchjs.Blockbook.utxo([
   *             "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
   *             "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
   *          ]);
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  [
   *    [{
   *      "txid": "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
   *      "vout": 0,
   *      "value": "1000",
   *      "height": 604392,
   *      "confirmations": 25530,
   *      "satoshis": 1000
   *    }],
   *    [{
   *      "txid": "d5228d2cdc77fbe5a9aa79f19b0933b6802f9f0067f42847fc4fe343664723e5",
   *      "vout": 0,
   *      "value": "6000",
   *      "confirmations": 0,
   *      "satoshis": 6000
   *    }]
   *  ]
   */
  async utxo(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response = await axios.get(
          `${this.restURL}blockbook/utxos/${address}`,
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}blockbook/utxos`,
          {
            addresses: address
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockbook.tx()  tx()
   * @apiName Blockbook Tx
   * @apiGroup Blockbook
   * @apiDescription Get details on a transaction.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let txDetails = await bchjs.Blockbook.tx(`5fe9b74056319a8c87f45cc745030715a6180758b94938dbf90d639d55652392`);
   *     console.log(txDetails);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   */
  async tx(txid) {
    try {
      // Handle single txid.
      if (typeof txid === "string") {
        const response = await axios.get(
          `${this.restURL}blockbook/tx/${txid}`,
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(txid)) {
        const response = await axios.post(
          `${this.restURL}blockbook/tx`,
          {
            txids: txid
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error(`Input txid must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Blockbook
