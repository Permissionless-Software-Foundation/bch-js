/*
  Contains mocked data used by unit tests.
*/

const mockList = [
  {
    decimals: 0,
    timestamp: "2019-04-29 08:59",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "WMW",
    name: "WheresMyWallet",
    containsBaton: false,
    id: "8fc284dcbc922f7bb7e2a443dc3af792f52923bba403fcf67ca028c88e89da0e",
    documentHash: null,
    initialTokenQty: 1000,
    blockCreated: 580336,
    blockLastActiveSend: 580336,
    blockLastActiveMint: null,
    txnsSinceGenesis: 1,
    validAddresses: 1,
    totalMinted: 1000,
    totalBurned: 0,
    circulatingSupply: 1000,
    mintingBatonStatus: "NEVER_CREATED"
  },
  {
    decimals: 0,
    timestamp: "2019-04-29 08:59",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "WMW",
    name: "Where'sMyWallet",
    containsBaton: false,
    id: "471d1f33e8a69cf59ce174ce43174feeecdf1f475ccc4cc3705600a5d6d2cd06",
    documentHash: null,
    initialTokenQty: 1000,
    blockCreated: 580336,
    blockLastActiveSend: 580351,
    blockLastActiveMint: null,
    txnsSinceGenesis: 2,
    validAddresses: 2,
    totalMinted: 1000,
    totalBurned: 0,
    circulatingSupply: 1000,
    mintingBatonStatus: "NEVER_CREATED"
  }
]

const mockToken = {
  decimals: 0,
  timestamp: "2018-08-25 01:54",
  timestampUnix: 1539218362,
  versionType: 1,
  documentUri: "",
  symbol: "USDT",
  name: "US Dollar Tether",
  containsBaton: false,
  id: "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
  documentHash: null,
  initialTokenQty: 10000000000000000,
  blockCreated: 544903,
  blockLastActiveSend: 544905,
  blockLastActiveMint: null,
  txnsSinceGenesis: 3,
  validAddresses: 0,
  totalMinted: 10000000000000000,
  totalBurned: 10000000000000000,
  circulatingSupply: 0,
  mintingBatonStatus: "NEVER_CREATED"
}

const mockTokens = [
  {
    decimals: 0,
    timestamp: "2018-08-25 01:54",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "USDT",
    name: "US Dollar Tether",
    containsBaton: false,
    id: "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
    documentHash: null,
    initialTokenQty: 10000000000000000,
    blockCreated: 544903,
    blockLastActiveSend: 544905,
    blockLastActiveMint: null,
    txnsSinceGenesis: 3,
    validAddresses: 0,
    totalMinted: 10000000000000000,
    totalBurned: 10000000000000000,
    circulatingSupply: 0,
    mintingBatonStatus: "NEVER_CREATED"
  },
  {
    decimals: 0,
    timestamp: "2019-04-29 08:59",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "WMW",
    name: "Where'sMyWallet",
    containsBaton: false,
    id: "471d1f33e8a69cf59ce174ce43174feeecdf1f475ccc4cc3705600a5d6d2cd06",
    documentHash: null,
    initialTokenQty: 1000,
    blockCreated: 580336,
    blockLastActiveSend: 580351,
    blockLastActiveMint: null,
    txnsSinceGenesis: 2,
    validAddresses: 2,
    totalMinted: 1000,
    totalBurned: 0,
    circulatingSupply: 1000,
    mintingBatonStatus: "NEVER_CREATED"
  }
]

const balancesForAddress = [
  {
    tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
    balance: "1",
    balanceString: "1",
    slpAddress: "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
    decimalCount: 8
  },
  {
    tokenId: "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
    balance: "1",
    decimalCount: 7
  }
]

const balancesForAddresses = [
  [
    {
      tokenId:
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
      balance: 1,
      balanceString: "1",
      slpAddress: "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
      decimalCount: 8
    },
    {
      tokenId:
        "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
      balance: 1,
      balanceString: "1",
      slpAddress: "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
      decimalCount: 7
    }
  ],
  [
    {
      tokenId:
        "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
      balance: 10,
      balanceString: "10",
      slpAddress: "simpleledger:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5ucdyl3r57",
      decimalCount: 8
    }
  ]
]

const mockBalance = {
  tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
  balance: 1,
  balanceString: "1"
}

const mockRawTx = [
  "0100000002b3b54b72de3cdff8d00a5a26e2aa7897f730c2889c46b41a83294004a2c6c9c6020000006a47304402202fff3979f9cf0a5052655c8699081a77a653903de41547928db0b94601aa082502207cdb909e3a7b2b7f8a3eb80243a1bd2fd8ad9449a0ec30242ae4b187436d11a0412103b30e7096c6e3a3b45e5aba4ad8fe48a1fdd7c04de0de55a43095e7560b52e19dfeffffffd25817de09517a6af6c3dbb332041f85d844052b32ea1dbca123365b18953726000000006a473044022011a39acbbb80c4723822d434445fc4b3d72ad0212902fdb183a5408af00e158c02200eb3778b1af9f3a8fe28b6670f5fe543fb4c190f79f349273860125be05269b2412103b30e7096c6e3a3b45e5aba4ad8fe48a1fdd7c04de0de55a43095e7560b52e19dfeffffff030000000000000000336a04534c500001010747454e45534953084e414b414d4f544f084e414b414d4f544f4c004c0001084c0008000775f05a07400022020000000000001976a91433c0448680ca324225eeca7a230cf191ab88400288ac8afc0000000000001976a91433c0448680ca324225eeca7a230cf191ab88400288ac967a0800"
]

