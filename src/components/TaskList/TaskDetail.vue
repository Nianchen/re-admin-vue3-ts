<template>
  <a-button type="link" @click="showDetailDrawer">详情</a-button>
  <a-button type="link" v-if="UserState === '0' && Tiskstatus === 2"
    ><router-link :to="{ name: 'TiskSubmit', query: { Tiskid: id } }"
      >修改</router-link
    ></a-button
  >
  <a-drawer
    title="任务详情页"
    placement="right"
    :width="720"
    :closable="false"
    v-model:visible="Detailvisible"
  >
    <p>{{ id }}</p>
    <!-- <p>Some contents...</p> -->
    <div v-if="Tiskstatus == 2" >
      <h1>任务报告说明</h1>
      <v-md-editor v-model="text" mode="preview" height="450px"></v-md-editor>
      <div>
        <h2>任务状态</h2>
        <a-steps  :current="TiskDetail.Process_status" status="process">
          <a-step title="任务提交" description="等待发布者审核" />
    <a-step title="任务审核" description="等待审核结束" />
    <a-step title="任务结算" description="等待任务结算" />
  </a-steps>
  <a-button type="link" v-if="UserState === '1' && Tiskstatus === 2">审核任务</a-button>
      </div>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import store from "@/store";
import { GetTiskDetail } from "@/api/api";
const props = defineProps({
  id: String,
  Tiskstatus: Number,
});
const { UserState } = store.state.Userinfo;
const TiskDetail = (await GetTiskDetail(props.id!))[0]

const text = "这里是静态任务报告";

const Detailvisible = ref(false);
const showDetailDrawer = () => {
  Detailvisible.value = true;
};
</script>
