<template>
	<view>
		<u-alert v-if='data.cancelRemark !== null && data.cancelRemark !== "null"' title="收集资料!!!驳回理由" type="error"
			effect="dark" :description="data.cancelRemark"></u-alert>

		<stepsCollect :stepsIndex="1"></stepsCollect>
		<view class="xxreport">
			<text><text style="color: red;">{{isXXreport}}</text>学信网验证报告</text>
			<text style="font-size: 13px; color: #999999; padding-top: 10px;">请登录学信网，个人学籍档案-申请在线验证报告</text>
			<view class="xxreport_image">
				<u-upload height="195px" width="154px" :fileList="fileList6" @afterRead="afterRead" @delete="xxreportdeletePic"
					name="6" multiple :maxCount="1" :deletable="image_deletable">
					<image style="width: 154px; height: 195px;" src="/pages/subPack/page/static/me/up_image.jpg"
						mode="aspectFill"></image>
				</u-upload>
				<image src="/pages/subPack/page/static/me/up_imageShow.png" mode="widthfix"
					style="width: 154px; height: 195px; background-color: #F5F7FA;"></image>
			</view>
			<view class="picker_education">
				<text><text style="color: red;">*</text>最高学历</text>
				<view class="picker_option">
					<picker @change="educationPickerChange" :range="educationArr">
						<view class="option">
							<text style="color: #A2A7B0;" v-if="education=='请选择'">{{education}}</text>
							<text style="color: black;" v-else>{{education}}</text>
							<u-icon color="#A2A7B0" name="arrow-right"></u-icon>
						</view>
					</picker>
				</view>
			</view>
			<view class="onCode" v-if="onCodeShow" width="100%">
				<text><text style="color: red;">*</text>在线验证码</text>
				<input disabled=true style="width: 220px;" v-model="dataTow.educationCode" type="text" placeholder="请输入您的学历验证码">
			</view>
		</view>
		<view class="diploma">
			<text><text style="color: red;">*</text>毕业证</text>
			<view class="diploma_card">
				<u-upload :fileList="fileList7" @afterRead="diplomaRead" @delete="diplomadeletePic" name="7" multiple
					:maxCount="1" width="154px" height="100px" :deletable="image_deletable">
					<image src="/pages/subPack/page/static/me/up_ImageCro.jpg" mode="aspectFill"
						style=" width: 154px; height: 100px; background-color: #F5F7FA;"></image>
				</u-upload>
				<image src="/pages/subPack/page/static/me/up_diplomaShow.png" mode="aspectFill"
					style="width: 154px; height: 100px; background-color: #F5F7FA;"></image>
			</view>
		</view>

		<view class="degree">
			<text>学位证</text>
			<view class="degree_card">
				<u-upload :fileList="fileList8" @afterRead="degreeRead" @delete="degreedeletePic" name="8" multiple
					:maxCount="1" width="154px" height="100px" :deletable="image_deletable">
					<image src="/pages/subPack/page/static/me/up_ImageCro.jpg" mode="aspectFill"
						style=" width: 154px; height: 100px; background-color: #F5F7FA;"></image>
				</u-upload>
				<image src="/pages/subPack/page/static/me/up_degreeShow.png" mode="aspectFill"
					style="width: 154px; height: 100px; background-color: #F5F7FA;"></image>
			</view>
		</view>

		<view class="btnNext">
			<view class="btnback" @click="backClick">
				<text>上一步</text>
			</view>
			<view class="btngo" @click="goClick">
				<text>下一步</text>
			</view>
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
			return {
				isXXreport: "*",
				fileList6: [],
				fileList7: [],
				fileList8: [],
				image_deletable: true,
				show: false,
				education: "请选择",
				educationArr: ["大专以下", "大专", "本科", "硕士", "博士"],
				data: {},
				onCodeShow: true,
				dataTow: {
					educationCode: "",
				}
			};
		},
		onLoad(option) {
			console.log("option ===", option);
			if (JSON.stringify(option) != '{}') {
				var data = JSON.parse(decodeURIComponent(option.data));
				console.log("data ===", data);
				this.data = data
				if (data.id !== "") {
					if (this.data.cancelRemark == "null") {
						this.image_deletable = false
					} else {
						this.image_deletable = true
					}
					this.education = data.hightEducation
					if (this.education == "大专以下") {
						this.isXXreport = ""
						this.onCodeShow = false
					} else {
						this.isXXreport = "*"
						this.onCodeShow = true
					}
					this.dataTow.educationCode = data.educationCode
					if (data.educationUrl !== null && data.educationUrl !== "") {
						var educationUrl = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.educationUrl))
								.url,
						}
						this.fileList6.push(educationUrl)
					}

					if (data.diplomaUrl !== null && data.diplomaUrl !== "") {
						var diplomaUrl = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.diplomaUrl))
								.url,
						}
						this.fileList7.push(diplomaUrl)
					}

					if (data.graduateDiplomaUrl !== null && data.graduateDiplomaUrl !== "") {
						var graduateDiplomaUrl = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data
								.graduateDiplomaUrl)).url,
						}
						this.fileList8.push(graduateDiplomaUrl)
					}
				} else {
					this.dataCache();
				}
			}
		},
		methods: {
			async afterRead(event) {
				//OCR识别在线简历验证码
				this.getOCRImageCode([].concat(event.file))
				const dataCode = await this.getImageUrl(event)
				this.data.educationUrl = dataCode
			},
			//识别简历在线验证码
			getOCRImageCode(lists) {
				pathToBase64(lists[0].url).then(async base64 => {
					var data = []
					var code = ""
					const ocrImage = await this.$personal.baidu_imageOCR(base64);
					console.log("ocrImage=", ocrImage);
					ocrImage.forEach((res, index) => {
						if (res.words.indexOf("在线验证码") != -1) {
							code = res.words
							code = code.replace(/\s*/g, "")
							code = code.replace(".", "")
							code = code.replace(/[\u4e00-\u9fa5]/g, "")
							if (code == "") {
								code = ocrImage[index + 1].words
							}
							this.dataTow.educationCode = code
						}
						if (res.words.indexOf("本科") != -1 || res.words.indexOf("专科") != -1 || res.words.indexOf("硕士") !=
							-1 || res.words.indexOf("博士") != -1) {
							this.education = res.words
						}
						if (res.words.indexOf("毕业") != -1) {
							this.data.educationStutas = res.words
						}
					})
					this.data.hightEducation = this.education
					if (this.data.educationStutas == "" || this.data.educationStutas == null) {
						this.data.educationStutas = "当前未查询到学籍状态"
					}
				})
			},
			//判断学历验证码是否为真
			async getOCR(event) {
				const CHsi = await this.$personal.getCHsi(event)
				console.log("CHsi=", CHsi);
				switch (CHsi.msg) {
					case "获取失败":
						this.data.isEducation = "当前学信网学历已过期"
						break;
					case "请求成功":
						if (CHsi.data.姓名 == this.data.personName) {
							this.data.isEducation = "当前学历审核无误"
						} else {
							this.data.isEducation = "当前学历与身份证姓名不符"
						}
						break;
					case "超出免费总额度":
						this.$personal.msg(CHsi.msg)
						this.data.isEducation = CHsi.msg
						break;
					case "在线验证报告已过期":
						this.data.isEducation = CHsi.msg
						break;
					default:
						this.data.isEducation = "当前学历无法审核"
				}
				console.log(this.data.isEducation);
				this.data.educationCode = this.dataTow.educationCode
				this.$personal.setStorage("collect_data", JSON.stringify(this.data))
				uni.navigateTo({
					url: "../../../me/collectData/collectThreePage/collectThreePage?data=" +
						encodeURIComponent(JSON.stringify(this.data))
				})
			},
			//上传毕业证
			async diplomaRead(event) {
				const datadiploma = await this.getImageUrl(event)
				this.data.diplomaUrl = datadiploma
			},

			//上传学位证
			async degreeRead(event) {
				const datadegree = await this.getImageUrl(event)
				this.data.graduateDiplomaUrl = datadegree
			},

			//上传图片的方法
			getImageUrl(event) {
				console.log("event=", event);
				return new Promise(async (resolve, reject) => {
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
					var iamgeData = {
						url: data.fileName,
						size: data.size,
						fileId: data.fileId
					}
					resolve(JSON.stringify(iamgeData))
				})
			},

			educationPickerChange(e) {
				this.education = this.educationArr[e.detail.value]
				console.log(this.education);
				this.data.hightEducation = this.education
				if (this.education == "大专以下") {
					this.isXXreport = ""
					this.onCodeShow = false
				} else {
					this.isXXreport = "*"
					this.onCodeShow = true
				}
			},

			xxreportdeletePic(index) {
				this.fileList6.splice(index.index, 1)
				this.data.educationUrl = ""
			},
			diplomadeletePic(index) {
				this.fileList7.splice(index.index, 1)
				this.data.diplomaUrl = ""
			},
			degreedeletePic(index) {
				this.fileList8.splice(index.index, 1)
				this.data.graduateDiplomaUrl = ""
			},
			backClick() {
				uni.navigateBack()
			},
			dataCache() {
				var collectdata = this.$personal.getStorage("collect_data")
				if (collectdata !== "") {
					var data = JSON.parse(decodeURIComponent(collectdata));
					if (data.educationUrl !== null && data.educationUrl !== "") {
						var educationUrl = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.educationUrl))
								.url,
						}
						this.fileList6.push(educationUrl)
					}
					if (data.diplomaUrl !== null && data.diplomaUrl !== "") {
						var diplomaUrl = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data.diplomaUrl))
								.url,
						}
						this.fileList7.push(diplomaUrl)
					}
					if (data.graduateDiplomaUrl !== null && data.graduateDiplomaUrl !== "") {
						var graduateDiplomaUrl = {
							url: this.$personal.config.baseImageUrl + JSON.parse(decodeURIComponent(data
								.graduateDiplomaUrl)).url,
						}
						this.fileList8.push(graduateDiplomaUrl)
					}
					if (data.hightEducation !== null && data.hightEducation !== "") {
						this.education = data.hightEducation
					}
					if (data.educationCode !== null && data.educationCode !== "") {
						this.dataTow.educationCode = data.educationCode
					}
					if (data.hightEducation == "大专以下") {
						this.isXXreport = ""
						this.onCodeShow = false
					} else {
						this.isXXreport = "*"
						this.onCodeShow = true
					}
					this.data = data
				}
			},
			goClick() {
				console.log(this.data);
				console.log("this.data.educationUrl", this.data.educationUrl);
				if (this.data.educationUrl == "" && this.onCodeShow == true) {
					this.$personal.msg("请上传您的学信网报告")
					return;
				}
				if (this.dataTow.educationCode == "" && this.onCodeShow == true) {
					this.$personal.msg("当前无法识别您的学信网报告，请重新上传")
					return;
				}
				if (this.education == "请选择" || this.education == "") {
					this.$personal.msg("请选择您的最高学历")
					return;
				}
				if (this.data.diplomaUrl == "") {
					this.$personal.msg("请上传您的毕业证")
					return;
				}
				if (this.data.isEducation == "") {
					this.data.isEducation = "当前未查询到学籍状态"
				}
				if (this.onCodeShow == false) {
					console.log(this.data.isEducation);
					this.data.educationCode = this.dataTow.educationCode
					this.$personal.setStorage("collect_data", JSON.stringify(this.data))
					uni.navigateTo({
						url: "../../../me/collectData/collectThreePage/collectThreePage?data=" +
							encodeURIComponent(JSON.stringify(this.data))
					})
				} else {
					this.getOCR(this.dataTow.educationCode)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.xxreport {
		display: flex;
		flex-direction: column;
		padding: 20px;
		background-color: white;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 16px;

		.xxreport_image {
			display: flex;
			padding-top: 10px;
		}

		.picker_education {
			display: flex;
			padding-top: 20px;

			.picker_option {
				width: 65%;
				align-items: center;
				padding-left: 30px;

				.option {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}

		.onCode {
			padding-top: 10px;
			display: flex;
			font-size: 16px;

			input {
				padding-left: 15px;
			}
		}
	}

	.diploma {
		padding: 20px;
		font-size: 16px;
		font-weight: bold;
		background-color: white;
		margin-bottom: 16px;

		.diploma_card {
			padding-top: 15px;
			display: flex;
		}
	}

	.degree {
		padding: 20px;
		font-size: 16px;
		font-weight: bold;
		background-color: white;
		margin-bottom: 16px;

		.degree_card {
			display: flex;
			padding-top: 10px;
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
			padding: 10px 80px;
			border-radius: 5px;
			color: white;
			background-color: rgba(0, 132, 255, 1);
		}
	}
</style>