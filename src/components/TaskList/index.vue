<template>
  <div class="tisk_content">
    <div class="Adminoperate" v-if="UserState != '0'">
      <TiskPub @onGet="UpdataTiskList"></TiskPub>
    </div>
    <div>
      <a-tabs
        v-model:activeKey="TiskState"
        :animated="true"
        @change="UpdataTiskList"
      >
        <a-tab-pane key="0" tab="已发布">
          <a-empty v-show="TiskList.length === 0" />
          <div class="tisklist">
            <a-card
              v-for="item in TiskList"
              :key="item.id"
              :title="item.Tisk_title"
              :bordered="false"
              style="width: 300px; border: 5px solid #f0f2f5; margin: 20px"
            >
              <p class="Tisk_Detail">
                {{
                  item.Tisk_Details
                }}如果这里很长如果这里很长如果这里很长如果这里很长如
                text-overflow: ellipsis; overflow: hidden; display: -webkit-box;
                -webkit-box-orient: vertical; -webkit-line-clamp:
                5;果这里很长如果这里很长如果这里很长如果这里很长
              </p>
              <p>开始时间：{{ item.Start_Time.split("T")[0] }}</p>
              <div class="Useroperate">
                <a-button
                  type="link"
                  v-if="UserState == '0'"
                  @click="Accept(item.id!)"
                  >接受任务</a-button
                >
                <a-button type="link" @click="Delete(item.id!)" v-else
                  >删除任务</a-button
                >
                <TiskDetial :id="item.id"></TiskDetial>
              </div>
            </a-card>
          </div>
        </a-tab-pane>
        <a-tab-pane key="1" tab="进行中" force-render>
          <a-empty v-if="TiskList.length === 0" />
          <div class="tisklist">
            <a-card
              v-for="item in TiskList"
              :key="item.id"
              :title="item.Tisk_title"
              :bordered="false"
              style="width: 300px; border: 5px solid #f0f2f5; margin: 20px"
            >
              <p class="Tisk_Detail">
                {{
                  item.Tisk_Details
                }}如果这里很长如果这里很长如果这里很长如果这里很长如
                text-overflow: ellipsis; overflow: hidden; display: -webkit-box;
                -webkit-box-orient: vertical; -webkit-line-clamp:
                5;果这里很长如果这里很长如果这里很长如果这里很长
              </p>
              <p>开始时间：{{ item.Start_Time.split("T")[0] }}</p>
              <div class="Useroperate">
                <a-button type="link" v-if="UserState === '0'"
                  ><router-link
                    :to="{ name: 'TiskSubmit', query: { Tiskid: item.id } }"
                    >提交任务</router-link
                  ></a-button
                >
                <a-button type="link" @click="Delete(item.id!)" v-else
                  >删除任务</a-button
                >
                <a-button
                  type="link"
                  v-if="UserState === '0'"
                  @click="GiveUp(item.id!)"
                  >放弃任务</a-button
                >
                <TiskDetial :id="item.id"></TiskDetial>
              </div>
            </a-card>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="已完成">
          <a-empty v-if="TiskList.length === 0" />
          <div class="tisklist">
            <a-card
              v-for="item in TiskList"
              :key="item.id"
              :title="item.Tisk_title"
              :bordered="false"
              style="width: 300px; border: 5px solid #f0f2f5; margin: 10px"
            >
              <p class="Tisk_Detail">
                {{
                  item.Tisk_Details
                }}如果这里很长如果这里很长如果这里很长如果这里很长如
                text-overflow: ellipsis; overflow: hidden; display: -webkit-box;
                -webkit-box-orient: vertical; -webkit-line-clamp:
                5;果这里很长如果这里很长如果这里很长如果这里很长
              </p>
              <p>结束时间：{{ item.End_Time }}</p>
              <div class="Useroperate">
                <TiskDetial :id="item.id" :Tiskstatus="item.Tisk_status"></TiskDetial>
              </div>
            </a-card>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import TiskPub from "./TiskPub.vue";
import TiskDetial from "./TaskDetail.vue";
import store from "@/store";
import { Tisk } from "@/api/type";
import { ref, reactive, computed } from "vue";
import {
  DeleteTisk,
  GetTiskList,
  GetAcceptTiskList,
  GetEndTiskList,
  AcceptTisk,
  GiveUpTisk,
} from "@/api/api";
const TiskState = ref("0");
const UserState = computed(() => store.getters.GetUserState);
const TiskList = reactive<Tisk[]>([]);
const UpdataTiskList = async () => {
  TiskList.length = 0;
  let result = [];
  switch (TiskState.value) {
    case "0":
      result = await GetTiskList();
      break;
    case "1":
      result = await GetAcceptTiskList();
      break;
    case "2":
      result = await GetEndTiskList();
      break;
  }

    TiskList.push(...result); 
};
UpdataTiskList();
const Accept = async (Tiskid: string) => {
  await AcceptTisk(Tiskid);
  UpdataTiskList();
};
const Delete = async (Tiskid: string) => {
  await DeleteTisk(Tiskid);
  UpdataTiskList();
};
const GiveUp = async (Tiskid: string) => {
  await GiveUpTisk(Tiskid);
  UpdataTiskList();
};
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
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.Tisk_Detail {
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
