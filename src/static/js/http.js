/*
 * @Autor: lh
 * @Date: 2022-02-25 14:32:18
 * @LastEditors: lh
 * @LastEditTime: 2023-02-04 13:31:06
 * @Description: 封装请求方法
 */
import axios from 'axios'

import store from '@/store'
import { Toast } from "vant";
import {getQueryString} from "./common"

const api = "https://api.bbave.cloud"
export const api2 = "https://api.gopluslabs.io"

// post 封装方法
export function apiPost(parameter) {
    let headers = parameter.headers || {
        'x-auth': store.getters.token || getQueryString('token'),
    };
    return new Promise(function (resolve, reject) {
        let axiosObj = {
            method: "post",
            url: api+ parameter.url,
            params: parameter.params,
            // data:parameter.params,
            headers: headers,
        }
        if(parameter.formdata) axiosObj.data = parameter.params
        axios(axiosObj).then(res => {
            resolve(res);
        }).catch(err => {
            // console.log(err.response)
            reject(err);
            try {
                if (err.response.data.error) {
                    Toast(err.response.data.error);
                }
            } catch (error) {

            }
        });
    });
}
// get封装方法
export function apiGet(parameter) {
    let headers = parameter.headers || {
        'x-auth': store.getters.token || getQueryString('token'),
    };
    return new Promise(function (resolve, reject) {
        axios.get(
            api + parameter.url,
            {
                params: parameter.params,
                headers: headers,
            }
        ).then(res => {
            resolve(res);
        }).catch(err => {
            // console.log(err.response)
            reject(err);
            try {
                if (err.response.data.error) {
                    Toast(err.response.data.error);
                }
            } catch (error) {

            }
        });
    });

}
