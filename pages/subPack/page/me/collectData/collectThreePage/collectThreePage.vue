<template>
	<view>
		<u-alert v-if='data.cancelRemark !== null && data.cancelRemark !== "null"' title="收集资料!!!驳回理由" type="error"
			effect="dark" :description="data.cancelRemark"></u-alert>
		<stepsCollect :stepsIndex="2"></stepsCollect>
		<view class="dataView">
			<u-form :model="form" ref="form">
				<u-form-item label="原公司" prop="company" :labelWidth="form.labelWidth">
					<u-input border="none" v-model="data.company" placeholder="请输入" />
				</u-form-item>
				<u-form-item label="原部门" prop="department" :labelWidth="form.labelWidth">
					<u-input border="none" v-model="data.department" placeholder="请输入" />
				</u-form-item>
				<u-form-item label="原职位" prop="position" :labelWidth="form.labelWidth">
					<u-input border="none" v-model="data.position" placeholder="请输入" />
				</u-form-item>
				<u-form-item label="服务周期" prop="servicePeriod" :labelWidth="form.labelWidth">
					<view class="pickerTime">
						<view @click="startDateClick">
							<text style="color: black;">{{startTimeText}}</text>
							<u-datetime-picker :show="show" v-model="value1" mode="year-month" :formatter="formatter"
								ref="datetimePicker" @confirm="workStartDateChange" @cancel="close" :maxDate="maxDate">
							</u-datetime-picker>
						</view>
						<text class="serverDate">
							至
						</text>
						<view @click="endDateClick">
							<text style="color: black;">{{endTimeText}}</text>
							<u-datetime-picker :show="show1" v-model="value2" mode="year-month" :formatter="formatter"
								ref="datetimePicker" @confirm="workEndDateChange" @cancel="close1" :minDate="value1" :maxDate="maxDate">
							</u-datetime-picker>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="工作年限" prop="workTime" :labelWidth="form.labelWidth">
					<u-input border="none" v-model="data.workTime" placeholder="请输入" />
				</u-form-item>
			</u-form>
		</view>
		<view class="salaryProve">
			<view class="salary_title">
				<text style="font-size: 16px;font-weight: bold;">薪资证明</text>
				<u-icon name="/pages/subPack/page/static/me/salary_hint.png" label="注意事项" label-color="#FF8B00" size="13"
					space="5px" @click="hintClick">
				</u-icon>
			</view>
			<text>请提供个人所得税APP收入明细</text>
			<view v-if='data.cancelRemark !== null && data.cancelRemark !== "null"' class="again_upload" @click="againuploadClick">
				<text style="color: red;">如需补充或删除收入明细请点击 >>>> </text>
				<u-icon name="reload" label="重新上传" color="#057CFF" label-color="#057CFF"></u-icon>
			</view>
			<view class="salary_image">
				<u-upload height="195px" width="154px" :fileList="fileList6" @afterRead="afterRead" @delete="salarydeletePic"
					name="6" :maxCount="salaryimage_count" :deletable="image_deletable">
					<image src="/pages/subPack/page/static/me/up_image.jpg" mode="aspectFit"
						style="width: 154px; height: 195px; background-color: #F5F7FA;">
					</image>
				</u-upload>
				<image :src="salary_case" mode="aspectFit" style="width: 154px; height: 195px; background-color: #F5F7FA;">
				</image>
			</view>
			<view v-for="(item,index) in 6" :key="index">
				<view class="OCRsalary">
					<view class="inputSalary">
						<text>工资发放公司：</text>
						<u-input border="none" v-model="salaryAboutCompanyArr[index]" placeholder="请输入" />
					</view>
					<view class="inputSalary">
						<text>工资发放时间：</text>
						<u-input border="none" v-model="salaryAboutTimeArr[index]" placeholder="请输入" />
					</view>
					<view class="inputSalary">
						<text>工资发放金额：</text>
						<u-input type="number" border="none" v-model="salaryAboutMoneyArr[index]" placeholder="请输入" />
					</view>
				</view>
			</view>
		</view>
		<view class="socialProve">
			<text style="font-size: 16px;font-weight: bold;">社保证明</text>
			<text>请提供上一份工作所在地的社保缴纳证明</text>
			<view class="salary_image">
				<u-upload height="195px" width="154px" :fileList="fileList7" @afterRead="socialRead" @delete="socialdeletePic"
					name="7" :maxCount="3" :deletable="image_deletable">
					<image src="/pages/subPack/page/static/me/up_image.jpg" mode="aspectFit"
						style="width: 154px; height: 195px; background-color: #F5F7FA;">
					</image>
				</u-upload>
				<image :src="social_case" mode="aspectFit" style="width: 154px; height: 195px; background-color: #F5F7FA;">
				</image>
			</view>
		</view>
		<view class="btnNext">
			<view class="btnback" @click="backClick">
				<text>上一步</text>
			</view>
			<view class="btngo" @click="goClick">
				<text>确认提交</text>
			</view>
		</view>

		<view class="popShowView">
			<u-popup mode="bottom" :show="popupShow" @close="popupclose" closeable>
				<view class="popupContent">
					<text style="font-weight: bold; font-size: 16px;">上传薪资注意事项</text>
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="" v-for="(item,index) in 4" :key="index">
						<view class="context_title">
							<text>{{popTitle[index]}}</text>
						</view>
						<view class="context_image">
							<image :src="check[index]" mode="aspectFit">
							</image>
						</view>
					</view>
				</scroll-view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import stepsCollect from "@/pages/subPack/page/components/stepsCollect/stepsCollect.vue"
	import startToEndPickerDate from "@/pages/subPack/page/components/startToEndPickerDate/startToEndPickerDate.vue"
	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/mmmm-image-tools/index.js'
	import collectOnePageVue from "../collectOnePage/collectOnePage.vue"
	const salaryfileNameArr = []
	const socialfileNameArr = []

	export default {
		components: {
			stepsCollect,
			startToEndPickerDate
		},
		data() {
			return {
				check: [
					this.$personal.config.baseImageUrl + "2023/wechat_me/collectThree/check_1.png",
					this.$personal.config.baseImageUrl + "2023/wechat_me/collectThree/check_2.png",
					this.$personal.config.baseImageUrl + "2023/wechat_me/collectThree/check_3.png",
					this.$personal.config.baseImageUrl + "2023/wechat_me/collectThree/check_4.png",
				],
				popTitle: [
					"1.上传的收入纳税截图必须以“工资薪金+日期”为首行",
					"2.请上传清晰图片/原图",
					"3.图片如有污点或马赛克，将不能识别",
					"4.上传的图片必须有“收入纳税明细查询”的字样",
				],
				salary_case: this.$personal.config.baseImageUrl + "2023/wechat_me/collect_case/salary_case.png",
				social_case: this.$personal.config.baseImageUrl + "2023/wechat_me/collect_case/social.png",
				popupShow: false,
				value1: Number(new Date()),
				show: false,
				value2: Number(new Date()),
				show1: false,
				maxDate: Number(new Date()),
				startTimeText: "开始时间",
				endTimeText: "结束时间",
				fileList6: [],
				fileList7: [],
				image_deletable: true,
				salaryimage_count: 3,
				form: {
					labelWidth: 90,
					company: "", //公司
					department: "", //部门
					position: "", //职位
					servicePeriod: "", //服务周期
					workTime: "", //工作时间
					oneMonth: "0", //第一个月
					twoMonth: "0", //第二个月
					threeMonth: "0", //第三个月
					fourMonth: "0", //第四个月
					fiveMonth: "0", //第五个月
					sixMonth: "0", //第六个月
				},
				salaryAboutTimeArr: [],
				salaryAboutCompanyArr: [],
				salaryAboutMoneyArr: [],
				salaryAboutStatusArr: [], //薪资状态
				isAboutStatus: false, //不包含薪资状态
				salaryAllDataArr: [],
				data: {},
			};
		},
		onReady() {
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad(option) {
			console.log("option ===", option);
			if (JSON.stringify(option) != '{}') {
				var data = JSON.parse(decodeURIComponent(option.data));
				console.log("data ===", data);
				this.data = data
				if (data.id !== "") {
					if (this.data.oneMonth !== 0) {
						this.salaryAboutMoneyArr.push(this.data.oneMonth)
						this.salaryAboutMoneyArr.push(this.data.twoMonth)
						this.salaryAboutMoneyArr.push(this.data.threeMonth)
						this.salaryAboutMoneyArr.push(this.data.fourMonth)
						this.salaryAboutMoneyArr.push(this.data.fiveMonth)
						this.salaryAboutMoneyArr.push(this.data.sixMonth)
					}

					if (this.data.cancelRemark == "null") {
						this.image_deletable = false
					} else {
						this.image_deletable = true
					}

					if (this.data.serviceStart !== "" && this.data.serviceStart !== null) {
						this.value1 = this.data.serviceStart
						this.startTimeText = this.data.serviceStart
					}
					if (this.data.serviceEnd !== "" && this.data.serviceEnd !== null) {
						this.value2 = this.data.serviceEnd
						this.endTimeText = this.data.serviceEnd
					}
					if (this.data.isSalary == null) {
						this.data.isSalary = "正常薪资"
					} else {
						this.data.isSalary = "非正常薪资"
					}
					if (data.salaryProveUrl !== null && data.salaryProveUrl !== "") {
						JSON.parse(decodeURIComponent(data.salaryProveUrl)).forEach(res => {
							var salaryProveUrl = {
								url: this.$personal.config.baseImageUrl + res.url,
							}
							this.fileList6.push(salaryProveUrl)
						})
						console.log(this.fileList6);
						this.salaryimage_count = this.fileList6.length
						this.data.salaryProveUrl = data.salaryProveUrl
						if (this.fileList6.length !== 1) {
							this.image_deletable = false
						}
					}

					if (data.insuranceProveUrl !== null && data.insuranceProveUrl !== "") {
						JSON.parse(decodeURIComponent(data.insuranceProveUrl)).forEach(res => {
							var insuranceProveUrl = {
								url: this.$personal.config.baseImageUrl + res.url,
							}
							this.fileList7.push(insuranceProveUrl)
						})
						this.data.insuranceProveUrl = data.insuranceProveUrl
					}
				}
			}
		},
		methods: {
			//重新上传
			againuploadClick() {
				this.fileList6 = []
				salaryfileNameArr.length = 0
				this.salaryAboutTimeArr = []
				this.salaryAboutMoneyArr = []
				this.salaryAboutCompanyArr = []
				this.image_deletable = true
				this.salaryimage_count = 3
			},
			hintClick() {
				this.popupShow = true
			},
			popupclose() {
				this.popupShow = false
				// console.log('close');
			},
			startDateClick() {
				console.log("选择开始时间");
				this.show = true
			},
			close() {
				this.show = false;
			},
			endDateClick() {
				console.log("选择结束时间");
				this.show1 = true
			},
			close1() {
				this.show1 = false;
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				return value
			},
			async afterRead(event) {
				const datasalary = await this.getImageUrl(event)
				console.log("datasalary=", datasalary);
				salaryfileNameArr.push(datasalary)
			},
			async socialRead(event) {
				const datasocial = await this.getSocialImageUrl(event)
				console.log("datasocial=", datasocial);
				socialfileNameArr.push(datasocial)
			},
			//识别工资
			async getOCRImageCode(image) {
				return new Promise(async (resolve, reject) => {
					this.isAboutStatus = false
					pathToBase64(image).then(async base64 => {
						var data = []
						const ocrImage = await this.$personal.baidu_imageOCR(base64);
						console.log(ocrImage);
						this.data.isSalary = "正常薪资"
						ocrImage.forEach(res => {
							if (res.words.indexOf("收入纳税明细查询") != -1) {
								this.isAboutStatus = true
								console.log("包含收入纳税明细查询");
							}
						})

						if (this.isAboutStatus == true) {
							ocrImage.forEach(res => {
								if (res.words.indexOf("-") != -1) {
									var salary_date = {
										"salary_date": res.words
									}
									data.push(salary_date)
								}
								if (res.words.indexOf("扣缴义务人") != -1) {
									var salary_company = {
										"salary_company": res.words
									}
									data.push(salary_company)
								}

								if (res.words.indexOf("所得项目小类") != -1) {
									var salary_status = {
										"salary_status": res.words
									}
									data.push(salary_status)
								}

								if (res.words.indexOf("收入：") != -1) {
									var salary_money = {
										"salary_money": res.words
									}
									data.push(salary_money)
								}

							})
						} else {
							this.$personal.msg("系统检测，当前上传的不是个税app截图，请重新上传")
							return;
						}
						data.forEach(res => {
							if (res.salary_company) {
								var array = []
								array = res.salary_company.split("：")
								res.salary_company = array[1]
							}
							if (res.salary_status) {
								var array = []
								array = res.salary_status.split("：")
								res.salary_status = array[1]
							}
							if (res.salary_money) {
								var array = []
								array = res.salary_money.split("：")
								array[1] = array[1].replace("元", "")
								res.salary_money = array[1]
							}
						})
						console.log("data ====", data);
						var data1 = []
						for (var i = 0; i < data.length / 4; i++) {
							if (Object.keys(data[i * 4]) == "salary_date" &&
								JSON.stringify(data[i * 4 + 3]) !== undefined &&
								data[i * 4 + 1].salary_status !== "全年一次性奖金收入" &&
								data[i * 4 + 1].salary_status !== "解除劳动合同一次性补偿金") {
								var allData = Object.assign(data[i * 4], data[i * 4 + 1], data[i * 4 + 2], data[i * 4 +
									3]);
								data1.push(allData)
							}
						}
						console.log("all ====", data1);
						data1.forEach(res => {
							this.salaryAboutTimeArr.push(res.salary_date)
							this.salaryAboutStatusArr.push(res.salary_status)
							this.salaryAboutCompanyArr.push(res.salary_company)
							this.salaryAboutMoneyArr.push(res.salary_money)
						})
						this.salaryAboutMoneyArr = this.salaryAboutMoneyArr.filter(item => item !== 0);
						console.log("salaryAboutMoneyArr===", this.salaryAboutMoneyArr);
						if (data1.length == 0) {
							this.$personal.msg("当前截图有缺失，请上传完整的个税app截图")
							resolve(false)
							return;
						}
						resolve(true)
					})
				})
			},
			//上传图片的方法
			getImageUrl(event) {
				console.log(event);
				return new Promise(async (resolve, reject) => {
					let lists = [].concat(event.file)
					let fileListLen = this[`fileList${event.name}`].length
					for (let i = 0; i < lists.length; i++) {
						var isocr = await this.getOCRImageCode(lists[i].url)
						if (isocr) {
							this[`fileList${event.name}`].push({
								...lists[i],
								status: 'uploading',
								message: '上传中'
							})
							const result = await this.$personal.uploadFilePromise(lists[i].url)
							var data = JSON.parse(decodeURIComponent(result));
							let item = this[`fileList${event.name}`][fileListLen]
							this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
								status: 'success',
								message: '上传成功',
								url: data.url
							}))
							var iamgeData = {
								url: data.fileName,
								size: data.size,
								fileId: data.fileId
							}
							resolve(iamgeData)
							fileListLen++
						}
					}
				})
			},

			getSocialImageUrl(event) {
				console.log(event);
				return new Promise(async (resolve, reject) => {
					let lists = [].concat(event.file)
					let fileListLen = this[`fileList${event.name}`].length
					for (let i = 0; i < lists.length; i++) {
						this[`fileList${event.name}`].push({
							...lists[i],
							status: 'uploading',
							message: '上传中'
						})
						const result = await this.$personal.uploadFilePromise(lists[i].url)
						var data = JSON.parse(decodeURIComponent(result));
						let item = this[`fileList${event.name}`][fileListLen]
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '上传成功',
							url: data.url
						}))
						var iamgeData = {
							url: data.fileName,
							size: data.size,
							fileId: data.fileId
						}
						resolve(iamgeData)
						fileListLen++
					}
				})
			},

			salarydeletePic(index) {
				this.fileList6.splice(index.index, 1)
				salaryfileNameArr.splice(index.index, 1)
				console.log("this.fileList6 ===", this.fileList6)
				this.fileList6.forEach(res => {
					this.getOCRImageCode(res.thumb)
				})
				this.salaryAboutTimeArr = []
				this.salaryAboutMoneyArr = []
				this.salaryAboutCompanyArr = []
			},
			socialdeletePic(index) {
				this.fileList7.splice(index.index, 1)
				socialfileNameArr.splice(index.index, 1)
			},
			backClick() {
				uni.navigateBack()
			},
			workStartDateChange: function(e) {
				this.show = false;
				const timeFormat = uni.$u.timeFormat;
				let timeValue = timeFormat(e.value, 'yyyy-mm');
				this.value2 = e.value
				this.startTimeText = timeValue
				this.data.serviceStart = this.startTimeText
				console.log(timeValue);
			},
			workEndDateChange: function(e) {
				this.show1 = false;
				const timeFormat = uni.$u.timeFormat;
				let timeValue = timeFormat(e.value, 'yyyy-mm');
				this.endTimeText = timeValue
				this.data.serviceEnd = this.endTimeText
				console.log(timeValue);
			},
			//上传资料收集
			addCollection() {
				let data = {
					"data": this.data
				}
				this.$me_api.addCollection(data).then(res => {
					console.log('addCollection', res);
					if (res.code == 200) {
						this.$personal.delStorage("collect_data")
						uni.navigateTo({
							url: "../../../me/collectData/submitSuceedPage/submitSuceedPage"
						})
					} else {
						this.$personal.msg(res.message)
					}
				})
			},
			goClick() {
				if (salaryfileNameArr.length > 0) {
					this.data.salaryProveUrl = JSON.stringify(salaryfileNameArr)
				}
				if (socialfileNameArr.length > 0) {
					this.data.insuranceProveUrl = JSON.stringify(socialfileNameArr)
				}
				this.data.oneMonth = this.salaryAboutMoneyArr[0]
				this.data.twoMonth = this.salaryAboutMoneyArr[1]
				this.data.threeMonth = this.salaryAboutMoneyArr[2]
				this.data.fourMonth = this.salaryAboutMoneyArr[3]
				this.data.fiveMonth = this.salaryAboutMoneyArr[4]
				this.data.sixMonth = this.salaryAboutMoneyArr[5]
				console.log("this.data ===", this.data);
				if (this.data.id == null || this.data.id == "") {
					this.addCollection()
					return
				}
				if (this.data.cancelRemark !== "null" && this.data.id !== null) {
					this.addCollection()
				} else {
					this.$personal.msg("当前为正在审核状态，禁止再次提交！")
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.dataView {
		padding: 20px;
		background-color: white;
		margin-bottom: 16px;

		.pickerTime {
			display: flex;
			flex-direction: row;

			.serverDate {
				padding: 0px 20px;
			}
		}

		.salary {
			display: flex;
			font-size: 15px;
			padding: 8px 0px;
			justify-content: space-between;
		}
	}

	.salaryProve {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 20px;
		margin-bottom: 16px;

		.salary_title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.again_upload {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.salary_image {
			display: flex;
			padding: 10px 0px;

			image {
				margin-right: 10px;
			}
		}

		text {
			padding: 5px 0px;
		}

		.OCRsalary {
			margin: 5px 0px;
			padding: 10px;
			background-color: $uni-bg-color;

			.inputSalary {
				display: flex;

				text {
					padding-right: 10px;
				}
			}
		}
	}

	.socialProve {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 20px;
		margin-bottom: 16px;

		.salary_image {
			display: flex;
			padding: 10px 0px;

			image {
				margin-right: 10px;
			}
		}

		text {
			padding: 5px 0px;
		}
	}

	.btnNext {
		display: flex;
		padding: 20px;
		justify-content: space-around;
		padding-bottom: 50px;

		.btnback {
			padding: 10px 30px;
			border-radius: 5px;
			background-color: white;
			color: #0084FF;
		}

		.btngo {
			padding: 10px 70px;
			border-radius: 5px;
			color: white;
			background-color: rgba(0, 132, 255, 1);
		}
	}

	.popShowView {
		.popupContent {
			padding: 13px;
			display: flex;
			justify-content: center;
		}

		.context_title {
			padding: 10px;
		}

		.context_image {
			padding: 0px 20px;
		}

		.scroll-Y {
			height: 550px;
		}
	}
</style>