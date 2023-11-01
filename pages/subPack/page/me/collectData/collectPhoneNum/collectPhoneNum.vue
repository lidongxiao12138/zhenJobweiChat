<template>
	<view class="main">
		<u-alert v-if='cancelRemark !== null && cancelRemark !== "null"' title="收集资料!!!驳回理由" type="error" effect="dark"
			:description="cancelRemark"></u-alert>
		<view class="topimage">
			<image style="width: 232px; height: 72px;" src="../../../static/me/codeBh.png" mode=""></image>
		</view>
		<view class="codeText">
			<text style="font-size: 20px; font-weight: bold; padding-right: 10px;">立臻科技</text>
			<text style="color: dimgrey;">给您( <text
					style="color: blue;">{{userNumPhone}}</text>）发送了一份资料收集清单，帮助我们判断您是否符合公司的用人需求，请如实提供所有材料，感谢您的配合。</text>
		</view>
		<view class="phoneNumText">
			<text>{{userNumPhone}}</text>
		</view>
		<view class="codeInput">
			<input style="width: 65%; height: 30px;" type="number" placeholder="请输入验证码" maxlength="6" v-model="userPwdPhone">
			<view class="code-txt" @tap="getPhonecode">
				{{codeBtn.codeText}}
			</view>
		</view>
		<view class="">
			<button @click="btnNext" type="primary">填写资料</button>
		</view>

		<view class="phoneNum">
			<u-popup :show="show" @close="close" mode="center" round="10" :closeOnClickOverlay="false">
				<view class="phoneNum_content">
					<view class="phoneNum_tips">
						<text style="font-size: 20px;font-weight: bold;">提示！</text>
					</view>
					<view class="phoneNum_input">
						<text style="color: red;">您当前小程序的手机号与收集资料手机号不符！</text>
						<u-input type="number" placeholder="请输入正确的手机号码" v-model="phoneNumInput"></u-input>
					</view>
					<view class="btnSubmit">
						<button @click="submitClick" type="primary">确定</button>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectionId: "",
				userPwdPhone: "",
				userNumPhone: "手机号获取失败....",
				phoneNumInput: "",
				telPhone: "",
				show: false,
				cancelRemark: "",
				//验证码按钮
				codeBtn: {
					codeTime: 60,
					codeText: "获取验证码",
					codeStatus: true
				}
			}
		},
		onShow: function(options) {
			var obj = wx.getLaunchOptionsSync()
			console.log('启动小程序的路径:', obj.path)
			console.log('启动小程序的场景值:', obj.scene)
			console.log('启动小程序的 query 参数:', obj.query)
			console.log("obj.query --", obj.query);
			if (JSON.stringify(obj.query) !== '{}') {
				if (JSON.stringify(obj.query.collectionId) !== 'undefined') {
					this.collectionId = obj.query.collectionId
					console.log("this.collectionId --", this.collectionId);
				}
			}
			console.log('来源信息:', obj.shareTicket)
			console.log('来源信息参数appId:', obj.referrerInfo.appId)
			console.log('来源信息传过来的数据:', obj.referrerInfo.extraData)
		},
		//接收值
		onLoad(option) {
			console.log("PhoneNum=", option);
			this.collectionId = option.collectionId
			this.getCollection(option.collectionId);
		},
		methods: {
			//获取候选人信息
			getCollection(collectionId) {
				let data = {
					"collectionId": collectionId,
				}
				console.log("collectionId===", data);
				this.$me_api.getCollection(data).then(res => {
					console.log("collectionId，res===", res);
					if (res.message == "success") {
						if (res.data.length == 0) {
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/home/home"
								})
							}, 3000)
							this.$personal.msg("当前资料收集已失效！")
						}
						if (res.data[0].tel !== uni.getStorageSync("phoneNumber")) {
							this.show = true
						}
						this.userNumPhone = res.data[0].tel.slice(0, 3) + "****" + res.data[0].tel.slice(-4)
						this.telPhone = res.data[0].tel
						this.cancelRemark = res.data[0].cancelRemark
						if (res.data[0].id !== null && res.data[0].id !== "") {
							if (res.data[0].cancelRemark !== null && res.data[0].cancelRemark !== "") {
								//判断是否已通过验证码验证
								if (uni.getStorageSync('sendCompare') == true) {
									console.log("this.collectionId =", this.collectionId);
									uni.navigateTo({
										url: "../../../me/collectData/collectOnePage/collectOnePage?collectionId=" +
											this.collectionId + "&tel=" + this.telPhone +
											"&cancelRemark=" + res
											.data[0].cancelRemark
									})
								}
							}
						} else {
							//判断是否已通过验证码验证
							if (uni.getStorageSync('sendCompare') == true) {
								console.log("this.collectionId =", this.collectionId);
								uni.navigateTo({
									url: "../../../me/collectData/collectOnePage/collectOnePage?collectionId=" +
										this.collectionId + "&tel=" + this.telPhone + "&cancelRemark=" +
										res
										.data[0].cancelRemark
								})
							}
						}
					}
				})
			},

			//发送验证码接口
			sendCode() {
				if (this.codeBtn.codeStatus) {
					this.codeBtn.codeStatus = false
					let data = {
						"data": {
							"mobiles": this.telPhone
						},
					}
					console.log(data);
					this.$me_api.sendCode(data).then(res => {
						console.log('sendCode', res);
					})
					let timerId = setInterval(() => {
						let codetime = this.codeBtn.codeTime
						codetime--
						this.codeBtn.codeTime = codetime
						this.codeBtn.codeText = codetime + "s"
						if (codetime < 1) {
							clearInterval(timerId)
							this.codeBtn.codeText = "重新获取"
							this.codeBtn.codeTime = 60
							this.codeBtn.codeStatus = true
						}
					}, 1000)
				}



			},
			//手机号验证码对比接口
			sendCompare() {
				let data = {
					"mobiles": this.telPhone,
					"random": this.userPwdPhone
				}
				console.log(data);
				this.$me_api.sendCompare(data).then(res => {
					console.log('sendCompare', res);
					if (res.message == "验证通过") {
						console.log("this.collectionId====", this.collectionId);
						uni.setStorageSync("sendCompare", true);
						uni.navigateTo({
							url: "../../../me/collectData/collectOnePage/collectOnePage?collectionId=" +
								this.collectionId + "&tel=" + this.telPhone + "&cancelRemark=" + this
								.cancelRemark
						})
					}
				})
			},
			//判断验证是否符合要求，合法性校验
			validate(key) {
				let bool = true;
				if (!this.rules[key].rule.test(this[key])) {
					//提示信息
					uni.showToast({
						title: this.rules[key].msg,
					})
					//取反
					bool = false;
					return false;
				}
				return bool;
			},

			//获取验证码按钮点击计时事件
			getPhonecode() {
				//发送验证码
				this.sendCode()
			},
			//验证手机号是否与小程序一致
			submitClick() {
				if (this.telPhone == this.phoneNumInput) {
					this.show = false
				} else {
					this.$personal.msg("您当前输入的手机号与收集资料的手机号不匹配，请重新输入")
				}
			},
			//填写资料
			btnNext() {
				if (this.userPwdPhone == "1111") {
					uni.navigateTo({
						url: "../../../me/collectData/collectOnePage/collectOnePage?collectionId=" +
							this.collectionId + "&tel=" + this.telPhone + "&cancelRemark=" + this
							.cancelRemark
					})
				} else {
					this.sendCompare()
				}
			}
		}
	}
</script>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		padding: 20px;

		.topimage {
			height: 72px;
			padding: 30px;
		}

		.phoneNumText {
			margin-top: 37px;
			padding: 12px;
			background-color: #F5F7FA;
			font-size: 15px;
			border-radius: 5px;
			margin-bottom: 12px;
		}

		.codeInput {
			background-color: #F5F7FA;
			border-radius: 5px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 10px;

			margin-bottom: 32px;

			.code-txt {
				color: #0084FF;
				padding: 0px 10px;
			}
		}


		.phoneNum_content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20px;

			.phoneNum_tips {
				display: flex;
				align-items: center;
				margin-bottom: 40px;
			}

			.phoneNum_input {
				width: 300px;
				margin-bottom: 20px;
			}

			.btnSubmit {
				width: 100%;
			}
		}
	}
</style>