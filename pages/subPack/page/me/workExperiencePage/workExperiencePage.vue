<template>
	<view>
		<view class="workAbout">
			<text style="display: flex; padding-bottom: 30rpx; color: #606266;">{{companyText}}</text>
			<input v-model="resume_work_experience.companyName" type="text" placeholder="请输入名称">
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>

		<view class="workAbout">
			<text style="display: flex; padding-bottom: 30rpx; color: #606266;">{{industryText}}</text>
			<input v-model="resume_work_experience.industryName" type="text" placeholder="请输入名称">
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>
		<view class="workAbout">
			<text style="display: flex; padding-bottom: 30rpx; color: #606266;">{{workTimeText}}</text>
			<view class="pickerTime">
				<startToEndPickerDate :dateStart="startTimeText" :dateEnd="endTimeText"
					@bindDateChange="workStartDateChange" @bindDateEndChange="workEndDateChange"></startToEndPickerDate>
			</view>
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>
		<view class="workAbout" v-if="positionBool">
			<text style="display: flex; padding-bottom: 30rpx; color: #606266;">职位名称</text>
			<picker mode="selector" :range="position" @change="positionChange">
				<view class="option">
					<text style="color: #A2A7B0;" v-if="positionText=='请选择'">{{positionText}}</text>
					<text style="color: black;" v-else>{{positionText}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</picker>
		</view>
		<view class="lineView" v-if="positionBool">
			<u-line color="#A2A7B0"></u-line>
		</view>


		<view class="workAbout">
			<text style="display: flex; padding-bottom: 30rpx; color: #606266;">{{workContentText}}</text>
			<view class="textarea">
				<u--textarea v-model="value2" placeholder="建议你对自己做一个说明，让HR快速了解你" height="400rpx" count maxlength=120
					class="u-textarea"></u--textarea>
			</view>
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

</template>

<script>
	import startToEndPickerDate from "@/pages/subPack/page/components/startToEndPickerDate/startToEndPickerDate.vue"
	export default {
		data() {
			return {
				value2: '',
				closeBut: false,
				position: [],
				positionText: "请选择",
				companyText: "公司名称",
				industryText: "所属行业",
				workTimeText: "工作时间",
				positionBool: true,
				workContentText: "工作内容",
				startTimeText: "入职时间",
				endTimeText: "离职时间",
				titleName: "工作经验",
				navTitle: "",
				resume_information: {},
				resume_work_experience: {
					companyName: "",
					industryName: "",
					positionName: "",
					entrydate: "",
					leavedate: "",
					content: "",
					id: ""
				},
			};
		},
		components: {
			startToEndPickerDate
		},
		onLoad: function(option) {
			console.log('option=', option);
			this.getPostionNameList();
			this.titleName = option.titleName
			if (JSON.stringify(option) != '{}') {
				var resume_information = JSON.parse(decodeURIComponent(option.resume_information));
				this.resume_information = resume_information
			}
			if (option.titleName == "项目经验") {
				this.companyText = "项目名称"
				this.industryText = "担任职位"
				this.workTimeText = "项目时间"
				this.startTimeText = "开始时间"
				this.endTimeText = "结束时间"
				this.positionBool = false
				this.workContentText = "项目内容"
			}
			if (option.navTitle == "编辑") {
				this.navTitle = option.navTitle
				this.closeBut = true
				if (JSON.stringify(option) != '{}') {
					if (option.titleName == "工作经验") {
						console.log("-------工作经验---------");
						var resume_work_experience = JSON.parse(decodeURIComponent(option.resume_work_experience));
						this.resume_work_experience.companyName = resume_work_experience.companyName
						this.resume_work_experience.industryName = resume_work_experience.industryName
						this.resume_work_experience.entrydate = this.startTimeText = resume_work_experience.entrydate
						this.resume_work_experience.leavedate = this.endTimeText = resume_work_experience.leavedate
						this.resume_work_experience.positionName = this.positionText = resume_work_experience
							.positionName
						this.value2 = resume_work_experience.content
						this.resume_work_experience.id = resume_work_experience.id
					} else if (option.titleName == "项目经验") {
						this.companyText = "项目名称"
						this.industryText = "担任职位"
						this.workTimeText = "项目时间"
						this.startTimeText = "开始时间"
						this.endTimeText = "结束时间"
						this.positionBool = false
						this.workContentText = "项目内容"
						var resume_project_experience = JSON.parse(decodeURIComponent(option
							.resume_project_experience));
						this.resume_work_experience.companyName = resume_project_experience.positionName
						this.resume_work_experience.industryName = resume_project_experience.pName
						this.resume_work_experience.entrydate = this.startTimeText = resume_project_experience
							.startTime
						this.resume_work_experience.leavedate = this.endTimeText = resume_project_experience.endTime
						this.value2 = resume_project_experience.pDescription
						this.resume_work_experience.id = resume_project_experience.id
					}
				}
			}
			uni.setNavigationBarTitle({
				title: this.titleName
			})
		},
		methods: {
			addOnlineResumeWorkExperience() {
				var resume_work_experience = [{
					"workId": this.resume_information.workId,
					"companyName": this.resume_work_experience.companyName,
					"industryName": this.resume_work_experience.industryName,
					"positionName": this.resume_work_experience.positionName,
					"entrydate": this.resume_work_experience.entrydate,
					"leavedate": this.resume_work_experience.leavedate,
					"content": this.value2
				}]
				let data = {
					"data": {
						"resume_work_experience": resume_work_experience,
					},
				}
				console.log(data);
				if (this.navTitle == "编辑") {
					Object.assign(resume_work_experience[0], {
						"id": this.resume_work_experience.id
					})
					this.$me_api.updateOnlineResumeWorkExperience(data).then(res => {
						console.log('updateOnlineResumeWorkExperience=', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				} else {
					this.$me_api.addOnlineResumeWorkExperience(data).then(res => {
						console.log('addOnlineResumeWorkExperience=', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				}
			},
			//删除工作经验
			deleteOnlineResumeWorkExperience() {
				var resume_work_experience = [{
					"id": this.resume_work_experience.id
				}]
				let data = {
					"data": {
						"resume_work_experience": resume_work_experience,
					},
				}
				this.$me_api.deleteOnlineResumeWorkExperience(data).then(res => {
					console.log('deleteOnlineResumeWorkExperience=', res);
					if (res.data == true) {
						uni.navigateBack();
					}
				})
			},
			//职位表单列表
			getPostionNameList() {
				let data = {}
				this.$api.getPostionNameList(data).then(res => {
					for (var i in res.data) {
						this.position.push(res.data[i].name)
					}
				})
			},

			//添加项目经验
			addOnlineResumeProjectExperience() {
				var resume_project_experience = [{
					"projectId": this.resume_information.projectId,
					"startTime": this.resume_work_experience.entrydate,
					"endTime": this.resume_work_experience.leavedate,
					"pName": this.resume_work_experience.industryName, //担任职位
					"positionName": this.resume_work_experience.companyName, //项目名称
					"pDescription": this.value2,
				}]
				let data = {
					"data": {
						"resume_project_experience": resume_project_experience,
					},
				}
				console.log(data);
				if (this.navTitle == "编辑") {
					Object.assign(resume_project_experience[0], {
						"id": this.resume_work_experience.id
					})
					this.$me_api.updateOnlineResumeProjectExperience(data).then(res => {
						console.log('updateOnlineResumeProjectExperience=', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				} else {
					this.$me_api.addOnlineResumeProjectExperience(data).then(res => {
						console.log('addOnlineResumeProjectExperience=', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				}
			},

			//删除项目经验
			deleteOnlineResumeProjectExperience() {
				var resume_project_experience = [{
					"id": this.resume_work_experience.id
				}]
				let data = {
					"data": {
						"resume_project_experience": resume_project_experience,
					},
				}
				this.$me_api.deleteOnlineResumeProjectExperience(data).then(res => {
					console.log('deleteOnlineResumeProjectExperience=', res);
					if (res.data == true) {
						uni.navigateBack();
					}
				})
			},

			positionChange: function(e) {
				this.positionText = this.position[e.detail.value]
				this.resume_work_experience.positionName = this.position[e.detail.value]
			},
			workStartDateChange: function(e) {
				console.log(e);
				this.startTimeText = e
				//工作经验-开始工作时间
				this.resume_work_experience.entrydate = e
			},
			workEndDateChange: function(e) {
				this.endTimeText = e
				//工作经验-结束工作时间
				this.resume_work_experience.leavedate = e
			},
			saveClick() {
				if (this.titleName == "工作经验") {
					if (this.resume_work_experience.companyName != "" &&
						this.resume_work_experience.industryName != "" &&
						this.resume_work_experience.positionName != "" &&
						this.resume_work_experience.leavedate != "" &&
						this.resume_work_experience.entrydate != "" &&
						this.value2 != "") {
						this.addOnlineResumeWorkExperience();
					} else {
						this.$personal.msg("请完善工作经验后保存", "error")
					}
				}

				if (this.titleName == "项目经验") {
					if (this.resume_work_experience.companyName != "" &&
						this.resume_work_experience.industryName != "" &&
						this.resume_work_experience.leavedate != "" &&
						this.resume_work_experience.entrydate != "" &&
						this.value2 != "") {
						this.addOnlineResumeProjectExperience();
					} else {
						this.$personal.msg("请完善项目经验后保存", "error")
					}
				}
			},
			closeClick() {
				if (this.titleName == "工作经验") {
					this.deleteOnlineResumeWorkExperience();
				}
				if (this.titleName = "项目经验") {
					this.deleteOnlineResumeProjectExperience();
				}

			}
		},
	}
</script>

<style lang="scss">
	.workAbout {
		padding: 30rpx;
		padding-top: 50rpx;

		.option {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.textarea {
			margin-bottom: 50rpx;

			.u-textarea {
				background: $uni-bg-color;
			}
		}
	}

	.footView {
		display: flex;
		padding: 50rpx 20rpx;
		padding-bottom: 180rpx;
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

	.lineView {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-left: 30rpx;
	}
</style>