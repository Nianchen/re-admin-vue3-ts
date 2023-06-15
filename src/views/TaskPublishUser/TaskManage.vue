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

  <MyModal
    :visibleshow="ModalShow"
    :onOk="
      () => {
        ModalShow = false;
      }
    "
  >111111111
    <template #ModalContent>
     
      <div>测试插槽</div>
    </template>
  </MyModal>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import MyTable from "./components/MyTable/index.vue";
import MyModal from "./components/MyModal/index.vue";
const TaskListColumns = [
  {
    title: "姓名",
    key: "name",
    slot: true,
  },
  {
    title: "年龄",
    key: "age",
  },
  {
    title: "操作",
    key: "action",
    slot: true,
  },
];

const TaskListData = reactive([
  {
    name: "123",
    age: 18,
    id: 1,
  },
]);
//需要绑定成响应式的
const addData = () => {
  TaskListData.push({
    name: "123",
    age: 18,
    id: 2,
  });
  ModalShow.value = true;
};

const ModalShow = ref(false);
const ModalTarget = reactive({
  title: "姓名",
  key: "name",
});
</script>
<style scoped></style>
