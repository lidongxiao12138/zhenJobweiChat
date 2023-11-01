<template>
	<view>
		<view class="tabSelected">
			<view v-for="(item,index) in tablist" :key="index" class="item" :class="selectindex==index?'active':''" @click="clicktab(index)">
				<view class="title">{{item}}</view>
				<view class="" v-if="selectindex == index">
					<view class="line"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabSelected",
		props: {
			tablist: {
				type: Array,
				default () {
					return ["1", "2", "3"]
				}
			},
		},
		data() {
			return {
				selectindex: 0,
			};
		},
		methods:{
			clicktab(index){
				this.selectindex = index
			}
		}
	}
</script>

<style lang="scss">
	.tabSelected {
		padding: 0rpx 20rpx;
		display: flex;

		.item {
			padding: 20rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			color: #cdcdcd;
			&.active {
				font-size: 35rpx;
				color: #000000;
			}
			.title {
				padding-bottom: 10rpx;
			}

			.line {
				background: blue;
				width: 60rpx;
				height: 6rpx;
			}

		}

	}
</style>
