<template>
	<view class="father">
		<view class="submit">
			<view class="headView">
				<text>头像</text>
				<view class="customer_avatar">
					<u-avatar size="60" :src="wx_avatar"></u-avatar>
					<!-- 					<open-data type="userAvatarUrl"></open-data> -->
				</view>
			</view>
			<view class="customer">
				<text>*姓名</text>
				<view class="option">
					<u-input class="input" :value="wx_nick_name" v-model="wx_nick_name"></u-input>
					<!-- <text style="color: gray;">{{wx_nick_name}}</text> -->
				</view>
				<text>*手机号</text>
				<view class="option">
					<u-input class="input" style="color: gray;" :value="form_person.telText"
						v-model="form_person.telText"></u-input>
					<!-- <text style="color: gray;">{{form_person.telText}}</text> -->
				</view>
				<text>*性别</text>
				<view class="option">
					<customselection :tablist="genderArr" :locationindex="index" avtive="avtive" @itemclick="genderClick">
					</customselection>
				</view>
				<!-- <text>*微信号</text> -->
				<!-- <view class="option_input">
					<u-input class="input" placeholder="请输入您的微信号" :value="form_person.wechatNoText"
						@blur="wechatValueClick"></u-input>
				</view> -->
				<text>*出生年月</text>
				<view class="">
					<pickerDate @bindDateChange="birthDate" :date="form_person.birthDateText"></pickerDate>
				</view>
				<text>*学历</text>
				<picker mode="selector" :range="education" @change="educationChange">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="form_person.educationText=='请选择'">{{form_person.educationText}}</text>
						<text style="color: black;" v-else>{{form_person.educationText}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
				<view class="lineView">
					<u-line color="#A2A7B0"></u-line>
				</view>
				<text>*现居住地</text>
				<picker mode="region" :value="address" @change="addressChange">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="form_person.addressText=='请选择'">{{form_person.addressText}}</text>
						<text style="color: black;" v-else>{{form_person.addressText}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
				<view class="lineView">
					<u-line color="#A2A7B0"></u-line>
				</view>
				<text>*参加工作时间</text>
				<view class="pickerTime">
					<pickerDate @bindDateChange="workDate" :date="form_person.workDateText"></pickerDate>
				</view>
				<text>*求职状态</text>
				<picker mode="selector" :range="status" @change="statusChange">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="statusText=='请选择'">{{statusText}}</text>
						<text style="color: black;" v-else>{{statusText}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</picker>
				<view class="lineView">
					<u-line color="#A2A7B0"></u-line>
				</view>
				<text>邮箱</text>
				<view class="option_input">
					<u-input placeholder="请输入您的邮箱" :value="form_person.emailText" @blur="emailClick"></u-input>
				</view>
				<view class="lineView">
					<u-line color="#A2A7B0"></u-line>
				</view>
			</view>
			<view class="save" style="padding: 40rpx;">
				<u-button type="primary" shape="circle" @click="submitClick">保存</u-button>
			</view>
		</view>

	</view>
</template>

<script>
	import pickerDate from "@/pages/subPack/page/components/pickerDate/pickerDate.vue"
	export default {
		data() {
			return {
				genderArr: ["男", "女"],
				education: ["大专以下", "大专", "本科", "硕士", "博士"],
				address: [],
				status: ["离职-考虑机会", "在职-考虑机会", "在职-不考虑机会"],
				wx_avatar: "",
				wx_nick_name: "微信用户",
				gender: "1",
				form_person: {
					educationText: "请选择",
					addressText: "请选择",
					//出生年月
					birthDateText: "请选择",
					//工作开始时间
					workDateText: "请选择",
					//电话
					telText: "",
					emailText: "",
					wechatNoText: "",
					statusIndex: 0,
					indexIdText: "",
				},
				statusText: "请选择",
				index: 0,
			};
		},
		components: {
			pickerDate
		},
		onShow: function(options) {
			var obj = wx.getLaunchOptionsSync()
			console.log('启动小程序的路径:', obj.path)
			console.log('启动小程序的场景值:', obj.scene)
			console.log('启动小程序的 query 参数:', obj.query)
			console.log('启动小程序的 collectionId 值 = :', obj.query.collectionId)

			console.log('来源信息:', obj.shareTicket)
			console.log('来源信息参数appId:', obj.referrerInfo.appId)
			console.log('来源信息传过来的数据:', obj.referrerInfo.extraData)
		},
		onLoad(option) {

			this.form_person.telText = this.$personal.getStorage("phoneNumber");
			if (JSON.stringify(option) != '{}') {
				var resume_information = JSON.parse(decodeURIComponent(option.resume_information));
				console.log('option === ', resume_information);
				this.form_person.wechatNoText = resume_information.wechatNo
				this.form_person.birthDateText = resume_information.birthday
				this.form_person.educationText = resume_information.education
				this.form_person.addressText = resume_information.currentCity
				this.form_person.workDateText = resume_information.workStartTime
				this.statusText = resume_information.status
				this.form_person.emailText = resume_information.email
				this.form_person.indexIdText = resume_information.id
				this.wx_nick_name = resume_information.userName
				this.form_person.telText = resume_information.tel
			}
		},
		mounted() {
			this.getAvatarUrlByOpenid()
		},
		methods: {
			//获取头像的接口
			getAvatarUrlByOpenid() {
				let data = {}
				this.$me_api.getAvatarUrlByOpenid(data).then(res => {
					this.wx_avatar = this.$personal.config.baseImageUrl + res.data
					console.log("获取头像的接口——getAvatarUrlByOpenid=", this.wx_avatar);
				})
			},

			submitClick() {
				console.log("===========", this.wx_nick_name);
				if (this.form_person.educationText != "请选择" &&
					this.form_person.addressText != "请选择" &&
					this.form_person.birthDateText.length > 0 &&
					this.form_person.workDateText.length > 0 &&
					this.statusText != "请选择"
				) {
					this.addOnlineResume();
				} else {
					this.$personal.msg("请您完善信息后点击下一步", "error");
				}
			},
			//上传基础信息
			addOnlineResume() {
				//上传在线简历姓名
				this.$personal.setStorage('nick_name', this.wx_nick_name)
				var resume_information = [{
					"userName": this.wx_nick_name,
					"gender": this.gender,
					"birthday": this.form_person.birthDateText,
					"education": this.form_person.educationText == "请选择" ? "" : this.form_person.educationText,
					"currentCity": this.form_person.addressText == "请选择" ? "" : this.form_person.addressText,
					"workStartTime": this.form_person.workDateText,
					"tel": this.form_person.telText,
					"email": this.form_person.emailText,
					"wechatNo": this.form_person.wechatNoText,
					"status": this.form_person.statusIndex,
					"id": this.form_person.indexIdText
				}]
				console.log(resume_information);
				let data = {
					"data": {
						"resume_information": resume_information,
					},
				}
				console.log('data ===== ', data)
				this.$me_api.addOnlineResume2(data).then(res => {
					console.log('addOnlineResume2', res);
					if (res.data == true) {
						this.$personal.setStorage('getResumeHaveOpenid', res.data);
						uni.navigateBack();
					} else {
						this.$personal.msg(res.message)
					}
				})
			},
			wechatValueClick(e) {
				this.form_person.wechatNoText = e;
			},
			birthDate(date) {
				console.log("出生日期", date);
				this.form_person.birthDateText = date;
			},
			workDate(date) {
				console.log("参加工作时间", date);
				this.form_person.workDateText = date;
			},
			educationChange: function(e) {
				this.form_person.educationText = this.education[e.detail.value]
			},
			addressChange: function(e) {
				this.form_person.addressText = e.detail.value.join('-')
				console.log(this.addressText);
			},
			statusChange: function(e) {
				this.statusText = this.status[e.detail.value]
				this.form_person.statusIndex = e.detail.value
			},
			emailClick(e) {
				this.form_person.emailText = e;
			},
			genderClick(e) {
				this.index = e.index
				this.gender = e.index + 1
			}
		},
	}
</script>

<style lang="scss">
	.headView {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 40rpx;
		padding-bottom: 10rpx;
		align-items: center;

		.customer_avatar {
			overflow: hidden;
			width: 128rpx;
			height: 128rpx;
			border-radius: 50%;
		}
	}

	.customer {
		display: flex;
		flex-direction: column;

		.option {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0rpx 20rpx;

			input {
				margin: 20rpx;
			}
		}

		.option_input {
			display: flex;
			padding-left: 20rpx;
		}

		text {
			padding: 20rpx;
		}
	}

	.lineView {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-left: 40rpx;
	}
</style>