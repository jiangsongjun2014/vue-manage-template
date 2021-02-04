import axios from 'axios'
import Qs from 'qs'
import { getToken } from '@/utils/support'
import { HTTP_REQUEST_URL } from "@/utils/config.js"

// 创建axios实例
const service = axios.create({
	baseURL: HTTP_REQUEST_URL,
	timeout: 15000 
})

// request拦截器
service.interceptors.request.use(
	config => {
		
		// 判断请求类型
		if(config.type == 'json') {
			config.headers['Content-Type'] = 'application/json'
			config.data = config.data
		} else if(config.type == 'formData') {
			config.headers['Content-Type'] = 'multipart/form-data'
			config.data = config.data
		} else {
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			config.data = Qs.stringify(config.data)
		}
		
		// 设置token
		if (getToken()) {
			config.headers['token'] = getToken()
		}
		
		return config
	},
	error => {
		Promise.reject(error)
	}
)

// respone拦截器
service.interceptors.response.use(
	response => {
		var data = response.data
		return data
	},
	error => {
		return Promise.reject(error)
	}
)

export default service
