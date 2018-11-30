const qxapp = {
  state: {
    classData: {},
    studentData: {}
  },
  getters: {
    classData: state => state.classData,
    studentData: state => state.studentData
  },
  mutations: {
    SET_CLASSDATA: (state, classdata) => {
      state.classData = classdata
    },
    SET_STUDENTDATA: (state, studata) => {
      state.studentData = studata
    }
  },
  actions: {
    setClassData: ({ commit }, data) => {
      commit('SET_CLASSDATA', data)
    },
    setStudentData: ({ commit }, data) => {
      commit('SET_STUDENTDATA', data)
    }
  }
}

export default qxapp
