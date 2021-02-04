<template>
	<ScrollBar>
		<el-menu
		mode="vertical"
		:show-timeout="200"
		:default-active="$route.path"
		:collapse="isCollapse"
		background-color="#304156"
		text-color="#bfcbd9"
		active-text-color="#409EFF">
			<sidebar-item :menus="menus"></sidebar-item>
		</el-menu>
	</ScrollBar>
</template>

<script>
	import { mapGetters } from "vuex"
	import ScrollBar from "@/components/ScrollBar"
	import SidebarItem from "./SidebarItem.vue"
	
	export default {
		components: {
			ScrollBar,
			SidebarItem
		},
		computed:{
			...mapGetters([ 'sidebar', 'menu' ]),
			// 侧边栏状态
			isCollapse(){
				return !this.sidebar.opened
			},
			// 菜单
			menus(){
				return this.menu
			}
		}
	}
</script>

<style>
</style>
