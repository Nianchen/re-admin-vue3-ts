import Myhttp from "./request";

import {UserLoginForm} from './TaskPublishType'

export async function Login(data:UserLoginForm) {
    return Myhttp.post('/login',data)
}
  