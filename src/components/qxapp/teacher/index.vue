<template>
    <div class="appteacher-container">
       <div class="box-header">
          <el-input clearable v-model="select_name" placeholder="请输入教师名称" class="handle-input mr10"
            @keydown.enter.native="search" size="small"></el-input>
          <el-button class="btn-search" type="primary" icon="el-icon-search" @click.native="search" size="small">搜索</el-button>
          <el-button class="btn-export" type="primary" @click.native="handleExport" size="small">导出</el-button>
        </div>
        <el-table :data="datalist" border class="proj-table" ref="multipleTable" size="small" v-loading="listLoading" max-height="800">
            <el-table-column align="center" prop="u_name" label="教师姓名">
            </el-table-column>
            <el-table-column align="center" prop="phone" label="手机号" >
            </el-table-column>
            <el-table-column align="center" prop="class_number" label="班级数">
            </el-table-column>
            <el-table-column align="center" prop="student_number" label="学生人数">
            </el-table-column>
            <el-table-column align="center" label="查看">
                <template slot-scope="scope">
                    <el-button size="small"
                        @click="handleLook(scope.$index, scope.row)">班级列表</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            <el-table-column align="center" prop="student_number" label="班级人数">
            </el-table-column>
          </el-table>
       </el-dialog>
    </div>
</template>

<script>
import { GetTeachers, GetTeacherClass } from '@/http/api/qxappApi'
export default {
  name: 'qxappteacher',
  data () {
    return {
      listLoading: false,
      tableData: [],
      tableMoreData: [],
      select_name: '',
      is_search: false,
      moreDialogVisible: false
    }
  },
  created () {
    this.getData()
  },
  computed: {
    datalist () {
      const self = this
      return self.tableData.filter(function (d) {
        if (d.u_name.indexOf(self.select_name) > -1) {
          return d
        }
      })
    }
  },
  methods: {
    getData () {
      let self = this
      this.listLoading = true
      return new Promise((resolve, reject) => {
        GetTeachers().then(response => {
          const dataw = response.data
          self.tableData = dataw.list
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
        GetTeacherClass(id).then(response => {
          const dataw = response.data
          self.tableMoreData = dataw.list
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleLook (index, row) {
      // this.moreDialogVisible = true
      // this.getMoreData(row.uid)
      this.$router.push({name: 'qxappclass', params: {teacher_name: row.u_name}})
    },
    search () {
      this.is_search = true
    },
    handleExport () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel')
        const tHeader = ['教师姓名', '手机号', '班级数', '学生人数']
        const filterVal = ['u_name', 'phone', 'class_number', 'student_number']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '教师列表')
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
.appteacher-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
  .box-header {
    position: relative;
    height: 80px;
    margin-left: 10px;
    .handle-input{
      position: absolute;
      left: 200px;
      top: 20px;
      width: 300px;
      display: inline-block;
    }
    .btn-search {
      position: absolute;
      left: 510px;
      top: 20px;
    }
    .btn-export {
      position: absolute;
      left: 750px;
      top: 20px;
    }
  }
  .proj-table {
    width: 860px;
    margin-left: 10px;
    margin-bottom: 8px;
  }
}
</style>
