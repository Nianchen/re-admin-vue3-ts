import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from '../views/login/index.vue'
import TaskPublish from '@/views/TaskPublishUser/index.vue'
import store from "@/store/TashPublish";
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    // redirect重定向
    redirect: '/Login',
  },
  {
    path: "/Login",
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
      }
    ]
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('User_info')) {
    store.commit("SetUserinfo", JSON.parse(localStorage.getItem('User_info')!))
    //先做静态权限管理
    next()
  } else {
    if (to.path == '/Login') {
      next()
    } else {
      next('/Login')
    }

  }
})

export default router;
