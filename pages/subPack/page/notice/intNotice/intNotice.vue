<template>
	<view class="father">
		<image src="/pages/subPack/page/static/notic/bgImg.png" class="bgImg"></image>
		<view class="headView">
			<u-icon name="/static/icons/intNoticeIcon.png" size="60rpx" class="Icon" :label="headViewTitle"
				label-color="#FFFFFF" label-size="36rpx"></u-icon>
		</view>

		<view class="card">
			<u-image src="/pages/subPack/page/static/notic/cardBgImg.png" width="100%" :height="cardImgHeight">
			</u-image>
			<view class="companyContext">
				<view class="companyImg">
					<u-image src="/pages/subPack/page/static/home/LuxsanLogo.jpeg" width="150rpx"
						height="150rpx"></u-image>
				</view>
				<view class="companytext">
					<text style="font-size: 36rpx; font-weight: bold;">立臻科技(昆山)有限公司</text>
					<view class="companyPosition">
						<u-avatar :src="data.headImg" size="48rpx" class="headAvatar"></u-avatar>
						<text style="font-size: 30rpx;" class="positionName">{{data.hrName}}</text>
						<text style="font-size: 30rpx;">{{data.hrPosition}}</text>
					</view>
				</view>
			</view>

			<view class="positionContext">
				<view class="headtitle">
					<text style="font-size: 48rpx; font-weight: bold;">{{data.name}}</text>
				</view>

				<view class="interView">
					<view class="interContent">
						<text class="interTitle">{{interTimeName}}：</text>
						<text v-if="titleName == '报到通知'" class="interText">{{data.reportTime}}</text>
						<text v-if="titleName == '面试通知'" class="interText">{{data.interviewTime}}</text>
					</view>
					<view class="interContent">
						<text class="interTitle">联系人：</text>
						<text class="interText">{{data.hrName}}</text>
					</view>
					<view class="interContent">
						<text class="interTitle">联系方式：</text>
						<text class="interText">{{data.tel}}</text>
					</view>
					<view class="interContent">
						<text class="interTitle">{{interAddressName}}：</text>
						<text class="interText">{{data.place}}</text>
					</view>
					<view class="interContent">
						<text class="interTitle">备注：</text>
						<text class="interText">{{data.remark}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardImgHeight: "903rpx",
				titleName: "面试通知",
				headViewTitle: "面试邀请",
				interAddressName: "面试地点",
				interTimeName: "面试时间",
				data: {}
			};
		},
		onLoad(option) {
			this.titleName = option.titleName;
			if (option.titleName == "面试通知") {
				this.headViewTitle = "面试邀请";
			} else {
				this.headViewTitle = "报到邀请";
				this.interAddressName = "报到地点";
				this.interTimeName = "报到时间";
			}
			uni.setNavigationBarTitle({
				title: this.titleName,
			})
			if (JSON.stringify(option) != '{}') {
				var data = JSON.parse(decodeURIComponent(option.data));
				this.data = data
				console.log('data==', data);
			}
		}
	}
</script>

<style lang="scss">
	.father {
		.bgImg {
			position: fixed;
			top: 0;
			right: 0;
			z-index: -1;
			height: 100%;
			width: 100%;
		}

		.headView {
			padding: 70rpx 20rpx;
			padding-bottom: 0rpx;
		}

		.card {
			padding: 20rpx;

			.companyContext {
				position: absolute;
				margin-top: -903rpx;
				width: 100%;
				z-index: 999;
				display: flex;

				.companyImg {
					padding-top: 54rpx;
					padding-left: 20rpx;
				}

				.companytext {
					padding-top: 54rpx;
					padding-left: 20rpx;
					justify-content: space-between;

					.companyPosition {
						display: flex;
						align-items: center;
						padding-top: 50rpx;

						.positionName {
							padding-left: 10rpx;
						}
					}
				}
			}

			.positionContext {
				position: relative;
				margin-top: -595rpx;
				left: 20rpx;

				.headtitle {
					padding-bottom: 20rpx;
				}

				.interView {
					display: flex;
					flex-direction: column;
					align-items: center;

					.interContent {
						display: flex;
						flex-direction: row;
						align-items: center;
						width: 100%;
						padding: 10rpx;

						.interTitle {
							width: 170rpx;
						}

						.interText {
							margin-right: 40rpx;
							width: 70%;
						}
					}
				}
			}
		}
	}
</style>