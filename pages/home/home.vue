<template>
	<view>
		<u-navbar class="navbar" :bgColor="navbar_bgColor" leftIcon=" ">
			<view @click="butSearch" class="u-nav-slot" slot="left">
				<u-icon color="white" name="search" size="18" :label="searchtitle" label-color="white" space="8px"></u-icon>
			</view>
		</u-navbar>
		<view class="nav_backgound_image">
			<u-image width="100%" :src="nav_backgound_image" mode="aspectFill"></u-image>
		</view>
		<view class="content_page">
			<view class="head">
				<view class="homeoption">
					<view v-for="(item,index) in iconText" :key="index" @click="homeoptionClick(index)">
						<homeoption :icon="icon[index]" :iconText="iconText[index]"></homeoption>
					</view>
				</view>

				<view class="home_swper">
					<u-image width="100%" height="90px" :src="home_swper" mode="widthFix"></u-image>
				</view>
			</view>

				<view class="tabselected">
					<recjobview @locationclick="locpush" @clickitem="titleNameclick" :place="place" :screen="screen"
						@screenClick="screenGo">
					</recjobview>
				</view>
				
			<view class="content">
				<view v-for="(item,index) in list" :key="index" class="list" @click="itemClick(list[index].id)">
					<joblist :titleName="list[index].name" :mustEducation="list[index].mustEducation"
						:mustExperience="list[index].mustExperience" :nature="list[index].nature" :place="list[index].place"
						:salaryRange="list[index].salaryRange" :welfare="welfareArr[index]" :hrName="list[index].hrName"
						:hrImg="list[index].headImg" :hrPosition="list[index].hrPosition"></joblist>
				</view>
			</view>

			<view class="protocolViewShow">
				<u-popup :show="showLogin" mode="bottom" round="10" :safeAreaInsetBottom="true" :safeAreaInsetTop="false">
					<userProtocolView @agreeClick="agreeClick" @chooseavatar="chooseavatar" @showTostClick="showTostClick">
					</userProtocolView>
					<u-toast ref="uToast"></u-toast>
				</u-popup>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				nav_backgound_image: this.$personal.config.baseImageUrl + "2023/wechat_home/home_nav_backgound.png",
				home_swper: this.$personal.config.baseImageUrl + "2023/wechat_home/home_swper.png",
				list: [],
				swiperImgArr: [],
				imageUrl: "",
				icon: [
					this.$personal.config.baseImageUrl + "2023/wechat_home/send_icon.png",
					this.$personal.config.baseImageUrl + "2023/wechat_home/collect_icon.png",
					this.$personal.config.baseImageUrl + "2023/wechat_home/company_icon.png"
				],
				iconText: ["投递记录", "收藏职位", "企业介绍"],
				navbar_bgColor: "transparent", //#057CFF
				order: "id",
				place: "地点",
				screen: "筛选",
				searchtitle: "搜索职位",
				welfareArr: [],
				nature: "",
				education: "",
				salary: "",
				welfare: "",
				mustExperience: "",
				page: 1,
				size: 10,
				total: 0,
				showLogin: false,
			};
		},
		onPullDownRefresh() {
			console.log('上拉加载');
			this.page = 1;
			this.list = [];
			this.swiperImgArr = [];
			this.getSildImageUrl();
			// 2. 重新发起请求
			this.getHomeList(() => uni.stopPullDownRefresh())
		},
		//上拉加载
		onReachBottom() {
			if (this.page * this.size >= this.total) return this.$personal.msg('数据加载完毕!')
			// 让页码值自增+1
			this.page++
			this.getHomeList()
		},
		//页面滑动监听
		onPageScroll(res) {
			if (res.scrollTop > 30) {
				this.navbar_bgColor = "#057CFF"
			} else {
				this.navbar_bgColor = "transparent"
			}
			uni.$emit('onPageScroll', res.scrollTop);
		},
		onShow() {
			console.log("刷新页面");
			//获取城市后加载列表
			this.storagePlace();
			//获取筛选后加载列表
			this.getScreenStorage();
			this.searchtext();
			this.page = 1;
			this.list = []
			this.getHomeList();
		},
		onUnload() {
			this.removeSearch();
		},
		mounted() {
			uni.hideTabBar();
			this.getSildImageUrl();
			//判断是否有openid
			if (uni.getStorageSync('openid') == "") {
				this.showLogin = true;
			} else {
				this.showLogin = false
				uni.showTabBar();
				// this.webUIRegister().finally(() => {
				this.$personal.setStorage("myUsername", uni.getStorageSync('openid'))
				// console.log("成功-失败-都执行")
				// })
			}
		},
		methods: {
			//授权登录
			meinformation() {
				this.$personal.login();
			},
			butSearch() {
				uni.navigateTo({
					url: "/pages/subPack/page/home/search/search",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getSildImageUrl() {
				let data = {};
				this.$api.slideImage(data).then(res => {
					res.data.forEach(item => {
						var imageUrl = this.$personal.config.baseImageUrl + item.url
						this.swiperImgArr.push(imageUrl)
					})
				})
			},

			async homeoptionClick(index) {
				console.log('loginOut====', uni.getStorageSync('loginOut'));
				if (uni.getStorageSync('loginOut') == true) {
					let res = await this.$personal.showMoalMsg("您当前没有登录，请到“我的”进行登录")
					if (res) {
						uni.switchTab({
							url: "/pages/me/me"
						})
					}
				} else {
					switch (index) {
						case 0:
							uni.navigateTo({
								url: "/pages/subPack/page/favoritePage/favoritePage?navTitle=职位投递"
							})
							break;
						case 1:
							uni.navigateTo({
								url: "/pages/subPack/page/favoritePage/favoritePage?navTitle=收藏职位"
							})
							break;
						case 2:
							let webUrl =
								"https://mp.weixin.qq.com/s?__biz=MzA4ODY4MTY3OQ==&mid=2247529946&idx=1&sn=31634f29685b1d9505405dd533924a23&chksm=9024487aa753c16cb3d425f7df710ac8079d586807218e48ec0c5d6a0b1c4e33d574513d33d3&scene=18&ascene=7&devicetype=android-33&version=28002392&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&session_us=gh_a0e5403c5ebe&countrycode=CN&exportkey=n_ChQIAhIQe2q4fV4eOaUu0OCv5WV%2F9BLmAQIE97dBBAEAAAAAAFlVIjx4BAAAAAAOpnltbLcz9gKNyK89dVj0cjn2kA1LWTLTYhz6ogggDmP1gilzxnLz54y0xeRVW3CsK%2FTiUHfv%2Ftpj1wW5tBFEQ%2FwMCfF2SmpvsW6jURqG16DRRVa1FSWrwUiXSeX70CfiPvef%2FQSMgyQpLs4pVBRAb%2FkuruqaKj17KEnC7HId0J946kSgfHkf9YVQsL9JYtVQMmPnpmNX%2FK9ZMQkjWfIVsU6q4pjs01yNtL0NoW%2Fpa4AC%2FNoTdW7h8pwFKT3Vtzz4wlE84J9F5wriKvpq%2FQEe&pass_ticket=nfhyCPLNvPR8XA7M%2F5sMvpEpCbu93JSol%2Fx%2FSIxMXbxlYOwgJHMea1gUFg%2FHpAyjLVqC6Mh%2ByXSAHBNvihHIag%3D%3D&wx_header=3"
							uni.navigateTo({
								url: "/pages/subPack/page/webView/webView?navTitle=企业介绍&url=" +
									encodeURIComponent(JSON.stringify(webUrl))
							})
							break;
						default:
					}
				}
			},
			locpush() {
				uni.navigateTo({
					url: '/pages/subPack/page/home/location/location',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			titleNameclick(e) {
				console.log(e);
				if (e == "最新") {
					this.order = "create_time";
				} else {
					this.order = "id";
				}
				this.getHomeList();
			},
			//获取储存选择城市
			async storagePlace() {
				return new Promise((resolve, reject) => {
					this.place = this.$personal.getStorage('place').place == "不限" ? "地点" : this.$personal
						.getStorage('place')
						.place
					if (typeof(this.place) == "undefined") {
						this.place = "地点"
					}
				})
			},
			//储存筛选的数组
			async getScreenStorage() {
				return new Promise((resolve, reject) => {
					var data = this.$personal.getStorage('screen');
					if (data !== "") {
						var statusArr = [];
						if (data.listArr.length > 0) {
							for (var i = 0; i < data.listArr.length; i++) {
								for (var j in data.listArr[i]) {
									if (data.listArr[i][j].status == "1") {
										if (j != 0) {
											statusArr.push(data.listArr[i][j].status);
										}
										if (data.listArr[i][j].type == "nature") {
											this.nature = data.listArr[i][j].name;
										}
										if (data.listArr[i][j].type == "mustEducation") {
											this.education = data.listArr[i][j].name;
										}
										if (data.listArr[i][j].type == "mustExperience") {
											this.mustExperience = data.listArr[i][j].name;
										}
										if (data.listArr[i][j].type == "salaryRange") {
											this.salary = data.listArr[i][j].name;
										}
										if (data.listArr[i][j].type == "welfare") {
											this.welfare = data.listArr[i][j].name;
										}
									}
								}
							}
							if (statusArr.length > 0) {
								this.screen = '筛选(' + statusArr.length + ')';
							} else {
								this.screen = '筛选';
							}
						}
					}
				})
			},
			async getHomeList(cb) {
				let data = {
					"order": this.order,
					"place": this.place == "地点" ? "" : this.place,
					"like": this.searchtitle == "搜索职位" ? "" : this.searchtitle,
					//工作性质
					"nature": this.nature == "不限" ? "" : this.nature,
					//教育要求
					"education": this.education == "不限" ? "" : this.education,
					//薪资范围
					"salary": this.salary == "不限" ? "" : this.salary,
					//福利
					"welfare": this.welfare == "不限" ? "" : this.welfare,
					//工作经验
					"mustExperience": this.mustExperience == "不限" ? "" : this.mustExperience,
					"size": this.size,
					"page": this.page,
				}
				console.log(data);
				await this.$api.homelist(data).then(res => {
					// 只要数据请求完毕，就立即按需调用 cb 回调函数
					cb && cb()
					var datalist = []
					res.data.list.forEach(data => {
						if (data.headImg !== null && data.headImg !== "") {
							data.headImg = this.$personal.config.baseImageUrl + data.headImg
						} else {
							data.headImg = this.$personal.config.defaultImage
						}
						if (data.disabled == "Y") {
							datalist.push(data)
						}
					})
					this.list = [...this.list, ...datalist]
					this.total = res.data.total
					var welArr = [];
					for (var i = 0; i < this.list.length; i++) {
						welArr.push(this.list[i].welfare)
					}
					for (var i = 0; i < welArr.length; i++) {
						this.welfareArr.push(welArr[i].split(','))
					}
				}).catch(err => {

				})
			},
			searchtext() {
				uni.$on('searchtext', data => {
					this.searchtitle = data
				})
			},
			removeSearch() {
				uni.$off('searchtext');
			},
			itemClick(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/subPack/page/home/homelistdetail/homelistdetail?id=" + e,
				})
			},
			screenGo() {
				uni.navigateTo({
					url: "/pages/subPack/page/home/homescreen/homescreen",
				})
			},
			showToast() {
				this.$refs.uToast.show({
					message: '很遗憾，我们无法继续为您提供服务，您可以手动关闭小程序',
				})
				this.showLogin = false
			},
			showTostClick() {
				this.showToast();
			},
			//同意并继续
			agreeClick() {
				this.showLogin = false
				this.meinformation();
				uni.showTabBar();
			},

			chooseavatar(e) {
				console.log("chooseavatar ====", e);
				this.setData({
					imageUrl: e.detail.avatarUrl
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
	}

	.u-nav-slot {
		display: flex;
		flex-direction: row;
		margin-left: 10px;
		padding: 10px 10px;
		width: 227px;
		background-color: rgba(255, 255, 255, 0.16);
		border-radius: 100px 100px 100px 100px;
		opacity: 1;
	}

	.nav_backgound_image {
		width: 100%;
		height: 100px;
		position: fixed;
		top: 0;
	}

	.content_page {
		position: absolute;
		margin-top: 120px;
		width: 100%;

		.head {
			margin: 0px 10px;

			.homeoption {
				background: white;
				border-radius: 10px;
				opacity: 1;
				display: flex;
				justify-content: space-around;
				padding: 15px 0px;
			}

			.home_swper {
				height: 80px;
				margin: 16px 0px;
				justify-content: center;
			}
		}

		.tabselected {
			padding: 5px 0px;
			background-color: white;
		}

		.content {
			background: $uni-bg-color;
			padding: 5rpx;
		}

		.list {
			background-color: white;
			border-radius: 10px;
			margin: 10rpx;
		}
	}
</style>