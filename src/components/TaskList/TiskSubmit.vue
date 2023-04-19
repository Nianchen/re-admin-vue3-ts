<template>
  <div>
      <a-descriptions :title="TiskDetail.Tisk_title"  bordered>
        <a-descriptions-item label="创建者" >admin管理员1</a-descriptions-item>
      </a-descriptions>
      <a-descriptions  bordered>
        <a-descriptions-item label="任务内容" >{{ TiskDetail.Tisk_Details }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions  bordered>
        <a-descriptions-item label="开始时间" >{{ TiskDetail.Start_Time }}</a-descriptions-item>
      </a-descriptions>
      <div style="height:400px;position: relative;">
        <v-md-editor v-model="mdtxt" height="100%" @blur="save"></v-md-editor>
        <a-button style="margin-top:20px ;" type="primary" @click="Submit(TiskDetail.id)">提交任务</a-button>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { GetTiskDetail,SaveSubmit,SubmitTisk} from "@/api/api";
import { ref } from "vue";
import { useRoute,useRouter } from "vue-router";
const route = useRoute();
const router = useRouter()
const { Tiskid } = route.query;
const TiskDetail = (await GetTiskDetail(Tiskid as string))[0]
const mdtxt = ref(TiskDetail.Submit_content)
const save = ()=>{
  SaveSubmit(Tiskid as string,mdtxt.value)
}
const Submit = async (Tiskid:string)=>{
  await SubmitTisk(Tiskid)
  router.push("/Tisk")
}
</script>
<style scoped></style>
