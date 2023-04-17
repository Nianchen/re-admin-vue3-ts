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
  Tisk_Details:string;
  Tisk_type:string;
  Start_Time:string;
  id?:string;
}