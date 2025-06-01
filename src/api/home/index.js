/*
 * @Autor: lh
 * @Date: 2023-01-06 14:42:22
 * @LastEditors: lh
 * @LastEditTime: 2023-01-06 14:44:16
 * @Description: 
 */
import { apiPost,apiGet } from "@/static/js/http";
//平台币测试服域名
// 平台币信息
export function v2TokensContract(params) {
  return apiGet({
    url: "/v1api/v2/tokens/contract",
    params
  })
}
export function v2TokensContractg5(params) {
    return apiGet({
      url: "/api/v1/token_security/56",
      params
    })
  }