const mockIsValidTxid = [
  {
    txid: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
    valid: true
  }
]

const mockBalancesForToken = [
  {
    tokenBalance: 1000,
    slpAddress: "simpleledger:qzhfd7ssy9nt4gw7j9w5e7w5mxx5w549rv7mknzqkz"
  }
]

const mockTokenStats = {
  tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
  documentUri: "",
  symbol: "NAKAMOTO",
  name: "NAKAMOTO",
  decimals: 8,
  txnsSinceGenesis: 367,
  validUtxos: 248,
  validAddresses: 195,
  circulatingSupply: 20995990,
  totalBurned: 4010,
  totalMinted: 21000000,
  satoshisLockedUp: 135408
}

const mockTransactions = [
  {
    txid: "27e27170b546f05b2af69d6eddff8834038facf5d81302e9e562df09a5c4445f",
    tokenDetails: {
      valid: true,
      detail: {
        decimals: null,
        tokenIdHex:
          "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
        timestamp: null,
        transactionType: "SEND",
        versionType: 1,
        documentUri: null,
        documentSha256Hex: null,
        symbol: null,
        name: null,
        batonVout: null,
        containsBaton: null,
        genesisOrMintQuantity: null,
        sendOutputs: [
          {
            $numberDecimal: "0"
          },
          {
            $numberDecimal: "25"
          },
          {
            $numberDecimal: "77"
          }
        ]
      },
      invalidReason: null,
      schema_version: 30
    }
  }
]

const mockBurnTotal = {
  transactionId:
    "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de",
  inputTotal: 100000000,
  outputTotal: 100000000,
  burnTotal: 0
}

const nonSLPTxDetailsWithoutOpReturn = {
  txid: "3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec",
  hash: "3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec",
  version: 1,
  size: 704,
  locktime: 0,
  vin: [
    {
      txid: "15a34ece03e13c20ee41dd113a982964a92dafb49328a6c395c8ecec12901bd5",
      vout: 0,
      scriptSig: {
        asm:
          "3045022100f020493f2c62740c89f07fba92d2916ad238c6965ef69fdf8338b4d6ee6c5a4502200251693e9883868cc5fb227bfc9bdaa5c333f14f712c0f3d8d2efb781f1a15fa[ALL|FORKID] 02a8087ad440c428aede8cf39eabe12b9807356b04d48aa0c361fa0d9d68a1aeac",
        hex:
          "483045022100f020493f2c62740c89f07fba92d2916ad238c6965ef69fdf8338b4d6ee6c5a4502200251693e9883868cc5fb227bfc9bdaa5c333f14f712c0f3d8d2efb781f1a15fa412102a8087ad440c428aede8cf39eabe12b9807356b04d48aa0c361fa0d9d68a1aeac"
      },
      sequence: 4294967295
    },
    {
      txid: "52f720a5c6b5ad2765ecabc51b375d4aa741339f2a6fbd1524dcb3d45e230337",
      vout: 0,
      scriptSig: {
        asm:
          "3045022100b3e65b51cd31c081070ebf5c91e43d10431a71e748c86ff6bcc7e4f5ecc7f54d02202d67edefe3a065cbda2e1782dd77bce2d891de2a428f5dd92eae15e4a843527c[ALL|FORKID] 03d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29",
        hex:
          "483045022100b3e65b51cd31c081070ebf5c91e43d10431a71e748c86ff6bcc7e4f5ecc7f54d02202d67edefe3a065cbda2e1782dd77bce2d891de2a428f5dd92eae15e4a843527c412103d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29"
      },
      sequence: 4294967295
    },
    {
      txid: "58e607b7ae35a970a50bc3f78bb7b3f786c906cc07241bdbe7e439bbd026036a",
      vout: 0,
      scriptSig: {
        asm:
          "3045022100c450cdf99fa8eca980b4c6878ff02de46b22bca9b08c01152739d12003ef14c902203d93e6f3811acfac0f531eca1afbf5c5416b19ac154a6672e9f3afc53d1b56a6[ALL|FORKID] 03d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29",
        hex:
          "483045022100c450cdf99fa8eca980b4c6878ff02de46b22bca9b08c01152739d12003ef14c902203d93e6f3811acfac0f531eca1afbf5c5416b19ac154a6672e9f3afc53d1b56a6412103d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29"
      },
      sequence: 4294967295
    },
    {
      txid: "9e2bc2f0e39cff9fd6f8cf56586bfd24389cba0367d70304914be277b2f7268b",
      vout: 0,
      scriptSig: {
        asm:
          "3045022100cd25d6e5de8057335d3db0e0ad05dd4802ebb45ae2e4ea52ba26670787eaa3bd02207024b366b61e6f28324fc040dad5fa589ee7f2487c8e4c54848827360c792cc3[ALL|FORKID] 03d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29",
        hex:
          "483045022100cd25d6e5de8057335d3db0e0ad05dd4802ebb45ae2e4ea52ba26670787eaa3bd02207024b366b61e6f28324fc040dad5fa589ee7f2487c8e4c54848827360c792cc3412103d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29"
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 36.01397342,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 84c49aa95f145334b125c80c2cc9d077d08e00ce OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a91484c49aa95f145334b125c80c2cc9d077d08e00ce88ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qzzvfx4ftu29xd93yhyqctxf6pmaprsqecm3rhd0lv"]
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 1aec955da539e59b32fa97e96fc0f53f018ae8a2 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a9141aec955da539e59b32fa97e96fc0f53f018ae8a288ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqdwe92a55u7txejl2t7jm7q75lsrzhg5grz36dzh5"]
      }
    },
    {
      value: 13.4288476,
      n: 2,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 1af7e01ee75e22c645a5b37e401bd560168abc07 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a9141af7e01ee75e22c645a5b37e401bd560168abc0788ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqd00cq7ua0z93j95kehusqm64spdz4uqur3lepgqm"]
      }
    }
  ],
  hex:
    "0100000004d51b9012ececc895c3a62893b4af2da96429983a11dd41ee203ce103ce4ea315000000006b483045022100f020493f2c62740c89f07fba92d2916ad238c6965ef69fdf8338b4d6ee6c5a4502200251693e9883868cc5fb227bfc9bdaa5c333f14f712c0f3d8d2efb781f1a15fa412102a8087ad440c428aede8cf39eabe12b9807356b04d48aa0c361fa0d9d68a1aeacffffffff3703235ed4b3dc2415bd6f2a9f3341a74a5d371bc5abec6527adb5c6a520f752000000006b483045022100b3e65b51cd31c081070ebf5c91e43d10431a71e748c86ff6bcc7e4f5ecc7f54d02202d67edefe3a065cbda2e1782dd77bce2d891de2a428f5dd92eae15e4a843527c412103d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29ffffffff6a0326d0bb39e4e7db1b2407cc06c986f7b3b78bf7c30ba570a935aeb707e658000000006b483045022100c450cdf99fa8eca980b4c6878ff02de46b22bca9b08c01152739d12003ef14c902203d93e6f3811acfac0f531eca1afbf5c5416b19ac154a6672e9f3afc53d1b56a6412103d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29ffffffff8b26f7b277e24b910403d76703ba9c3824fd6b5856cff8d69fff9ce3f0c22b9e000000006b483045022100cd25d6e5de8057335d3db0e0ad05dd4802ebb45ae2e4ea52ba26670787eaa3bd02207024b366b61e6f28324fc040dad5fa589ee7f2487c8e4c54848827360c792cc3412103d0ea0c7798905c7f8dee6180321c92bf67df9dfde42da0f3cf25413d914c0e29ffffffff035ef6a8d6000000001976a91484c49aa95f145334b125c80c2cc9d077d08e00ce88ac22020000000000001976a9141aec955da539e59b32fa97e96fc0f53f018ae8a288ac98cb0a50000000001976a9141af7e01ee75e22c645a5b37e401bd560168abc0788ac00000000",
  blockhash: "0000000000000000014bf37d1253e3c46f0e6f151bd6cca13f8093e76c31496d",
  confirmations: 1571,
  time: 1565380800,
  blocktime: 1565380800
}

