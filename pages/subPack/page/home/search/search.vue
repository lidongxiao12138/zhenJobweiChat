<template>
	<view>
		<view class="searchtext">
			<view class="left">
				<icon class="icon" type="search" size="18"></icon>
				<input type="text" placeholder="请输入您要搜索的职位" v-model="searchtext" />
			</view>

			<view class="right">
				<view class="line"></view>
				<view class="butsearch" @click="searchclick">
					搜索
				</view>
			</view>

		</view>
		<view class="searchhistory">
			<view class="">
				搜索历史
			</view>

			<u-icon name="trash" size="20" @click="closeclick" ></u-icon>

		</view>
		<view class="searchblock">
			<customselection :tablist="searchArr" @itemclick="indexClick"></customselection>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchtext: "",
				searchArr: [],
			};
		},
		methods: {
			searchclick() {
				console.log(this.searchtext);
				if (this.searchtext != "" && this.searchArr.indexOf(this.searchtext) == -1) {
					this.searchArr.unshift(this.searchtext);
					if (this.searchArr.length > 10) {
						this.searchArr.pop();
					}
					this.storageSearch();
					this.goBack();
				} else {
					this.goBack();
				}
			},
			closeclick() {
				console.log("点击了删除按钮");
				this.storageRemoveSearch();
				this.searchArr = [];
			},
			goBack() {
				uni.$emit('searchtext', this.searchtext);
				uni.navigateBack();
			},
			storageSearch() {
				uni.setStorage({
					key: 'searchtitle',
					data: {
						"searchArr": this.searchArr,
					}
				})
			},
			storageGetSearch() {
				uni.getStorage({
					key:'searchtitle',
					success: (res) => {
						this.searchArr = res.data.searchArr;
					}
				})
			},
			storageRemoveSearch() {
				uni.removeStorage({
					key:'searchtitle'
				})
			},
			indexClick(data) {
				this.searchtext = this.searchArr[data.index];
			}
		},
		onLoad() {
			this.storageGetSearch();
		}
	}
</script>

<style lang="scss">
	.searchtext {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #f7f7f7;
		align-items: center;
		padding: 20rpx;
		height: 50rpx;
		margin: 20rpx 20rpx 0rpx 20rpx;
		border-radius: 50rpx;

		.left {
			display: flex;
			align-items: center;
			height: 30px;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-right: 20rpx;

			.line {
				width: 3rpx;
				height: 30rpx;
				margin-right: 15rpx;
				background-color: lightgrey;
			}

			.butsearch {
				color: #057CFF;
			}
		}
	}

	.searchhistory {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30px;
		padding: 20rpx;
	}

</style>
