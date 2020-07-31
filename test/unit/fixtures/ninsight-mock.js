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

const utxoPost = [utxo, utxo]

module.exports = {
  utxo,
  utxoPost
}
