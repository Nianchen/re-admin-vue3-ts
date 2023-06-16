import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
const router = useRouter()
console.log("🚀 ~ file: request.ts:10 ~ router:", router)

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
    (error) => {
        localStorage.clear()
        return Promise.reject(error);
    }
);
request.interceptors.response.use(
    res => {
        const { status, data } = res
        if (status == 200)
            return data
    },(err:AxiosError)=>{
        if(err.response){
            console.log('Error message',err.response);
        }else if(err.request){
            //请求已发送 未响应
            console.error('No response received:', err.request);
        }else{
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