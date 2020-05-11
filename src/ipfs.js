/*
  This library interacts with the IPFS REST API at FullStack.cash for uploading
  and downloading data from the IPFS network.
*/

const axios = require("axios")
const Uppy = require("@uppy/core")
const Tus = require("@uppy/tus")
const fs = require("fs")

let _this

class IPFS {
  constructor(config) {
    this.IPFS_API = process.env.IPFS_API
      ? process.env.IPFS_API
      : `https://ipfs-api.fullstack.cash`

    // Default options when calling axios.
    this.axiosOptions = {
      headers: {
        // authorization: `Token ${this.apiToken}`,
        timeout: 15000 // Timeout if the server does not respond in time.
      }
    }

    _this = this

    _this.axios = axios
    _this.fs = fs

    // Initialize Uppy
    _this.uppy = _this.initUppy
  }

  // Initializes Uppy, which is used for file uploads.
  initUppy() {
    const uppy = Uppy({
      allowMultipleUploads: false,
      meta: { test: "avatar" },
      debug: false,
      restrictions: {
        maxFileSize: null,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: null //type of files allowed to load
      }
    })

    uppy.use(Tus, { endpoint: `${_this.IPFS_API}/uppy-files` })

    return uppy
  }

  // Upload a file to the FullStack.cash IPFS server. If successful, it will
  // return an object with an ID, a BCH address, and an amount of BCH to pay.
  async upload(path) {
    try {
      // Ensure the file exists.
      if (!_this.fs.existsSync(path))
        throw new Error(`Could not find this file: ${path}`)

      return true
    } catch (err) {
      console.error(`Error in bch-js/src/ipfs.js/upload()`)
      throw err
    }
  }
}

module.exports = IPFS
