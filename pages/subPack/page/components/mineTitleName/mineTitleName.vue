<template>
	<view>
		<view class="mineTitleName">
			<text style="font-size: 36rpx; font-weight: bold;">{{titleName}}</text>
			<view class="" v-if="addIconBool==false">
				<u-icon :name="iconName" size="20px" @click="editClick"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "mineTitleName",
		data() {
			return {

			};
		},
		props: {
			addIconBool: {
				type: Boolean,
				default: false
			},
			titleName: {
				type: String,
				default: "求职意向"
			},
			iconName: {
				type: String,
				default: "edit-pen"
			}
		},
		methods: {
			editClick() {
				this.$emit("editClick")
			}
		}
	}
</script>

<style lang="scss">
	.mineTitleName {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		padding-bottom: 0rpx;
		align-items: center;
	}
</style>