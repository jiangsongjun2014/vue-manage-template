<template>
	<el-card class="form-container" shadow="never">
		<el-form ref="form" :model="form" :rules="rule" label-width="120px" size="small">
			<el-form-item label="输入框：" prop="input">
				<el-input v-model="form.input" placeholder="请输入" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="日期：" prop="date">
				<el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 300px;"></el-date-picker>
			</el-form-item>
			<el-form-item label="时间：" prop="time">
				<el-time-picker v-model="form.time" placeholder="选择时间" style="width: 300px;"></el-time-picker>
			</el-form-item>
			<el-form-item label="开关：" prop="switch">
				<el-switch v-model="form.switch"></el-switch>
			</el-form-item>
			<el-form-item label="单选框：" prop="radio">
				<el-radio-group v-model="form.radio">
					<el-radio label="1">选项1</el-radio>
					<el-radio label="2">选项2</el-radio>
					<el-radio label="3">选项3</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="复选框：" prop="checkbox">
				<el-checkbox-group v-model="form.checkbox">
					<el-checkbox label="1">选项1</el-checkbox>
					<el-checkbox label="2">选项2</el-checkbox>
					<el-checkbox label="3">选项3</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="选择器：" prop="select">
				<el-select v-model="form.select" placeholder="请选择" style="width: 300px;">
					<el-option label="选项1" value="1"></el-option>
					<el-option label="选项2" value="2"></el-option>
					<el-option label="选项3" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="级联选择器：" prop="select">
				<el-cascader v-model="form.cascader" :options="city" placeholder="请选择" style="width: 300px;"></el-cascader>
			</el-form-item>
			<el-form-item label="文本域：" prop="textarea">
				<el-input v-model="form.textarea" type="textarea" rows="5" placeholder="请输入" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="图片上传：" prop="upload">
				<el-upload
					action="https://jsonplaceholder.typicode.com/posts/"
					list-type="picture-card"
					:auto-upload="false">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button @click="handleConfirm" type="primary">确定</el-button>
				<el-button @click="handleReset">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import {city} from "@/utils/city.js"
	
	const defaultForm = {
		input: '',
		date: '',
		time: '',
		switch: '',
		radio: '',
		checkbox: [],
		select: '',
		cascader: '',
		textarea: ''
	}
	
	const defaultRule = {
		input: [{ required: true, message: '请输入', trigger: 'blur' }],
		date: [{ required: true, message: '请选择', trigger: 'change' }],
		time: [{ required: true, message: '请选择', trigger: 'change' }],
		switch: [{ required: true, message: '请选择', trigger: 'change' }],
		radio: [{ required: true, message: '请选择', trigger: 'change' }],
		checkbox: [{ required: true, message: '请选择', trigger: 'change' }],
		select: [{ required: true, message: '请选择', trigger: 'change' }],
		cascader: [{ required: true, message: '请选择', trigger: 'change' }],
		textarea: [{ required: true, message: '请输入', trigger: 'blur' }],
		upload: [{ required: true, message: '请选择', trigger: 'change' }],
	}
	
	export default {
	    data() {
			return {
				form: Object.assign({}, defaultForm),
				rule: Object.assign({}, defaultRule),
				city: city
			}
	    },
	    methods: {
			// 确定
			handleConfirm() {
				this.$refs.form.validate(valid => {
					if (valid) {
						
					} else {
						this.$message.error('请输入完整的信息')
					}
				})
			},
			// 重置
			handleReset(){
				this.$refs.form.resetFields();
			}
		}
	}
</script>

<style>
</style>
