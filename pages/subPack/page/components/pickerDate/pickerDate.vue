<template>
	<view>
		<view class="pickerDate">
			<view class="pickerDate">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" fields="month"
					@change="bindDateChange">
					<view class="option">
						<text style="color: #A2A7B0;" v-if="date=='请选择'">{{date}}</text>
						<text style="color: black;" v-else>{{date}}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<view class="lineView">
						<u-line color="#A2A7B0"></u-line>
					</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "pickerDate",
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
			};
		},
		props:{
			date:{
				type:String,
				default:"请选择"
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e){
			    this.$emit('bindDateChange',e.detail.value)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				if (type === 'start') {
					year = year - 100;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			}
		}
	}
</script>

<style lang="scss">
	.option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0rpx 20rpx;

		text {
			padding: 20rpx;
		}
	}
	.lineView {
		display: flex; 
		flex-direction: column;
		align-items: flex-end;
		margin-left: 40rpx;
	}
</style>