const nonSLPTxDetailsWithOpReturn = {
  txid: "2ff74c48a5d657cf45f699601990bffbbe7a2a516d5480674cbf6c6a4497908f",
  hash: "2ff74c48a5d657cf45f699601990bffbbe7a2a516d5480674cbf6c6a4497908f",
  version: 1,
  size: 271,
  locktime: 0,
  vin: [
    {
      txid: "6a81a401ec165eccd08c5c5a57a2185056675bbf2380d515c418b7a4c04db40a",
      vout: 1,
      scriptSig: {
        asm:
          "30440220168a04932175c6d6b10947ebef23c53ff2e905bb8dfb7d1aec961944f83bf20e0220724ad7a459bb31174b9e6cbbc73260c9a62d32dda2c47f5d7c5351b5eb9cd944[ALL|FORKID] 0467ff2df20f28bc62ad188525868f41d461f7dab3c1e500314cdb5218e5637bfd0f9c02eb5b3f383f698d28ff13547eaf05dd9216130861dd0216824e9d7337e3",
        hex:
          "4730440220168a04932175c6d6b10947ebef23c53ff2e905bb8dfb7d1aec961944f83bf20e0220724ad7a459bb31174b9e6cbbc73260c9a62d32dda2c47f5d7c5351b5eb9cd94441410467ff2df20f28bc62ad188525868f41d461f7dab3c1e500314cdb5218e5637bfd0f9c02eb5b3f383f698d28ff13547eaf05dd9216130861dd0216824e9d7337e3"
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_RETURN -802180445 46386600368a3e883cd68c6939ab8c0a3c91537a3be6d9be35e42b8e37cfc92c",
        hex:
          "6a045d4dd0af2046386600368a3e883cd68c6939ab8c0a3c91537a3be6d9be35e42b8e37cfc92c",
        type: "nulldata"
      }
    },
    {
      value: 0.00002626,
      n: 1,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 066ebee590278f32aedc8a4865700c49e717f1d7 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914066ebee590278f32aedc8a4865700c49e717f1d788ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqrxa0h9jqnc7v4wmj9ysetsp3y7w9l36u8gnnjulq"]
      }
    }
  ],
  hex:
    "01000000010ab44dc0a4b718c415d58023bf5b67565018a2575a5c8cd0cc5e16ec01a4816a010000008a4730440220168a04932175c6d6b10947ebef23c53ff2e905bb8dfb7d1aec961944f83bf20e0220724ad7a459bb31174b9e6cbbc73260c9a62d32dda2c47f5d7c5351b5eb9cd94441410467ff2df20f28bc62ad188525868f41d461f7dab3c1e500314cdb5218e5637bfd0f9c02eb5b3f383f698d28ff13547eaf05dd9216130861dd0216824e9d7337e3ffffffff020000000000000000276a045d4dd0af2046386600368a3e883cd68c6939ab8c0a3c91537a3be6d9be35e42b8e37cfc92c420a0000000000001976a914066ebee590278f32aedc8a4865700c49e717f1d788ac00000000",
  blockhash: "0000000000000000014bf37d1253e3c46f0e6f151bd6cca13f8093e76c31496d",
  confirmations: 1571,
  time: 1565380800,
  blocktime: 1565380800
}

