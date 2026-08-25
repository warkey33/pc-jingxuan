import Vue from 'vue'
import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/jingxuan.scss' // jingxuan css
import App from './App'
import permission from './directive/permission'
import router from './router'
import store from './store'

import { getConfigKey } from "@/api/system/config"
import { getDicts } from "@/api/system/dict/data"
import Pagination from "@/components/Pagination"
import { getToken } from "@/utils/auth"
import {
  addDateRange,
  download,
  exportExcel,
  handleTree,
  parseTime,
  resetForm,
  selectDictLabel,
  selectDictLabels
} from "@/utils/jingxuan"
import axios from 'axios'
import vSelectPage from 'v-selectpage'
import VueAxios from "vue-axios"
import './assets/icons' // icon
import './permission' // permission control
import RightToolbar from "@/components/RightToolbar"
import ImageUpload from "@/components/ImageUpload"
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
import 'vxe-table/lib/style.css'
Vue.prototype.$Utils = XEUtils
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.exportExcel = exportExcel
Vue.prototype.handleTree = handleTree


Vue.prototype.msgSuccess = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: "success"
  });
}

Vue.prototype.msgError = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: "error"
  });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('ImageUpload', ImageUpload)
Vue.use(VXETable)
Vue.use(VueAxios, axios)
Vue.use(permission)
Vue.use(vSelectPage, {
  // server side data loader
  dataLoad: async function (vue, data, params) {
    try {
      return await new Promise((resolve, reject) => {
        this.axios
          .get(process.env.VUE_APP_BASE_API + data, {
            params: params,
            headers: {
              Authorization: "Bearer " + getToken()
            }
          })
          .then(resp => resolve(resp), resp_1 => reject(resp_1))
      })
    } catch (error) {
      console.error('v-selectpage load failed', error)
    }
  }
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
