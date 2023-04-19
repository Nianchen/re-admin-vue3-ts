import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as Echarts from 'echarts'
//md
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});


const app = createApp(App)
app.use(Antd)
app.use(store)
app.use(router)
app.use(VueMarkdownEditor)
app.config.globalProperties.$Echarts = Echarts
app.mount("#app")