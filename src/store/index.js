import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import rolePermission from './modules/rolePermission'
import shixun from './modules/shixun'
import waijiao from './modules/waijiao'
import qxapp from './modules/qxapp'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    rolePermission,
    shixun,
    waijiao,
    qxapp
  }
})

export default store
