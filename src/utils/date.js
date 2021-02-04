// 获取月份
export function formatMonth(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1

	return [year, month].map(formatNumber).join('-')
}

// 获取天数
export function formatDay(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}
