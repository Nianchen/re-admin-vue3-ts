import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import store from '../store'
console.log("🚀 ~ file: request.ts:5 ~ store:", store)
const request: AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 6000
})
const condition = false
//使用token流程
request.interceptors.request.use(
    config => {
        store.commit('SetAllLoading',true)
        if (condition) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
        //然后处理token逻辑
        if (localStorage.getItem("Usertoken")) {
            config.headers['token'] = localStorage.getItem('Usertoken');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
request.interceptors.response.use(
    res => {
        store.commit('SetAllLoading',false)
        const { status, data } = res
        if (status == 200)
            return data
    }, (err: AxiosError) => {
        if (err.response) {
            console.log('ERR.response', err.response);
        } else if (err.request) {
            //请求已发送 未响应
            console.error('ERR.request', err.request);
        } else {
            // 发送请求时发生错误
            console.error('Request error:', err.message);
            // 执行适当的错误处理逻辑
        }
        return Promise.reject(err.response);
    }

)


const Myhttp = {
    get<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
        return request.get(url, config)
    },
    post<T = any> (url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        return request.post(url, data, config)
    },
    delete<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
        return request.delete(url, config)
    },
    patch<T = any> (url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        return request.patch(url, data, config)
    },
    put<T = any> (url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        return request.put(url, data, config)
    }
}
export default Myhttp