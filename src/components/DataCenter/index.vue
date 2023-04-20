<template>
  <div class="User_content">
    <div class="User_info">
      <div class="Detail_info">
        <a-calendar v-model:value="value">
    <template #dateCellRender="{ current }">
      <ul class="events">
            <span v-for="item in getListData(current)" :key="item.type">{{ item.type }}</span>
      </ul>
    </template>
    <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
      </div>
    </div>
    <div class="User_right">
      <div class="echarts1">
        <div id="main" style="width: 100%; height: 300px"></div>
      </div>
      <div class="User_message">
       <h1>消息列表</h1>
        <a-empty description="暂无消息"  v-if="MessageList.length === 0"/>
        <div v-for="item in MessageList" :key="item.Userid" >
              <a-card style="width: 100%;height: 100px;" :bordered="false"  hoverable>
                <p  class="Message" style="">{{ item.Message}}</p>
                <div style="position: relative;left:70%">
                   {{ '--------------'+ item.Username }}
        </div>
         </a-card>
        </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted,ref} from "vue";
import { Dayjs } from 'dayjs';
import {GetMessageList} from '@/api/api'
const MessageList =(await GetMessageList())




const { proxy } = getCurrentInstance() as any;
const option = {
  title: {
    text: "Referer of a Website",
    subtext: "Fake Data",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
const value = ref<Dayjs>();

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};
onMounted(() => {
  const echarts = proxy.$Echarts;
  const echarts1 = echarts.init(document.getElementById("main"));
  echarts1.setOption(option);
  window.onresize = function () {
    echarts1.resize();
  };
});
</script>
<style scoped>
.User_content {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}

.User_info::-webkit-scrollbar {
  display: none;
}
.User_info {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 35%;
  background-color: #fff;
  border: 4px solid #d9d9d9;
  overflow: scroll;
}
.User_info::-webkit-scrollbar {
  display: none;
}
.User_right {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: scroll;
}
.User_right::-webkit-scrollbar {
  display: none;
}
.echarts1{
  width: 99%;
  height: 38%;
  padding: 25px;
  border: 1px solid #d9d9d9;
  overflow: scroll;
}
.echarts1::-webkit-scrollbar{
  display: none;
}
.User_message {
  height: 60%;
  width: 99%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 25px;
  border: 1px solid #d9d9d9;
  overflow: scroll;
}
.User_message::-webkit-scrollbar{
  display: none;
}
.Message{
  font-size: 22px;
}
@media screen and (max-width: 1600px) {
  .User_info {
    width: 100%;
  }
  .User_right {
    width: 100%;
  }
}
</style>
