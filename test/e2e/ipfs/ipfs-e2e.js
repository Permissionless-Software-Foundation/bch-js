/*
  An end-to-end test for testing the functionality of uploading a file to
  IPFS is working.
*/

process.env.IPFS_API = 'http://localhost:5001'
// process.env.IPFS_API = `https://ipfs-api.fullstack.cash`

const BCHJS = require('../../../src/bch-js')
const bchjs = new BCHJS()

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
