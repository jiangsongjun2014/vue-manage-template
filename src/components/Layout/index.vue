<template>
	<div class="app-wrapper" :class="classObj">
		<Sidebar class="sidebar-container"></Sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
	import { Navbar, Sidebar, AppMain } from "./components/index.js"
	
	export default {
		components:{
			Navbar,
			Sidebar,
			AppMain
		},
		computed:{
			sidebar(){
				return this.$store.state.app.sidebar
			},
			device(){
				return this.$store.state.app.device
			},
			classObj(){
				return {
					hideSidebar: !this.sidebar.opened
				}
			}
		}
	}
</script>

<style>
</style>
