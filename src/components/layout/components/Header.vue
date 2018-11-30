<template>
    <div class="header">
        <img class="logo" src="../../../../static/images/logo.png">
        <div class="route-menu">
            <el-dropdown @command="handleCommand" placement="bottom" :show-timeout="0" :hide-timeout="0" style="width:100px;height:60px;">
                <span class="el-dropdown-proj">
                    {{projectName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <template v-for="item in project">
                    <el-dropdown-item :command="item" v-bind:key="item.id">{{item.name}}</el-dropdown-item>
                  </template>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div style="position:absolute;right:180px;width:300px;text-align:right;font-size:16px;margin-top:5px;margin-right:10px;">
          {{oName}}
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand" style="height:60px;">
                <span class="el-dropdown-user">
                    <img class="user-logo" src="../../../../static/images/jiantou_down.png" />
                    {{name}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="modifyPass">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import router from '@/router'
import store from '@/store'
import { mapGetters } from 'vuex'
import { getUserHeader, setUserHeader } from '@/utils/auth'
export default {
  name: 'Header',
  computed: {
    ...mapGetters([
      'name', 'oName', 'roles', 'project'
    ]),
    // gropDownMenu () {
    //   let self = this
    //   var show = self.projectList.filter(function (d) {
    //     if (self.project.some(id => id === d.id)) {
    //       return d
    //     }
    //   })
    //   return show
    // },
    projectName () {
      if (this.selectProName) {
        return this.selectProName
      } else {
        return this.project[0].name
      }
    }
  },
  data () {
    return {
      selectProName: getUserHeader()
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        this.$confirm('确定退出当前账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut')
          location.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
      } else if (command === 'modifyPass') {
        router.push('/password')
      } else {
        var data = {
          'roles': this.roles,
          'proj': command.name
        }
        this.selectProName = command.name
        setUserHeader(command.name)
        let path = '/'
        if (command.name.indexOf('外教') > -1) {
          path += '01'
        } else if (command.name.indexOf('师训') > -1) {
          path += '02'
        } else if (command.name.indexOf('趣学') > -1) {
          path += '03'
        } else if (command.name.indexOf('账户') > -1) {
          path += 'schooladmin/account'
        }
        store.dispatch('GenerateRoutes', data).then(() => {
          router.push(path)
        })
      }
    }
  }
}
</script>
<style scoped>
.header {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 68px;
    font-size: 22px;
    line-height: 70px;
    background-color: #ffe62f;
    top: 0;
    z-index: 1005;
}
.logo {
  position: absolute;
  left: 20px;
  width: 153px;
  height: 68px;
}
.route-menu {
  position: absolute;
  left: 190px;
}
.el-dropdown-proj {
  color: #000;
  cursor: pointer;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 600;
}
.el-icon-arrow-down {
  font-size: 16px;
  font-weight: 600;
}
.user-info {
  position: absolute;
  right: 50px;
}
.el-dropdown-user {
  position: relative;
  padding-left: 50px;
  color: #000;
  cursor: pointer;
  vertical-align: middle;
  font-size: 16px;
}
.user-info .user-logo {
  position: absolute;
  margin-top: 25px;
  left: 20px;
  width: 20px;
  height: 20px;
}
</style>
