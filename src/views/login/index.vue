<template>
	<div class="container">
		<div class="loginbox">
			<div class="logintitle">后台管理系统</div>
			<div class="loginform">
				<el-form ref="login" :model="form" :rules="rule">
					<el-form-item prop="username">
						<el-input v-model="form.username" placeholder="请输入手机号码"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="form.password" placeholder="请输入登录密码" type="password"></el-input>
					</el-form-item>
					<div>
						<el-button @click="handleLogin" style="width: 100%;" type="primary">登录</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	
	const defaultForm = {
		username: 'admin',
		password: 'admin',
	}
	
	const defaultRule = {
		username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
		password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
	}
	
	
	export default {
		data(){
			return {
				form: Object.assign({}, defaultForm),
				rule: Object.assign({}, defaultRule),
			}
		},
		mounted() {
			
		},
		methods: {
			// 登录
			handleLogin(e){
				this.$refs.login.validate(valid => {
					if (valid) {
						this.$router.push({path: '/'})
					} else {
						this.$message.error("请输入登录信息")
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.container{
		width: 100%;
		height: 100vh;
		background: #409EFF;
		display: flex;
		justify-content: center;
		align-items: center;
		.logintitle{
			padding-bottom: 20px;
			font-size: 18px;
			text-align: center;
			color: #409EFF;
		}
		.loginbox{
			width: 300px;
			padding: 20px;
			border-radius: 3px;
			background: #FFFFFF;
		}
	}
</style>
