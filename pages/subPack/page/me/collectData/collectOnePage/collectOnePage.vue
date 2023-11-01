<template>
	<view class="main">
		
		<u-alert v-if='cancelRemark !== null && cancelRemark !== "null"' title="收集资料!!!驳回理由" type="error" effect="dark" :description="cancelRemark"></u-alert>
		
		<stepsCollect :stepsIndex="0"></stepsCollect>
		<u--form :model="data" ref="data" :rules="rules">
			<view class="idCard">
				<view class="idCard_image">
					<view>
						<u-upload width="150px" :fileList="fileList6" @afterRead="afterRead" @delete="frontdeletePic" name="6"
							multiple :maxCount="1" accept="image" :deletable="frontdel">
							<image :src="font_id_image" mode="widthFix" style="width: 150px;"></image>
						</u-upload>
					</view>
					<view>
						<u-upload width="150px" :fileList="fileList7" @afterRead="afterReadback" @delete="backdeletePic" name="7"
							multiple :maxCount="1" :deletable="backdel">
							<image :src="back_id_image" mode="widthFix" style="width: 150px;"></image>
						</u-upload>
					</view>
				</view>

				<view class="idCard_text">
					<text>请确认您的信息，若有误点击修改</text>
					<u-form-item prop="personName">
						<view class="idCard_name">
							<text><text style="color: red;">*</text>个人姓名：</text>
							<input v-model="data.personName" placeholder="请输入姓名" />
						</view>
					</u-form-item>
					<u-form-item prop="idNumber">
						<view class="idCard_name">
							<text><text style="color: red;">*</text>身份证号：</text>
							<input v-model="data.idNumber" placeholder="请输入身份证号" />
						</view>
					</u-form-item>
				</view>
			</view>

			<text class="emailText">请验证您的邮箱</text>
			<view class="mail">
				<u-form-item prop="personEmail">
					<view class="mail_num">
						<text><text style="color: red;">*</text>个人邮箱：</text>
						<input v-model="data.personEmail" placeholder="请输入邮箱" />
					</view>
				</u-form-item>
				<view class="mail_num">
					<text><text style="color: red;">*</text>邮箱验证：</text>
					<input v-model="codeNum" type="number" placeholder="请输入验证码" />
					<view class="code-txt" @tap="getPhonecode">
						{{codeBtn.codeText}}
					</view>
				</view>
			</view>

			<text class="emailText">请输入您的期望薪资</text>
			<view class="exSalary">
				<u-form-item prop="hopeSalary">
					<view class="mail_num">
						<text><text style="color: red;">*</text>期望薪资：</text>
						<input v-model="data.hopeSalary" type="number" placeholder="请输入您的期望薪资" />
					</view>
				</u-form-item>
			</view>
		</u--form>

		<view class="agreement">
			<view class="agreement_cm">
				<text><text style="color: red;">*</text>是否有签竞业协议</text>
				<view class="">
					<u-radio-group v-model="radiovalue" placement="row" @change="groupChange">
						<u-radio v-for="(item, index) in radiolist" :key="index" :customStyle="{marginRight: '8px'}"
							:label="item.name" :name="item.name">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="agreement_cm">
				<text><text style="color: red;">*</text>是否有A经验</text>
				<view class="">
					<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange1">
						<u-radio v-for="(item, index) in radiolist1" :key="index" :customStyle="{marginRight: '8px'}"
							:label="item.name" :name="item.name">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="btnNext">
			<button @click="btnNext" type="primary">下一步</button>
		</view>
	</view>
</template>

