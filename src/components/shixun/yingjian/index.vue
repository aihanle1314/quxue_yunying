<template>
    <div class="yingjian-container">
        <el-menu v-bind:default-active="selectIndex" class="el-menu-demo" mode="horizontal"
            @select="handleSelect" active-text-color="#fdb730">
            <template v-for="item in dataList">
               <el-menu-item :index="''+item.id" v-bind:key="item.id">
                  <span style="font-size:14px;color:#717171;font-weight:bold;">{{item.title}}</span><i class="el-icon-arrow-right"></i>
               </el-menu-item>
             </template>
        </el-menu>
        <div class="line"></div>
        <div class="yjlist-box">
            <ul class="ul-yjlist">
                <li v-for="item in contentlist" v-bind:key="item.id">
                  <item-content :itemData="item"></item-content>
                  <div style="display:inline-block;width:100%;height:1px;border-top:1px solid #f8f8f8;"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import itemContent from './components/ItemContent.vue'
import { getYingjian } from '@/http/api/shixunApi'
export default {
  name: 'index',
  components: {
    itemContent
  },
  data () {
    return {
      dataList: [],
      selectIndex: ''
    }
  },
  created () {
    this.getData()
    this.selectIndex = '80'
  },
  computed: {
    contentlist () {
      const self = this
      for (var i = 0; i < self.dataList.length; i++) {
        var item = self.dataList[i]
        if (item.id + '' === self.selectIndex) {
          return item.content
        }
      }
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getYingjian().then(response => {
          const dataw = response.dataList
          self.dataList = dataw
          self.selectIndex = '' + dataw[0].id
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
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.yingjian-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.yjlist-box {
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 35px;
  width: 1132px;
  height: 577px;
  border: 1px solid #f8f8f8;
  border-radius: 6px;
}
.ul-yjlist {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    width: 100%;
    height: 20px;
    margin-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
