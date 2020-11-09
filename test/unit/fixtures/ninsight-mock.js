/*
  Mocking data for unit tests for the Ninsight library.
*/

const utxo = {
  utxos: [
    {
      txid: "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
      vout: 0,
      amount: 0.00001,
      satoshis: 1000,
      height: 602405,
      confirmations: 36459
    }
  ],
  legacyAddress: "15NCRBJsHaJy8As5bX1oh2YauRejnZ1MKF",
  cashAddress: "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9",
  slpAddress: "simpleledger:qqh793x9au6ehvh7r2zflzguanlme760wuwzunhjfm",
  scriptPubKey: "76a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788ac",
  asm:
    "OP_DUP OP_HASH160 2fe2c4c5ef359bb2fe1a849f891cecffbcfb4f77 OP_EQUALVERIFY OP_CHECKSIG"
}

const unconfirmed = {
  utxos: [
    {
      txid:
        "3904ffe6f8fba4ceda5e887130f60fcb18bdc7dcee10392a57f89475c5c108f1",
      vout: 0,
      amount: 0.03608203,
      satoshis: 3608203,
      confirmations: 0,
      ts: 1559670801
    }
  ],
  legacyAddress: "1AyWs8U4HUnTLmxxFiGoJbsXauRsvBrcKW",
  cashAddress: "bitcoincash:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rku6usknlh5",
  slpAddress: "simpleledger:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rkuk8mdxlf2",
  scriptPubKey: "76a9146d695af951760b837c8e58b045b098f9c17e23b788ac"
}

const utxoPost = [utxo, utxo]
const unconfirmedPost = [unconfirmed, unconfirmed]

module.exports = {
  utxo,
  utxoPost,
  unconfirmed,
  unconfirmedPost
}
