const mockUtxoData = {
  success: true,
  utxos: [
    {
      utxos: [
        {
          height: 569108,
          tx_hash:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          tx_pos: 1,
          value: 546
        },
        {
          height: 674331,
          tx_hash:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          tx_pos: 0,
          value: 1000
        }
      ],
      address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
    }
  ]
}

const mockHydratedUtxos = {
  slpUtxos: [
    {
      utxos: [
        {
          height: 569108,
          tx_hash:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          tx_pos: 1,
          value: 546,
          txid:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            'a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37',
          tokenTicker: 'sleven',
          tokenName: 'sleven',
          tokenDocumentUrl: 'sleven',
          tokenDocumentHash: '',
          decimals: 7,
          tokenType: 1,
          tokenQty: '1',
          isValid: true
        },
        {
          height: 674331,
          tx_hash:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          tx_pos: 0,
          value: 1000,
          txid:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          vout: 0,
          isValid: false
        }
      ],
      address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
    }
  ]
}

module.exports = {
  mockUtxoData,
  mockHydratedUtxos
}
