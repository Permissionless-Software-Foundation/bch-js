/*
  Mocking data for unit tests for the ElectrumX library.
*/

const utxo = {
  success: true,
  utxos: [
    {
      height: 602405,
      tx_hash:
        "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
      tx_pos: 0,
      value: 1000
    }
  ]
}

module.exports = {
  utxo
}
