<template>
	<div class="menu-wrapper">
		<template v-for="(item, index) in menus" v-if="!item.hidden && item.children">
			
			<!-- 一级菜单 -->
			<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children"
			:to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
				<el-menu-item :index="item.path+'/'+item.children[0].path" class="submenu-title-noDropdown">
					<svg-icon 
						v-if="item.children[0].meta && item.children[0].meta.icon" 
						:icon-class="item.children[0].meta.icon">
					</svg-icon>
					<span 
						v-if="item.children[0].meta && item.children[0].meta.title" 
						slot="title">
						{{item.children[0].meta.title}}
					</span>
				</el-menu-item>
			</router-link>
			
			<!-- 二级菜单 -->
			<el-submenu v-else :index=" item.name || item.path" :key="item.name">
				<!-- 二级菜单的标题图标显示 -->
				<template slot="title">
					<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
					<span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
				</template>
				<!-- 二级菜单的子菜单 -->
				<template v-for="child in item.children" v-if="!child.hidden">
					<router-link :to="item.path + '/' + child.path" :key="child.name">
						<el-menu-item :index="item.path+'/'+child.path">
							<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
							<span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>
			
		</template>
	</div>
</template>

<script>
	export default {
		props:{
			// 菜单数组
			menus: {
				type: Array
			},
		},
		methods: {
			// 判断菜单是否只有一个Children
			hasOneShowingChildren(children) {
				// 获取菜单数组中 hidden不为true的数据 组成一个新的数组
				const showingChildren = children.filter(item => {
					return !item.hidden
				})
				// 如果新的数组 数据只有一个就
				if(showingChildren.length === 1) {
					return true
				}
				return false
			}
		}
	}
</script>

<style>
</style>
