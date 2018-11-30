<template>
    <div class="appstudent-container">
       <div class="box-header">
          <el-input clearable v-model="select_name" placeholder="请输入学生姓名" class="handle-input mr10"
            @keydown.enter.native="search" size="small"></el-input>
          <el-button class="btn-search" type="primary" icon="el-icon-search" @click.native="search" size="small">搜索</el-button>
          <el-button class="btn-export" type="primary" @click.native="startExport" size="small" :loading="exportLoading">导出</el-button>
        </div>
        <el-table :data="tableData" border class="mytable" ref="multipleTable" size="small" v-loading="listLoading">
            <el-table-column align="center" prop="student_name" label="姓名">
            </el-table-column>
            <el-table-column align="center" prop="sex_name" label="性别">
            </el-table-column>
            <el-table-column align="center" prop="phone" label="手机号">
            </el-table-column>
            <el-table-column align="center" prop="grade_name" label="年级">
            </el-table-column>
            <el-table-column align="center" prop="reg_time" label="注册时间" width="150">
            </el-table-column>
            <el-table-column align="center" prop="last_login_time" label="最近上线时间" width="150">
            </el-table-column>
            <el-table-column align="center" label="查看">
                <template slot-scope="scope">
                    <el-button size="small"
                        @click="handleLook(scope.$index, scope.row)">所在班级</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="mypagination">
		  <el-pagination v-show="!listLoading"
				@current-change ="handleCurrentChange"
				layout="prev, pager, next"
				:page-count="total_page">
		  </el-pagination>
		</div>
        <el-dialog title="班级详情" :visible.sync="moreDialogVisible">
          <el-table :data="tableMoreData" size="small" height="500">
            <el-table-column align="center" prop="class_name" label="班级名称">
            </el-table-column>
            <el-table-column align="center" label="班级类型">
               <template slot-scope="scope">
                <span v-if="scope.row.class_type === '0'">正式班级</span>
                <span v-else-if="scope.row.class_type === '1'">入学测试班</span>
                <span v-else-if="scope.row.class_type === '2'">水平测试班</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="level_name" label="班级级别">
            </el-table-column>
            <el-table-column align="center" prop="u_name" label="教师">
            </el-table-column>
            <el-table-column align="center" prop="create_time" label="加入时间" width="150">
            </el-table-column>
            <el-table-column align="center" label="查看">
              <template slot-scope="scope">
                <el-button size="small" v-show="scope.row.class_type==='0'"
                    @click="handleLookStdScore(scope.$index, scope.row)">学习报告</el-button>
                <el-button size="small" v-show="scope.row.class_type!=='0'"
                    @click="handleLookTestScore(scope.$index, scope.row)">测试报告</el-button>
              </template>
            </el-table-column>
          </el-table>
       </el-dialog>
    </div>
</template>

<script>
import { GetStudents, GetStudentClass } from '@/http/api/qxappApi'
export default {
  name: 'qxappstudent',
  data () {
    return {
      listLoading: false,
      exportLoading: false,
      tableData: [],
      tableMoreData: [],
      select_name: '',
      total_page: 1,
      curr_page: 1,
      moreDialogVisible: false,
      currStudent: {}
    }
  },
  created () {
    this.getData()
  },
  computed: {

  },
  methods: {
    getData () {
      let self = this
      this.listLoading = true
      return new Promise((resolve, reject) => {
        GetStudents(this.select_name, this.curr_page).then(response => {
          const dataw = response.data
          self.tableData = dataw.list
          self.total_page = dataw.total_page
          if (self.tableData && self.tableData.length > 0) {
            self.tableData.forEach(item => {
              if (item.u_sex === '1') {
                item['sex_name'] = '男'
              } else if (item.u_sex === '2'){
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
          }
          this.listLoading = false
          resolve()
        }).catch(error => {
          this.listLoading = false
          reject(error)
        })
      })
    },
    getMoreData (id) {
      let self = this
      return new Promise((resolve, reject) => {
        GetStudentClass(id).then(response => {
          const dataw = response.data
          self.tableMoreData = dataw.list
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleLook (index, row) {
      this.moreDialogVisible = true
      this.currStudent = row
      this.getMoreData(row.uid)
    },
    search () {
      this.getData()
    },
    handleCurrentChange (val) {
      this.curr_page = val
      this.getData()
    },
    handleLookStdScore (index, row) {
      this.$store.dispatch('setClassData', row)
      this.$store.dispatch('setStudentData', this.currStudent)
      this.$router.push({name: 'qxappclassmorestdscore', params: {from_stu: true}})
    },
    handleLookTestScore (index, row) {
      this.$store.dispatch('setClassData', row)
      this.$store.dispatch('setStudentData', this.currStudent)
      // this.$router.push({name: 'qxappclassmoretestscore', params: {from_stu: true}})
      this.$router.push({name: 'qxappclassmorestdscore', params: {from_stu: true}})
    },
    startExport () {
      this.exportLoading = true
      var allList
      return new Promise((resolve, reject) => {
        GetStudents('', '').then(response => {
          const dataw = response.data
          allList = dataw.list
          if (allList && allList.length > 0) {
            allList.forEach(item => {
              if (item.u_sex === '1') {
                item['sex_name'] = '男'
              } else if (item.u_sex === '2'){
                item['sex_name'] = '女'
              }
              if (item.grade === '0') {
                item['grade_name'] = '学前'
              } else {
                item['grade_name'] = item.grade + '年级'
              }
            })
          }
          this.exportLoading = false
          this.handleExport(allList)
          resolve()
        }).catch(error => {
          this.exportLoading = false
          reject(error)
        })
      })
    },
    handleExport (list) {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel')
        const tHeader = ['中文名', '英文名', '性别', '手机号', '年级', '注册时间', '最近上线时间']
        const filterVal = ['student_name', 'name', 'sex_name', 'phone', 'grade_name', 'reg_time', 'last_login_time']
        // const list = this.tableData
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '学生列表')
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
.appstudent-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
  .box-header {
    position: relative;
    height: 80px;
    margin-left: 10px;
    .handle-input{
      position: absolute;
      left: 100px;
      top: 20px;
      width: 250px;
      display: inline-block;
    }
    .btn-search {
      position: absolute;
      left: 360px;
      top: 20px;
    }
    .btn-export {
      position: absolute;
      left: 750px;
      top: 20px;
    }
  }
  .mytable {
    width: 860px;
    margin-left: 10px;
  }
  .mypagination {
    display: inline-block;
    width: 860px;
    text-align: center;
    margin-left: 10px;
    margin-top: 10px;
  }
}
</style>
