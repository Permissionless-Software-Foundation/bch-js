/*
  Mocking data used in the transaction-unit.js tests.
*/

const nonSlpTxDetails = {
  txid: '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7',
  hash: '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7',
  version: 2,
  size: 225,
  locktime: 0,
  vin: [
    {
      txid: '5f09d317e24c5d376f737a2711f3bd1d381abdb41743fff3819b4f76382e1eac',
      vout: 1,
      scriptSig: {
        asm:
          '3044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c[ALL|FORKID] 038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9',
        hex:
          '473044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c4121038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9'
      },
      sequence: 4294967295,
      address: 'bitcoincash:qqxy8hycqe89j7wa79gnggq6z3gaqu2uvqy26xehfe',
      value: 0.00047504
    }
  ],
  vout: [
    {
      value: 0.00001,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 2fe2c4c5ef359bb2fe1a849f891cecffbcfb4f77 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9']
      }
    },
    {
      value: 0.00046256,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 2dbf5e1804c39a497b908c876097d63210c84902 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9142dbf5e1804c39a497b908c876097d63210c8490288ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqkm7hscqnpe5jtmjzxgwcyh6ceppjzfqg3jdn422e']
      }
    }
  ],
  hex:
    '0200000001ac1e2e38764f9b81f3ff4317b4bd1a381dbdf311277a736f375d4ce217d3095f010000006a473044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c4121038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9ffffffff02e8030000000000001976a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788acb0b40000000000001976a9142dbf5e1804c39a497b908c876097d63210c8490288ac00000000',
  blockhash: '0000000000000000010903a1fc4274499037c9339be9ec7338ee980331c20ce5',
  confirmations: 77741,
  time: 1569792892,
  blocktime: 1569792892
}

const slpTxDetails = {
  txid: '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1',
  hash: '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1',
  version: 2,
  size: 479,
  locktime: 0,
  vin: [
    {
      txid: 'abc685f1f2a95f51e5e05a350f3fb9c74676e9f78c835b2a019c888ac0a2a736',
      vout: 2,
      scriptSig: {
        asm:
          '3045022100e5f0f6f1212fcbb10eedb7fdc38fca6e86629b4e7e8356a3ad7371a109fc37a602204bfff37d1a34d2e2908b81c23677706fb59ff4ab639fa3299da6c303de74e1f7[ALL|FORKID] 0245b9b3586fab3cfd46db6d116c4588004fe7fe9798216ccb8e55a89bcebc07ac',
        hex:
          '483045022100e5f0f6f1212fcbb10eedb7fdc38fca6e86629b4e7e8356a3ad7371a109fc37a602204bfff37d1a34d2e2908b81c23677706fb59ff4ab639fa3299da6c303de74e1f741210245b9b3586fab3cfd46db6d116c4588004fe7fe9798216ccb8e55a89bcebc07ac'
      },
      sequence: 4294967295,
      address: 'bitcoincash:qzv7t2pzn2d0pklnetdjt65crh6fe8vnhuwvhsk2nn',
      value: 0.00000546
    },
    {
      txid: '58c8576404c01c23a224053307399483d3a070599b3e9eb6d45be9714b8d6856',
      vout: 1,
      scriptSig: {
        asm:
          '30430220784f6d81fa8f54db8a4948259e8c15972a0285f8b1640c433d4e9f606dc38f0c021f14eecc2e8af2efede0867ce459c400dde54186a0e64babdbe89f795db12753[ALL|FORKID] 0209ebe6d9da5043945ed1d81bec0fcace299eba05e5f46b72d6838c790d31c505',
        hex:
          '4630430220784f6d81fa8f54db8a4948259e8c15972a0285f8b1640c433d4e9f606dc38f0c021f14eecc2e8af2efede0867ce459c400dde54186a0e64babdbe89f795db1275341210209ebe6d9da5043945ed1d81bec0fcace299eba05e5f46b72d6838c790d31c505'
      },
      sequence: 4294967295,
      address: 'bitcoincash:qppzuxemgqyxf07nz3kan33gmc83mf3z3yz295c4s7',
      value: 0.68369626
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 1145980243 497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7 0000000005f5e100 00005ad7e49d9100',
        hex:
          '6a04534c500001010453454e4420497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7080000000005f5e1000800005ad7e49d9100',
        type: 'nulldata'
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 36be3b7d185a85b6cf6fc61d63c16f2f10e54260 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a91436be3b7d185a85b6cf6fc61d63c16f2f10e5426088ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqmtuwmarpdgtdk0dlrp6c7pduh3pe2zvqrkys2ex8']
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 99e5a8229a9af0dbf3cadb25ea981df49c9d93bf OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a91499e5a8229a9af0dbf3cadb25ea981df49c9d93bf88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qzv7t2pzn2d0pklnetdjt65crh6fe8vnhuwvhsk2nn']
      }
    },
    {
      value: 0.68368564,
      n: 3,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 422e1b3b400864bfd3146dd9c628de0f1da62289 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914422e1b3b400864bfd3146dd9c628de0f1da6228988ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qppzuxemgqyxf07nz3kan33gmc83mf3z3yz295c4s7']
      }
    }
  ],
  hex:
    '020000000236a7a2c08a889c012a5b838cf7e97646c7b93f0f355ae0e5515fa9f2f185c6ab020000006b483045022100e5f0f6f1212fcbb10eedb7fdc38fca6e86629b4e7e8356a3ad7371a109fc37a602204bfff37d1a34d2e2908b81c23677706fb59ff4ab639fa3299da6c303de74e1f741210245b9b3586fab3cfd46db6d116c4588004fe7fe9798216ccb8e55a89bcebc07acffffffff56688d4b71e95bd4b69e3e9b5970a0d383943907330524a2231cc0046457c85801000000694630430220784f6d81fa8f54db8a4948259e8c15972a0285f8b1640c433d4e9f606dc38f0c021f14eecc2e8af2efede0867ce459c400dde54186a0e64babdbe89f795db1275341210209ebe6d9da5043945ed1d81bec0fcace299eba05e5f46b72d6838c790d31c505ffffffff040000000000000000406a04534c500001010453454e4420497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7080000000005f5e1000800005ad7e49d910022020000000000001976a91436be3b7d185a85b6cf6fc61d63c16f2f10e5426088ac22020000000000001976a91499e5a8229a9af0dbf3cadb25ea981df49c9d93bf88acb4381304000000001976a914422e1b3b400864bfd3146dd9c628de0f1da6228988ac00000000',
  blockhash: '0000000000000000015284202422a688554b7fc80c54f18122847a99c4f79607',
  confirmations: 76722,
  time: 1570392893,
  blocktime: 1570392893
}

