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

module.exports = {
  uploadData
}
