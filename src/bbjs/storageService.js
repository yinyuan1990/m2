/**
 * 本地保存 JSON
 * @param {string} key
 * @param {object} data
 */
export function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 本地读取 JSON
 * @param {string} key
 */
export function loadLocal(key) {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : null
}



/**
 * 上传数据到 Telegram 云端（明文）
 * @param {string} userId 用户标识符（Telegram ID / chat_id）
 * @param {object} data 任意 JSON
 */
export async function uploadToTelegram(userId, data) {
  const res = await fetch('https://your-backend.com/telegram/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userId, payload: data })
  })
  return await res.json()
}

/**
 * 从 Telegram 云端读取数据
 * @param {string} userId
 */
export async function downloadFromTelegram(userId) {
  const res = await fetch(`https://your-backend.com/telegram/download?user=${userId}`)
  return await res.json()
}
