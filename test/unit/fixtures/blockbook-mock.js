/*
  Unit test mocks for Blockbook endpoints.
*/

const balance = {
  page: 1,
  totalPages: 1,
  itemsOnPage: 1000,
  address: "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
  balance: "230000",
  totalReceived: "6194528752",
  totalSent: "6194298752",
  unconfirmedBalance: "0",
  unconfirmedTxs: 0,
  txs: 3,
  txids: [
    "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
    "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
    "5d95f4e6047901fc1502a9758bbdb14ce73f24662b1784d13e0217b3d37bb7a2"
  ]
}

const utxo = [
  {
    txid: "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
    vout: 0,
    value: "100000",
    height: 560430,
    confirmations: 29321
  },
  {
    txid: "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
    vout: 0,
    value: "130000",
    height: 560039,
    confirmations: 29712
  }
]

const utxos = [
  [
    {
      txid: "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
      vout: 0,
      value: "100000",
      height: 560430,
      confirmations: 29868
    },
    {
      txid: "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
      vout: 0,
      value: "130000",
      height: 560039,
      confirmations: 30259
    }
  ],
  []
]

module.exports = {
  balance,
  utxo,
  utxos
}
