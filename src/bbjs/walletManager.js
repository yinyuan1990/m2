import { ethers } from 'ethers'
import * as bip39 from 'bip39'

// import { generateMnemonic } from '@scure/bip39'
/**
 * 默认派生路径：BIP-44 标准 (Ethereum)
 */
const DEFAULT_PATH = "m/44'/60'/0'/0/0"

/**
 * 生成新钱包（返回助记词和地址信息）
 */
export function createWallet() {
  const mnemonic = bip39.generateMnemonic()
  // const mnemonic = generateMnemonic()
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, DEFAULT_PATH)

  return {
    mnemonic,
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    path: DEFAULT_PATH
  }
}

/**
 * 导入助记词生成钱包（自动校验）
 * @param {string} mnemonic 助记词
 */
export function importFromMnemonic(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('助记词不合法')
  }
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, DEFAULT_PATH)
  return {
    mnemonic,
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    path: DEFAULT_PATH
  }
}

/**
 * 导入私钥生成钱包（支持 EVM 主链）
 * @param {string} privateKey 私钥（0x 开头）
 */
export function importFromPrivateKey(privateKey) {
  if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
    throw new Error('私钥格式不正确')
  }
  const wallet = new ethers.Wallet(privateKey)
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    path: null
  }
}

/**
 * 校验助记词是否合法
 * @param {string} mnemonic
 * @returns {boolean}
 */
export function isValidMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic)
}

/**
 * 校验私钥是否合法
 * @param {string} privateKey
 * @returns {boolean}
 */
export function isValidPrivateKey(privateKey) {
  return /^0x[0-9a-fA-F]{64}$/.test(privateKey)
}
