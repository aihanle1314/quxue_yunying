import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken, getUserHeader } from '@/utils/auth' // 验权

// permissiom judge
// function hasPermission (roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
//   if (!permissionRoles) return true
//   // return roles.some(role => permissionRoles.indexOf(role) >= 0)
//   return permissionRoles.indexOf(roles) >= 0
// }

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/home' })
      console.log('11111')
    } else {
      if (store.getters.roles === '') {
        store.dispatch('GetRoles').then(res => { // 拉取用户信息
          const proj = store.getters.project // 机构项目权限
          const roles = store.getters.roles
          // const dpath = '/' + proj[0].id // 默认打开首页
          store.dispatch('AddRouters', proj).then(() => { // 生成权限项目路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
          })
          var selproname = getUserHeader()
          if (!selproname) {
            selproname = proj[2].name
          }
          store.dispatch('GenerateRoutes', { 'roles': roles, 'proj': selproname }).then(() => { // 生成可访问的路由表
            // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
          })
          store.dispatch('GetNavOpen').then(res => { // 拉取导航栏开关
            if (proj.some(item => item.id === 2)) {
              store.dispatch('GetScore').then(res => { // 拉取用户师训成绩
                next({ path: '' })
                console.log('2222')
              })
            } else {
              next({ path: '' })
              console.log('2222')
            }
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            // Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.role)) {
        //   next()
        //   console.log('3333')
        // } else {
        //   // next({ path: '/401', query: { noGoBack: true }})
        //   // NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        // }
        next()
        console.log('3333')
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      console.log('4444')
    } else {
      next('/login')
      NProgress.done()
      console.log('5555')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
