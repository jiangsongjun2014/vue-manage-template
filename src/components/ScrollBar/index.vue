<template>
	<div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
		<div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	const delta  = 15
	export default {
		data(){
			return {
				top: 0
			}
		},
		methods:{
			// 处理滚动
			handleScroll(e){
				const eventDelta = e.wheelDelta || -e.deltaY * 3
				const $containerHeight = this.$refs.scrollContainer.offsetHeight
				const $wrapperHeight = this.$refs.scrollWrapper.offsetHeight
				if (eventDelta > 0) {
					this.top = Math.min(0, this.top + eventDelta)
				} else {
					if ($containerHeight - delta < $wrapperHeight) {
						if (this.top < -($wrapperHeight - $containerHeight + delta)) {
							this.top = this.top
						} else {
							this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
						}
					} else {
						this.top = 0
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$menuBg:#304156;
	
	.scroll-container{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: $menuBg;
		.scroll-wrapper {
			position: absolute;
			width: 100% !important;
		}
	}
</style>
