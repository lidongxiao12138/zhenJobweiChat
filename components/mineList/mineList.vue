<template>
	<view>
		<view class="mineList">
			<u-icon :name="iconName" :label="title" size="22"></u-icon>
			<u-icon name="arrow-right"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name:"mineList",
		data() {
			return {
				
			};
		},
		props:{
			iconName: {
				type:String,
				default:"thumb-up"
			},
			
			title: {
				type:String,
				default:"推荐有奖"
			}
		}
	}
</script>

<style lang="scss">
	.mineList {
		display: flex;
		justify-content: space-between;
	}
</style>