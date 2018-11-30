<template>
  <div class="resource-container">
    <breadcrumb :levelList="breadcrumbs"></breadcrumb>
    <div style="font-size:14px;margin-top:10px;margin-left:20px;">请选择您需要的格式：</div>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-top:10px;">
        <el-tab-pane name="all">
            <span slot="label"><span style="font-size:14px;padding-left:20px;">全部</span></span>
            <div class="list-box">
                <ul class="ul-list">
                    <li v-for="item in dataList" v-bind:key="item.id">
                    <item-resource :itemData="item"></item-resource>
                    <div class="line"></div>
                    </li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane name="word">
            <span slot="label"><img src="../../../../static/images/shixun/word_small_p.png" /><span style="font-size:14px;padding-left:10px;">Word</span></span>
            <div class="list-box">
                <ul class="ul-list">
                    <li v-for="item in wordlist" v-bind:key="item.id">
                    <item-resource :itemData="item"></item-resource>
                    <div class="line"></div>
                    </li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane name="vedio">
            <span slot="label"><img src="../../../../static/images/shixun/vedio_small_p.png" /><span style="font-size:14px;padding-left:10px;">视频</span></span>
            <div class="list-box">
                <ul class="ul-list">
                    <li v-for="item in vediolist" v-bind:key="item.id">
                    <item-resource :itemData="item"></item-resource>
                    <div class="line"></div>
                    </li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ppt">
            <span slot="label"><img src="../../../../static/images/shixun/PPT_small_p.png" /><span style="font-size:14px;padding-left:10px;">PPT</span></span>
            <div class="list-box">
                <ul class="ul-list">
                    <li v-for="item in pptlist" v-bind:key="item.id">
                    <item-resource :itemData="item"></item-resource>
                    <div class="line"></div>
                    </li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane name="pic">
            <span slot="label"><img src="../../../../static/images/shixun/pic_small_p.png" /><span style="font-size:14px;padding-left:10px;">图片</span></span>
            <div class="list-box">
                <ul class="ul-list">
                    <li v-for="item in piclist" v-bind:key="item.id">
                    <item-resource :itemData="item"></item-resource>
                    <div class="line"></div>
                    </li>
                </ul>
            </div>
        </el-tab-pane>
    </el-tabs>
    <div class="pagination">
        <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
        </el-pagination>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/components/Breadcrumb'
import itemResource from './components/ItemResource.vue'
import { getResource } from '@/http/api/shixunApi'
export default {
  name: 'resource',
  components: {
    itemResource, breadcrumb
  },
  props: {
    getDateId: {
      type: Number
    }
  },
  data () {
    return {
      activeName: 'all',
      dataList: [],
      type: '',
      cur_page: 1,
      total: 10
    }
  },
  created () {
    this.getData()
  },
  watch: {
    getDateId: 'getData'
  },
  computed: {
    breadcrumbs () {
      let matched = this.$route.matched
      var bc = []
      for (var i = 0; i < matched.length; i++) {
        bc.push({name: matched[i].meta.title, path: ''})
      }
      return bc
    },
    pptlist () {
      const self = this
      return self.dataList.filter(function (d) {
        if (d.type === 'ppt') {
          return d
        }
      })
    },
    wordlist () {
      const self = this
      return self.dataList.filter(function (d) {
        if (d.type === 'word') {
          return d
        }
      })
    },
    vediolist () {
      const self = this
      return self.dataList.filter(function (d) {
        if (d.type === 'vedio') {
          return d
        }
      })
    },
    piclist () {
      const self = this
      return self.dataList.filter(function (d) {
        if (d.type === 'pic') {
          return d
        }
      })
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getResource(this.getDateId, this.type, this.cur_page).then(response => {
          const dataw = response.dataList
          self.total = dataw.total
          self.cur_page = dataw.current_page
          self.dataList = dataw.dataList
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleClick (tab, event) {
    // console.log(tab, event)
    },
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    }
  }
}
</script>
<style scoped>
.resource-container {
  margin: 0;
  margin-top: 68px;
  padding: 0;
  padding-top: 20px;
}
.list-box {
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 35px;
  width: 1132px;
  height: 577px;
  border: 2px solid #f8f8f8;
  border-radius: 6px;
}
.ul-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.ul-list li {
  width: 100%;
  height: 34px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.ul-list .line {
  display: inline-block;
  width: 100%;
  height: 1px;
  border-top: 1px solid #f8f8f8;
}
.pagination {
  display: block;
  margin: 0 auto;
  text-align: center;
}
</style>