const mockOpReturnData01 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
  amounts: ['100000000', '99883300000000']
}

const mockOpReturnData02 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: 'TOK-CH',
  name: 'TokyoCash',
  tokenId: '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
  documentUri: '',
  documentHash: '',
  decimals: 8,
  mintBatonVout: 0,
  qty: '2100000000000000'
}

const mockOpReturnData03 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
  amounts: ['1000000000', '99883400000000']
}

const genesisTestInputTx = {
  txid: '874306bda204d3a5dd15e03ea5732cccdca4c33a52df35162cdd64e30ea7f04e',
  hash: '874306bda204d3a5dd15e03ea5732cccdca4c33a52df35162cdd64e30ea7f04e',
  version: 1,
  size: 480,
  locktime: 543408,
  vin: [
    {
      txid: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
      vout: 1,
      scriptSig: {
        asm:
          '30440220268dacee1117975d904dd0d45ef8de42b86030d825a9522bae196a38bbf6b271022001ae1ce2536ab300040e597bcfaa8ef9fb2beaf702d0842f3161aae8e9867f55[ALL|FORKID] 028ff9e32b0dbc82c1d5e0fc945b2537b00420513b10684726f312f1b717c0ae11',
        hex:
          '4730440220268dacee1117975d904dd0d45ef8de42b86030d825a9522bae196a38bbf6b271022001ae1ce2536ab300040e597bcfaa8ef9fb2beaf702d0842f3161aae8e9867f554121028ff9e32b0dbc82c1d5e0fc945b2537b00420513b10684726f312f1b717c0ae11'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qp2jesd06k8ycj4wvkpl9lcwaemtr04f5yphjsa07v',
      value: 0.00000546
    },
    {
      txid: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
      vout: 3,
      scriptSig: {
        asm:
          '3045022100fa241bb2de46f68688451bfcae3f165b724e3ccf13b219e7bf2d8d2df7712ad60220353017d6e581a06efce478adfcd2047cea2f92531e283845f3d0a345ef101519[ALL|FORKID] 02cc48ad10516f97e914b8836ff25448d07ad96ebb4704c6a828339880280831bc',
        hex:
          '483045022100fa241bb2de46f68688451bfcae3f165b724e3ccf13b219e7bf2d8d2df7712ad60220353017d6e581a06efce478adfcd2047cea2f92531e283845f3d0a345ef101519412102cc48ad10516f97e914b8836ff25448d07ad96ebb4704c6a828339880280831bc'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qppj3euc36x5u6twr5cxrrea2rca53vsfu3dxwr86j',
      value: 0.00172192
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 1145980243 323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35 00000000004c4b40 00000000004c4b40',
        hex:
          '6a04534c500001010453454e4420323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d350800000000004c4b400800000000004c4b40',
        type: 'nulldata'
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 0a74cf9c0fb3f6dd62c3f5eecd1ed6e1051428e0 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9140a74cf9c0fb3f6dd62c3f5eecd1ed6e1051428e088ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qq98fnuup7eldhtzc067ang76mss29pguqh7qv9eac']
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 d4548261e1be0de7e50b7511597799ec4af2b173 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914d4548261e1be0de7e50b7511597799ec4af2b17388ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qr29fqnpuxlqmel9pd63zkthn8ky4u43wv0v7pg5mn']
      }
    },
    {
      value: 0.00171165,
      n: 3,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 d4548261e1be0de7e50b7511597799ec4af2b173 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914d4548261e1be0de7e50b7511597799ec4af2b17388ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qr29fqnpuxlqmel9pd63zkthn8ky4u43wv0v7pg5mn']
      }
    }
  ],
  hex:
    '0100000002359dab0d9c8ddc788b14c0b51493d195c9fbd9f2203d091663350bae351e3a32010000006a4730440220268dacee1117975d904dd0d45ef8de42b86030d825a9522bae196a38bbf6b271022001ae1ce2536ab300040e597bcfaa8ef9fb2beaf702d0842f3161aae8e9867f554121028ff9e32b0dbc82c1d5e0fc945b2537b00420513b10684726f312f1b717c0ae11feffffff359dab0d9c8ddc788b14c0b51493d195c9fbd9f2203d091663350bae351e3a32030000006b483045022100fa241bb2de46f68688451bfcae3f165b724e3ccf13b219e7bf2d8d2df7712ad60220353017d6e581a06efce478adfcd2047cea2f92531e283845f3d0a345ef101519412102cc48ad10516f97e914b8836ff25448d07ad96ebb4704c6a828339880280831bcfeffffff040000000000000000406a04534c500001010453454e4420323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d350800000000004c4b400800000000004c4b4022020000000000001976a9140a74cf9c0fb3f6dd62c3f5eecd1ed6e1051428e088ac22020000000000001976a914d4548261e1be0de7e50b7511597799ec4af2b17388ac9d9c0200000000001976a914d4548261e1be0de7e50b7511597799ec4af2b17388acb04a0800',
  blockhash: '000000000000000000292a9c6150fce48e2edd8df346948494fe6249e6e7f63b',
  confirmations: 163095,
  time: 1534271330,
  blocktime: 1534271330
}

