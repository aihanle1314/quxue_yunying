<template>
    <div class="password-container">
       <div slot="header" class="box-card-header">
          <img src="../../../static/images/shixun/title_lock.png"><span style="margin-left:18px;">修改密码</span>
        </div>
        <hr color="#eeeeee">
        <el-form ref="form" :model="form" label-width="120px" status-icon :rules="rules1">
           <el-form-item label="旧密码" prop="oldPass">
                <el-input type="password" v-model="form.oldPass" auto-complete="off"></el-input>
           </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
           </el-form-item>
           <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
           </el-form-item>
           <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { changePass } from '@/http/api/userApi'

export default {
  name: 'password',
  data () {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPass: '',
        pass: '',
        checkPass: ''
      },
      rules1: {
        oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  created () {

  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            changePass(this.form).then(response => {
              if (response) {
                this.$message.success('密码修改成功！')
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
    }
  }
}
</script>

<style scoped>
.password-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.box-card-header {
  position: relative;
  height: 40px;
  padding-left: 34px;
  padding-top: 10px;
  font-size: 18px;
  color: #333333;
}
.el-form {
  width: 500px;
}
</style>
