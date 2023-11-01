<template>
	<view>
		<view class="upload">
			<!-- #ifdef H5 || MP-WEIXIN -->
			<view class="example-body">
				<uni-file-picker fileMediatype="all" :limit="1" mode="grid" @select="select"
					@progress="progress" @success="success" @fail="fail"></uni-file-picker>
			</view>
			<!-- #endif -->
			<text class="textState" style="color: #A2A7B0;">上传附件，如PDF、Word、JPG、PNG格式</text>
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
				fileValue: ""
			};
		},
		methods: {
			// 获取上传状态
			async select(e) {
				console.log('选择文件：', e)
				let lists = e.tempFilePaths
				this.fileValue = lists
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},

			async saveClick() {
				this.$personal.showLoading("正在上传")
				const result = await this.$personal.uploadFilePromise(this.fileValue[0],false)
				var data = JSON.parse(decodeURIComponent(result));
				if (data.message == "操作成功") {
					this.$personal.msg("上传成功","success")
					setTimeout(() => {
						uni.navigateBack();
					}, 1000)
				}else {
					this.$personal.msg(data.message)
				}				
			},
		},
	}
</script>

<style lang="scss">
	.upload {
		padding: 40rpx;
	}

	.savebut {
		margin: 0rpx 30rpx;
		padding-top: 50px;
		padding-bottom: 200rpx;
	}
</style>