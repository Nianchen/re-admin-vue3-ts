<template>
  <div class="top_aside">
    <div class="text">
    </div>
    <div class="user">
      <span style="margin-right: 10px">
    <a-badge >
      <a-avatar shape="square">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-badge>
  </span>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>
      显示更多
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
        <router-link to="/UserMessage">个人信息</router-link>
        </a-menu-item>
        <a-menu-divider />
      </a-menu>
    </template>
  </a-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserOutlined ,DownOutlined } from "@ant-design/icons-vue";
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
