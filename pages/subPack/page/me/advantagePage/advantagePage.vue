<template>
	<view class="father">
		<view class="textarea">
			<u--textarea v-model="advantages" placeholder="建议你对自己做一个简短评价，让HR快速了解你" height="494rpx" count maxlength=240
				class="u-textarea"></u--textarea>
		</view>
		<view class="savebut">
			<u-button type="primary" shape="circle" @click="saveClick">保存</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				advantages: '',
				resume_advantage: {},
			};
		},
		onLoad(option) {
			if (JSON.stringify(option) != '{}') {
				var resume_advantage = JSON.parse(decodeURIComponent(option.resume_advantage));
				this.resume_advantage = resume_advantage
				if (resume_advantage.advantages != null) {
					this.advantages = resume_advantage.advantages
				}
			}
		},
		methods: {
			updateOnlineResumeAdvantage() {
				var resume_advantage = [{
					"id": this.resume_advantage.id,
					"advantages": this.advantages
				}]
				let data = {
					"data": {
						"resume_advantage": resume_advantage,
					},
				}
				console.log(data);
				this.$me_api.updateOnlineResumeAdvantage(data).then(res => {
					console.log('updateOnlineResumeAdvantage', res);
					if (res.message == "success") {
						uni.navigateBack();
					}
				})
			},
			saveClick() {
				this.updateOnlineResumeAdvantage();
			}
		},
	}
</script>

<style lang="scss">
	.father {
		.textarea {
			margin: 20rpx;
			margin-top: 50rpx;

			.u-textarea {
				background: $uni-bg-color;
			}
		}

		.savebut {
			margin: 20rpx;
			padding-top: 200rpx;
		}
	}
</style>