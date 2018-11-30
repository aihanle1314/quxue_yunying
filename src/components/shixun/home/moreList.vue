<template>
  <div class="newsmorelist-container">
    <breadcrumb :levelList="breadcrumbs"></breadcrumb>
    <div class="newsmorelist-box">
        <ul class="ul-newsmorelist">
            <li v-for="item in newsList" v-bind:key="item.id">
              <item-news :itemData="item" :pId="id" :pTitle="title"></item-news>
              <div style="display:inline-block;width:100%;height:1px;border-top:1px solid #f8f8f8;"></div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/components/Breadcrumb'
import itemNews from './components/ItemNews'
import { getHomeMoreList } from '@/http/api/shixunApi'
export default {
  name: 'morelist',
  components: {
    itemNews, breadcrumb
  },
  data () {
    return {
      newsList: [],
      id: 0,
      title: ''
    }
  },
  created () {
    this.id = parseInt(this.$route.params.id)
    this.title = this.$route.params.title
    if (!this.title) {
      this.title = window.localStorage.getItem('shixunhometitle')
    }
    this.getData()
  },
  computed: {
    breadcrumbs () {
      let self = this
      let matched = self.$route.matched
      var bc = []
      bc.push({name: matched[0].meta.title, path: matched[0].path})
      bc.push({name: self.title, path: ''})
      return bc
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getHomeMoreList(self.id).then(response => {
          const dataw = response.dataList
          self.newsList = dataw
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>
<style scoped>
.newsmorelist-container {
  margin: 0;
  margin-top: 68px;
  padding: 0;
}
.newsmorelist-box {
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 35px;
  width: 1132px;
  height: 577px;
  border: 1px solid #f8f8f8;
  border-radius: 6px;
}
.ul-newsmorelist {
  margin: 0;
  padding: 0;
  list-style: none;
}
.ul-newsmorelist li {
  width: 100%;
  height: 20px;
  margin-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
