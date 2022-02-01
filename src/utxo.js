/*
  High-level functions for working with UTXOs

  TODO:
  - Make a getWL() clone of get(), but uses hydrateUtxosWL()
*/

// Local libraries
const Electrumx = require('./electrumx')
const Slp = require('./slp/slp')
const PsfSlpIndexer = require('./psf-slp-indexer')
const BigNumber = require('bignumber.js')

class UTXO {
  constructor (config = {}) {
    // Encapsulate dependencies for easier mocking.
    this.electrumx = new Electrumx(config)
    this.slp = new Slp(config)
    this.psfSlpIndexer = new PsfSlpIndexer(config)
    this.BigNumber = BigNumber
  }

  /**
   * @api Utxo.getOld() getOld()
   * @apiName getOld
   * @apiGroup UTXO
   * @apiDescription Get UTXOs for an address (from SLPDB)
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
   *     let utxos = await bchjs.Utxo.getOld('simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj');
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
  async getOld (address, useWhitelist = false) {
    try {
      if (!address) {
        throw new Error('Address must be an array or a string')
      }

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

      if (err.error) throw new Error(err.error)
      throw err
    }
  }

  /**
   * @api Utxo.get() get()
   * @apiName get
   * @apiGroup UTXO
   * @apiDescription Get UTXOs for an address (from psf-slp-indexer)
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
   */
  // This version of get() uses the psf-slp-indexer. It will replace the older
  // get() function that uses SLPDB.
  // TODO: NFT UTXOs are identified as non-token UTXOs, which will cause a wallet
  // to burn them. The psf-slp-indexer needs to be updated to mark these UTXOs.
  async get (address) {
    try {
      // Convert address to an array if it is a string.
      if (typeof address !== 'string') {
        throw new Error('address input must be a string')
      }

      // Ensure the address is a BCH address.
      const addr = this.slp.Address.toCashAddress(address)

      // Get the UTXOs associated with the address.
      const utxoData = await this.electrumx.utxo(addr)
      // console.log(`utxoData: ${JSON.stringify(utxoData, null, 2)}`)
      const utxos = utxoData.utxos

      let slpUtxos = []

      // Get SLP UTXOs from the psf-slp-indexer
      try {
        const slpUtxoData = await this.psfSlpIndexer.balance(addr)
        // console.log(`slpUtxoData: ${JSON.stringify(slpUtxoData, null, 2)}`)

        slpUtxos = slpUtxoData.balance.utxos
      } catch (err) {
        // console.log('err: ', err)

        // Exit quietly if address has no SLP UTXOs. Otherwise, throw the error.
        if (err.error && !err.error.includes('Key not found in database')) {
          throw err
        }
      }

      // Loop through the Fulcrum UTXOs.
      for (let i = 0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]

        // Loop through the UTXOs from psf-slp-indexer.
        for (let j = 0; j < slpUtxos.length; j++) {
          const thisSlpUtxo = slpUtxos[j]

          // If the non-hydrated UTXO matches the SLP UTXO, then combine the data
          // and mark the UTXO as an SLP token.
          if (
            thisUtxo.tx_hash === thisSlpUtxo.txid &&
            thisUtxo.tx_pos === thisSlpUtxo.vout
          ) {
            thisUtxo.txid = thisUtxo.tx_hash
            thisUtxo.vout = thisUtxo.tx_pos
            thisUtxo.isSlp = true
            thisUtxo.type = thisSlpUtxo.type
            thisUtxo.qty = thisSlpUtxo.qty
            thisUtxo.tokenId = thisSlpUtxo.tokenId
            thisUtxo.address = thisSlpUtxo.address

            break
          }
        }

        // If there was no match, then this is a normal BCH UTXO. Mark it as such.
        if (!thisUtxo.isSlp) {
          thisUtxo.txid = thisUtxo.tx_hash
          thisUtxo.vout = thisUtxo.tx_pos
          thisUtxo.address = addr

          // Check the transaction to see if its a 'null' token, ignored by
          // the indexer.
          const txData = await this.psfSlpIndexer.tx(thisUtxo.tx_hash)
          // console.log(`txData: ${JSON.stringify(txData, null, 2)}`)
          if (txData.txData.isValidSlp === null) {
            thisUtxo.isSlp = null
          } else {
            thisUtxo.isSlp = false
          }
          // console.log(`thisUtxo.isSlp: ${thisUtxo.isSlp}`)
        }
      }

      // Get token UTXOs
      let type1TokenUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'token'
      )

