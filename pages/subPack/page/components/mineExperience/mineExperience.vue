<template>
	<view>
		<view class="mineExperience">
			<view class="left">
				<text style="color: #999999;">{{startDate}}至{{endDate}}</text>
				<text>{{schoolName}}</text>
				<view class="education">
					<text>{{education}}</text>
					<text style="color: #057CFF;">{{majorName}}</text>
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
		name: "mineExperience",
		data() {
			return {

			};
		},
		props: {
			education: {
				type: String,
				default: ""
			},
			startDate: {
				type: String,
				default: ""
			},
			endDate: {
				type: String,
				default: ""
			},
			schoolName: {
				type: String,
				default: ""
			},
			majorName: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style lang="scss">
	.mineExperience {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			padding-bottom: 0rpx;
			font-size: 14px;

			text {
				padding: 10rpx;
			}
			
			.education {
				display: flex;
			}
		}

		.right {
			padding: 20rpx;
		}
	}
</style>