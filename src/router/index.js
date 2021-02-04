import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// Layout
import Layout from "@/components/Layout/index"

// 固定路由
export const constantRouterMap = [
	{ path: "/login", component: () => import("@/views/login/index") },
	{
		path: '',
		component: Layout,
		redirect: '/home',
		meta: {title: '首页', icon: 'home'},
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/home/index'),
				meta: {title: '首页', icon: 'home'}
			}
		]
	},
	{
		path: '/sms',
		component: Layout,
		redirect: '/sms',
		meta: {title: '模板', icon: 'home'},
		children: [
			{
				path: 'list',
				name: 'list',
				component: () => import('@/views/sms/list/index'),
				meta: {title: '列表模板', icon: 'home'}
			},
			{
				path: 'form',
				name: 'form',
				component: () => import('@/views/sms/form/index'),
				meta: {title: '表单模板', icon: 'home'}
			},
			{
				path: 'canvas',
				name: 'canvas',
				component: () => import('@/views/sms/canvas/index'),
				meta: {title: '海报模板', icon: 'home'}
			},
			{
				path: 'echart',
				name: 'echart',
				component: () => import('@/views/sms/echart/index'),
				meta: {title: '图表模板', icon: 'home'}
			},
			{
				path: 'editor',
				name: 'editor',
				component: () => import('@/views/sms/editor/index'),
				meta: {title: '编辑器模板', icon: 'home'}
			}
		]
	},
]

export default new Router({
	scrollBehavior: () => ({y: 0}),
	routes: constantRouterMap
})