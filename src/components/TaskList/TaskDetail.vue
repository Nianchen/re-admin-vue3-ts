<template>
  <a-button type="link" @click="showDetailDrawer">详情</a-button>
  <a-drawer
    title="Basic Drawer"
    placement="right"
    :width="720"
    :closable="false"
    v-model:visible="Detailvisible"
   
  >
    <p>{{ id }}</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
const props = defineProps({
  id: String,
});
const Detailvisible = ref(false);
const showDetailDrawer = () => {
  Detailvisible.value = true;
};
</script>
