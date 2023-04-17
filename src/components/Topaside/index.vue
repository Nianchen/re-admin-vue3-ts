<template>
  <div class="top_aside">
    <div class="text">
        {{ store.state.Userinfo.UserState == 1 ? '管理员' : "用户"}}
    </div>
    <div class="user">
      <span style="margin-right: 10px">
    <a-badge :count="1">
      <a-avatar shape="square">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-badge>
  </span>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>
      Click me
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </a-menu-item>
        <a-menu-item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">3rd menu item</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserOutlined ,DownOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
const store = useStore()

</script>
<style scoped>
.top_aside {
  position: relative;
  height: 100%;
  width: 100%;
}
.user{
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
}
.text{
    position: relative;
    width: 90%;
    text-align: center;
    font-size: 24px;
}
</style>
