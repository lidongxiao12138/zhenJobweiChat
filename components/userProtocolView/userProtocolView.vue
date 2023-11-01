<template>
	<view>
		<view class="userProtocolView">
			<view class="userProtocolView-title">
				<text style="font-size: 20px; font-weight: bold;">服务协议和隐私政策</text>
			</view>
			<view class="userProtocolView-img">
				<image src="/static/icons/protocolBg.png" style="height: 100px; width: 100%;">
				</image>
			</view>
			<view class="userProtocolView-context" style="color: #3C414D; font-size: 28rpx;">
				<u-parse :content="article"></u-parse>
			</view>
			<view class="userProtocolView-btn">
				<button size="default" style="width: 30%;" @click="showTostClick">拒绝</button>
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" type="primary" style="width: 60%;"
					@click="agreeClick">同意并继续</button>
				<!-- <button open-type="chooseAvatar" @chooseavatar="chooseavatar" type="primary" style="width: 60%;" @click="agreeClick">同意并继续</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	let WebIM = require("@/utils/WebIM.js")["default"];
	export default {
		name: "userProtocolView",
		data() {
			return {
				article: '<div>感谢选择臻聘网小程序，我们非常重视您的个人信息安全和隐私保护。依据最新法律要求，使用我们的产品前，请仔细阅读并同意<a href="/pages/webView/webView">《用户协议》</a>、<a href="/pages/webView/webView">《隐私政策》</a>以便我们向你提供更优质的服务！我们承诺将尽全力保护你个人信息及合法权益，再次感谢您的信任！</a></div>'
			};
		},

		methods: {
			chooseavatar(e) {
				this.$emit("chooseavatar",e);
			},

			showTostClick() {
				this.$emit("showTostClick");
			},
			agreeClick() {
				this.$emit("agreeClick");
			},
			// 获取用户手机号
			getPhoneNumber(e) {
				this.getPhoneNum(e)
				this.wxlogin()
			},
			getPhoneNum(e) {
				let data = {
					"code": e.detail.code
				}
				this.$api.getPhoneNum(data).then(res => {
					uni.setStorageSync("phoneNumber", res.data.phoneNumber);
				})
			},
			wxlogin() {
				let data = {
					"code": uni.getStorageSync('code'),
				}
				console.log('wxlogin ===', data);
				this.$api.wxlogin(data).then(res => {
					console.log('openid ===== ', res);
					uni.setStorageSync("openid", res.data.openid);
					this.getResumeHaveOpenid();
					this.webUIRegister().finally(() => {
						this.webUILogin();
						uni.setStorage({
							key: "myUsername",
							data: uni.getStorageSync('openid'),
						});
						console.log("成功-失败-都执行")
					})
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
							uni.showToast({
								title: "注册成功"
							});
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

			//是否注册了在线简历
			getResumeHaveOpenid() {
				let data = {}
				this.$me_api.getResumeHaveOpenid(data).then(res => {
					console.log('getResumeHaveOpenid === ', res.data);
					this.$personal.setStorage('getResumeHaveOpenid', res.data);
				})
			},
		},
	}
</script>

<style lang="scss">
	.userProtocolView-title {
		padding:0px 20rpx;
		padding-top: 20px;
	}

	.userProtocolView-img {
		display: flex;
		padding: 20rpx;
	}

	.userProtocolView-context {
		padding: 0rpx 20rpx;
		padding-bottom: 40px;
	}

	.userProtocolView-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding: 40rpx 20rpx;
		padding-top: 0px;
	}
</style>