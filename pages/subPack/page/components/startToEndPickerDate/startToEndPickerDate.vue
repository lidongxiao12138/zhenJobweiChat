<template>
	<view>
		<view class="pickerDate">
			<picker mode="date" :value="dateStart" :start="startDate" :end="endDate" fields="month"
				@change="bindDateChange" style="display: flex; padding-right: 80rpx;">
				<view class="option">
					<text style="color: #A2A7B0;" v-if="dateStart=='入职时间' || '开始时间'">{{dateStart}}</text>
					<text style="color: black;" v-else>{{dateStart}}</text>
				</view>
			</picker>
			<view class="text" style="display: flex; padding-right: 80rpx;">
				至
			</view>
			<picker mode="date" :value="dateEnd" :start="startDate" :end="endDate" fields="month"
				@change="bindDateEndChange">
				<view class="option">
					<text style="color: #A2A7B0;" v-if="dateEnd=='离职时间' || '结束时间'">{{dateEnd}}</text>
					<text style="color: black;" v-else>{{dateEnd}}</text>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		name: "startToEndPickerDate",
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {

			};
		},
		props: {
			dateStart: {
				type: String,
				default: "入职时间"
			},
			dateEnd: {
				type: String,
				default: "离职时间"
			}
		},

		computed: {
			startDate() {
				return this.getDate("start");
			},
			endDate() {
				return this.getDate("end");
			}
		},
		methods: {
			bindDateChange: function(e) {
				// this.dateStart = e.detail.value
				console.log(e.detail.value);
				this.$emit('bindDateChange', e.detail.value)
			},
			bindDateEndChange: function(e) {
				// this.dateEnd = e.detail.value
				this.$emit('bindDateEndChange', e.detail.value)
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				if (type == "start") {
					year = year - 15;
				} else if (type == "end") {
					year = year;
				}
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			}
		}
	}
</script>

<style lang="scss">
	.pickerDate {
		display: flex;
		align-items: baseline;
	}
</style>