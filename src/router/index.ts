import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from '../views/login/index.vue'
import UserManage from '../components/UserManage/index.vue' 
import User from '../components/User/index.vue' 
import Myinde from '../layout/index.vue' 
import store from "@/store";
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    // redirect重定向
    redirect: '/Login',
  },
  {
    path:"/:pathMatch(.*)",
    redirect:"/Login"
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/index",
    component: Myinde,
    children: [
      {
        path: '/UserManage',
        component: UserManage
      },
      {
        path: '/User',
        component: User
      },
      {
        path: '/Tisk',
        component: ()=> import('../components/TaskList/index.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach( ( to, from, next ) =>
{
  if ( localStorage.getItem( 'User_info' ) )
  {
    store.commit("SetUserinfo",JSON.parse(localStorage.getItem( 'User_info' )!))
    //先做静态权限管理
    if ( to.path == '/Login' )
    {
      next( '/User' );
    } else
    {
      next();
    }
  } 
  else
  {
    if ( to.path == '/Login' )
    {
      next();
    } else
    {
      next( '/Login' );
    }
  }
})
export default router;
