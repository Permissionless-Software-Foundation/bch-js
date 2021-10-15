/*
  Mock data used for unit tests against the Encryption library.
*/

const successMock = {
  success: true,
  publicKey:
    '03fcc37586d93af1e146238217989924e0ab1f011c34e1a23aec529354d5b28eb4'
}

const failureMock = {
  success: false,
  publicKey: 'not found'
}

module.exports = {
  successMock,
  failureMock
}
