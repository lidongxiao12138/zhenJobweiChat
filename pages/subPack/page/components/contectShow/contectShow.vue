<template>
	<view class="serverManShow">
		<u-popup :show="serverManShow" mode="center" @close="close" @open="open" round="10">
			<view class="popupShow">
				<image src="/static/icons/titleSeverMan.png" class="titleSeverManImg"></image>
				<text class="titleSeverManImg-title" style="color: white;">{{hrTelName}}</text>
				<view class="peopleContent">
					<u-avatar :src="contecthrAvatar"></u-avatar>
					<view class="peopleContent-text">
						<view>
							<text style="font-size: 15px; color: #057CFF;"
								class="peopleContent-text-name">{{contecthrName}}</text>
							<text style="font-size: 13px; color: #606266;">{{contecthrPosition}}</text>
						</view>
						<view>
							<text style="font-size: 15px; color: #939CAA;">{{contectTel}}</text>
						</view>
					</view>
				</view>
				<view class="callPhone">
					<u-button type="primary" shape="circle" @click="callPhoneClick">拨打电话</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "serverManShow",
		data() {
			return {

			};
		},
		props: {
			hrTelName: {
				type: String,
				default: "hr电话"
			},
			serverManShow: {
				type: Boolean,
				default: false
			},
			contecthrAvatar: "",
			contecthrName: "",
			contecthrPosition: "",
			contectTel: "",
		},
		methods: {
			callPhoneClick() {
				this.$emit("callPhoneClick")
			},
			open() {
				console.log('open');
			},
			close() {
				this.$emit("close")
			},
		}
	}
</script>

<style lang="scss">
	.serverManShow {
		display: flex;

		.popupShow {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 570rpx;
			height: 344rpx;

			.titleSeverManImg {
				margin-top: -15rpx;
				width: 351rpx;
				height: 70rpx;
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
</style>