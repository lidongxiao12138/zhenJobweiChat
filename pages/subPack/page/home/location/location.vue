<template>
	<view>
		<view class="father">
			<customselection :tablist="placeArr" :avtive="avtivePlace" @itemclick="placeClick"
				:locationindex="placeindex"></customselection>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeArr: [],
				avtivePlace: "avtive",
				place: "不限",
				placeindex: 0
			};
		},
		methods: {
			getUrl() {
				let data = {}
				this.$api.location(data).then(res => {
					console.log('location ==', res);
					for (var i = 0; i < res.data.length; i++) {
						this.placeArr.push(res.data[i].place);
					}
					this.placeArr.unshift("不限");
				})
			},
			placeClick(data) {
				this.place = this.placeArr[data.index];
				this.placeindex = data.index;
				console.log(data.index);
				this.setStoragePlace();
			},
			setStoragePlace() {
				uni.setStorage({
					key: 'place',
					data: {
						"place": this.place,
						"placeindex": this.placeindex
					}
				})
			},
			storagePlace() {
				uni.getStorage({
					key: 'place',
					success: (res) => {
						console.log('res.data === ', res.data.placeindex);
						this.place = res.data.place;
						this.placeindex = res.data.placeindex;
					}
				})
			}
		},
		onLoad() {
			//请求地址
			this.getUrl();
			//储存选择状态
			this.storagePlace();
		},
	}
</script>

<style lang="scss">
	.father {
		padding: 30rpx;
	}
</style>