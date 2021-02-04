
// 获取url参数
export function getURLParams (params, k, p) {
	if (typeof params != 'string') { return {} }
	k = k ? k : '&'
	p = p ? p : '='
	var value = {}
	if (params.indexOf(k) !== -1) {
		params = params.split(k)
		for (let val in params) {
			if (params[val].indexOf(p) !== -1) {
				var item = params[val].split(p)
				value[item[0]] = item[1]
			}
		} 
	} else if (params.indexOf(p) !== -1) {
		var item = params.split(p)
		value[item[0]] = item[1]
	} else {
		return params
	}
	return value
}

// 导出Excel
export function export2Excel(columns,list){
    require.ensure([], () => {
        const { export_json_to_excel } = require('../excel/Export2Excel');
        let tHeader = []
        let filterVal = []
        console.log(columns)
        if(!columns){
            return;
        }
        columns.forEach(item =>{
            tHeader.push(item.title)
            filterVal.push(item.key)
        })
        const data = list.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, data, '数据列表');
    })
}

// 读取Excel
export function readExcel(file) {
	return new Promise(resolve => {
		// 创建文件读取对象
		var reader = new FileReader();
		// 读取文件为buffer
		reader.readAsArrayBuffer(file)
		// 读取完成
		reader.onload = function (){
			// 获取读取文件
			var result = reader.result
			// 转换读取文件为8位无符号整数值的类型化数组
			var bytes = new Uint8Array(result)
			// 转换数组为字符串
			var binary = ''
			for(var i = 0; i < bytes.length; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			// 转换为二进制
			var XLSX = require('xlsx')
			var wb = XLSX.read(binary, { type: 'binary' });
			// 获取表格内容为数组
			var outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
			// 响应出去
			resolve(outdata)
		}
	})
}