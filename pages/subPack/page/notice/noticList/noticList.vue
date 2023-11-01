<template>
	<view>
		<view class="notice_list">
			<view v-for="(item,index) in data" :key="index" class="list" @click="listClick(index)">
				<view class="notice_list_left">
					<view class="notice_list_left_image">
						<image src="../../static/home/LuxsanLogo.jpeg" style="width: 70px; height: 70px;" mode="">
						</image>
					</view>
					<view class="notice_list_left_text">
						<text style="font-size: 18px;">{{data[index].name}}</text>
						<text style="font-size: 13px; color: #A2A7B0;">{{data[index].place}}</text>
					</view>
				</view>
				<view class="notice_list_right">
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
				titleName: "",
				data: []
			};
		},
		onLoad(option) {
			this.titleName = option.titleName;
			if (option.titleName == "面试通知") {
				this.getInterviewNotice()
			} else {
				this.getReportNotice()
			}
			uni.setNavigationBarTitle({
				title: this.titleName,
			})
		},
		methods: {
			//报到通知
			getReportNotice() {
				let data = {}
				this.$api.getReportNotice(data).then(res => {
					console.log('getReportNotice ====', res);
					this.data = res.data
				})
			},
			//面试通知
			getInterviewNotice() {
				let data = {}
				this.$api.getInterviewNotice(data).then(res => {
					console.log('getInterviewNotice====', res);
					this.data = res.data
					this.data.reportTime = res.data.interviewTime


				})
			},
			listClick(e) {
				console.log(e);
				if (this.titleName == "面试通知") {
					uni.navigateTo({
						url: "/pages/subPack/page/notice/intNotice/intNotice?titleName=面试通知&data=" + encodeURIComponent(JSON
							.stringify(this.data[e])),
					})
				} else {
					uni.navigateTo({
						url: "/pages/subPack/page/notice/intNotice/intNotice?titleName=报到通知&data=" + encodeURIComponent(JSON
							.stringify(this.data[e])),
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}

	.list {
		display: flex;
		justify-content: space-between;
		background: white;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx;

		.notice_list_left {
			display: flex;

			.notice_list_left_text {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 10rpx;
			}
		}

		.notice_list_right {
			display: flex;
		}
	}
</style>