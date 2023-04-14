import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from '../views/login/index.vue'
import UserManage from '../components/UserManage/index.vue' 
import User from '../components/User/index.vue' 
import Myinde from '../layout/index.vue' 
import TaskList from'../components/TaskList/index.vue'
import Dashboard from'../components/Dashboard/index.vue'

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
        path: '/Message',
        component: UserManage
      },
      {
        path: '/User',
        component: User
      },
      {
        path: '/Tisk',
        component: TaskList,
        children:[
       
        ]
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
