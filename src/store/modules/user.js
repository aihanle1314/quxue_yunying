import { login, getRoles } from '@/http/api/userApi'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, removeUserHeader } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userId: parseInt(getUserId()),
    name: '', // 用户名
    oName: '', // 机构名称
    project: [{id: 1, name: '趣学外教', status: 1}, {id: 2, name: '师训', status: 1}], // 机构产品权限
    roles: '',
    roleList: [
      {id: 1, name: 'schoolmasterA', desc: '校长A'},
      {id: 2, name: 'schoolmasterB', desc: '校长B'},
      {id: 3, name: 'teacherJun', desc: '初级教师'},
      {id: 4, name: 'teacherMid', desc: '中级教师'},
      {id: 5, name: 'teacherSen', desc: '高级教师'},
      {id: 6, name: 'teachingSuper', desc: '教学主管'},
      {id: 7, name: 'market', desc: '市场'},
      {id: 8, name: 'adviser', desc: '课程顾问'},
      {id: 9, name: 'personnel', desc: '人事'},
      {id: 10, name: 'educate', desc: '教务'}
    ]
  },

  getters: {
    token: state => state.token,
    userId: state => state.userId,
    name: state => state.name,
    oName: state => state.oName,
    project: state => state.project,
    roles: state => state.roles,
    roleList: state => state.roleList
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, uid) => {
      state.userId = uid
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ONAME: (state, oname) => {
      state.oName = oname
    },
    SET_PROJECT: (state, proj) => {
      state.project = proj
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLELIST: (state, rolelist) => {
      state.roleList = rolelist
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          setToken(data.userInfo.token)
          commit('SET_TOKEN', data.userInfo.token)
          setUserId(data.userInfo.uid)
          commit('SET_USERID', data.userInfo.uid)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户权限信息
    GetRoles ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getRoles(state.userId).then(response => {
          const data = response.data
          commit('SET_ROLES', data.userInfo.role_name)
          var validP = data.project.filter(function (d) {
            if (d.status === 1) {
              return d
            }
          })
          // validP.unshift({id: 0, name: '校区管理', status: 1})
          validP.push({id: 0, name: '账户', status: 1})
          commit('SET_NAME', data.userInfo.username)
          commit('SET_ONAME', data.userInfo.o_name)
          commit('SET_PROJECT', validP)
          commit('SET_ROLELIST', data.roleList)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    // LogOut ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', '')
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    FedLogOut ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', '')
      removeToken()
      removeUserId()
      removeUserHeader()
    }
  }
}

export default user
