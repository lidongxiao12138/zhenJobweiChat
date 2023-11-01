<template>
	<view>
		<web-view :src="webUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl: "",
				titleName: ""
			};
		},
		onLoad: function(option) {
			console.log(option);
			if (JSON.stringify(option) != '{}') {
				var webUrl = JSON.parse(decodeURIComponent(option.url));
				console.log("webUrl:",webUrl);
				this.webUrl = webUrl
			}
			uni.setNavigationBarTitle({
				title: option.navTitle,
			})
		}
	}
</script>

<style lang="scss">

</style>