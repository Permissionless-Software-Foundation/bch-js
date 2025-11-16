/*
  An end-to-end test for testing the functionality of uploading a file to
  IPFS is working.
*/

import { fileURLToPath } from 'url'
import { dirname } from 'path'
// process.env.IPFS_API = `https://ipfs-api.fullstack.cash`

import BCHJS from '../../../src/bch-js.js'

process.env.IPFS_API = 'http://localhost:5001'
const bchjs = new BCHJS()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('#IPFS', () => {
  it('should upload a file to the server', async () => {
    const path = `${__dirname.toString()}/ipfs-e2e.js`

    const fileModel = await bchjs.IPFS.createFileModel(path)
    console.log(`fileModel: ${JSON.stringify(fileModel, null, 2)}`)

    const fileId = fileModel.file._id

    const fileObj = await bchjs.IPFS.uploadFile(path, fileId)
    console.log(`fileObj: ${JSON.stringify(fileObj, null, 2)}`)
  }).timeout(30000)
})
