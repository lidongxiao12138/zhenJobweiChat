<template>
	<view class="father">
		<view class="headView" catchtouchmove="true">
			<view class="background_image">
				<image style="width: 100%; height: 190px;" :src="background" mode="scaleToFill"></image>
			</view>
			<view class="cardEmployer">
				<view class="employer">
					<image :src="hrDetail.headUrl" mode="scaleToFill"
						style="width: 50px; height: 50px; border-radius: 50px; border: 2px solid #FFFFFF; z-index: 1000; color: white;">
					</image>
					<view class="title">
						<text style="color: #FFFFFF;">{{hrDetail.hrName}}</text>
						<text style="font-size: 26rpx; color: #FFFFFF;">{{hrDetail.hrPosition}}</text>
						<text style="font-size: 26rpx; color: #FFFFFF;">立臻科技有限公司</text>
					</view>
				</view>
			</view>
		</view>

		<view class="content_list">
			<view class="headtitle">
				在招职位
			</view>
			<view class="screenView">
				<u-icon :label=positionText label-pos="left" :label-size="icon_labsize" name="arrow-down-fill" size="10" color="#CED3DB"
					@click="optionClick">
				</u-icon>
				<u-icon :label=locationText label-pos="left" :label-size="icon_labsize" name="arrow-down-fill" size="10" color="#CED3DB"
					@click="locationClick">
				</u-icon>
				<u-icon :label=salaryRangeText label-pos="left" :label-size="icon_labsize" name="arrow-down-fill" size="10" color="#CED3DB"
					@click="salaryRangeClick">
				</u-icon>
			</view>
			<view class="list">
				<view v-for="(item,index) in list" :key="index" class="joblist" @click="itemClick(list[index].id)">
					<joblist :titleName="list[index].name" :mustEducation="list[index].mustEducation"
						:mustExperience="list[index].mustExperience" :nature="list[index].nature" :place="list[index].place"
						:salaryRange="list[index].salaryRange" :welfare="listWelfareArr[index]" :hrName="list[index].hrName"
						:hrImg="list[index].headImg" :hrPosition="list[index].hrPosition"></joblist>
						<u-line color="#999999" length="100%"></u-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: this.$personal.config.baseImageUrl + "2023/wechat_home/home_hr_background.png",
				hrDetail: {},
				list: [],
				icon_labsize:"14",
				listWelfareArr: [],
				positionText: "职位",
				locationText: "地点",
				salaryRangeText: "薪资",
				page: 1,
				hrId: ""
			};
		},
		//下拉刷新
		onPullDownRefresh() {
			//清空数据
			this.setStoragePlace();
			uni.stopPullDownRefresh();
			this.getPostionStorage();
			console.log('下拉加载');
		},
		//上拉加载
		onReachBottom() {
			console.log('上拉加载')
		},
		methods: {
			getUrl() {
				let data = {
					"hrId": this.hrId,
					"place": this.locationText == "地点" ? "" : this.locationText,
					"salary": this.salaryRangeText == "薪资" ? "" : this.salaryRangeText,
					"name": this.positionText == "职位" ? "" : this.positionText,
					"page": this.page,
					"size": "10",
				}
				console.log('data === ', data);
				this.$api.getHrDetailById(data).then(res => {
					console.log(res);
					this.hrDetail = res.data.hrDetail[0];
					console.log('this.hrDetail == ', this.hrDetail);
					if (this.hrDetail.headUrl !== null && this.hrDetail.headUrl !== "") {
						data.headImg = this.$personal.config.baseImageUrl + this.hrDetail.headUrl
					} else {
						this.hrDetail.headUrl = this.$personal.config.defaultImage
					}
					if (data.disabled == "Y") {
						datalist.push(data)
					}
					this.list = res.data.recruitmentPosition.list;
					this.list.forEach(data => {
						if (data.headImg !== null && data.headImg !== "") {
							data.headImg = this.$personal.config.baseImageUrl + data.headImg
						} else {
							data.headImg = this.$personal.config.defaultImage
						}
					})
					var welArr = [];
					if (this.list.length > 0) {
						for (var i = 0; i < this.list.length; i++) {
							welArr.push(this.list[i].welfare)
						}
						for (var i = 0; i < welArr.length; i++) {
							this.listWelfareArr.push(welArr[i].split(','))
						}
					}
				})
			},
			optionClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/home/employerDeatil/employerTable/employerTable?navTitle=职位"
				})
			},
			locationClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/home/employerDeatil/employerTable/employerTable?navTitle=地点"
				})
			},
			salaryRangeClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/home/employerDeatil/employerTable/employerTable?navTitle=薪资"
				})
			},
			itemClick(e) {
				uni.navigateTo({
					url: "/pages/subPack/page/home/homelistdetail/homelistdetail?id=" + e,
				})
			},
			getPostionStorage() {
				let screenArr = ["职位", "地点", "薪资"]
				for (var i in screenArr) {
					uni.getStorage({
						key: screenArr[i],
						success: (res) => {
							if (screenArr[i] == "职位") {
								this.positionText = res.data.position.name
							}
							if (screenArr[i] == "地点") {
								this.locationText = res.data.position.name
							}
							if (screenArr[i] == "薪资") {
								this.salaryRangeText = res.data.position.name
							}
						}
					})
				}
				this.getUrl();
			},
			setStoragePlace() {
				let screenArr = ["职位", "地点", "薪资"];
				for (var i in screenArr) {
					var positionDic = {
						name: screenArr[i],
						index: 0
					};
					console.log(positionDic);
					uni.setStorage({
						key: screenArr[i],
						data: {
							"position": positionDic,
						}
					})
				}
				this.positionText = "职位";
				this.locationText = "地点";
				this.salaryRangeText = "薪资";
			},
		},
		onLoad: function(option) {
			this.hrId = option.hrId
		},
		onShow() {
			this.getPostionStorage();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
		padding-bottom: 350px;
	}

	.headView {
		height: 380rpx;

		.background_image {
			position: absolute;
			width: 100%;
			z-index: 10;
		}

		.cardEmployer {
			position: absolute;
			top: 50px;
			border-radius: 10rpx;
			margin: 0rpx 24rpx;
			z-index: 100;

			.employer {
				display: flex;
				padding: 36rpx;

				.title {
					font-size: 32rpx;
					padding-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
			}
		}
	}

	.content_list {
		position: absolute;
		top: 150px;
		right: 10px;
		left: 10px;
		z-index: 100;
		background-color: white;
		border-radius: 10px;

		.headtitle {
			font-size: 17px;
			font-weight: bold;
			padding: 20px;
		}

		.screenView {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0px 30px;
		}

		.list {
			padding: 10px;
			padding-bottom: 30px;
			

			.joblist {
				background: white;
				border-radius: 10px;
				margin: 10rpx 0rpx;
				margin-bottom: 0px;
			}
		}
	}
</style>