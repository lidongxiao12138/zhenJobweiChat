<template>
	<view class="joblist">
		<view class="left">
			<view class="titleName">
				{{titleName}}
			</view>
			<view class="condition" style="font-size: 12px;">
				<view class="year">
					{{mustExperience}}
				</view>
				<view class="line"></view>
				<view class="education">
					{{mustEducation}}
				</view>
				<view class="line"></view>
				<view class="position">
					{{nature}}
				</view>
			</view>
			<view class="welfare">
				<view v-for="(item,index) in welfare" :key="index" class="welfarelist">
					{{item}}
				</view>
			</view>

			<view class="person">
				<u-avatar class="avatar" size="18" :src="hrImg"></u-avatar>
				<view class="name" style="font-size: 11px; color:#808080;">
					{{hrName}} · {{hrPosition}}
				</view>
			</view>
		</view>
		<view class="right">
			<view class="pay">
				{{salaryRange}}
			</view>

			<view class="address" style="font-size: 11px;">
				{{place}}
			</view>
			<view class="positionView">
				<view class="chat" v-if="favoriteBool">
					<u-button type="primary" shape="circle" text="立即沟通" class="chat" size="mini" @click="chatClick">
					</u-button>
				</view>
				<view class="timeOrState" style="font-size: 23rpx;" v-if="positionBool">
					<text style="color: #606266;">1-12 17:00</text>
					<text style="color: #FF5C1C;">已投递</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "joblist",
		data() {
			return {
			};
		},
		props: {
			welfare: {
				type: Array,
				default () {
					return ["五险一金"]
				}
			},
			titleName: {
				type: String,
				default: "正在加载...",
			},
			mustExperience: {
				type: String,
				default: "工作经历",
			},
			mustEducation: {
				type: String,
				default: "学历",
			},
			nature: {
				type: String,
				default: "全职",
			},
			place: {
				type: String,
				default: "地点",
			},
			salaryRange: {
				type: String,
				default: "薪资",
			},
			hrImg: {
				type: String,
				default: "",
			},
			hrName: {
				type: String,
				default: "hr姓名",
			},
			hrPosition: {
				type: String,
				default: "hr职位",
			},
			positionBool: {
				type: Boolean,
				default: false
			},
			favoriteBool: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			chatClick() {
				this.$emit("chatClick");
			}
		},
	}
</script>

<style lang="scss">
	.joblist {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0rpx 10px 0px 8px; //上右下左
		padding: 20rpx 10rpx;
	}

	.left {
		.titleName {
			font-size: 17px;
			font-weight: bold;
		}

		.condition {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 15rpx 0rpx;
			color: $uni-text-color-condition;

			view {
				margin-right: 20rpx;
			}

			.line {
				width: 3rpx;
				height: 20rpx;
				align-items: center;
				background: $uni-text-color-grey;
			}
		}

		.welfare {
			display: flex;

			.welfarelist {
				font-size: 11px;
				border-radius: 5px;
				padding: 10rpx 20rpx;
				margin-right: 15rpx;
				background-color: #f4f7fc;
				color: #808080;
			}
		}

		.person {
			display: flex;
			align-items: center;
			padding: 20rpx 0rpx;

			.name {
				margin-left: 20rpx;
			}
		}
	}

	.right {
		display: flex;
		flex-direction: column;
		margin-top: 10rpx;
		align-items: flex-end;
		
		.pay {
			font-size: 18px;
			font-weight: bold;
			color: #0084FF;
		}

		.address {
			margin-top: 19rpx;
			color: $uni-text-color-condition;
		}

		.positionView {
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.chat {
				color: white;
				position: relative;
				display: flex;
				border-radius: 25px;
				margin-top: 10rpx;
				height: 30px;
				width: 70px;

			}

			.timeOrState {
				margin-top: 10rpx;
				text-align: center;

				text {
					padding: 10rpx;
				}
			}

		}
	}
</style>