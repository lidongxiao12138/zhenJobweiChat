<template>
	<view class="father">
		<view v-for="(item,index) in list" :key="index" class="list">
			<joblist :positionBool="position" :favoriteBool="favorite" :titleName="list[index].name"
				:mustEducation="list[index].mustEducation" :mustExperience="list[index].mustExperience"
				:nature="list[index].nature" :place="list[index].place" :salaryRange="list[index].salaryRange"
				:welfare="welfareArr[index]" :hrName="list[index].hrName" :hrImg="list[index].headImg"
				:hrPosition="list[index].hrPosition" @chatClick="chatClick(list[index])"></joblist>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				position: false,
				favorite: false,
				list: [],
				welfareArr: [],
			};
		},
		onLoad: function(option) {
			console.log(option);
			if (option.navTitle == "职位投递") {
				this.position = true
				this.favorite = true
				this.getPositionSendList();
				uni.setNavigationBarTitle({
					title: option.navTitle,
				})
			}
			if (option.navTitle == "面试职位") {
				this.getPositionInterviewList();
				uni.setNavigationBarTitle({
					title: option.navTitle,
				})
			}
			if (option.navTitle == "收藏职位") {
				this.position = false
				this.favorite = true
				this.getPositionCollectionList();
				uni.setNavigationBarTitle({
					title: option.navTitle,

				})
			}
		},
		methods: {
			getPositionCollectionList() {
				let data = {}
				console.log(data);
				this.$me_api.getPositionCollectionList(data).then(res => {
					console.log('getPositionCollectionList=', res);
					console.log(res.data);
					this.list = res.data;
					var welArr = [];
					for (var i = 0; i < this.list.length; i++) {
						welArr.push(this.list[i].welfare)
					}
					for (var i = 0; i < welArr.length; i++) {
						this.welfareArr.push(welArr[i].split(','))
					}
				})
			},

			getPositionSendList() {
				let data = {}
				console.log(data);
				this.$me_api.getPositionSendList(data).then(res => {
					console.log('getPositionSendList=', res);
					this.list = res.data;
					var welArr = [];
					for (var i = 0; i < this.list.length; i++) {
						welArr.push(this.list[i].welfare)
					}
					for (var i = 0; i < welArr.length; i++) {
						this.welfareArr.push(welArr[i].split(','))
					}
				})
			},

			getPositionInterviewList() {
				let data = {}
				console.log(data);
				this.$me_api.getPositionInterviewList(data).then(res => {
					console.log('getPositionInterviewList=', res);
					this.list = res.data;
					var welArr = [];
					for (var i = 0; i < this.list.length; i++) {
						welArr.push(this.list[i].welfare)
					}
					for (var i = 0; i < welArr.length; i++) {
						this.welfareArr.push(welArr[i].split(','))
					}
				})
			},

			chatClick(e) {
				console.log(e);
				let data = {
					"hrId": e.hrId,
					"positionId": e.id
				}
				console.log(data);
				this.$api.addContact(data).then(res => {
					console.log('addContact == ', res);
					if (res.data == true) {
						var nameList = {
							myName: uni.getStorageSync('openid'),
							your: e.hrId,
							yourName: e.hrName,
							optionId: e.id,
						};
						console.log(nameList);
						uni.navigateTo({
							url: "/pages/subPack/page/news/chatroom/chatroom?username=" + JSON
								.stringify(
									nameList),
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.father {
		padding: 30rpx 0rpx;

		.list {
			background: white;
			margin: 0rpx 20rpx;
			margin-bottom: 20rpx;
			border-radius: 10px;
		}
	}
</style>