txDetailsSLPGenesis = {
  txid: "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  hash: "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
  version: 2,
  size: 357,
  locktime: 0,
  vin: [
    {
      txid: "86190b4a1ef25f09a388e2e86c299fc4bbc54c310386dcf37611b2958b964e25",
      vout: 0,
      scriptSig: {
        asm:
          "304402203cdf545000c17bce9dfa99a1515e5e3dc17b0abcfa55d1eacc01fa3f876d574102203170f0d7280dc7f4de887a141c94fb43bb3b5b0da12e4f400d3c89abf2a1c842[ALL|FORKID] 026ad033bd90dfa45766f4fdd377153468f1287e8fa0834fdad7dc11662e83dca8",
        hex:
          "47304402203cdf545000c17bce9dfa99a1515e5e3dc17b0abcfa55d1eacc01fa3f876d574102203170f0d7280dc7f4de887a141c94fb43bb3b5b0da12e4f400d3c89abf2a1c8424121026ad033bd90dfa45766f4fdd377153468f1287e8fa0834fdad7dc11662e83dca8"
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_RETURN 5262419 1 47454e45534953 534c5053444b 534c502053444b206578616d706c65207573696e6720424954424f58 646576656c6f7065722e626974636f696e2e636f6d 0 8 2 0000000bcdf49b00",
        hex:
          "6a04534c500001010747454e4553495306534c5053444b1c534c502053444b206578616d706c65207573696e6720424954424f5815646576656c6f7065722e626974636f696e2e636f6d4c0001080102080000000bcdf49b00",
        type: "nulldata"
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 70083e743742ad726a3a8f3a511d9a89f979dd63 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a91470083e743742ad726a3a8f3a511d9a89f979dd6388ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05"]
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 70083e743742ad726a3a8f3a511d9a89f979dd63 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a91470083e743742ad726a3a8f3a511d9a89f979dd6388ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05"]
      }
    },
    {
      value: 0.00002015,
      n: 3,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 70083e743742ad726a3a8f3a511d9a89f979dd63 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a91470083e743742ad726a3a8f3a511d9a89f979dd6388ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05"]
      }
    }
  ],
  hex:
    "0200000001254e968b95b21176f3dc8603314cc5bbc49f296ce8e288a3095ff21e4a0b1986000000006a47304402203cdf545000c17bce9dfa99a1515e5e3dc17b0abcfa55d1eacc01fa3f876d574102203170f0d7280dc7f4de887a141c94fb43bb3b5b0da12e4f400d3c89abf2a1c8424121026ad033bd90dfa45766f4fdd377153468f1287e8fa0834fdad7dc11662e83dca8ffffffff040000000000000000596a04534c500001010747454e4553495306534c5053444b1c534c502053444b206578616d706c65207573696e6720424954424f5815646576656c6f7065722e626974636f696e2e636f6d4c0001080102080000000bcdf49b0022020000000000001976a91470083e743742ad726a3a8f3a511d9a89f979dd6388ac22020000000000001976a91470083e743742ad726a3a8f3a511d9a89f979dd6388acdf070000000000001976a91470083e743742ad726a3a8f3a511d9a89f979dd6388ac00000000",
  blockhash: "000000000000000002f45ff275b5c073422b2bf1c3e4babae823145c2bbff55a",
  confirmations: 1744,
  time: 1565274914,
  blocktime: 1565274914
}

const txDetailsSLPMint = {
  txid: "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4",
  hash: "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4",
  version: 2,
  size: 474,
  locktime: 0,
  vin: [
    {
      txid: "023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4",
      vout: 2,
      scriptSig: {
        asm:
          "3045022100f73afe1ba320dfdf191c7219e37a6dcd8d52f3e0155efee8a3e17556965e031b022021a9689e57210697236f644cc91c43d73e894020b227445776afe9a5b79c0f23[ALL|FORKID] 036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d",
        hex:
          "483045022100f73afe1ba320dfdf191c7219e37a6dcd8d52f3e0155efee8a3e17556965e031b022021a9689e57210697236f644cc91c43d73e894020b227445776afe9a5b79c0f234121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d"
      },
      sequence: 4294967295
    },
    {
      txid: "023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4",
      vout: 3,
      scriptSig: {
        asm:
          "3045022100cc549d3659875931ea5ba7bd71072ac650864fc046c8239d2f8948f67486d7b30220103641cc9566283c7706d702dc92c2f442673cbc51ce84b5d383ba68da97b157[ALL|FORKID] 036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d",
        hex:
          "483045022100cc549d3659875931ea5ba7bd71072ac650864fc046c8239d2f8948f67486d7b30220103641cc9566283c7706d702dc92c2f442673cbc51ce84b5d383ba68da97b1574121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d"
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_RETURN 5262419 1 1414416717 023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4 2 00000002540be400",
        hex:
          "6a04534c50000101044d494e5420023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e401020800000002540be400",
        type: "nulldata"
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 210a88277de7a80a1dac90a8153c0e7c8a2f08a7 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5u5k0yyr2q"]
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 210a88277de7a80a1dac90a8153c0e7c8a2f08a7 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5u5k0yyr2q"]
      }
    },
    {
      value: 0.00007528,
      n: 3,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 210a88277de7a80a1dac90a8153c0e7c8a2f08a7 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5u5k0yyr2q"]
      }
    }
  ],
  hex:
    "0200000002e454f384ced298581b0b0c6e9b9d7a93474c9a5ad14f998b0547395ae9d33c02020000006b483045022100f73afe1ba320dfdf191c7219e37a6dcd8d52f3e0155efee8a3e17556965e031b022021a9689e57210697236f644cc91c43d73e894020b227445776afe9a5b79c0f234121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850dffffffffe454f384ced298581b0b0c6e9b9d7a93474c9a5ad14f998b0547395ae9d33c02030000006b483045022100cc549d3659875931ea5ba7bd71072ac650864fc046c8239d2f8948f67486d7b30220103641cc9566283c7706d702dc92c2f442673cbc51ce84b5d383ba68da97b1574121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850dffffffff040000000000000000396a04534c50000101044d494e5420023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e401020800000002540be40022020000000000001976a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac22020000000000001976a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac681d0000000000001976a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac00000000",
  blockhash: "000000000000000000182bc50810ab0296a6f1f7b6313bf535b6e78dffca8db6",
  confirmations: 154,
  time: 1566227300,
  blocktime: 1566227300
}

