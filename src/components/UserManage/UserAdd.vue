<template>
  <div>
    <a-button type="primary" @click="visible = true">增添新用户</a-button>
    <a-modal
      v-model:visible="visible"
      title="增添新用户"
      ok-text="确定"
      cancel-text="取消"
      @ok="onOk"
    >
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
      >
        <a-form-item
          name="Username"
          label="Username"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input v-model:value="formState.Username" />
        </a-form-item>
        <a-form-item
          name="Password"
          label="Password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input v-model:value="formState.Password" />
        </a-form-item>
        <a-form-item name="Usermessage" label="用户描述">
          <a-textarea v-model:value="formState.Usermessage" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { AddUser,  } from "@/api/api";
import { message } from 'ant-design-vue';
const emit = defineEmits(["add"])
interface AddUsertype {
  Username: string;
  Password: string;
  Usermessage: string;
}
const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<AddUsertype>({
  Username: "",
  Password: "",
  Usermessage: "",
});

const onOk = () => {
  formRef.value
    .validateFields()
    .then(async () => {
    let flag = await AddUser(formState)
    if(flag){
        visible.value = false;
        formRef.value.resetFields();
        emit('add')
        message.success("添加成功")
    }else{
      message.error("添加失败,用户名已存在")
    }
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
    });
};
</script>
<style scoped></style>
