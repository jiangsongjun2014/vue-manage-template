<template>
	<el-menu class="navbar" mode="horizontal">
		<!-- 侧边栏开关 -->
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<!-- 面包屑 -->
		<breadcrumb></breadcrumb>
		<!-- 头像 -->
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<img class="user-avatar" :src="avatar">
			</div>
			<el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>
					<span @click="handleLogout" style="display:block;">退出</span>
			    </el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</el-menu>
</template>

<script>
	import {mapGetters} from "vuex"
	import Breadcrumb from "@/components/Breadcrumb"
	import Hamburger from "@/components/Hamburger"
	
	export default {
		data(){
			return {
				avatar: "https://www.vipspt.cn/uploadPic/uploadImgs/touxiang.jpg"
			}
		},
		components:{
			Breadcrumb,
			Hamburger
		},
		computed:{
			...mapGetters([
				'sidebar',
			])
		},
		methods: {
			// 切换侧边栏
			toggleSideBar(){
				this.$store.dispatch('ToggleSideBar')
			},
			// 系统退出
			handleLogout(){
				this.$router.push({path: '/login'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 56px;
		line-height: 56px;
		border-radius: 0px !important;
		.hamburger-container {
			width: 56px;
			height: 56px;
			display: flex;
			justify-content: center;
			align-items: center;
			float: left;
		}
		.screenfull {
			position: absolute;
			right: 90px;
			top: 16px;
			color: red;
		}
		.avatar-container {
			width: 56px;
			height: 56px;
			float: right;
			margin-right: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			.avatar-wrapper {
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 5px;
				}
			}
	  }
	}
</style>
