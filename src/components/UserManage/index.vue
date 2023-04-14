<template>
  <div>
    <UserAdd @add="add" />
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template
          v-if="
            ['Username', 'Password', 'Usermessage'].includes(column.dataIndex)
          "
        >
          <div>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.id]">
              <a-typography-link @click="save(record.id)"
                >Save</a-typography-link
              >
              <a-typography-link @click="Delete(record.id)"
                >Delete</a-typography-link
              >
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record.id)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.id)">Edit</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { defineComponent, reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import { User } from "@/api/type";
import { GetUserList, PatchUser, DeleteUser } from "@/api/api";
import UserAdd from "./UserAdd.vue";
import { message } from "ant-design-vue";
const columns = [
  {
    title: "账号",
    dataIndex: "Username",
    width: "25%",
  },
  {
    title: "密码",
    dataIndex: "Password",
    width: "15%",
  },
  {
    title: "账号描述",
    dataIndex: "Usermessage",
    width: "40%",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
];
let data: User[] = [];
data = await GetUserList();
const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, User>> = reactive({});
const edit = (id: string) => {
  editableData[id] = cloneDeep(
    dataSource.value.filter((item) => id === item.id)[0]
  );
};
const save = async (id: string) => {
  Object.assign(
    dataSource.value.filter((item) => id === item.id)[0],
    editableData[id]
  );
  const NewData = dataSource.value.filter((item) => id === item.id);
  if(! await PatchUser(NewData[0])){
    add()
    message.error("error")
  }
  delete editableData[id];
};
const cancel = (id: string) => {
  delete editableData[id];
};
const Delete = (id: string) => {
  DeleteUser(id);
  add();
};
const add = async () => {
  dataSource.value = await GetUserList();
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
