<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary">
        添加用户
      </a-button>
    </div>
    <div>
      <a-input-search
      style="width: 30%;"
      v-model:value="researchmessage"
      placeholder="请根据账号筛选"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <a-button type="primary" style="height: 40px;width: 85px;" @click="OnreSet">
        重置表单
      </a-button>
    </div>
  </div>
  <a-table :columns="columns" :data-source="dataSource">
    <template #emptyText>
      no data
    </template>
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <span>
          <a-tag v-if="record.status == 2" color="green">已登录</a-tag>
          <a-tag v-else>已离线</a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { GetUserList } from "@/api/TaskPublishapi";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
const columns = [
  {
    title: "用户id",
    name: "userId",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "账号",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "密码",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "用户状态",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Action",
    key: "action",
  },
];

type User = {
  userId: string;
  username: string;
  password: string;
  status: number;
};
let data: User[] = [];
data = await GetUserList();
//保存原始数据
const dataSource = ref(data);
const researchmessage = ref('')
import {GetUserByUsername} from '@/api/TaskPublishapi'
const onSearch = async ()=>{
  console.log(123);
  if(researchmessage.value == ''){
    return
  }else{
    dataSource.value = data.filter(item=>item.username == researchmessage.value)
  }
  // const res = await GetUserByUsername(researchmessage.value)
  // console.log(res);
}
const OnreSet = async()=>{
  dataSource.value = await GetUserList()
}
</script>
