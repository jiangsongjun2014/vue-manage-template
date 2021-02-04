<template>
	<el-dialog :title="isEdit?'编辑消息':'添加消息'" :visible.sync="dialogVisible" width="40%">
		<el-form ref="form" :model="form" :rules="rule" label-width="100px" size="small">
			<el-form-item label="消息名称：" prop="name">
				<el-input v-model="form.name" ></el-input>
			</el-form-item>
			<el-form-item label="消息类型：" prop="type">
				<el-radio-group v-model="form.type">
					<el-radio :label="1">重要</el-radio>
					<el-radio :label="0">普通</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="消息排序：" prop="sort">
				<el-input v-model="form.sort"></el-input>
			</el-form-item>
			<el-form-item label="消息描述：" prop="describe">
				<el-input v-model="form.describe" type="textarea" :rows="5" ></el-input>
			</el-form-item>
			<el-form-item label="是否启用：" prop="status">
				<el-radio-group v-model="form.status">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item >
				<el-button @click="dialogVisible = false" size="small">取消</el-button>
				<el-button @click="handleConfirm" size="small" type="primary">确定</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	import bus from "@/utils/bus"
	
	const defaultForm = {
		id: null,
		name: null,
		type: 1,
		describe: null,
		sort: 1,
		status: 1
	};
	
	const defaultRule = {
		name: [{ required: true, message: '请输入', trigger: 'blur' }],
		type: [{ required: true, message: '请选择', trigger: 'change' }],
		describe: [{ required: true, message: '请输入', trigger: 'blur' }],
		sort: [{ required: true, message: '请输入', trigger: 'blur' }],
		status: [{ required: true, message: '请选择', trigger: 'change' }],
	}
	
	export default {
		data(){
			return{
				dialogVisible: false,
				isEdit: false,
				form: Object.assign({}, defaultForm),
				rule: Object.assign({}, defaultRule),
			}
		},
		mounted() {
			// 监听添加
			bus.$on("add", () => {
				this.dialogVisible = true;
				this.isEdit = false;
				this.form = Object.assign({}, defaultForm);
			})
			// 监听编辑
			bus.$on("update", data => {
				this.dialogVisible = true;
				this.isEdit = true;
				this.form = Object.assign({}, data);
			})
		},
		methods:{
			// 确认
			handleConfirm(){
				this.$refs.form.validate(valid => {
					if (valid) {
						if (this.isEdit) {
							// 编辑
							
						} else {
							// 增加
							
						}
					} else {
						this.$message.error("请输入完整的信息");
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>
