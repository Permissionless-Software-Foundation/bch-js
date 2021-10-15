/*
  Mock data used for unit testing.
*/
const dsproof = {
  dspid: '6234fff2a9dbcaa50e2c50d74e1d725a2bed1757d7a05a2db7a82df659554397',
  txid: 'ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e',
  outpoint: {
    txid: '17ebef34f7e9a0692317dd6fbb43ffccff45b7d688a2a754dbccfc5e6d93ce3e',
    vout: 1
  },
  path: ['ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e'],
  descendants: [
    'ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e'
  ]
}

module.exports = {
  dsproof
}
