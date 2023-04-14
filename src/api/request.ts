import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

const request: AxiosInstance = axios.create({
    baseURL: "http://localhost:5555",
    timeout: 5000
})

request.interceptors.response.use(
    res => {
        return res.data
    }
)

const Myhttp = {
    get<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
        return request.get(url, config)
    },
    post<T = any> (url: string,data:any, config?: AxiosRequestConfig): Promise<T> {
        return request.post(url,data,config)
    },
    delete<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
        return request.delete(url,config)
    },
    patch<T = any> (url: string,data:any, config?: AxiosRequestConfig): Promise<T> {
        return request.patch(url,data,config)
    },
}
export default Myhttp