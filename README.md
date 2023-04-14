## 使用Ts对之前的一个后台项目的完全重构

开发日志

4.10：基础试图框架搭建，对axios进行封装

```tsx
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
```

4.13：登录功能完善

4.14：用户管理面板完善,基本增删改查完成
