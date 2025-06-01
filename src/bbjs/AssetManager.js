import { chainDefaultAssetMap } from './chain-default-assets' // 维护好的默认主币信息
import { fetchTokenPrice,fetchTokenDetail } from './priceService'
import { load,save } from "./AccountManager"
const ASSETS_PREFIX = 'assets_' // assets_{walletId}_{chainId}

class AssetManager {
  getAssets(walletId, chainId) {

    return load(`${ASSETS_PREFIX}${walletId}_${chainId}`, [])
  }

  saveAssets(walletId, chainId, assets) {
    save(`${ASSETS_PREFIX}${walletId}_${chainId}`, assets)
  }

  addAsset(walletId, chainId, asset) {
    const list = this.getAssets(walletId, chainId)
    if (!list.find(a => a.contractAddress?.toLowerCase() === asset.contractAddress?.toLowerCase())) {
      list.push(asset)
      this.saveAssets(walletId, chainId, list)
    }
  }

  removeAsset(walletId, chainId, contractAddress) {
    const list = this.getAssets(walletId, chainId)
    const filtered = list.filter(a => a.contractAddress?.toLowerCase() !== contractAddress.toLowerCase())
    this.saveAssets(walletId, chainId, filtered)
  }

  async refreshAssets(walletId, chainId, address) {
    const list = this.getAssets(walletId, chainId)

    const updated = await Promise.all(list.map(async (asset) => {
      const detail = await fetchTokenDetail(asset.platform || 'ethereum', asset.contractAddress)
      return {
        ...asset,
        priceUsd: detail.price,
        change24h: detail.change24h,
        iconUrl: detail.logo,
        updatedAt: Date.now()
      }
    }))

    this.saveAssets(walletId, chainId, updated)
    return updated
  }

  /**
   * 添加默认主币资产（根据 chainId 自动识别 symbol/name/logoURI/decimals）
   */
  async addDefaultMainAsset(walletId, chainId, address) {
    console.log('addDefaultMainAsset')
    const meta = chainDefaultAssetMap[chainId]
    if (!meta) throw new Error(`未知主币信息: ${chainId}`)

    const { symbol, name, decimals, logoURI } = meta

    let priceInfo = { price: '0', change24h: '0' }
    // try {
    //   priceInfo = await fetchTokenPrice(meta.coinGeckoCoinId)
    // } catch (_) {}

    const asset = {
      walletId,
      chainId,
      contractAddress: '',
      symbol,
      name,
      decimals,
      balance: '0',
      priceUsd: priceInfo.price,
      change24h: priceInfo.change24h,
      iconUrl: logoURI,
      updatedAt: Date.now(),
      isMainCoin: true,
      address,
      vm_type: 'evm'
    }

    this.addAsset(walletId, chainId, asset)
  }
  
  /**
 * 获取钱包下的总资产汇总信息（包含总价、总数量、格式化展示）
 * @param {string} walletId 钱包 ID
 * @returns {Promise<{ totalPrice: number, totalFormatted: string, items: Array }>}
 */
async getTotalAssetSummary(walletId) {
  let total = 0
  const result = []

  // 遍历所有链
  for (const chainId of Object.keys(chainDefaultAssetMap)) {
    const assets = this.getAssets(walletId, chainId)
    for (const asset of assets) {
      const balance = parseFloat(asset.balance || '0')
      const price = parseFloat(asset.priceUsd || '0')
      const value = balance * price

      if (!isNaN(value) && value > 0) {
        total += value
        result.push({
          symbol: asset.symbol,
          name: asset.name,
          iconUrl: asset.iconUrl,
          balance,
          priceUsd: price,
          value
        })
      }
    }
  }

  return {
    totalPrice: total,
    totalFormatted: formatNumber(total),
    items: result
  }
}
/**
 * 添加一个合约代币资产（从 CoinGecko 获取信息）
 * @param {string} walletId 钱包 ID
 * @param {number} chainId 链 ID
 * @param {string} address 用户地址
 * @param {string} contractAddress 合约地址
 */
async addContractTokenAsset(walletId, chainId, address, contractAddress) {
  let chainDefa_item = chainDefaultAssetMap[chainId];
  const platformId = chainDefaultAssetMap[chainId]?.coinGeckoPlatformId || 'ethereum'
  console.log( chainDefa_item ,platformId)
  try {
    const detail = await fetchTokenDetail({platformId, contractAddress})

    const asset = {
      walletId,
      chainId,
      contractAddress: contractAddress,
      symbol: detail.symbol.toUpperCase(),
      name: detail.name,
      decimals: chainDefa_item.decimals || detail.decimals || 18,
      balance: '0',
      priceUsd: detail.price,
      change24h: detail.change24h,
      iconUrl: detail.logo,
      updatedAt: Date.now(),
      isMainCoin: false,
      address,
      vm_type: 'evm',
      platform: platformId
    }

    this.addAsset(walletId, chainId, asset)
    return asset
  } catch (err) {
    console.error(`添加代币失败: ${contractAddress}`, err)
    throw err
  }
}
/**
   * 获取指定链的总资产（以 USD 估算）
   * @param {string} walletId 钱包 ID
   * @param {string|number} chainId 链 ID
   * @returns {{ totalPrice: number, totalFormatted: string }}
   */
  getChainAssetSummary(walletId, chainId) {
    const assets = this.getAssets(walletId, chainId)
    let total = 0

    for (const asset of assets) {
      const balance = parseFloat(asset.balance || '0')
      const price = parseFloat(asset.priceUsd || '0')
      total += balance * price
    }

    return {
      totalPrice: total,
      totalFormatted: formatNumber(total)
    }
  }
}


/**
 * 美化大数字，如 1_500 -> 1.5K，2_000_000 -> 2M
 */
function formatNumber(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(2) + 'K'
  return n.toFixed(2)
}



export const assetManager = new AssetManager()
window.assetManager = assetManager
