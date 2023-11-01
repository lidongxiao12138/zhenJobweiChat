<template>
	<view>
		<view class="mineWorkContentList">
			<view class="left">
				<view class="companyName">
					<text style="font-size: 28rpx; font-weight: bold;">{{companyName}}</text>
				</view>
				<view class="position" style="font-size: 28rpx;" v-if="boolShow">
					<view class="position_all">
						<view class="positionText">
							<text style="color: white;">岗位</text>
						</view>
						<view class="positionTab">
							<text style="color: #FF8B00;">{{positionName}}</text>
						</view>
					</view>
					<view class="positionDate">
						<text style="color: #999999; padding-left: 28rpx;">{{entrydate}}至{{leavedate}}</text>
					</view>
				</view>
				<view class="position1" v-else>
					<view class="position_all1">
							<text style="color: #FF8B00;">{{positionName}}</text>
							<text style="color: #999999; padding-left: 28rpx;">{{entrydate}}至{{leavedate}}</text>
					</view>
				</view>

				<view class="content">
					<text style="font-size: 28rpx; color: #606266;">{{content}}</text>
				</view>
			</view>
			<view class="right">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "mineWorkContentList",
		data() {
			return {

			};
		},
		props: {
			boolShow: {
				type: Boolean,
				default: true
			},
			companyName: {
				type: String,
				default: ""
			},
			positionName: {
				type: String,
				default: ""
			},
			entrydate: {
				type: String,
				default: ""
			},
			leavedate: {
				type: String,
				default: ""
			},
			content: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style lang="scss">
	.mineWorkContentList {
		padding: 20rpx;
		padding-left: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.companyName {
			padding-bottom: 10rpx;
		}

		.position {
			padding-bottom: 10rpx;
			display: flex;
			// flex-direction: column;

			.position_all {
				display: flex;
				height: 24px;
				text-align: center;
				border-radius: 8px 2px 8px 2px;
				border: 1px solid #FF8B00;

				.positionText {
					width: 40px;
					height: 24px;
					background: #FF8B00;
					border-radius: 8px 0px 0px 2px;
					opacity: 1;
					border: 1px solid #FF8B00;
				}

				.positionTab {
					text-align: center;
					padding: 0px 5px;
				}
			}
		}
		
		.content {
			margin-top: 8px;
		}
	}
</style>