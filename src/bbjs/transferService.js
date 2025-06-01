import { ethers } from 'ethers'

/**
 * 获取当前地址 nonce（用于防止重复交易）
 */
export async function getNonce(rpcUrl, address) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  return await provider.getTransactionCount(address, 'latest')
}

/**
 * 获取当前 gas 价格（返回 BigNumber）
 */
export async function getGasPrice(rpcUrl) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  return await provider.getGasPrice()
}

/**
 * 查询交易状态
 * @param {string} rpcUrl
 * @param {string} txHash
 */
export async function getTransactionReceipt(rpcUrl, txHash) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  return await provider.getTransactionReceipt(txHash) // 包含 status, blockNumber 等
}

/**
 * 发起主币转账（ETH/BNB/MATIC 等）
 */
export async function sendNativeToken({
  rpcUrl,
  privateKey,
  to,
  amount, // 单位 ETH
  gasPrice = null,
  nonce = null
}) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const wallet = new ethers.Wallet(privateKey, provider)

  const txParams = {
    to,
    value: ethers.utils.parseEther(amount.toString())
  }

  if (gasPrice) txParams.gasPrice = ethers.BigNumber.from(gasPrice)
  if (nonce !== null) txParams.nonce = nonce

  const tx = await wallet.sendTransaction(txParams)
  return tx.hash
}

/**
 * 发起 ERC20 代币转账（合约调用）
 */
export async function sendERC20Token({
  rpcUrl,
  privateKey,
  to,
  contractAddress,
  amount,      // 人类单位
  decimals = 18,
  gasPrice = null,
  gasLimit = 100_000,
  nonce = null
}) {
  const abi = ['function transfer(address to, uint256 value) returns (bool)']
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const wallet = new ethers.Wallet(privateKey, provider)
  const contract = new ethers.Contract(contractAddress, abi, wallet)

  const value = ethers.utils.parseUnits(amount.toString(), decimals)

  const overrides = {
    gasLimit
  }
  if (gasPrice) overrides.gasPrice = ethers.BigNumber.from(gasPrice)
  if (nonce !== null) overrides.nonce = nonce

  const tx = await contract.transfer(to, value, overrides)
  return tx.hash
}


//使用方法
const nonce = await getNonce(rpcUrl, walletAddress)
const gas = await getGasPrice(rpcUrl)

// 主币
const txHash1 = await sendNativeToken({
  rpcUrl,
  privateKey,
  to: '0xabc...',
  amount: '0.01',
  gasPrice: gas.toString(),
  nonce
})

// 代币
const txHash2 = await sendERC20Token({
  rpcUrl,
  privateKey,
  to: '0xabc...',
  contractAddress: '0xTokenAddress...',
  amount: '100',
  decimals: 6,
  gasPrice: gas.toString(),
  nonce: nonce + 1
})

// 等待交易确认
const receipt = await getTransactionReceipt(rpcUrl, txHash2)
console.log(receipt.status === 1 ? '✅ 成功' : '❌ 失败')
