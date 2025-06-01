import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hrArr:[
      {
        "name": "Ethereum",
        "chainId": 1,
        "symbol": "ETH",
        "rpcUrls": ["https://rpc.ankr.com/eth"],
        "explorer": "https://etherscan.io",
        "decimals": 18
      },
      {
        "name": "BSC",
        "chainId": 56,
        "symbol": "BNB",
        "rpcUrls": ["https://bsc-dataseed.binance.org"],
        "explorer": "https://bscscan.com",
        "decimals": 18
      },
      {
        "name": "Polygon",
        "chainId": 137,
        "symbol": "MATIC",
        "rpcUrls": ["https://polygon-rpc.com"],
        "explorer": "https://polygonscan.com",
        "decimals": 18
      },
      {
        "name": "zkSync Era",
        "chainId": 324,
        "symbol": "ETH",
        "rpcUrls": ["https://mainnet.era.zksync.io"],
        "explorer": "https://explorer.zksync.io",
        "decimals": 18
      },
      {
        "name": "Optimism",
        "chainId": 10,
        "symbol": "ETH",
        "rpcUrls": ["https://mainnet.optimism.io"],
        "explorer": "https://optimistic.etherscan.io",
        "decimals": 18
      },
      {
        "name": "Base",
        "chainId": 8453,
        "symbol": "ETH",
        "rpcUrls": ["https://mainnet.base.org"],
        "explorer": "https://basescan.org",
        "decimals": 18
      },
      {
        "name": "Arbitrum One",
        "chainId": 42161,
        "symbol": "ETH",
        "rpcUrls": ["https://arb1.arbitrum.io/rpc"],
        "explorer": "https://arbiscan.io",
        "decimals": 18
      },
      {
        "name": "Avalanche",
        "chainId": 43114,
        "symbol": "AVAX",
        "rpcUrls": ["https://api.avax.network/ext/bc/C/rpc"],
        "explorer": "https://snowtrace.io",
        "decimals": 18
      },
      {
        "name": "Fantom",
        "chainId": 250,
        "symbol": "FTM",
        "rpcUrls": ["https://rpc.ankr.com/fantom"],
        "explorer": "https://ftmscan.com",
        "decimals": 18
      },
      {
        "name": "Cronos",
        "chainId": 25,
        "symbol": "CRO",
        "rpcUrls": ["https://evm.cronos.org"],
        "explorer": "https://cronoscan.com",
        "decimals": 18
      }
    ]
  },
  getters: {

  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
  }
})
