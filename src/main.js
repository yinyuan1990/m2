/*
 * @Autor: lh
 * @Date: 2023-01-06 11:03:20
 * @LastEditors: lh
 * @LastEditTime: 2023-01-06 17:52:05
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import rem from "./static/js/rem"
import './static/js/vantUi.js'
import iconimgVue from './components/icon/iconimg.vue'
import headbox from './components/icon/headbox.vue'
import headtop from './components/head/top.vue'


Vue.config.productionTip = false

Vue.prototype.$getUser = (back)=>{
  let users = localStorage.getItem('userAddInfo')
  try{
    users = JSON.parse(users)
    if( users && users.psw ){
      back && back()
      return users;
    }else{
      return false;
    }
  }catch(err){
    console.log('err',err)
    return false;
  }
}

// rem()
Vue.component('iconimgVue',iconimgVue)
Vue.component('headbox',headbox)
Vue.component('headtop',headtop)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
