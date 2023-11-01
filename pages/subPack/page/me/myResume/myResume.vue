<template>
	<view>
		<u-navbar leftIconColor="white" class="navbar" :bgColor="navbar_bgColor" title="我的简历" titleStyle="color: white;"
			@leftClick="backClick"></u-navbar>
		<view class="nav_backgound_image">
			<u-image width="100%" :src="nav_backgound_image" mode="aspectFill"></u-image>
		</view>

		<view class="content_page">
			<view class="headView">
				<view class="left">
					<view class="left_name">
						<text style="font-size: 38rpx; color: #333333;">{{resume_information.userName}}</text>
						<text class="left_name_status"
							style="border: 1px solid #057CFF; color: #057CFF; font-size: 24rpx;">{{resume_information.status}}</text>
						<u-icon name="edit-pen" class="titleName" @click="editPersonClick" size="20"></u-icon>
					</view>
					<view class="personContent">
						<text>{{resume_information.gender}}</text>
						<u-line direction="col" color="#999999" length="15"></u-line>
						<text>{{resume_information.age}}岁</text>
						<u-line direction="col" color="#999999" length="15"></u-line>
						<text>{{resume_information.currentCity}}</text>
						<u-line direction="col" color="#999999" length="15"></u-line>
						<text>{{resume_information.education}}</text>
						<u-line direction="col" color="#999999" length="15"></u-line>
						<text>{{resume_information.workExperienceYear }}年工作经验</text>
					</view>

					<view class="personPhone">
						<text>{{resume_information.tel}}</text>
						<text>{{resume_information.email}}</text>
					</view>
				</view>
				<view class="right">
					<view class="customer_avatar">
						<u-avatar size="60" :src="wx_avatar"></u-avatar>
					</view>
				</view>
			</view>

			<!-- 简历详情信息 -->

			<!-- 求职意向 -->
			<view class="jobIntention">
				<view class="title">
					<mineTitleName :titleName="'求职意向'" :iconName="'plus-circle'" @editClick="jobIntentionClick"
						:addIconBool="addIconBool">
					</mineTitleName>
				</view>
				<view class="jobIntention_list" v-if="jobIntentionState">
					<view v-for="(item,index) in resume_expectation" :key="index" @click="expectationItem(index)">
						<view class="jobIntentionContent">
							<view class="left">
								<view class="jobText">
									<text class="name">职位：</text>
									<text class="content">{{resume_expectation[index].name}}</text>
								</view>
								<view class="jobText">
									<text class="name">工作地点：</text>
									<text class="content">{{resume_expectation[index].expectationCity }}</text>
								</view>
								<view class="jobText">
									<text class="name">期望薪资：</text>
									<text class="content">{{resume_expectation[index].expectationSalary}}</text>
								</view>
							</view>
							<view class="right">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="work_job_education">
				<!-- 工作经验 -->
				<view class="workExperience">
					<view class="title">
						<mineTitleName :titleName="'工作经验'" :iconName="'plus-circle'" @editClick="workExperienceClick">
						</mineTitleName>
					</view>
					<view class="workContent" v-if="workContentState">
						<view v-for="(item,index) in resume_work_experience" :key="index" @click="workContentClick(index)">
							<mineWorkContentList :companyName="resume_work_experience[index].companyName"
								:positionName="resume_work_experience[index].positionName"
								:entrydate="resume_work_experience[index].entrydate"
								:leavedate="resume_work_experience[index].leavedate" :content="resume_work_experience[index].content"
								:boolShow="true">
							</mineWorkContentList>
						</view>
					</view>
				</view>

				<!-- 项目经验 -->
				<view class="project">
					<view class="title">
						<mineTitleName :titleName="'项目经验'" :iconName="'plus-circle'" @editClick="projectClick"></mineTitleName>
					</view>
					<view class="projectContent" v-if="projectContentState">
						<view v-for="(item,index) in resume_project_experience" :key="index" @click="projectContentClick(index)">
							<mineWorkContentList :companyName="resume_project_experience[index].positionName"
								:positionName="resume_project_experience[index].pName"
								:entrydate="resume_project_experience[index].startTime"
								:leavedate="resume_project_experience[index].endTime"
								:content="resume_project_experience[index].pDescription" :boolShow="false"></mineWorkContentList>
						</view>
					</view>
				</view>

				<!-- 教育经历 -->
				<view class="experience">
					<view class="title">
						<mineTitleName :titleName="'教育经历'" :iconName="'plus-circle'" @editClick="experienceClick"
							:addIconBool="educationBool">
						</mineTitleName>
					</view>
					<view class="experienceContent" v-if="experienceContentState" @click="educationClick">
						<mineExperience :startDate="resume_education_experience.startTime"
							:endDate="resume_education_experience.endTime" :schoolName="resume_education_experience.schoolName"
							:majorName="resume_education_experience.majorName" :education="resume_education_experience.education">
						</mineExperience>
					</view>
				</view>
			</view>

			<!-- 个人优势及技能 -->
			<view class="work_job_advantage">
				<view class="skill">
					<view class="title">
						<mineTitleName :titleName="'工作技能'" :iconName="' '"></mineTitleName>
					</view>
					<view class="workSkill" style="background: #f4f7fc;">
						<view class="title">
							<mineTitleName :titleName="'专业技能'" :iconName="'plus-circle'" @editClick="workSkill1">
							</mineTitleName>
						</view>
						<view class="content">
							<view v-for="(item,index) in resume_profession_skill" :key="index">
								<u-tag :text=resume_profession_skill[index].skillName closable :show="show" @close="tagClick(index)" />
							</view>
						</view>
					</view>
					<view class="workSkill" style="background: #f4f7fc;">
						<view class="title">
							<mineTitleName :titleName="'语言能力'" :iconName="'plus-circle'" @editClick="workSkill2">
							</mineTitleName>
						</view>
						<view class="content">
							<view v-for="(item,index) in resume_language" :key="index">
								<u-tag :text=resume_language[index].type closable :show="show" @close="languageClick(index)" />
							</view>
						</view>
					</view>
					<view class="workSkill" style="background: #f4f7fc;">
						<view class="title">
							<mineTitleName :titleName="'获得证书'" :iconName="'plus-circle'" @editClick="workSkill3">
							</mineTitleName>
						</view>
						<view class="content">
							<view v-for="(item,index) in resume_awards_experience" :key="index">
								<u-tag :text=resume_awards_experience[index].awardName closable :show="show"
									@close="awardsClick(index)" />
							</view>
						</view>
					</view>
					<view class="workSkill" style="background: #f4f7fc;">
						<view class="title">
							<mineTitleName :titleName="'个人作品'" :iconName="'plus-circle'" @editClick="workSkill4">
							</mineTitleName>
						</view>
						<view class="workSkill_content">
							<u-upload :fileList="resume_person_work" @delete="deletePic" multiple
								:maxCount="resume_person_work.length"></u-upload>
						</view>
					</view>
				</view>
				<!-- 个人优势 -->
				<view class="advantage">
					<view class="title">
						<mineTitleName :titleName="'个人优势'" @editClick="advantageClick"></mineTitleName>
					</view>
					<view class="advantageContent" v-if="advantageContentState">
						<text user-select>{{resume_advantage.advantages}}</text>
					</view>
				</view>
			</view>

			<view class="add_resume">
				<view class="title">
					<mineTitleName :titleName="'上传附件简历'" :iconName="' '"></mineTitleName>
				</view>
				<view class="resume_empty" v-if="data.length == 0">
					<text>当前暂无附件简历</text>
				</view>
				<view v-for="(item,index) in data" :key="index">
					<view class="item">
						<u-cell-group :border="false">
							<u-cell title="个人简历.pdf" :label="item.fileSize" icon="/static/icons/attached.png" :border="false"
								size="large" isLink @click="browseClick(index)"></u-cell>
						</u-cell-group>
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
	</view>
