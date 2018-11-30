import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/index'
import Error404 from '../components/404'
import Password from '../components/password/index'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Error404, hidden: true },
  {
    path: '',
    component: () => import('@/components/layout/Layout'),
    name: 'password',
    hidden: true,
    children: [
      {
        path: 'password',
        component: Password
      }
    ]
  }
  // { path: '*', redirect: '/404', component: Error404, hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
