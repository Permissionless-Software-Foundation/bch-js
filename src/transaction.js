/*
  High-level functions for working with Transactions
*/

const RawTransaction = require('./raw-transactions')
const SlpUtils = require('./slp/utils')
const BigNumber = require('bignumber.js')

class Transaction {
  constructor (config) {
    // Encapsulate dependencies
    this.slpUtils = new SlpUtils(config)
    this.rawTransaction = new RawTransaction(config)
  }

  /**
   * @api Transaction.get() get()
   * @apiName get
   * @apiGroup Transaction
   * @apiDescription
   * Returns an object of transaction data, including addresses for input UTXOs.
   * If it is a SLP token transaction, the token information for inputs and
   * outputs will also be included.
   *
   * This is an API heavy call. This function will only work with a single txid.
   * It does not yet support an array of TXIDs.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   *  let txData = await bchjs.Transaction.get("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
   *  console.log(txData);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   */
  async get (txid) {
    try {
      if (typeof txid !== 'string') {
        throw new Error(
          'Input to Transaction.get() must be a string containing a TXID.'
        )
      }

      const txDetails = await this.rawTransaction.getTxData(txid)
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

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
          // const realQty = Number(rawQty) / Math.pow(10, txDetails.tokenDecimals)

          // Calculate the real quantity using a BigNumber, then convert it to a
          // floating point number.
          let realQty = new BigNumber(rawQty).dividedBy(
            10 ** parseInt(txDetails.tokenDecimals)
          )
          realQty = realQty.toString()
          // realQty = parseFloat(realQty)

          txDetails.vout[i + 1].tokenQtyStr = realQty
          txDetails.vout[i + 1].tokenQty = parseFloat(realQty)
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

            let tokenQty = 0
            if (inTokenData.txType === 'SEND') {
              // Get the appropriate vout token amount. This may throw an error,
              // which means this Vin is not actually a token UTXO, it was just
              // associated with a previous token TX.
              tokenQty = inTokenData.amounts[thisVin.vout - 1]
              // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)

              //
            } else if (inTokenData.txType === 'GENESIS') {
              // Only vout[1] of a Genesis transaction represents the tokens.
              // Any other outputs in that transaction are normal BCH UTXOs.
              if (thisVin.vout === 1) {
                tokenQty = inTokenData.qty
                // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)
              }
            } else if (inTokenData.txType === 'MINT') {
              // vout=1 (second output) recieves the newly minted tokens.
              if (thisVin.vout === 1) {
                tokenQty = inTokenData.qty
              } else {
                tokenQty = null
              }

              //
            } else {
              console.log(
                'Unexpected code path in Transaction.get(). What is the txType?'
              )
              console.log(inTokenData)
              throw new Error('Unexpected code path')
            }

            if (tokenQty) {
              // const realQty =
              //   Number(tokenQty) / Math.pow(10, txDetails.tokenDecimals)

              // Calculate the real quantity using a BigNumber, then convert it to a
              // floating point number.
              let realQty = new BigNumber(tokenQty).dividedBy(
                10 ** parseInt(txDetails.tokenDecimals)
              )
              realQty = realQty.toString()
              // realQty = parseFloat(realQty)

              thisVin.tokenQtyStr = realQty
              thisVin.tokenQty = parseFloat(realQty)
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

        // This case handles rate limit errors.
        if (err.response && err.response.data && err.response.data.error) {
          throw new Error(err.response.data.error)
        }

        // If decoding the op_return fails, then it's not an SLP transaction,
        // and the non-hyrated TX details can be returned.
        return txDetails
      }

      return txDetails
    } catch (err) {
      // console.error('Error in transactions.js/get(): ', err)

      // This case handles rate limit errors.
      if (err.response && err.response.data && err.response.data.error) {
        throw new Error(err.response.data.error)
      }

      if (err.error) throw new Error(err.error)
      throw err
    }
  }
}

module.exports = Transaction
