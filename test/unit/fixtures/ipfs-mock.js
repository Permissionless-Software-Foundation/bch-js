/*
  Mock data for IPFS unit tests.
*/

const uploadData = {
  successful: [
    {
      source: "Local",
      id: "uppy-ipfs/js-1e-application/octet-stream",
      name: "ipfs.js",
      extension: "js",
      meta: {
        test: "avatar",
        name: "ipfs.js",
        type: "application/octet-stream"
      },
      type: "application/octet-stream",
      progress: {
        uploadStarted: 1589596706524,
        uploadComplete: true,
        percentage: 100,
        bytesUploaded: 2374,
        bytesTotal: 2374
      },
      size: null,
      isRemote: false,
      remote: "",
      tus: {
        uploadUrl:
          "http://localhost:5001/uppy-files/6acd261f494c3375dc522e27880efe33"
      },
      response: {
        uploadURL:
          "http://localhost:5001/uppy-files/6acd261f494c3375dc522e27880efe33"
      },
      uploadURL:
        "http://localhost:5001/uppy-files/6acd261f494c3375dc522e27880efe33",
      isPaused: false
    }
  ],
  failed: [],
  uploadID: "cka90u4m300000fi0cldg6lrf"
}

const paymentInfo = {
  success: true,
  hostingCostBCH: 0.00004201,
  hostingCostUSD: 0.01,
  file: {
    payloadLink: "",
    hasBeenPaid: false,
    _id: "5ebf5d04cba8b038394e0d62",
    schemaVersion: 1,
    size: 2374,
    fileId: "uppy-ipfs/js-1e-application/octet-stream",
    fileName: "ipfs.js",
    fileExtension: "js",
    createdTimestamp: "1589599492.952",
    hostingCost: 4201,
    walletIndex: 36,
    bchAddr: "bchtest:qqymyk4zfvnw8rh6hcvl922ewudkyrn9jvk6gtuae6",
    __v: 0
  }
}

module.exports = {
  uploadData,
  paymentInfo
}
