import { createStore } from "vuex";
export default createStore({
  state: {
    Loading:false
  },
  getters: {
    
  },
  mutations: {
    SetAllLoading(state,status){
      state.Loading = status
    }
  },
  actions: {},
  modules: {},
});
