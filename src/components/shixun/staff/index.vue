<template>
    <div class="account-container">
        <div slot="header" class="box-card-header">
            <el-select v-model="select_role" placeholder="请选择角色" class="handle-select mr10">
                <el-option value='' label='请选择角色'></el-option>
                <el-option v-for="item in roles" :key="item.id" :label="item.desc" :value="item.desc">
                </el-option>
            </el-select>
            <el-input v-model="select_name" clearable placeholder="请输入姓名" class="handle-input mr10"></el-input>
            <el-button class="btn-search-staff" icon="el-icon-search" @click.native="search">搜索</el-button>
        </div>
        <el-table :data="datalist" border style="width:70%;position:relative;margin-left:10px;" ref="multipleTable">
            <el-table-column align="center" prop="role" label="角色" width="100">
            </el-table-column>
            <el-table-column align="center" prop="zh_name" label="中文名" width="150">
            </el-table-column>
            <el-table-column align="center" prop="en_name" label="英文名" width="150">
            </el-table-column>
            <el-table-column align="center" prop="learn" label="学习状态" width="150">
            </el-table-column>
            <el-table-column align="center" prop="learnPercent" label="学习进度" width="150">
            </el-table-column>
            <el-table-column align="center" prop="exam" label="考试状态">
              <template slot-scope="scope">
                <span v-if="scope.row.exam === '未通过'" style="color: red">未通过</span>
                <span v-else style="color: blue">已通过</span>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getStaff } from '@/http/api/shixunApi'
import { mapGetters } from 'vuex'
export default {
  name: 'staff',
  data () {
    return {
      tableData: [],
      select_name: '',
      select_role: '',
      is_search: false
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters([
      'roleList'
    ]),
    datalist () {
      const self = this
      return self.tableData.filter(function (d) {
        if (d.role.indexOf(self.select_role) > -1 && 
          (d.zh_name.indexOf(self.select_name) > -1 || d.en_name.indexOf(self.select_name) > -1)) {
          return d
        }
      })
    },
    roles () {
      const self = this
      return self.roleList.filter(function (d) {
        if (d.name !== 'admin' && d.name !== 'schoolmasterA' && d.name !== 'schoolmasterB') {
          return d
        }
      })
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getStaff().then(response => {
          const dataw = response.result
          self.tableData = dataw
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    search () {
      this.is_search = true
    }
  }
}
</script>

<style scoped>
.account-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.box-card-header {
  position: relative;
  height: 80px;
  padding-left: 20px;
  padding-top: 20px;
  font-size: 18px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
.btn-search-staff {
  width: 82px;
  height: 34px;
  border-radius: 6px;
  font-size: 14px;
  color: #ffffff;
  background-color: #f85415;
  outline:none;
  border: none;
  box-shadow: none;
}
</style>
