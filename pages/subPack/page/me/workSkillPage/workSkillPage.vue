<template>
	<view>
		<view class="educationState">
			<text style="font-size: 17px;font-weight:bold; color: #A2A7B0;">{{workNameText}}</text>
			<view class="option">
				<input type="text" v-model="workSkillName" :placeholder="workNamePlaceholder" confirm-type="done" />
			</view>
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>
		<view class="">
			<view class="pickerTime">
				<text style="font-size: 17px;font-weight:bold; color: #A2A7B0;">{{workLevelText}}</text>
			</view>
			<view v-if="titleName == '专业技能'">
				<picker @change="levelPickerChange" :range="LevelArr">
					<view class="select">
						<text style="color: #A2A7B0;" v-if="level=='请选择'">{{level}}</text>
						<text style="color: black;" v-else>{{level}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
			</view>
			<view v-if="titleName == '语言能力'">
				<picker @change="levelPickerChange" :range="LevelArr">
					<view class="select">
						<text style="color: #A2A7B0;" v-if="level=='请选择'">{{level}}</text>
						<text style="color: black;" v-else>{{level}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
			</view>
			<view v-if="titleName == '获奖证书'">
				<pickerDate @bindDateChange="skillDate" :date="awardTime"></pickerDate>
			</view>
		</view>
		<view class="lineView" v-if="titleName != '获奖证书'">
			<u-line color="#A2A7B0"></u-line>
		</view>

		<view class="pickerTime" v-if="titleName == '语言能力'">
			<text style="font-size: 17px;font-weight:bold; color: #A2A7B0;">{{workLevel1Text}}</text>
			<view v-if="titleName == '语言能力'">
				<picker @change="levelPickerChange1" :range="LevelArr1">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="level1=='请选择'">{{level1}}</text>
						<text style="color: black;" v-else>{{level1}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
			</view>
		</view>
		<view class="lineView" v-if="titleName == '语言能力'">
			<u-line color="#A2A7B0"></u-line>
		</view>

		<view class="savebut">
			<u-button type="primary" shape="circle" @click="saveClick">保存</u-button>
		</view>
	</view>
</template>

<script>
	import pickerDate from "@/pages/subPack/page/components/pickerDate/pickerDate.vue"
	export default {
		data() {
			return {
				workNameText: "技能名称",
				workSkillName: "",
				workNamePlaceholder: "请输入您的技能名称",
				workLevelText: "掌握程度",
				workLevel1Text: "读写能力",
				LevelArr: ["普通", "熟练", "专精"],
				LevelArr1: ["普通", "熟练", "专精"],
				level: "请选择",
				level1: "请选择",
				titleName: "专业技能",
				resume_information: {},
				awardTime: "请选择"

			};
		},
		components: {
			pickerDate
		},
		onLoad(option) {
			if (JSON.stringify(option) != '{}') {
				var resume_information = JSON.parse(decodeURIComponent(option.resume_information));
				this.resume_information = resume_information
			}
			this.titleName = option.titleName
			if (this.titleName == "语言能力") {
				this.workNameText = "语种"
				this.workNamePlaceholder = "请输入您的语种名称"
				this.workLevelText = "听说能力"
			}
			if (this.titleName == "获奖证书") {
				this.workNameText = "证书名称"
				this.workNamePlaceholder = "请输入证书的名称"
				this.workLevelText = "获得证书时间"
			}
			uni.setNavigationBarTitle({
				title: this.titleName
			})
		},
		methods: {
			addOnlineResumeSkill() {
				var resume_profession_skill = [{
					"skillId": this.resume_information.skillId,
					"skillName": this.workSkillName,
					"level": this.level,
				}]
				let data = {
					"data": {
						"resume_profession_skill": resume_profession_skill,
					},
				}
				console.log(data);
				this.$me_api.addOnlineResumeSkill(data).then(res => {
					console.log('addOnlineResumeSkill=', res);
					if (res.data == true) {
						uni.navigateBack();
					}
				})
			},
			//添加语言能力
			addOnlineResumeLanguage() {
				var resume_language = [{
					"languageId": this.resume_information.languageId,
					"type": this.workSkillName,
					"listenSpeak": this.level,
					"readWrite": this.level1,
				}]
				let data = {
					"data": {
						"resume_language": resume_language,
					},
				}
				console.log(data);
				this.$me_api.addOnlineResumeLanguage(data).then(res => {
					console.log('addOnlineResumeLanguage=', res);
					if (res.data == true) {
						uni.navigateBack();
					}
				})
			},

			//添加获奖证书
			addOnlineReSumeAwards() {
				var resume_awards_experience = [{
					"awardsId": this.resume_information.awardsId,
					"awardName": this.workSkillName,
					"awardTime": this.awardTime,

				}]
				let data = {
					"data": {
						"resume_awards_experience": resume_awards_experience,
					},
				}
				console.log(data);
				this.$me_api.addOnlineReSumeAwards(data).then(res => {
					console.log('addOnlineReSumeAwards=', res);
					if (res.data == true) {
						uni.navigateBack();
					}
				})
			},
			skillDate(date) {
				console.log("获奖时间", date);
				this.awardTime = date
			},
			levelPickerChange: function(e) {
				this.level = this.LevelArr[e.detail.value]
			},
			levelPickerChange1: function(e) {
				this.level1 = this.LevelArr1[e.detail.value]
			},
			saveClick() {
				if (this.titleName == "专业技能") {
					if (this.workSkillName != "" && this.level != "请选择") {
						this.addOnlineResumeSkill()
					} else {
						this.$personal.msg("请您填写完整后点击保存", "error");
					}
				}
				if (this.titleName == "语言能力") {
					if (this.workSkillName != "" && this.level != "请选择" && this.level1 != "请选择") {
						this.addOnlineResumeLanguage();
					} else {
						this.$personal.msg("请您填写完整后点击保存", "error");
					}
				}
				if (this.titleName == "获奖证书") {
					if (this.workSkillName != "" && this.awardTime != "请选择") {
						this.addOnlineReSumeAwards();
					} else {
						this.$personal.msg("请您填写完整后点击保存", "error");
					}
				}
			}
		},

	}
</script>

<style lang="scss">
	.educationState {
		padding: 40rpx;
	}

	.option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
	}

	.select {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx;
		padding-top: 0rpx;
	}

	.pickerTime {
		padding-top: 50rpx;
		padding: 40rpx;
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