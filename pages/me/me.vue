<template>
	<view>
		<u-navbar class="navbar" titleStyle="color: white;" :bgColor="navbar_bgColor" leftIcon=" " title="我的"></u-navbar>
		<view class="nav_backgound_image">
			<u-image width="100%" :src="nav_backgound_image" mode="aspectFill"></u-image>
		</view>
		<view class="content">
			<view class="head">
				<view class="customerContent">
					<view class="customer_left">
						<view class="customer_avatar" v-if="loginOut == false">
							<button class="chooseBtn" type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
								<u-avatar size="60" :src="wx_avatar"></u-avatar>
							</button>
						</view>
						<view class="customerName" v-if="loginOut">
							<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btnStyle">点击登录/注册</button>
						</view>
						<view class="customerName" v-else>
							<view class="btnStyle">
								<text style="font-size: 17px;">{{wx_nick_name}}</text>
							</view>
							<view class="btnStyle">
								<text style="color: #3D3D3D;font-size: 13px;">简历完整程度：<text
										style="color: #057CFF;font-size: 13px;">{{resumeLevel}}</text></text>
							</view>
						</view>
					</view>
					<view class="customer_right" v-if="loginOut == false">
						<u-icon name="arrow-right" label="我的简历" label-pos="left" label-color="white" label-size="12px" color="white"
							space="10rpx" size="14px" @click="editClick">
						</u-icon>
					</view>
				</view>
				<view class="labelText" v-if="loginOut == false">
					<view class="collectLabel" @click="favoriteClick">
						<text style="font-size: 40rpx; font-weight: bold;">{{favoriteNum}}</text>
						<text style="font-size: 13px;">收藏职位</text>
					</view>
					<view class="collectLabel" @click="postPositonClick">
						<text style="font-size: 40rpx; font-weight: bold;">{{sendResumeNum}}</text>
						<text style="font-size: 13px;">投递职位</text>
					</view>
					<view class="collectLabel" @click="interviewClick">
						<text style="font-size: 40rpx; font-weight: bold;">{{interviewNum}}</text>
						<text style="font-size: 13px;">面试职位</text>
					</view>
				</view>
			</view>

			<view class="me_image" @click="awardClick" v-if="loginOut == false">
				<u-image width="100%" :src="me_tuijian_image" mode="widthFix"></u-image>
			</view>

			<view class="me_list" v-if="loginOut == false">
				<u-cell-group :border="false">
					<u-cell icon="edit-pen" :border="false" title="我的推荐" isLink
						url="/pages/subPack/page/me/referrer/referrer"></u-cell>
					<u-cell icon="server-man" @click="serverManClick" :border="false" title="人才顾问" isLink></u-cell>
					<u-cell icon="heart" @click="focusClick" :border="false" title="关注立臻" isLink></u-cell>
					<view v-if="isCollectData">
						<u-cell icon="file-text" @click="collectData" :border="false" title="收集资料" isLink></u-cell>
					</view>
				</u-cell-group>
			</view>

			<view class="loginOut" v-if="loginOut == false">
				<u-button shape="circle" @click="outLoginClick" text="退出登录"></u-button>
			</view>

		</view>

		<view class="serverManShow">
			<u-popup :show="serverManShow" mode="bottom" @close="close" @open="open" round="10">
				<view class="popupShow">
					<view class="customer_server_avatar">
						<u-image width="90" height="90" mode="aspectFill" src="/static/icons/customer_avatar.png"></u-image>
					</view>

					<view class="me_background_avatar">
						<u-image width="100%" height="320" mode="scaleToFill"
							src="/static/icons/me_background_server.png"></u-image>
					</view>
					<view class="crow_server">
						<u-icon name="/static/icons/crown.png" label="专属客服" labelPos="bottom" space="12"
							label-color="#FFC875"></u-icon>
					</view>

					<view class="server_hrPosition">
						<text style="font-size: 15px; color: #F5F7FA;">李超</text>
						<text style="font-size: 20px; color: white; margin-top: 10px; ">123333111222</text>
						<view class="btn_call" @click="callPhoneClick">
							联系客服
						</view>
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
				nav_backgound_image: this.$personal.config.baseImageUrl + "2023/wechat_home/home_nav_backgound.png",
				me_tuijian_image: this.$personal.config.baseImageUrl + "2023/wechat_me/me_tuijian.png",
				wx_avatar: this.$personal.config.baseImageUrl + "2023/userInfo_img/WechatIMG18.jpg",
				navbar_bgColor: "transparent", //#057CFF
				serverManShow: false,
				isCollectId: "",
				isCancelRemark: false,
				isBackgroundId: "",
				favoriteNum: 0,
				sendResumeNum: 0,
				interviewNum: 0,
				wx_nick_name: "微信用户",
				loginOut: false,
				consultant: {},
				isCollectData: false, //是否显示收集资料
				resumeLevel: "50%" //简历完整度
			};
		},
		methods: {
			getConsultant() {
				let data = {}
				this.$me_api.getConsultant(data).then(res => {
					console.log("getConsultant=", res);
					if (res.data.lenght > 0) {
						res.data[0].url = this.$personal.config.baseImageUrl + res.data[0].url
						this.consultant = res.data[0]
					}
				})
			},
			//投递职位
			resumeNumberUrl() {
				let data = {}
				this.$me_api.getPositionSendResumeNumber(data).then(res => {
					this.sendResumeNum = res.data[0].count
				})
			},
			//收藏职位
			collectionNumberUrl() {
				let data = {}
				this.$me_api.getPositionCollectionNumber(data).then(res => {
					this.favoriteNum = res.data[0].count
				})
			},

			//面试职位
			getPositionInterviewResumeNumber() {
				let data = {}
				this.$me_api.getPositionInterviewResumeNumber(data).then(res => {
					this.interviewNum = res.data[0].count
				})
			},

			//获取头像的接口
			getAvatarUrlByOpenid() {
				let data = {}
				this.$me_api.getAvatarUrlByOpenid(data).then(res => {
					console.log("res =", res);
					if (res.data == "null") {
						this.wx_avatar = this.$personal.config.baseImageUrl + "2023/userInfo_img/WechatIMG18.jpg"
					} else {
						this.wx_avatar = this.$personal.config.baseImageUrl + res.data
					}
					console.log("获取头像的接口——getAvatarUrlByOpenid=", this.wx_avatar);
				})
			},

			//头像上传接口
			updateAvatar(url) {
				let data = {
					avatarUrl: url
				}
				console.log(data);
				this.$me_api.updateAvatar(data).then(res => {
					console.log("头像上传——updateAvatar=", res);
				})
			},

			getIsCollectByTel() {
				let data = {
					"tel": uni.getStorageSync("phoneNumber")
				}
				console.log(data);
				this.$me_api.getIsCollectByTel(data).then(res => {
					console.log("getIsCollectByTel=", res);
					if (res.message == "success") {
						if (res.data == "") {
							this.isCollectData = false
						} else {
							this.isCollectData = true
							this.isCollectId = res.data
							this.getCollection(res.data)
						}
					} else {
						this.isCollectData = false
					}
					if (res.code == 400) {
						this.$personal.msg("当前手机号获取为空")
					}
				})
			},
			//获取候选人信息
			getCollection(collectionId) {
				let data = {
					"collectionId": collectionId,
				}
				this.$me_api.getCollection(data).then(res => {
					console.log("collectionId===", res);
					if (res.message == "success") {
						this.getIsBackgroundByTel(res.data[0].tel)
						if (res.data[0].cancelRemark !== null && res.data[0].cancelRemark !== "") {
							this.isCancelRemark = true
							console.log("当前被驳回");
						}else {
							console.log("当前无驳回");
							this.isCancelRemark = false
						}
					}
				})
			},

			//获取是否填写资料的接口
			getIsBackgroundByTel(tel) {
				let data = {
					"tel": tel
				}
				console.log(data);
				this.$me_api.getIsBackgroundByTel(data).then(res => {
					console.log("小程序填写资料=", res);
					if (res.message == "success") {
						if (res.data == "") {
							console.log("当前被驳回");
							this.isCancelRemark = true
						}
					}
				})
			},
			
			//资料收集
			collectData() {
				console.log("this.isCollectId=", this.isCollectId);
				if (this.isCancelRemark == true) {
					uni.navigateTo({
						url: "/pages/subPack/page/me/collectData/collectPhoneNum/collectPhoneNum?collectionId=" +
							this.isCollectId
					})
				} else {
					this.$personal.msg("当前为正在审核状态，禁止再次提交！")
				}
			},

			getPhoneNumber(e) {
				console.log("用户注册", e);
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					uni.setStorageSync('loginOut', false);
					this.loginOut = false
					this.meInformation()
				}
			},

			//头像编辑
			async onChooseavatar(e) {
				console.log("onChooseavatar=", e);
				this.wx_avatar = e.detail.avatarUrl
				var result = await this.$personal.uploadFilePromise(this.wx_avatar)
				console.log("result=", result);
				var data = JSON.parse(decodeURIComponent(result));
				var iamgeData = {
					url: data.fileName,
					size: data.size,
					fileId: data.fileId
				}
				console.log("iamgeData=", iamgeData);
				this.updateAvatar(iamgeData.url)
			},

			editClick() {
				console.log('编辑简历')
				let that = this
				var navgetTo = ""
				console.log('navgetTo ==== ', that.$personal.getStorage('getResumeHaveOpenid'))
				if (that.$personal.getStorage('getResumeHaveOpenid') == true) {
					navgetTo = "/pages/subPack/page/me/myResume/myResume"
				} else {
					navgetTo = "/pages/subPack/page/me/basicPerson/basicPerson"
				}
				uni.navigateTo({
					//没有编辑个人信息的位置跳转至编辑个人信息
					url: navgetTo
				})
			},
			favoriteClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/favoritePage/favoritePage?navTitle=收藏职位"
				})
			},
			postPositonClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/favoritePage/favoritePage?navTitle=职位投递"
				})
			},
			interviewClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/favoritePage/favoritePage?navTitle=面试职位"
				})
			},
			// jobIntentionClick() {
			// 	uni.navigateTo({
			// 		url: "/pages/subPack/page/me/jobIntentionPage/jobIntertionList/jobIntertionList"
			// 	})
			// },
			// attachedClick() {
			// 	uni.navigateTo({
			// 		url: "/pages/subPack/page/me/attachedResume/attachedResume"
			// 	})
			// },
			//推荐有奖
			awardClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/me/award/award"
				})
			},

			//人才顾问
			serverManClick() {
				this.serverManShow = true
			},

			//关注立臻
			focusClick() {
				let webUrl =
					"https://mp.weixin.qq.com/s?__biz=MzA4ODY4MTY3OQ==&mid=2247529946&idx=1&sn=31634f29685b1d9505405dd533924a23&chksm=9024487aa753c16cb3d425f7df710ac8079d586807218e48ec0c5d6a0b1c4e33d574513d33d3&scene=18&ascene=7&devicetype=android-33&version=28002392&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&session_us=gh_a0e5403c5ebe&countrycode=CN&exportkey=n_ChQIAhIQe2q4fV4eOaUu0OCv5WV%2F9BLmAQIE97dBBAEAAAAAAFlVIjx4BAAAAAAOpnltbLcz9gKNyK89dVj0cjn2kA1LWTLTYhz6ogggDmP1gilzxnLz54y0xeRVW3CsK%2FTiUHfv%2Ftpj1wW5tBFEQ%2FwMCfF2SmpvsW6jURqG16DRRVa1FSWrwUiXSeX70CfiPvef%2FQSMgyQpLs4pVBRAb%2FkuruqaKj17KEnC7HId0J946kSgfHkf9YVQsL9JYtVQMmPnpmNX%2FK9ZMQkjWfIVsU6q4pjs01yNtL0NoW%2Fpa4AC%2FNoTdW7h8pwFKT3Vtzz4wlE84J9F5wriKvpq%2FQEe&pass_ticket=nfhyCPLNvPR8XA7M%2F5sMvpEpCbu93JSol%2Fx%2FSIxMXbxlYOwgJHMea1gUFg%2FHpAyjLVqC6Mh%2ByXSAHBNvihHIag%3D%3D&wx_header=3"
				uni.navigateTo({
					url: "/pages/subPack/page/webView/webView?navTitle=企业介绍&url=" +
						encodeURIComponent(JSON.stringify(webUrl))
				})
			},

			async outLoginClick() {
				let res = await this.$personal.showMoalMsg("您确定要退出登录吗？")
				if (res) {
					this.$personal.setStorage("loginOut", true)
					this.loginOut = true
				}
			},
			//获取用户头像及姓名
			meInformation() {
				// this.wx_avatar = this.$personal.getStorage('avatar');
				// this.wx_avatar = this.$personal.config.baseImageUrl + "2023/userInfo_img/WechatIMG18.jpg"
				this.wx_nick_name = this.$personal.getStorage('nick_name')
				if (this.$personal.getStorage('nick_name') == "") {
					this.wx_nick_name = "微信用户"
				}
				if (this.$personal.getStorage('getResumeHaveOpenid') == true) {
					this.resumeLevel = "50%"
				} else {
					this.resumeLevel = "0%"
				}
			},
			open() {
				console.log('open');
			},
			close() {
				this.serverManShow = false
			},
			callPhoneClick() {
				uni.makePhoneCall({
					phoneNumber: this.telPhoneNum
				})
			}
		},
		onShow() {
			this.meInformation();
			this.resumeNumberUrl();
			this.collectionNumberUrl();
			this.getConsultant();
			this.getIsCollectByTel(); //获取当前是否处在收集资料状态
			this.getAvatarUrlByOpenid(); //获取头像的接口
		},
		onLoad() {
			this.getPositionInterviewResumeNumber();
			this.loginOut = uni.getStorageSync('loginOut');
		},
		mounted() {},
		onPageScroll(res) {
			if (res.scrollTop > 50) {
				this.navbar_bgColor = "#057CFF"
			} else {
				this.navbar_bgColor = "transparent"
			}
			uni.$emit('onPageScroll', res.scrollTop);
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}

	.navbar {
		opacity: 1;
	}

	.nav_backgound_image {
		width: 100%;
		height: 100px;
		position: fixed;
		top: 0;
	}

	.content {
		position: absolute;
		display: flex;
		flex-direction: column;
		margin-top: 100px;
		margin-bottom: 90px;
		width: 100%;

		.head {
			margin: 10px;
			margin: 10px;
			flex-direction: column;
			border-radius: 10px;

			.customerContent {
				border-radius: 10px 10px 0px 0px;
				display: flex;
				padding-left: 24rpx;
				padding-top: 20px;
				justify-content: space-between;
				height: 65px;
				background-color: white;

				.customer_left {
					display: flex;
					flex-direction: row;
					justify-content: start;
				}

				.customer_right {
					display: flex;
					width: 75px;
					height: 28px;
					background: linear-gradient(90deg, #057CFF 0%, #3BDCEE 100%);
					border-radius: 20px 0px 0px 20px;
					align-items: center;
					padding-left: 10px;
				}

				.customer_avatar {
					margin-left: 20px;
					background: none;
					border: none;

					.chooseBtn {
						background: none;
						height: auto;
						width: auto;
						padding: 0rpx 0rpx;
						margin: 0;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.chooseBtn::after {
						border: none;
					}
				}

				.customerName {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					padding-left: 20rpx;

					.btnStyle {
						font-size: 32rpx;
						font-family: PingFang SC;
						color: black;
						border: none;
						padding-bottom: 10px;
						background-color: transparent;

						&::after {
							border: none;
						}
					}

					text {
						padding-bottom: 20rpx;
					}
				}
			}

			.labelText {
				border-radius: 0px 0px 10px 10px;
				background-color: white;
				display: flex;
				justify-content: space-around;
				color: black;

				.collectLabel {
					display: flex;
					padding: 20px;
					flex-direction: column;
					align-items: center;

					text {
						padding: 8rpx;
					}
				}
			}
		}

		.me_image {
			height: 80px;
			margin: 10px;
		}

		.me_list {
			border-radius: 10px;
			margin: 10px;
			background-color: white;
		}

		// .labelSelected {
		// 	display: flex;
		// 	margin: 20rpx;
		// 	justify-content: space-around;

		// 	.attachedResume {
		// 		padding: 40rpx 80rpx;
		// 		background: white;
		// 		border-radius: 10px;
		// 		box-shadow: 0rpx 0rpx 16rpx 0rpx #D5DFEB;
		// 	}

		// 	.jobIntention {
		// 		padding: 40rpx 80rpx;
		// 		background: white;
		// 		border-radius: 10px;
		// 		box-shadow: 0rpx 0rpx 16rpx 0rpx #EEE5D5;
		// 	}
		// }
	}

	.serverManShow {
		display: flex;

		.popupShow {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 283px;

			.customer_server_avatar {
				position: relative;
				top: -45px;
				border-radius: 90px;
				opacity: 1;
				border: 5px solid black;
				z-index: 100;
			}

			.me_background_avatar {
				position: absolute;
				width: 100%;
				top: 0px;
				bottom: 0px;
				border-radius: 10px;
				z-index: 10;
			}

			.crow_server {
				display: flex;
				flex-direction: column;
				margin-top: -20px;
				z-index: 20;
			}

			.server_hrPosition {
				display: flex;
				flex-direction: column;
				text-align: center;
				margin-top: 20px;
				z-index: 20;

				.btn_call {
					display: flex;
					background: linear-gradient(270deg, #FFF5CF 0%, #FFC774 100%);
					justify-content: center;
					align-items: center;
					margin-top: 20px;
					height: 35px;
					width: 200px;
					border-radius: 35px;
					font-size: 12px;
				}
			}

			.titleSeverManImg {
				display: flex;
			}

			.titleSeverManImg-title {
				z-index: 99;
				margin-top: -30px;
				margin-bottom: 30px;
			}

			.peopleContent {
				display: flex;
				align-items: center;

				.peopleContent-text {
					padding-left: 20rpx;

					.peopleContent-text-name {
						padding-right: 10rpx;
					}

					view {
						padding-bottom: 10rpx;
					}
				}
			}

			.callPhone {
				padding-top: 30rpx;
				width: 460rpx;
			}
		}
	}

	.loginOut {
		padding: 0px 80px;
		margin-top: 35px;
	}
</style>