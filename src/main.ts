import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
// Nianchen测试环境router
import router from './router/TaskPublich'
// kergem环境router
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
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

const app = createApp(App)
// 相关插件注册
app.use(Antd)
app.use(store)
app.use(router)
// app.use(VueMarkdownEditor)
// app.config.globalProperties.$Echarts = Echarts
app.mount("#app")