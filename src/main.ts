import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
// Nianchen测试环境router
import router from './router/TaskPublish'
// kergem环境router
import store from "./store";
// import * as Echarts from 'echarts'
// 数据可视化相关
// import VueMarkdownEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import Prism from 'prismjs';
// VueMarkdownEditor.use(vuepressTheme, {
//   Prism,
// });
// 富文本编辑器相关
import { Layout, Menu, Badge, Dropdown, Avatar, Input, Table, Popconfirm, Tag, Divider, Radio, Button, Form, Modal } from "ant-design-vue";

const app = createApp(App)
// 相关插件注册
app.use(Layout)
app.use(Menu)
app.use(Badge)
app.use(Dropdown)
app.use(Avatar)
app.use(Input)
app.use(Table)
app.use(Popconfirm)
app.use(Tag)
app.use(Divider)
app.use(Radio)
app.use(Button)
app.use(Form)
app.use(Modal)
app.use(store)
app.use(router)
// app.use(VueMarkdownEditor)
// app.config.globalProperties.$Echarts = Echarts
app.mount("#app")