const txDetailsSLPSend = {
  txid: "4f922565af664b6fdf0a1ba3924487344be721b3d8815c62cafc8a51e04a8afa",
  hash: "4f922565af664b6fdf0a1ba3924487344be721b3d8815c62cafc8a51e04a8afa",
  version: 2,
  size: 626,
  locktime: 0,
  vin: [
    {
      txid: "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4",
      vout: 1,
      scriptSig: {
        asm:
          "30440220392bd0f72f0ff7ce983fe6320383e6f52d6921064e95fcd1599b672d1ff074b4022061922fb13f7477708dc88cb11a5448c702c4bad059526253821c7ccc5e182932[ALL|FORKID] 036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d",
        hex:
          "4730440220392bd0f72f0ff7ce983fe6320383e6f52d6921064e95fcd1599b672d1ff074b4022061922fb13f7477708dc88cb11a5448c702c4bad059526253821c7ccc5e1829324121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d"
      },
      sequence: 4294967295
    },
    {
      txid: "023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4",
      vout: 1,
      scriptSig: {
        asm:
          "3044022010e57d2db06c7013ef9fd6848a6e307674a25cb62cb44a666b03800b322a1e3f022013f41bbf2ef462be799a71e1392ca0a37687d3602002bb3b8d772e2afad498a7[ALL|FORKID] 036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d",
        hex:
          "473044022010e57d2db06c7013ef9fd6848a6e307674a25cb62cb44a666b03800b322a1e3f022013f41bbf2ef462be799a71e1392ca0a37687d3602002bb3b8d772e2afad498a74121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d"
      },
      sequence: 4294967295
    },
    {
      txid: "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4",
      vout: 3,
      scriptSig: {
        asm:
          "3044022064a522467b966777592ddb699ce0536a9a94e7f3c9a3c428bec929f78ee3efc60220700c6e1506ab8b5253c12d7f1682aac3bb5f6c869ec257a851d19d36d8c1f10f[ALL|FORKID] 036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d",
        hex:
          "473044022064a522467b966777592ddb699ce0536a9a94e7f3c9a3c428bec929f78ee3efc60220700c6e1506ab8b5253c12d7f1682aac3bb5f6c869ec257a851d19d36d8c1f10f4121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850d"
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_RETURN 5262419 1 1145980243 023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4 0000000011e1a300 0000000e101edc00",
        hex:
          "6a04534c500001010453454e4420023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4080000000011e1a300080000000e101edc00",
        type: "nulldata"
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 99e5a8229a9af0dbf3cadb25ea981df49c9d93bf OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a91499e5a8229a9af0dbf3cadb25ea981df49c9d93bf88ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qzv7t2pzn2d0pklnetdjt65crh6fe8vnhuwvhsk2nn"]
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 210a88277de7a80a1dac90a8153c0e7c8a2f08a7 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5u5k0yyr2q"]
      }
    },
    {
      value: 0.00006898,
      n: 3,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 210a88277de7a80a1dac90a8153c0e7c8a2f08a7 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqss4zp80hn6szsa4jg2s9fupe7g5tcg5u5k0yyr2q"]
      }
    }
  ],
  hex:
    "0200000003a4f3380ed4e4599eeb58e4c4a2aa7823fe9d1a868ee315b55e5e54cdbf1bf265010000006a4730440220392bd0f72f0ff7ce983fe6320383e6f52d6921064e95fcd1599b672d1ff074b4022061922fb13f7477708dc88cb11a5448c702c4bad059526253821c7ccc5e1829324121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850dffffffffe454f384ced298581b0b0c6e9b9d7a93474c9a5ad14f998b0547395ae9d33c02010000006a473044022010e57d2db06c7013ef9fd6848a6e307674a25cb62cb44a666b03800b322a1e3f022013f41bbf2ef462be799a71e1392ca0a37687d3602002bb3b8d772e2afad498a74121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850dffffffffa4f3380ed4e4599eeb58e4c4a2aa7823fe9d1a868ee315b55e5e54cdbf1bf265030000006a473044022064a522467b966777592ddb699ce0536a9a94e7f3c9a3c428bec929f78ee3efc60220700c6e1506ab8b5253c12d7f1682aac3bb5f6c869ec257a851d19d36d8c1f10f4121036a0ccfe281fc5f83f0b1d33fbc0da65cffc6f7f265bb2e17b9c7d8278323850dffffffff040000000000000000406a04534c500001010453454e4420023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4080000000011e1a300080000000e101edc0022020000000000001976a91499e5a8229a9af0dbf3cadb25ea981df49c9d93bf88ac22020000000000001976a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788acf21a0000000000001976a914210a88277de7a80a1dac90a8153c0e7c8a2f08a788ac00000000",
  blockhash: "000000000000000000182bc50810ab0296a6f1f7b6313bf535b6e78dffca8db6",
  confirmations: 154,
  time: 1566227300,
  blocktime: 1566227300
}

