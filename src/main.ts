import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "@unocss/reset/tailwind.css";
import "element-plus/dist/index.css";
import "uno.css";

import router from "./router/index";
import App from "./App.vue";
import "./utils/auth";

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn }).use(router).mount("#app");
