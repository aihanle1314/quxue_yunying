<template>
    <div class="jiaowu-container">
        <el-menu v-bind:default-active="selectIndex" class="el-menu-demo" mode="horizontal"
            @select="handleSelect" active-text-color="#fdb730">
            <template v-for="item in dataList">
               <el-menu-item :index="''+item.id" v-bind:key="item.id">
                  <span style="font-size:14px;color:#717171;font-weight:bold;">{{item.title}}</span><i class="el-icon-arrow-right"></i>
               </el-menu-item>
             </template>
        </el-menu>
        <div class="line"></div>
        <div class="jwlist-box">
            <ul class="ul-jwlist">
                <li v-if="contentlist.length>0" v-for="item in contentlist" v-bind:key="item.id">
                  <item-resource :itemData="item"></item-resource>
                  <div style="display:inline-block;width:100%;height:1px;border-top:1px solid #f8f8f8;"></div>
                </li>
            </ul>
        </div>
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
import itemResource from './components/ItemResource.vue'
import { getJwjx, getJwjxPage } from '@/http/api/shixunApi'
export default {
  name: 'jwjx',
  components: {
    itemResource
  },
  props: {
    getDateId: {
      type: Number
    }
  },
  data () {
    return {
      dataList: [],
      selectIndex: '',
      contentlist: [],
      cur_page: 1,
      total: 10
    }
  },
  created () {
    this.getData()
    this.selectIndex = '109'
  },
  watch: {
    dataList: {
      handler: function (val, oldval) {
        for (var i = 0; i < val.length; i++) {
          var item = val[i]
          if (item.id + '' === this.selectIndex) {
            this.contentlist = item.content
          }
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getJwjx(self.getDateId).then(response => {
          const dataw = response.dataList
          self.dataList = dataw
          self.selectIndex = '' + dataw[0].id
          self.total = dataw[0].totalPage
          self.cur_page = 1
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getPageData () {
      let self = this
      return new Promise((resolve, reject) => {
        getJwjxPage(parseInt(self.selectIndex), self.cur_page).then(response => {
          const dataw = response.dataList
          self.contentlist = dataw.dataList
          self.total = dataw.totalPage
          self.cur_page = dataw.current_page
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleSelect (index) {
      for (var i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].id + '' === index) {
          this.selectIndex = index
          // this.total = this.dataList[i].total
        }
      }
    },
    handleCurrentChange (val) {
      this.cur_page = val
      this.getPageData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.jiaowu-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.jwlist-box {
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 35px;
  width: 1132px;
  height: 577px;
  border: 1px solid #f8f8f8;
  border-radius: 6px;
}
.ul-jwlist {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    width: 100%;
    height: 30px;
    margin-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
.pagination {
  display: block;
  margin: 0 auto;
  text-align: center;
}
</style>
