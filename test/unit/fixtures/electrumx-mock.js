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

const utxos = {
  success: true,
  utxos: [
    {
      utxos: [
        {
          height: 604392,
          tx_hash:
            "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
          tx_pos: 0,
          value: 1000
        },
        {
          height: 630834,
          tx_hash:
            "4fe60a51e0d8f5134bfd8e5f872d6e502d7f01b28a6afebb27f4438a4f638d53",
          tx_pos: 0,
          value: 6000
        }
      ],
      address: "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
    },
    {
      utxos: [],
      address: "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
    }
  ]
}

const balance = {
  success: true,
  balance: {
    confirmed: 1000,
    unconfirmed: 0
  }
}

const balances = {
  success: true,
  balances: [
    {
      balance: {
        confirmed: 7000,
        unconfirmed: 0
      },
      address: "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
    },
    {
      balance: {
        confirmed: 0,
        unconfirmed: 0
      },
      address: "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
    }
  ]
}

const transaction = {
  success: true,
  transactions: [
    {
      height: 560430,
      tx_hash:
        "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
    },
    {
      height: 560534,
      tx_hash:
        "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
    }
  ]
}

const transactions = {
  success: true,
  transactions: [
    {
      transactions: [
        {
          height: 631219,
          tx_hash:
            "ae2daa01c8172545b5edd205ea438706bcb74e63d4084a26b9ff2a46d46dc97f"
        }
      ],
      address: "bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj"
    },
    {
      transactions: [
        {
          height: 560430,
          tx_hash:
            "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
        },
        {
          height: 560534,
          tx_hash:
            "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
        }
      ],
      address: "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
    }
  ]
}

const unconfirmed = {
  success: true,
  utxos: [
    {
      height: 602405,
      tx_hash:
        "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
      fee: 34100
    }
  ]
}

const unconfirmedArray = {
  success: true,
  utxos: [
    {
      utxos: [
        {
          height: 604392,
          tx_hash:
            "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
          fee: 34210
        },
        {
          height: 630834,
          tx_hash:
            "4fe60a51e0d8f5134bfd8e5f872d6e502d7f01b28a6afebb27f4438a4f638d53",
          value: 3000
        }
      ],
      address: "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
    },
    {
      utxos: [],
      address: "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
    }
  ]
}

const blockHeaders = [
  '010000008b52bbd72c2f49569059f559c1b1794de5192e4f7d6d2b03c7482bad0000000083e4f8a9d502ed0c419075c1abb5d56f878a2e9079e5612bfb76a2dc37d9c42741dd6849ffff001d2b909dd6',
  '01000000f528fac1bcb685d0cd6c792320af0300a5ce15d687c7149548904e31000000004e8985a786d864f21e9cbb7cbdf4bc9265fe681b7a0893ac55a8e919ce035c2f85de6849ffff001d385ccb7c'
]

module.exports = {
  utxo,
  utxos,
  balance,
  balances,
  transaction,
  transactions,
  unconfirmed,
  unconfirmedArray,
  blockHeaders
}
