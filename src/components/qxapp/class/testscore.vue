<template>
    <div class="appclasstestscore-container">
      <breadcrumb :levelList="breadcrumbs"></breadcrumb>
      <div class="box-header">
        <div class="info-card">
          <div class="item-left" style="top:10px;">姓名：{{studentData.u_name}}</div>
          <div class="item-left" style="top:50px;">年级：</div>
          <div class="item-left" style="top:90px;">家长手机号码：{{studentData.phone}}</div>
          <div class="item-left" style="top:130px;">所在地区：</div>
          <div class="item-left" style="top:170px;">测试时间：</div>
          <div class="item-right" style="top:10px;">
            <el-button type="primary" size="small" @click.native="search">下载成绩报告</el-button>
          </div>
        </div>
      </div>
      <div class="box-title" style="top:250px;">
        测试成绩
      </div>
      <div class="box-score">
        <div class="item-right" style="top:50px">综合评价：S</div>
        <div class="item-right" style="top:100px">测试用时：12:00</div>
        <div class="item-right" style="top:160px">排名：198/242</div>
      </div>
      <div class="box-title" style="top:300px;">
        正确率分析
      </div>
      <div class="box-correct">
        <bar-chart></bar-chart>
      </div>
      <div class="box-title" style="top:400px;">
        趣学建议
      </div>
      <div class="box-suggest">
        您本次共答对11道题，您的英语基础比较薄弱，建议您从我们的趣学口语课程Level1或Level2开始学习
      </div>
    </div>
</template>
<script>
import breadcrumb from '@/components/components/Breadcrumb'
import { mapGetters } from 'vuex'
import BarChart from './components/BarChart'
export default {
  name: 'appclasstestscore',
  components: { BarChart, breadcrumb },
  data () {
    return {
      ss_id: 0
    }
  },
  created () {
    this.ss_id = this.$route.params.ssid
    this.getData()
  },
  computed: {
    ...mapGetters([
      'classData', 'studentData'
    ]),
    breadcrumbs () {
      let matched = this.$route.matched
      var bc = []
      bc.push({name: matched[0].meta.title, path: matched[0].path})
      bc.push({name: '班级详情', path: '/qxapp/class/classmore/'})
      bc.push({name: matched[1].meta.title, path: ''})
      return bc
    }
  },
  methods: {
    getData () {
    //   let self = this
    //   return new Promise((resolve, reject) => {
    //     getProjectList().then(response => {
    //       const dataw = response.data
    //       self.tableData = dataw
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.appclasstestscore-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
  .box-header {
    position: relative;
    .info-card {
      position: absolute;
      height: 190px;
      width: 860px;
      left: 10px;
      top: 10px;
    //   border-bottom: 1.5px solid #ebd978;
      .item-left {
        position: absolute;
        height: 40px;
        line-height: 50px;
        left: 50px;
      }
      .item-right {
        position: absolute;
        right: 50px;
      }
    }
  }
  .box-title {
    position: relative;
    border-left: 220px solid #eee;
    border-right: 220px solid #eee;
    width: 580px;
    height: 5px;
    line-height: 10px;
    text-align: center;
    left: 60px;
  }
  .box-score {
    width: 580px;
    position: relative;
    left: 60px;
    top: 240px;
    height: 150px;
    .item-right {
      position: absolute;
      right: 100px;
    }
  }
  .box-correct {
    width: 580px;
    position: relative;
    left: 60px;
    top: 350px;
  }
  .box-suggest {
    width: 540px;
    position: relative;
    left: 80px;
    top: 420px;
  }
}
</style>
