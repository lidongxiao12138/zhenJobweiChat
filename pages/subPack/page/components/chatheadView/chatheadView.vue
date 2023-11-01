<template>
	<view class="chatheadView">
		<view class="headView">
			<view class="sendPhone">
				<u-icon @click="sendPhoneClick" label="手机号" size="68" name="/static/icons/sendPhone.png"
					label-pos="bottom" space="-20rpx">
				</u-icon>
			</view>
			<view class="sendWeChat">
				<u-icon @click="sendWeChatClick" label="微信号" size="68" name="/static/icons/sendWeChat.png"
					label-pos="bottom" space="-20rpx">
				</u-icon>
			</view>
			<view class="sendResume">
				<u-icon @click="sendResumeClick" :label="sendresume" size="68" name="/static/icons/sendResume.png"
					label-pos="bottom" space="-20rpx">
				</u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "chatheadView",
		data() {
			return {};
		},
		props: {
			sendresume: {
				type: String,
				default: "发简历"
			}
		},
		methods: {
			sendPhoneClick() {
				this.$emit("sendPhoneClick")
			},
			sendWeChatClick() {
				this.$emit("sendWeChatClick")
			},
			sendResumeClick() {
				this.$emit("sendResumeClick")
			}
		}
	}
</script>

<style lang="scss">
	.headView {
		display: flex;
		flex-direction: row;
		position: fixed;
		justify-content: space-around;
		z-index: 999;
		background: white;
		height: 169rpx;
		width: 100%;
		box-shadow: 0rpx 2rpx 20rpx 0rpx #CDD4E2;

		.sendPhone {
			display: flex;
			flex-direction: column;
			text-align: center;
		}
	}
</style>