const mintTestInputTx = {
  txid: '4640a734063ea79fa587a3cac38a70a2f6f3db0011e23514024185982110d0fa',
  hash: '4640a734063ea79fa587a3cac38a70a2f6f3db0011e23514024185982110d0fa',
  version: 1,
  size: 585,
  locktime: 543613,
  vin: [
    {
      txid: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
      vout: 1,
      scriptSig: {
        asm:
          '3045022100e3d5f9a48f9aa1cf7e9ed1992e0281e7300b734ba0e4bd5bb9265b2be60bd71002200ccde53ce7ea9da9df3e834f234f3bea65c2e58c96f8436f93333fd8946a1db2[ALL|FORKID] 02056220984cc2cf5261a27d4f66d31c9ef601a688ca1a5ab81e55b6f0d311be74',
        hex:
          '483045022100e3d5f9a48f9aa1cf7e9ed1992e0281e7300b734ba0e4bd5bb9265b2be60bd71002200ccde53ce7ea9da9df3e834f234f3bea65c2e58c96f8436f93333fd8946a1db2412102056220984cc2cf5261a27d4f66d31c9ef601a688ca1a5ab81e55b6f0d311be74'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qpaf9wltgmpjlg2vxwwu7zdw5y4z7m277ckxn8cufl',
      value: 0.00000546,
      tokenQtyStr: '43545.34534',
      tokenQty: 43545.34534
    },
    {
      txid: 'ee9d3cf5153599c134147e3fac9844c68e216843f4452a1ce15a29452af6db34',
      vout: 1,
      scriptSig: {
        asm:
          '3045022100bb90d52be9b568f643fdb1a302e9f063be27a9f914e2a6b192cbabf2cbdeaf9302203c275fc8d1b82390bc1726390d361c5266056bddd54dec23efa207c79eacea4a[ALL|FORKID] 024146cfcd0c02e99d6451dc48ad0f97114aeda18fe55c52a10bfc0490f314e6a2',
        hex:
          '483045022100bb90d52be9b568f643fdb1a302e9f063be27a9f914e2a6b192cbabf2cbdeaf9302203c275fc8d1b82390bc1726390d361c5266056bddd54dec23efa207c79eacea4a4121024146cfcd0c02e99d6451dc48ad0f97114aeda18fe55c52a10bfc0490f314e6a2'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qqf89zzwd0fqc3npkks997r5l7dpfjf9kgx2rqu500',
      value: 0.00000546,
      tokenQtyStr: '2.34123',
      tokenQty: 2.34123
    },
    {
      txid: 'ee9d3cf5153599c134147e3fac9844c68e216843f4452a1ce15a29452af6db34',
      vout: 3,
      scriptSig: {
        asm:
          '3044022029ab770c249f467b40bb90410429f6d657f9be299baa19a6838d04d972436b450220143660297e8e836bc16d317649fad8c310bdadb4fb61d4e9f6ba11203abe5dae[ALL|FORKID] 02eed4ac9dda3405d9b1ccbbf09f8056f3e7c615924274bd5643238b543d0a1d56',
        hex:
          '473044022029ab770c249f467b40bb90410429f6d657f9be299baa19a6838d04d972436b450220143660297e8e836bc16d317649fad8c310bdadb4fb61d4e9f6ba11203abe5dae412102eed4ac9dda3405d9b1ccbbf09f8056f3e7c615924274bd5643238b543d0a1d56'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qqt30r33k0jx3sxe34tmupaujpaljnglmvqgrrfp2x',
      value: 0.00054848,
      tokenQtyStr: '2.34123',
      tokenQty: 2.34123
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 1145980243 938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8 0000000103907f11',
        hex:
          '6a04534c500001010453454e4420938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8080000000103907f11',
        type: 'nulldata'
      },
      tokenQty: null
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 059775ff94f65c04e8a6847e74eb9809d8cd779b OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914059775ff94f65c04e8a6847e74eb9809d8cd779b88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqzewa0ljnm9cp8g56z8ua8tnqya3nthnvhv5hpu8y']
      },
      tokenQtyStr: '43547.68657',
      tokenQty: 43547.68657
    },
    {
      value: 0.00054808,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 0e330dc9009e1e07831f5a22d4ade8977ab674c8 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9140e330dc9009e1e07831f5a22d4ade8977ab674c888ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qq8rxrwfqz0pupurradz949dazth4dn5eqs3mhrucv']
      },
      tokenQty: null
    }
  ],
  hex:
    '0100000003f8cda53b43b0ea49991a9bc6c74eb901d2a8b964bc7b8987d76789618ec18c93010000006b483045022100e3d5f9a48f9aa1cf7e9ed1992e0281e7300b734ba0e4bd5bb9265b2be60bd71002200ccde53ce7ea9da9df3e834f234f3bea65c2e58c96f8436f93333fd8946a1db2412102056220984cc2cf5261a27d4f66d31c9ef601a688ca1a5ab81e55b6f0d311be74feffffff34dbf62a45295ae11c2a45f44368218ec64498ac3f7e1434c1993515f53c9dee010000006b483045022100bb90d52be9b568f643fdb1a302e9f063be27a9f914e2a6b192cbabf2cbdeaf9302203c275fc8d1b82390bc1726390d361c5266056bddd54dec23efa207c79eacea4a4121024146cfcd0c02e99d6451dc48ad0f97114aeda18fe55c52a10bfc0490f314e6a2feffffff34dbf62a45295ae11c2a45f44368218ec64498ac3f7e1434c1993515f53c9dee030000006a473044022029ab770c249f467b40bb90410429f6d657f9be299baa19a6838d04d972436b450220143660297e8e836bc16d317649fad8c310bdadb4fb61d4e9f6ba11203abe5dae412102eed4ac9dda3405d9b1ccbbf09f8056f3e7c615924274bd5643238b543d0a1d56feffffff030000000000000000376a04534c500001010453454e4420938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8080000000103907f1122020000000000001976a914059775ff94f65c04e8a6847e74eb9809d8cd779b88ac18d60000000000001976a9140e330dc9009e1e07831f5a22d4ade8977ab674c888ac7d4b0800',
  blockhash: '00000000000000000140f0d813052da59c811a936494a8d8b2d60b215d19e3dc',
  confirmations: 167007,
  time: 1534391953,
  blocktime: 1534391953,
  isValidSLPTx: true,
  tokenTxType: 'SEND',
  tokenId: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
  tokenTicker: 'Bubb2',
  tokenName: 'the new bubbles!',
  tokenDecimals: 5,
  tokenUri: '',
  tokenDocHash: ''
}

