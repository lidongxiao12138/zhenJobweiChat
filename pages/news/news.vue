<template>
	<view>
		<view class="loginOut" v-if="loginOut">
			<u-empty :show="true" text=" " icon="/pages/subPack/homePackages/static/LuxsanLogo.jpeg">
				<u-button @click="loginClick" size="small" type="primary" :style="{marginTop:20+'px'}" text="您当前未登录,去登录 >>">
				</u-button>
			</u-empty>
		</view>
		<view class="u-page" v-if="loginOut == false">
			<view v-for="(item,index) in data" :key="index" class="list" @click="listClick(index)">
				<view class="headimg">
					<u-avatar :src="data[index].headUrl" size="100rpx"></u-avatar>
					<view class="box">
						<u-badge bg-color="#fc0107" numberType="overflow" max="99" :value="unReadSpotNum"></u-badge>
					</view>
					<view class="title">
						<view class="titleName">
							<text class="name">{{data[index].hrName}}</text>
							<!-- <text class="company">"{{data[index].companyName}}"</text> -->
							<text class="company">立臻科技(昆山)有限公司</text>
						</view>
						<view class="chat">
							<text class="name">{{chatMessage}}</text>
						</view>
					</view>
				</view>
				<u-line color="#999999"></u-line>
				<view class="time">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let disp = require("@/utils/broadcast.js");
	export default {
		components: {},
		data() {
			return {
				loginOut: false,
				data: [],
				arr: [],
				chatMessage: "",
				unReadSpotNum: 0
			};
		},
		onShow() {
			this.loginOut = uni.getStorageSync('loginOut')
			this.webIMList()
		},
		onLoad() {
			this.getWindowSize();

			let me = this;
			console.log("message----");
			//监听未读消息数
			disp.on("em.unreadspot", function(message) {
				me.getChatList();
				me.setData({
					// arr: me.getChatList(),
					unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ?
						"99+" : getApp().globalData.unReadMessageNum,
				});
			});
		},
		methods: {
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							witdh: res.windowWidth,
							height: res.windowHeight,
						};
					},
				});
			},

			//环信聊天列表 
			async webIMList() {
				let data = {}
				this.$api.getContactList(data).then(res => {
					console.log("getContactList==", res);
					res.data.forEach(item => {
						var imageUrl = this.$personal.config.baseImageUrl + item.headUrl
						item.headUrl = imageUrl
					})
					this.data = res.data
				})
			},

			listClick(e) {
				console.log(this.data[e]);
				var nameList = {
					myName: uni.getStorageSync('openid'),
					// your: "lidongxiao",
					your: this.data[e].hrId,
					yourName: this.data[e].hrName,
					optionId: this.data[e].id,
				};
				uni.navigateTo({
					url: "/pages/subPack/page/news/chatroom/chatroom?username=" + JSON.stringify(nameList)
				});
			},
			loginClick() {
				uni.switchTab({
					url: "/pages/me/me"
				})
			},

			// 包含陌生人版本
			getChatList() {
				var myName = uni.getStorageSync("myUsername");
				var array = [];
				const me = this;
				uni.getStorageInfo({
					success: function(res) {
						let storageKeys = res.keys;
						let newChatMsgKeys = [];
						let historyChatMsgKeys = [];
						let len = myName.length;
						storageKeys.forEach((item) => {
							if (item.slice(-len) == myName && item.indexOf("rendered_") == -1) {
								newChatMsgKeys.push(item);
							} else if (
								item.slice(-len) == myName &&
								item.indexOf("rendered_") > -1
							) {
								historyChatMsgKeys.push(item);
							} else if (item === "INFORM") {
								newChatMsgKeys.push(item);
							}
						});
					},
				});
					this.setData({
						arr: array,
					});
					console.log("arr =====", array);
				// }
			},
		}
	}
</script>
<style lang="scss">
	.loginOut {
		display: flex;
		flex-direction: column;
		margin: 100px;
	}

	.u-page .list {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.time {
		padding: 30rpx;
		color: $uni-text-color-condition;
	}

	.headimg {
		display: flex;
		flex-direction: row;
		padding: 30rpx;

		image {
			width: 100rpx;
			height: 100rpx;
		}

		.title {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.titleName {
				padding-left: 20rpx;

				.name {
					font-size: 30rpx;
					font-weight: bold;
				}

				.company {
					font-size: 30rpx;
					padding-left: 15rpx;
					color: gray;
				}
			}

			.chat {
				padding-left: 20rpx;
				color: dimgrey;
				font-size: 26rpx;
			}
		}
	}
</style>