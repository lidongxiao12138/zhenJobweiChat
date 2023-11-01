<template>
	<view>
		<view class="indivdualWork">
			<text>作品名称</text>
			<input type="text" placeholder="如：设计作品集" :value="indivdualWorkText" @blur="indivdualClick">
		</view>
		<view class="lineView">
			<u-line color="#A2A7B0"></u-line>
		</view>
		<view class="uploadIndivdual">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
				:maxCount="1"></u-upload>
		</view>
		<text class="textState" style="color: #A2A7B0;">上传附件，如JPG、PNG、JPEG格式</text>
		<view class="savebut">
			<u-button type="primary" shape="circle" @click="saveClick">保存</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				resume_information: {},
				indivdualWorkText: "",
			};
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				console.log(event);
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.$personal.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					console.log('result==', result);
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},

			//添加个人作品
			addOnlineReSumePerson(e) {
				var resume_person_work = [{
					"personId": this.resume_information.personId,
					"fileId": e,
					"personName": this.indivdualWorkText
				}]
				let data = {
					"data": {
						"resume_person_work": resume_person_work,
					},
				}
				this.$me_api.addOnlineReSumePerson(data).then(res => {
					console.log('addOnlineReSumePerson=', res);
					if (res.data == true) {
						uni.navigateBack();
					}
				})
			},
			indivdualClick(e) {
				this.indivdualWorkText = e.detail.value;
			},
			saveClick() {
				var data = JSON.parse(decodeURIComponent(this.fileList1[0].url));
				console.log("data ===== ", data.fileId);
				if (this.indivdualWorkText != "" && data.fileId != "") {
					this.addOnlineReSumePerson(data.fileId)
				} else {
					this.$personal.msg("请完善个人作品后保存", "error")
				}
			},
		},
		onLoad(option) {
			if (JSON.stringify(option) != '{}') {
				var resume_information = JSON.parse(decodeURIComponent(option.resume_information));
				this.resume_information = resume_information
			}
		}
	}
</script>

<style lang="scss">
	.indivdualWork {
		padding: 40rpx;
		padding-bottom: 10rpx;

		input {
			padding-top: 20rpx;
		}
	}

	.uploadIndivdual {
		padding: 40rpx;
	}

	.textState {
		padding-left: 40rpx;
	}

	.lineView {
		margin-left: 40rpx;
	}

	.savebut {
		margin: 0rpx 30rpx;
		padding-top: 50px;
		padding-bottom: 200rpx;
	}
</style>