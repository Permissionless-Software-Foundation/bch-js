/*
  High-level functions for working with Transactions
*/

const RawTransaction = require('./raw-transactions')
const SlpUtils = require('./slp/utils')

class Transaction {
  constructor (config) {
    // Encapsulate dependencies
    this.slpUtils = new SlpUtils(config)
    this.rawTransaction = new RawTransaction(config)
  }

  // Get hydrated details about a transaction, including SLP token details if
  // it's an SLP transaction.
  async get (txid) {
    try {
      if (typeof txid !== 'string') {
        throw new Error('Input must be a string or array of strings.')
      }

      const txDetails = await this.rawTransaction.getTxData(txid)

      // Setup default SLP properties.
      txDetails.isValidSLPTx = false

      // First get the token information for the output. If that fails, then
      // this is not an SLP transaction, and this method can return false.
      let outTokenData
      try {
        outTokenData = await this.slpUtils.decodeOpReturn(txid)
        // console.log(`outTokenData: ${JSON.stringify(outTokenData, null, 2)}`)

        // Get Genesis data for this token.
        const genesisData = await this.slpUtils.decodeOpReturn(
          outTokenData.tokenId
          // decodeOpReturnCache
          // usrObj // pass user data when making an internal call.
        )
        // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

        // Add token information to the tx details object.
        txDetails.tokenTxType = outTokenData.txType
        txDetails.tokenId = outTokenData.tokenId
        txDetails.tokenTicker = genesisData.ticker
        txDetails.tokenName = genesisData.name
        txDetails.tokenDecimals = genesisData.decimals
        txDetails.tokenUri = genesisData.documentUri
        txDetails.tokenDocHash = genesisData.documentHash

        // Add the token quantity to each output.
        for (let i = 0; i < outTokenData.amounts.length; i++) {
          const rawQty = outTokenData.amounts[i]
          const realQty = Number(rawQty) / Math.pow(10, txDetails.tokenDecimals)

          txDetails.vout[i + 1].tokenQty = realQty
        }

        // Add tokenQty = null to any outputs that don't have a value.
        for (let i = 0; i < txDetails.vout.length; i++) {
          const thisVout = txDetails.vout[i]

          if (!thisVout.tokenQty && thisVout.tokenQty !== 0) {
            thisVout.tokenQty = null
          }
        }

        // Loop through each input and retrieve the token data.
        for (let i = 0; i < txDetails.vin.length; i++) {
          const thisVin = txDetails.vin[i]

          try {
            // If decodeOpReturn() throws an error, then this input is not
            // from an SLP transaction and can be ignored.
            const inTokenData = await this.slpUtils.decodeOpReturn(thisVin.txid)
            // console.log(
            //   `vin[${i}] tokenData: ${JSON.stringify(inTokenData, null, 2)}`
            // )

            // Get the appropriate vout token amount. This may throw an error,
            // which means this Vin is not actually a token UTXO, it was just
            // associated with a previous token TX.
            const tokenQty = inTokenData.amounts[thisVin.vout - 1]
            // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)

            if (tokenQty) {
              const realQty =
                Number(tokenQty) / Math.pow(10, txDetails.tokenDecimals)

              thisVin.tokenQty = realQty
              // txDetails.vin[i].tokenQty = tokenQty
            } else {
              thisVin.tokenQty = null
            }
          } catch (err) {
            // If decodeOpReturn() throws an error, then this input is not
            // from an SLP transaction and can be ignored.
            // thisVin.tokenQty = null
            thisVin.tokenQty = null
            continue
          }
        }

        // Finally, validate the SLP TX.
        // this.slpUtils.waterfallValidateTxid(txid, usrObj)
        txDetails.isValidSLPTx = await this.slpUtils.waterfallValidateTxid(txid)
      } catch (err) {
        // console.log('Error: ', err)

        // If decoding the op_return fails, then it's not an SLP transaction,
        // and the non-hyrated TX details can be returned.
        return txDetails
      }

      return txDetails
    } catch (err) {
      console.error('Error in transactions.js/get()')
      throw err
    }
  }

  // Wraps getTxData(), but also appends SLP token information to each input
  // and output of the transaction. This is a very API-heavy call.
  // Returns false if the txid is not an SLP transaction.
  //
  // Warning! This is a prototype function and the output can change at any time
  // without reflecting a change in the semantic version. DO NOT USE IN PRODUCTION.
  // async getTxDataSlp (txid) {
  //   try {
  //     if (typeof txid !== 'string') {
  //       throw new Error('Input must be a string or array of strings.')
  //     }
  //
  //     const txDetails = await this.getTxData(txid)
  //
  //     // First get the token information for the output. If that fails, then
  //     // this is not an SLP transaction, and this method can return false.
  //     let outTokenData
  //     try {
  //       outTokenData = await this.slpUtils.decodeOpReturn(txid)
  //       // console.log(`outTokenData: ${JSON.stringify(outTokenData, null, 2)}`)
  //
  //       // Add token information to the tx details object.
  //       txDetails.tokenTxType = outTokenData.txType
  //       txDetails.tokenId = outTokenData.tokenId
  //
  //       // Add the token quantity to each output.
  //       for (let i = 0; i < outTokenData.amounts.length; i++) {
  //         txDetails.vout[i + 1].tokenQty = outTokenData.amounts[i]
  //       }
  //
  //       // Loop through each input and retrieve the token data.
  //       for (let i = 0; i < txDetails.vin.length; i++) {
  //         const thisVin = txDetails.vin[i]
  //
  //         try {
  //           // If decodeOpReturn() throws an error, then this input is not
  //           // from an SLP transaction and can be ignored.
  //           const inTokenData = await this.slpUtils.decodeOpReturn(thisVin.txid)
  //           // console.log(
  //           //   `vin[${i}] tokenData: ${JSON.stringify(inTokenData, null, 2)}`
  //           // )
  //
  //           // Get the appropriate vout token amount. This may throw an error,
  //           // which means this Vin is not actually a token UTXO, it was just
  //           // associated with a previous token TX.
  //           const tokenQty = inTokenData.amounts[thisVin.vout - 1]
  //           // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)
  //
  //           if (tokenQty) {
  //             thisVin.tokenQty = tokenQty
  //             // txDetails.vin[i].tokenQty = tokenQty
  //           } else {
  //             thisVin.tokenQty = null
  //           }
  //         } catch (err) {
  //           // console.log('catch 2: ', err)
  //           // If decodeOpReturn() throws an error, then this input is not
  //           // from an SLP transaction and can be ignored.
  //           // thisVin.tokenQty = null
  //           thisVin.tokenQty = null
  //           continue
  //         }
  //         // console.log(
  //         //   `2: txDetails.vin[i]: ${JSON.stringify(txDetails.vin[i], null, 2)}`
  //         // )
  //       }
  //     } catch (err) {
  //       // console.log('catch 1: ', err)
  //       return false
  //     }
  //
  //     return txDetails
  //   } catch (error) {
  //     if (error.response && error.response.data) throw error.response.data
  //     else throw error
  //   }
  // }
}

module.exports = Transaction
