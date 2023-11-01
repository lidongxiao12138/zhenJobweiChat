<template>
	<view>
		<view class="educationState" style="background: white;">
			<text style="font-size: 17px;font-weight:bold; color: #A2A7B0;">学历</text>
			<picker @change="educationPickerChange" :range="educationArr">
				<view class="option">
					<text style="color: #A2A7B0;" v-if="education=='请选择'">{{education}}</text>
					<text style="color: black;" v-else>{{education}}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</picker>
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>

		<view class="educationState">
			<text style="font-size: 17px;font-weight:bold; color: #A2A7B0;">学校名称</text>
			<view class="option">
				<input v-model="schoolName" type="text" placeholder="请输入您的学校名称" confirm-type="done" />
			</view>
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>

		<view class="educationState">
			<text style="font-size: 17px;font-weight:bold; color: #A2A7B0;">专业</text>
			<view class="option">
				<input v-model="majorName" type="text" placeholder="请输入您的专业名称" confirm-type="done" />
			</view>
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>
		<view class="educationState">
			<text style="display: flex; padding-bottom: 30rpx; color: #606266;">在校时间</text>
			<view class="option">
				<startToEndPickerDate :dateStart="startTimeText" :dateEnd="endTimeText"
					@bindDateChange="workStartDateChange" @bindDateEndChange="workEndDateChange"></startToEndPickerDate>
			</view>
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>
		<view class="savebut">
			<u-button type="primary" shape="circle" @click="saveClick">保存</u-button>
		</view>
	</view>
</template>

<script>
	import pickerDate from "@/pages/subPack/page/components/pickerDate/pickerDate.vue"
	import startToEndPickerDate from "@/pages/subPack/page/components/startToEndPickerDate/startToEndPickerDate.vue"
	export default {
		data() {
			return {
				educationArr: ["大专以下", "大专", "本科", "硕士", "博士"],
				education: "请选择",
				startTimeText: "入学时间",
				endTimeText: "毕业时间",
				schoolName: "",
				majorName: "",
				educationId: "",
				navTitle: "",
				id: ""
			};
		},
		components:{
			pickerDate,
			startToEndPickerDate
		},
		onLoad(option) {
			console.log(option);
			if (JSON.stringify(option) != '{}') {
				var resume_information = JSON.parse(decodeURIComponent(option.resume_information));
				this.educationId = resume_information.educationId
			}
			if (option.navTitle == "编辑") {
				this.navTitle = option.navTitle
				var resume_education_experience = JSON.parse(decodeURIComponent(option.resume_education_experience));
				this.education = resume_education_experience.education
				this.schoolName = resume_education_experience.schoolName
				this.majorName = resume_education_experience.majorName
				this.startTimeText = resume_education_experience.startTime
				this.endTimeText = resume_education_experience.endTime
				this.id = resume_education_experience.id
			}
		},
		methods: {
			//新增教育经历
			addOnlineResumeEducation() {
				var resume_education_experience = [{
					"educationId": this.educationId,
					"education": this.education,
					"schoolName": this.schoolName,
					"majorName": this.majorName,
					"startTime": this.startTimeText,
					"endTime": this.endTimeText,
				}]
				let data = {
					"data": {
						"resume_education_experience": resume_education_experience,
					},
				}
				console.log(data);
				if (this.navTitle == "编辑") {
					Object.assign(resume_education_experience[0], {
						"id": this.id
					})
					this.$me_api.updateOnlineResumeEducation(data).then(res => {
						console.log('updateOnlineResumeEducation=', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				} else {
					this.$me_api.addOnlineResumeEducation(data).then(res => {
						console.log('addOnlineResumeEducation=', res);
						if (res.data == true) {
							uni.navigateBack();
						}
					})
				}
			},
			educationPickerChange(e) {
				this.education = this.educationArr[e.detail.value]
			},
			workStartDateChange(e) {
				console.log(e);
				this.startTimeText = e
			},
			workEndDateChange(e) {
				this.endTimeText = e
			},

			saveClick() {
				this.addOnlineResumeEducation();
			}
		}
	}
</script>

<style lang="scss">
	.educationState {
		padding: 40rpx;

		.option {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20rpx;
		}
	}

	.lineView {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-left: 40rpx;
	}

	.savebut {
		margin: 0rpx 30rpx;
		padding-top: 50px;
		padding-bottom: 200rpx;
	}
</style>