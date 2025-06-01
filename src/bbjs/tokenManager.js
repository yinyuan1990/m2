// ✅ TokenInfo 数据结构：轻量展示资产（用于列表）
class TokenInfo {
  /**
   * @param {number|string} chainId 区块链的 Chain ID
   * @param {string} address 代币合约地址，主币为空字符串或 0x000...
   * @param {string} name 代币名称
   * @param {string} symbol 代币简称
   * @param {number} decimals 精度
   * @param {string} logoURI logo 地址
   * @param {boolean} isAdded 是否添加进用户资产
   * @param {string} balance 当前余额（UI 显示）
   */
  constructor(chainId, address, name, symbol, decimals, logoURI, isAdded = false, balance = "0") {
    this.chainId = chainId
    this.address = address
    this.name = name
    this.symbol = symbol
    this.decimals = decimals
    this.logoURI = logoURI
    this.isAdded = isAdded
    this.balance = balance
  }
}

// ✅ WalletAsset 数据结构：用于资产详情页 + 图表
class WalletAsset {
  /**
   * @param {Object} param0 参数对象
   */
  constructor({
    walletId,
    chainId,
    contractAddress,
    symbol,
    name,
    decimals,
    balance = "0",
    priceUsd = "0",
    change24h = "0",
    iconUrl = null,
    isMainCoin = false,
    updatedAt = Date.now(),
    address,
    vm_type
  }) {
    this.walletId = walletId
    this.chainId = chainId
    this.contractAddress = contractAddress
    this.symbol = symbol
    this.name = name
    this.decimals = decimals
    this.balance = balance
    this.priceUsd = priceUsd
    this.change24h = change24h
    this.iconUrl = iconUrl
    this.isMainCoin = isMainCoin
    this.updatedAt = updatedAt
    this.address = address
    this.vm_type = vm_type
  }
}
