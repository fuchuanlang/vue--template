import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'; //引入图标
import 'element-plus/dist/index.css'; //引入样式

const app = createApp(App);

app.use(store);
app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