</template>

<script>
	import mineExperience from "@/pages/subPack/page/components/mineExperience/mineExperience.vue"
	import mineTitleName from "@/pages/subPack/page/components/mineTitleName/mineTitleName.vue"
	import mineWorkContentList from "@/pages/subPack/page/components/mineWorkContentList/mineWorkContentList.vue"
	export default {
		data() {
			return {
				data: [],
				closeBut: false,
				navbar_bgColor: "transparent", //#057CFF,transparent
				nav_backgound_image: this.$personal.config.baseImageUrl + "/2023/wechat_me/me_resume_bg.png",
				advantageContentState: false,
				jobIntentionState: false,
				workContentState: false,
				projectContentState: false,
				experienceContentState: false,
				resume_information: {},
				resume_advantage: {},
				resume_expectation: [],
				resume_work_experience: [],
				resume_project_experience: [],
				resume_education_experience: [],
				resume_profession_skill: [],
				resume_language: [],
				resume_awards_experience: [],
				resume_person_work: [],
				addIconBool: false,
				educationBool: false,
				wx_avatar: "",
				show: true
			};
		},
		components: {
			mineExperience,
			mineTitleName,
			mineWorkContentList
		},
		methods: {
			//附件简历
			getResumeAttachment() {
				let data = {}
				console.log(data);
				this.$me_api.getResumeAttachment(data).then(res => {
					console.log('getResumeAttachment', res);
					this.data = res.data

					this.data.forEach(res => {
						res.fileSize = res.fileSize + "MB"
					})
					if (this.data.length > 0) {
						this.closeBut = true
					}
				})
			},

			//附件简历获取-删除
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
			//查看附件简历
			browseClick(e) {
				uni.navigateTo({
					url: "/pages/subPack/page/webView/webView?navTitle=附件简历&url=" + encodeURIComponent(JSON
						.stringify(this.$personal.config.baseImageUrl + this.data[e].url))
				})
			},
			//添加附件简历
			addAttachedClick() {
				if (this.data.length > 0) {
					this.$personal.msg("附件简历仅只能上传一个")
				} else {
					uni.navigateTo({
						url: "/pages/subPack/page/me/attachedResume/uploadAttached/uploadAttached"
					})
				}
			},
			//删除附件简历
			closeClick() {
				for (var i in this.data) {
					this.deleteResumeAttachment(this.data[i].id)
				}
			},

			backClick() {
				uni.navigateBack()
			},
			getOnlineResumeList() {
				let data = {}
				this.$me_api.getOnlineResumeList(data).then(res => {
					console.log('getOnlineResumeList == ', res);
					this.resume_information = res.data.resume_information[0]
					this.resume_advantage = res.data.resume_advantage[0]
					//储存简历姓名
					this.$personal.setStorage('nick_name', this.resume_information.userName)
					if (this.resume_information.gender == 1) {
						this.resume_information.gender = "男"
					} else {
						this.resume_information.gender = "女"
					}

					if (this.resume_advantage.advantages != "") {
						this.advantageContentState = true
					}
					this.resume_expectation = res.data.resume_expectation
					if (this.resume_expectation.length > 0) {
						this.jobIntentionState = true
						if (this.resume_expectation.length > 2) {
							this.addIconBool = true
						} else {
							this.addIconBool = false
						}
					}
					this.resume_work_experience = res.data.resume_work_experience
					if (this.resume_work_experience.length > 0) {
						this.workContentState = true
					}
					this.resume_project_experience = res.data.resume_project_experience
					if (this.resume_project_experience.length > 0) {
						this.projectContentState = true
					}
					this.resume_education_experience = res.data.resume_education_experience[0]
					if (res.data.resume_education_experience.length > 0) {
						this.educationBool = true
						this.experienceContentState = true
					}

					this.resume_profession_skill = res.data.resume_profession_skill
					this.resume_language = res.data.resume_language
					this.resume_awards_experience = res.data.resume_awards_experience
					this.resume_person_work = res.data.resume_person_work
					this.resume_person_work.forEach(item => {
						var imageUrl = this.$personal.config.baseImageUrl + item.url
						item.url = imageUrl
					})
					//个人作品
					this.getMinioFile(res.data.resume_person_work);

					switch (this.resume_information.status) {
						case 0:
							this.resume_information.status = "离职-考虑机会"
							break;
						case 1:
							this.resume_information.status = "在职-考虑机会"
							break;
						case 2:
							this.resume_information.status = "在职-不考虑机会"
							break;
					}
				})
			},

			//获取头像的接口
			getAvatarUrlByOpenid() {
				let data = {}
				this.$me_api.getAvatarUrlByOpenid(data).then(res => {
					this.wx_avatar = this.$personal.config.baseImageUrl + res.data
					console.log("获取头像的接口——getAvatarUrlByOpenid=", this.wx_avatar);
				})
			},

			//获取图片地址
			getMinioFile(e) {
				var imagelist = []
				e.forEach(item => {
					imagelist.push(item.url)
				})
				var item = imagelist.join(",");
				console.log(item)
				let data = {
					"bucketName": "zhenjob",
					"objectNames": item
				};
				this.$api.getMinioFile(data).then(res => {
					if (res.code == 200) {
						var datalist = []
						for (var i = 0; i < res.length; i++) {
							res[i] = 'data:image/png;base64,' + res[i]
							res[i] = res[i].replace(/[\r\n]/g, '');
							console.log("item.url===", res[i]);
							e[i].url = res[i]
						}
					}
				})
			},

			//删除专业技能接口
			deleteOnlineReSumeskill(e, index) {
				var resume_profession_skill = [{
					"id": e
				}]
				let data = {
					"data": {
						"resume_profession_skill": resume_profession_skill,
					},
				}
				console.log(data);
				this.$me_api.deleteOnlineReSumeskill(data).then(res => {
					console.log(res);
					if (res.data == true) {
						this.$personal.msg("删除成功", "success")
						this.resume_profession_skill.splice(index, 1)
					}
				})
			},
			//删除语言能力
			deleteOnlineResumeLanguage(e, index) {
				var resume_language = [{
					"id": e
				}]
				let data = {
					"data": {
						"resume_language": resume_language,
					},
				}
				console.log(data);
				this.$me_api.deleteOnlineResumeLanguage(data).then(res => {
					console.log(res);
					if (res.data == true) {
						this.$personal.msg("删除成功", "success")
						this.resume_language.splice(index, 1)
					}
				})
			},

			//删除获奖证书
			deleteOnlineReSumeAwards(e, index) {
				var resume_awards_experience = [{
					"id": e
				}]
				let data = {
					"data": {
						"resume_awards_experience": resume_awards_experience,
					},
				}
				console.log(data);
				this.$me_api.deleteOnlineReSumeAwards(data).then(res => {
					console.log(res);
					if (res.data == true) {
						this.$personal.msg("删除成功", "success")
						this.resume_awards_experience.splice(index, 1)
					}
				})
			},

			//删除个人作品图片
			deleteOnlineReSumePersonWork(index) {
				var resume_person_work = [{
					"id": index.file.id
				}]
				let data = {
					"data": {
						"resume_person_work": resume_person_work,
					},
				}
				console.log(data);
				this.$me_api.deleteOnlineReSumePersonWork(data).then(res => {
					console.log(res);
					if (res.data == true) {
						this.$personal.msg("删除成功", "success")
						this.resume_person_work.splice(index.index, 1)
					}
				})
			},

			editPersonClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/me/basicPerson/basicPerson?resume_information=" +
						encodeURIComponent(JSON
							.stringify(this.resume_information))
				})
			},
			advantageClick() {
				console.log("点击了个人优势按钮");
				//上传参数中有特殊字符（%，#，&）需手动过滤
				this.resume_advantage.advantages = this.$personal.encodeSpecialChar(this.resume_advantage.advantages);
				uni.navigateTo({
					url: "/pages/subPack/page/me/advantagePage/advantagePage?resume_advantage=" +
						encodeURIComponent(JSON
							.stringify(this.resume_advantage))
				})
			},
			jobIntentionClick() {
				console.log("点击了求职意向按钮");
				uni.navigateTo({
					url: "/pages/subPack/page/me/jobIntentionPage/jobIntentionPage?resume_information=" +
						encodeURIComponent(
							JSON
							.stringify(this.resume_information))
				})
			},
			expectationItem(e) {
				uni.navigateTo({
					url: "/pages/subPack/page/me/jobIntentionPage/jobIntentionPage?resume_information=" +
						encodeURIComponent(
							JSON.stringify(this.resume_information)) + "&resume_expectation=" + encodeURIComponent(
							JSON.stringify(this.resume_expectation[e])) + "&navTitle=编辑"
				})
			},
			workExperienceClick() {
				console.log("点击了工作经验按钮");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workExperiencePage/workExperiencePage?resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information)) + "&titleName=工作经验"
				})
			},
			workContentClick(e) {
				console.log("编辑了工作经验按钮");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workExperiencePage/workExperiencePage?resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information)) + "&resume_work_experience=" +
						encodeURIComponent(
							JSON.stringify(this.resume_work_experience[e])) + "&navTitle=编辑&titleName=工作经验"
				})
			},
			projectClick() {
				console.log("点击了项目经验按钮");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workExperiencePage/workExperiencePage?titleName=项目经验" +
						"&resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information))
				})
			},
			projectContentClick(e) {
				console.log("编辑了项目经验按钮");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workExperiencePage/workExperiencePage?titleName=项目经验&navTitle=编辑" +
						"&resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information)) +
						"&resume_project_experience=" +
						encodeURIComponent(
							JSON.stringify(this.resume_project_experience[e]))
				})
			},
			experienceClick() {
				console.log("点击了教育经历按钮");
				uni.navigateTo({
					url: "/pages/subPack/page/me/educationPage/educationPage?resume_information=" +
						encodeURIComponent(
							JSON
							.stringify(this.resume_information))
				})
			},
			educationClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/me/educationPage/educationPage?navTitle=编辑&resume_information=" +
						encodeURIComponent(
							JSON
							.stringify(this.resume_information)) + "&resume_education_experience=" +
						encodeURIComponent(
							JSON
							.stringify(this.resume_education_experience))
				})
			},
			workSkill1() {
				console.log("点击了专业技能");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workSkillPage/workSkillPage?titleName=专业技能&resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information))
				})
			},
			workSkill2() {
				console.log("点击了语言能力");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workSkillPage/workSkillPage?titleName=语言能力&resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information))
				})
			},
			workSkill3() {
				console.log("点击了获得证书");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workSkillPage/workSkillPage?titleName=获奖证书&resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information))
				})
			},
			workSkill4() {
				console.log("点击了个人作品");
				uni.navigateTo({
					url: "/pages/subPack/page/me/workSkillPage/IndividualWorkPage/IndividualWorkPage?resume_information=" +
						encodeURIComponent(JSON.stringify(this.resume_information))
				})
			},
			async tagClick(index) {
				console.log(index);
				const res = await this.$personal.showMoalMsg("您确定要删除该技能吗？")
				if (res) {
					console.log('用户点击确定');
					this.deleteOnlineReSumeskill(this.resume_profession_skill[index].id, index)
				}
				console.log(this.resume_profession_skill);
			},
			//删除语言能力
			async languageClick(index) {
				const res = await this.$personal.showMoalMsg("您确定要删除该语言能力吗？")
				if (res) {
					console.log('用户点击确定');
					this.deleteOnlineResumeLanguage(this.resume_language[index].id, index)
				}
			},

			//删除获奖证书
			async awardsClick(index) {
				const res = await this.$personal.showMoalMsg("您确定要删除该获奖证书吗？")
				if (res) {
					console.log('用户点击确定');
					this.deleteOnlineReSumeAwards(this.resume_awards_experience[index].id, index)
				}
			},

			//删除个人作品
			async deletePic(index) {
				console.log("删除个人作品 === ", index);
				const res = await this.$personal.showMoalMsg("您确定要删除该个人作品吗？")
				if (res) {
					console.log('用户点击确定');
					this.deleteOnlineReSumePersonWork(index)
				}
			},
		},
		onShow() {
			this.getOnlineResumeList();
		},
		mounted() {
			this.getAvatarUrlByOpenid();
			this.getResumeAttachment();
		},
		onPageScroll(res) {
			if (res.scrollTop > 50) {
				this.navbar_bgColor = "#057CFF"
			} else {
				this.navbar_bgColor = "transparent"
			}
			uni.$emit('onPageScroll', res.scrollTop);
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}

	.nav_backgound_image {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.content_page {
		position: absolute;
		margin-top: 120px;
		width: 100%;
	}

	.headView {
		display: flex;
		justify-content: space-between;
		padding-top: 10rpx;
		background-color: white;
		margin: 10px;
		border-radius: 10px;

		.left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 20rpx;

			.left_name {
				display: flex;
				align-items: center;

				.left_name_status {
					display: flex;
					padding: 5rpx 10rpx;
					margin: 0rpx 15rpx;
					border-radius: 8rpx;
				}
			}

			.personContent {
				display: flex;
				align-items: center;
				padding-top: 30rpx;

				text {
					color: #333333;
					padding: 0rpx 10rpx;
					font-size: 20rpx;
				}
			}

			.personPhone {
				padding-top: 20rpx;

				text {
					color: #333333;
					font-size: 28rpx;
					padding: 0rpx 10rpx;
				}
			}
		}

		.right {
			display: flex;
			align-items: center;
			padding-right: 20rpx;

			.customer_avatar {
				overflow: hidden;
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
			}
		}
	}

	.jobIntention {
		background-color: white;
		margin: 10px;
		border-radius: 10px;

		.jobIntention_list {
			display: flex;
			flex-direction: column;

			.jobIntentionContent {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				padding-bottom: 0rpx;
				align-items: center;

				.jobText {
					display: flex;
					padding: 10rpx;
					font-size: 28rpx;

					.name {
						color: #666666;
						width: 170rpx;
					}

					.content {
						width: 400rpx;

					}
				}
			}
		}
	}

	.work_job_education {
		margin: 10px;
		background-color: white;
		border-radius: 10px;
	}

	.work_job_advantage {
		border-radius: 10px;
		margin: 10px;
		background-color: white;

		.advantage {
			display: flex;
			flex-direction: column;

			.advantageContent {
				background: $uni-bg-color;
				padding: 20rpx;
				margin: 0rpx 20rpx;
				border-radius: 8px;
				margin-bottom: 10px;
			}
		}

		.skill {
			padding-bottom: 20rpx;

			.workSkill {
				margin: 20rpx;
				border-radius: 10px;

				.content {
					padding-bottom: 30rpx;
					padding-left: 30rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}

				.workSkill_content {
					padding-bottom: 30rpx;
					padding-left: 30rpx;
					display: flex;
					flex-wrap: wrap;

					.content_image {
						border-radius: 5px;
						padding-right: 15px;
						position: relative;
					}

					.content_close {
						top: 0px;
						right: 10px;
						position: absolute;
						z-index: 2;
					}
				}
			}
		}
	}

	.add_resume {
		margin: 10px;
		background-color: white;
		margin-bottom: 100px;
		border-radius: 10px;

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
			padding: 10px 20rpx;
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
	}
</style>