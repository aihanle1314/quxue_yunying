<template>
  <div class="plane-container">
     <breadcrumb :levelList="breadcrumbs"></breadcrumb>
     <div class="plane-list-box">
        <ul class="plane-ul-list">
            <li v-for="item in dataList" v-bind:key="item.id">
                <item-plane :itemData="item"></item-plane>
            </li>
        </ul>
    </div>
    <div class="plane-pagination">
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
import itemPlane from './components/ItemPlane.vue'
import { getResource } from '@/http/api/shixunApi'
export default {
  name: 'plane',
  components: {
    itemPlane, breadcrumb
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
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    }
  }
}
</script>
<style scoped>
.plane-container {
  margin: 0;
  margin-top: 68px;
  padding: 0;
}
.plane-list-box {
  margin-top: 10px;
}
.plane-ul-list {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.plane-ul-list li {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  float: left;
}
.plane-pagination {
  display: block;
  margin: 0 auto;
  text-align: center;
}
</style>
