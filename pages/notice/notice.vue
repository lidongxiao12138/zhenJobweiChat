<template>
	<view>
		<view class="loginOut" v-if="loginOut">
			<u-empty :show="true" text=" " icon="/static/images/home/LuxsanLogo.jpeg">
				<u-button @click="loginClick" size="small" type="primary" :style="{marginTop:10+'px'}" text="您当前未登录,去登录 >>">
				</u-button>
			</u-empty>
		</view>
		<view class="father" v-if="loginOut == false">
			<view class="u-page">
				<view class="intNotice" @click="intNoticeClick">
					<view class="left">
						<u-icon name="/static/icons/intNotice.png" size="45" label="面试通知" space="16rpx"></u-icon>
						<view class="box">
							<u-badge bg-color="#fc0107" numberType="overflow" max="99" :value="value"></u-badge>
						</view>
					</view>
					<view class="right">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="repNotice" @click="repNoticeClick">
					<view class="left">
						<u-icon name="/static/icons/repNotice.png" size="45" label="报到通知" space="16rpx"></u-icon>
						<view class="box">
							<u-badge bg-color="#fc0107" numberType="overflow" max="99" :value="value"></u-badge>
						</view>
					</view>

					<view class="right">
						<u-icon name="arrow-right"></u-icon>
					</view>

				</view>
			</view>
			<view class="list">
				<view v-for="(item,index) in noticelist" :key="index" class="noticelist" @click="listClick(index)">
					<noticeList :imagesrc="noticelist[index]" :title="titlelist[index]"></noticeList>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				loginOut: false,
				noticelist: ["/static/icons/notice_1.pic.jpg", "/static/icons/notice_2.pic.jpg",
					"/static/icons/notice_3.pic.jpg", "/static/icons/notice_4.pic.jpg"
				],
				titlelist: ["EHS立臻咨询快报", "传递立臻之声，浓缩立臻咨询", "[立臻企业文化节日祝福]向劳动者致敬", "这个五一·玩在一起·五一活动预告来袭"]
			};
		},
		onShow() {
			this.loginOut = uni.getStorageSync('loginOut')
		},
		methods: {
			intNoticeClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/notice/noticList/noticList?titleName=面试通知"
				})
			},
			repNoticeClick() {
				uni.navigateTo({
					url: "/pages/subPack/page/notice/noticList/noticList?titleName=报到通知"
				})
			},
			loginClick() {
				uni.switchTab({
					url: "/pages/me/me"
				})
			},
			listClick(e) {
				var webUrl = ""
				if (e == 0) {
					webUrl =
						"https://mp.weixin.qq.com/s?__biz=MzA4ODY4MTY3OQ==&mid=2247528687&idx=1&sn=b5565351013b130ea10a2cdeea4c0a09&chksm=90244d4fa753c459b7574454437569544e3145f5a0ddb47eef9234ebecdc2f6b39514e6287c7&scene=0&subscene=7&clicktime=1683099300&enterid=1683099300&sessionid=0&ascene=7&fasttmpl_type=0&fasttmpl_fullversion=6656669-zh_CN-zip&fasttmpl_flag=0&realreporttime=1683099300908&devicetype=android-33&version=2800233d&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&session_us=gh_a0e5403c5ebe&countrycode=CN&exportkey=n_ChQIAhIQD1fcUmqldIJB5YOdN6WgtxLmAQIE97dBBAEAAAAAAFFhI0jkkc8AAAAOpnltbLcz9gKNyK89dVj03hinCHwoM%2BXjaUClJecGl2GVP9BZx5Skk%2B8PJc54ZoShW8yWp1x8v2bCHPz6jbMkRuQAR48mgUeLwDNLjDmmq79bXqvMgezPx352I3fpQa8nizoLUfH81M3JvnsmlqqhqfZrA1m2qiu%2F58KOxGP3hhAByVXkgGuZjbH5a3%2FwCY6eP6WQSFNYbk5WLaj8B6eIclci3Rc7zWgzO%2F53XqiEa5ZNgkAm0GqASgfYq5Cx2LIus95xtPCqgZdU6zvS%2BRgv&pass_ticket=KtXb6DCOME2Jysck25bBX48j%2FNxFZ665AIEKegw1l%2BznT%2Bbj4Agk1NFqMYiptffV%2F%2FqdgSlzCEuP3XA4DKAqcA%3D%3D&wx_header=3"
				} else if (e == 1) {
					webUrl =
						"https://mp.weixin.qq.com/s?__biz=MzA4ODY4MTY3OQ==&mid=2247529288&idx=1&sn=1fe358228f3ec56fef6beb21b9153238&chksm=90244ee8a753c7fe24d2de724830c796e77c81712d968e1b3ac396db438eab3a52ca1b1b8d05&scene=0&subscene=7&clicktime=1683099741&enterid=1683099741&sessionid=0&ascene=7&fasttmpl_type=0&fasttmpl_fullversion=6656669-zh_CN-zip&fasttmpl_flag=0&realreporttime=1683099741235&devicetype=android-33&version=2800233d&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&session_us=gh_a0e5403c5ebe&countrycode=CN&exportkey=n_ChQIAhIQMRckrubdMAt9ALS3n4pRiRLmAQIE97dBBAEAAAAAAG71CrXNAIkAAAAOpnltbLcz9gKNyK89dVj0mmMCoShhbmz0cL0FhLoLLJ1LfmyG6MvnonGMXLnsvXDTRNc23ex%2BLlvOHMCFhE3tCWLjgbiUl%2FQb4o9MCKMHGJgkEf%2FdNpqVoTBxPqJcmsaYObL%2B3o5sPfjJ13UOrpIBuOD4IInowTg7qqVhIu60IXyaMdkAWLA22%2BtyNz%2FW6hOC3Xa52eL7BQhSTqtziKSD8MsYO96%2Bu19ejNHXOVhDEz0bXSxf%2BOI2YJwDrxzlzWyR%2FkE7TmJJomAYjQA8R4ez&pass_ticket=KtXb6DCOME2Jysck25bBX48j%2FNxFZ665AIEKegw1l%2Bz%2F8P99esxG3LWUB%2BjZcDNHH8b2L%2FxQCjqMlI1LyvNTgg%3D%3D&wx_header=3"
				} else if (e == 2) {
					webUrl =
						"https://mp.weixin.qq.com/s?__biz=MzA4ODY4MTY3OQ==&mid=2247529113&idx=1&sn=922171d015f40cfac9a9dcdd0bf19674&chksm=90244f39a753c62f37b0d42a42c9c56e29d5148ab2b1a5f602be96bb71789a8d48ce0805235c&scene=0&subscene=7&clicktime=1683099465&enterid=1683099465&sessionid=0&ascene=7&fasttmpl_type=0&fasttmpl_fullversion=6656669-zh_CN-zip&fasttmpl_flag=0&realreporttime=1683099465932&devicetype=android-33&version=2800233d&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&session_us=gh_a0e5403c5ebe&countrycode=CN&exportkey=n_ChQIAhIQQF62DpTVFZ1amf0%2BPgwUKRLmAQIE97dBBAEAAAAAAJnhOdyqRUgAAAAOpnltbLcz9gKNyK89dVj0%2BPCx7JeZu%2FdHKAwSyRgs0bfA%2BiHe4enbCu8ndp4MuvYq1ELwIOqnrvNMDvi%2FlAsl6vzqfznLZ9xYnTHjs7lUSZSvHFFyihNoSqVRB7fc%2FijrEfdpZh4JNNAwLMogJ1XX6Rv8EljJhImaIzXRL6jxKUXwotQRqRtQr5HGBnCKh5LSHtBtgk2jdIAIZ15ZGmlYdQwVSZEb3xIP8d6Z1pqoJhbkyKifbaG1sERw1lgqbAQ8f0E%2FGb7CND2m%2BZgJWD4p&pass_ticket=KtXb6DCOME2Jysck25bBX48j%2FNxFZ665AIEKegw1l%2ByV3mnjSuhzkzsS1oTa%2BxmS3uRa%2FAEcZ7QL2DoiMHLvWQ%3D%3D&wx_header=3"
				} else if (e == 3) {
					webUrl =
						"https://mp.weixin.qq.com/s?__biz=MzA4ODY4MTY3OQ==&mid=2247529056&idx=1&sn=f142ccd99d3d8f99bb4d8cc2d809f4c3&chksm=90244fc0a753c6d6630cfc9e5f0f5198a741c35c25eb36250d7309fd9541ca38af3f393a30ee&scene=0&subscene=7&clicktime=1683099588&enterid=1683099588&sessionid=0&ascene=7&fasttmpl_type=0&fasttmpl_fullversion=6656669-zh_CN-zip&fasttmpl_flag=0&realreporttime=1683099588544&devicetype=android-33&version=2800233d&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&session_us=gh_a0e5403c5ebe&countrycode=CN&exportkey=n_ChQIAhIQHo00MHJYQRPWxNlG5BQ%2B2hLbAQIE97dBBAEAAAAAAIbUC4Z2tQ8AAAAOpnltbLcz9gKNyK89dVj0s2gx6dmqBHu72XVEylgblWp8ksNnY3%2FawLtDY9M%2ByW2jwmbp%2BGrQvry%2B7oYaghQH0qm00DMC%2B2AxJgOlmXDkpPr2Uwv3t3%2FMK0HkAhp9LNcNu%2BM80XAHsqKieiTG29Rqc4eZNgiju3SabrA%2BSDWYsfmuH8kyqMEL5XEq8J0FiqF9ZEj81LyYlTBRpFMnZ%2Fd96hiweF8Fq%2BCaihm%2BNeav%2FDjewQKw%2BrrjFv8F5HN%2Bt71SJlu%2BHg%3D%3D&pass_ticket=KtXb6DCOME2Jysck25bBX48j%2FNxFZ665AIEKegw1l%2ByIKdPQHeiNgC91ajy0eB7dr8qewk2EnWFZ7harsYLbnA%3D%3D&wx_header=3"
				}
				uni.navigateTo({
					url: "/pages/subPack/page/webView/webView?navTitle=通知&url=" +
						encodeURIComponent(JSON.stringify(webUrl))
				})

			}
		}
	}
</script>

<style lang="scss">
	.loginOut {
		display: flex;
		flex-direction: column;
		margin: 100px;
	}

	page {
		// background: $uni-bg-color;
	}

	.u-page {
		background: $uni-bg-color;
		display: flex;
		flex-direction: column;

		.intNotice {
			background: white;
			padding: 30rpx 20rpx;
			margin-left: 20rpx;
			margin: 20rpx;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.repNotice {
			background: white;
			padding: 30rpx 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.box {
		margin-left: -150rpx;
		z-index: 999;
	}

	.list {
		padding-bottom: 50rpx;

		.noticelist {
			margin: 20rpx;
			border-radius: 10px;
		}
	}
</style>