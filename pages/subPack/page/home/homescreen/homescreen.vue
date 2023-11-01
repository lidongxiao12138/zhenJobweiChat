<template>
	<view>
		<view class="father">
			<view class="worktype">
				<view v-for="(item,index) in screenArr" :key="index" class="tabSelected">
					<view>
						{{item}}
						<view class="list">
							<customselection :tablist="listArr[index]" :screenType="true" @itemclick="tabClick"
								:avtive="avtivePlace" :listIndex="index">
							</customselection>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenArr: ["工作类型", "学历要求", "工作经验", "期望薪资", "福利待遇"],
				screenType: ["nature", "mustEducation", "mustExperience", "salaryRange", "welfare"],
				listArr: [],
				listNumber: ["list1", "list2", "list3", "list4", "list5"],
				avtivePlace: "avtive",

			};
		},
		methods: {
			async getUrl() {
				let data = {}
				this.$api.screenlist(data).then(res => {
					var datalist = [];
					for (var i = 0; i < this.listNumber.length; i++) {
						var datalistArr = [{
							name: "不限",
							type: this.screenType[i],
							status: "1"
						}];
						datalist.push(datalistArr)
					}
					for (var i = 0; i < this.listNumber.length; i++) {
						var name = res.data[this.listNumber[i]];
						for (var j = 0; j < name.length; j++) {
							for (let key in name[j]) {
								if (key == this.screenType[i]) {
									var datalist2 = {
										name: name[j][key],
										type: this.screenType[i],
										status: "0"
									};
									datalist[i].push(datalist2)
								}
							}
						}
					}
					this.listArr = datalist
				})
			},
			tabClick(dataobj) {
				for (let item in this.listArr[dataobj.group]) {
					if (item == dataobj.index) {
						this.listArr[dataobj.group][item].status = "1";
					} else {
						this.listArr[dataobj.group][item].status = "0";
					}
				}
				this.setStoragePlace(this.listArr);
			},
			setStoragePlace(arr) {
				uni.setStorage({
					key: 'screen',
					data: {
						"listArr": arr,
					}
				})
			},
			getScreenStorage() {
				uni.getStorage({
					key: 'screen',
					success: (res) => {
						console.log('res.data.listArr ==== ', res.data);
						if (res.data.listArr.length > 0) {
							this.listArr = res.data.listArr;
						} else {
							this.getUrl();
						}
					},
					fail: (err) => {
						console.log('请求错误');
						this.getUrl();
					}
				})
			}
		},
		onLoad() {
			//更新UI本地化存储
			this.getScreenStorage();
		},

		//下拉刷新
		onPullDownRefresh() {
			this.getUrl();
			uni.stopPullDownRefresh();
			//清空数据
			var arr = [];
			this.setStoragePlace(arr);
		},

	}
</script>

<style lang="scss">
	.father {
		display: flex;
		flex-direction: column;
		padding: 10rpx 20rpx;
		font-size: 36rpx;
		font-weight: bold;

		.tabSelected {
			padding: 20rpx 0rpx;
			font-weight: normal;

			.list {
				padding: 30rpx 0rpx;
			}
		}
	}
</style>