import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from '../views/login/index.vue'
import TaskPublish from '@/views/TaskPublishUser/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/Login',
  },
  {
    path: "/Login",
    name:"Login",
    component: Login,
  },
  {
    path: "/index",
    component: TaskPublish,
    children: [
      {
        path: "/UserManage",
        component: () => import('@/views/TaskPublishUser/UserManage.vue')
      },
      {
        path: "/TaskManage",
        component: () => import('@/views/TaskPublishUser/TaskManage.vue')
      },
      {
        path:"/CommentManage",
        component:() => import("@/views/TaskPublishUser/CommentManage.vue")
      }
    ]
  },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  /* eslint-disable */
  localStorage.setItem("User_info",'123')
  if (localStorage.getItem('User_info')) {
    //先做静态权限管理
    next()
  } else {
    console.log(to.path);
    if (to.path == '/Login') {
      next()
    } else {
      next('/Login')
    }

  }
})

export default router;
