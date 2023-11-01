<template>
	<view>
		<view class="detail_head">
			<view class="head">
				<text>{{data.name}}</text>
			</view>
			<view class="type">
				<u-icon :label="data.mustExperience" name="/pages/subPack/page/static/home/company-fill.png"></u-icon>
				<view class="type_context">
					<u-line direction="col" color="#999999" length="15"></u-line>
				</view>
				<u-icon class="type_context" :label="data.mustEducation"
					name="/pages/subPack/page/static/home/xueli.png"></u-icon>
				<view class="type_context">
					<u-line direction="col" color="#999999" length="15"></u-line>
				</view>
				<u-icon class="type_context" :label="data.nature" name="/pages/subPack/page/static/home/zhiwei.png"></u-icon>
			</view>
			<view class="salaryRange">
				<text>{{data.salaryRange}}</text>
			</view>
		</view>

		<view class="card" @click="emoloyerClick(data.hrId)">
			<view class="left">
				<image :src="data.headImg" mode="scaleToFill"></image>
				<view class="title">
					<text>{{data.hrName}}</text>
					<text>{{data.hrPosition}}</text>
				</view>
			</view>
			<view class="right">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>

		<view class="position_about">
			<view class="positionDetail">
				<text class="headtitle">职位职责</text>
				<text class="content">{{data.jobDesc}}</text>
			</view>
			<view class="positionDetail">
				<text class="headtitle">职位要求</text>
				<text class="content">{{data.jobRequest}}</text>
			</view>

			<view class="welfare">
				<text>职位福利</text>
				<view class="welfareSelect">
					<customselection :tablist="welfareArr"></customselection>
				</view>
			</view>
		</view>
		<view class="company">
			<view class="companyCard" @click="companyClick">
				<view class="left">
					<image src="/pages/subPack/page/static/home/LuxsanLogo.jpeg" mode="scaleToFill"></image>
					<view class="title">
						<text style="font-size: 17px; font-weight: bold;">立臻科技（昆山）有限公司</text>
						<view class="text">
							<text>已上市</text>
							<u-line direction="col" color="#999999" length="15"></u-line>
							<text>10000人以上</text>
							<u-line direction="col" color="#999999" length="15"></u-line>
							<text>电子/半导体/集成电路</text>
						</view>
					</view>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>

			<view class="map" @click="companyClick">
				<image src="/pages/subPack/page/static/home/mapAddress.png" mode="scaleToFill"></image>
				<view class="map_address">
					<u-icon name="map-fill" label="江苏省苏州市昆山市第一大道168号"></u-icon>
				</view>
			</view>
		</view>

		<view class="withposition">
			<view class="position_about_you">
				<text>为你推荐</text>
			</view>
			<view class="joblistView">
				<view v-for="(item,index) in list" :key="index" class="list" @click="itemClick(list[index].id)">
					<joblist :titleName="list[index].name" :mustEducation="list[index].mustEducation"
						:mustExperience="list[index].mustExperience" :nature="list[index].nature" :place="list[index].place"
						:salaryRange="list[index].salaryRange" :welfare="listWelfareArr[index]" :hrName="list[index].hrName"
						:hrImg="list[index].headImg" :hrPosition="list[index].hrPosition">
					</joblist>
				</view>
			</view>
		</view>

		<view class="footView">
			<view class="footleft">
				<view>
					<button @click="collectClick" class="share" plain>
						<u-icon :name="collectIcon" size="26" label="收藏" label-pos="bottom" label-size="12px"></u-icon>
					</button>
				</view>
				<view>
					<button @click="share_showClick" class="share" plain>
						<u-icon label-size="12px" name="share-square" size="26" label="分享" label-pos="bottom"></u-icon>
					</button>
				</view>
			</view>
			<view class="footright">
				<view class="chat" @click="chatClick(data)">
					<text style="color: #057CFF;">聊一聊</text>
				</view>
				<view class="sendResume" @click="openMenu(data)">
					{{sendResume}}
				</view>
			</view>
		</view>

		<view :class="{popupShow:popupShow}">
			<u-popup :show="popupShow" @close="closeMenu">
				<view class="view">
					<view class="u-icon">
						<u-icon name="checkmark-circle-fill" color="#19C85F" label="投递成功" labelPos="bottom" size="126rpx"
							label-size="36rpx" space="33rpx">
						</u-icon>
					</view>
					<text style="background: #f4f7fc;">推荐职位</text>
					<view class="u-page">
						<scroll-view scroll-y="true">
							<view v-for="(item,index) in list" :key="index" class="list" @click="itemClick(list[index].id)">
								<joblist :titleName="list[index].name" :mustEducation="list[index].mustEducation"
									:mustExperience="list[index].mustExperience" :nature="list[index].nature" :place="list[index].place"
									:salaryRange="list[index].salaryRange" :welfare="listWelfareArr[index]" :hrName="list[index].hrName"
									:hrImg="list[index].headImg" :hrPosition="list[index].hrPosition"></joblist>
							</view>
						</scroll-view>
					</view>
				</view>
			</u-popup>
		</view>

		<view class="toast">
			<u-toast ref="uToast"></u-toast>
		</view>

		<u-transition :show="share_show">
			<view class="share_pop">
				<view class="share_pop_content">
					<image class="content_background" :src="share_background" mode="scaleToFill"></image>
					<view class="share_pop_card">
						<text style="color: #999999; font-size: 12px;">我们正在招聘</text>
						<text style="color: #3D3D3D; font-size: 20px; margin-top: 15px;">{{data.name}}</text>
						<text style="color: #057CFF; font-size: 20px; margin-top: 15px;">{{data.salaryRange}}</text>
						<view class="type">
							<u-icon :label="data.mustExperience" name="/pages/subPack/page/static/home/company-fill.png"></u-icon>
							<view class="type_context">
								<u-line direction="col" color="#999999" length="15"></u-line>
							</view>
							<u-icon class="type_context" :label="data.mustEducation"
								name="/pages/subPack/page/static/home/xueli.png"></u-icon>
							<view class="type_context">
								<u-line direction="col" color="#999999" length="15"></u-line>
							</view>
							<u-icon class="type_context" :label="data.nature"
								name="/pages/subPack/page/static/home/zhiwei.png"></u-icon>
						</view>

						<view class="share_pop_logo">
							<u-icon name="/pages/subPack/page/static/home/LuxsanLogo.jpeg" label="立臻科技（昆山）有限公司" label-color="#333333"
								size="20px" label-size="13px" space="10px"></u-icon>
						</view>
					</view>
				</view>

				<view class="share_pop_foot">
					<view class="weiChat">
						<button style="border-color: transparent;" :hairline="false" open-type="share" class="share" plain>
							<u-icon name="weixin-circle-fill" label="微信" space="10px" label-pos="bottom" color="#00DD7A"
								size="50px"></u-icon>
						</button>

						<view class="weiChat_line">
							<u-line color="#999999" length="100%"></u-line>
						</view>
						<view class="share_cancel" @click="shearcancelClick">
							取消
						</view>
					</view>
				</view>
			</view>
		</u-transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				share_background: this.$personal.config.baseImageUrl + "2023/wechat_home/home_detail_share.png",
				welfareArr: [],
				popupShow: false,
				share_show: false,
				data: {},
				list: [],
				listWelfareArr: [],
				collectBool: false,
				collectIcon: "star",
				collectId: "",
				sendResume: "投简历"
			};
		},
		methods: {
			//显示分享页面
			share_showClick() {
				this.share_show = true
			},
			shearcancelClick() {
				this.share_show = false
			},
			//点击了分享按钮
			onShareAppMessage(res) {
				return {
					title: this.data.name,
					path: '',
					imageUrl: ''
				}
			},
			//点击了搜藏按钮
			async collectClick() {
				if (uni.getStorageSync('loginOut') == true) {
					let res = await this.$personal.showMoalMsg("您当前没有登录，请到“我的”进行登录")
					if (res) {
						uni.switchTab({
							url: "/pages/me/me"
						})
					}
				} else {
					if (this.collectBool) {
						this.collectBool = false
						this.collectIcon = "star"
						this.deleteCollection();
					} else {
						this.collectBool = true
						this.collectIcon = "star-fill"
						this.addUserCollection();
					}
				}
			},

			//收藏职位
			async addUserCollection() {
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
						"positionId": this.data.id
					}
					console.log(data);
					this.$api.addUserCollection(data).then(res => {
						console.log('res ==', res);
						this.collectId = res.data
						if (res.code == 200) {
							this.$personal.msg("收藏成功", "success")
						}
					})
				}
			},

			deleteCollection() {
				let data = {
					"collectionId": this.collectId
				}
				console.log(data);
				this.$api.deleteCollection(data).then(res => {
					console.log('res ==', res);
					if (res.code == 200) {
						this.$personal.msg("收藏取消", "error")
					}
				})
			},

			//职位详情
			getOnePostionnDetail(option) {
				let data = {
					"id": option.id,
				};
				this.$api.getOnePostionnDetail(data).then(res => {
					console.log(res);
					this.collectId = res.data.collectId
					this.data = res.data.positionDetail[0];
					if (res.data.positionDetail.length > 0) {
						if (this.data.headImg !== null && this.data.headImg !== "") {
							this.data.headImg = this.$personal.config.baseImageUrl + this.data.headImg
						} else {
							this.data.headImg = this.$personal.config.defaultImage
						}
						if (this.data.welfare != null) {
							this.welfareArr = this.data.welfare.split(',');
						}
						this.getOnePostionRelation(this.data);
						if (this.collectId != "") {
							this.collectBool = true
							this.collectIcon = "star-fill"
						}
						if (res.data.sendId != "") {
							this.sendResume = "已投递"
						}
					}
				})
			},
			//相关职位
			getOnePostionRelation(option) {
				let data = {
					"category": option.category,
				}
				this.$api.getOnePostionRelation(data).then(res => {
					console.log(res.data);
					this.list = res.data;
					this.list.forEach(data => {
						if (data.headImg !== null && data.headImg !== "") {
							data.headImg = this.$personal.config.baseImageUrl + data.headImg
						} else {
							data.headImg = "/static/icons/touxiang5.png"
						}
					})
					var welArr = [];
					for (var i = 0; i < this.list.length; i++) {
						if (this.list[i].welfare != null) {
							welArr.push(this.list[i].welfare)
						}
					}
					for (var i = 0; i < welArr.length; i++) {
						this.listWelfareArr.push(welArr[i].split(','))
					}
				})
			},
			//投简历按钮
			async addUserSendResume(option) {
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
						"positionId": option.id,
						"hrId": option.hrId,
						"name": option.name
					}
					console.log(data);
					this.$api.addUserSendResume(data).then(res => {
						console.log('addUserSendResume == ', res);
						if (res.message == "success") {
							this.popupShow = true;
							this.sendResume = "已投递"
						} else {
							this.$u.toast(res.message)
						}
					})
				}
			},
			//立即聊
			async chatClick(e) {
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
						"hrId": e.hrId,
						"positionId": e.id
					}
					console.log(data);
					this.$api.addContact(data).then(res => {
						console.log('addContact == ', res);
						if (res.data == true) {
							var nameList = {
								myName: uni.getStorageSync('openid'),
								your: e.hrId,
								yourName: e.hrName,
								optionId: e.id,
							};
							console.log(nameList);
							uni.navigateTo({
								url: "/pages/subPack/page/news/chatroom/chatroom?username=" + JSON
									.stringify(
										nameList),
							});
						}
					});
				}
			},

			//hr详情
			emoloyerClick(hrId) {
				uni.navigateTo({
					url: "/pages/subPack/page/home/employerDeatil/employerDeatil?hrId=" + hrId,
				})
			},
			//公司详情
			companyClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/home/companyDetail/companyDetail",
				})
			},

			async openMenu(option) {
				if (uni.getStorageSync('loginOut') == true) {
					let res = await this.$personal.showMoalMsg("您当前没有登录，请到“我的”进行登录")
					if (res) {
						uni.switchTab({
							url: "/pages/me/me"
						})
					}
				} else {
					this.addUserSendResume(option);
				}
			},
			closeMenu() {
				this.popupShow = false;
			},
			itemClick(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/subPack/page/home/homelistdetail/homelistdetail?id=" + e,
				})
			},
		},
		mounted() {},
		onLoad: function(option) {
			this.getOnePostionnDetail(option);
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}

	.share_pop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;

		.share_pop_content {
			position: absolute;
			right: 20px;
			left: 20px;
			bottom: 230px;
			top: 60px;
			display: flex;
			justify-content: center;

			.content_background {
				border-radius: 10px;
				position: absolute;
				height: 100%;
				width: 100%;
			}

			.share_pop_card {
				position: absolute;
				border-radius: 10px;
				width: 80%;
				height: 50%;
				margin-top: 150px;
				background-color: white;
				display: flex;
				flex-direction: column;
				justify-content: start;
				padding: 20px;
				z-index: 100;

				.type {
					margin-top: 15px;
					font-size: 14px;
					display: flex;
					flex-direction: row;
					align-items: center;

					.type_context {
						margin: 0rpx 8px;
					}
				}

				.share_pop_logo {
					border-radius: 5px;
					margin-top: 60px;
					margin-bottom: 20px;
				}
			}
		}

		.share_pop_foot {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			height: 180px;
			border-radius: 10px 10px 0px 0px;
			background: white;

			.weiChat {
				margin: 20px;

				.weiChat_line {
					margin-top: 20px;
				}

				.share_cancel {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 40px;
					color: #999999;
					margin-top: 10px;
				}
			}
		}
	}

	.popupShow {
		overflow: hidden;
		position: fixed;
	}

	.view {
		background: white;
		width: 100%;
		height: 967rpx;
		border-radius: 10px;

		.u-icon {
			padding-top: 30rpx;
		}

		text {
			font-size: 36rpx;
			font-weight: bold;
			display: flex;
			padding: 10rpx 20rpx;
			margin-top: 40rpx;
		}

		.u-page {
			background: #f4f7fc;

			scroll-view {
				height: 600rpx;

				.list {
					margin: 20rpx;
					background: white;
					border-radius: 10px;
				}

			}
		}
	}

	.detail_head {
		background: white;
		margin: 10px;
		border-radius: 10px;

		.head {
			display: flex;
			flex-direction: column;
			justify-content: start;
			padding: 10px;
			font-weight: bold;

			text {
				font-size: 20px;
			}
		}

		.type {
			padding: 10px;
			font-size: 14px;
			display: flex;
			flex-direction: row;
			align-items: center;

			.type_context {
				margin: 0rpx 8px;
			}
		}

		.salaryRange {
			font-size: 20px;
			font-weight: bold;
			color: #0084FF;
			padding: 10px;
		}
	}

	.card {
		margin: 10px;
		background-color: white;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		opacity: 1;

		.left {
			display: flex;
			flex-direction: row;

			.title {
				display: flex;
				flex-direction: column;
				padding-left: 20rpx;
			}

			image {
				width: 50px;
				height: 50px;
			}
		}
	}

	.position_about {
		margin: 10px;
		background: white;
		border-radius: 10px;

		.positionDetail {
			display: flex;
			flex-direction: column;
			padding: 10px;

			.headtitle {
				font-size: 36rpx;
				font-weight: bold;
			}

			.content {
				padding-top: 15rpx;
				font-size: 13px;
			}
		}

		//职位福利
		.welfare {
			padding: 10px;

			text {
				font-size: 36rpx;
				font-weight: bold;
			}

			.welfareSelect {
				margin: 20rpx -20rpx;
			}
		}
	}

	.company {
		margin: 10px;
		background: white;
		border-radius: 10px;

		.companyCard {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 10px;

			.left {
				display: flex;
				flex-direction: row;

				.title {
					display: flex;
					flex-direction: column;
					padding-left: 20rpx;

					.text {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin: 0rpx -20rpx;
						padding-top: 10rpx;
						color: #606266;

						text {
							font-size: 24rpx;
							padding: 0rpx 20rpx;
						}
					}
				}

				image {
					width: 50px;
					height: 50px;
				}
			}
		}

		.map {
			margin: 0rpx 20rpx;

			.map_address {
				padding: 10px 0px;
			}

			image {
				width: 100%;
				height: 300rpx;
				margin-top: 10px;
				border-radius: 10rpx;
			}
		}
	}

	.withposition {
		margin: 10px;
		background: white;
		padding-bottom: 150px;
		border-radius: 10px;

		.position_about_you {
			padding: 10px;
			font-size: 36rpx;
			font-weight: bold;
		}

		.joblistView {
			.list {
				background: white;
				border-radius: 10px;
			}
		}
	}

	.footView {
		position: fixed;
		bottom: 0px;
		height: 130rpx;
		width: 100%;
		background: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.footleft {
			display: flex;
			align-items: center;

			.share {
				display: flex;
				flex-direction: column;
				border: none;
				box-sizing: border-box;
				margin-left: auto;
				padding-right: 10px;
				height: 50px;
				width: 58px;
			}
		}

		.footright {
			display: flex;
			margin: 0rpx 10px;
			color: white;

			.chat {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
				background: white;
				border: 1px solid #057CFF;
				border-radius: 30px;
				height: 35px;
				width: 100px;
			}

			.sendResume {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 120px;
				height: 35px;
				border-radius: 30px;
				background: linear-gradient(360deg, #057CFF 0%, #459EFF 99%);
			}
		}
	}
</style>