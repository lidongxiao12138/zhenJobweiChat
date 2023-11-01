<template>
	<view class="father">
		<view class="headImage">
			<u-image :src=imagesrc width="100%" height="300rpx"></u-image>
		</view>
		<view class="title">
			<text style="font-size: 36rpx; font-weight: bold; padding: 20rpx 0rpx;">{{title}}</text>
			<text style="font-size: 32rpx; color: #606266;">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "noticeList",
		data() {
			return {

			};
		},
		props: {
			imagesrc: "",
			title: ""
		}
	}
</script>

<style lang="scss">
	.father {

		.title {
			padding: 20rpx;
			background: white;
			display: flex;
			flex-direction: column;
			border-radius: 10px;
		}
	}
</style>