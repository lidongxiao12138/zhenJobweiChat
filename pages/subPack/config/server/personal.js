import http from '@/pages/subPack/config/server/http.js'
import api from '@/pages/subPack/config/server/api.js'
import requset from "@/pages/subPack/config/server/requset.js"
const API_KEY = "iiD4je0ywxbEkONBdic6ffbl"
const SECRET_KEY = "I7xgTiD3MpzWhMHtGOEwXyRiDp7UrbCh"
//登录授权取code
const login = () => {
	uni.getProvider({
		service: 'oauth',
		success: function(res) {
			console.log("getProvider == ", res);
			if (~res.provider.indexOf('weixin')) {
				wx.login({
					success: (res) => {
						console.log("获取code", res);
						uni.setStorageSync('code', res.code);
					}
				})
			} else {
				uni.showToast({
					title: "请安装微信或升级版本",
					icon: 'none'
				})
			}
		}
	});
};

//处理特殊字符编码原因
const encodeSpecialChar = (char) => {
	const encodeArr = [{
		code: '%',
		encode: '%25'
	}, {
		code: '?',
		encode: '%3F'
	}, {
		code: '#',
		encode: '%23'
	}, {
		code: '&',
		encode: '%26'
	}, {
		code: '=',
		encode: '%3D'
	}]
	return char.replace(/[%?#&=]/g, ($) => {
		for (const k of encodeArr) {
			if (k.code === $) {
				return k.encode
			}
		}
	})
}

//计算年龄区间
const getAge = (strAge) => {
	var birArr = strAge.split("-");
	var birYear = birArr[0];
	var birMonth = birArr[1];
	var birDay = birArr[2];
	var d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1; //记得加1
	var nowDay = d.getDate();
	var returnAge;
	if (birArr == null) {
		return false
	};
	var d = new Date(birYear, birMonth - 1, birDay);
	if (d.getFullYear() == birYear && (d.getMonth() + 1) == birMonth && d.getDate() == birDay) {
		if (nowYear == birYear) {
			returnAge = 0; // 
		} else {
			var ageDiff = nowYear - birYear; // 
			if (ageDiff > 0) {
				if (nowMonth == birMonth) {
					var dayDiff = nowDay - birDay; // 
					if (dayDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				} else {
					var monthDiff = nowMonth - birMonth; // 
					if (monthDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				}
			} else {
				return "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
			}
		}
		return returnAge;
	} else {
		return ("输入的日期格式错误！");
	}
};

const showMoalMsg = (title) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '提示',
			content: title,
			cancelText: "取消", // 取消按钮的文字  
			confirmText: "确认",
			success: res => {
				resolve(res.confirm)
			},
			fail: () => {
				reject();
			},
			complete: () => {}
		});
	});
};


//消息提示
const msg = (str, icon = 'none') => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: icon,
			duration: 2000,
			success: () => {
				resolve;
			},
		});
	});
};

// 成功提示框
const successToast = (str) => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "success",
			duration: 2000,
			success: () => {
				resolve();
			},
		});
	});
};

// 显示loading 需要配合hideLoading关闭
const showLoading = (str) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: str,
			success: () => {
				resolve();
			},
		});
	});
};

// 隐藏loading
const hideLoading = () => {
	return new Promise((resolve, reject) => {
		uni.hideLoading({
			success: () => {
				resolve();
			},
		});
	});
};

//获取缓存
const getStorage = (key, sync = true) => {
	try {
		if (sync) {
			return uni.getStorageSync(key);
		} else {
			let data = "";
			uni.getStorage({
				key: key,
				success: function(res) {
					data = res.data;
				},
			});
			return data;
		}
	} catch (e) {
		return false;
	}
};

//设置缓存
const setStorage = (key, value, sync = true) => {
	try {
		if (sync) {
			return uni.setStorageSync(key, value);
		} else {
			uni.setStorage({
				key: key,
				data: value,
			});
		}
	} catch (e) {}
};

//移除缓存
const delStorage = (key, sync = true) => {
	try {
		if (sync) {
			return uni.removeStorageSync(key);
		} else {
			uni.removeStorage({
				key: key,
			});
		}
	} catch (e) {
		return false;
	}
};

//清空缓存
const clearStorage = (sync = true) => {
	try {
		if (sync) {
			return uni.clearStorageSync();
		} else {
			uni.clearStorage();
		}
	} catch (e) {
		return false;
	}
};

/**
 * 
 * @param {Arr} imgList 传入图片数组 | 单张图片也要传数组perviewImage([url])
 * @param {Number} index 不传默认从第一张开始显示
 * 
 */
const perviewImage = (imgList, index) => {
	uni.previewImage({
		current: index,
		urls: imgList,
		indicator: "number",
		success: function(res) {},
		fail: function(err) {
			console.log(err);
		},
	});
};

const uploadFilePromise = (url, image = true) => {
	console.log(url);
	return new Promise((resolve, reject) => {
		let url1 = ""
		if (image) {
			url1 = "/common/uploadMinio"
		} else {
			url1 = "/common/uploadResume"
		}
		let a = uni.uploadFile({
			url: requset.baseUrl + url1, // 仅为示例，非真实的接口地址
			filePath: url,
			name: 'file',
			formData: {
				"openid": uni.getStorageSync('openid')
			},
			success: (res) => {
				// setTimeout(() => {
				resolve(res.data)
				// }, 1000)
			},
			fail(e) {
				console.log("uploadFilePromise=", e);
			}
		});
	})
};

