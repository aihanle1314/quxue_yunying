import Cookies from 'js-cookie'
import { getNavOpen, getScore } from '@/http/api/shixunApi'
const shixun = {
  state: {
    timerInter: Object,
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    currRoute: [], // 存储当前路由
    trainNavActive: '', // 培训上侧导航默认index
    passScore: 60,
    cateId: -1,
    examId: -1,
    navOpen: [],
    unlockTrainCategory: [],
    unlockTrainList: [],
    score: [],
    learn: '未学习',
    examPass: '未通过'
  },
  getters: {
    timer: state => state.timerInter,
    sidebar: state => state.sidebar,
    currRoute: state => state.currRoute,
    trainNavActive: state => state.trainNavActive,
    passScore: state => state.passScore,
    cateId: state => state.cateId,
    navOpen: state => state.navOpen,
    examId: state => state.examId,
    unlockTrainCategory: state => state.unlockTrainCategory,
    unlockTrainList: state => state.unlockTrainList,
    score: state => state.score,
    learn: state => state.learn,
    examPass: state => state.examPass
  },
  mutations: {
    SET_TIMER: (state, timer) => {
      state.timerInter = timer
    },
    CLEAR_TIMER: (state) => {
      clearInterval(state.timerInter)
    },
    SET_COUNT: (state, count) => {
      state.count = count
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_CURRROUTE: (state, route) => {
      state.currRoute = route
    },
    SET_TRAINNAVACTIVE: (state, index) => {
      state.trainNavActive = index
    },
    SET_CATEID: (state, cateid) => {
      state.cateId = cateid
    },
    SET_EXAMID: (state, examid) => {
      state.examId = examid
    },
    SET_NAVOPEN: (state, open) => {
      state.navOpen = open
    },
    SET_UNLOCK_TRAINCATE: (state, unlockrc) => {
      state.unlockTrainCategory = unlockrc
    },
    SET_UNLOCK_TRAINLIST: (state, unlockrl) => {
      state.unlockTrainList = unlockrl
    },
    SET_SCORE: (state, score) => {
      state.score = score
    },
    SET_LEARN: (state, learn) => {
      state.learn = learn
    },
    SET_EXAMPASS: (state, exampass) => {
      state.examPass = exampass
    }
  },
  actions: {
    setTimer: ({ commit }, timer) => {
      commit('SET_TIMER', timer)
    },
    clearTimer: ({ commit }) => {
      commit('CLEAR_TIMER')
    },
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    SetTrainNavActive: ({ commit }, index) => {
      commit('SET_TRAINNAVACTIVE', index)
    },
    SetCateId: ({ commit }, id) => {
      commit('SET_CATEID', id)
    },
    SetExamId: ({ commit }, id) => {
      commit('SET_EXAMID', id)
    },
    AddCurrRoute: ({ commit, state }, route) => {
      if (!state.currRoute.some(item => item.name === route.name)) {
        state.currRoute.push(route)
      }
      commit('SET_CURRROUTE', state.currRoute)
    },
    ClearCurrRoute: ({ commit }) => {
      commit('SET_CURRROUTE', [])
    },
    // 获取导航开关
    GetNavOpen ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getNavOpen().then(response => {
          const data = response.dataList
          if (data) {
            commit('SET_NAVOPEN', data)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetScore ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getScore().then(response => {
          const data = response.result
          if (data) {
            commit('SET_UNLOCK_TRAINCATE', data.unlock_train_category)
            commit('SET_UNLOCK_TRAINLIST', data.unlock_train_list)
            commit('SET_SCORE', data.scoreList)
            // commit('SET_LEARN', data.learn)
            // commit('SET_EXAMPASS', data.examPass)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default shixun
