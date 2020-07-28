/*
  Unit test mocks for bitcore endpoints.
*/

const balance = { confirmed: 230000, unconfirmed: 0, balance: 230000 }

const utxo = [
  {
    _id: "5cecdd39a9f1235e2a3d409a",
    chain: "BCH",
    network: "mainnet",
    coinbase: false,
    mintIndex: 0,
    spentTxid: "",
    mintTxid:
      "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
    mintHeight: 560430,
    spentHeight: -2,
    address: "qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
    script: "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac",
    value: 100000,
    confirmations: -1
  },
  {
    _id: "5cecdd1ca9f1235e2a3b6349",
    chain: "BCH",
    network: "mainnet",
    coinbase: false,
    mintIndex: 0,
    spentTxid: "",
    mintTxid:
      "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
    mintHeight: 560039,
    spentHeight: -2,
    address: "qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
    script: "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac",
    value: 130000,
    confirmations: -1
  }
]

module.exports = {
  balance,
  utxo
}
