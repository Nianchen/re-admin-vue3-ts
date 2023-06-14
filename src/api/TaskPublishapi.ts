import { useStore } from "vuex";
import Myhttp from "./request";

import { UserLoginForm} from './TaskPublishType'
import {message} from 'ant-design-vue'
const store = useStore()
console.log(store);

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

import {AdminAddUserType} from './TaskPublishType'
export async function AdminAddUser(AddUserInfo:AdminAddUserType){
    const res = await Myhttp.post('/admin/user',AddUserInfo)
    console.log(res);
}


export async function AdminDelUser(userId:string){
    const res = await Myhttp.delete('/admin/user/' + userId)
    return res.data
}


import { UpdataUserType } from "./TaskPublishType";
export async function UpdataUser(Userinfo:UpdataUserType){
    const res = await Myhttp.put('/admin/user',Userinfo)
    return res
}