      // Hydrate the UTXOs with additional token data.
      type1TokenUtxos = await this.hydrateTokenData(type1TokenUtxos)

      const bchUtxos = utxos.filter(x => x.isSlp === false)
      const type1BatonUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'baton'
      )
      const nullUtxos = utxos.filter(x => x.isSlp === null)

      const outObj = {
        address: addr,
        bchUtxos,
        slpUtxos: {
          type1: {
            tokens: type1TokenUtxos,
            mintBatons: type1BatonUtxos
          },
          nft: {} // Allocated for future support of NFT spec.
        },
        nullUtxos
      }

      return outObj
    } catch (err) {
      console.error('Error in bchjs.Utxo.get(): ', err)

      if (err.error) throw new Error(err.error)
      throw err
    }
  }

  // Hydrate an array of token UTXOs with token information.
  // Returns an array of token UTXOs with additional data.
  async hydrateTokenData (utxoAry) {
    try {
      // console.log('utxoAry: ', utxoAry)

      // Create a list of token IDs without duplicates.
      let tokenIds = utxoAry.map(x => x.tokenId)

      // Remove duplicates. https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
      tokenIds = [...new Set(tokenIds)]
      // console.log('tokenIds: ', tokenIds)

      // Get Genesis data for each tokenId
      const genesisData = []
      for (let i = 0; i < tokenIds.length; i++) {
        const thisTokenId = tokenIds[i]
        const thisTokenData = await this.psfSlpIndexer.tokenStats(thisTokenId)
        // console.log('thisTokenData: ', thisTokenData)

        genesisData.push(thisTokenData)
      }
      // console.log('genesisData: ', genesisData)

      // Hydrate each token UTXO with data from the genesis transaction.
      for (let i = 0; i < utxoAry.length; i++) {
        const thisUtxo = utxoAry[i]

        // Get the genesis data for this token.
        const genData = genesisData.filter(
          x => x.tokenData.tokenId === thisUtxo.tokenId
        )
        // console.log('genData: ', genData)

        thisUtxo.ticker = genData[0].tokenData.ticker
        thisUtxo.name = genData[0].tokenData.name
        thisUtxo.documentUri = genData[0].tokenData.documentUri
        thisUtxo.documentHash = genData[0].tokenData.documentHash
        thisUtxo.decimals = genData[0].tokenData.decimals

        // Calculate the real token quantity
        const qty = new BigNumber(thisUtxo.qty).dividedBy(
          10 ** parseInt(thisUtxo.decimals)
        )
        thisUtxo.qtyStr = qty.toString()
      }

      return utxoAry
    } catch (err) {
      console.log('Error in hydrateTokenData()')
      throw err
    }
  }

  /**
   * @api Utxo.findBiggestUtxo() findBiggestUtxo()
   * @apiName findBiggestUtxo
   * @apiGroup UTXO
   * @apiDescription Get the biggest UTXO in an array.
   *
   * Given an array of BCH UTXOs, this method will return the biggest UTXO.
   * This is often the simplest way to pick a UTXO for generating a transaction.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const utxos = await bchjs.Utxo.get('bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z');
   *     const utxo = bchjs.Utxo.findBiggestUtxo(utxos[0].bchUtxos)
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  {
   *   "height": 655431,
   *   "tx_hash": "7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b",
   *   "tx_pos": 0,
   *   "value": 800,
   *   "txid": "7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b",
   *   "vout": 0,
   *   "isValid": false,
   *   "satoshis": 800
   *  }
   */
  // Returns the utxo with the biggest balance from an array of utxos.
  findBiggestUtxo (utxos) {
    let largestAmount = 0
    let largestIndex = 0

    if (!Array.isArray(utxos)) {
      throw new Error('utxos input to findBiggestUtxo() must be an array')
    }

    for (let i = 0; i < utxos.length; i++) {
      const thisUtxo = utxos[i]

      // Give Elecrumx utxos a satoshis property.
      if (thisUtxo.value) {
        if (!thisUtxo.satoshis) thisUtxo.satoshis = Number(thisUtxo.value)
      }

      if (!thisUtxo.satoshis) {
        throw new Error(
          'UTXOs require a satoshis or value property for findBiggestUtxo()'
        )
      }

      if (thisUtxo.satoshis > largestAmount) {
        largestAmount = thisUtxo.satoshis
        largestIndex = i
      }
    }

    return utxos[largestIndex]
  }
}

module.exports = UTXO
