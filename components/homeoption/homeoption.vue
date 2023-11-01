<template>
	<view>
		<u-icon :name="icon" size="50px" :label="iconText" labelPos="bottom" space="13px" label-size="14px"></u-icon>
	</view>
</template>

<script>
	export default {
		name: "homeoption",
		data() {
			return {

			};
		},
		methods: {},
		props: {
			iconText: {
				type: String,
				default: "投递记录"
			},
			icon: {
				type: String,
				default: "../../static/logo.png"
			}
		}
	}
</script>

<style lang="scss">

</style>