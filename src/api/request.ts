import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
// const request: AxiosInstance = axios.create({
//     baseURL: "http://localhost:5555",
//     timeout: 8000
// })
const router = useRouter()

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
        config.headers['Authorization']= 'Bearer your-token';
        console.log(config);
        console.log("🚀 ~ file: request.ts:28 ~ config:", config)
        return config;
    },
    (error: any) => {
        localStorage.clear()
        return Promise.reject(error);
    }
);
request.interceptors.response.use(
    res => {
        const { status, data, statusText } = res
        if (status == 200)
            return data
    }, err => {
        //能在这里处理http常见错误
        let Errmessage = '';
        switch (err.response.status) {
            case 400:
                Errmessage = '请求错误(400)';
                break;
            case 401:
                Errmessage = '未授权，请重新登录(401)';
                // 这里可以做清空storage并跳转到登录页的操作
                localStorage.clear();
                break;
            case 403:
                Errmessage = '拒绝访问(403)';
                localStorage.clear();
                break;
            case 404:
                Errmessage = '请求出错(404)';
                localStorage.clear();
                break;
            case 408:
                Errmessage = '请求超时(408)';
                break;
            case 500:
                Errmessage = '服务器错误(500)';
                break;
            case 501:
                Errmessage = '服务未实现(501)';
                break;
            case 502:
                Errmessage = '网络错误(502)';
                break;
            case 503:
                Errmessage = '服务不可用(503)';
                break;
            case 504:
                Errmessage = '网络超时(504)';
                break;
            case 505:
                Errmessage = 'HTTP版本不受支持(505)';
                break;
            default:
                Errmessage = `连接出错(${err.response.status})!`;
        }
        message.error(Errmessage)
        return Promise.reject(err.response)
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