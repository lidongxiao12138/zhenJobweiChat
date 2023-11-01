<template>
	<view>
		<view class="employerTab">
			<customselection :tablist="itemArr" :avtive="avtive" @itemclick="itemClick" :locationindex="itemIndex">
			</customselection>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemArr: [],
				avtive: "avtive",
				itemIndex: 0,
				navTitle: ""
			};
		},
		methods: {
			getPostionNameUrl() {
				let data = {}
				this.$api.getPostionNameList(data).then(res => {
					for (var i in res.data) {
						this.itemArr.push(res.data[i].name);
					}
				})
			},
			getPostionPlaceUrl() {
				let data = {}
				this.$api.getPostionPlaceList(data).then(res => {
					for (var i in res.data) {
						this.itemArr.push(res.data[i].place);
					}
				})
			},
			getPostionsalaryUrl() {
				let data = {}
				this.$api.getPostionSalaryList(data).then(res => {
					for (var i in res.data) {
						this.itemArr.push(res.data[i].salaryRange);
					}
				})
			},
			setPostionStorage(positionDic) {
				uni.setStorage({
					key: this.navTitle,
					data: {
						"position": positionDic,
					}
				})
			},

			getPostionStorage() {
				uni.getStorage({
					key: this.navTitle,
					success: (res) => {
						this.itemIndex = res.data.position.index
					}
				})
			},

			itemClick(data) {
				this.itemIndex = data.index;
				var positionDic = {
					name: this.itemArr[data.index],
					index: data.index
				};
				if (data.index == 0) {
					var positionDic = {
						name: this.navTitle,
						index: data.index
					};
				}
				console.log(positionDic);
				this.setPostionStorage(positionDic);
			}
		},
		onLoad: function(option) {
			this.navTitle = option.navTitle;
			if (option.navTitle == "职位") {
				this.getPostionNameUrl();
			}
			if (option.navTitle == "地点") {
				this.getPostionPlaceUrl();
			}
			if (option.navTitle == "薪资") {
				this.getPostionsalaryUrl();
			}
			this.itemArr.unshift("不限");
			this.getPostionStorage();
		}
	}
</script>

<style lang="scss">
	.employerTab {
		padding: 50rpx 10rpx;
	}
</style>