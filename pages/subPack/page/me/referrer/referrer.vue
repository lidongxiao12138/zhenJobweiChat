<template>
	<view class="father">
		<view class="headView">
			<view class="left">
				<view class="people">
					<u-icon name="/pages/subPack/page/static/me/people.png" size="30"></u-icon>
				</view>
				<view class="titleText">
					<text style="font-size: 14px;">推荐人数</text>
					<text style="font-size: 20px; font-weight: bold; color: #057CFF;">{{recommendNum}}人</text>
				</view>
			</view>
			<view class="line">
				<u-line direction="col" color="#999999" length="30"></u-line>
			</view>

			<view class="right">
				<view class="money-all">
					<u-icon name="/pages/subPack/page/static/me/money_all.png" size="30"></u-icon>
				</view>
				<view class="titleText">
					<text style="font-size: 14px;">推荐费</text>
					<text style="font-size: 20px; font-weight: bold; color: #FFA724;">{{bonusNum}}元</text>
				</view>
			</view>
		</view>

		<view class="">
			<u-tabs :list="list1" @click="statusClick"></u-tabs>
		</view>

		<view v-for="(item,index) in data" :key="index" @click="detailClick(item)">
			<view class="list_item">
				<view class="item_left">
					<u-icon name="/pages/subPack/page/static/me/avatar.png" :label="item.recommendName" labelPos="bottom"
						size="45" space="10px"></u-icon>
					<text style="font-size: 13px;">{{item.tel}}</text>
				</view>
				<u-line direction="col" :dashed="true" color="#2979ff" length="80" margin="0px 0px 0px 20px"></u-line>
				<view class="item_right">
					<u-icon name="/pages/subPack/page/static/home/company-fill.png" space="10px" color="#057CFF"
						:label="item.name"></u-icon>
					<view class="item_money_bonus">
						<text style="color: #999999;">总计奖金</text>
						<text>{{item.bonus}}</text>
					</view>
					<view class="item_money_bonus">
						<text style="color: #999999;">已发放</text>
						<text style="color: #057CFF;">{{item.singleMoney}}</text>
					</view>
				</view>
				<view class="icon_arrow_right">
					<u-icon name="arrow-right"></u-icon>
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
				recommendNum: "",
				bonusNum: "",
				list1: [{
					name: "已入职"
				}, {
					name: "未入职"
				}],
				finish: [],
				nofinish: []
			};
		},
		methods: {
			statusClick(e) {
				this.data = []
				if (e.name == "已入职") {
					this.data = [...this.data, ...this.finish]
				} else {
					this.data = [...this.data, ...this.nofinish]
				}
				console.log(this.data);
			},
			getMyRecommendList() {
				let data = {}
				this.$me_api.getMyRecommendList(data).then(res => {
					console.log(res.data);
					res.data.forEach(res => {
						if (res.status == "已入职") {
							this.finish.push(res)
						} else {
							this.nofinish.push(res)
						}
					})
					this.data = this.finish
				})
			},

			//推荐总金额
			getRecommendBonusSum() {
				let data = {}
				this.$me_api.getRecommendBonusSum(data).then(res => {
					console.log('getRecommendBonusSum =', res);
					this.bonusNum = res.data[0].sum

				})
			},

			//推荐人数
			getRecommendNumberSum() {
				let data = {}
				this.$me_api.getRecommendNumberSum(data).then(res => {
					console.log('getRecommendNumberSum =', res);
					this.recommendNum = res.data[0].number
				})
			},
			detailClick(e) {
				console.log(e);
				uni.navigateTo({
					url: "referrerDetail/referrerDetail?data=" + encodeURIComponent(JSON.stringify(e))
				})
			}
		},
		onLoad() {
			this.getMyRecommendList()
			this.getRecommendBonusSum()
			this.getRecommendNumberSum()
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}

	.headView {
		display: flex;
		background: white;
		justify-content: space-around;
		align-items: center;
		padding: 20rpx;
		border-radius: 10px;
		margin: 20rpx;

		.left {
			display: flex;
			align-items: center;
		}

		.right {
			display: flex;
			align-items: center;
		}

		.titleText {
			display: flex;
			flex-direction: column;
			padding-left: 25rpx;
		}
	}

	.list_item {
		display: flex;
		padding: 10px;
		background-color: white;
		border-radius: 10px;
		margin: 10px;
		align-items: center;
		justify-content: space-between;

		.item_left {
			display: flex;
			flex-direction: column;
			width: 80px;
			align-items: center;

			text {
				margin-top: 10px;
			}
		}

		.item_right {
			display: flex;
			margin-left: 20px;
			flex-direction: column;
			width: 50%;
			height: 100px;
			justify-content: space-between;

			.item_money_bonus {
				display: flex;
				justify-content: space-between;
			}
		}

		.icon_arrow_right {
			margin-left: 30px;
		}
	}

	.list-item {
		background: white;
		padding: 30rpx 20rpx;
		margin: 20rpx;
		border-radius: 10px;

		.item {
			display: flex;
			justify-content: space-between;

			.item-left {
				display: flex;
				align-items: center;

				.titleText {
					display: flex;
					flex-direction: column;
					padding-left: 20rpx;

					.name-phone {
						padding-bottom: 10rpx;

						.name {
							padding-right: 10rpx;
						}
					}
				}
			}

			.item-right {
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.item-right-money {
					padding-top: 15rpx;
				}
			}
		}

		.item-footView {
			display: flex;
			margin-top: 20rpx;
			justify-content: space-between;
			align-items: center;
			background: #F4F7FC;
			padding: 10rpx 10rpx;

			text {
				padding: 0rpx 10rpx;
			}
		}
	}
</style>