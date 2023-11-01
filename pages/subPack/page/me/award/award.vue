<template>
	<view>
		<view class="bgImg">
			<image src="/pages/subPack/page/static/me/bgaward.png" class="bgaward" mode="scaleToFill"></image>
		</view>
		<view>
			<image src="/pages/subPack/page/static/me/prizesAward.png" mode="aspectFit" class="prizesAward"></image>
		</view>
		<view class="information">
			<image src="/pages/subPack/page/static/me/awardTitle.png" mode="scaleToFill" class="awardTitle"></image>
			<text class="awardtext">被推荐人基本信息</text>
		</view>
		<view class="submit">

			<view class="uni-form-item">
				<input class="uni-input" placeholder="姓名" style="background: #F4F7FC;" v-model="inputName" />
			</view>

			<view class="uni-form-phone">
				<input class="uni-input" placeholder="电话" style="background: #F4F7FC;" v-model="inputPhone" />
			</view>

			<view class="uni-input" style="background: #F4F7FC;">
				立臻科技(昆山)有限公司
			</view>

			<view class="uni-form-position">
				<picker :range="position" @change="positionChange" style="font-size: 30rpx;">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="positionText=='请选择'">{{positionText}}</text>
						<text style="color: black;" v-else>{{positionText}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
			</view>

			<view class="message">
				<text style="font-size: 13px; color: #FFAA18;">温馨提醒：本岗位有推荐奖金哦 ！</text>
				<text style="font-size: 13px;">说明：本岗位系热招职位，成功推荐入职转正，有推荐奖金<text
						style="color:#FFAA18; font-size: 14px; font-weight: bold;">{{positionBonusText}}</text>元，再次感谢您的推荐！
				</text>
			</view>

			<uni-file-picker fileMediatype="all" :limit="1" mode="all" @select="select" @progress="progress"
				@success="success" @fail="fail">
				<view class="uploadResume">
					<u-button type="primary" shape="circle">上传附件简历</u-button>
				</view>
			</uni-file-picker>
			<view class="uni-btn-v">
				<u-button @click="saveClick" type="primary" shape="circle">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				position: [],
				positionIdArr: [],
				positionBonus: [],
				positionBonusText: "1000",
				positionId: "",
				positionText: "请选择",
				fileId: "",
				fileValue: "",
				inputName: "",
				inputPhone: ""
			};
		},
		onLoad() {
			this.getPostionNameList()
		},
		methods: {
			addRecommendRecord(formdata) {
				var job_recommend = [{
					"recommendName": this.inputName,
					"positionId": this.positionId,
					"tel": this.inputPhone,
					"fileId": this.fileId
				}]
				let data = {
					"data": {
						"job_recommend": job_recommend,
					},
				}
				console.log(data);
				this.$me_api.addRecommendRecord(data).then(res => {
					this.$personal.msg("推荐成功", "success")
					console.log(res);
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				})
			},
			saveClick() {
				if (this.inputName != "" && this.inputPhone != "" && this.positionId != "") {
					console.log("请完善基本信息后保存");
					this.uploadAwardFile()
				} else {
					this.$personal.msg("请完善基本信息后保存")
				}
			},
			async uploadAwardFile() {
				if (this.fileValue.length > 0) {
					this.$personal.showLoading("正在上传")
					const result = await this.$personal.uploadAwardFile(this.fileValue[0], false)
					var data = JSON.parse(decodeURIComponent(result));
					console.log('data ====', data);
					if (data.message == "操作成功") {
						this.fileId = data.fileId
						this.addRecommendRecord();
					} else {
						this.$personal.msg(data.message)
					}
				} else {
					this.addRecommendRecord();
				}
			},
			//职位表单列表
			getPostionNameList() {
				let data = {}
				this.$api.getPostionNameList(data).then(res => {
					console.log(res.data);
					for (var i in res.data) {
						this.position.push(res.data[i].name +'，'+ res.data[i].bonus)
						this.positionIdArr.push(res.data[i].id)
						this.positionBonus.push(res.data[i].bonus)
					}
				})
			},
			positionChange: function(e) {
				this.positionText = this.position[e.detail.value]
				this.positionId = this.positionIdArr[e.detail.value]
				this.positionBonusText = this.positionBonus[e.detail.value]
			},

			// 获取上传状态
			async select(e) {
				console.log('选择文件：', e)
				this.fileValue = e.tempFilePaths
			},
		}
	}
</script>

<style lang="scss">
	.bgImg {
		.bgaward {
			position: relative;
			width: 100%;
			height: 180px;
		}
	}

	.prizesAward {
		position: relative;
		margin-top: -200px;
		width: 100%;
	}

	.information {
		display: flex;
		flex-direction: column;
		align-items: center;

		.awardTitle {
			width: 50%;
			height: 70rpx;
			position: absolute;
			z-index: -1;
		}

		.awardtext {
			color: white;
			font-weight: bold;
			position: relative;
			top: 10rpx;
		}
	}

	.option {
		display: flex;
		justify-content: space-between;
		background: #F4F7FC;
		padding: 20rpx;
		margin-bottom: 30rpx;

	}

	.submit {
		padding: 40px 40rpx;

		.uni-input {
			padding: 20rpx;
			margin-bottom: 30rpx;
		}

		.message {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 0px 30rpx;
			margin-bottom: 50rpx;
		}

		.uploadResume {
			margin: 0rpx 80px;
			margin-bottom: 20rpx;
		}

		.resumeList {
			margin-bottom: 50rpx;

			.item {
				background: $uni-bg-color;
				border-radius: 10px;
				padding: 20rpx;
				display: flex;
				justify-content: space-between;

				.left {
					display: flex;

					.textContent {
						display: flex;
						flex-direction: column;
						padding-left: 20rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;

					.closeIcon {
						padding-right: 20rpx;
					}
				}
			}
		}
	}
</style>