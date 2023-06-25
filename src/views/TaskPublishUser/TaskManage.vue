<template>
  <a-button type="primary" @click="addData">添加任务</a-button>
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
        <a-button type="primary" @click="TaskDetailModalShow = true">查看任务详情</a-button>
        <a-button type="primary">编辑任务</a-button>
        <a-button type="primary">删除任务</a-button>
      </div>
    </template>
  </MyTable>
  <MyModal
    :visibleshow="TaskDetailModalShow"
    :onOk="
      () => {
        TaskDetailModalShow = false;
      }
    "
    :onCancel="()=>{
        TaskDetailModalShow = false
    }"
  >
    <template #ModalContent>  
      <div>测试插槽</div>
    </template>
  </MyModal>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import MyTable from "@/components/MyTable/index.vue";
import MyModal from "@/components/MyModal/index.vue";
import { AdminGetTaskList } from "@/api/TaskPublishapi";
import { TaskItem } from "@/api/TaskPublishType";
const TaskListColumns = reactive([
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
    key: "sendTime",
    width:150
  },
  {
    title: "结束时间",
    key: "overTime",
    width:150
  },{
    title:'操作',
    key:'action',
    slot:true,
    width:120
  }
]);
const TableConfig = {
  loading:true,
}
const TaskListData = reactive<TaskItem[]>([]);
const initDataList = async () =>{
  const TaskList = await AdminGetTaskList()
  TaskListData.length = 0
  TaskListData.push(...TaskList)
}
initDataList()
//需要绑定成响应式的
const addData = () => {
  TaskListColumns.push({
    title: "测试列",
    key: "taskId",
    slot: true,
    width: 100
  })
};

const TaskDetailModalShow = ref(false);
</script>
<style scoped>
.TableAction{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
