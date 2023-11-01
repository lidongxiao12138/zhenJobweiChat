<template>
	<view>
		<view class="father">
			<view class="resume_empty" v-if="data.length == 0">
				<text>当前暂无附件简历</text>
			</view>
			<view v-for="(item,index) in data" :key="index">
				<view class="item">
					<u-cell title="个人简历.pdf" label="243.9KB" icon="/static/icons/attached.png" size="large" isLin
						@click="browseClick(index)"></u-cell>
				</view>
			</view>

			<view class="footView">
				<view class="close" v-if="closeBut">
					<u-button shape="circle" class="close-but" :plain=true @click="closeClick">删除</u-button>
				</view>
				<view class="savebut">
					<u-button type="primary" shape="circle" @click="addAttachedClick">上传附件简历</u-button>
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
				closeBut: false
			};
		},
		methods: {
			getResumeAttachment() {
				let data = {}
				console.log(data);
				this.$me_api.getResumeAttachment(data).then(res => {
					console.log('getResumeAttachment', res);
					this.data = res.data
					if (this.data.length > 0) {
						this.closeBut = true
					}
				})
			},

			async deleteResumeAttachment(e) {
				var resume_attachment = [{
					"id": e,
				}]
				let data = {
					"data": {
						"resume_attachment": resume_attachment,
					},
				}
				console.log(data);
				await this.$me_api.deleteResumeAttachment(data).then(res => {
					console.log('deleteResumeAttachment', res);
					if (res.data == true) {
						this.data = []
						this.closeBut = false
					}
				})
			},

			browseClick(e) {
				uni.navigateTo({
					url: "/pages/subPack/page/webView/webView?navTitle=附件简历&url=" + encodeURIComponent(JSON
							.stringify(this.$personal.config.baseImageUrl + this.data[e].url)) 
				})
			},

			addAttachedClick() {
				if (this.data.length > 0) {
					this.$personal.msg("附件简历仅只能上传一个")
				} else {
					uni.navigateTo({
						url: "/pages/subPack/page/me/attachedResume/uploadAttached/uploadAttached"
					})
				}
			},
			closeClick() {
				for (var i in this.data) {
					this.deleteResumeAttachment(this.data[i].id)
				}
			}
		},
		onShow() {
			this.getResumeAttachment()
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}
	
	.resume_empty {
		padding: 20px;
	}

	.item {
		background: white;
		margin: 20rpx;
		border-radius: 10px;
	}

	.footView {
		display: flex;
		padding: 200rpx 20rpx;
		justify-content: center;

		.close {
			width: 50%;
			margin-right: 20px;

			.close-but {
				background-color: #EDEFF4;
			}
		}

		.savebut {
			width: 100%;
		}
	}
</style>