const waijiao = {
  state: {
    base_api: process.env.BASE_API_WAIJIAO // 发布/正式地址
    // base_api: process.env.BASE_API_WAIJIAO_TEST // 测试地址
  },

  getters: {
    wjBaseAPI: state => state.base_api
  },

  mutations: {

  },

  actions: {

  }
}

export default waijiao