const genesisTestOpReturnData01 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
  amounts: ['5000000', '5000000']
}

const genesisTestOpReturnData02 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: '',
  name: '',
  tokenId: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
  documentUri: '',
  documentHash: '',
  decimals: 0,
  mintBatonVout: 2,
  qty: '10000000'
}

const mintTestOpReturnData01 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
  amounts: ['4354768657']
}

const mintTestOpReturnData02 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: 'Bubb2',
  name: 'the new bubbles!',
  tokenId: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
  documentUri: '',
  documentHash: '',
  decimals: 5,
  mintBatonVout: 2,
  qty: '4354534534'
}

const mintTestOpReturnData03 = {
  tokenType: 1,
  txType: 'MINT',
  tokenId: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
  mintBatonVout: 2,
  qty: '234123'
}

const sendTestInputTx01 = {
  txid: '6bc111fbf5b118021d68355ca19a0e77fa358dd931f284b2550f79a51ab4792a',
  hash: '6bc111fbf5b118021d68355ca19a0e77fa358dd931f284b2550f79a51ab4792a',
  version: 1,
  size: 627,
  locktime: 543956,
  vin: [
    {
      txid: 'b36b0c7485ad569b98cc9b9614dc68a5208495f22ec3b00effcf963b135a5215',
      vout: 1,
      scriptSig: {
        asm:
          '3045022100934ca9732bf6c1b146f09e6198142a79a80788b576c6b94e2052df5bcdc86ad902205ef6205192200ea93f6c97f966b838ee785529b694eb61e576e3452470613847[ALL|FORKID] 02b23484341cf36ec00184e045d54e6ffca97da7a8f8a6fd719cead192132306b1',
        hex:
          '483045022100934ca9732bf6c1b146f09e6198142a79a80788b576c6b94e2052df5bcdc86ad902205ef6205192200ea93f6c97f966b838ee785529b694eb61e576e3452470613847412102b23484341cf36ec00184e045d54e6ffca97da7a8f8a6fd719cead192132306b1'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qqxj7p2jatt8h3tcpadyxw8a2mr7myqk2qm57u4rdf',
      value: 0.00000546
    },
    {
      txid: 'b36b0c7485ad569b98cc9b9614dc68a5208495f22ec3b00effcf963b135a5215',
      vout: 3,
      scriptSig: {
        asm:
          '3044022004d4a95658ef140561ae3a936fb01511778a5376a499bcd6f47b64074a6ca4430220273a4bf553ca17c7e10f393582f980e17a6a98ada867633faad9dbcc595dfd23[ALL|FORKID] 0324fe3b895cfa09523e8ec529eb15c681e3a20f96df85175c54a952b68ac018df',
        hex:
          '473044022004d4a95658ef140561ae3a936fb01511778a5376a499bcd6f47b64074a6ca4430220273a4bf553ca17c7e10f393582f980e17a6a98ada867633faad9dbcc595dfd2341210324fe3b895cfa09523e8ec529eb15c681e3a20f96df85175c54a952b68ac018df'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qrcdncgpnv3s8lekcamv4yekp8sghnk37qtsxdyzla',
      value: 0.00153976
    },
    {
      txid: '95d460512143b636bbc5780d8b27b04fca3bfd2f22003ab48da594e2bab9cfc1',
      vout: 2,
      scriptSig: {
        asm:
          '3044022079f239216f8d806a084221e841227e55d23a1b90aaf5b5ab54d6f865fbeacf8b022053568f10afc00459af083e4c77d0b85229eb8973a1de406aaa699557f05c7fed[ALL|FORKID] 02035f98ff79d6f3a8ec5a2738c103bbb7796e94fcaffdfaae8f5b7a7fae5d93e3',
        hex:
          '473044022079f239216f8d806a084221e841227e55d23a1b90aaf5b5ab54d6f865fbeacf8b022053568f10afc00459af083e4c77d0b85229eb8973a1de406aaa699557f05c7fed412102035f98ff79d6f3a8ec5a2738c103bbb7796e94fcaffdfaae8f5b7a7fae5d93e3'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qrcukahsm53lsywcdarehh73vqazpdu8zv547nym9g',
      value: 0.00000546
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 1145980243 550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b35 00005af3107a4000 004657febe8d8000',
        hex:
          '6a04534c500001010453454e4420550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b350800005af3107a400008004657febe8d8000',
        type: 'nulldata'
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 268dadd7c7becc11782ad3d956342442d8eae92a OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914268dadd7c7becc11782ad3d956342442d8eae92a88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqngmtwhc7lvcytc9tfaj435y3pd36hf9gtdq8nsuu']
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 9fb45b370f9ff38a775ee95cabcad7615817924e OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9149fb45b370f9ff38a775ee95cabcad7615817924e88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qz0mgkehp70l8znhtm54e2726as4s9ujfc9s2szctr']
      }
    },
    {
      value: 0.00153347,
      n: 3,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 9fb45b370f9ff38a775ee95cabcad7615817924e OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9149fb45b370f9ff38a775ee95cabcad7615817924e88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qz0mgkehp70l8znhtm54e2726as4s9ujfc9s2szctr']
      }
    }
  ],
  hex:
    '010000000315525a133b96cfff0eb0c32ef2958420a568dc14969bcc989b56ad85740c6bb3010000006b483045022100934ca9732bf6c1b146f09e6198142a79a80788b576c6b94e2052df5bcdc86ad902205ef6205192200ea93f6c97f966b838ee785529b694eb61e576e3452470613847412102b23484341cf36ec00184e045d54e6ffca97da7a8f8a6fd719cead192132306b1feffffff15525a133b96cfff0eb0c32ef2958420a568dc14969bcc989b56ad85740c6bb3030000006a473044022004d4a95658ef140561ae3a936fb01511778a5376a499bcd6f47b64074a6ca4430220273a4bf553ca17c7e10f393582f980e17a6a98ada867633faad9dbcc595dfd2341210324fe3b895cfa09523e8ec529eb15c681e3a20f96df85175c54a952b68ac018dffeffffffc1cfb9bae294a58db43a00222ffd3bca4fb0278b0d78c5bb36b643215160d495020000006a473044022079f239216f8d806a084221e841227e55d23a1b90aaf5b5ab54d6f865fbeacf8b022053568f10afc00459af083e4c77d0b85229eb8973a1de406aaa699557f05c7fed412102035f98ff79d6f3a8ec5a2738c103bbb7796e94fcaffdfaae8f5b7a7fae5d93e3feffffff040000000000000000406a04534c500001010453454e4420550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b350800005af3107a400008004657febe8d800022020000000000001976a914268dadd7c7becc11782ad3d956342442d8eae92a88ac22020000000000001976a9149fb45b370f9ff38a775ee95cabcad7615817924e88ac03570200000000001976a9149fb45b370f9ff38a775ee95cabcad7615817924e88acd44c0800',
  blockhash: '000000000000000001882548bbd9a41bc53a039634f2afa4a12d653434347d04',
  confirmations: 166670,
  time: 1534593905,
  blocktime: 1534593905
}

const sendTestOpReturnData01 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b35',
  amounts: ['100000000000000', '19800000000000000']
}

