<template>
  <div class="home-container">
    <div class="content-box">
      <ul class="ul-introduce">
        <li v-for="item in introduce" v-bind:key="item.id">
          <introduce-card :itemData="item"></introduce-card>
        </li>
      </ul>
      <ul class="ul-news">
        <li v-for="item in news" v-bind:key="item.id">
          <news-card :itemData="item"></news-card>
        </li>
      </ul>
      <el-card v-if="learn" shadow="never" style="width:360px;height:150px;margin:8px;">
        <div slot="header" style="font-size:16px;color:#666666;font-weight:bold;">考核信息</div>
        <div style="position:relative;width:100%;height:100px;">
          <div class="home-score-box" style="left:0;">
            <img class="home-score-box-img" src="../../../../static/images/shixun/icon_learn.png" />
            <span class="home-score-box-text1">学习状态</span>
            <span class="home-score-box-text2" v-if="learn==='已学完'" style="color:blue;">{{learn}}</span>
            <span class="home-score-box-text2" v-else style="color:red;">{{learn}}</span>
          </div>
          <div style="position:absolute;display:inline-block;width:1px;height:60px;border-left:1px solid #d2d2d2;left:160px;"></div>
          <div class="home-score-box" style="right:0;">
            <img class="home-score-box-img" src="../../../../static/images/shixun/icon_exam.png" />
            <span class="home-score-box-text1">考核状态</span>
            <span class="home-score-box-text2" v-if="examPass==='已通过'" style="color:blue;">{{examPass}}</span>
            <span class="home-score-box-text2" v-else style="color:red;">{{examPass}}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import introduceCard from './components/IntroduceCard.vue'
import newsCard from './components/NewsCard.vue'
import { getHomeInfo } from '@/http/api/shixunApi'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    introduceCard, newsCard
  },
  computed: {
    ...mapGetters([
      'learn', 'examPass'
    ])
  },
  data () {
    return {
      introduce: [],
      news: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getHomeInfo().then(response => {
          const dataw = response.dataList
          self.introduce = dataw.introduce
          self.news = dataw.news
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
.home-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.content-box {
  position: relative;
  margin-top: 60px;
}
.ul-introduce {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.ul-introduce li {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  float: left;
}
.ul-news {
  display: block;
  margin: 0;
  padding: 0;
  margin-top: 15px;
  list-style: none;
  overflow: hidden;
}
.ul-news li {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  display: block;
  float: left;
}
.home-score-box {
  width: 120px;
  height: 60px;
  position: absolute;
  display: inline-block;
  top: 0;
}
.home-score-box-img {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 0;
}
.home-score-box-text1 {
  width: 60px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  left: 65px;
  top: 0;
  font-size: 12px;
  color: #333333;
  font-weight: bold;
}
.home-score-box-text2 {
  width: 60px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  left: 65px;
  top: 30px;
  font-size: 16px;
}
</style>
