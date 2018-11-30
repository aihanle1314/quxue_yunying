<template>
    <div class="appclassmore-container">
      <breadcrumb :levelList="breadcrumbs"></breadcrumb>
      <div class="box-header">
        <div class="info-card">
          <div class="item-left" style="left:50px;top:10px;">班级名称：{{classData.class_name}}</div>
          <div class="item-left" style="left:50px;top:50px;">教师姓名：{{classData.teacher_name}}</div>
          <div class="item-left" style="left:50px;top:90px;">班级ID：{{classData.class_id}}</div>
          <div class="item-left" style="left:300px;top:10px;">班级人数：{{classData.student_num}}人</div>
          <div class="item-left" style="left:300px;top:50px;">班级级别：{{classData.level_name}}</div>
          <div class="item-right" style="top:100px;">
            <el-button type="primary" @click.native="handleLookScore" size="small">班级成绩报告</el-button>
          </div>
        </div>
      </div>
      <div class="box-search">
          <el-input clearable v-model="select_name" placeholder="请输入学生姓名" class="handle-input mr10"
            @keydown.enter.native="search" size="small"></el-input>
          <el-button class="btn-search" type="primary" icon="el-icon-search" @click.native="search" size="small">搜索</el-button>
      </div>
      <el-table :data="datalist" border class="mytable" ref="multipleTable" size="small" max-height="800">
          <el-table-column align="center" prop="student_name" label="姓名">
          </el-table-column>
          <el-table-column align="center" prop="sex_name" label="性别" >
          </el-table-column>
          <el-table-column align="center" prop="grade_name" label="年级">
          </el-table-column>
          <el-table-column align="center" prop="phone" label="手机号">
          </el-table-column>
          <el-table-column align="center" label="查看">
            <template slot-scope="scope">
                <el-button size="small" v-show="classData.class_type==='0'"
                    @click="handleLookStdScore(scope.$index, scope.row)">学习报告</el-button>
                <el-button size="small" v-show="classData.class_type!=='0'"
                    @click="handleLookTestScore(scope.$index, scope.row)">测试报告</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
</template>
<script>
import { GetClassMore } from '@/http/api/qxappApi'
import breadcrumb from '@/components/components/Breadcrumb'
import { mapGetters } from 'vuex'
export default {
  name: 'qxappclassmore',
  components: { breadcrumb },
  data () {
    return {
      tableData: [],
      select_name: '',
      is_search: false
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters([
      'classData'
    ]),
    datalist () {
      const self = this
      return self.tableData.filter(function (d) {
        if (d.student_name.indexOf(self.select_name) > -1) {
          return d
        }
      })
    },
    breadcrumbs () {
      let matched = this.$route.matched
      let bc = []
      bc.push({name: matched[0].meta.title, path: matched[0].path})
      bc.push({name: matched[1].meta.title, path: ''})
      return bc
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        GetClassMore(this.classData.class_id).then(response => {
          const dataw = response.data
          self.tableData = dataw.studentlist
          self.tableData.forEach(item => {
            if (item.sex === '1') {
              item['sex_name'] = '男'
            } else if (item.sex === '2'){
              item['sex_name'] = '女'
            }
            if (item.grade === '0') {
              item['grade_name'] = '学前'
            } else if (item.grade === '11') {
              item['grade_name'] = '学前1'
            } else if (item.grade === '12') {
              item['grade_name'] = '学前2'
            } else {
              item['grade_name'] = item.grade + '年级'
            }
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    search () {
      this.is_search = true
    },
    handleLookScore () {
      this.$router.push({name: 'qxappclassmorescore'})
    },
    handleLookStdScore (index, row) {
      this.$store.dispatch('setStudentData', row)
      this.$router.push({name: 'qxappclassmorestdscore'})
    },
    handleLookTestScore (index, row) {
      this.$store.dispatch('setStudentData', row)
      // this.$router.push({name: 'qxappclassmoretestscore'})
      this.$router.push({name: 'qxappclassmorestdscore'})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.appclassmore-container {
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
      background-color: #fff5ac;
      border: 1px solid #333333;
      border-radius: 6px;
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
  .box-search {
    position: relative;
    height: 50px;
    top: 180px;
    .handle-input{
      position: absolute;
      left: 10px;
      top: 0;
      width: 250px;
      display: inline-block;
    }
    .btn-search {
      position: absolute;
      left: 270px;
      top: 0;
    }
    .btn-export {
      position: absolute;
      left: 750px;
      top: 0;
    }
  }
  .mytable {
    width: 860px;
    position: relative;
    left: 10px;
    top: 180px;
    margin-bottom: 8px;
  }
}
</style>
