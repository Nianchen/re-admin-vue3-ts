<template>
  <MyTable :columns="TaskListColumns" :data="TaskListData">
    <template #action="{row}">
        <div>
          <!-- 这里的row对应每一条数据 -->
          {{ row }}
          <button>123</button>
        </div>
    </template>
  </MyTable>
</template>
<script setup lang="ts">
import MyTable from "./components/MyTable/index.vue";

const TaskListColumns = [
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "年龄",
    key: "age",
  },  {
    title: '操作',
    key: 'action',
    isslot:'true'
  },
];

const TaskListData = [
  {
    name:"123",
    age:18
  }
]
</script>
<style scoped></style>
