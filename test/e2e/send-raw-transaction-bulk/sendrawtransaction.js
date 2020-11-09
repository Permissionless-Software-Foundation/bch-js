/*
  This is an end-to-end test adapted from the send-bch example. It's purpose
  is to test the sendRawTransaction endpoint. Since the single call is tested
  all the time, this test focuses on testing the bulk endpoint by sending
  two transactions at once.

  Instructions:
  - Ensure the address in the wallet.json file has some tBCH.
  - Ensure the address in the wallet.json file has two UTXOs between 0.1 and
    0.001 tBCH
  - This test will generate two transactions from two UTXOs and broadcast them
    using the sendrawtransaction bulk endpoint.
*/

// Replace the address below with the address you want to send the BCH to.
const RECV_ADDR1 = `bchtest:qzfn2mly05t6fjsh5kjj0dqq0jjtct27ng089dgg05`
const RECV_ADDR2 = `bchtest:qz6yw0kqgfkknfy6jh2jvlfnkzmre3lt2u0pgcckdk`
const SATOSHIS_TO_SEND = 1000

// Instantiate BITBOX.
const bitboxLib = "../../../lib/BITBOX"
const BITBOXSDK = require(bitboxLib)
const BITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
//const BITBOX = new BITBOXSDK({ restURL: "http://localhost:3000/v2/" })

const util = require("util")

