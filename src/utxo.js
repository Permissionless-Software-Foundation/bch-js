/*
  High-level functions for working with UTXOs

  TODO:
  - Make a getWL() clone of get(), but uses hydrateUtxosWL()
*/

// Local libraries
const Electrumx = require('./electrumx')
const Slp = require('./slp/slp')

class UTXO {
  constructor (config) {
    // Encapsulate dependencies for easier mocking.
    this.electrumx = new Electrumx(config)
    this.slp = new Slp(config)
  }

  /**
   * @api Utxo.get() get()
   * @apiName get
   * @apiGroup UTXO
   * @apiDescription Get UTXOs for an address
   *
   * Given an address, this function will return an object with thre following
   * properties:
   * - address: "" - the address these UTXOs are associated with
   * - bchUtxos: [] - UTXOs confirmed to be spendable as normal BCH
   * - nullUtxo: [] - UTXOs that did not pass SLP validation. Should be ignored and
   *   not spent, to be safe.
   * - slpUtxos: {} - UTXOs confirmed to be colored as valid SLP tokens
   *   - type1: {}
   *     - tokens: [] - SLP token Type 1 tokens.
   *     - mintBatons: [] - SLP token Type 1 mint batons.
   *   - nft: {}
   *     - tokens: [] - NFT tokens
   *     - groupTokens: [] - NFT Group tokens, used to create NFT tokens.
   *     - groupMintBatons: [] - Minting baton to create more NFT Group tokens.
   *
   * Note: You can pass in an optional second Boolean argument. The default
   * `false` will use the normal waterfall validation method. Set to `true`,
   * SLP UTXOs will be validated with the whitelist filtered SLPDB. This will
   * result is many more UTXOs in the `nullUtxos` array.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let utxos = await bchjs.Utxo.get('simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj');
   *     console.log(utxos);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   * [
   *  {
   *   "address": "bitcoincash:qrm0c67wwqh0w7wjxua2gdt2xggnm90xws00a3lezv",
   *   "bchUtxos": [
   *    {
   *      "height": 674513,
   *      "tx_hash": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *      "tx_pos": 3,
   *      "value": 38134,
   *      "txid": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *      "vout": 3,
   *      "isValid": false
   *    }
   *   ],
   *   "nullUtxos": [],
   *   "slpUtxos": {
   *    "type1": {
   *      "mintBatons": [
   *        {
   *          "height": 674512,
   *          "tx_hash": "acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230",
   *          "tx_pos": 2,
   *          "value": 546,
   *          "txid": "acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230",
   *          "vout": 2,
   *          "utxoType": "minting-baton",
   *          "tokenId": "acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230",
   *          "tokenTicker": "SLPTEST",
   *          "tokenName": "SLP Test Token",
   *          "tokenDocumentUrl": "https://FullStack.cash",
   *          "tokenDocumentHash": "",
   *          "decimals": 8,
   *          "tokenType": 1,
   *          "isValid": true
   *        }
   *      ],
   *      "tokens": [
   *        {
   *          "height": 674512,
   *          "tx_hash": "acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230",
   *          "tx_pos": 1,
   *          "value": 546,
   *          "txid": "acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230",
   *          "vout": 1,
   *          "utxoType": "token",
   *          "tokenQty": "100",
   *          "tokenId": "acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230",
   *          "tokenTicker": "SLPTEST",
   *          "tokenName": "SLP Test Token",
   *          "tokenDocumentUrl": "https://FullStack.cash",
   *          "tokenDocumentHash": "",
   *          "decimals": 8,
   *          "tokenType": 1,
   *          "isValid": true
   *        }
   *      ]
   *   },
   *   "nft": {
   *      "groupMintBatons": [
   *        {
   *          "height": 674513,
   *          "tx_hash": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *          "tx_pos": 2,
   *          "value": 546,
   *          "txid": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *          "vout": 2,
   *          "utxoType": "minting-baton",
   *          "transactionType": "mint",
   *          "tokenId": "a9a2458a0f9f0761d5b8725c256f2e7fa35b9de4dec6f47b46e9f20d92d0e395",
   *          "tokenType": 129,
   *          "tokenTicker": "NFTGT",
   *          "tokenName": "NFT Test Group Token",
   *          "tokenDocumentUrl": "https://FullStack.cash",
   *          "tokenDocumentHash": "",
   *          "decimals": 0,
   *          "mintBatonVout": 2,
   *          "isValid": true
   *        }
   *      ],
   *      "groupTokens": [
   *        {
   *          "height": 674513,
   *          "tx_hash": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *          "tx_pos": 1,
   *          "value": 546,
   *          "txid": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *          "vout": 1,
   *          "utxoType": "token",
   *          "tokenQty": "10",
   *          "transactionType": "mint",
   *          "tokenId": "a9a2458a0f9f0761d5b8725c256f2e7fa35b9de4dec6f47b46e9f20d92d0e395",
   *          "tokenType": 129,
   *          "tokenTicker": "NFTGT",
   *          "tokenName": "NFT Test Group Token",
   *          "tokenDocumentUrl": "https://FullStack.cash",
   *          "tokenDocumentHash": "",
   *          "decimals": 0,
   *          "mintBatonVout": 2,
   *          "isValid": true
   *        }
   *      ],
   *      "tokens": [
   *        {
   *          "height": 674512,
   *          "tx_hash": "eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b",
   *          "tx_pos": 1,
   *          "value": 546,
   *          "txid": "eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b",
   *          "vout": 1,
   *          "utxoType": "token",
   *          "tokenQty": "1",
   *          "tokenId": "eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b",
   *          "tokenTicker": "NFT004",
   *          "tokenName": "NFT Child",
   *          "tokenDocumentUrl": "https://FullStack.cash",
   *          "tokenDocumentHash": "",
   *          "decimals": 0,
   *          "tokenType": 65,
   *          "isValid": true
   *        }
   *      ]
   *    }
   *   }
   *  }
   * ]
   *
   *
   */
  async get (address, useWhitelist = false) {
    try {
      // Convert address to an array if it is a string.
      if (typeof address === 'string') address = [address]

      // Throw an error if there are more than 20 addresses passed in at a time.
      if (address.length > 20) throw new Error('Too many elements, 20 max.')

      // Covert each address to a BCH address.
      const addr = address.map(elem => this.slp.Address.toCashAddress(elem))

      // Get the UTXOs associated with the address.
      const utxoData = await this.electrumx.utxo(addr)
      // console.log(`utxoData: ${JSON.stringify(utxoData, null, 2)}`)

      // Hydate the utxos with token information.
      let hydratedUtxos
      if (useWhitelist) {
        hydratedUtxos = await this.slp.Utils.hydrateUtxosWL(utxoData.utxos)
      } else {
        hydratedUtxos = await this.slp.Utils.hydrateUtxos(utxoData.utxos)
      }
      // console.log(`hydratedUtxos: ${JSON.stringify(hydratedUtxos, null, 2)}`)

      const retAry = [] // Return array

      // Loop through each address.
      for (let i = 0; i < hydratedUtxos.slpUtxos.length; i++) {
        const thisAddr = hydratedUtxos.slpUtxos[i]

        const addrObj = {
          address: thisAddr.address
        }

        // Filter out the different types of UTXOs.
        addrObj.bchUtxos = thisAddr.utxos.filter(elem => elem.isValid === false)
        addrObj.nullUtxos = thisAddr.utxos.filter(elem => elem.isValid === null)

        // Break down the SLP UTXOs.
        addrObj.slpUtxos = {
          type1: {},
          nft: {}
        }

        // Token Type 1 Minting Batons.
        addrObj.slpUtxos.type1.mintBatons = thisAddr.utxos.filter(elem => {
          const isValid = elem.isValid === true
          const tokenTypeIs1 = elem.tokenType === 1
          const isMintingBaton = elem.utxoType === 'minting-baton'

          return isValid && tokenTypeIs1 && isMintingBaton
        })

        // Token Type 1 tokens.
        addrObj.slpUtxos.type1.tokens = thisAddr.utxos.filter(elem => {
          const isValid = elem.isValid === true
          const tokenTypeIs1 = elem.tokenType === 1
          const isToken = elem.utxoType === 'token'

          return isValid && tokenTypeIs1 && isToken
        })

        // NFT Group Minting Batons
        addrObj.slpUtxos.nft.groupMintBatons = thisAddr.utxos.filter(elem => {
          const isValid = elem.isValid === true
          const tokenTypeIs129 = elem.tokenType === 129
          const isMintingBaton = elem.utxoType === 'minting-baton'

          return isValid && tokenTypeIs129 && isMintingBaton
        })

        // NFT Group tokens
        addrObj.slpUtxos.nft.groupTokens = thisAddr.utxos.filter(elem => {
          const isValid = elem.isValid === true
          const tokenTypeIs129 = elem.tokenType === 129
          const isToken = elem.utxoType === 'token'

          return isValid && tokenTypeIs129 && isToken
        })

        // NFT (Child) tokens
        addrObj.slpUtxos.nft.tokens = thisAddr.utxos.filter(elem => {
          const isValid = elem.isValid === true
          const tokenTypeIs65 = elem.tokenType === 65
          const isToken = elem.utxoType === 'token'

          return isValid && tokenTypeIs65 && isToken
        })

        retAry.push(addrObj)
      }

      return retAry
    } catch (err) {
      console.error('Error in bchjs.utxo.get()')
      throw err
    }
  }
}

module.exports = UTXO
