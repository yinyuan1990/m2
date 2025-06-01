/**
 * 获取代币 Logo 图标（支持主币 + 合约代币）
 * 优先使用 TrustWallet CDN，其次 fallback 至默认图标
 *
 * @param {number|string} chainId 链 ID（如 1, 56, 137）
 * @param {string} contractAddress 合约地址（主币传空或 0x000...000）
 * @param {string} symbol 可选，用于 fallback 图标文字
 * @returns {string} 图标 URL
 */
export function getTokenLogo(chainId, contractAddress, symbol = '') {
  const lowercase = addr => addr.toLowerCase()

  const trustBase = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains'

  const chainMap = {
    1: 'ethereum',
    56: 'smartchain',
    137: 'polygon',
    10: 'optimism',
    42161: 'arbitrum',
    8453: 'base',
    324: 'zksync',
    59144: 'linea',
    534352: 'scroll',
    11297108109: 'palm'
  }

  const chainKey = chainMap[chainId]
  const isMainCoin = !contractAddress || contractAddress === '0x0000000000000000000000000000000000000000'

  // TrustWallet 图标路径
  if (chainKey) {
    if (isMainCoin) {
      return `${trustBase}/${chainKey}/info/logo.png`
    } else {
      return `${trustBase}/${chainKey}/assets/${lowercase(contractAddress)}/logo.png`
    }
  }

  // fallback 默认图标（显示前三个字母）
  return `https://via.placeholder.com/32?text=${symbol?.slice(0, 3).toUpperCase() || 'T'}`
}


getTokenLogo(1, '', 'ETH')
// → 以太坊主币图标

getTokenLogo(137, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 'WETH')
// → WETH 的 TrustWallet 图标

getTokenLogo(9999, '', 'XYZ')
// → 找不到链时 fallback: https://via.placeholder.com/32?text=XYZ
