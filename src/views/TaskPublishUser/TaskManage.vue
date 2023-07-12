<template>
  <a-button type="primary" @click="addDataShow">添加任务</a-button>
  <MyTable :columns="TaskListColumns" :data="TaskListData">
    <template #taskId="{ row }">
      <a>
        {{ row.taskId }}
      </a>
    </template>
    <template #receiveUserid="{ row }">
      <span v-if="row.receiveUserid">
        {{ row.receiveUserid }}
      </span>
      <span v-else> 暂无人接受任务 </span>
    </template>
    <template #action>
      <div class="TableAction">
        <!-- 这里的row对应每一条数据 -->
        <a-button type="primary" @click="TaskDetailModalShow = true"
          >查看任务详情</a-button
        >
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
    :onCancel="
      () => {
        TaskDetailModalShow = false;
      }
    "
  >
    <template #ModalContent>
      <div>任务详情</div>
    </template>
  </MyModal>

  <MyModal
    :visibleshow="TaskAddFormModalShow"
    :onOk="
      () => {
        TaskAddFormModalShow = false;
      }
    "
    :onCancel="
      () => {
        TaskAddFormModalShow = false;
      }
    "
  >
    <template #ModalContent>
      <div>添加任务</div>
      <div>
        <a-form ref="form" :model="AddformDate">
            <a-form-item  label="任务名" name="taskName">   <a-input v-model:value="AddformDate.taskName"  /></a-form-item>
            <a-form-item  label="任务描述" name="taskMessage">   <a-input v-model:value="AddformDate.taskMessage" /></a-form-item>
            <a-form-item  label="任务结束时间" name="overTime"> <DatePicker v-model:value="AddformDate.overTime"></DatePicker></a-form-item>
        </a-form>
      </div>
    </template>
  </MyModal>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import MyTable from "@/components/MyTable/index.vue";
import MyModal from "@/components/MyModal/index.vue";
import { AdminGetTaskList, AdminAddNewTask } from "@/api/TaskPublishapi";
import { TaskItem } from "@/api/TaskPublishType";
import { Addform } from "@/api/type";
import {
    DatePicker,
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const TaskListColumns = reactive([
  {
    title: "任务ID",
    key: "taskId",
    slot: true,
    width: 100,
  },
  {
    title: "任务名",
    key: "taskName",
    width: 300,
  },
  {
    title: "任务接受者",
    key: "receiveUserid",
    slot: true,
    width: 300,
  },
  {
    title: "开始时间",
    key: "sendTime",
    width: 150,
  },
  {
    title: "结束时间",
    key: "overTime",
    width: 150,
  },
  {
    title: "操作",
    key: "action",
    slot: true,
    width: 120,
  },
]);

const AddformDate = reactive<Addform>({
  taskName: "",
  taskMessage: "",
  overTime: "",
});
const TableConfig = {
  loading: true,
};
const TaskDetailModalShow = ref(false);
const TaskAddFormModalShow = ref(false);
const TaskListData = reactive<TaskItem[]>([]);
const initDataList = async () => {
  const TaskList = await AdminGetTaskList();
  TaskListData.length = 0;
  TaskListData.push(...TaskList);
};
initDataList();
const addDataShow = () => {
  TaskAddFormModalShow.value = true;
};
</script>
<style scoped>
.TableAction {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
