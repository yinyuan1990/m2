// import fetch from 'node-fetch' // Node.js 环境需引入，浏览器可忽略
import { ethers } from 'ethers'
/**
 * 查询主币或代币当前价格和涨幅
 */
export async function fetchTokenPrice(coinId, contractAddress = '', platformId = '') {
  try {
    let url = ''
    if (contractAddress && platformId) {
      url = `https://api.coingecko.com/api/v3/coins/${platformId}/contract/${contractAddress}`
    } else {
      url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`
    }

    const res = await fetch(url)
    const data = await res.json()

    if (contractAddress && platformId) {
      return {
        price: data.market_data.current_price.usd,
        change24h: data.market_data.price_change_percentage_24h,
        icon: data.image.small
      }
    } else {
      return {
        price: data[coinId].usd,
        change24h: data[coinId].usd_24h_change
      }
    }
  } catch (e) {
    console.error('价格获取失败', e)
    return { price: 0, change24h: 0 }
  }
}

/**
 * 获取代币完整详情（优先 CoinGecko，失败则链上拉取）
 * @param {object} options 参数对象
 * @param {string} options.rpcUrl 链的 RPC 地址
 * @param {string} options.platformId CoinGecko 平台 ID（如 ethereum）
 * @param {string} options.contractAddress 合约地址
 * @returns {Promise<object>} 返回代币详情（尽量完整）
 */
export async function fetchTokenDetailWithFallback({ rpcUrl, platformId, contractAddress }) {
  // Step 1: 优先从 CoinGecko 获取
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${platformId}/contract/${contractAddress}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.error) throw new Error(data.error)

    return {
      name: data.name,
      symbol: data.symbol,
      decimals: data.detail_platforms?.[platformId]?.decimals || 18,
      logo: data.image.large,
      price: data.market_data.current_price.usd,
      change24h: data.market_data.price_change_percentage_24h,
      marketCap: data.market_data.market_cap.usd,
      volume: data.market_data.total_volume.usd,
      circulatingSupply: data.market_data.circulating_supply,
      ath: data.market_data.ath.usd,
      atl: data.market_data.atl.usd,
      source: 'coingecko',
      updatedAt: Date.now()
    }
  } catch (e) {
    console.warn('[fallback] CoinGecko 查询失败，尝试链上拉取', e)
  }

  // Step 2: fallback 链上拉取 symbol/name/decimals
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const erc20Abi = [
      'function symbol() view returns (string)',
      'function name() view returns (string)',
      'function decimals() view returns (uint8)'
    ]
    const contract = new ethers.Contract(contractAddress, erc20Abi, provider)

    const [symbol, name, decimals] = await Promise.all([
      contract.symbol(),
      contract.name(),
      contract.decimals()
    ])

    return {
      name,
      symbol,
      decimals,
      logo: '', // 可用 getTokenLogo(chainId, contractAddress, symbol) 获取
      price: '0',
      change24h: '0',
      marketCap: '0',
      volume: '0',
      circulatingSupply: '0',
      ath: '0',
      atl: '0',
      source: 'onchain',
      updatedAt: Date.now()
    }
  } catch (e) {
    console.error('[error] 链上获取合约信息失败', e)
    throw new Error('代币信息无法识别')
  }
}




/**
 * 获取代币详情（价格、市值、流通量、ATH/ATL）
 */
export async function fetchTokenDetail({coinGeckoPlatformId, contractAddress = ''}) {
  const url = contractAddress
    ? `https://api.coingecko.com/api/v3/coins/${coinGeckoPlatformId}/contract/${contractAddress}`
    : `https://api.coingecko.com/api/v3/coins/${coinGeckoPlatformId}`
  console.log( url,'coinIdOrPlatform',coinGeckoPlatformId )
  const res = await fetch(url)
  const data = await res.json()

  return {
    name: data.name,
    symbol: data.symbol,
    logo: data.image.large,
    marketCap: data.market_data.market_cap.usd,
    volume: data.market_data.total_volume.usd,
    circulatingSupply: data.market_data.circulating_supply,
    ath: data.market_data.ath.usd,
    atl: data.market_data.atl.usd,
    change24h: data.market_data.price_change_percentage_24h,
    price: data.market_data.current_price.usd,
    platform: data.asset_platform_id || '',
    updatedAt: Date.now(),
    totalM:data.market_data.total_volume.usd,// 总交易额
  }
}

// /**
//  * 获取主币或代币余额（自动识别）
//  * @param {object} options 参数
//  * @param {string} options.rpcUrl 链的 RPC 地址
//  * @param {string} options.address 用户地址
//  * @param {string} [options.contractAddress] 可选，代币合约地址；不传表示主币
//  * @returns {Promise<string>} 返回余额（单位为最小单位，需除以 decimals）
//  */
// export async function fetchTokenBalance({ rpcUrl, address, contractAddress }) {
//   const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

//   try {
//     if (!contractAddress) {
//       // 主币余额
//       const balance = await provider.getBalance(address)
//       return balance.toString() // 返回 Wei 单位
//     } else {
//       // 合约代币余额
//       const erc20Abi = ['function balanceOf(address) view returns (uint256)']
//       const contract = new ethers.Contract(contractAddress, erc20Abi, provider)
//       const balance = await contract.balanceOf(address)
//       return balance.toString()
//     }
//   } catch (e) {
//     console.error(`[fetchTokenBalance] 余额获取失败:`, e)
//     return '0'
//   }
// }


/**
 * 获取主币或代币余额（自动识别）
 * @param {object} options 参数
 * @param {string} options.rpcUrl 链的 RPC 地址
 * @param {string} options.address 用户地址
 * @param {string} [options.contractAddress] 可选，代币合约地址；不传表示主币
 * @param {number} [options.decimals=18] 可选，代币精度；主币默认为 18
 * @returns {Promise<{ raw: string, formatted: string }>} 返回原始余额和格式化余额
 */
export async function fetchTokenBalance({ rpcUrl, address, contractAddress = '', decimals = 18 }) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  try {
    let rawBalance = '0'

    if (!contractAddress) {
      // 主币余额
      const balance = await provider.getBalance(address)
      rawBalance = balance.toString()
    } else {
      // 合约代币余额
      const erc20Abi = ['function balanceOf(address) view returns (uint256)']
      const contract = new ethers.Contract(contractAddress, erc20Abi, provider)
      const balance = await contract.balanceOf(address)
      rawBalance = balance.toString()
    }

    const formatted = ethers.utils.formatUnits(rawBalance, decimals)
    return { raw: rawBalance, formatted }
  } catch (e) {
    console.error(`[fetchTokenBalance] 余额获取失败:`, e)
    return { raw: '0', formatted: '0' }
  }
}

/**
 * 从链上读取代币 symbol/name/decimals
 * @param {string} rpcUrl 链的 RPC 地址
 * @param {string} contractAddress 合约地址
 * @returns {Promise<object>} 返回代币基础信息
 */
export async function fetchTokenDetailFromChain(rpcUrl, contractAddress) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const abi = [
    'function symbol() view returns (string)',
    'function name() view returns (string)',
    'function decimals() view returns (uint8)'
  ]
  const contract = new ethers.Contract(contractAddress, abi, provider)

  const [symbol, name, decimals] = await Promise.all([
    contract.symbol(),
    contract.name(),
    contract.decimals()
  ])

  return {
    name,
    symbol,
    decimals,
    logo: '', // 你可以后续根据 symbol 自行处理 logo
    price: '0',
    change24h: '0',
    marketCap: '0',
    volume: '0',
    circulatingSupply: '0',
    ath: '0',
    atl: '0',
    source: 'onchain',
    updatedAt: Date.now()
  }
}

/**
 * 从 CoinGecko 获取代币完整详情
 * @param {string} platformId CoinGecko 平台 ID（如 'ethereum'）
 * @param {string} contractAddress 合约地址
 * @returns {Promise<object>} 返回代币详情（可能抛错）
 */
export async function fetchTokenDetailFromCoingecko(platformId, contractAddress) {
  const url = `https://api.coingecko.com/api/v3/coins/${platformId}/contract/${contractAddress}`
  const res = await fetch(url)
  const data = await res.json()

  if (data.error) throw new Error(data.error)

  return {
    name: data.name,
    symbol: data.symbol,
    decimals: data.detail_platforms?.[platformId]?.decimals || 18,
    logo: data.image.large,
    price: data.market_data.current_price.usd,
    change24h: data.market_data.price_change_percentage_24h,
    marketCap: data.market_data.market_cap.usd,
    volume: data.market_data.total_volume.usd,
    circulatingSupply: data.market_data.circulating_supply,
    ath: data.market_data.ath.usd,
    atl: data.market_data.atl.usd,
    source: 'coingecko',
    updatedAt: Date.now()
  }
}