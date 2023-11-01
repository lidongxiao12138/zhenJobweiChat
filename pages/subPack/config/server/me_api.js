import me_api from '@/pages/subPack/config/server/requset.js'

export default {
	//个人中心 - 投递职位
	getPositionSendResumeNumber: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionSendResumeNumber', 'POST', data, header)
	},

	//个人中心 - 收藏职位
	getPositionCollectionNumber: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionCollectionNumber', 'POST', data, header)
	},

	//收藏职位list
	getPositionCollectionList: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionCollectionList', 'POST', data, header)
	},

	//基础信息维护
	addOnlineResume2: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineResume2?openid=' + uni.getStorageSync('openid'), 'POST',
			data, header, false)
	},

	//是否注册了在线简历
	getResumeHaveOpenid: (data, header) => {
		return me_api.request('/wxapi/project/my/getResumeHaveOpenid', 'GET', data, header)
	},

	//获取我的简历
	getOnlineResumeList: (data, header) => {
		return me_api.request('/wxapi/project/my/getOnlineResumeList', 'POST', data, header)
	},

	//更新个人优势
	updateOnlineResumeAdvantage: (data, header) => {
		return me_api.request('/wxapi/project/my/updateOnlineResumeAdvantage?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//添加求职意向
	addOnlineResumeExpectation: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineResumeExpectation?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//更新求职意向
	updateOnlineResumeExpectation: (data, header) => {
		return me_api.request('/wxapi/project/my/updateOnlineResumeExpectation?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//删除求职意向
	deleteOnlineResumeExpectation: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteOnlineResumeExpectation?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//新增工作经验
	addOnlineResumeWorkExperience: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineResumeWorkExperience?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//更新工作经验
	updateOnlineResumeWorkExperience: (data, header) => {
		return me_api.request('/wxapi/project/my/updateOnlineResumeWorkExperience?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//删除工作经验
	deleteOnlineResumeWorkExperience: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteOnlineResumeWorkExperience?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//新增项目经验
	addOnlineResumeProjectExperience: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineResumeProjectExperience?openid=' + uni.getStorageSync('openid'),
			'POST', data, header, false)
	},

	//更新项目经验
	updateOnlineResumeProjectExperience: (data, header) => {
		return me_api.request('/wxapi/project/my/updateOnlineResumeProjectExperience?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//删除项目经验
	deleteOnlineResumeProjectExperience: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteOnlineResumeProjectExperience?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//添加教育经历
	addOnlineResumeEducation: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineResumeEducation?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//更新教育经历
	updateOnlineResumeEducation: (data, header) => {
		return me_api.request('/wxapi/project/my/updateOnlineResumeEducation?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//添加专业技能
	addOnlineResumeSkill: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineResumeSkill?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//删除专业技能
	deleteOnlineReSumeskill: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteOnlineReSumeskill?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//添加语言能力
	addOnlineResumeLanguage: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineResumeLanguage?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//删除语言能力
	deleteOnlineResumeLanguage: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteOnlineResumeLanguage?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//添加获奖证书
	addOnlineReSumeAwards: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineReSumeAwards?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//删除获奖证书
	deleteOnlineReSumeAwards: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteOnlineReSumeAwards?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//添加个人作品
	addOnlineReSumePerson: (data, header) => {
		return me_api.request('/wxapi/project/my/addOnlineReSumePerson?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//删除个人作品
	deleteOnlineReSumePersonWork: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteOnlineReSumePersonWork?openid=' + uni.getStorageSync(
				'openid'),
			'POST', data, header, false)
	},

	//获取收藏列表
	getPositionCollectionList: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionCollectionList',
			'POST', data, header)
	},

	//获取投递职位列表
	getPositionSendList: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionSendList',
			'POST', data, header)
	},

	//获取面试职位个数
	getPositionInterviewResumeNumber: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionInterviewResumeNumber',
			'POST', data, header)
	},

	//获取面试职位列表
	getPositionInterviewList: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionInterviewList',
			'POST', data, header)
	},

	//获取简历
	getResumeAttachment: (data, header) => {
		return me_api.request('/wxapi/project/my/getResumeAttachment',
			'POST', data, header)
	},

	//获取简历
	getResumeAttachment: (data, header) => {
		return me_api.request('/wxapi/project/my/getResumeAttachment',
			'POST', data, header)
	},

	//删除附件简历
	deleteResumeAttachment: (data, header) => {
		return me_api.request('/wxapi/project/my/deleteResumeAttachment?openid=' + uni.getStorageSync('openid'), 'POST',
			data, header, false)
	},

	//求职意向列表
	getPositionExpectationList: (data, header) => {
		return me_api.request('/wxapi/project/my/getPositionExpectationList',
			'POST', data, header)
	},

	//上传推荐有奖
	addRecommendRecord: (data, header) => {
		return me_api.request('/wxapi/project/my/addRecommendRecord?openid=' + uni.getStorageSync(
			'openid'), 'POST', data, header, false)
	},

	//我的推荐列表
	getMyRecommendList: (data, header) => {
		return me_api.request('/wxapi/project/my/getMyRecommendList',
			'POST', data, header)
	},

	//推荐人数
	getRecommendNumberSum: (data, header) => {
		return me_api.request('/wxapi/project/my/getRecommendNumberSum',
			'POST', data, header)
	},

	//推荐总金额
	getRecommendBonusSum: (data, header) => {
		return me_api.request('/wxapi/project/my/getRecommendBonusSum',
			'POST', data, header)
	},

	//人才顾问
	getConsultant: (data, header) => {
		return me_api.request('/wxapi/project/my/getConsultant',
			'POST', data, header)
	},

	//返费列表
	getRecommenLog: (data, header) => {
		return me_api.request('/wxapi/project/my/getRecommenLog',
			'POST', data, header)
	},

	//上传资料收集接口
	addCollection: (data, header) => {
		return me_api.request('/wxapi/project/collection/addCollection', 'POST',
			data, header, false)
	},

	//获取当前是否进入收集资料阶段
	getIsCollectByTel: (data, header) => {
		return me_api.request('/wxapi/project/collection/getIsCollectByTel', 'POST',
			data, header)
	},

	//获取候选人资料接口
	getCollection: (data, header) => {
		return me_api.request('/wxapi/project/collection/getCollection', 'POST',
			data, header)
	},

	//获取手机验证码接口
	sendCode: (data, header) => {
		return me_api.request('/comm/sendCode', 'POST',
			data, header, false)
	},

	//验证码对比接口
	sendCompare: (data, header) => {
		return me_api.request('/comm/sendCompare', 'POST',
			data, header)
	},

	//邮箱发送验证码
	sendEmail: (data, header) => {
		return me_api.request('/comm/sendEmail', 'POST',
			data, header)
	},

	//邮箱验证码对比接口
	sendCompareMail: (data, header) => {
		return me_api.request('/comm/sendCompareMail', 'POST',
			data, header)
	},

	//收集资料是否上传成功
	getIsBackgroundByTel: (data, header) => {
		return me_api.request('/wxapi/project/collection/getIsBackgroundByTel', 'POST',
			data, header)
	},

	//获取背景资料的提交内容
	getBackground: (data, header) => {
		return me_api.request('/wxapi/project/collection/getBackground', 'POST',
			data, header)
	},
	
	//头像获取
	getAvatarUrlByOpenid: (data, header) => {
		return me_api.request('/wxapi/project/info/getAvatarUrlByOpenid', 'POST',
			data, header)
	},
	
	//头像上传
	updateAvatar: (data, header) => {
		return me_api.request('/wxapi/project/info/updateAvatar', 'POST',
			data, header)
	},
}