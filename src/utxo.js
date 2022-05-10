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
const Blockchain = require('./blockchain')

class UTXO {
  constructor (config = {}) {
    // Encapsulate dependencies for easier mocking.
    this.electrumx = new Electrumx(config)
    this.slp = new Slp(config)
    this.psfSlpIndexer = new PsfSlpIndexer(config)
    this.BigNumber = BigNumber
    this.blockchain = new Blockchain(config)
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
            thisUtxo.tokenType = thisSlpUtxo.tokenType

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
        x => x.isSlp === true && x.type === 'token' && x.tokenType === 1
      )

      // Hydrate the UTXOs with additional token data.
      type1TokenUtxos = await this.hydrateTokenData(type1TokenUtxos)

      // Collect and hydrate any type1 baton UTXOs
      const bchUtxos = utxos.filter(x => x.isSlp === false)
      let type1BatonUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'baton' && x.tokenType === 1
      )
      type1BatonUtxos = await this.hydrateTokenData(type1BatonUtxos)

      // Collect and hydrate NFT Group tokens
      let nftGroupTokenUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'token' && x.tokenType === 129
      )
      nftGroupTokenUtxos = await this.hydrateTokenData(nftGroupTokenUtxos)

      // Collect and hydrate any Group baton UTXOs
      let groupBatonUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'baton' && x.tokenType === 129
      )
      groupBatonUtxos = await this.hydrateTokenData(groupBatonUtxos)

      // Collect and hydrate NFT child tokens
      let nftChildTokenUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'token' && x.tokenType === 65
      )
      nftChildTokenUtxos = await this.hydrateTokenData(nftChildTokenUtxos)

      // Isolate any UTXOs that are marked null by the SLP indexer.
      const nullUtxos = utxos.filter(x => x.isSlp === null)

      const outObj = {
        address: addr,
        bchUtxos,
        slpUtxos: {
          type1: {
            tokens: type1TokenUtxos,
            mintBatons: type1BatonUtxos
          },
          group: {
            tokens: nftGroupTokenUtxos,
            mintBatons: groupBatonUtxos
          },
          nft: {
            tokens: nftChildTokenUtxos
          }
        },
        nullUtxos
      }

      return outObj
    } catch (err) {
      console.error('Error in bchjs.Utxo.get()')

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

        if (thisUtxo.type !== 'baton') {
          // Calculate the real token quantity
          const qty = new BigNumber(thisUtxo.qty).dividedBy(
            10 ** parseInt(thisUtxo.decimals)
          )
          thisUtxo.qtyStr = qty.toString()

          // tokenQty is property expected by SLP.tokentype1.js library
          thisUtxo.tokenQty = thisUtxo.qtyStr
        }
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

  /**
   * @api Utxo.isValid() isValid()
   * @apiName isValid
   * @apiGroup UTXO
   * @apiDescription Validate that UTXO exists and is still spendable.
   *
   * Given a UTXO, this method will return true if the UTXO is still in the
   * mempool and still valid for spending. It will return false if the UTXO
   * has been spent.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const utxos = await bchjs.Utxo.get('bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z');
   *     const isValid = bchjs.Utxo.isValid(utxos.bchUtxos[0])
   *     console.log(isValid);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  true
   */
  async isValid (utxo) {
    try {
      // console.log('utxo: ', utxo)

      // Convert different properties from different indexers
      const txid = utxo.txid || utxo.tx_hash
      const vout = utxo.vout | utxo.tx_pos

      // Query the full node
      const txOut = await this.blockchain.getTxOut(txid, vout, true)
      // console.log('txOut: ', txOut)

      // Simplify results to either true or false.
      let isValid = null
      if (txOut === null) {
        isValid = false
      } else {
        isValid = true
      }

      return isValid
    } catch (err) {
      console.log('Error in Utxo.isValid()')
      throw err
    }
  }
}

module.exports = UTXO
