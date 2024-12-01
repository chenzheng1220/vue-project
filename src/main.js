import './assets/main.css'
import './assets/fonts/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
//import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import visitors from '@/utils/visitors'
const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//   }
// app.use(ElementPlus,{
//   locale: zhCn
// })
app.use(createPinia())
app.use(router)

app.use(visitors)
app.mount('#app')
