<template>
  <a-table :columns="columns" :data-source="data" :pagination="true"  >
    <!-- 一般表头不需要什么变化 -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.slot">
        <slot :name="column.key" :row="record"></slot>
      </template>

      <template v-else>
        <span>
          {{ record[column["key"]] }}
        </span>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore()
// const loading = store.state.Loading
const props = defineProps({
  columns: Array,
  data: Array,
  config:{
      type:Object,
  }
});
</script>
<style scoped></style>
