const baseUrl = 'http://10.42.77.82:8080/zhenjob-service';
// const baseUrl = 'https://zhenjob.luxsan-ict.com:8443/zhenjob-service'
const request = (options = {}) => {
	options.header = {
		"Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImY3ZDg4ZmJkLWY0MWQtNDNhNi1iZWZlLWMwNDg0NmY3MGMxNCJ9.RyNbKPVDLGZk8YOZCXxWl8tOOPI2DMoJHPiRpX7IK7WcGoclIOVJpuEQKmMNIXoZyTtF6uz2UkdopUxK6nIN4w",
		"Content-Type": "application/json",
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url || '',
			method: options.type || 'GET',
			data: options.data || {},
			header: options.header || {}
		}).then(data => {
			console.log(data);
			let [err, res] = data;
			resolve(res);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
//get请求
const get = (url, data, options = {}) => {
	options.type = 'GET';
	options.data = data;
	options.url = url;
	return request(options)
}
//post请求
const post = (url, data, options = {}) => {
	options.type = 'POST';
	options.data = data;
	options.url = url;
	return request(options)
}
//将变量和方法进行导出
export default {
	baseUrl,
	request,
	get,
	post,
}