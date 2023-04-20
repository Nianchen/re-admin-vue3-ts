//GET 取得数据
//POST 增加数据
//delete 删除
//put patch 更改
//PUT覆盖 patch更新

import { User, AddUser, LoginForm, Tisk } from "./type";
import Myhttp from "./request";
import store from "@/store";
import { message } from "ant-design-vue";
import {format} from '@/utils/utils'
export async function GetUserList () {
  return Myhttp.get<User[]>('/User')
}

export async function IsNewUser (Username: string) {
  return Myhttp.get('/User?Username=' + Username)
}

export async function AddUser (User: AddUser) {
  const flag = await IsNewUser(User.Username)
  if (flag.length != 0) {
    return false
  } else {
    return Myhttp.post('/User', User)
  }

}

export async function DeleteUser (Userid: string) {
  return Myhttp.delete('/User/' + Userid)
}

export async function PatchUser (User: User) {
  const flag = await IsNewUser(User.Username)
  if (flag.length != 0) {
    return false
  } else {
    return Myhttp.patch('/User/' + User.id, User)
  }
}

export async function Login (Form: LoginForm) {
  const result = await IsNewUser(Form.Username)
  if (result.length !== 0) {
    if (result[0].Password == Form.Password) {
      localStorage.setItem("User_info", JSON.stringify(result[0]))
      store.commit("SetUserinfo", result[0])
      //保存全局状态
      message.success("登录成功")
      return true
    } else {
      message.error("密码错误")
      return false
    }
  } else {
    message.error("账号不存在")
    return false
  }
}

export async function GetTiskDetail (Tiskid: string) {
  return Myhttp.get("/Tisk?id=" + Tiskid)
}

//获取全部任务
export async function GetTiskList () {
  return Myhttp.get("/Tisk?Tisk_status=0")
}

//获取进行中任务
export async function GetAcceptTiskList () {
  const { UserState, id } = store.state.Userinfo
  switch (UserState) {
    case '0':
      {
        const AllList = await Myhttp.get('/Tisk?Tisk_status=1')
        const UserOffList = (await Myhttp.get('/UserOnTisk?id=' + id))[0].UserOnTiskList
        return AllList.filter((item: any) => {
          return UserOffList.includes(item.id)
        })
      }
    case '1':
      return Myhttp.get('/Tisk?Tisk_status=1');
  }
}

//获取结束任务
export async function GetEndTiskList () {
  const { UserState, id } = store.state.Userinfo
  switch (UserState) {
    case '0':
      {
        const AllList = await Myhttp.get('/Tisk?Tisk_status=2')
        const UserOffList = (await Myhttp.get('/UserOffTisk?id=' + id))[0].UserOffTiskList
        return AllList.filter((item: any) => {
          return UserOffList.includes(item.id)
        })
      }
    case '1':
      return Myhttp.get('/Tisk?Tisk_status=2')
  }
}

//添加任务
export async function AddTisk (Tisk: Tisk) {
  return Myhttp.post('/Tisk', Tisk)
}

//删除任务
export async function DeleteTisk (Tiskid: string) {
  return Myhttp.delete("/Tisk/" + Tiskid)
}

//接受任务
export async function AcceptTisk (Tiskid: string) {
  const { id } = store.state.Userinfo
  //结构出来用户的id
  await Myhttp.patch("Tisk/" + Tiskid, { Tisk_status: 1 })
  const UserOnList = (await Myhttp.get('/UserOnTisk?id=' + id))[0].UserOnTiskList
  UserOnList.push(Tiskid)
  const data = {
    UserOnTiskList:UserOnList
  }
  return Myhttp.patch("/UserOnTisk/" + id , data)
}

//放弃任务
export async function GiveUpTisk (Tiskid: string) {
  const { id } = store.state.Userinfo
  // 结构出来用户id
  await Myhttp.patch("Tisk/" + Tiskid, { Tisk_status: 0, Submit_content: "" })
  const resultList = (await Myhttp.get('/UserOnTisk?id=' + id))[0].UserOnTiskList.filter((item: any) => item!= Tiskid)
  console.log(resultList);
  // 过滤需要删除的任务
  const data = {
    UserOnTiskList: []
  }
  data.UserOnTiskList = resultList
  return Myhttp.patch('UserOnTisk/' + id, data)
}

//暂存任务
export async function SaveSubmit (Tiskid: string, Submit_content: string) {
  const data = {
    Submit_content
  }
  return Myhttp.patch('Tisk/' + Tiskid, data)
}

//提交任务
export async function SubmitTisk (Tiskid: string) {
  const { id } = store.state.Userinfo
  const result = await Myhttp.get('/UserOffTisk/' + id)
  const EndTime = format(new Date())
  await Myhttp.patch("Tisk/" + Tiskid, { Tisk_status: 2,End_Time:EndTime})
  if(!result.UserOffTiskList.includes(Tiskid)){
    result.UserOffTiskList.push(Tiskid) 
  }
  return Myhttp.patch("UserOffTisk/" + id, result)
}

//获取消息
export async function GetMessageList(){
  const { id } = store.state.Userinfo
  const result = await Myhttp.get("/UserMessage?id=" + id)
  if(result.length == 0){
      return []
  }else{
    console.log(result);
   return result[0].Messages
  }
}