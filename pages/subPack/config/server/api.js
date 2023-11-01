import api from '@/pages/subPack/config/server/requset.js'
export default {
	// 首页列表
	homelist: (data, header) => {
		return api.request('/wxapi/project/position/getPostionList', "POST", data, header)
	},

	// 首页地点
	location: (data, header) => {
		return api.request('/wxapi/project/position/getPostionPlaceList', "POST", data, header)
	},

	// 搜索
	searchlist: (data, header) => {
		return api.request('/wxapi/project/position/getPostionLikeList', "POST", data, header)
	},

	// 筛选
	screenlist: (data, header) => {
		return api.request('/wxapi/project/position/getPostionFilterList', "POST", data, header)
	},

	// 轮播图
	slideImage: (data, header) => {
		return api.request('/wxapi/project/position/getSlideImg', "GET", data, header, true)
	},

	// 获取图片流
	getMinioFile: (data, header) => {
		return api.request('/common/getMinioFile', "GET", data, header, true, 'arraybuffer')
	},
	
	// 职位详情
	getOnePostionnDetail: (data, header) => {
		return api.request('/wxapi/project/position/getOnePostionnDetail', "POST", data, header)
	},

	// 职位详情-相关职位
	getOnePostionRelation: (data, header) => {
		return api.request('/wxapi/project/position/getOnePostionRelation', "POST", data, header)
	},

	// 投简历按钮
	addUserSendResume: (data, header) => {
		return api.request('/wxapi/project/position/addUserSendResume', "POST", data, header)
	},

	// 收藏职位
	addUserCollection: (data, header) => {
		return api.request('/wxapi/project/position/addUserCollection', "POST", data, header)
	},

	//当前hr信息
	getHrDetailById: (data, header) => {
		return api.request('/wxapi/project/position/getHrDetailById', "POST", data, header)
	},

	//职位信息列表
	getPostionNameList: (data, header) => {
		return api.request('/wxapi/project/position/getPostionNameList', "POST", data, header)
	},

	//位置信息列表
	getPostionPlaceList: (data, header) => {
		return api.request('/wxapi/project/position/getPostionPlaceList', "POST", data, header)
	},

	//薪资信息列表
	getPostionSalaryList: (data, header) => {
		return api.request('/wxapi/project/position/getPostionsalaryList', "POST", data, header)
	},

	//微信登录接口
	wxlogin: (data, header) => {
		return api.request('/wxapi/wxlogin', "POST", data, header, false)
	},

	getPhoneNum: (data, header) => {
		return api.request('/wxapi/getPhoneNum', "POST", data, header, false)
	},

	//收藏接口
	addUserCollection: (data, header) => {
		return api.request('/wxapi/project/position/addUserCollection', "POST", data, header)
	},

	//取消收藏
	deleteCollection: (data, header) => {
		return api.request('/wxapi/project/position/deleteCollection', "POST", data, header)
	},

	//面试通知
	getReportNotice: (data, header) => {
		return api.request('/wxapi/project/notice/getReportNotice', "POST", data, header)
	},

	//报到通知
	getInterviewNotice: (data, header) => {
		return api.request('/wxapi/project/notice/getInterviewNotice', "POST", data, header)
	},

	//消息列表
	getContactList: (data, header) => {
		return api.request('/wxapi/project/news/getContactList', "POST", data, header)
	},

	//新增聊天关系
	addContact: (data, header) => {
		return api.request('/wxapi/project/news/addContact', "POST", data, header)
	},



}