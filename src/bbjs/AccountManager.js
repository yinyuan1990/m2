import { ethers } from 'ethers'
import * as bip39 from 'bip39'

// 用于本地存储（可替换成 Telegram 云存储）
const STORAGE = typeof window !== 'undefined' ? window.localStorage : new Map()

export function save(key, value) {
  STORAGE.setItem ? STORAGE.setItem(key, JSON.stringify(value)) : STORAGE.set(key, JSON.stringify(value))
}
export function load(key, defaultValue = null) {
  const raw = STORAGE.getItem ? STORAGE.getItem(key) : STORAGE.get(key)
  if (!raw) return defaultValue
  try {
    return JSON.parse(raw)
  } catch (e) {
    return defaultValue
  }
}

const ACCOUNTS_KEY = 'wallet_accounts'
const CURRENT_KEY = 'current_wallet_id'
const DEFAULT_PATH = "m/44'/60'/0'/0/0" // EVM BIP-44

class AccountManager {
  constructor() {
    this.accounts = load(ACCOUNTS_KEY, [])
    this.currentAccountId = load(CURRENT_KEY, null)
  }

  save() {
    save(ACCOUNTS_KEY, this.accounts)
    save(CURRENT_KEY, this.currentAccountId)
  }

  createFromMnemonic() {
    const mnemonic = bip39.generateMnemonic()
    return this.importMnemonic(mnemonic)
  }

  importMnemonic(mnemonic) {
    if (!bip39.validateMnemonic(mnemonic)) {
      // return '无效助记词';
      throw new Error('无效助记词')
    }
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, DEFAULT_PATH)
    const id = crypto.randomUUID?.() || Date.now().toString()

    const entry = {
      chainId: '1',
      coinType: 60,
      address: wallet.address,
      path: DEFAULT_PATH,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
    }

    const account = {
      walletId: id,
      mnemonic,
      privateKey: null,
      importType: 'mnemonic',
      addresses: [entry],
      currentChainId: '1',
    }

    this.accounts.push(account)
    if (!this.currentAccountId) this.currentAccountId = id
    this.save()
    return account
  }

  importPrivateKey(privateKey) {
    if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) throw new Error('私钥格式错误')
    const wallet = new ethers.Wallet(privateKey)
    const id = crypto.randomUUID?.() || Date.now().toString()

    const entry = {
      chainId: '1',
      coinType: 60,
      address: wallet.address,
      path: null,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
    }

    const account = {
      walletId: id,
      mnemonic: null,
      privateKey,
      importType: 'privateKey',
      addresses: [entry],
      currentChainId: '1',
    }

    this.accounts.push(account)
    if (!this.currentAccountId) this.currentAccountId = id
    this.save()
    return account
  }

  getCurrentAccount() {
    return this.accounts.find(acc => acc.walletId === this.currentAccountId)
  }

  getCurrentAddress() {
    const acc = this.getCurrentAccount()
    return acc?.addresses?.find(a => a.chainId === acc.currentChainId) || null
  }

  switchAccount(walletId) {
    this.currentAccountId = walletId
    this.save()
  }

  getAllAccounts() {
    return this.accounts
  }

  deleteAccount(walletId) {
    const i = this.accounts.findIndex(acc => acc.walletId === walletId)
    if (i < 0 || this.accounts.length <= 1) return false
    this.accounts.splice(i, 1)
    if (walletId === this.currentAccountId) {
      this.currentAccountId = this.accounts[0].walletId
    }
    this.save()
    return true
  }

  
  /**
   * 切换当前账户到指定链（如果该链无地址，则自动派生；仅限助记词账户）
   * @param {string} chainId
   * @returns {AddressEntry|null} 切换后的地址信息
   */
  switchToChain(chainId) {
    const acc = this.getCurrentAccount()
    if (!acc) return null

    let entry = acc.addresses.find(a => a.chainId === chainId)
    if (!entry && acc.mnemonic) {
      // 默认派生路径（可扩展为链特定路径）
      const wallet = ethers.Wallet.fromMnemonic(acc.mnemonic, DEFAULT_PATH)
      entry = {
        chainId,
        coinType: 60,
        address: wallet.address,
        path: DEFAULT_PATH,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey
      }
      acc.addresses.push(entry)
    }

    if (entry) {
      acc.currentChainId = chainId
      this.save()
      return entry
    }

    return null
  }

}


/**
 * 获取主币或代币余额（自动识别）
 * @param {object} options 参数
 * @param {string} options.rpcUrl 链的 RPC 地址
 * @param {string} options.address 用户地址
 * @param {string} [options.contractAddress] 可选，代币合约地址；不传表示主币
 * @returns {Promise<string>} 返回余额（单位为最小单位，需除以 decimals）
 */
export async function fetchTokenBalance({ rpcUrl, address, contractAddress }) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  try {
    if (!contractAddress) {
      // 主币余额
      const balance = await provider.getBalance(address)
      return balance.toString() // 返回 Wei 单位
    } else {
      // 合约代币余额
      const erc20Abi = ['function balanceOf(address) view returns (uint256)']
      const contract = new ethers.Contract(contractAddress, erc20Abi, provider)
      const balance = await contract.balanceOf(address)
      return balance.toString()
    }
  } catch (e) {
    console.error(`[fetchTokenBalance] 余额获取失败:`, e)
    return '0'
  }
}

export const accountManager = new AccountManager()
window.accountManager = accountManager;
