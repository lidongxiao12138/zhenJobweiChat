<template>
	<view class="main">
		<u-empty mode="mode" icon="/pages/subPack/page/static/me/succeed_image.png">
			<text style="font-size: 20px; font-weight: bold;">提交成功</text>
			<text>感谢您的配合，资料已经提交审核审核通过后，我们将给您发放offer</text>
			<view>
				<button class="sureBtn" size="small" type="primary" @click="successClick">
					好的
				</button>
			</view>
		</u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			successClick() {
				uni.switchTab({
					url: "/pages/me/me"
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		padding: 20px;
		text-align: center;
		font-size: 16px;

		text {
			padding: 10px;
		}

		.sureBtn {
			// padding: 20px 70px;
			margin-top: 50px;
			width: 200px;
			height: 45px;
		}
	}
</style>