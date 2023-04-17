## 使用Ts对之前的一个后台项目的完全重构

全程根据自己开发思路进行重构，并不是按照某些市面课程进行一昧的模仿

开发日志

4.10：基础视图框架搭建，对axios进行封装

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

4.14：用户管理面板完善,管理员对于用户基本增删改查完成

4.17：任务列表以及管理员和用户双端的静态权限实现（后期会替换成动态路由权限）以及管理员权限下任务的增添与删除，用户权限下的接取任务与放弃任务
