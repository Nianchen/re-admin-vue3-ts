<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
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
const props = defineProps({
  columns: Array,
  data: Array,
});
console.log("🚀 ~ file: index.vue:11 ~ props:", props);
</script>
<style scoped></style>
