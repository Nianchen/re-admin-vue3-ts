// type RequestType = 'upload' | ''

import { AdminAddUser } from "./TaskPublishapi"

type UserLoginForm = {
    username:string,
    password:string,
    userType:number
}


interface AdminAddUserType  {
    username:string,
    password:string,
}

interface UpdataUserType extends AdminAddUserType{
    status:number
    userId:number
}
export {
    UserLoginForm,
    AdminAddUserType,
    UpdataUserType
}