// export const chainDefaultAssetMap = {
//   1: { symbol: 'ETH', name: 'Ethereum', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', coinGeckoCoinId: 'ethereum' },
//   56: { symbol: 'BNB', name: 'BNB', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png', coinGeckoCoinId: 'binancecoin' },
//   137: { symbol: 'MATIC', name: 'Polygon', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png', coinGeckoCoinId: 'matic-network' },
//   10: { symbol: 'ETH', name: 'Optimism', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/25244/large/Optimism.png', coinGeckoCoinId: 'ethereum' },
//   42161: { symbol: 'ETH', name: 'Arbitrum', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg', coinGeckoCoinId: 'ethereum' },
//   8453: { symbol: 'ETH', name: 'Base', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/30980/large/base-logo-icon.png', coinGeckoCoinId: 'ethereum' },
//   324: { symbol: 'ETH', name: 'zkSync', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/40061/large/zksync.jpg', coinGeckoCoinId: 'ethereum' },
//   43114: { symbol: 'AVAX', name: 'Avalanche', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite.png', coinGeckoCoinId: 'avalanche-2' },
//   250: { symbol: 'FTM', name: 'Fantom', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/4001/large/Fantom.png', coinGeckoCoinId: 'fantom' },
//   25: { symbol: 'CRO', name: 'Cronos', decimals: 18, logoURI: 'https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png', coinGeckoCoinId: 'crypto-com-chain' }
// }

// //主币信息

export const chainDefaultAssetMap = {
  1: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    coinGeckoCoinId: 'ethereum',
    coinGeckoPlatformId: 'ethereum'
  },
  56: {
    symbol: 'BNB',
    name: 'BNB Chain',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
    coinGeckoCoinId: 'binancecoin',
    coinGeckoPlatformId: 'binance-smart-chain'
  },
  137: {
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    coinGeckoCoinId: 'matic-network',
    coinGeckoPlatformId: 'polygon-pos'
  },
  10: {
    symbol: 'ETH',
    name: 'Optimism',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/25244/large/Optimism.png',
    coinGeckoCoinId: 'optimism',
    coinGeckoPlatformId: 'optimistic-ethereum'
  },
  42161: {
    symbol: 'ETH',
    name: 'Arbitrum',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg',
    coinGeckoCoinId: 'arbitrum',
    coinGeckoPlatformId: 'arbitrum-one'
  },
  8453: {
    symbol: 'ETH',
    name: 'Base',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/30980/large/base-logo-icon.png',
    coinGeckoCoinId: 'base',
    coinGeckoPlatformId: 'base'
  },
  324: {
    symbol: 'ETH',
    name: 'zkSync',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/39738/large/zksync.jpg',
    coinGeckoCoinId: 'zksync',
    coinGeckoPlatformId: 'zksync'
  },
  43114: {
    symbol: 'AVAX',
    name: 'Avalanche',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhiteGreen.png',
    coinGeckoCoinId: 'avalanche-2',
    coinGeckoPlatformId: 'avalanche'
  },
  250: {
    symbol: 'FTM',
    name: 'Fantom',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/4001/large/Fantom.png',
    coinGeckoCoinId: 'fantom',
    coinGeckoPlatformId: 'fantom'
  },
  2222: {
    symbol: 'KAS',
    name: 'Kava EVM',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/9761/large/kava.png',
    coinGeckoCoinId: 'kava',
    coinGeckoPlatformId: 'kava'
  }
}


export function getTrustWalletChainLogo(chainId) {
  const folderMap = {
    1: 'ethereum',
    56: 'smartchain',
    137: 'polygon',
    10: 'optimism',
    42161: 'arbitrum',
    8453: 'base',
    324: 'zksync',
    43114: 'avalanche',
    250: 'fantom',
    2222: 'kava'
  }

  const folder = folderMap[chainId]
  return folder
    ? `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${folder}/info/logo.png`
    : 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png' // fallback
}

