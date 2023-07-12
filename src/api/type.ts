export interface User {
    Username:string,
    Password:string,
    id:string,
    Usermessage:string,
    UserState:string
  }


export interface AddUser {
  Username: string;
  Password: string;
  Usermessage:string;
}

export interface LoginForm{
  Username:string;
  Password:string
}

export interface Tisk{
  Tisk_title:string;
  Tisk_status:number;
  Process_status:number;
  Tisk_Details:string;
  Tisk_type:string;
  Start_Time:string;
  End_Time:string;
  Submit_content:string;
  Accept_User:string;
  id?:string;
}

export interface Addform {
  taskName:string;
  taskMessage:string;
  overTime:string;
}

