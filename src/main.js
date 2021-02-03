import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from '@/utils/request'
import moment from 'moment'
import utils from '@/utils'
import validator from '@/utils/validator'
moment.locale('zh-cn');
Vue.use(VueParticles)
Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$moment = moment
Vue.prototype.recover = utils.recover
Vue.prototype.recoverNotNull = utils.recoverNotNull
Vue.prototype.validator = validator

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
