<template>
    <div class="appclass-container">
       <div v-show="$route.params.teacher_name">
        <el-button style="position:relative;margin-top:8px;margin-left:10px;" type="primary" icon="el-icon-arrow-left" @click.native="goBackTeacher" size="small">返回</el-button>
       </div>
       <div class="box-header">
          <el-input clearable v-model="select_name" placeholder="请输入班级名称/班级ID/老师" class="handle-input mr10"
            @keydown.enter.native="search" size="small"></el-input>
          <el-select v-model="select_type" placeholder="班级类型" class="handle-input1" size="small">
            <el-option :label="'全部'" :value="''">
            </el-option>
            <el-option :label="'正式班级'" :value="0">
            </el-option>
            <el-option :label="'入学测试班'" :value="1">
            </el-option>
            <el-option :label="'水平测试班'" :value="2">
            </el-option>
          </el-select>
          <el-date-picker v-model="s_date" type="daterange" size="small" range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" class="handle-input2"
              style="width:300px;">
          </el-date-picker>
          <el-button class="btn-search" type="primary" icon="el-icon-search" @click.native="search" size="small">搜索</el-button>
          <el-button class="btn-export" type="primary" @click.native="startExport" size="small" :loading="exportLoading">导出</el-button>
        </div>
        <el-table :data="tableData" border class="mytable" ref="multipleTable" size="small" v-loading="listLoading">
            <el-table-column align="center" prop="class_name" label="班级名称">
            </el-table-column>
            <el-table-column align="center" prop="class_type_name" label="班级类型" >
            </el-table-column>
            <el-table-column align="center" prop="teacher_name" label="教师">
            </el-table-column>
            <el-table-column align="center" prop="student_num" label="班级人数">
            </el-table-column>
            <el-table-column align="center" prop="class_id" label="班级ID">
            </el-table-column>
            <el-table-column align="center" prop="create_time" label="创建时间" width="150">
            </el-table-column>
            <el-table-column align="center" prop="level_name" label="班级级别">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="small"
                        @click="handleLook(scope.$index, scope.row)">查看</el-button>
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
    </div>
</template>

<script>
import { GetClass } from '@/http/api/qxappApi'
export default {
  name: 'qxappclass',
  data () {
    return {
      listLoading: false,
      exportLoading: false,
      tableData: [],
      select_name: '',
      select_type: '',
      s_date: '',
      total_page: 1,
      curr_page: 1
    }
  },
  created () {
    if (this.$route.params.teacher_name) {
      this.select_name = this.$route.params.teacher_name
    }
    this.getData()
  },
  computed: {

  },
  methods: {
    getData () {
      let self = this
      var stime = ''
      var etime = ''
      if (this.s_date && this.s_date.length === 2) {
        stime = this.s_date[0]
        etime = this.s_date[1]
      }
      this.listLoading = true
      return new Promise((resolve, reject) => {
        GetClass(this.select_name, this.select_type, stime, etime, this.curr_page).then(response => {
          const dataw = response.data
          self.tableData = dataw.list
          self.total_page = dataw.total_page
          if (self.tableData && self.tableData.length > 0) {
            self.tableData.forEach(item => {
              if (item.class_type === '0') {
                item['class_type_name'] = '正式班级'
              } else if (item.class_type === '1'){
                item['class_type_name'] = '入学测试班'
              } else if (item.class_type === '2'){
                item['class_type_name'] = '水平测试班'
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
    handleLook (index, row) {
      this.$store.dispatch('setClassData', row)
      this.$router.push({name: 'qxappclassmore'})
    },
    search () {
      this.getData()
    },
    handleCurrentChange (val) {
      this.curr_page = val
      this.getData()
    },
    goBackTeacher () {
      this.$router.push({name: 'qxappteacher'})
    },
    startExport () {
      this.exportLoading = true
      var allList
      return new Promise((resolve, reject) => {
        GetClass('', '', '').then(response => {
          const dataw = response.data
          allList = dataw.list
          if (allList && allList.length > 0) {
            allList.forEach(item => {
              if (item.class_type === '0') {
                item['class_type_name'] = '正式班级'
              } else if (item.class_type === '1'){
                item['class_type_name'] = '入学测试班'
              } else if (item.class_type === '2'){
                item['class_type_name'] = '水平测试班'
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
        const tHeader = ['班级名称', '班级类型', '教师', '班级人数', '班级ID', '创建时间', '班级级别']
        const filterVal = ['class_name', 'class_type_name', 'teacher_name', 'student_num', 'class_id', 'create_time', 'level_name']
        // const list = this.tableData
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '班级列表')
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
.appclass-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
  .box-header {
    position: relative;
    height: 65px;
    .handle-input {
      position: absolute;
      left: 10px;
      top: 20px;
      width: 210px;
      display: inline-block;
    }
    .handle-input1 {
      position: absolute;
      left: 240px;
      top: 20px;
      width: 120px;
      display: inline-block;
    }
    .handle-input2 {
      position: absolute;
      left: 380px;
      top: 20px;
      width: 300px;
    }
    .btn-search {
      position: absolute;
      left: 690px;
      top: 20px;
    }
    .btn-export {
      position: absolute;
      left: 800px;
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