// Open the wallet generated with create-wallet.
try {
  var walletInfo = require(`./wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

const SEND_ADDR = walletInfo.cashAddress
const SEND_MNEMONIC = walletInfo.mnemonic

async function testSend() {
  try {
    const hex1 = await buildTx1(RECV_ADDR1)
    const hex2 = await buildTx2(RECV_ADDR2)

    console.log(`hex1: ${hex1}\n\n`)
    console.log(`hex2: ${hex2}\n\n`)

    const broadcast = await BITBOX.RawTransactions.sendRawTransaction([
      hex1,
      hex2
    ])
    console.log(`Transaction IDs: ${JSON.stringify(broadcast, null, 2)}`)
    console.log(`Should return an array of TXID strings.`)
  } catch (err) {
    console.log(`Error in testSend: `, err)
  }
}
testSend()

// Build a TX hex with the largest UTXO.
async function buildTx1(recAddr) {
  try {
    // Get the balance of the sending address.
    const balance = await getBCHBalance(SEND_ADDR, false)
    console.log(`balance: ${JSON.stringify(balance, null, 2)}`)
    console.log(`Balance of sending address ${SEND_ADDR} is ${balance} BCH.`)

    // Exit if the balance is zero.
    if (balance <= 0.0) {
      console.log(`Balance of sending address is zero. Exiting.`)
      process.exit(0)
    }

    const SEND_ADDR_LEGACY = BITBOX.Address.toLegacyAddress(SEND_ADDR)
    const RECV_ADDR_LEGACY = BITBOX.Address.toLegacyAddress(recAddr)
    console.log(`Sender Legacy Address: ${SEND_ADDR_LEGACY}`)
    console.log(`Receiver Legacy Address: ${RECV_ADDR_LEGACY}`)

    const balance2 = await getBCHBalance(recAddr, false)
    //console.log(`Balance of recieving address ${recAddr} is ${balance2} BCH.`)

    const u = await BITBOX.Address.utxo(SEND_ADDR)
    //console.log(`u: ${JSON.stringify(u, null, 2)}`)
    const utxo = findBiggestUtxo(u.utxos)
    console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

    // instance of transaction builder
    const transactionBuilder = new BITBOX.TransactionBuilder("testnet")

    const satoshisToSend = SATOSHIS_TO_SEND
    const originalAmount = utxo.satoshis
    const vout = utxo.vout
    const txid = utxo.txid

    // add input with txid and index of vout
    transactionBuilder.addInput(txid, vout)

    // get byte count to calculate fee. paying 1.2 sat/byte
    const byteCount = BITBOX.BitcoinCash.getByteCount(
      { P2PKH: 1 },
      { P2PKH: 2 }
    )
    console.log(`byteCount: ${byteCount}`)
    const satoshisPerByte = 1.0
    const txFee = Math.floor(satoshisPerByte * byteCount)
    console.log(`txFee: ${txFee}`)

    // amount to send back to the sending address.
    // It's the original amount - 1 sat/byte for tx size
    const remainder = originalAmount - satoshisToSend - txFee

    // add output w/ address and amount to send
    transactionBuilder.addOutput(recAddr, satoshisToSend)
    transactionBuilder.addOutput(SEND_ADDR, remainder)

    // Generate a change address from a Mnemonic of a private key.
    const change = changeAddrFromMnemonic(SEND_MNEMONIC)

    // Generate a keypair from the change address.
    const keyPair = BITBOX.HDNode.toKeyPair(change)

    // Sign the transaction with the HD node.
    let redeemScript
    transactionBuilder.sign(
      0,
      keyPair,
      redeemScript,
      transactionBuilder.hashTypes.SIGHASH_ALL,
      originalAmount
    )

    // build tx
    const tx = transactionBuilder.build()
    // output rawhex
    const hex = tx.toHex()

    return hex
  } catch (err) {
    console.log(`Error in buildTx().`)
    throw err
  }
}

// Build a TX hex with the SECOND largest UTXO.
async function buildTx2(recAddr) {
  try {
    // Get the balance of the sending address.
    const balance = await getBCHBalance(SEND_ADDR, false)
    console.log(`balance: ${JSON.stringify(balance, null, 2)}`)
    console.log(`Balance of sending address ${SEND_ADDR} is ${balance} BCH.`)

    // Exit if the balance is zero.
    if (balance <= 0.0) {
      console.log(`Balance of sending address is zero. Exiting.`)
      process.exit(0)
    }

    const SEND_ADDR_LEGACY = BITBOX.Address.toLegacyAddress(SEND_ADDR)
    const RECV_ADDR_LEGACY = BITBOX.Address.toLegacyAddress(recAddr)
    console.log(`Sender Legacy Address: ${SEND_ADDR_LEGACY}`)
    console.log(`Receiver Legacy Address: ${RECV_ADDR_LEGACY}`)

    const balance2 = await getBCHBalance(recAddr, false)
    //console.log(`Balance of recieving address ${recAddr} is ${balance2} BCH.`)

    const u = await BITBOX.Address.utxo(SEND_ADDR)
    //console.log(`u: ${JSON.stringify(u, null, 2)}`)
    const utxo = findNextBiggestUtxo(u.utxos)
    console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

    // instance of transaction builder
    const transactionBuilder = new BITBOX.TransactionBuilder("testnet")

    const satoshisToSend = SATOSHIS_TO_SEND
    const originalAmount = utxo.satoshis
    const vout = utxo.vout
    const txid = utxo.txid

    // add input with txid and index of vout
    transactionBuilder.addInput(txid, vout)

    // get byte count to calculate fee. paying 1.2 sat/byte
    const byteCount = BITBOX.BitcoinCash.getByteCount(
      { P2PKH: 1 },
      { P2PKH: 2 }
    )
    console.log(`byteCount: ${byteCount}`)
    const satoshisPerByte = 1.0
    const txFee = Math.floor(satoshisPerByte * byteCount)
    console.log(`txFee: ${txFee}`)

    // amount to send back to the sending address.
    // It's the original amount - 1 sat/byte for tx size
    const remainder = originalAmount - satoshisToSend - txFee

    // add output w/ address and amount to send
    transactionBuilder.addOutput(recAddr, satoshisToSend)
    transactionBuilder.addOutput(SEND_ADDR, remainder)

    // Generate a change address from a Mnemonic of a private key.
    const change = changeAddrFromMnemonic(SEND_MNEMONIC)

    // Generate a keypair from the change address.
    const keyPair = BITBOX.HDNode.toKeyPair(change)

    // Sign the transaction with the HD node.
    let redeemScript
    transactionBuilder.sign(
      0,
      keyPair,
      redeemScript,
      transactionBuilder.hashTypes.SIGHASH_ALL,
      originalAmount
    )

    // build tx
    const tx = transactionBuilder.build()
    // output rawhex
    const hex = tx.toHex()

    return hex
  } catch (err) {
    console.log(`Error in buildTx().`)
    throw err
  }
}

// Generate a change address from a Mnemonic of a private key.
function changeAddrFromMnemonic(mnemonic) {
  // root seed buffer
  const rootSeed = BITBOX.Mnemonic.toSeed(mnemonic)

  // master HDNode
  const masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, "testnet")

  // HDNode of BIP44 account
  const account = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  // derive the first external change address HDNode which is going to spend utxo
  const change = BITBOX.HDNode.derivePath(account, "0/0")

  return change
}

// Get the balance in BCH of a BCH address.
async function getBCHBalance(addr, verbose) {
  try {
    const result = await BITBOX.Address.details(addr)

    if (verbose) console.log(result)

    const bchBalance = result

    return bchBalance.balance
  } catch (err) {
    console.error(`Error in getBCHBalance: `, err)
    console.log(`addr: ${addr}`)
    throw err
  }
}

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  // Sort the utxos by the amount of satoshis, largest first.
  utxos.sort(function(a, b) {
    return b.satoshis - a.satoshis
  })

  return utxos[0]
}

// Returns the utxo with the 2nd biggest balance from an array of utxos.
function findNextBiggestUtxo(utxos) {
  // Sort the utxos by the amount of satoshis, largest first.
  utxos.sort(function(a, b) {
    return b.satoshis - a.satoshis
  })

  return utxos[1]
}
