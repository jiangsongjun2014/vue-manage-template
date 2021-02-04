<template>
	<div class="app-container">
		<!-- 搜索 -->
		<el-card class="filter-container" shadow="never">
			<div>
				<i class="el-icon-search"></i>
				<span>筛选搜索</span>
				<el-button class="filter-container-btn" @click="handleExport()" size="small" type="success" >导出表格</el-button>
				<el-button class="filter-container-btn" @click="handleAdd()" size="small" type="success" >添加数据</el-button>
				<el-button class="filter-container-btn" @click="handleSearch()" size="small" type="primary" >查询搜索</el-button>
				<el-button class="filter-container-btn" @click="handleReset()" size="small" >重置搜索</el-button>
			</div>
			<div class="filter-container-form">
				<el-form :inline="true" :model="listQuery" size="small" >
					<el-form-item label="数据信息：">
						<el-input v-model="listQuery.keyword" placeholder="请输入数据信息" clearable></el-input>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<!-- 列表 -->
		<div class="table-container">
			<el-table :data="list" v-loading="listLoading" @selection-change="handleSelectionChange" border style="width: 100%;">
				<el-table-column type="selection" width="60" align="center"></el-table-column>
				<el-table-column label="消息名称" align="center">
					<template slot-scope="scope"> {{scope.row.name}} </template>
				</el-table-column>
				<el-table-column label="消息类型" align="center">
					<template slot-scope="scope"> {{scope.row.type | formatType}} </template>
				</el-table-column>
				<el-table-column label="消息排序" align="center">
					<template slot-scope="scope">{{scope.row.sort}}</template>
				</el-table-column>
				<el-table-column label="消息描述" align="center">
					<template slot-scope="scope"> {{scope.row.describe}} </template>
				</el-table-column>
				<el-table-column label="添加时间"  align="center">
					<template slot-scope="scope">{{scope.row.createTime | formactTime}}</template>
				</el-table-column>
				<el-table-column label="是否启用" width="100" align="center">
					<template slot-scope="scope">
						<el-switch 
							@change="handleStatus(scope.$index, scope.row)" 
							:active-value="1" :inactive-value="0" 
							v-model="scope.row.status">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160" align="center">
					<template slot-scope="scope">
						<el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" plain type="success">编辑</el-button>
						<el-button @click="handleDelete(scope.$index, scope.row)" size="mini" plain type="danger">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 批量操作 -->
		<div class="batch-operate-container">
			<el-select v-model="operateType" placeholder="批量操作" size="small">
				<el-option v-for="item in operateOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-button @click="handleBatchOperate()" type="primary" size="small">确定</el-button>
		</div>
		<!-- 分页 -->
		<div class="pagination-container">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				layout="total, sizes, prev, pager, next, jumper"
				:current-page.sync="listQuery.pageNum"
				:page-size="listQuery.pageSize"
				:page-sizes="[10,15,20]"
				:total="total">
			</el-pagination>
		</div>
		<!-- 组件 -->
		<ListDetail></ListDetail>
	</div>
</template>

<script>
	import bus from "@/utils/bus"
	import {list} from "@/utils/data.js"
	import {formatDay} from "@/utils/date.js"
	import ListDetail from "./components/ListDetail.vue"
	import {export2Excel} from "@/utils/util.js"
	
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10,
		keyword: null
	}
	
	const defaultOperateOption = [
		{ label: "批量删除", value: 1 }
	]
	
	export default {
		data(){
			return {
				listQuery: Object.assign({}, defaultListQuery),
				listLoading: false,
				list: [],
				total: 0,
				multipleSelection: [],
				operateType: 1,
				operateOption: Object.assign({}, defaultOperateOption),
			}
		},
		filters:{
			formatType (value) {
				if (value === 0) {
					return '普通';
				} else {
					return '重要';
				}
			},
			formactTime(value){
				return formatDay(value)
			}
		},
		components:{
			ListDetail
		},
		mounted() {
			// 获取列表
			this.getList()
			// 监听刷新
			bus.$on("success", () => {
				this.getList();
			})
		},
		methods: {
			// 列表
			getList(){
				this.list = list
			},
			// 搜索
			handleSearch(){
				this.listQuery.pageNum = 1;
				this.getList();
			},
			// 重置
			handleReset(){
				this.listQuery = Object.assign({}, defaultListQuery);
				this.getList();
			},
			// 当前页改变
			handleSizeChange(val){
				this.listQuery.pageNum = 1;
				this.listQuery.pageSize = val;
				this.getList();
			},
			// 每页数量改变
			handleCurrentChange(val){
				this.listQuery.pageNum = val;
				this.getList();
			},
			// 导出表格
			handleExport(){
				var columns = [
					{title: '消息名称', key: 'name'}, 
					{title: '消息类型', key: 'type'},
					{title: '消息描述', key: 'describe'},
					{title: '消息排序', key: 'sort'},
					{title: '添加时间', key: 'createTime'},
					{title: '消息状态', key: 'status'}
				]
				export2Excel(columns, this.list)
			},
			// 全选
			handleSelectionChange(val){
				var multipleSelection = val;
				this.multipleSelection = [];
				for (let index in multipleSelection) {
					this.multipleSelection.push(multipleSelection[index].id);
				}
			},
			// 增加
			handleAdd(){
				bus.$emit("add");
			},
			// 编辑
			handleUpdate(index,row) {
				bus.$emit("update", row);
			},
			// 删除
			handleDelete(index,row) {
				this.handleBatchDelete({ids: row.id})
			},
			// 状态
			handleStatus(index,row){
				this.$confirm('是否要修改该状态?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
				});
			},
			// 批量操作
			handleBatchOperate(){
				if( this.multipleSelection == null || this.multipleSelection.length < 1){
					this.$message.error('请选择要批量操作的数据');
				} else {
					if (this.operateType === 1) {
						var data = {ids: this.multipleSelection.toString()}
						this.handleBatchDelete(data)
					}
				}
			},
			// 删除操作
			handleBatchDelete(data){
				this.$confirm('是否要删除短信?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
				});
			},
		}
	}
</script>

<style>
</style>
