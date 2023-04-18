<template>
  <div>
      <a-descriptions :title="TiskDetail.Tisk_title"  bordered>
        <a-descriptions-item label="创建者" >admin管理员1</a-descriptions-item>
      </a-descriptions>
      <a-descriptions  >
        <a-descriptions-item label="任务内容" >{{ TiskDetail.Tisk_Details }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions  >
        <a-descriptions-item label="开始时间" >{{ TiskDetail.Start_Time }}</a-descriptions-item>
      </a-descriptions>
  </div>
</template>
<script lang="ts" setup>
import { GetTiskDetail } from "@/api/api";
import { useRoute } from "vue-router";
const route = useRoute();
const { Tiskid } = route.query;
const TiskDetail = (await GetTiskDetail(Tiskid as string))[0]
</script>
<style scoped></style>
