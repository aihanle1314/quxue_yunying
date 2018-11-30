<template>
    <div class="appclassstdscore-container">
      <div v-if="$route.params.from_stu">
        <el-button style="position:relative;margin-top:8px;margin-left:10px;" type="primary" icon="el-icon-arrow-left" @click.native="goBackStudent" size="small">返回</el-button>
       </div>
      <breadcrumb v-else :levelList="breadcrumbs"></breadcrumb>
      <div class="box-header">
        <div class="info-card">
          <div class="item-left" style="left:50px;top:10px;">姓名：{{studentData.student_name}}</div>
          <div class="item-left" style="left:50px;top:50px;">班级名称：{{classData.class_name}}</div>
          <div class="item-left" style="left:50px;top:90px;">手机号码：{{studentData.phone}}</div>
          <div class="item-left" style="left:300px;top:10px;">年级：{{studentData.grade_name}}</div>
          <div class="item-left" style="left:300px;top:50px;">班级级别：{{classData.level_name}}</div>
          <div class="item-right" style="top:10px;">
            <el-button type="primary" size="small" @click.native="handleExport">导出成绩报告</el-button>
          </div>
        </div>
      </div>
      <div class="box-operate">
        <el-button v-if="score_type===0" class="btn-zuoye" style="background-color:#f8e160;color:#666;" type="primary" size="small" @click.native="handleScoreType(0)">作业成绩</el-button>
          <el-button v-else class="btn-zuoye" type="primary" size="small" @click.native="handleScoreType(0)">作业成绩</el-button>
          <el-button v-if="score_type===1" class="btn-pingshi" style="background-color:#f8e160;color:#666;" type="primary" size="small" @click.native="handleScoreType(1)">平时成绩</el-button>
          <el-button v-else class="btn-pingshi" type="primary" size="small" @click.native="handleScoreType(1)">平时成绩</el-button>
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
         <el-table :data="scoreData" border class="scoretable" size="small" max-height="580">
            <el-table-column align="center" v-for="item in columns" v-bind:key="item.order"
              :prop="item.column" :label="item.columnName" >
            </el-table-column>
        </el-table>
          <!-- <ul>
            <li v-for="item in scoreData" v-bind:key="item.key">
              <score-card :itemData="item"></score-card>
            </li>
          </ul> -->
      </div>
    </div>
</template>
<script>
import breadcrumb from '@/components/components/Breadcrumb'
import ScoreCard from './components/ScoreCard'
import { mapGetters } from 'vuex'
import { GetLesson, GetHomework, GetStuCourseScore, GetStuClassCourseScore } from '@/http/api/qxappApi'
export default {
  name: 'appclassstdscore',
  components: { ScoreCard, breadcrumb },
  data () {
    return {
      resData: {},
      lessonData: [], // 课程列表
      homewordData: [], // 作业列表
      select_id: '',
      scoreData: [],
      columns: [],
      score_type: 0 // 0-作业成绩 1-平时成绩
    }
  },
  created () {
    this.getLesson()
    this.getHomework()
  },
  computed: {
    ...mapGetters([
      'classData', 'studentData'
    ]),
    breadcrumbs () {
      let matched = this.$route.matched
      let bc = []
      bc.push({name: matched[0].meta.title, path: matched[0].path})
      bc.push({name: '班级详情', path: '/qxapp/class/classmore/'})
      bc.push({name: matched[1].meta.title, path: ''})
      return bc
    }
  },
  methods: {
    getHomework () {
      let self = this
      let param = {
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
        classId: this.classData.class_id,
        studentUid: this.studentData.uid
      }
      return new Promise((resolve, reject) => {
        GetStuClassCourseScore(param).then(response => {
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
        lessonId: this.select_id,
        studentUid: this.studentData.uid
      }
      return new Promise((resolve, reject) => {
        GetStuCourseScore(param).then(response => {
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
      this.scoreData = this.resData.orderList
      // var studata = {}
      // if (this.resData.orderList.length > 0) {
      //   studata = this.resData.orderList[0]
      // }

      // 数据
      // this.scoreData = []
      // for (var i = 0; i < this.columns.length; i++) {
      //   var item = this.columns[i]
      //   var chartitem = {}
      //   chartitem.key = this.select_id + item.columnName
      //   chartitem.title = item.columnName
      //   if (studata[item.column]) {
      //     chartitem.content = studata[item.column]
      //   } else {
      //     chartitem.content = ''
      //   }
      //   this.scoreData[i] = chartitem
      // }
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
    goBackStudent () {
      this.$router.push({name: 'qxappstudent'})
    },
    handleExport () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel')
        const tHeader = []
        const filterVal = []
        this.columns.forEach(item => {
          tHeader.push(item.columnName)
          filterVal.push(item.column)
        })
        const list = this.resData.orderList
        const data = this.formatJson(filterVal, list)
        var filename = this.studentData.student_name + '成绩报告'
        exportJsonToExcel(tHeader, data, filename)
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
.appclassstdscore-container {
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
    .scoretable {
      position: absolute;
      width: 860px;
      left: 0;
      top: 5px;
    }
    ul {
      position: absolute;
      width: 700px;
      top: 20px;
      left: 50px;
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        padding: 0;
        margin-left: 100px;
        margin-bottom: 60px;
        float: left;
      }
    }
  }
}
</style>