const txDetailsSLPGenesisNoBaton = {
  txid: "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
  hash: "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
  version: 1,
  size: 285,
  locktime: 575672,
  vin: [
    {
      txid: "805728012bc3349d1a05dc503aaf389c7a743917d7af6adfb844baff8ff2f89f",
      vout: 2,
      scriptSig: {
        asm:
          "3045022100e4c0e18d97ea6d24c15d60e4032131e985091dec0d844fe00065cb6852b2cfaa02207b6334f72e1aa70f26a88e0e0bff183966405b59bf3a9eaa89d03155cd155505[ALL|FORKID] 03adb6ee2ccaf17f407704c91aae7327bd12fa81aa1bad63bc1685a9ded76d6f2a",
        hex:
          "483045022100e4c0e18d97ea6d24c15d60e4032131e985091dec0d844fe00065cb6852b2cfaa02207b6334f72e1aa70f26a88e0e0bff183966405b59bf3a9eaa89d03155cd155505412103adb6ee2ccaf17f407704c91aae7327bd12fa81aa1bad63bc1685a9ded76d6f2a"
      },
      sequence: 4294967294
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_RETURN 5262419 1 47454e45534953 544f4b2d4348 546f6b796f43617368 0 0 8 0 000775f05a074000",
        hex:
          "6a04534c500001010747454e4553495306544f4b2d434809546f6b796f436173684c004c0001084c0008000775f05a074000",
        type: "nulldata"
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 17c068626a1085ab782b94fe5577b67b9168a1d9 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a91417c068626a1085ab782b94fe5577b67b9168a1d988ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qqtuq6rzdgggt2mc9w20u4thkeaez69pmy6ur897sr"]
      }
    },
    {
      value: 0.00474263,
      n: 2,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 8b3decf88562b3a8037d8e88171e14bff010ea3d OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a9148b3decf88562b3a8037d8e88171e14bff010ea3d88ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qz9nmm8cs43t82qr0k8gs9c7zjllqy82853g26y3tc"]
      }
    }
  ],
  hex:
    "01000000019ff8f28fffba44b8df6aafd71739747a9c38af3a50dc051a9d34c32b01285780020000006b483045022100e4c0e18d97ea6d24c15d60e4032131e985091dec0d844fe00065cb6852b2cfaa02207b6334f72e1aa70f26a88e0e0bff183966405b59bf3a9eaa89d03155cd155505412103adb6ee2ccaf17f407704c91aae7327bd12fa81aa1bad63bc1685a9ded76d6f2afeffffff030000000000000000326a04534c500001010747454e4553495306544f4b2d434809546f6b796f436173684c004c0001084c0008000775f05a07400022020000000000001976a91417c068626a1085ab782b94fe5577b67b9168a1d988ac973c0700000000001976a9148b3decf88562b3a8037d8e88171e14bff010ea3d88acb8c80800",
  blockhash: "0000000000000000003e44676df0c4f80b68aff24bf04823444c0069729631f8",
  confirmations: 21249,
  time: 1553714591,
  blocktime: 1553714591
}

