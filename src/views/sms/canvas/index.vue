<template>
	<div class="app-container">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="filter-container" shadow="never">
					<div class="canvascode">
						<div>canvas二维码</div>
						<canvas id="code"></canvas>
					</div>
					<div class="canvascode">
						<div>img二维码</div>
						<img :src="codeurl">
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="filter-container" shadow="never">
					<canvas id="canvas" class="canvas" @click="handleDownCanvas"></canvas>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import QRCode from 'qrcode'
	
	export default {
		data(){
			return {
				option: {
					type: 'image/jpg',					// 类型
					width: 200,							// 高宽
					errorCorrectLevel: 'H',				// 容错度
					margin: 1,							// 内边距
					color: { dark: '#000', light: '#fff' }// 颜色
				},
				text: '文本内容',
				codeurl: '',
				canvasurl: ''
			}
		},
		mounted() {
			this.handleDrawCode()
			this.handleDrawCanvas()
		},
		methods:{
			// 获取二维码
			handleDrawCode(){
				// 绘制canvas二维码
				QRCode.toCanvas(document.getElementById('code'), this.text, this.option)
				// 绘制img二维码
				QRCode.toDataURL(this.text, this.option, (err, url) => {
					this.codeurl = 	url
				}) 
			},
			// 绘制海报
			handleDrawCanvas(){
				var that = this
				// 获取canvas
				var canvas = document.getElementById('canvas')
				canvas.width = 380
				canvas.height = 585
				var content = canvas.getContext('2d')
				// 绘制海报
				var img = new Image()
				img.src = require('./canvas.png')
				img.onload = function (){
					if (img.complete) {
						content.drawImage(img, 0, 0, canvas.width, canvas.height);
						// 绘制二维码
						QRCode.toDataURL(that.text, that.option, (err, url) => {
							var imgcode =new Image()
							imgcode.src = url
							imgcode.onload = () => {
								if (imgcode.complete) {
									content.drawImage(imgcode, 90, 270, 200, 200);
									// 绘制文字
									content.font = '17px Arial bolder'
									content.textAlign = "center"
									content.fillStyle = '#000000'
									content.fillText(that.text, 190, 490)
									content.font = '15px Arial bolder'
									content.fillText('点击图片下载海报', 190, 515)
									// 获取canvasURL
									that.canvasurl = canvas.toDataURL('image/jpg')
								}
							}
						})
					}
				}
			},
			// 下载海报
			handleDownCanvas() {
				let a =document.createElement('a')
				let event = new MouseEvent('click')
				a.href = this.canvasurl
				a.download = 'canvas海报'
				a.dispatchEvent(event)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.filter-container{
		display: flex;
		align-items: center;
		justify-content: center;
		.canvascode{
			margin: 20px;
			padding: 0 20px 15px 20px;
			background: #409EFF;
			div{
				font-size: 20px;
				padding: 10px 0 10px 0;
				color: #FFFFFF;
			}
		}
	}
</style>
