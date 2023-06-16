<template>
  <a-button type="primary">添加新用户</a-button>
  <MyTable :columns="TaskListColumns" :data="TaskListData">
    <template #taskId="{ row }">
      <a>
        {{ row.taskId }}
      </a>
    </template>
    <template #receiveUserid="{row}">
        <span v-if="row.receiveUserid">
            {{ row.receiveUserid }}
        </span>
        <span v-else>
          暂无人接受任务
        </span>
    </template>
    <template #action>
      <div class="TableAction">
        <!-- 这里的row对应每一条数据 -->
        <a-button type="primary">查看任务详情</a-button>
        <a-button type="primary">编辑任务</a-button>
        <a-button type="primary">删除任务</a-button>
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
    :onCancel="()=>{
        ModalShow = false
    }"
  >
    <template #ModalContent>  
      <div>测试插槽</div>
    </template>
  </MyModal>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import MyTable from "./components/MyTable/index.vue";
import MyModal from "./components/MyModal/index.vue";
type TaskItem = {
  taskId:number
  taskName:string
  taskMessage:string
  sendUserId:number
  sendTime:string
  overTime:string
  status:number
  receiveUserId?:number
}
const TaskListColumns = [
  {
    title: "任务ID",
    key: "taskId",
    slot: true,
    width: 100
  },
  {
    title: "任务名",
    key: "taskName",
    width:300
  },
  {
    title: "任务接受者",
    key: "receiveUserid",
    slot: true,
    width:300
  },
  {
    title: "开始时间",
    key: "taskName",
    width:150
  },
  {
    title: "结束时间",
    key: "taskName",
    width:150
  },{
    title:'操作',
    key:'action',
    slot:true,
    width:120
  }
];

const TaskListData = reactive<TaskItem[]>([
  {
    taskId:1,
    taskMessage:'1111',
    taskName:"测试任务",
    sendUserId:1,
    sendTime:'2023-06-12',
    overTime:'2023-1-1',
    status:1
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
</script>
<style scoped>
.TableAction{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
