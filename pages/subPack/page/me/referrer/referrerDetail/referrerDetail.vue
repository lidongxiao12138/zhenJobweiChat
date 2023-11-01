<template>
	<view class="">
		<view class="header">
			<view class="head_right">
				<view class="head_Name">
					<text style="font-size: 38rpx; font-weight: bold;">{{dataRecommend.recommendName}}</text>
					<text style="color: #606266;">{{dataRecommend.tel}}</text>
				</view>
				<view class="head_company">
					<text style="font-size: 30rpx; color: #606266;">{{dataRecommend.name}}</text>
				</view>
			</view>
			<view class="head_left">
				<text class="head_left_text" style="font-size: 30rpx; color: #A2A7B0;">{{dataRecommend.status}}</text>
				<u-icon name="/static/icons/money.png" size="13" :label="dataRecommend.bonus" label-color="#FFA724"
					space="15rpx" label-size="17px"></u-icon>
			</view>
		</view>
		<view class="title">
			<text style="font-size: 35rpx; font-weight: bold;">返费记录</text>
		</view>
		<view class="foot">
			<view v-for="(item,index) in data" :key="index" class="foot_list">
				<view class="foot_right">
					<view class="foot_view">
						<text>第{{data[index].refundNum}}笔</text>
						<text style="color: #A2A7B0; font-size: 28rpx;">{{data[index].refundTime}}</text>
					</view>
					<view class="foot_dot">
						<view class="foot_dot_star"></view>
						<u-line dashed direction="col" margin="5px" length="50px"></u-line>
					</view>
				</view>
				<view class="foot_left">
					<view class="foot_left_money">
						<text>¥ {{data[index].singleMoney}}元</text>
					</view>
					<view>
						<text class="foot_left_status" v-if="data[index].status == '未发放'"
							style="background: #EEEEEE; color: #999999;">{{data[index].status}}</text>
						<text class="foot_left_status" v-else
							style="background: #0256FF; color: #0256FF;">{{data[index].status}}</text>
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
				data: [],
				dataRecommend: {}
			};
		},
		onLoad(option) {
			var data = JSON.parse(decodeURIComponent(option.data));
			console.log(data);
			this.dataRecommend = data
			this.getRecommenLog(data.recommendId, data.singleMoney)
		},
		methods: {
			getRecommenLog(id, singleMoney) {
				let data = {
					"recommendId": id,
					"singleMoney": singleMoney
				}
				this.$me_api.getRecommenLog(data).then(res => {
					console.log(res);
					this.data = res.data
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}

	.header {
		display: flex;
		justify-content: space-between;
		background: white;
		margin: 20rpx;
		padding: 25rpx;
		border-radius: 10px;

		.head_right {
			text {
				padding-right: 20rpx;
			}

			.head_company {
				padding-top: 15rpx;
			}
		}

		.head_left {
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.head_left_text {
				padding-bottom: 20rpx;
			}
		}
	}

	.title {
		padding: 25rpx;
		padding-top: 0rpx;
	}

	.foot {
		padding: 0rpx 30rpx;

		.foot_list {
			display: flex;

			.foot_right {
				display: flex;
				width: 55%;
				justify-content: flex-end;

				.foot_view {
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					text {
						padding-bottom: 20rpx;
					}
				}

				.foot_dot {
					padding: 10rpx 20rpx;

					.foot_dot_star {
						width: 24rpx;
						height: 24rpx;
						border-radius: 100px;
						border: 2rpx solid #CCCCCC;
					}
				}
			}

			.foot_left {
				display: flex;
				flex-direction: row;
				background: white;
				margin: 10rpx 0rpx;
				width: 100%;
				border-radius: 10px;
				padding: 10rpx;
				justify-content: space-between;

				.foot_left_money {
					display: flex;
					align-items: center;
					font-size: 20px;
					padding-left: 20rpx;
				}

				.foot_left_status {
					font-size: 13px;
					padding: 13rpx;
				}
			}
		}
	}
</style>