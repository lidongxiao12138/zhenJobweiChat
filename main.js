// #ifndef VUE3
import App from './App'
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import api from "@/pages/subPack/config/server/api.js"
import http from "@/pages/subPack/config/server/requset.js"
import me_api from "@/pages/subPack/config/server/me_api.js"
import personal from "@/pages/subPack/config/server/personal.js"
Vue.prototype.$personal = personal
Vue.prototype.$me_api = me_api
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				})
			});
			callback && callback();
		}
	}
});
const app = new Vue({
	...App
})
app.$mount()
// #endif
Vue.config.productionTip = false;

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif