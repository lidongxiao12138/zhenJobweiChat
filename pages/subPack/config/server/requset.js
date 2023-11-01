const Authorization = []
// const baseUrl = 'http://10.42.233.71:8080/zhenjob-service'
const baseUrl = 'https://zhenjob.luxsan-ict.com:8443/zhenjob-service'
const request = (url, method, data, header, contentType = true, responseType = "text") => {
	let openid = {}
	if (contentType == true) {
		openid = {
			"openid": uni.getStorageSync('openid')
		}
	}
	const openid_data = Object.assign(openid, data)
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method || "GET",
			data: openid_data,
			responseType: responseType,
			header: header || {
				"Content-Type": contentType == true ?
					"application/x-www-form-urlencoded" : "application/json"
			}
		}).then(data => {
			let [err, res] = data;
			resolve(res.data)
			if (res.data.code != 200) {
				uni.showToast({
					title: res.data.message,
					icon: 'none'
				});
			}
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	})
}

export default {
	request,
	baseUrl,
	Authorization
}