<template>
	<view>
		<view class="customselection" v-if="screenType">
			<view v-for="(item,index) in tablist" :key="index" class="customitem" :class="locationindex == index"
				@click="itemclick(index)">
				<text v-if="tablist[index].status == '0'">{{item.name}}</text>
				<text v-else style="color: #057CFF;">{{item.name}}</text>
			</view>
		</view>
		<view class="customselection" v-else>
			<view v-for="(item,index) in tablist" :key="index" class="customitem"
				:class="locationindex == index ? avtive : ''" @click="itemclick(index)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "customselection",
		data() {
			return {
				// locationindex:0
			};
		},
		props: {
			tablist: {
				type: Array,
				default () {
					return ["1", "2", "3"]
				}
			},
			avtive: {
				type: String,
				default: ""
			},
			screenType: {
				type: Boolean,
				default: false
			},
			listIndex: {
				type: Number,
				default: 0
			},
			locationindex: {
				type: Number,
				default: 0
			}
		},
		methods: {
			itemclick(e) {
				var listObj = {
					index: e,
					name: this.tablist[e].name,
					status: this.screenType,
					group: this.listIndex
				}
				this.$emit("itemclick", listObj);
			}
		},
		onLoad() {
			console.log('进入页面时加载的方法');
		}
	}
</script>

<style lang="scss">
	.customselection {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;

		.customitem {
			font-size: 13px;
			padding: 5px 20px;
			background: $uni-bg-color;
			border-radius: 8px;
			margin: 0rpx 10rpx 30rpx 20rpx;

			&.avtive {
				color: #057CFF;
			}
		}
	}
</style>