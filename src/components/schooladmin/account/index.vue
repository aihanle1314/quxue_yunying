<template>
    <div class="account-container">
      <el-dialog :title="editAcTitle" :visible.sync="editAcVisible">
        <el-form ref="accountForm" :model="accountForm" :rules="rules" label-width="120px">
           <el-form-item label="用户名" prop="username">
                <el-input class="form-input" v-model="accountForm.username"></el-input>
           </el-form-item>
           <el-form-item label="项目权限" prop="project">
            <el-checkbox-group v-model="accountForm.project">
              <el-checkbox v-for="item in project" :key="item.id" :label="item.id">
                {{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
           <el-form-item label="角色" prop="role_id">
                <el-select v-model="accountForm.role_id" placeholder="请选择">
                    <el-option v-for="item in roleslist" :key="item.id" :label="item.describe" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="中文名" prop="zh_name">
                <el-input class="form-input" v-model="accountForm.china_name"></el-input>
           </el-form-item>
           <el-form-item label="英文名" prop="en_name">
                <el-input class="form-input" v-model="accountForm.english_name"></el-input>
           </el-form-item>
           <el-form-item label="邮箱" prop="email">
                <el-input class="form-input" v-model="accountForm.email"></el-input>
           </el-form-item>
           <el-form-item>
                <button class="btn-delete" @click="onSubmitForm('accountForm')">提交</button>
                <button class="btn-edit" @click="resetForm('accountForm')">重置</button>
            </el-form-item>
        </el-form>
       </el-dialog>
       <div slot="header" class="box-card-header">
          <button class="btn-add-acount" @click="handleAdd" icon="delete">添加账户</button>
        </div>
        <el-table :data="datalist" border style="position:relative;margin-left:10px;" ref="multipleTable">
            <el-table-column align="center" prop="china_name" label="中文名">
            </el-table-column>
            <el-table-column align="center" prop="english_name" label="英文名">
            </el-table-column>
            <el-table-column align="center" prop="role" label="角色">
            </el-table-column>
            <el-table-column align="center" prop="username" label="账号">
            </el-table-column>
             <el-table-column align="center" prop="project" label="业务权限">
            </el-table-column>
            <el-table-column align="center" prop="email" label="邮箱">
            </el-table-column>
            <el-table-column align="center" prop="login_time" label="最近登录">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template slot-scope="scope">
                    <button class="btn-edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑</button>
                    <button class="btn-delete"
                            @click="confirmDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { validatPhone } from '@/utils/validate'
import { getAccount, updateAccount, delAccount } from '@/http/api/userApi'
import { mapGetters } from 'vuex'
export default {
  name: 'account',
  data () {
    let self = this
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (self.accountForm.phone !== '') {
          if (!validatPhone(self.accountForm.phone)) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }
      }
    }
    const validateProj = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请选择项目权限'))
      } else if (value.length >= 1) {
        callback()
      }
    }
    return {
      tableData: [],
      roleData: [],
      accountForm: {
        username: '',
        project: [],
        role_id: '',
        zh_name: '',
        en_name: '',
        email: ''
      },
      rules: {
        username: [
          // { required: true, validator: validatePhone, trigger: ['blur', 'change'] }
          { required: true, message: '请输入账户名称', trigger: ['blur', 'change'] }
        ],
        project: [
          { required: true, validator: validateProj, trigger: ['change'] }
        ],
        role_id: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      editAcVisible: false,
      editAcTitle: '',
      isAddAccount: false
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters([
      'project', 'roleList'
    ]),
    datalist () {
      return this.tableData.filter(function (d) {
        if (d.role_name !== 'admin') {
          return d
        }
      })
    },
    roleslist () {
      return this.roleList.filter(function (d) {
        if (d.name !== 'admin' && d.name !== 'schoolmaster' && d.name !== 'schoolmasterA') {
          return d
        }
      })
    }
  },
  watch: {
    selProject (valArr) {
      // console.log(valArr)
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getAccount().then(response => {
          const dataw = response.data
          self.tableData = dataw.list
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // getRoleData () {
    //   let self = this
    //   if (self.roleData.length === 0) {
    //     return new Promise((resolve, reject) => {
    //       getRoleList().then(response => {
    //         const dataw = response.result
    //         self.roleData = dataw
    //         resolve()
    //       }).catch(error => {
    //         reject(error)
    //       })
    //     })
    //   }
    // },
    handleAdd () {
      // this.getRoleData()
      this.accountForm = {
        username: '',
        project: [],
        role_id: '',
        china_name: '',
        english_name: '',
        email: ''
      }
      var projid = []
      this.project.some(item => {
        projid.push(item.id)
      })
      this.accountForm.project = projid
      this.editAcVisible = true
      this.editAcTitle = '添加账户'
      this.isAddAccount = true
    },
    handleEdit (index, row) {
    //   this.$message('编辑第' + (index + 1) + '行' + row)
      // this.getRoleData()
      this.accountForm['id'] = row.id
      this.accountForm.username = row.username
      var roleid
      this.roleList.some(item => {
        if (item.describe === row.role) roleid = item.id
      })
      this.accountForm.role_id = roleid
      let self = this
      var projid = []
      if (row.project) {
        var projs = row.project.split(';')
        projs.forEach(proitem => {
          self.project.some(item => {
            if (item.name === proitem)
              projid.push(item.id)
            })
        })
      }
      this.accountForm.project = projid
      this.accountForm.china_name = row.china_name
      this.accountForm.english_name = row.english_name
      this.accountForm.email = row.email
      this.editAcVisible = true
      this.editAcTitle = '编辑账户'
      this.isAddAccount = false
    },
    onSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            updateAccount(this.accountForm).then(response => {
              if (response) {
                this.editAcVisible = false
                this.getData()
                this.$message.success('提交成功！')
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // if (this.isAddAccount) {
      //   return new Promise((resolve, reject) => {
      //     addAccount(this.form).then(response => {
      //       this.getData()
      //       this.$message.success('添加提交成功！')
      //       resolve()
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
      // } else {
      //   return new Promise((resolve, reject) => {
      //     editAccount(this.form).then(response => {
      //       this.getData()
      //       this.$message.success('修改提交成功！')
      //       resolve()
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
      // }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    confirmDelete (index, row) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(index, row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleDelete (index, row) {
      return new Promise((resolve, reject) => {
        delAccount(row.id).then(response => {
          if (response) {
            this.getData()
            this.$message.success('账号已删除！')
          }
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
.account-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
form {
  width: 420px;
  margin: 0 auto;
}
.form-input {
  width: 250px;
}
.box-card-header {
  position: relative;
  height: 80px;
  padding-left: 20px;
  padding-top: 20px;
  font-size: 18px;
}
.btn-add-acount {
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
.btn-edit {
  width: 60px;
  height: 25px;
  margin-left: 15px;
  background-color: #fff;
  border: 1px solid #666666;
  color: #666666;
  font-size: 13px;
  box-shadow: none;
}
.btn-delete {
  width: 60px;
  height: 25px;
  margin-left: 15px;
  background-color: #f85415;
  border: 1px solid #f85415;
  color: #fff;
  font-size: 13px;
  box-shadow: none;
}
</style>
