<template>
    <div class="appclassscore-container">
      <breadcrumb :levelList="breadcrumbs"></breadcrumb>
      <div class="box-header">
        <div class="info-card">
          <div class="item-left" style="left:50px;top:10px;">班级名称：{{classData.class_name}}</div>
          <div class="item-left" style="left:50px;top:50px;">教师姓名：{{classData.teacher_name}}</div>
          <div class="item-left" style="left:50px;top:90px;">班级ID：{{classData.class_id}}</div>
          <div class="item-left" style="left:300px;top:10px;">班级人数：{{classData.student_num}}人</div>
          <div class="item-left" style="left:300px;top:50px;">班级级别：{{classData.level_name}}</div>
          <div class="item-right" style="top:10px;">
            <el-button type="primary" size="small" @click.native="handleExport">导出成绩报告</el-button>
          </div>
        </div>
      </div>
      <div class="box-operate">
        <el-button-group>
          <el-button v-if="score_type===0" class="btn-zuoye" style="background-color:#f8e160;color:#666;" type="primary" size="small" @click.native="handleScoreType(0)">作业成绩</el-button>
          <el-button v-else class="btn-zuoye" type="primary" size="small" @click.native="handleScoreType(0)">作业成绩</el-button>
          <el-button v-if="score_type===1" class="btn-pingshi" style="background-color:#f8e160;color:#666;" type="primary" size="small" @click.native="handleScoreType(1)">平时成绩</el-button>
          <el-button v-else class="btn-pingshi" type="primary" size="small" @click.native="handleScoreType(1)">平时成绩</el-button>
        </el-button-group>
        <el-select v-if="score_type===0" v-model="select_id" placeholder="请选择作业" size="small" class="handle-input" @change="handleSelect">
            <el-option v-for="item in homewordData" v-bind:key="item.homeworkId" :label="item.homeworkName" :value="item.homeworkId">
            </el-option>
        </el-select>
        <el-select v-else-if="score_type===1" v-model="select_id" placeholder="请选择课程" size="small" class="handle-input" @change="handleSelect">
            <el-option v-for="item in lessonData" v-bind:key="item.lessonId" :label="item.lessonName" :value="item.lessonId">
            </el-option>
        </el-select>
      </div>
      <div class="box-score">
        <button ref="btnStatistic" class="title" @click="showStatistic" style="top:0;left:0;">统计</button>
        <button class="title" @click="showRank" style="top:0;left:100px;">排名</button>
        <div v-if="!show_rank" class="statistic" style="top:40px;">
          <table style="position:absolute;width:700px;left:20px;top:20px;">
            <tr align="center" style="height:30px;">
              <td>平均时长/分钟</td>
              <td>平均正确率</td>
              <td>完成人数</td>
              <td>未完成人数</td>
            </tr>
            <tr align="center" style="height:30px;">
              <td>{{resData.avgUseTime}}</td>
              <td>{{resData.avgScore}}</td>
              <td>{{resData.finishNum}}</td>
              <td>{{resData.noFinishNum}}</td>
            </tr>
          </table>
          <ul>
            <li v-for="(item) in scoreData" v-bind:key="item.key">
              <pie-chart :itemData="item"></pie-chart>
            </li>
          </ul>
        </div>
        <el-table v-if="show_rank" :data="rankData" border class="ranktable" size="small" max-height="520">
            <el-table-column align="center" prop="order" label="排名">
            </el-table-column>
            <el-table-column align="center" prop="studentName" label="姓名">
            </el-table-column>
            <el-table-column align="center" v-for="item in columns" v-bind:key="item.order"
              :prop="item.column" :label="item.columnName" >
            </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
