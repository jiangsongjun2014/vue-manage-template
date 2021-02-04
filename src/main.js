import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 使用ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局样式
import "@/styles/index.scss"
// svg
import '@/icons'
// 路由权限
// import '@/permission'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
