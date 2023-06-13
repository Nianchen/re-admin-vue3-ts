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
  <a-table rowKey="userId" :columns="columns" :data-source="dataSource"
  :row-selection="rowSelection"
  
  >
    <template #emptyText> no data </template>
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
        <a-modal
        v-model:visible="Updatavisible"
        title="创建一个新用户"
        ok-text="Create"
        cancel-text="Cancel"
        @ok="onUpdata"
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
</template>
<script lang="ts" setup>
import { GetUserList ,UpdataAddUser} from "@/api/TaskPublishapi";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
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
const researchmessage = ref("");
import { GetUserByUsername, AdminAddUser,AdminDelUser } from "@/api/TaskPublishapi";
import { AdminAddUserType } from "@/api/TaskPublishType";
import type { FormInstance } from "ant-design-vue";
const onSearch = async () => {
  console.log(123);
  if (researchmessage.value == "") {
    return;
  } else {
    dataSource.value = data.filter(
      (item) => item.username == researchmessage.value
    );
  }
  // const res = await GetUserByUsername(researchmessage.value)
  // console.log(res);
};
const OnreSet = async () => {
  dataSource.value = await GetUserList();
};

const visible = ref(false);
const formState = reactive<AdminAddUserType>({
  username: "",
  password: "",
});
const AddUserform = ref<FormInstance>();
const onOk = () => {
  AddUserform.value
    .validateFields()
    .then(async (values) => {
      const res = await AdminAddUser(values);
      OnreSet()
      visible.value = false;
      AddUserform.value.resetFields();
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
    });
};

const rowSelection = {
    // 选中项发生变化时的回调;根据这个函数就可以获取用户勾选的哪一个值
    onChange: (selectedRowKeys: (string | number)[], selectedRows: []) => {
        console.log(
            `选中的值: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },

    // 户手动选择/取消选择某列的回调
    onSelect: (record: [], selected: boolean, selectedRows: []) => {
        console.log(
            '  户手动选择/取消选择某列的回调 ',
            record,
            selected,
            selectedRows
        )
    },

    // 用户手动选择/取消选择所有列的回调
    onSelectAll: (selected: boolean, selectedRows: [], changeRows: []) => {
        console.log(
            '  用户手动选择/取消选择所有列的回调  ',
            selected,
            selectedRows,
            changeRows
        )
    },
}
const UserDel = async (userId:string) => {
  console.log("就i是删" + userId);
  const res = await AdminDelUser(userId)
  OnreSet()
};

const UpUserData = (obj)=>{
  console.log(obj);
}


const Updatavisible = ref(false);
const UpdataformState = reactive<AdminAddUserType>({
  username: "",
  password: "",
});
const UpdataUserform = ref<FormInstance>();
const onUpdata = () => {
  UpdataformState.value
    .validateFields()
    .then(async (values) => {
      const res = await UpdataAddUser(values);
      OnreSet()
      visible.value = false;
      UpdataformState.value.resetFields();
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
    });
};
</script>

<style scoped>

</style>
