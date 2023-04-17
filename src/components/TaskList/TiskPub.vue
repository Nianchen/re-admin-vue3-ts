<template>
  <a-button type="primary" @click="showPubDrawer">
    <PlusOutlined />
    发布任务
  </a-button>
  <a-drawer
    title="发布一个新任务"
    :width="720"
    :visible="Addvisible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" ref="formRef" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="任务标题" name="Tisk_title">
            <a-input
              v-model:value="form.Tisk_title"
              placeholder="请输入任务标题"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <!-- <a-col :span="12">
              <a-form-item label="Owner" name="owner">
                <a-select
                  placeholder="Please a-s an owner"
                  v-model:value="form.owner"
                >
                  <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                  <a-select-option value="mao">Maomao Zhou</a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->
        <a-col :span="12">
          <a-form-item label="类型" name="Tisk_type">
            <a-select
              placeholder="Please choose the type"
              v-model:value="form.Tisk_type"
            >
              <a-select-option value="1">限时</a-select-option>
              <a-select-option value="0">不限时</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="14">
          <a-form-item label="开始时间" name="Start_Time">
            <!-- <a-date-picker
              v-model:value="form.Start_Time"
              style="width: 100%"
              :get-popup-container="(trigger) => trigger.parentNode"
            /> -->
             <a-date-picker
              v-model:value="form.Start_Time"
              style="width: 100%"
          
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="任务详细描述" name="Tisk_Details">
            <a-textarea
              v-model:value="form.Tisk_Details"
              :rows="4"
              placeholder="请输入任务描述"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="onSubmit">发布</a-button>
    </div>
  </a-drawer>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import {  reactive, ref, defineEmits } from "vue";
import { Tisk } from "@/api/type";
import { AddTisk } from "@/api/api";
const emits = defineEmits(["onGet"]);
const form = reactive<Tisk>({
  Tisk_title: "",
  Tisk_status: 0,
  Tisk_Details: "",
  Start_Time: "",
  Tisk_type: "",
});
const rules = {
  Tisk_title: [
    {
      required: true,
      message: "请输入任务标题",
    },
  ],
  Tisk_Details: [
    {
      required: true,
      message: "请输入任务内容",
    },
  ],
  Tisk_type: [
    {
      required: true,
      message: "请选择任务类型",
    },
  ],
  Start_Time: [
    {
      required: true,
      message: "请选择开始时间",
      type: "object",
    },
  ],
};
const formRef = ref()
const Addvisible = ref(false);
const showPubDrawer = () => {
  Addvisible.value = true;
};
const onSubmit = async () =>{
  try {
        // const values = await formRef.value.validateFields();
        await AddTisk(form)
        emits('onGet')
        Addvisible.value = false
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
  
}
const onClose = () => {
  Addvisible.value = false;
  console.log(form);
};
</script>
<style scoped></style>
