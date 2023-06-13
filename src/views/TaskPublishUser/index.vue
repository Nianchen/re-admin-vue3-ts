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
        <img src="../../assets/logo.png" style="height: 30px" />
      </div>
      <a-menu theme="dark" mode="inline"  :inlineIndent="35" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1" class="my_menu_item">
          <UsergroupAddOutlined />
          <span
            ><router-link to="/UserManage" style="color: white"
              >用户管理</router-link
            ></span
          >

        </a-menu-item>
        <a-menu-item key="2" class="my_menu_item">
          <CalendarOutlined />
          <span
            ><router-link to="/TaskManage" style="color: white"
              >任务列表</router-link
            ></span
          >
        </a-menu-item>
        <a-menu-item key="3" class="my_menu_item" @click="() => (collapsed = !collapsed)">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
          <span>收起菜单</span>
        </a-menu-item>
        <a-menu-item key="4" class="my_menu_item" @click="LogOut">
          <ArrowLeftOutlined></ArrowLeftOutlined>
          <span>退出系统</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; height: 60px">
        <Topaside />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '20px 16px',
          padding: '12px',
          background: '#ffffff',
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
import Topaside from "../../components/Topaside/index.vue";
import {
  UsergroupAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { LoginOut } from "@/api/TaskPublishapi";
import { useRouter } from "vue-router";
const collapsed = ref(false);
const selectedKeys = ref(["1"]);
const router = useRouter()
const LogOut = async ()=>{
  const res = await LoginOut()
  if(res){
    router.push('/Login')
  }
}
</script>
<style scoped>
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

.logo {
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
.ant-layout {
  height: 100%;
}
/* >>>.my_menu_item{
  height: 80px;
} */
:deep(.my_menu_item{
  height: 75px;
})
</style>
