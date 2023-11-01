<template>
	<view>
		<view class="nav_background">
			<image style="width: 100%; z-index: 10" :src="background" mode="scaleToFill"></image>
		</view>
		<view class="head">
			<view class="left">
				<image src="/pages/subPack/page/static/home/LuxsanLogo.jpeg" mode="scaleToFill"
					style="width: 50px; height: 50px; border-radius: 50px;">
				</image>
			</view>
			<view class="right">
				<text style="font-size: 36rpx; font-weight: bold;">立臻科技（昆山）有限公司</text>
				<view class="titleText">
					<text style="font-size: 10px;">已上市</text>
					<u-line direction="col" color="#999999" length="15"></u-line>
					<text style="font-size: 10px;">10000人以上</text>
					<u-line direction="col" color="#999999" length="15"></u-line>
					<text style="font-size: 10px;">电子/半导体/集成电路</text>
				</view>
			</view>
		</view>

		<view class="content_company">
			<view class="companyAddress">
				<text style="font-size: 36rpx;">公司地址</text>
				<view class="_img" @click="mapClick">
					<image src="/pages/subPack/page/static/home/mapAddress.png" mode="scaleToFill"
						style="width: 100%; height: 320rpx;">
					</image>
				</view>
			</view>
			<view class="companyInfo">
				<text style="font-size: 36rpx;">公司简介</text>
				<text style="color: #606266; padding-left: 50rpx;">{{positionNum}}</text>
			</view>
			<view class="companyContext" style="color: #3C414D; font-size: 28rpx;">
				立讯精密工业股份有限公司: 2004
				年5月24日成立，总部位于中国广东省东莞市，制造基地主要分布在中国的广东、江西、江苏、安徽、浙江、台湾等地，海外主要位于德国和越南。公司业务范围包括消费电子产品（连接线、连接器、马达、无线充电、天线、声学产品等）、企业级产品（高速连接线、连接器、基站天线、滤波器等）、汽车产品（汽车线束、连接器、汽车电子模块等）。公司产品广泛应用于消费电子、通讯、企业级、汽车及医疗等多个重要领域。2010
				年 9 月 15 日于深圳 A股挂牌上市（股票代码
				002475），自上市以来，营业收入年复合增长率达50%，2021年公司实现营业收入1539.46亿元，较上年同期增长66.43%，实现归属于母公司所有者的净利润70.71亿元。作为客户优选，立讯精密拥有专业级、创新型的多元化产品系列，始终坚持以技术导向为核心，集产品研发和应用服务于一体，并逐步实现从传统制造向智能制造跨越。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: this.$personal.config.baseImageUrl + "2023/wechat_home/home_company_background.png",
				distanceText: "",
				lat1: 31.35029,
				lng1: 120.986148,
				positionNum: "",
			};
		},
		methods: {
			getHomeList() {
				let data = {
					"order": "id"
				}
				console.log(data);
				this.$api.homelist(data).then(res => {
					console.log('res.data.list == ', res);
					this.positionNum = "在招职位" + res.data.total;
				}).catch(err => {

				})
			},
			mapClick() {
				uni.openLocation({
					latitude: 31.344631,
					longitude: 120.981872,
					name: "立臻科技(昆山)有限公司",
					success: function() {
						console.log('success');
					}
				});
			},
			mapLocation() {
				let that = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					geocode: true,
					success: (res) => {
						this.distance(this.lat1, this.lng1, res);
					},
				});
			},
			distance(lat1, lng1, res) {
				let lat2 = res.latitude;
				let lng2 = res.longitude;
				let rad1 = lat1 * Math.PI / 180.0;
				let rad2 = lat2 * Math.PI / 180.0;
				let a = rad1 - rad2;
				let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) *
					Math.cos(
						rad2) * Math.pow(
						Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				s = s.toString();
				s = s.substring(0, s.indexOf('.') + 2);
				this.distanceText = "距您当前位置" + s + "公里";
			},
		},
		onShow() {
			this.mapLocation();
		},
		onLoad() {
			this.getHomeList();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.nav_background {
		position: absolute;
		width: 100%;
	}

	.head {
		position: absolute;
		display: flex;
		flex-direction: row;
		right: 10px;
		left: 10px;
		top: 200px;
		padding: 10px 20px;
		background-color: white;
		border-radius: 10px;
		z-index: 100;

		.left {
			margin-right: 20px;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-weight: bold;

			.titleText {
				align-items: center;
				display: flex;
				flex-direction: row;
				margin-left: -20rpx;

				text {
					padding: 20rpx;
				}
			}
		}
	}

	.content_company {
		position: absolute;
		top: 300px;
		margin: 10px;
		margin-top: 0px;
		border-radius: 10px;

		.companyAddress {
			padding: 10px;
			background-color: white;
			border-radius: 10px;
			margin-bottom: 10px;

			._img {
				margin: 10px 0px;

				image {
					border-radius: 10px;
				}
			}
		}
	}

	.companyInfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10rpx 30rpx;
		margin-bottom: 10px;
	}

	.companyContext {
		padding: 10rpx 30rpx;
		padding-bottom: 100rpx;
		background: white;
		border-radius: 10px;
	}
</style>