<script>
	import stepsCollect from "@/pages/subPack/page/components/stepsCollect/stepsCollect.vue"
	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/mmmm-image-tools/index.js'
	export default {
		components: {
			stepsCollect
		},
		data() {
			// 身份证号校验
			var checkIdNum = (rule, value, callback) => {
				const reg =
					/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/
				if (!value) {
					return callback(new Error('证件号码不能为空'))
				} else if (!reg.test(value)) {
					return callback(new Error('证件号码不正确'))
				} else {
					callback()
				}
			}
			return {
				fileList6: [],
				fileList7: [],
				font_id_image: "https://cdn.uviewui.com/uview/demo/upload/positive.png",
				back_id_image: "https://cdn.uviewui.com/uview/demo/upload/positive.png",
				//验证码
				codeNum: "",
				frontdel: true, //是否显示不允许删除按钮
				backdel: true, //是否显示不允许删除按钮
				radiolist: [{
					name: '是',
					disabled: false
				}, {
					name: '否',
					disabled: false
				}],
				radiovalue: '否',
				radiolist1: [{
					name: '是',
					disabled: false
				}, {
					name: '否',
					disabled: false
				}],
				radiovalue1: '否',
				collectionId: "",
				cancelRemark: "",
				//验证码按钮
				codeBtn: {
					codeTime: 60,
					codeText: "获取验证码",
					codeStatus: true
				},
				data: {
					id: "",
					frontIdUrl: "",
					backIdUrl: "",
					personName: "",
					idNumber: "",
					personEmail: "",
					competeAgreement: 0, //竞业协议
					aExperience: 0, //是否有A经验
					educationUrl: "",
					hightEducation: "",
					isEducation: "", //判断学历是否为真
					diplomaUrl: "",
					graduateDiplomaUrl: "",
					company: "",
					department: "",
					position: "",
					servicePeriod: "",
					workTime: "",
					oneMonth: "",
					twoMonth: "",
					threeMonth: "",
					fourMonth: "",
					fiveMonth: "",
					sixMonth: "",
					insuranceProveUrl: "",
					salaryProveUrl: "",
					tel: "",
					educationStutas: "",
					collectionId: "",
					cancelRemark: "",
					educationCode: "", //学历验证码
					hopeSalary: "", //期望薪资
					serviceStart: "", //服务周期开始时间
					serviceEnd: "", //服务周期结束时间
					isSalary: "正常薪资", //薪资状态（如有问题显示：非正常薪资）
				},
				rules: {
					personName: [{
						required: true,
						message: '请输入您的姓名',
						trigger: ['blur', 'change']
					}, {
						validator: (rule, value, callback) => {
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						trigger: ["change", "blur"],
					}],
					idNumber: [{
						required: true,
						message: '请输入您的身份证号',
						trigger: 'blur'
					}, {
						validator: checkIdNum,
						trigger: 'blur'
					}],
					personEmail: [{
						required: true,
						message: "个人邮箱不能为空",
						trigger: "blur"
					}],
					hopeSalary: [{
						required: true,
						message: '请输入您的期望薪资,必须为纯数字',
						trigger: ["change", "blur"],
						type: "number"
					}]
				}
			};
		},
		onLoad(options) {
			console.log("options=", options);
			this.collectionId = options.collectionId
			this.data.collectionId = options.collectionId
			this.data.tel = options.tel
			this.cancelRemark = options.cancelRemark
			this.data.cancelRemark = options.cancelRemark
			//获取是否填写了资料的接口
			this.getIsBackgroundByTel(options.tel);
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.data.setRules(this.rules)
		},
		methods: {
			groupChange(n) {
				if (n == "是") {
					this.data.competeAgreement = 1
				} else {
					this.data.competeAgreement = 0
				}
			},
			groupChange1(n) {
				if (n == "是") {
					this.data.aExperience = 1
				} else {
					this.data.aExperience = 0
				}
			},
			//获取是否填写资料的接口
			getIsBackgroundByTel(tel) {
				let data = {
					"tel": tel
				}
				console.log(data);
				this.$me_api.getIsBackgroundByTel(data).then(res => {
					console.log("getIsBackgroundByTel=", res);
					if (res.message == "success") {
						if (res.data !== "") {
							this.getBackground(res.data)
						} else {
							console.log("走本地缓存的方法");
							//本地缓存的方法调用
							this.dataCache()
						}
					}
				})
			},

			//获取背景详情的内容接口
			getBackground(id) {
				let data = {
					"id": id
				}
				console.log(data);
				this.$me_api.getBackground(data).then(res => {
					console.log("getBackground=", res);
					var data = this.data = res.data[0]
					if (res.message == "success") {
						var frontId = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.frontIdUrl)).url,
						}
						console.log("frontId ==", frontId);
						this.fileList6.push(frontId)
						var backId = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.backIdUrl)).url,
						}
						console.log("cancelRemark==", this.cancelRemark);
						this.fileList7.push(backId)
						this.data.collectionId = this.collectionId
						this.data.cancelRemark = this.cancelRemark
						if (this.data.cancelRemark == "null") {
							this.frontdel = false
							this.backdel = false
						} else {
							this.frontdel = true
							this.backdel = true
						}
						if (this.data.competeAgreement == 1) {
							this.radiovalue = "是"
						}
						if (this.data.aExperience == 1) {
							this.radiovalue1 = "是"
						}
					}
				})
			},

			sendEmail() {
				if (this.codeBtn.codeStatus) {
					this.codeBtn.codeStatus = false
					let data = {
						"mailAccount": this.data.personEmail,
					}
					console.log(data);
					this.$me_api.sendEmail(data).then(res => {
						console.log('sendEmail', res);
					})
					let timerId = setInterval(() => {
						let codetime = this.codeBtn.codeTime
						codetime--
						this.codeBtn.codeTime = codetime
						this.codeBtn.codeText = codetime + "s"
						if (codetime < 1) {
							clearInterval(timerId)
							this.codeBtn.codeText = "重新获取"
							this.codeBtn.codeTime = 60
							this.codeBtn.codeStatus = true
						}
					}, 1000)
				}
			},

			//邮箱验证码对比接口
			sendCompareMail() {
				let data = {
					"mail": this.data.personEmail,
					"random": this.codeNum
				}
				console.log(data);
				this.$me_api.sendCompareMail(data).then(res => {
					console.log('sendCompareMail', res);
					if (res.message == "验证通过") {
						this.$personal.setStorage("collect_data", JSON.stringify(this.data))
						uni.navigateTo({
							url: "../../../me/collectData/collectTwoPage/collectTwoPage?data=" +
								encodeURIComponent(JSON.stringify(this.data))
						})
					}
				})
			},
			dataCache() {
				var collectdata = this.$personal.getStorage("collect_data")
				if (collectdata !== "") {
					var data = JSON.parse(decodeURIComponent(collectdata));
					var frontId = {
						url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.frontIdUrl)).url,
					}
					this.fileList6.push(frontId)
					var backId = {
						url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.backIdUrl)).url,
					}
					this.fileList7.push(backId)
					if (data.competeAgreement == 1) {
						this.radiovalue = "是"
					}
					if (data.aExperience == 1) {
						this.radiovalue1 = "是"
					}
					data.collectionId = this.collectionId
					this.data = data
					console.log(this.data);
				}
			},
			//获取验证码按钮点击计时事件
			getPhonecode() {
				if (this.data.personEmail == "") {
					this.$personal.msg("请填写您的邮箱号")
					return
				}
				this.sendEmail()
			},
			//上传身份证正面图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				const result = await this.$personal.uploadFilePromise(lists[0].url)
				var data = JSON.parse(decodeURIComponent(result));
				let item = this[`fileList${event.name}`][fileListLen]
				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '上传成功',
					url: data.url,
				}))
				var frontId = {
					url: data.fileName,
					size: data.size,
					fileId: data.fileId
				}
				this.data.frontIdUrl = JSON.stringify(frontId)
				console.log("this.data.frontIdUrl ===== ", this.data.frontIdUrl);
				pathToBase64(lists[0].url).then(async base64 => {
					const idCardfront = await this.$personal.getMY_OCR(base64);
					console.log("idCardfront===", idCardfront);
					this.data.personName = idCardfront.姓名.words
					this.data.idNumber = idCardfront.公民身份号码.words
				})
			},

			//上传身份证背面图片
			async afterReadback(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				const result = await this.$personal.uploadFilePromise(lists[0].url)
				var data = JSON.parse(decodeURIComponent(result));
				let item = this[`fileList${event.name}`][fileListLen]
				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '上传成功',
					url: data.url,
				}))
				var backIdUrl = {
					url: data.fileName,
					size: data.size,
					fileId: data.fileId
				}
				this.data.backIdUrl = JSON.stringify(backIdUrl)
			},
			frontdeletePic(index) {
				this.fileList6.splice(index.index, 1)
				this.data.frontIdUrl = ""
			},
			backdeletePic(index) {
				this.fileList7.splice(index.index, 1)
				this.data.backIdUrl = ""
			},
			btnNext() {
				console.log("this.data ====", this.data);
				// this.data.cancelRemark !== null
				//当前为新增条件
				if (this.data.id == null || this.data.id == "") {
					if (this.data.frontIdUrl == "" || this.data.backIdUrl == "") {
						this.$personal.msg("请上传您的身份证照片")
						return;
					}
					if (this.codeNum == "") {
						this.$personal.msg("您的邮箱验证不通过，请填写正确的邮箱验证码")
						return;
					}
					this.$refs.data.validate().then(res => {
						uni.$u.toast('校验通过')
						if (this.codeNum == 1111) {
							this.$personal.setStorage("collect_data", JSON.stringify(this.data))
							uni.navigateTo({
								url: "../../../me/collectData/collectTwoPage/collectTwoPage?data=" +
									encodeURIComponent(JSON.stringify(this.data))
							})
						}else{
							this.sendCompareMail()
						}
					}).catch(errors => {
						uni.$u.toast(errors[0].message)
					})
				} else {
					//缓存当前页面填写的值
					this.$personal.setStorage("collect_data", JSON.stringify(this.data))
					if (this.data.frontIdUrl == "" || this.data.backIdUrl == "") {
						this.$personal.msg("请上传您的身份证照片")
						return;
					}
					if (this.codeNum == "") {
						this.$personal.msg("您的邮箱验证不通过，请填写正确的邮箱验证码")
						return;
					}
					this.$refs.data.validate().then(res => {
						uni.$u.toast('校验通过')
						if (this.codeNum == 1111) {
							this.$personal.setStorage("collect_data", JSON.stringify(this.data))
							uni.navigateTo({
								url: "../../../me/collectData/collectTwoPage/collectTwoPage?data=" +
									encodeURIComponent(JSON.stringify(this.data))
							})
						}else{
							this.sendCompareMail()
						}
					}).catch(errors => {
						uni.$u.toast(errors[0].message)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.main {
		display: flex;
		flex-direction: column;
	}

	.idCard {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 20px;
		padding-bottom: 10px;

		.idCard_image {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}

		.idCard_text {
			margin-top: 15px;
			color: #999999;
			font-size: 12px;

			.idCard_name {
				display: flex;
				align-items: center;
				color: black;
				font-size: 17px;
			}
		}
	}

	.emailText {
		display: flex;
		padding: 8px 20px;
		color: #999999;
	}

	.mail {
		background-color: white;
		padding-left: 20px;
		padding-bottom: 20px;


		.mail_num {
			display: flex;
			color: black;
			font-size: 17px;
			padding-top: 10px;
		}

		.code-txt {
			color: #0084FF;
			font-size: 13px;
		}
	}

	.exSalary {
		background-color: white;
		padding-left: 20px;
		padding-bottom: 10px;

		.mail_num {
			display: flex;
			color: black;
			font-size: 17px;
			padding-top: 10px;
		}
	}

	.agreement {
		background-color: white;
		padding-left: 20px;
		padding-bottom: 20px;
		margin-top: 16px;

		.agreement_cm {
			display: flex;
			color: black;
			font-size: 17px;
			padding-top: 15px;
			padding-right: 15px;
			justify-content: space-between;
		}
	}

	.btnNext {
		padding: 50px 20px;
	}
</style>