const uploadFileImage = (url) => {
	return new Promise((resolve, reject) => {
		let url1 = "/common/upload"
		let a = uni.uploadFile({
			url: requset.baseUrl + url1, // 仅为示例，非真实的接口地址
			filePath: url,
			name: 'file',
			success: (res) => {
				setTimeout(() => {
					resolve(res.data)
				}, 1000)
			}
		});
	})
};


const uploadAwardFile = (url) => {
	return new Promise((resolve, reject) => {
		let url1 = "/common/uploadResume"
		let a = uni.uploadFile({
			url: requset.baseUrl + url1, // 仅为示例，非真实的接口地址
			filePath: url,
			name: 'file',
			success: (res) => {
				setTimeout(() => {
					resolve(res.data)
				}, 1000)
			}
		});
	})
};


//梦远OCR接口
//OCR身份证识别接口
const getMY_OCR = (MY_image) => {
	uni.showLoading()
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://www.apimy.cn/api/orc/idcard",
			data: {
				key: "PTbGFc0Kovv475R9Rz7gh5whSoXgU1",
				img: MY_image,
			},
			method: "POST",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success(res) {
				if (JSON.stringify(res.data.data.result) == '{}') {
					uni.showToast({
						title: "请您上传正确的身份证照片，或您的身份证照片不清晰无法识别",
						icon: 'none'
					})
					return
				}
				if (res.data.code == 200) {
					resolve(res.data.data.result)
				} else {
					msg(res.data.msg)
				}
				uni.hideLoading()
			},
			fail: () => {
				uni.hideLoading()
			},
			//成功失败都会调用
			complete() {

			}
		})
	})
};

//梦远OCR接口
//OCR通用图片识别接口
const getMY_imageOCR = (MY_image) => {
	uni.showLoading()
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://www.apimy.cn/api/orc/ty",
			data: {
				key: "PTbGFc0Kovv475R9Rz7gh5whSoXgU1",
				img: MY_image,
			},
			method: "POST",
			header: {
				"Content-Type": "application/x-www-form-urlencoded;charset:utf-8;"
			},
			success(res) {
				if (res.data.code == 200) {
					resolve(res.data.data)
				} else {
					msg(res.data.msg)
				}
				uni.hideLoading()
			},
			fail: () => {
				uni.hideLoading()
			},
		})
	})
};

//在线验证学信网信息
const getCHsi = (url) => {
	uni.showLoading()
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://www.apimy.cn/api/xxw/bgcx",
			data: {
				key: "PTbGFc0Kovv475R9Rz7gh5whSoXgU1",
				vcode: url,
			},
			method: "GET",
			header: {
				"Content-Type": "application/json"
			},
			success(res) {
				resolve(res.data)
				uni.hideLoading()
			},
			fail: () => {
				uni.hideLoading()
			},
		})
	})
};

const getMinioFile = (e) => {
	return new Promise((resolve, reject) => {
		let data = {
			"bucketName": "zhenjob",
			"objectNames": e
		};
		api.getMinioFile(data).then(res => {
			if (res) {
				let imageUrl = "data:image/png;base64," + uni.arrayBufferToBase64(res);
				resolve(imageUrl)
			}
		})
	})
};

// url 转 base64
const getImageUrlBase64 = (url) => {
	return new Promise((resolve, reject) => {
		let canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		let img = new Image()
		img.crossOrigin = 'Anonymous' // 解决Canvas.toDataURL 图片跨域问题
		img.src = imageUrl
		img.onload = function() {
			canvas.height = img.height
			canvas.width = img.width
			ctx.drawImage(img, 0, 0, img.width, img.height) // 参数可自定义
			const dataURL = canvas.toDataURL('image/jpeg', 1) // 获取Base64编码
			resolve(dataURL)
			canvas = null // 清除canvas元素
			img = null // 清除img元素
		}
		img.onerror = function() {
			reject(new Error('Could not load image at ' + imageUrl))
		}
	})
}

//百度云通用文字识别
const baidu_imageOCR = (img) => {
	uni.showLoading()
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://aip.baidubce.com/oauth/2.0/token?client_id=NkFMhOQXpMofGTq3zAzWeCfw&client_secret=cKFzOLMgU3lLVqAv3FVm8uPGAPMFDZCR&grant_type=client_credentials",
			method: "POST",
			header: {
				"Accept": "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success(res) {
				uni.request({
					url: "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=" + res.data
						.access_token,
					data: {
						image: img,
					},
					method: "POST",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success(res) {
						console.log(res);
						resolve(res.data.words_result)
						uni.hideLoading()
					},
					fail: () => {
						uni.hideLoading()
					},
				})
			}
		})
	})
};



const config = {
	apiURL: "https://a1.easemob.com",
	appkey: "messagego#zhenpin",
	url: "wss://im-api-wechat.easemob.com/websocket",
	password: "123456",
	baseImageUrl: requset.baseUrl + "/common/getMinioFile?bucketName=zhenjob" + "&openid=" + uni
		.getStorageSync(
			'openid') + "&objectNames=",
	baseUrl: 'https://zhenjob.luxsan-ict.com:8443/zhenjob-service',
	defaultImage: "/static/icons/touxiang5.png",
};

export default {
	login,
	config,
	msg,
	successToast,
	showLoading,
	hideLoading,
	showMoalMsg,
	getStorage,
	setStorage,
	delStorage,
	clearStorage,
	perviewImage,
	uploadFilePromise,
	uploadAwardFile,
	uploadFileImage,
	getCHsi,
	getMinioFile,
	getImageUrlBase64,
	getMY_OCR,
	getMY_imageOCR,
	baidu_imageOCR,
	encodeSpecialChar
}