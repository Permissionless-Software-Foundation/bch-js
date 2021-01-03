/*
  This is a utility library for common SLP and BCH actions needed by the e2e
  tests.
*/

module.exports = {
  openWallet,
  sendToken,
  getTestTokenBalance,
  threeDecimals
}

const SLPSDK = require('../../../lib/SLP')
const slpsdk = new SLPSDK()

const testTokenId =
  'cc1b2084a9c43bb5a633df7f38201adde5c5f5cef2fed945d12f8dcd4e505c67'

// Open a wallet and return an object with its address, BCH balance, and SLP
// token balance.
async function openWallet (filename) {
  try {
    const walletInfo = require(filename)

    // const walletBalance = await getBalance(walletInfo)
    // const walletBalance = await slpsdk.Utils.balancesForAddress(
    //   walletInfo.slpAddress
    // )
    // // console.log(`walletBalance: ${JSON.stringify(walletBalance, null, 2)}`)
    // walletInfo.tokenBalance = walletBalance

    return walletInfo
  } catch (err) {
    console.log(
      `Could not open ${filename}. Generate a wallet with create-wallet first.`,
      err
    )
    process.exit(0)
  }
}

// Send a token from wallet1 to wallet2.
async function sendToken (wallet1, wallet2) {
  try {
    const mnemonic = wallet1.mnemonic

    // root seed buffer
    const rootSeed = slpsdk.Mnemonic.toSeed(mnemonic)

    // master HDNode
    const masterHDNode = slpsdk.HDNode.fromSeed(rootSeed)

    // HDNode of BIP44 account
    const account = slpsdk.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = slpsdk.HDNode.derivePath(account, '0/0')

    // get the cash address
    // const cashAddress = slpsdk.HDNode.toCashAddress(change)
    // const slpAddress = slpsdk.HDNode.toSLPAddress(change)

    const fundingAddress = wallet1.slpAddress
    const fundingWif = slpsdk.HDNode.toWIF(change) // <-- compressed WIF format
    const tokenReceiverAddress = wallet2.slpAddress
    const bchChangeReceiverAddress = wallet1.cashAddress

    // Create a config object for minting
    const sendConfig = {
      fundingAddress,
      fundingWif,
      tokenReceiverAddress,
      bchChangeReceiverAddress,
      tokenId:
        'cc1b2084a9c43bb5a633df7f38201adde5c5f5cef2fed945d12f8dcd4e505c67',
      amount: 1
    }

    // console.log(`createConfig: ${util.inspect(createConfig)}`)

    // Generate, sign, and broadcast a hex-encoded transaction for sending
    // the tokens.
    // const sendTxId = await slpsdk.TokenType1.send(sendConfig)
    await slpsdk.TokenType1.send(sendConfig)

    // console.log(`sendTxId: ${sendTxId}`)
  } catch (err) {
    console.log('Error in e2e-util.js/sendToken()')
    throw err
  }
}

// Returns just the test token balance for a wallet.
async function getTestTokenBalance (walletData) {
  try {
    const tokenBalance = await slpsdk.Util.balancesForAddress(
      walletData.slpAddress
    )
    // console.log(`tokenBalance: ${JSON.stringify(tokenBalance, null, 2)}`)

    const testTokens = tokenBalance.filter(x => testTokenId === x.tokenId)

    return testTokens[0].balance
  } catch (err) {
    console.log('Error in e2e-util.js/getTestTokenBalance()')
    throw err
  }
}

// Round a number to three decimal places.
function threeDecimals (inNum) {
  try {
    let tempNum = inNum * 1000
    tempNum = Math.round(tempNum)
    tempNum = tempNum / 1000
    return tempNum
  } catch (err) {
    console.log('Error in e2e-util.js/threeDecimals()')
    throw err
  }
}