import breadcrumb from '@/components/components/Breadcrumb'
import PieChart from './components/PieChart'
import { mapGetters } from 'vuex'
import { GetLesson, GetHomework, GetCourseScore, GetClassCourseScore } from '@/http/api/qxappApi'
export default {
  name: 'qxappclassscore',
  components: { PieChart, breadcrumb },
  data () {
    return {
      resData: {},
      lessonData: [], // 课程列表
      homewordData: [], // 作业列表
      select_id: '',
      scoreData: [],
      rankData: [],
      columns: [],
      show_rank: false,
      score_type: 0 // 0-作业成绩 1-平时成绩
    }
  },
  created () {
    this.getLesson()
    this.getHomework()
  },
  mounted () {
    this.$refs.btnStatistic.focus() // 统计按钮默认focus
  },
  computed: {
    ...mapGetters([
      'classData'
    ]),
    breadcrumbs () {
      let matched = this.$route.matched
      var bc = []
      bc.push({name: matched[0].meta.title, path: matched[0].path})
      bc.push({name: '班级详情', path: '/qxapp/class/classmore'})
      bc.push({name: matched[1].meta.title, path: ''})
      return bc
    }
  },
  methods: {
    getHomework () {
      let self = this
      var param = {
        classId: this.classData.class_id
      }
      return new Promise((resolve, reject) => {
        GetHomework(param).then(response => {
          const dataw = response.result
          self.homewordData = dataw.homeworkList
          self.select_id = self.homewordData[0].homeworkId
          this.getData()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getLesson () {
      let self = this
      var param = {
        bookId: this.classData.book_id,
        levelId: this.classData.level_id
      }
      return new Promise((resolve, reject) => {
        GetLesson(param).then(response => {
          const dataw = response.result
          self.lessonData = dataw
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getData () {
      if (this.score_type === 0) {
        this.getZuoyeData()
      } else {
        this.getPingshiData()
      }
    },
    getZuoyeData () {
      let self = this
      var param = {
        homeworkId: this.select_id,
        classId: this.classData.class_id
      }
      return new Promise((resolve, reject) => {
        GetClassCourseScore(param).then(response => {
          const dataw = response.result
          self.resData = dataw
          self.initData()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getPingshiData () {
      let self = this
      var param = {
        classId: this.classData.class_id,
        bookId: this.classData.book_id,
        levelId: this.classData.level_id,
        lessonId: this.select_id
      }
      return new Promise((resolve, reject) => {
        GetCourseScore(param).then(response => {
          const dataw = response.result
          self.resData = dataw
          self.initData()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    initData () {
      // 显示信息
      this.columns = this.resData.columnList
       // 饼图
       this.scoreData = []
      for (var i = 0; i < this.columns.length; i++) {
        var item = this.columns[i]
        var chartitem = {}
        chartitem.key = this.select_id + item.columnName
        if (item.columnName.length < 4) {
          chartitem.title = '  ' + item.columnName
        } else {
          chartitem.title = item.columnName
        }
        chartitem.difference = this.resData[item.column].difference
        chartitem.secondary = this.resData[item.column].secondary
        chartitem.excellent = this.resData[item.column].excellent
        this.scoreData[i] = chartitem
      }
      // 排行
      this.rankData = this.resData.orderList
    },
    showStatistic () {
      this.show_rank = false
    },
    showRank () {
      this.show_rank = true
    },
    handleScoreType (type) {
      this.score_type = type
      if (type === 0) {
        this.select_id = this.homewordData[0].homeworkId
      } else {
        this.select_id = this.lessonData[0].lessonId
      }
      this.getData()
    },
    handleSelect () {
      this.getData()
    },
    handleExport () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel')
        const tHeader = ['排名', '姓名']
        const filterVal = ['order', 'studentName']
        this.columns.forEach(item => {
          tHeader.push(item.columnName)
          filterVal.push(item.column)
        })
        const list = this.rankData
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '学生成绩报告')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.appclassscore-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
  .box-header {
    position: relative;
    .info-card {
      position: absolute;
      height: 140px;
      width: 860px;
      left: 10px;
      top: 10px;
      border-bottom: 1.5px solid #ebd978;
      .item-left {
        position: absolute;
        width: 240px;
        height: 40px;
        line-height: 40px;
      }
      .item-right {
        position: absolute;
        right: 50px;
      }
    }
  }
  .box-operate {
    position: relative;
    height: 100px;
    top: 180px;
    .btn-zuoye {
      position: absolute;
      left: 60px;
      top: 0;
    }
    .btn-pingshi {
      position: absolute;
      left: 200px;
      top: 0;
    }
    .handle-input{
      position: absolute;
      left: 60px;
      top: 50px;
      width: 250px;
      display: inline-block;
    }
  }
  .box-score {
    width: 800px;
    position: relative;
    left: 60px;
    top: 180px;
    height: 600px;
    border: 1px solid #ebd978;
    margin-bottom: 8px;
    .title {
      position: absolute;
      display: inline-block;
      width: 100px;
      height: 30px;
      border: none;
      border-right: 1px solid #ebd978;
      border-bottom: 1px solid #ebd978;
      background-color: #ffffff;
      color: #666666;
      font-size: 13px;
      &:focus {
        background-color: #ebd978;
      }
    }
    .statistic {
      position: absolute;
      height: 520px;
      left: 0;
    }
    ul {
      position: absolute;
      width: 600px;
      top: 80px;
      left: 100px;
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        width: 300px;
        padding: 0;
        margin: 0;
        float: left;
      }
    }
    .ranktable {
      position: absolute;
      width: 860px;
      left: 0;
      top: 55px;
    }
  }
}
</style>
