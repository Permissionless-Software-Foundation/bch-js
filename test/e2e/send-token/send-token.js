/*
  This is an end-to-end test which verified the happy-path of sending an SLP
  token. It's really a test of the speed of SLPDB to process new token
  transactions.

  This program expects two wallets. Wallet 1 must have a small amount of BCH
  and an inventory of SLP test tokens. Wallet 2 is the reieving wallet.
*/

// Inspect utility used for debugging.
const util = require('util')
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

// const SLPSDK = require("../../../lib/SLP")
// const slpsdk = new SLPSDK()

const WALLET1 = '../wallet1.json'
const WALLET2 = '../wallet2.json'

const lib = require('../util/e2e-util')

// The main test function.
// Sends a token and reports on how long it takes to show up in SLPDB production.
async function sendTokenTest () {
  try {
    // Open the sending wallet.
    const sendWallet = await lib.openWallet(WALLET1)
    // console.log(`sendWallet: ${JSON.stringify(walletInfo, null, 2)}`)

    // Open the recieving wallet.
    const recvWallet = await lib.openWallet(WALLET2)
    // console.log(`recvWallet: ${JSON.stringify(walletInfo, null, 2)}`)

    // Get the balance of the recieving wallet.
    // const testTokens = recvWallet.tokenBalance.filter(
    //   x => testTokenId === x.tokenId
    // )
    // const startBalance = testTokens[0].balance
    const startBalance = await lib.getTestTokenBalance(recvWallet)
    console.log(`Starting balance: ${startBalance} test tokens.`)
    let newBalance = startBalance

    // Send a token to the recieving wallet.
    await lib.sendToken(sendWallet, recvWallet)
    console.log('Sent test token.')

    // Track the time until the balance for the recieving wallet has been updated.
    const startTime = new Date()
    const waitTime = 10000 // time in milliseconds

    // Loop with a definite exit point, so we don't loop forever.
    for (let i = 0; i < 50; i++) {
      await sleep(waitTime) // Wait for a while before checking

      console.log('Checking token balance...')
      newBalance = await lib.getTestTokenBalance(recvWallet)

      // Break out of the loop once a new balance is detected.
      if (newBalance > startBalance) break

      // Provide high-level warnings.
      const secondsPassed = (i * waitTime) / 1000
      if (secondsPassed > 60 * 10) {
        console.log('More than 10 minutes passed.')
        return false // Fail the test.
      } else if (secondsPassed > 60 * 5) {
        console.log('More than 5 minutes passed.')
      } else if (secondsPassed > 60) {
        console.log('More than 1 minute passed.')
      }
    }

    // Calculate the amount of time that has passed.
    const endTime = new Date()
    let deltaTime = (endTime.getTime() - startTime.getTime()) / 60000
    deltaTime = lib.threeDecimals(deltaTime)
    console.log(`SLPDB updated token balance in ${deltaTime} minutes.`)

    // Consolidate the SLP UTXOs on the recieve wallet.
    await lib.sendToken(recvWallet, recvWallet)

    return deltaTime // Return the time in minutes it took for SLPDB to update.
  } catch (err) {
    console.log('Error in e2e/send-token.js/sendTokenTest(): ', err)
    return false
  }
}

// Promise based sleep function.
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  sendTokenTest
}
