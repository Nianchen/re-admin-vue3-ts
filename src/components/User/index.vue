<template>
  <div class="User_content">
    <div class="User_info">
      <div class="User_avatar">
        <a-avatar :size="64">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
      <div class="Detail_info">
        <ul>
          <li>姓名：小红</li>
          <li>职业：学生</li>
          <li>所属公司：</li>
          <li>年龄：</li>
          <li>技术栈：</li>
        </ul>
      </div>
    </div>
    <div class="User_right">
      <div class="echarts1">
        <div id="main" style="width: 100%; height: 300px"></div>
      </div>
      <div class="User_message">
        <a-empty description="还没想好放什么" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { getCurrentInstance, onMounted } from "vue";
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
.User_info {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 390px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(42, 50, 50, 1);
}
.User_avatar {
  padding: 30px;
  width: 100%;
  height: 15%;
}
.Detail_info {
  padding: 0px;
}
.Detail_info ul li {
  font-size: 16px;
  line-height: 30px;
  list-style: none;
}
.User_right {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.User_right::-webkit-scrollbar {
  display: none;
}
.echarts1{
  width: 100%;
}
.Data_detail {
  width: 33%;
  height: 100%;
  box-shadow: 0px 0px 4px 0px rgba(42, 50, 50, 1);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
}
.Data_detail .left {
  width: 35%;
  height: 100%;
  background-color: #4f85dd;
  float: left;
}
.Data_detail .right {
  width: 65%;
  line-height: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
}
.User_message {
  height: 30%;
  width: 99%;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(42, 50, 50, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