const txDetailsSLPSendAlt = {
  txid: "d94357179775425ebc59c93173bd6dc9854095f090a2eb9dcfe9797398bc8eae",
  hash: "d94357179775425ebc59c93173bd6dc9854095f090a2eb9dcfe9797398bc8eae",
  version: 2,
  size: 438,
  locktime: 0,
  vin: [
    {
      txid: "984a8fc8093e1db5489a8856ab0ecbaef188662535f08de6f87da8622978146f",
      vout: 0,
      scriptSig: {
        asm:
          "3045022100f3f84a7c0a72e6df55ad8ff4596aae2d040403b38f8054d95ee48f3d554790050220776b0833891e65c52685ce3a498e3ee0aa804a85e9b79f21bb74a367ad88a569[ALL|FORKID] 03440d292d554f524a1a16fab1c4384c82a15aa191b6a25187c03f6ec4db57d61e",
        hex:
          "483045022100f3f84a7c0a72e6df55ad8ff4596aae2d040403b38f8054d95ee48f3d554790050220776b0833891e65c52685ce3a498e3ee0aa804a85e9b79f21bb74a367ad88a569412103440d292d554f524a1a16fab1c4384c82a15aa191b6a25187c03f6ec4db57d61e"
      },
      sequence: 4294967295
    },
    {
      txid: "164ff37f47a1be6550a81f3d76f3d57e121d82ed04ed8b7bc932e2273141ebbc",
      vout: 1,
      scriptSig: {
        asm:
          "30440220177d3583516caf6a3d8e99ed9c0a76595a4187d04c575c0f7dab6a6dfa4630c502207fc842e03ca73a2c9d1f9d7406145bb4ea6eb90d1585ea7c4e82491707fadb74[ALL|FORKID] 0252996f42e5908cc6fe5e2df42888a7226f352f2d496e7f9bb17aaf55e41d997b",
        hex:
          "4730440220177d3583516caf6a3d8e99ed9c0a76595a4187d04c575c0f7dab6a6dfa4630c502207fc842e03ca73a2c9d1f9d7406145bb4ea6eb90d1585ea7c4e82491707fadb7441210252996f42e5908cc6fe5e2df42888a7226f352f2d496e7f9bb17aaf55e41d997b"
      },
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          "OP_RETURN 5262419 256 1145980243 73db55368981e4878440637e448d4abe7f661be5c3efdcbcb63bd86a01a76b5a 0000000000000001",
        hex:
          "6a04534c50000200010453454e442073db55368981e4878440637e448d4abe7f661be5c3efdcbcb63bd86a01a76b5a080000000000000001",
        type: "nulldata"
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 f037d66efd7235ae4eeb03f666845a7c23ace91a OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914f037d66efd7235ae4eeb03f666845a7c23ace91a88ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qrcr04nwl4erttjwavplve5ytf7z8t8frg94efy6ts"]
      }
    },
    {
      value: 0.00047367,
      n: 2,
      scriptPubKey: {
        asm:
          "OP_DUP OP_HASH160 d5669ba347fd2abe6a06d0310f817d1f1304ba71 OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914d5669ba347fd2abe6a06d0310f817d1f1304ba7188ac",
        reqSigs: 1,
        type: "pubkeyhash",
        addresses: ["bitcoincash:qr2kdxargl7j40n2qmgrzrup0503xp96wyn5ju6p5l"]
      }
    }
  ],
  hex:
    "02000000026f14782962a87df8e68df035256688f1aecb0eab56889a48b51d3e09c88f4a98000000006b483045022100f3f84a7c0a72e6df55ad8ff4596aae2d040403b38f8054d95ee48f3d554790050220776b0833891e65c52685ce3a498e3ee0aa804a85e9b79f21bb74a367ad88a569412103440d292d554f524a1a16fab1c4384c82a15aa191b6a25187c03f6ec4db57d61effffffffbceb413127e232c97b8bed04ed821d127ed5f3763d1fa85065bea1477ff34f16010000006a4730440220177d3583516caf6a3d8e99ed9c0a76595a4187d04c575c0f7dab6a6dfa4630c502207fc842e03ca73a2c9d1f9d7406145bb4ea6eb90d1585ea7c4e82491707fadb7441210252996f42e5908cc6fe5e2df42888a7226f352f2d496e7f9bb17aaf55e41d997bffffffff030000000000000000386a04534c50000200010453454e442073db55368981e4878440637e448d4abe7f661be5c3efdcbcb63bd86a01a76b5a08000000000000000122020000000000001976a914f037d66efd7235ae4eeb03f666845a7c23ace91a88ac07b90000000000001976a914d5669ba347fd2abe6a06d0310f817d1f1304ba7188ac00000000"
}

