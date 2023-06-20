import { useStore } from "vuex";
import Myhttp from "./request";

import { UserLoginForm} from './TaskPublishType'
import {AdminAddUserType} from './TaskPublishType'
import { UpdataUserType } from "./TaskPublishType";
import {message} from 'ant-design-vue'
const store = useStore()
console.log(store);

export async function Login(data:UserLoginForm) {
    const res =  await Myhttp.post('/admin/login',data)
    if(res.data){
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
    if(res){
        return res.data
    }else{
        return []
    }
}

export async function GetUserByUsername(Username:string){
    const res = await Myhttp.post('/admin/userList',{
        username:Username
    })
    return res
}

export async function AdminAddUser(AddUserInfo:AdminAddUserType){
    const res = await Myhttp.post('/admin/user',AddUserInfo)
   return res
}


export async function AdminDelUser(userId:string){
    const res = await Myhttp.delete('/admin/user/' + userId)
    return res.data
}


export async function UpdataUser(Userinfo:UpdataUserType){
    const res = await Myhttp.put('/admin/user',Userinfo)
    return res
}

export async function AdminGetTaskList(){
    const res = await Myhttp.get('/admin/taskList')
    return res.data || []
}