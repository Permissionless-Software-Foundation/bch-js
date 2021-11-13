/*
  High-level functions for working with Transactions
*/

const BigNumber = require('bignumber.js')

const RawTransaction = require('./raw-transactions')
const SlpUtils = require('./slp/utils')
const Blockchain = require('./blockchain')

class Transaction {
  constructor (config) {
    // Encapsulate dependencies
    this.slpUtils = new SlpUtils(config)
    this.rawTransaction = new RawTransaction(config)
    this.blockchain = new Blockchain(config)
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

  // CT 10/31/21: TODO: this function should be refactored to use get2(), but
  // add waterfall validation of the TX and its inputs.

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
          // console.log(`thisVin: ${JSON.stringify(thisVin, null, 2)}`)

          try {
            // If decodeOpReturn() throws an error, then this input is not
            // from an SLP transaction and can be ignored.
            const inTokenData = await this.slpUtils.decodeOpReturn(thisVin.txid)
            // console.log(
            //   `vin[${i}] tokenData: ${JSON.stringify(inTokenData, null, 2)}`
            // )

            let tokenQty = 0

            // Validate the input. Mark qty as null if not valid.
            const vinIsValid = await this.slpUtils.waterfallValidateTxid(
              thisVin.txid
            )

            if (!vinIsValid) {
              // If the input is not a valid, then set qty as null.
              tokenQty = null
            } else if (inTokenData.txType === 'SEND') {
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

              // Add token ID to input
              thisVin.tokenId = inTokenData.tokenId
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

        // TODO: Convert the block hash to a block height. Add block height
        // value to the transaction.
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

  /**
   * @api Transaction.get3() get3()
   * @apiName get3
   * @apiGroup Transaction
   * @apiDescription
   * Returns an object of transaction data, including addresses for input UTXOs.
   * If it is a SLP token transaction, the token information for inputs and
   * outputs will also be included.
   *
   * This is an API heavy call. This function will only work with a single txid.
   * It does not yet support an array of TXIDs.
   *
   * This is the same as get(), except it omits DAG validation of the TXID.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   *  let txData = await bchjs.Transaction.get2("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
   *  console.log(txData);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   */
  async get3 (txid) {
    try {
      if (typeof txid !== 'string') {
        throw new Error(
          'Input to Transaction.get() must be a string containing a TXID.'
        )
      }

      // Get TX data
      const txDetails = await this.rawTransaction.getTxData(txid)
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      // Get the block height the transaction was mined in.
      const blockHeader = await this.blockchain.getBlockHeader(
        txDetails.blockhash
      )
      txDetails.blockheight = blockHeader.height
      // console.log(`blockHeader: ${JSON.stringify(blockHeader, null, 2)}`)

      // Set default as not an SLP tx
      txDetails.isSlpTx = false

      // Get Token Data
      const txTokenData = await this.getTokenInfo(txid)
      // console.log(`txTokenData: ${JSON.stringify(txTokenData, null, 2)}`)

      // If not a token, return the tx data. Processing is complete.
      if (!txTokenData) return txDetails

      // Mark TX as an SLP tx. This does not mean it's valid, it just means
      // the OP_RETURN passes a basic check.
      txDetails.isSlpTx = true

      // Get Genesis data
      const genesisData = await this.getTokenInfo(txTokenData.tokenId)
      // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

      // Add token information to the tx details object.
      txDetails.tokenTxType = txTokenData.txType
      txDetails.tokenId = txTokenData.tokenId
      txDetails.tokenTicker = genesisData.ticker
      txDetails.tokenName = genesisData.name
      txDetails.tokenDecimals = genesisData.decimals
      txDetails.tokenUri = genesisData.documentUri
      txDetails.tokenDocHash = genesisData.documentHash
      // console.log(`txDetails before processing input and outputs: ${JSON.stringify(txDetails, null, 2)}`)

      // Process TX Outputs
      // Add the token quantity to each output.
      // 'i' starts at 1, because vout[0] is the OP_RETURN
      for (let i = 0; i < txDetails.vout.length; i++) {
        const thisVout = txDetails.vout[i]
        if (txTokenData.txType === 'SEND') {
          // console.log(
          //   `output txTokenData: ${JSON.stringify(txTokenData, null, 2)}`
          // )

          // First output is OP_RETURN, so tokenQty is null.
          if (i === 0) {
            thisVout.tokenQty = null
            thisVout.tokenQtyStr = null
            continue
          }

          // Non SLP outputs.
          if (i > txTokenData.amounts.length) {
            thisVout.tokenQty = null
            thisVout.tokenQtyStr = null
            continue
          }

          const rawQty = txTokenData.amounts[i - 1]

          // Calculate the real quantity using a BigNumber, then convert it to a
          // floating point number.
          let realQty = new BigNumber(rawQty).dividedBy(
            10 ** parseInt(txDetails.tokenDecimals)
          )
          realQty = realQty.toString()
          // realQty = parseFloat(realQty)

          txDetails.vout[i].tokenQtyStr = realQty
          txDetails.vout[i].tokenQty = parseFloat(realQty)

          // console.log(
          //   `thisVout ${i}: ${JSON.stringify(txDetails.vout[i], null, 2)}`
          // )
        } else if (
          txTokenData.txType === 'GENESIS' ||
          txTokenData.txType === 'MINT'
        ) {
          // console.log(
          //   `output txTokenData: ${JSON.stringify(txTokenData, null, 2)}`
          // )

          let tokenQty = 0 // Default value

          // Only vout[1] of a Genesis or Mint transaction represents the tokens.
          // Any other outputs in that transaction are normal BCH UTXOs.
          if (i === 1) {
            tokenQty = txTokenData.qty
            // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)

            // Calculate the real quantity using a BigNumber, then convert it to a
            // floating point number.
            let realQty = new BigNumber(tokenQty).dividedBy(
              10 ** parseInt(txDetails.tokenDecimals)
            )
            realQty = realQty.toString()
            // realQty = parseFloat(realQty)

            thisVout.tokenQtyStr = realQty
            thisVout.tokenQty = parseFloat(realQty)
            // console.log(`thisVout[${i}]: ${JSON.stringify(thisVout, null, 2)}`)
          } else if (i === txTokenData.mintBatonVout) {
            // Optional Mint baton
            thisVout.tokenQtyStr = '0'
            thisVout.tokenQty = 0
            thisVout.isMintBaton = true
          } else {
            thisVout.tokenQtyStr = '0'
            thisVout.tokenQty = 0
          }
        } else {
          throw new Error('Unknown SLP TX type for TX')
        }
      }

      // Process TX inputs
      for (let i = 0; i < txDetails.vin.length; i++) {
        const thisVin = txDetails.vin[i]
        // console.log(`thisVin[${i}]: ${JSON.stringify(thisVin, null, 2)}`)

        const vinTokenData = await this.getTokenInfo(thisVin.txid)
        // console.log(
        //   `vinTokenData ${i}: ${JSON.stringify(vinTokenData, null, 2)}`
        // )

        // Corner case: Ensure the token ID is the same.
        const vinTokenIdIsTheSame = vinTokenData.tokenId === txDetails.tokenId

        // If the input is not a token input, or if the tokenID is not the same,
        // then mark the token output as null.
        if (!vinTokenData || !vinTokenIdIsTheSame) {
          thisVin.tokenQty = 0
          thisVin.tokenQtyStr = '0'
          thisVin.tokenId = null
          continue
        }

        if (vinTokenData.txType === 'SEND') {
          // console.log(
          //   `SEND vinTokenData ${i}: ${JSON.stringify(vinTokenData, null, 2)}`
          // )

          const tokenQty = vinTokenData.amounts[thisVin.vout - 1]
          // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)

          // Calculate the real quantity using a BigNumber, then convert it to a
          // floating point number.
          let realQty = new BigNumber(tokenQty).dividedBy(
            10 ** parseInt(txDetails.tokenDecimals)
          )
          realQty = realQty.toString()
          // realQty = parseFloat(realQty)

          thisVin.tokenQtyStr = realQty
          thisVin.tokenQty = parseFloat(realQty)
          thisVin.tokenId = vinTokenData.tokenId
        } else if (vinTokenData.txType === 'MINT') {
          // console.log(
          //   `MINT vinTokenData ${i}: ${JSON.stringify(vinTokenData, null, 2)}`
          // )

          let tokenQty = 0 // Default value

          // Only vout[1] of a Genesis transaction represents the tokens.
          // Any other outputs in that transaction are normal BCH UTXOs.
          if (thisVin.vout === 1) {
            tokenQty = vinTokenData.qty
            // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)

            // Calculate the real quantity using a BigNumber, then convert it to a
            // floating point number.
            let realQty = new BigNumber(tokenQty).dividedBy(
              10 ** parseInt(txDetails.tokenDecimals)
            )
            realQty = realQty.toString()
            // realQty = parseFloat(realQty)

            thisVin.tokenQtyStr = realQty
            thisVin.tokenQty = parseFloat(realQty)
            thisVin.tokenId = vinTokenData.tokenId
          } else if (thisVin.vout === vinTokenData.mintBatonVout) {
            // Optional Mint baton
            thisVin.tokenQtyStr = '0'
            thisVin.tokenQty = 0
            thisVin.tokenId = vinTokenData.tokenId
            thisVin.isMintBaton = true
          } else {
            thisVin.tokenQtyStr = '0'
            thisVin.tokenQty = 0
            thisVin.tokenId = null
          }
        } else if (vinTokenData.txType === 'GENESIS') {
          // console.log(
          //   `GENESIS vinTokenData ${i}: ${JSON.stringify(
          //     vinTokenData,
          //     null,
          //     2
          //   )}`
          // )

          let tokenQty = 0 // Default value

          // Only vout[1] of a Genesis transaction represents the tokens.
          // Any other outputs in that transaction are normal BCH UTXOs.
          if (thisVin.vout === 1) {
            tokenQty = vinTokenData.qty
            // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)

            // Calculate the real quantity using a BigNumber, then convert it to a
            // floating point number.
            let realQty = new BigNumber(tokenQty).dividedBy(
              10 ** parseInt(txDetails.tokenDecimals)
            )
            realQty = realQty.toString()
            // realQty = parseFloat(realQty)

            thisVin.tokenQtyStr = realQty
            thisVin.tokenQty = parseFloat(realQty)
            thisVin.tokenId = vinTokenData.tokenId
          } else if (thisVin.vout === vinTokenData.mintBatonVout) {
            // Optional Mint baton
            thisVin.tokenQtyStr = '0'
            thisVin.tokenQty = 0
            thisVin.tokenId = vinTokenData.tokenId
            thisVin.isMintBaton = true
          } else {
            thisVin.tokenQtyStr = '0'
            thisVin.tokenQty = 0
            thisVin.tokenId = null
          }
        } else {
          console.log(
            `Unknown vinTokenData: ${JSON.stringify(vinTokenData, null, 2)}`
          )
          throw new Error('Unknown token type in input')
        }
      }

      return txDetails
    } catch (err) {
      console.error('Error in get3()')

      // This case handles rate limit errors.
      if (err.response && err.response.data && err.response.data.error) {
        throw new Error(err.response.data.error)
      }

      if (err.error) throw new Error(err.error)
      throw err
    }
  }

  // A wrapper for decodeOpReturn(). Returns false if txid is not an SLP tx.
  // Returns the token data if the txid is an SLP tx.
  async getTokenInfo (txid) {
    try {
      const tokenData = await this.slpUtils.decodeOpReturn(txid)
      return tokenData
    } catch (err) {
      return false
    }
  }
}

module.exports = Transaction
