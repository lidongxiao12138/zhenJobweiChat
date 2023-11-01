<template>
	<view class="head">
		<view class="head">
			<chatheadView :sendresume="sendresume" @sendPhoneClick="sendPhoneClick" @sendWeChatClick="sendWeChatClick"
				@sendResumeClick="sendResumeClick"></chatheadView>
		</view>
		<view class="chat_main">
			<chat id="chat"  :username="username" :dataJob="dataJob" ref="chat" chatType="singleChat" @onClickInviteMsg="onClickMsg"></chat>
		</view>
		<view class="contact">
			<contectShow :serverManShow="serverManShow" :contecthrAvatar="dataJob.headImg" :hrTelName="dataJob.hrName"
				:contecthrName="dataJob.hrName" :contectTel="dataJob.tel" :contecthrPosition="dataJob.hrPosition"
				@close="closeClick" @callPhoneClick="callPhoneClick"></contectShow>
		</view>
	</view>
</template>

<script>
	let disp = require("@/utils/broadcast.js");
	let WebIM = require("@/utils/WebIM.js")["default"];
	import chat from "@/pages/subPack/page/components/chat/chat.vue";
	import contectShow from "@/pages/subPack/page/components/contectShow/contectShow.vue"
	import chatheadView from "@/pages/subPack/page/components/chatheadView/chatheadView.vue"
	export default {
		mounted() {
			this.webUILogin()
		},
		data() {
			return {
				username: {
					your: ""
				},
				wechatNum: "该hr暂时还未上传微信号",
				show: false,
				dataJob: {},
				sendresume: "发简历"
			};
		},
		components: {
			chat,
			chatheadView,
			contectShow,
		},
		props: {},
		// options = 系统传入的 url 参数
		onLoad(options) {
			let username = JSON.parse(options.username);
			console.log("options ===", options);
			this.setData({
				username: username
			});
			// 生成的支付宝小程序在onLoad里获取不到，这里放到全局变量下
			uni.username = username;
			uni.setNavigationBarTitle({
				title: username.yourName
			});
			this.getOnePostionnDetail();
		},

		onUnload(options) {
			disp.fire("em.chatroom.leave");
		},

		onPullDownRefresh: function() {
			uni.showNavigationBarLoading();
			this.$refs.chat.getMore();
			// 停止下拉动作
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods: {
			callPhoneClick() {
				uni.makePhoneCall({
					phoneNumber: this.dataJob.tel
				})
			},
			closeClick() {
				this.serverManShow = false
			},
			close() {
				this.show = false
			},
			sendPhoneClick() {
				this.serverManShow = true
			},
			sendWeChatClick() {
				this.show = true
				this.wechatNum = this.dataJob.wechat
				if (this.dataJob.wechat == null) {
					this.wechatNum = "该hr暂时还未上传微信号"
				}
			},
			sendResumeClick() {
				this.addUserSendResume()
			},
			copychatClick() {
				uni.setClipboardData({
					data: this.wechatNum,
					success() {
						uni.showToast({
							title: "复制成功"
						})
					}
				})
			},
			//环信用户登录
			webUIRegister: function() {
				return new Promise((resolve, reject) => {
					var options = {
						apiUrl: WebIM.config.apiURL,
						username: uni.getStorageSync('openid'),
						password: this.$personal.config.password,
						nickname: this.$personal.getStorage('nick_name'),
						appKey: WebIM.config.appkey,
						success: function(res) {
							console.log('注册成功 ===', res);
							resolve(res)
						},
						error: function(res) {
							reject(res)
						},
					};
					WebIM.conn.registerUser(options);
				})
			},
			//如果用户已注册，跳转至登录页面
			webUILogin() {
				WebIM.conn
					.open({
						apiUrl: WebIM.config.apiURL,
						user: uni.getStorageSync('openid'),
						pwd: this.$personal.config.password,
						appKey: WebIM.config.appkey,
					})
					.then(() => {
						console.log("login success");
					})
					.catch((reason) => {
						console.log("login fail", reason);
					});
			},
			onClickMsg(msg) {
				msg.action = 'join'
				uni.navigateTo({
					url: " /../emedia/index?srcData=" + JSON.stringify(msg)
				});
			},
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: `/pages/moreMenu/moreMenu?username=${this.username.your}&type=singleChat`
				})
			},

			getOnePostionnDetail() {
				let data = {
					"id": this.username.optionId
				}
				this.$api.getOnePostionnDetail(data).then(res => {
					console.log("getOnePostionnDetail === ", res);
					this.dataJob = res.data.positionDetail[0]
					var imageUrl = this.$personal.config.baseImageUrl + this.dataJob.headImg
					this.dataJob.headImg = imageUrl
					if (res.data.sendId != "") {
						this.sendresume = "已投递"
					}
				})
			},
			//投简历按钮
			async addUserSendResume() {
				if (this.$personal.getStorage('getResumeHaveOpenid') == false) {
					let res = await this.$personal.showMoalMsg("请您编辑您的基础信息")
					if (res) {
						console.log("准备跳转");
						uni.navigateTo({
							url: "/pages/subPack/page/me/basicPerson/basicPerson"
						});
					}
				} else {
					let data = {
						"positionId": this.dataJob.id,
						"hrId": this.dataJob.hrId
					}
					console.log(data);
					this.$api.addUserSendResume(data).then(res => {
						console.log('addUserSendResume == ', res);
						if (res.message == "success") {
							this.sendresume = "已投递"
							this.$u.toast("投递成功")
						} else {
							this.$u.toast(res.message)
						}
					})
				}
			},
		}
	};
</script>
<style>
	@import "./chatroom.css";
</style>