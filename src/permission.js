import router from "./router"
import { getToken } from '@/utils/support'

const whiteList = [ "/login" ]

router.beforeEach((to, from, next) => {
	if (getToken()) {
		if (router.path === "/login") {
			next({path: "/"})
		} else {
			next()
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
		}
	}
})