const sendTestOpReturnData02 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: 'USDT',
  name: 'Tether Ltd. US dollar backed tokens',
  tokenId: '550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b35',
  documentUri:
    'https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf',
  documentHash:
    '�DQ�\u001e�3�\u0006p���pM�\u0001\u0017�pW(;\u0003,��wy19\u0016',
  decimals: 8,
  mintBatonVout: 2,
  qty: '10000000000000000'
}

const sendTestOpReturnData03 = {
  tokenType: 1,
  txType: 'MINT',
  tokenId: '550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b35',
  mintBatonVout: 2,
  qty: '10000000000000000'
}

const sendTestOpReturnData04 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '550d19eb820e616a54b8a73372c4420b5a0567d8dc00f613b71c5234dc884b35',
  amounts: ['100000000000000', '9900000000000000']
}

const mintTestInputTx02 = {
  txid: 'ee9d3cf5153599c134147e3fac9844c68e216843f4452a1ce15a29452af6db34',
  hash: 'ee9d3cf5153599c134147e3fac9844c68e216843f4452a1ce15a29452af6db34',
  version: 1,
  size: 473,
  locktime: 543613,
  vin: [
    {
      txid: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
      vout: 3,
      scriptSig: {
        asm:
          '3045022100ac43a871e0f84787001db745e4801b789fd9cd7efa247727ebb5c0c7b66d597302205316328b6501759e9a15ec65202219a433172d153f9f1b68f65f3a63494ba6f0[ALL|FORKID] 0345a5f5dd11c987b346c18c245f0df6d305369984b9b3c7ba465c29875466e374',
        hex:
          '483045022100ac43a871e0f84787001db745e4801b789fd9cd7efa247727ebb5c0c7b66d597302205316328b6501759e9a15ec65202219a433172d153f9f1b68f65f3a63494ba6f041210345a5f5dd11c987b346c18c245f0df6d305369984b9b3c7ba465c29875466e374'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qqj0durd4qzdddvl2u6sen8n8h6mljtywugqctt9km',
      value: 0.00056266
    },
    {
      txid: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
      vout: 2,
      scriptSig: {
        asm:
          '304402202ce2d9d63bc6ab7765d267540fd3429bf7a8d1b50e975391fff3a4506289461a02205daf3f761a9b02d141f22136a6fe019062182c9da1b1d3a5245ff745f1236e45[ALL|FORKID] 02c00b05bc633a48e074bc54dd195b19a470ad6252ac8d306c82a2bd729c1c4c69',
        hex:
          '47304402202ce2d9d63bc6ab7765d267540fd3429bf7a8d1b50e975391fff3a4506289461a02205daf3f761a9b02d141f22136a6fe019062182c9da1b1d3a5245ff745f1236e45412102c00b05bc633a48e074bc54dd195b19a470ad6252ac8d306c82a2bd729c1c4c69'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qzf72qccdgjrpjpewq8dazlze6jyxzku8q3cauna4t',
      value: 0.00000546
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 1414416717 938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8 2 000000000003928b',
        hex:
          '6a04534c50000101044d494e5420938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8010208000000000003928b',
        type: 'nulldata'
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 1272884e6bd20c4661b5a052f874ff9a14c925b2 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9141272884e6bd20c4661b5a052f874ff9a14c925b288ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqf89zzwd0fqc3npkks997r5l7dpfjf9kgx2rqu500']
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 d1eaebf8d1face5bd866e36bd94f43e2ffceef71 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914d1eaebf8d1face5bd866e36bd94f43e2ffceef7188ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qrg746lc68avuk7cvm3khk20g030lnh0wy5h2k2fqr']
      }
    },
    {
      value: 0.00054848,
      n: 3,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 17178e31b3e468c0d98d57be07bc907bf94d1fdb OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a91417178e31b3e468c0d98d57be07bc907bf94d1fdb88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqt30r33k0jx3sxe34tmupaujpaljnglmvqgrrfp2x']
      }
    }
  ],
  hex:
    '0100000002f8cda53b43b0ea49991a9bc6c74eb901d2a8b964bc7b8987d76789618ec18c93030000006b483045022100ac43a871e0f84787001db745e4801b789fd9cd7efa247727ebb5c0c7b66d597302205316328b6501759e9a15ec65202219a433172d153f9f1b68f65f3a63494ba6f041210345a5f5dd11c987b346c18c245f0df6d305369984b9b3c7ba465c29875466e374fefffffff8cda53b43b0ea49991a9bc6c74eb901d2a8b964bc7b8987d76789618ec18c93020000006a47304402202ce2d9d63bc6ab7765d267540fd3429bf7a8d1b50e975391fff3a4506289461a02205daf3f761a9b02d141f22136a6fe019062182c9da1b1d3a5245ff745f1236e45412102c00b05bc633a48e074bc54dd195b19a470ad6252ac8d306c82a2bd729c1c4c69feffffff040000000000000000396a04534c50000101044d494e5420938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8010208000000000003928b22020000000000001976a9141272884e6bd20c4661b5a052f874ff9a14c925b288ac22020000000000001976a914d1eaebf8d1face5bd866e36bd94f43e2ffceef7188ac40d60000000000001976a91417178e31b3e468c0d98d57be07bc907bf94d1fdb88ac7d4b0800',
  blockhash: '00000000000000000140f0d813052da59c811a936494a8d8b2d60b215d19e3dc',
  confirmations: 168436,
  time: 1534391953,
  blocktime: 1534391953
}

