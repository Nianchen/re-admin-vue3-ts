import { createStore } from "vuex";
export default createStore({
  state: {
    Userinfo:{
      UserId:"",
      username:"",
      userType:1
    }
  },
  getters: {
  
  },
  mutations: {
    SetUserinfo(state,Userinfo){
      state.Userinfo = Userinfo
    }
  },
  actions: {},
  modules: {},
});
