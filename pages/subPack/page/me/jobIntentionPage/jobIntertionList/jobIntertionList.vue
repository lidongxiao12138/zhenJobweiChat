<template>
	<view>
		<view class="list">
			<view v-for="(item,index) in data.job_resume_expectation" :key="index">
				<view class="item" @click="itemClick(index)">
					<view class="item-right">
						<text style="font-size: 36rpx">{{data.job_resume_expectation[index].name}}</text>
						<!-- <text style="color: #0084FF;">{{data.job_resume_expectation[index].expectationSalary}}</text> -->
					</view>
					<view class="item-left">
						<u-icon :label="data.job_resume_expectation[index].expectationSalary" name="arrow-right" label-pos="left" label-color="#0084FF"></u-icon>
					</view>
				</view>
			</view>
			<view class="savebut">
				<u-button type="primary" shape="circle" @click="addIntertionClick">添加求职意向</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
			};
		},
		methods: {
			getPositionExpectationList() {
				let data = {}
				this.$me_api.getPositionExpectationList(data).then(res => {
					console.log(res.data);
					this.data = res.data

				})
			},
			itemClick(e) {
				let resume_information = {
					"expectationId": this.data.expectationId[0].expectationId
				}
				uni.navigateTo({
					url: "/pages/subPack/page/me/jobIntentionPage/jobIntentionPage?navTitle=编辑&resume_information=" +
						encodeURIComponent(
							JSON.stringify(resume_information)) + "&resume_expectation=" + encodeURIComponent(
							JSON.stringify(this.data.job_resume_expectation[e]))
				})
			},
			addIntertionClick() {
				let resume_information = {
					"expectationId": this.data.expectationId[0].expectationId
				}
				console.log('resume_information=', resume_information);
				uni.navigateTo({
					url: "/pages/subPack/page/me/jobIntentionPage/jobIntentionPage?resume_information=" + encodeURIComponent(
						JSON
						.stringify(resume_information))
				})
			}
		},
		onShow() {
			this.getPositionExpectationList();
		}
	}
</script>

<style lang="scss">
	.list {
		display: flex;
		flex-direction: column;
		position: fixed;
		right: 0px;
		left: 0px;
		height: 100%;
		padding: 20rpx;
		padding-top: 30rpx;
		background: $uni-bg-color;
	}

	.item {
		display: flex;
		justify-content: space-between;
		margin: 10rpx;
		border-radius: 10rpx;
		background: white;
		align-items: center;
		padding: 0rpx 20rpx;
		box-shadow: 0rpx 4rpx 20rpx 0rpx #E3EAF4;

		.item-right {
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			padding: 10rpx 0rpx;

			text {
				padding: 15rpx 0rpx;
			}
		}
	}

	.savebut {
		padding: 20rpx;
		padding-top: 200rpx;
	}
</style>