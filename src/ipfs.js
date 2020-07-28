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
      : // : `http://localhost:5001`
        `https://ipfs-api.fullstack.cash`

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

  /**
   * @api IPFS.createFileModel()  createFileModel() - Create a file model
   * @apiName createFileModel()
   * @apiGroup IPFS
   * @apiDescription Creates a new model on the server. If successful, will
   * return an object with file data. That object contains a BCH address,
   * payment amount, and _id required to be able to upload a file.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const path = `${__dirname}/ipfs.js`
   *     let fileData = await bchjs.IPFS.uploadFile(path);
   *     console.log(fileData);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *   "success": true,
   *   "hostingCostBCH": 0.00004197,
   *   "hostingCostUSD": 0.01,
   *   "file": {
   *   "payloadLink": "",
   *   "hasBeenPaid": false,
   *   "_id": "5ec562319bfacc745e8d8a52",
   *   "schemaVersion": 1,
   *   "size": 4458,
   *   "fileName": "ipfs.js",
   *   "fileExtension": "js",
   *   "createdTimestamp": "1589994033.655",
   *   "hostingCost": 4196,
   *   "walletIndex": 49,
   *   "bchAddr": "bchtest:qzrpkevu7h2ayfa4rjx08r5elvpfu72dg567x3mh3c",
   *   "__v": 0
   * }
   */
  async createFileModel(path) {
    try {
      // Ensure the file exists.
      if (!_this.fs.existsSync(path))
        throw new Error(`Could not find this file: ${path}`)

      // Read in the file.
      const fileBuf = _this.fs.readFileSync(path)
      // console.log(`fileBuf: `, fileBuf)

      // console.log(`Buffer length: ${fileBuf.length}`)

      // Get the file name from the path.
      const splitPath = path.split("/")
      const fileName = splitPath[splitPath.length - 1]

      // Get the file extension.
      const splitExt = fileName.split(".")
      const fileExt = splitExt[splitExt.length - 1]

      const fileObj = {
        schemaVersion: 1,
        size: fileBuf.length,
        fileName: fileName,
        fileExtension: fileExt
      }
      // console.log(`fileObj: ${JSON.stringify(fileObj, null, 2)}`)

      const fileData = await _this.axios.post(`${this.IPFS_API}/files`, {
        file: fileObj
      })
      // console.log(`fileData.data: ${JSON.stringify(fileData.data, null, 2)}`)

      return fileData.data
    } catch (err) {
      console.error(`Error in createFileModel()`)
      throw err
    }
  }

  /**
   * @api IPFS.uploadFile()  uploadFile() - Upload a file to IPFS
   * @apiName uploadFile()
   * @apiGroup IPFS
   * @apiDescription Upload a file to the FullStack.cash IPFS server. If
   * successful, it will return an object with an ID, a BCH address, and an
   * amount of BCH to pay.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const path = `${__dirname}/ipfs.js`
   *     let fileData = await bchjs.IPFS.uploadFile(path, "5ec562319bfacc745e8d8a52");
   *     console.log(fileData);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *   "schemaVersion": 1,
   *   "size": 2374,
   *   "fileId": "5ec562319bfacc745e8d8a52",
   *   "fileName": "ipfs.js",
   *   "fileExtension": "js"
   * }
   */
  async uploadFile(path, modelId) {
    try {
      // Ensure the file exists.
      if (!_this.fs.existsSync(path))
        throw new Error(`Could not find this file: ${path}`)

      if (!modelId) {
        throw new Error(
          `Must include a file model ID in order to upload a file.`
        )
      }

      // Read in the file.
      const fileBuf = _this.fs.readFileSync(path)

      // Get the file name from the path.
      const splitPath = path.split("/")
      const fileName = splitPath[splitPath.length - 1]

      // Prepare the upload object. Get a file ID from Uppy.
      const id = _this.uppy.addFile({
        name: fileName,
        data: fileBuf,
        source: "Local",
        isRemote: false
      })
      // console.log(`id: ${JSON.stringify(id, null, 2)}`)

      // Add the model ID, required to be allowed to upload the file.
      _this.uppy.setFileMeta(id, { fileModelId: modelId })

      // Upload the file to the server.
      const upData = await _this.uppy.upload()

      if (upData.failed.length)
        throw new Error("The file could not be uploaded")

      if (upData.successful.length) {
        delete upData.successful[0].data
        // console.log(`upData: ${JSON.stringify(upData, null, 2)}`)

        const fileObj = {
          schemaVersion: 1,
          size: upData.successful[0].progress.bytesTotal,
          fileId: upData.successful[0].meta.fileModelId,
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

  /**
   * @api IPFS.getStatus()  getStatus() - Check status of file upload
   * @apiName getStatus()
   * @apiGroup IPFS
   * @apiDescription Gets the status of the uploaded file. Will return an object
   * that indicates the payment status. If the file is paid, it should contain
   * an IPFS hash.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const modelId = "5ec7392c2acfe57aa62e945a"
   *     let fileData = await bchjs.IPFS.getStatus(modelId)
   *     console.log(fileData)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *    "hasBeenPaid": true,
   *    "satCost": 4403,
   *    "bchAddr": "bchtest:qz5z82u0suqh80x5tfx4ht8kdrkkw664vcy44uz0wk",
   *    "ipfsHash": "QmRDHPhY5hCNVRMVQvS2H9uty8P1skdwgLaHpUAkEvsjcE",
   *    "fileId": "5ec7392c2acfe57aa62e945a",
   *    "fileName": "ipfs-e2e.js"
   * }
   */
  async getStatus(modelId) {
    try {
      if (!modelId) throw new Error(`Must include a file model ID.`)

      const fileData = await _this.axios.get(
        `${this.IPFS_API}/files/${modelId}`
      )
      // console.log(`fileData.data: ${JSON.stringify(fileData.data, null, 2)}`)

      const fileObj = {
        hasBeenPaid: fileData.data.file.hasBeenPaid,
        satCost: fileData.data.file.hostingCost,
        bchAddr: fileData.data.file.bchAddr,
        ipfsHash: fileData.data.file.payloadLink,
        fileId: fileData.data.file._id,
        fileName: fileData.data.file.fileName
      }

      return fileObj
    } catch (err) {
      console.error(`Error in getStatus()`)
      throw err
    }
  }
}

module.exports = IPFS
