<template>
	<view>
		<view class="jobIntention" style="background: #f4f7fc;">
			<text class="title_name">工作职位</text>
			<!-- 求职意向 -->
			<view class="position" style="background: white;">
				<picker :range="position" @change="positionChange" style="font-size: 30rpx;">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="positionText=='请选择求职意向'">{{positionText}}</text>
						<text style="color: black;" v-else>{{positionText}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
			</view>
			<!-- 工作城市 -->
			<text class="title_name">工作城市</text>
			<view class="position" style="background: white;">
				<picker :range="city" @change="cityChange" style="font-size: 30rpx;">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="cityText=='请选择工作城市'">{{cityText}}</text>
						<text style="color: black;" v-else>{{cityText}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
			</view>
			<!-- 期望薪资 -->
			<text class="title_name">期望薪资</text>
			<view class="salary" style="background: white;">
				<view class="option" @click="salaryClick">
					<text style="color: #A2A7B0;" v-if="salaryText=='请选择期望薪资'">{{salaryText}}</text>
					<text style="color: black;" v-else>{{salaryText}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @change="changeHandler"
					@cancel="cancel"></u-picker>





				<!-- 			<picker :range="salary" @change="salaryChange">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="salaryText=='请选择期望薪资'">{{salaryText}}</text>
						<text style="color: black;" v-else>{{salaryText}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker> -->
			</view>

			<view class="footView">
				<view class="close" v-if="closeBut">
					<u-button shape="circle" class="close-but" :plain=true @click="closeClick">删除</u-button>
				</view>
				<view class="savebut">
					<u-button type="primary" shape="circle" @click="saveClick">保存</u-button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	const salaryMax = 50
	const salaryMin = 3
	export default {
		data() {
			return {
				show: false,
				city: [],
				cityText: "请选择工作城市",
				position: [],
				positionText: "请选择求职意向",
				salary: [],
				salaryText: "请选择期望薪资",
				closeBut: false,
				positionId: "",
				positionIdArr: [],
				expectationId: "",
				expectationIdArr: [],
				resume_expectation: {},
				columns: [],
				columnData: [],
			};
		},
		onLoad(option) {
			if (JSON.stringify(option) != '{}') {
				var resume_information = JSON.parse(decodeURIComponent(option.resume_information));
				this.expectationId = resume_information.expectationId
				console.log(resume_information);
			}
			this.getPostionNameList();
			this.getPostionPlaceList();
			if (option.navTitle == "编辑") {
				this.closeBut = true;
				var resume_expectation = JSON.parse(decodeURIComponent(option.resume_expectation));
				this.resume_expectation = resume_expectation
				this.cityText = resume_expectation.expectationCity
				this.positionText = resume_expectation.name
				this.salaryText = resume_expectation.expectationSalary
				this.positionId = resume_expectation.positionId
			}

			//设计期望薪资区间
			this.salarySection()

		},
		methods: {
			//添加保存求职意向
			addOnlineResumeExpectation() {
				var resume_expectation = [{
					"expectationCity": this.cityText,
					"expectationSalary": this.salaryText,
					"positionId": this.positionId,
					"expectationId": this.expectationId
				}]
				if (this.closeBut) {
					Object.assign(resume_expectation[0], {
						"id": this.resume_expectation.id
					})
				}
				let data = {
					"data": {
						"resume_expectation": resume_expectation,
					},
				}
				console.log(data);
				if (this.closeBut) {
					//更新
					this.$me_api.updateOnlineResumeExpectation(data).then(res => {
						console.log('updateOnlineResumeExpectation', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				} else {
					//添加
					this.$me_api.addOnlineResumeExpectation(data).then(res => {
						console.log('addOnlineResumeExpectation', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				}
			},
			//删除求职意向
			deleteOnlineResumeExpectation() {
				var resume_expectation = [{
					"id": this.resume_expectation.id,
				}]
				let data = {
					"data": {
						"resume_expectation": resume_expectation,
					},
				}
				console.log(data);
				this.$me_api.deleteOnlineResumeExpectation(data).then(res => {
					console.log('deleteOnlineResumeExpectation', res);
					if (res.data == true) {
						uni.navigateBack();
					}
				})
			},
			//职位表单列表
			getPostionNameList() {
				let data = {}
				this.$api.getPostionNameList(data).then(res => {
					console.log(res.data);
					for (var i in res.data) {
						this.position.push(res.data[i].name)
						this.positionIdArr.push(res.data[i].id)
					}
				})
			},
			//工作城市列表
			getPostionPlaceList() {
				let data = {}
				this.$api.getPostionPlaceList(data).then(res => {
					console.log(res.data);
					for (var i in res.data) {
						this.city.push(res.data[i].place)
					}
				})
			},
			cityChange: function(e) {
				this.cityText = this.city[e.detail.value]
			},
			positionChange: function(e) {
				this.positionText = this.position[e.detail.value]
				this.positionId = this.positionIdArr[e.detail.value]
			},
			//期望薪资区间
			salarySection() {
				var salaryStart1 = ["面议"]
				var salaryStart = []
				salaryStart.push("面议")
				for (var i = salaryMin; i < salaryMax; i++) {
					salaryStart.push(i + "K")
				}
				this.columns.push(salaryStart)
				this.columns.push(salaryStart1)

				var salaryEnd = ["面议"]
				this.columnData.push(salaryEnd)

				for (var i = 1; i <= salaryMax + 1; i++) {
					var start = parseInt(salaryStart[i] + 1)
					this.columnDataSalaryEnd(start)
				}

			},

			columnDataSalaryEnd(e) {
				var salaryEnd1 = []
				if (e <= salaryMax) {
					for (var i = e + 1; i <= salaryMax; i++) {
						salaryEnd1.push(i + "K")
					}
					this.columnData.push(salaryEnd1)
				}
			},
			salaryClick() {
				this.show = true
			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				if (e.value[0] == "面议") {
					this.salaryText = "面议"
				}else {
					this.salaryText = e.value[0] + "-" + e.value[1]
				}
				this.show = false
			},

			cancel() {
				this.show = false
			},

			saveClick() {
				if (this.expectationId != "" && this.positionId != "" && this.cityText != "请选择工作城市" && this.salaryText !=
					"请选择期望薪资") {
					this.addOnlineResumeExpectation();
				} else {
					this.$personal.msg("请完善求职意向后保存", "error")
				}
			},
			closeClick() {
				this.deleteOnlineResumeExpectation();
			},
		},

	}
</script>

<style lang="scss">
	.jobIntention {
		display: flex;
		flex-direction: column;
		position: fixed;
		right: 0px;
		left: 0px;
		height: 100%;
		padding: 20rpx;
		padding-top: 50rpx;
	}

	.title_name {
		font-size: 35rpx;
		padding: 10rpx;
	}

	.jobState {
		margin-bottom: 30rpx;
		border-radius: 10px;
	}

	.position {
		margin-bottom: 30rpx;
		border-radius: 10px;
	}

	.salary {
		border-radius: 10px;
	}

	.option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0rpx 20rpx;

		text {
			padding: 20rpx;
		}
	}

	.footView {
		display: flex;
		padding: 20rpx;
		padding-top: 200rpx;
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