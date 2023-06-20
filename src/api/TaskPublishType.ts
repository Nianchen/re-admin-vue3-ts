

export type UserLoginForm = {
    username:string,
    password:string,
    userType:number
}


export interface AdminAddUserType  {
    username:string,
    password:string,
}

export interface UpdataUserType extends AdminAddUserType{
    status:number
    userId:number
}


export type UserListItem = {
    userId: string;
    username: string;
    password: string;
    status: number;
}


export type AdminUpdataUserType = {
    username: string;
    password: string;
    status: number;
    userId: number;
}

export type TaskItem = {
    taskId:number
  taskName:string
  taskMessage:string
  sendUserId:number
  sendTime:string
  overTime:string
  status:number
  receiveUserId?:number
}