//GET 取得数据
//POST 增加数据
//delete 删除
//put patch 更改
//PUT覆盖 patch更新

import { User,AddUser,LoginForm, Tisk} from "./type";
import Myhttp from "./request";
import store from "@/store";
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
      store.commit("SetUserinfo",result[0])
      //保存全局状态
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

//获取全部任务
export async function GetTiskList(){
  return Myhttp.get("/Tisk?Tisk_status=0")
}

//获取进行中任务
export async function GetAcceptTiskList(){
  const {UserState,id} = store.state.Userinfo
  switch(UserState){
    case '1':
      return Myhttp.get('/Tisk?Tisk_status=1');
    case '0':
      {
      const UserAcceptTiskList =await  Myhttp.get('/UserOnTisk?id=' + id);
      return UserAcceptTiskList[0].UserTiskList
      }
  }
}

//获取结束任务
export async function GetEndTiskList(){
  return Myhttp.get('/Tisk?Tisk_status=2')
}

//添加任务
export async function AddTisk(Tisk:Tisk){
  return Myhttp.post('/Tisk',Tisk)
}

//删除任务
export async function DeleteTisk(Tiskid:string){
  return Myhttp.delete("/Tisk/" + Tiskid)
}

//接受任务
export async function AcceptTisk(Tiskid:string){
    //结构出来用户的id
  const {id} = store.state.Userinfo
  //通过任务id拿到任务详情进行添加  
  //并且在此修改人物的状态
  const Tiskresult =await Myhttp.get("/Tisk?id=" + Tiskid)
  Myhttp.patch("Tisk/" + Tiskid,{Tisk_status:1})
  //通过人物id添加具体人
  const UserTiskList = await Myhttp.get('UserOnTisk?id=' + id)
  UserTiskList[0].UserTiskList.push(...Tiskresult)
  const data = {
    UserTiskList:[]
  }
  data.UserTiskList = UserTiskList[0].UserTiskList
  return Myhttp.patch("UserOnTisk/" + id,data)
} 

//放弃任务
export async function GiveUpTisk(Tiskid:string){
  //
}


export async function GetRouter(UserState:string){
  return Myhttp.get("/Router?id="+UserState)
}