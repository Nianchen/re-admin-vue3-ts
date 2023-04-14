<template>
    <a-button type="link" @click="showDetailDrawer">详情</a-button>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :width="720"
      :closable="false"
      v-model:visible="Detailvisible"
      @after-visible-change="afterVisibleChange"
    >
      <p>{{ id }}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </template>
  <script setup lang="ts">
  import { defineComponent, ref,defineProps} from 'vue';
  const props = defineProps({
    id:String,
  })
  
      const Detailvisible = ref(false);
      const afterVisibleChange = bool => {
        console.log('visible', bool);
      };
      const showDetailDrawer = () => {
        Detailvisible.value = true;
      };
  </script>