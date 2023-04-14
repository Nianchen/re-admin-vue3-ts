//GET 取得数据
//POST 增加数据
//delete 删除
//put patch 更改
//PUT覆盖 patch更新

import { User,AddUser,LoginForm, Tisk} from "./type";
import Myhttp from "./request";
import { message } from "ant-design-vue";
export async function GetUserList(){
  return Myhttp.get<User[]>('/User')
}

export async function IsNewUser(Username:string) {
  return Myhttp.get('/User?Username=' + Username)
}

export async function AddUser(User:AddUser){
  const flag = await IsNewUser(User.Username)
  if(flag.length != 0){
    return false
  }else{
     return Myhttp.post('/User',User)
  }
 
}

export async function DeleteUser(Userid:string){
    return Myhttp.delete('/User/' +Userid)
}

export async function PatchUser(User:User){
  const flag = await IsNewUser(User.Username)
  if(flag.length != 0){
    return false
  }else{
    return Myhttp.patch('/User/' + User.id,User)
  }
}

export async function Login(Form:LoginForm){
  const result =  await IsNewUser(Form.Username)
  if(result.length !== 0){
    if(result[0].Password == Form.Password){
      localStorage.setItem("User_info",JSON.stringify(result[0]))
      message.success("登录成功")
      return true
    }else{
      message.error("密码错误")
      return false
    }
  }else{
    message.error("账号不存在")
    return false
  }
}

export async function GetPubTiskList(){
  return Myhttp.get("/Tisk?Tisk_status=0")
}

export async function DeleteTisk(Tiskid:string){
  return Myhttp.delete("/Tisk/" + Tiskid)
}

export async function AddTisk(Tisk:Tisk){
  return Myhttp.post('/Tisk',Tisk)
}