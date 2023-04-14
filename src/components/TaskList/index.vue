<template>
  <div class="tisk_content">
    <div class="Adminoperate" v-if="User_state != '0'">
      <TiskPub @onGet="get"></TiskPub>
    </div>
    <div>
      <a-tabs v-model:activeKey="TiskState">
        <a-tab-pane key="1" tab="已发布">
          <div class="tisklist">
            <a-card
              v-for="item in TiskList"
              :key="item.id"
              :title="item.Tisk_title"
              :bordered="false"
              style="width: 300px; border: 5px solid #f0f2f5; margin: 10px"
            >
              <p class="Tisk_Detail">{{ item.Tisk_Details }}如果这里很长如果这里很长如果这里很长如果这里很长如  text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;果这里很长如果这里很长如果这里很长如果这里很长</p>
              <p>开始时间：{{ item.Start_Time.split("T")[0] }}</p>
              <div class="Useroperate">
                <a-button type="link" v-if="User_state == '0'"
                  >接受任务</a-button
                >
                <a-button type="link" @click="Delete(item.id!)" v-else>删除任务</a-button>
                <TiskDetial :id="item.id"></TiskDetial>
              </div>
            </a-card>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="进行中" force-render
          >Content of Tab Pane 2</a-tab-pane
        >
        <a-tab-pane key="3" tab="已完成">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import TiskPub from "./TiskPub.vue";
import TiskDetial from "./TaskDetail.vue";
import { Tisk } from "@/api/type";
import { reactive } from "vue";
import { DeleteTisk, GetPubTiskList } from "@/api/api";
const TiskState = ref("1");
const User_state = "1";
const TiskList = reactive<Tisk[]>([]);
const get = async() =>{
  let result = await GetPubTiskList();
  TiskList.length = 0
  TiskList.push(...result)
}
get()
const Delete = async (Tiskid:string)=>{
  await DeleteTisk(Tiskid)
  get()
}

</script>
<style scoped>
.tisk_content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.Adminoperate {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.tisklist {
  width: 85;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.Tisk_Detail{
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
}
.Useroperate {
  display: flex;
  justify-content: flex-end;
}
</style>