const mockTxDetails = {
  txid: "9dbaaafc48c49a21beabada8de632009288a2cd52eecefd0c00edcffca9955d0",
  version: 2,
  locktime: 0,
  vin: [
    {
      txid: "203f21da29235b290cca3ec7cf14479533b3fd15d75ecb2e72f57bcff984bd94",
      vout: 1,
      sequence: 4294967295,
      n: 0,
      scriptSig: {
        hex:
          "4730440220068b4d98542760aeff6dd3b17958611c12cfe36ca23d1a2df42241b0c993286202202db64ad12f62fe0f13ed904d095c4ed06555e0632d9d55db50fabba7d0153aea412103021c8dd3baebdbc1b437b063ffe631cac3d6ce6aa62e3c3b8eb83a0dfceef542",
        asm:
          "30440220068b4d98542760aeff6dd3b17958611c12cfe36ca23d1a2df42241b0c993286202202db64ad12f62fe0f13ed904d095c4ed06555e0632d9d55db50fabba7d0153aea[ALL|FORKID] 03021c8dd3baebdbc1b437b063ffe631cac3d6ce6aa62e3c3b8eb83a0dfceef542"
      },
      value: 546,
      legacyAddress: "1Fy3KxcwycjXyjpcBMMxbiZwGxDgFmNeSw",
      cashAddress: "bitcoincash:qzjz4l6fvdhgpjdfhs8gg8664en0l942p5sjf3lwh7",
      slpAddress: "simpleledger:qzjz4l6fvdhgpjdfhs8gg8664en0l942p5ufz22wfq"
    },
    {
      txid: "50dd2b262bf60e605a4749f7187c6c6fe57af9067f07744d28df1602b7685d89",
      vout: 1,
      sequence: 4294967295,
      n: 1,
      scriptSig: {
        hex:
          "483045022100f1de68dfab06aba82b10cf8d63be91a31e44087c624de01a63fc0bc209d637ed02200c5182100391a9b486b83cb3caa533451c84247594a5c2ceabfb3b0c9dc68bfd412103021c8dd3baebdbc1b437b063ffe631cac3d6ce6aa62e3c3b8eb83a0dfceef542",
        asm:
          "3045022100f1de68dfab06aba82b10cf8d63be91a31e44087c624de01a63fc0bc209d637ed02200c5182100391a9b486b83cb3caa533451c84247594a5c2ceabfb3b0c9dc68bfd[ALL|FORKID] 03021c8dd3baebdbc1b437b063ffe631cac3d6ce6aa62e3c3b8eb83a0dfceef542"
      },
      value: 546,
      legacyAddress: "1Fy3KxcwycjXyjpcBMMxbiZwGxDgFmNeSw",
      cashAddress: "bitcoincash:qzjz4l6fvdhgpjdfhs8gg8664en0l942p5sjf3lwh7",
      slpAddress: "simpleledger:qzjz4l6fvdhgpjdfhs8gg8664en0l942p5ufz22wfq"
    },
    {
      txid: "d3ec152a06d1f9f474c22015f63deeaadf39a399b516d5e60eebe1ad3c9315ec",
      vout: 1,
      sequence: 4294967295,
      n: 2,
      scriptSig: {
        hex:
          "483045022100d8e0d89ad11bf281026463a34d4b1a7e4465cab43bc26f8cb0f6999cb359f7d1022052e74af271323259977bb55c116efbb7988b4f670119ba247f24a2a56f4ac063412103da9d0ed61cc8010a01ed9d8bc64230ba72afe0c0ffdae0195911fbe9aa3e0112",
        asm:
          "3045022100d8e0d89ad11bf281026463a34d4b1a7e4465cab43bc26f8cb0f6999cb359f7d1022052e74af271323259977bb55c116efbb7988b4f670119ba247f24a2a56f4ac063[ALL|FORKID] 03da9d0ed61cc8010a01ed9d8bc64230ba72afe0c0ffdae0195911fbe9aa3e0112"
      },
      value: 422955,
      legacyAddress: "18TRupzu6qbvEJUFAwoWEsDBQXaQcmUdXk",
      cashAddress: "bitcoincash:qpgusltsseyslth9azccyxel5gne2257fq0p9q2nkj",
      slpAddress: "simpleledger:qpgusltsseyslth9azccyxel5gne2257fqr6wmlngv"
    }
  ],
  vout: [
    {
      value: "0.00000000",
      n: 0,
      scriptPubKey: {
        hex:
          "6a04534c500001010453454e44207353603832726dc0bd67afaac2acdd0fbd9fbe562710a68fd1e88943211277fc0800000000000000ca",
        asm:
          "OP_RETURN 5262419 1 1145980243 7353603832726dc0bd67afaac2acdd0fbd9fbe562710a68fd1e88943211277fc 00000000000000ca"
      },
      spentTxId: null,
      spentIndex: null,
      spentHeight: null
    },
    {
      value: "0.00000546",
      n: 1,
      scriptPubKey: {
        hex: "76a9140c036a1ee180c958f97afa5a8a6272ab47091fbd88ac",
        asm:
          "OP_DUP OP_HASH160 0c036a1ee180c958f97afa5a8a6272ab47091fbd OP_EQUALVERIFY OP_CHECKSIG",
        addresses: ["126XCYnDwqMBXfQTvsTfpYRwX59moZUZDS"],
        type: "pubkeyhash",
        cashAddrs: ["bitcoincash:qqxqx6s7uxqvjk8e0ta94znzw245wzglh5h9wdssan"],
        slpAddrs: ["simpleledger:qqxqx6s7uxqvjk8e0ta94znzw245wzglh5m79k9srd"]
      },
      spentTxId: null,
      spentIndex: null,
      spentHeight: null
    },
    {
      value: "0.00422880",
      n: 2,
      scriptPubKey: {
        hex: "76a91451c87d7086490faee5e8b1821b3fa227952a9e4888ac",
        asm:
          "OP_DUP OP_HASH160 51c87d7086490faee5e8b1821b3fa227952a9e48 OP_EQUALVERIFY OP_CHECKSIG",
        addresses: ["18TRupzu6qbvEJUFAwoWEsDBQXaQcmUdXk"],
        type: "pubkeyhash",
        cashAddrs: ["bitcoincash:qpgusltsseyslth9azccyxel5gne2257fq0p9q2nkj"],
        slpAddrs: ["simpleledger:qpgusltsseyslth9azccyxel5gne2257fqr6wmlngv"]
      },
      spentTxId: null,
      spentIndex: null,
      spentHeight: null
    }
  ],
  blockhash: "0000000000000000028713785942eddfd39daa60e8768b9b0513ff077d1ecd2f",
  blockheight: 600711,
  confirmations: 1668,
  time: 1568761257,
  blocktime: 1568761257,
  valueOut: 0.00423426,
  size: 585,
  valueIn: 0.00424047,
  fees: 0.00000621,
  tokenInfo: {
    versionType: 1,
    transactionType: "SEND",
    tokenIdHex:
      "7353603832726dc0bd67afaac2acdd0fbd9fbe562710a68fd1e88943211277fc",
    sendOutputs: ["0", "202"]
  },
  tokenIsValid: true
}

const mockDualValidation = [
  {
    txid: "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
    valid: true
  },
  {
    txid: "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
    valid: true
  }
]

const mockDualOpData = {
  tokenType: 1,
  transactionType: "send",
  tokenId: "dd84ca78db4d617221b58eabc6667af8fe2f7eadbfcc213d35be9f1b419beb8d",
  spendData: [
    {
      quantity: "1",
      sentTo: "bitcoincash:qqavn6wspzy7nsy7ex9dj9t7a8va7nv6ey05jkul6l",
      vout: 1
    },
    {
      quantity: "5",
      sentTo: "bitcoincash:qpyx5hv7nhxk9cmug3vp7jnasdt8akselvteqypm9m",
      vout: 2
    }
  ]
}

module.exports = {
  mockList,
  mockToken,
  mockTokens,
  balancesForAddress,
  balancesForAddresses,
  mockRawTx,
  mockIsValidTxid,
  mockBalancesForToken,
  mockTokenStats,
  mockTransactions,
  mockBalance,
  mockBurnTotal,
  nonSLPTxDetailsWithoutOpReturn,
  nonSLPTxDetailsWithOpReturn,
  txDetailsSLPGenesis,
  txDetailsSLPMint,
  txDetailsSLPSend,
  txDetailsSLPGenesisNoBaton,
  txDetailsSLPSendAlt,
  mockTxDetails,
  mockDualValidation,
  mockDualOpData
}
