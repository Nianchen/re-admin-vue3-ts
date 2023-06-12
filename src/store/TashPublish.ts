import { createStore } from "vuex";
export default createStore({
  state: {
    Userinfo:{
      UserState:"",
      id:""
    }
  },
  getters: {
    GetUserState:state=>{
      return state.Userinfo.UserState
    }
  },
  mutations: {
    SetUserinfo(state,Userinfo){
      state.Userinfo = Userinfo
    }
  },
  actions: {},
  modules: {},
});
