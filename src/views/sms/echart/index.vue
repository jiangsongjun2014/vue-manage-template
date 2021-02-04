<template>
	<div class="app-container">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="filter-container">
					<div id="BarEchart" style="width: 100%;height: 400px;"></div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="filter-container">
					<div id="LineEchart" style="width: 100%;height: 400px;"></div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-top: 20px;">
			<el-col :span="12">
				<el-card class="filter-container">
					<div id="PieEchart" style="width: 100%;height: 400px;"></div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="filter-container">
					<div id="SpotEchart" style="width: 100%;height: 400px;"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	
	export default {
		data(){
			return {
				option : {
					title: {},
					tooltip: {},
					legend:{},
					xAxis: {},
					yAxis: {},
					series: null
				}
			}
		},
		mounted() {
			this.getBarEchart()
			this.getLineEchart()
			this.getPieEchart()
			this.getSpotEchart()
		},
		methods: {
			// 绘制柱形图
			getBarEchart(){
				// 初始化echart
				var echart = echarts.init(document.getElementById('BarEchart'));
				// 设置柱形图
				this.option.title['text'] = '柱形图'
				this.option.legend['data'] = ['柱形图']
				this.option.xAxis['data'] = ["2020-07","2020-08","2020-09","2020-10","2020-11","2020-12"]
				this.option.series = { 
					name: '柱形图', 
					type: 'bar', 
					data: [500, 800, 200, 300, 500, 600],
				}
				// 绘制echart
				echart.setOption(this.option);
			},
			// 绘制折线
			getLineEchart(){
				// 初始化echart
				var echart = echarts.init(document.getElementById('LineEchart'));
				// 设置柱形图
				this.option.title['text'] = '线形图'
				this.option.legend['data'] = ['线形图']
				this.option.xAxis['data'] = ["2020-07","2020-08","2020-09","2020-10","2020-11","2020-12"]
				this.option.series = { 
					name: '线形图', 
					type: 'line', 
					data: [500, 800, 200, 300, 500, 600],
				}
				// 绘制echart
				echart.setOption(this.option);
			},
			// 绘制饼状图
			getPieEchart(){
				// 初始化echart
				var echart = echarts.init(document.getElementById('PieEchart'));
				// 设置柱形图
				this.option.title['text'] = '饼状图'	
				this.option.xAxis = null
				this.option.yAxis = null
				this.option.series = {
					name: '访问来源',
					type: 'pie',
					radius: '50%',
					data: [
						{value: 1048, name: '搜索引擎'},
						{value: 735, name: '直接访问'},
						{value: 580, name: '邮件营销'},
						{value: 484, name: '联盟广告'},
						{value: 300, name: '视频广告'}
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
				// 绘制echart
				echart.setOption(this.option);
			},
			// 绘制散点图
			getSpotEchart(){
				// 初始化echart
				var echart = echarts.init(document.getElementById('SpotEchart'));
				this.option.title['text'] = '散点图'	
				this.option.xAxis = {}
				this.option.yAxis = {}
				this.option.series = {
					type: 'scatter',
					symbolSize: 20,
					data: [
						[10.0, 8.04],
						[8.07, 6.95],
						[13.0, 7.58],
						[9.05, 8.81],
						[11.0, 8.33],
						[14.0, 7.66],
						[13.4, 6.81],
						[10.0, 6.33],
						[14.0, 8.96],
						[12.5, 6.82],
						[9.15, 7.20],
					]
				}
				// 绘制echart
				echart.setOption(this.option);
			}
		}
	}
</script>

<style>
</style>
