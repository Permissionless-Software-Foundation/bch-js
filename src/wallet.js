// import BCHWalletBridge from "bch-wallet-bridge.js"
class Wallet {
  constructor(walletProvider) {
    // this.bchWalletBridge = new BCHWalletBridge(walletProvider)
  }

  setWalletProvider(walletProvider) {
    this.bchWalletBridge.walletProvider = walletProvider
  }

  getAddress(changeType, index, dAppId) {
    return this.bchWalletBridge.getAddress(changeType, index, dAppId)
  }

  getAddressIndex(changeType, dAppId) {
    return this.bchWalletBridge.getAddressIndex(changeType, dAppId)
  }

  getAddresses(changeType, startIndex, size, dAppId) {
    return this.bchWalletBridge.getAddresses(
      changeType,
      startIndex,
      size,
      dAppId
    )
  }

  getRedeemScript(p2shAddress, dAppId) {
    return this.bchWalletBridge.getRedeemScript(p2shAddress, dAppId)
  }

  getRedeemScripts(dAppId) {
    return this.bchWalletBridge.getRedeemScripts(dAppId)
  }

  addRedeemScript(redeemScript, dAppId) {
    return this.bchWalletBridge.addRedeemScript(redeemScript, dAppId)
  }

  getUtxos(dAppId) {
    return this.bchWalletBridge.getUtxos(dAppId)
  }

  getBalance(dAppId) {
    return this.bchWalletBridge.getBalance(dAppId)
  }

  sign(address, dataToSign) {
    return this.bchWalletBridge.sign(address, dataToSign)
  }

  buildTransaction(outputs, dAppId) {
    return this.bchWalletBridge.buildTransaction(outputs, dAppId)
  }

  getProtocolVersion() {
    return this.bchWalletBridge.getProtocolVersion()
  }

  getNetwork() {
    return this.bchWalletBridge.getNetwork()
  }

  getFeePerByte() {
    return this.bchWalletBridge.getFeePerByte()
  }

  getDefaultDAppId() {
    return this.bchWalletBridge.getDefaultDAppId()
  }

  setDefaultDAppId(dAppId) {
    return this.bchWalletBridge.setDefaultDAppId(dAppId)
  }
}

module.exports = Wallet
