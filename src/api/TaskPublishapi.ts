import { useStore } from "vuex";
import Myhttp from "./request";

import {UserLoginForm} from './TaskPublishType'
import {message} from 'ant-design-vue'
const store = useStore()

export async function Login(data:UserLoginForm) {
    const res =  await Myhttp.post('/login',data)
    if(res.data){
        console.log('succcccccsssesss');
        console.log(res.data);
        
        return true
    }else{
        message.error(res.msg)
        return false
    }
}

export async function LoginOut(){
    const res = await Myhttp.get('/logout')
    if(res.data){
        localStorage.clear()
        return true
    }else{
        message.error(res.msg)
        return false
    }
}

export async function GetUserList(){
    const res = await Myhttp.get('/admin/userList')
    return res.data
}

export async function GetUserByUsername(Username:string){
    const res = await Myhttp.post('/admin/userList',{
        username:Username
    })
    return res
}
