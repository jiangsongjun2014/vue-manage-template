import Cookies from 'js-cookie'

// 令牌
const TokenKey = 'LoginToken'
const LoginKey = 'LoginInfo'

// token
export function getToken() {
	return Cookies.get(TokenKey)
}
export function setToken(token) {
	return Cookies.set(TokenKey, token)
}
export function removeToken() {
	return Cookies.remove(TokenKey)
}

// login
export function getLogin() {
	return Cookies.get(LoginKey)
}
export function setLogin(token) {
	return Cookies.set(LoginKey, token)
}
export function removeLogin() {
	return Cookies.remove(LoginKey)
}
