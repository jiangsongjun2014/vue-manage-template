import Cookies from "js-cookie"
import { constantRouterMap } from '@/router/index'

const app = {
	state: {
		// 侧边栏
		sidebar: {
			// 切换标志位 !1 = false; !0 = true;
			opened: ! + Cookies.get("sidebarflag"),
		},
		// 菜单
		menu: constantRouterMap
	},
	mutations: {
		// 切换侧边栏
		TOGGLE_SIDEBAR: state => {
			if (state.sidebar.opened) {
				Cookies.set("sidebarflag", 1)
			} else {
				Cookies.set("sidebarflag", 0)
			}
			state.sidebar.opened = !state.sidebar.opened
		},
	},
	actions: {
		// 切换侧边栏
		ToggleSideBar: ({commit}) => {
			commit("TOGGLE_SIDEBAR")
		},
	}
}

export default app