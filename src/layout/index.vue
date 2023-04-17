<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{
        MaxWidth: '170px',
      }"
    >
      <div class="logo">
        <img src="../assets/logo.png" style="height: 30px" />
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"

      >
        <a-menu-item key="1">
          <user-outlined />
          <span
            ><router-link to="/User" style="color: white"
              >个人中心</router-link
            ></span
          >
        </a-menu-item>
        <a-menu-item key="2" v-if="UserState === '1'">
          <UsergroupAddOutlined />
          <span
            ><router-link to="/UserManage" style="color: white"
              >用户管理</router-link
            ></span
          >
        </a-menu-item>
        <a-menu-item key="3">
          <CalendarOutlined />
          <span
            ><router-link to="/Tisk" style="color: white"
              >任务列表</router-link
            ></span
          >
        </a-menu-item>
        <!-- <a-menu-item key="4">
          <CommentOutlined />
          <span
            ><router-link to="/Tisk" style="color: white"
              >评论列表</router-link
            ></span
          >
        </a-menu-item>
        <a-menu-item key="5">
          <MailOutlined />
          <span
            ><router-link to="/Tisk" style="color: white"
              >消息通知</router-link
            ></span
          >
        </a-menu-item> -->
        <a-menu-item key="6" @click="() => (collapsed = !collapsed)">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
          <span>收起菜单</span>
        </a-menu-item>
        <a-menu-item key="7" @click="LoginOut">
          <ArrowLeftOutlined></ArrowLeftOutlined>
          <span>退出系统</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;height: 60px;">
        <Topaside/>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '20px 16px',
          padding: '12px',
          background: '#eef0f3',
          minHeight: '280px',
          overflow: 'scroll',
          overflowX: 'hidden',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import Topaside from '../components/Topaside'
import {
  UserOutlined,
  UsergroupAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CalendarOutlined,
  // CommentOutlined,
  // MailOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons-vue";
import {  ref,computed } from "vue";
import { useRouter } from "vue-router";
import store from '@/store'
    const collapsed = ref(false)
    const selectedKeys = ref(["0"]);
    const router = useRouter();
    console.log(store);
    const UserState = computed(()=>store.getters.GetUserState)
    console.log(UserState);
    router.push("/");
    const LoginOut = () => {
      localStorage.clear("User_info");
      router.push("/Login");
    };
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.site-layout .site-layout-background {
  background: #b5b5b52b;
}
.ant-layout-header {
  height: 45px;
}
.ant-layout{
  height: 100%;
}
</style>
