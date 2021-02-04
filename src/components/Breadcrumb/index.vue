<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
				<!-- 判断路由是否是重定向的 -->
				<span class="no-redirect" 
				v-if="item.redirect === 'noredirect' || index == levelList.length-1" >
					{{item.meta.title}}
				</span>
				<router-link v-else :to="item.redirect || item.path">{{item.meta.title}}</router-link>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
	export default {
		data(){
			return {
				levelList: null
			}
		},
		watch:{
			$route() {
				this.getBreadcrumb()
			}
		},
		mounted() {
			this.getBreadcrumb()
		},
		methods: {
			// 获取面包屑列表数据
			getBreadcrumb(){
				// 获取当前路由列表
				var matched = this.$route.matched.filter(item => item.name)
				// 判断第一个是不是首页
				var first = matched[0]
				if(first && first.name !== 'home') {
					matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
				}
				// 获取面包屑列表
				this.levelList = matched
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.app-breadcrumb.el-breadcrumb {
		display: inline-block;
		font-size: 14px;
		line-height: 56px;
		margin-left: 10px;
		.no-redirect {
			color: #97a8be;
			cursor: text;
		}
	}
</style>