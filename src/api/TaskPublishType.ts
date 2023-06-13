// type RequestType = 'upload' | ''

type UserLoginForm = {
    username:string,
    password:string,
    userType:number
}


type AdminAddUserType = {
    username:string,
    password:string,
}
export {
    UserLoginForm,
    AdminAddUserType
}