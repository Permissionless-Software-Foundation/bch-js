/*
  Mock data for IPFS unit tests.
*/

const uploadData = {
  successful: [
    {
      source: 'Local',
      id: 'uppy-ipfs/js-1e-application/octet-stream',
      name: 'ipfs.js',
      extension: 'js',
      meta: {
        test: 'avatar',
        name: 'ipfs.js',
        type: 'application/octet-stream',
        fileModelId: '5ec562319bfacc745e8d8a52'
      },
      type: 'application/octet-stream',
      progress: {
        uploadStarted: 1589596706524,
        uploadComplete: true,
        percentage: 100,
        bytesUploaded: 2374,
        bytesTotal: 2374
      },
      size: null,
      isRemote: false,
      remote: '',
      tus: {
        uploadUrl:
          'http://localhost:5001/uppy-files/6acd261f494c3375dc522e27880efe33'
      },
      response: {
        uploadURL:
          'http://localhost:5001/uppy-files/6acd261f494c3375dc522e27880efe33'
      },
      uploadURL:
        'http://localhost:5001/uppy-files/6acd261f494c3375dc522e27880efe33',
      isPaused: false
    }
  ],
  failed: [],
  uploadID: 'cka90u4m300000fi0cldg6lrf'
}

const paymentInfo = {
  success: true,
  hostingCostBCH: 0.00004201,
  hostingCostUSD: 0.01,
  file: {
    payloadLink: '',
    hasBeenPaid: false,
    _id: '5ebf5d04cba8b038394e0d62',
    schemaVersion: 1,
    size: 2374,
    fileId: 'uppy-ipfs/js-1e-application/octet-stream',
    fileName: 'ipfs.js',
    fileExtension: 'js',
    createdTimestamp: '1589599492.952',
    hostingCost: 4201,
    walletIndex: 36,
    bchAddr: 'bchtest:qqymyk4zfvnw8rh6hcvl922ewudkyrn9jvk6gtuae6',
    __v: 0
  }
}

const mockNewFileModel = {
  success: true,
  hostingCostBCH: 0.00004197,
  hostingCostUSD: 0.01,
  file: {
    payloadLink: '',
    hasBeenPaid: false,
    _id: '5ec562319bfacc745e8d8a52',
    schemaVersion: 1,
    size: 4458,
    fileName: 'ipfs.js',
    fileExtension: 'js',
    createdTimestamp: '1589994033.655',
    hostingCost: 4196,
    walletIndex: 49,
    bchAddr: 'bchtest:qzrpkevu7h2ayfa4rjx08r5elvpfu72dg567x3mh3c',
    __v: 0
  }
}

const unpaidFileData = {
  file: {
    payloadLink: '',
    hasBeenPaid: false,
    _id: '5ec7392c2acfe57aa62e945a',
    schemaVersion: 1,
    size: 726,
    fileName: 'ipfs-e2e.js',
    fileExtension: 'js',
    createdTimestamp: '1590114604.986',
    hostingCost: 4403,
    walletIndex: 56,
    bchAddr: 'bchtest:qz5z82u0suqh80x5tfx4ht8kdrkkw664vcy44uz0wk',
    __v: 0
  }
}

const paidFileData = {
  file: {
    payloadLink: 'QmRDHPhY5hCNVRMVQvS2H9uty8P1skdwgLaHpUAkEvsjcE',
    hasBeenPaid: true,
    _id: '5ec7392c2acfe57aa62e945a',
    schemaVersion: 1,
    size: 726,
    fileName: 'ipfs-e2e.js',
    fileExtension: 'js',
    createdTimestamp: '1590114604.986',
    hostingCost: 4403,
    walletIndex: 56,
    bchAddr: 'bchtest:qz5z82u0suqh80x5tfx4ht8kdrkkw664vcy44uz0wk',
    __v: 0
  }
}

module.exports = {
  uploadData,
  paymentInfo,
  mockNewFileModel,
  unpaidFileData,
  paidFileData
}
