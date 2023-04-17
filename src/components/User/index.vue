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
      <div class="Data_parent">
        <div class="Data_detail">
            <div class="left"></div>
            <div class="right">
              <h1>1345</h1>
              <h4>发布任务数</h4>
            </div>
        </div>
        <div class="Data_detail">
            <div class="left"></div>
            <div class="right">
              <h1>1345</h1>
              <h4>发布任务数</h4>
            </div>
        </div>
        <div class="Data_detail">
            <div class="left"></div>
            <div class="right">
              <span style="font-size:28px;font-weight: bold;color: green;">1345</span>
              <h1>
                 发布任务数
              </h1>
            </div>
        </div>
      </div>
      <div class="User_message">

  <a-empty description="还没想好放什么"/>




    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
</script>
<style scoped>
.User_content {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
}
.User_info {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 390px;
  background-color:#fff;
  box-shadow:0px 0px 10px 0px rgba(42, 50, 50, 1);
}
.User_avatar{
  padding: 30px;
  width: 100%;
  height: 15%;
}
.Detail_info{
  padding: 0px;
}
.Detail_info ul li{
  font-size: 16px;
  line-height: 30px;
  list-style: none;
}
.User_right{
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  
}
.User_right::-webkit-scrollbar{
  display: none;
}
.Data_parent{
  width: 100%;
  height: 15%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.Data_detail{
  width: 33%;
  height: 100%;
  box-shadow:0px 0px 4px 0px rgba(42, 50, 50, 1);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
}
.Data_detail .left{
  width: 35%;
  height: 100%;
  background-color:#4f85dd;
  float: left;
}
.Data_detail .right{
  width: 65%;
  line-height: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
}
.User_message{
  height: 30%;
  width: 99%;
  margin-top: 20px;
  background-color:#fff;
  box-shadow:0px 0px 10px 0px rgba(42, 50, 50, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media screen and (max-width: 1600px){ 
  .User_info{
    width: 100%;
  }
  .User_right{
    width: 100%;
  }
  
}
</style>