const mintTestOpReturnData04 = {
  tokenType: 1,
  txType: 'MINT',
  tokenId: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
  mintBatonVout: 2,
  qty: '234123'
}

const mintTestOpReturnData05 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: 'Bubb2',
  name: 'the new bubbles!',
  tokenId: '938cc18e618967d787897bbc64b9a8d201b94ec7c69b1a9949eab0433ba5cdf8',
  documentUri: '',
  documentHash: '',
  decimals: 5,
  mintBatonVout: 2,
  qty: '4354534534'
}

const genesisTestInputTx02 = {
  txid: '4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf',
  hash: '4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf',
  version: 1,
  size: 444,
  locktime: 571211,
  vin: [
    {
      txid: 'f3e056874846b6f491a1ccac3da81a3411c61d8466835446a52efa68c0d11804',
      vout: 0,
      scriptSig: {
        asm:
          '3044022022fb67bd9b35810db3fa04da4014cc93063c5ed15e8febeca09d32c03397068502206fbb86498919ca8a9be6940c904c944cd923691391a4a7d92e0c841605d46b2e[ALL|FORKID] 03fbe2c56094dc336f6244eac2e45d3d25a8e97059f2cc7de31cbf179e73dcc9bf',
        hex:
          '473044022022fb67bd9b35810db3fa04da4014cc93063c5ed15e8febeca09d32c03397068502206fbb86498919ca8a9be6940c904c944cd923691391a4a7d92e0c841605d46b2e412103fbe2c56094dc336f6244eac2e45d3d25a8e97059f2cc7de31cbf179e73dcc9bf'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qz6rcxjw34yuy5fngu7fngnyy55t0v802cmsmjvsp2',
      value: 0.00001111
    },
    {
      txid: '87bf0efc1630f5179b73496f9f885b141cb4c8366432a91ba678298432b197ea',
      vout: 0,
      scriptSig: {
        asm:
          '3045022100d5fbab461c19c7b56245287eb15510c86872ceb405ede7322f5266efa6cc32ea022074b557bcef9a129fb31cb2e7c2ada9fe51d5cf924ae55d1d2a29368ca1f15ef2[ALL|FORKID] 03fbe2c56094dc336f6244eac2e45d3d25a8e97059f2cc7de31cbf179e73dcc9bf',
        hex:
          '483045022100d5fbab461c19c7b56245287eb15510c86872ceb405ede7322f5266efa6cc32ea022074b557bcef9a129fb31cb2e7c2ada9fe51d5cf924ae55d1d2a29368ca1f15ef2412103fbe2c56094dc336f6244eac2e45d3d25a8e97059f2cc7de31cbf179e73dcc9bf'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qz6rcxjw34yuy5fngu7fngnyy55t0v802cmsmjvsp2',
      value: 0.007
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 47454e45534953 5350494345 5370696365 7370696365736c7040676d61696c2e636f6d 0 8 0 016345785d8a0000',
        hex:
          '6a04534c500001010747454e45534953055350494345055370696365127370696365736c7040676d61696c2e636f6d4c0001084c0008016345785d8a0000',
        type: 'nulldata'
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 70e5c384ae563b4fd6cfc5f7f8df43ea427d9e10 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a91470e5c384ae563b4fd6cfc5f7f8df43ea427d9e1088ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qpcwtsuy4etrkn7kelzl07xlg04yylv7zqru2cqwvm']
      }
    },
    {
      value: 0.0070012,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 df305a87d98cd64e1bee825d2167a16445ecdfdd OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914df305a87d98cd64e1bee825d2167a16445ecdfdd88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qr0nqk58mxxdvnsma6p96gt859jytmxlm5t0v7de4q']
      }
    }
  ],
  hex:
    '01000000020418d1c068fa2ea546548366841dc611341aa83daccca191f4b646488756e0f3000000006a473044022022fb67bd9b35810db3fa04da4014cc93063c5ed15e8febeca09d32c03397068502206fbb86498919ca8a9be6940c904c944cd923691391a4a7d92e0c841605d46b2e412103fbe2c56094dc336f6244eac2e45d3d25a8e97059f2cc7de31cbf179e73dcc9bffeffffffea97b132842978a61ba9326436c8b41c145b889f6f49739b17f53016fc0ebf87000000006b483045022100d5fbab461c19c7b56245287eb15510c86872ceb405ede7322f5266efa6cc32ea022074b557bcef9a129fb31cb2e7c2ada9fe51d5cf924ae55d1d2a29368ca1f15ef2412103fbe2c56094dc336f6244eac2e45d3d25a8e97059f2cc7de31cbf179e73dcc9bffeffffff0300000000000000003e6a04534c500001010747454e45534953055350494345055370696365127370696365736c7040676d61696c2e636f6d4c0001084c0008016345785d8a000022020000000000001976a91470e5c384ae563b4fd6cfc5f7f8df43ea427d9e1088acd8ae0a00000000001976a914df305a87d98cd64e1bee825d2167a16445ecdfdd88ac4bb70800',
  blockhash: '000000000000000002278c188c52b536d4ed84a1970d8ff59043e082cef7748a',
  confirmations: 141226,
  time: 1551042875,
  blocktime: 1551042875
}

const genesisTestOpReturn03 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: 'SPICE',
  name: 'Spice',
  tokenId: '4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf',
  documentUri: 'spiceslp@gmail.com',
  documentHash: '',
  decimals: 8,
  mintBatonVout: 0,
  qty: '100000000000000000'
}

module.exports = {
  nonSlpTxDetails,
  slpTxDetails,
  mockOpReturnData01,
  mockOpReturnData02,
  mockOpReturnData03,
  genesisTestInputTx,
  mintTestInputTx,
  genesisTestOpReturnData01,
  genesisTestOpReturnData02,
  mintTestOpReturnData01,
  mintTestOpReturnData02,
  mintTestOpReturnData03,
  sendTestInputTx01,
  sendTestOpReturnData01,
  sendTestOpReturnData02,
  sendTestOpReturnData03,
  sendTestOpReturnData04,
  mintTestInputTx02,
  mintTestOpReturnData04,
  mintTestOpReturnData05,
  genesisTestInputTx02,
  genesisTestOpReturn03
}
