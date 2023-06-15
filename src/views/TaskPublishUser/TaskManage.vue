<template>
  <MyTable :columns="TaskListColumns" :data="TaskListData">
    <template #name="{ row }">
      <a>
        {{ row.name }}
      </a>
    </template>
    <template #action="{ row }">
      <div>
        <!-- 这里的row对应每一条数据 -->
        <button @click="addData" :key="row.id">增加数据</button>
      </div>
    </template>
  </MyTable>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import MyTable from "./components/MyTable/index.vue";

const TaskListColumns = [
  {
    title: "姓名",
    key: "name",
    isslot: true,
  },
  {
    title: "年龄",
    key: "age",
  },
  {
    title: "操作",
    key: "action",
    isslot: true,
  },
];

const TaskListData = reactive([
  {
    name: "123",
    age: 18,
    id:1
  },
]);
//需要绑定成响应式的
const addData = () => {
  TaskListData.push({
    name: "123",
    age: 18,
    id:2
  });
};
</script>
<style scoped></style>
