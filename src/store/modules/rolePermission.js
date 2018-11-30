import router from '../../router'
import { constantRouterMap } from '@/router'
import { asyncRouterMap } from '@/router/shixun'
import { waijiaoRouterMap } from '@/router/waijiao'
import { qxappRouterMap } from '@/router/qxapp'
import { schooladminRouterMap } from '@/router/schooladmin'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.role) {
    // return roles.some(role => route.meta.role.indexOf(role) >= 0)
    return route.meta.role.indexOf(roles) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function getProjRoute (proj) {
  if (proj.indexOf('外教') > -1) {
    return waijiaoRouterMap
  } else if (proj.indexOf('师训') > -1) {
    return asyncRouterMap
  } else if (proj.indexOf('趣学') > -1) {
    return qxappRouterMap
  } else if (proj.indexOf('账户') > -1) {
    return schooladminRouterMap
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  getters: {
    permission_routers: state => state.routers,
    addRouters: state => state.addRouters
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    CLEAR_ROUTES: (state) => {
      state.addRouters = []
      state.routers = constantRouterMap
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      commit('CLEAR_ROUTES')
      return new Promise(resolve => {
        const proj = data.proj
        const roles = data.roles
        let accessedRouters
        let currRouters = getProjRoute(proj)
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = currRouters
        } else {
          accessedRouters = filterAsyncRouter(currRouters, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    AddRouters ({ commit, state }, project) {
      return new Promise(resolve => {
        for (var i = 0; i < project.length; i++) {
          var temp = getProjRoute(project[i].name)
          router.addRoutes(temp)
        }
        resolve()
      })
    }
  }
}

export default permission
