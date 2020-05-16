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
      : `http://localhost:5001`
    // : `https://ipfs-api.fullstack.cash`

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
    _this.uppy = _this.initUppy()
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
  async uploadFile(path) {
    try {
      // Ensure the file exists.
      if (!_this.fs.existsSync(path))
        throw new Error(`Could not find this file: ${path}`)

      // Read in the file.
      const fileBuf = _this.fs.readFileSync(path)

      // Convert the node.js Buffer to a Blob
      // https://stackoverflow.com/questions/14653349/node-js-can%C2%B4t-create-blobs
      // const blob = Uint8Array.from(fileBuf).buffer

      // Get the file name from the path.
      const splitPath = path.split("/")
      const fileName = splitPath[splitPath.length - 1]

      const id = _this.uppy.addFile({
        name: fileName,
        data: fileBuf,
        source: "Local",
        isRemote: false
      })

      console.log(`id: ${JSON.stringify(id, null, 2)}`)

      const upData = await _this.uppy.upload()

      // console.log(`
      //   Files Successful : ${upData.successful.length}
      //   Files Failed : ${upData.failed.length}
      //   `)

      if (upData.failed.length)
        throw new Error("The file could not be uploaded")

      if (upData.successful.length) {
        delete upData.successful[0].data
        // console.log(`upData: ${JSON.stringify(upData, null, 2)}`)

        const fileObj = {
          schemaVersion: 1,
          size: upData.successful[0].progress.bytesTotal,
          fileId: upData.successful[0].id,
          fileName: upData.successful[0].name,
          fileExtension: upData.successful[0].extension
        }
        // console.log(`fileObj: ${JSON.stringify(fileObj, null, 2)}`)

        return fileObj
        // return true
      }

      return false
    } catch (err) {
      console.error(`Error in bch-js/src/ipfs.js/upload(): `)
      throw err
    }
  }
}

module.exports = IPFS
