<template>
	<view class="recjobview">
		<view class="title">
			<view v-for="(item,index) in titleNameArr" :key="index" class="item"
				:class="titleindex == index ? 'active':''" @click="clickitem(index)">
				{{item}}
			</view>
		</view>
		<view class="right">
			<view class="right_context" @click="locationClick">
				{{place}}
				<u-icon size="9px" name="/static/icons/right_down.png" color="#CCCCCC"></u-icon>
			</view>
			<view class="right_context" @click="screenClick">
				{{screen}}
				<u-icon size="9px" name="/static/icons/right_down.png" color="#CCCCCC"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "recjobview",
		data() {
			return {
				titleNameArr: ["推荐", "最新"],
				titleindex: 0,
			};
		},
		methods: {
			locationClick() {
				this.$emit("locationclick")
			},
			clickitem(index) {
				console.log(index);
				this.titleindex = index
				this.$emit("clickitem", this.titleNameArr[index])
			},
			screenClick() {
				this.$emit("screenClick")
			}
		},
		props: {
			place: "",
			screen: ""
		}
	}
</script>

<style lang="scss">
	.recjobview {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx 0rpx 10rpx 30rpx; //上，右，下，左

		.title {
			font-size: 25rpx;
			font-weight: bold;
			display: flex;
			flex-direction: row;
			align-items: baseline;

			.item {
				padding-right: 20rpx;
				color: gray;

				&.active {
					font-size: 35rpx;
					color: #000000;
				}
			}
		}

		.right {
			display: flex;
			.right_context {
				display: flex;
				background-color: #F5F7FA;
				margin-right: 20rpx;
				padding: 0px 10px;
				max-width: 120px;
				min-width: 50px;
				justify-content: space-between;
				align-content: baseline;
				border-radius: 5px;
			}
		}
	}
</style>