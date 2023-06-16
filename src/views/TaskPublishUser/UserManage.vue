<template>
  <div>
    <div>
      <a-button type="primary" @click="visible = true">添加新用户</a-button>
      <a-modal
        v-model:visible="visible"
        title="创建一个新用户"
        ok-text="Create"
        cancel-text="Cancel"
        @ok="onOk"
      >
        <a-form
          ref="AddUserform"
          :model="formState"
          layout="vertical"
          name="form_in_modal"
        >
          <a-form-item
            name="username"
            label="账号"
            :rules="[{ required: true, message: '请输入账号！' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>
          <a-form-item
            name="password"
            label="密码"
            :rules="[{ required: true, message: '请输入密码！' }]"
          >
            <a-input v-model:value="formState.password" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <div>
      <a-input-search
        style="width: 30%"
        v-model:value="researchmessage"
        placeholder="请根据账号筛选"
        enter-button="Search"
        size="large"
        @search="onSearch"
      />
      <a-button
        type="primary"
        style="height: 40px; width: 85px"
        @click="OnreSet"
      >
        重置表单
      </a-button>
    </div>
  </div>
  <a-table
    rowKey="userId"
    :columns="columns"
    :data-source="dataSource"
    :row-selection="rowSelection"
    :pagination="{
      pageSize: 7,
    }"
  >
    <template #emptyText> 暂无数据 </template>
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
        <div class="action">
          <span>
            <a-button @click="UpUserData(record)">修改</a-button>
          </span>
          <span>
            <a-popconfirm
              title="请你动动你的小脑瓜想一想能不能删"
              ok-text="Yes"
              cancel-text="No"
              @confirm="UserDel(record.userId)"
            >
              <a-button type="primary" danger>删除</a-button></a-popconfirm
            >
          </span>
        </div>
      </template>
    </template>
  </a-table>
  <a-modal
    v-model:visible="Updatavisible"
    title="更新信息"
    ok-text="Updata"
    cancel-text="Cancel"
    @ok="onUpdata"
  >
    <a-form
      ref="UpdataUserform"
      :model="UpdataformState"
      layout="vertical"
      name="form_in_modal"
    >
      <a-form-item name="username" label="账号">
        <a-input v-model:value="UpdataformState.username" />
      </a-form-item>
      <a-form-item name="password" label="密码">
        <a-input v-model:value="UpdataformState.password" />
      </a-form-item>
      <a-form-item name="status" label="修改状态">
        <a-radio-group
          v-model:value="UpdataformState.status"
          :options="[
            { label: '已登录', value: 2 },
            { label: '已注销', value: 0 },
            { label: '已离线', value: 3 },
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { GetUserList, UpdataUser } from "@/api/TaskPublishapi";
import { SmileOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { AdminAddUser, AdminDelUser } from "@/api/TaskPublishapi";
import { AdminAddUserType, AdminUpdataUserType, UserListItem } from "@/api/TaskPublishType";
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
const rowSelection = {
  // 选中项发生变化时的回调;根据这个函数就可以获取用户勾选的哪一个值
  onChange: (selectedRowKeys: (string | number)[], selectedRows: []) => {
    console.log(`选中的值: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },

  // 户手动选择/取消选择某列的回调
  onSelect: (record: [], selected: boolean, selectedRows: []) => {
    console.log(
      "  户手动选择/取消选择某列的回调 ",
      record,
      selected,
      selectedRows
    );
  },

  // 用户手动选择/取消选择所有列的回调
  onSelectAll: (selected: boolean, selectedRows: [], changeRows: []) => {
    console.log(
      "  用户手动选择/取消选择所有列的回调  ",
      selected,
      selectedRows,
      changeRows
    );
  },
};
//保存原始数据
const dataSource = ref<UserListItem[]>([]);
const researchmessage = ref("");
const onSearch = async () => {
  console.log(123);
  if (researchmessage.value == "") {
    return;
  } else {
    dataSource.value = dataSource.value.filter(
      (item) => item.username == researchmessage.value
    );
  }
};
const OnreSet = async () => {
  dataSource.value = await GetUserList();
};
OnreSet()
const visible = ref(false);
const formState = reactive<AdminAddUserType>({
  username: "",
  password: "",
});
const AddUserform = ref<any>();
const onOk = () => {
  AddUserform.value
    .validateFields()
    .then(async (values:any) => {
      await AdminAddUser(values);
      OnreSet();
      visible.value = false;
      AddUserform.value.resetFields();
    })
    .catch((info:any) => {
      console.log("Validate Failed:", info);
    });
};
const UserDel = async (userId: string) => {
  const res = await AdminDelUser(userId);
  OnreSet();
};
const UpUserData = (obj:UserListItem) => {
  UpdataformState.userId = Number(obj.userId) 
  UpdataformState.username = obj.username
  UpdataformState.password = obj.password
  UpdataformState.status = obj.status
  Updatavisible.value = true;
};
const Updatavisible = ref(false);
const UpdataformState = reactive<AdminUpdataUserType>({
  username: "",
  password: "",
  status: 1,
  userId: 0,
});
const UpdataUserform = ref<any>();
const onUpdata = () => {
  UpdataUserform.value
    .validateFields()
    .then(async (values:any) => {
      const res = await UpdataUser(UpdataformState);
      OnreSet();
      Updatavisible.value = false;
      UpdataUserform.value.resetFields();
    })
    .catch((info:any) => {
      console.log("Validate Failed:", info);
    });
};
</script>

<style scoped></style>