export const chainDefaultTokenMap = { //代币信息
  1: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    coinGeckoCoinId: 'tether',
    coinGeckoPlatformId: 'ethereum'
  },
  56: {
    symbol: 'CAKE',
    name: 'PancakeSwap',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/12632/large/IMG_0440.PNG',
    contractAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    coinGeckoCoinId: 'pancakeswap-token',
    coinGeckoPlatformId: 'binance-smart-chain'
  },
  137: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    contractAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    coinGeckoCoinId: 'usd-coin',
    coinGeckoPlatformId: 'polygon-pos'
  },
  10: {
    symbol: 'VELO',
    name: 'Velodrome',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/26526/large/velo.png',
    contractAddress: '0x3c8BEe45AacaD738c43aC43aBddBcC949c3625Be',
    coinGeckoCoinId: 'velodrome-finance',
    coinGeckoPlatformId: 'optimistic-ethereum'
  },
  42161: {
    symbol: 'RDNT',
    name: 'Radiant Capital',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/28135/large/rdnt.png',
    contractAddress: '0x0C4681e6C0235179ec3D4F4fc4DF3d14FDD96017',
    coinGeckoCoinId: 'radiant-capital',
    coinGeckoPlatformId: 'arbitrum-one'
  },
  8453: {
    symbol: 'AERO',
    name: 'Aerodrome Finance',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/31212/large/aero.png',
    contractAddress: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    coinGeckoCoinId: 'aerodrome-finance',
    coinGeckoPlatformId: 'base'
  },
  324: {
    symbol: 'MUTE',
    name: 'Mute.io',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/23597/large/token.png',
    contractAddress: '0x0e97E36A17a8c46F7f9fc5f62F7196b58b4eDa09',
    coinGeckoCoinId: 'mute',
    coinGeckoPlatformId: 'zksync'
  },
  43114: {
    symbol: 'JOE',
    name: 'Trader Joe',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/17569/large/traderjoe.png',
    contractAddress: '0x6e84A6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
    coinGeckoCoinId: 'joe',
    coinGeckoPlatformId: 'avalanche'
  },
  250: {
    symbol: 'BOO',
    name: 'SpookySwap',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/15229/large/logo_200x200.png',
    contractAddress: '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE',
    coinGeckoCoinId: 'spookyswap',
    coinGeckoPlatformId: 'fantom'
  },
  2222: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    contractAddress: '0x765277Eebeca2e31912C9946eAe1021199B39C61',
    coinGeckoCoinId: 'usd-coin',
    coinGeckoPlatformId: 'kava'
  }
}

// 网络信息
export const chainArr = [
  {
    "name": "Ethereum",
    "chainId": "1",
    "symbol": "ETH",
    "rpcUrls": ["https://ethereum.blockpi.network/v1/rpc/public"],
    "explorer": "https://etherscan.io",
    "decimals": 18
  },
  {
    "name": "BSC",
    "chainId": "56",
    "symbol": "BNB",
    "rpcUrls": ["https://bsc-dataseed.binance.org"],
    "explorer": "https://bscscan.com",
    "decimals": 18
  },
  {
    "name": "Polygon",
    "chainId": "137",
    "symbol": "MATIC",
    "rpcUrls": ["https://polygon-rpc.com"],
    "explorer": "https://polygonscan.com",
    "decimals": 18
  },
  {
    "name": "zkSync Era",
    "chainId": "324",
    "symbol": "ETH",
    "rpcUrls": ["https://mainnet.era.zksync.io"],
    "explorer": "https://explorer.zksync.io",
    "decimals": 18
  },
  {
    "name": "Optimism",
    "chainId": "10",
    "symbol": "ETH",
    "rpcUrls": ["https://mainnet.optimism.io"],
    "explorer": "https://optimistic.etherscan.io",
    "decimals": 18
  },
  {
    "name": "Base",
    "chainId": "8453",
    "symbol": "ETH",
    "rpcUrls": ["https://mainnet.base.org"],
    "explorer": "https://basescan.org",
    "decimals": 18
  },
  {
    "name": "Arbitrum One",
    "chainId": "42161",
    "symbol": "ETH",
    "rpcUrls": ["https://arb1.arbitrum.io/rpc"],
    "explorer": "https://arbiscan.io",
    "decimals": 18
  },
  {
    "name": "Avalanche",
    "chainId": "43114",
    "symbol": "AVAX",
    "rpcUrls": ["https://api.avax.network/ext/bc/C/rpc"],
    "explorer": "https://snowtrace.io",
    "decimals": 18
  },
  {
    "name": "Fantom",
    "chainId": "250",
    "symbol": "FTM",
    "rpcUrls": ["https://rpc.ankr.com/fantom"],
    "explorer": "https://ftmscan.com",
    "decimals": 18
  },
  {
    "name": "Cronos",
    "chainId": "25",
    "symbol": "CRO",
    "rpcUrls": ["https://evm.cronos.org"],
    "explorer": "https://cronoscan.com",
    "decimals": 18
  }
]
