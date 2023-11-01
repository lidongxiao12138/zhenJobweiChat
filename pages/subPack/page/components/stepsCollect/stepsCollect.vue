<template>
	<view class="steps">
		<u-steps :current="stepsIndex">
			<u-steps-item title="基本信息"></u-steps-item>
			<u-steps-item title="学历信息"></u-steps-item>
			<u-steps-item title="工作信息"></u-steps-item>
		</u-steps>
	</view>
</template>

<script>
	export default {
		name: "stepsCollect",
		data() {
			return {

			}
		},
		props: {
			stepsIndex: {
				type: Number,
				default: 0
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss">
	.steps {
		display: flex;
		flex-direction: row;
		background-color: white;
		padding-top: 30px;
		width: 100%;
		margin-bottom: 16px;
	}
</style>