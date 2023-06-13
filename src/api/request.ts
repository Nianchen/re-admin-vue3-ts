import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig,InternalAxiosRequestConfig } from 'axios'
// const request: AxiosInstance = axios.create({
//     baseURL: "http://localhost:5555",
//     timeout: 8000
// })


const request: AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 6000
})
const condition = false
//使用token流程
axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 根据条件变量设置动态请求头
        if (condition) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
        //然后处理token逻辑
        config.headers['Authorization'] = 'Bearer your-token';
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
request.interceptors.response.use(
    res => {
        const {status,data,statusText} = res
        if(status == 200)
            return data
    },err =>{
        return Promise.reject(err)
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
}
export default Myhttp