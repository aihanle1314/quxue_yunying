<template>
    <div class="teacher-container">
        <breadcrumb :levelList="breadcrumbs"></breadcrumb>
        <el-menu v-bind:default-active="trainNavActive" class="el-menu-demo" mode="horizontal"
            @select="handleSelect" active-text-color="#fdb730">
            <template v-for="item in dataList">
               <el-menu-item :index="''+item.id" v-bind:key="item.id">
                  <img v-if="isLock(item.needId)" src="../../../../static/images/shixun/menu_lock_yellow.png" style="margin-right:5px;margin-bottom:5px;"/>
                  <span style="font-size:14px;color:#717171;font-weight:bold;">{{item.title}}</span><i class="el-icon-arrow-right"></i>
               </el-menu-item>
             </template>
        </el-menu>
        <div class="line"></div>
        <div class="tip-box">
            <div class="tip-icon-wrapper">
                <img src="../../../../static/images/shixun/light_bulb.png" />
            </div>
            <div class="tip-description">
                 1.本培训课程体系将作为线下考核的重要标准，与您的教学成果及KPI有直接关联，请务必认真学习！<br><br>
                 2.学习完本课程后，您需要参加考核，考核通过，才可解锁下个模块课程！
            </div>
        </div>
        <div class="content-box">
            <ul class="ul-steplist">
                <li v-for="item in contentlist" v-bind:key="item.id">
                    <item-card :itemData="item"></item-card>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import breadcrumb from '@/components/components/Breadcrumb'
import itemCard from './components/ItemCard.vue'
import { getTrain, updateTrainUnlock } from '@/http/api/shixunApi'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: {
    itemCard, breadcrumb
  },
  props: {
    getDateId: {
      type: Number
    }
  },
  data () {
    return {
      dataList: [],
      selectIndex: ''
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters([
      'unlockTrainCategory',
      'unlockTrainList',
      'trainNavActive'
    ]),
    contentlist () {
      const self = this
      for (var i = 0; i < self.dataList.length; i++) {
        var item = self.dataList[i]
        if (item.id + '' === self.selectIndex) {
          return item.content
        }
      }
    },
    breadcrumbs () {
      this.$store.dispatch('ClearCurrRoute')
      let matched = this.$route.matched
      var bc = []
      for (var i = 0; i < matched.length; i++) {
        this.$store.dispatch('AddCurrRoute', matched[i])
        bc.push({name: matched[i].meta.title, path: ''})
      }
      return bc
    }
  },
  watch: {
    // typekey (curVal, oldVal) {
    //   console.log(this.typekey)
    // }
    getDateId: 'changeGetId',
    selectIndex: 'checkUpdateCLocked'
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getTrain(this.getDateId).then(response => {
          const dataw = response.dataList
          self.dataList = dataw
          if (self.trainNavActive === '') {
            this.$store.dispatch('SetTrainNavActive', '' + dataw[0].id)
            this.selectIndex = '' + dataw[0].id
          } else {
            this.selectIndex = self.trainNavActive
          }
          // if (self.unlockTrainCategory.length === 0) {
          //   this.$store.dispatch('SetTrainNavActive', '' + dataw[0].id)
          //   this.selectIndex = '' + dataw[0].id
          // } else {
          //   var need = self.unlockTrainCategory[self.unlockTrainCategory.length - 1]
          //   for (var i = 0; i < self.dataList.length; i++) {
          //     if (self.dataList[i].needId === need) {
          //       this.$store.dispatch('SetTrainNavActive', '' + self.dataList[i].id)
          //       this.selectIndex = '' + self.dataList[i].id
          //     }
          //   }
          // }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    changeGetId () {
      let self = this
      return new Promise((resolve, reject) => {
        getTrain(this.getDateId).then(response => {
          const dataw = response.dataList
          self.dataList = dataw
          this.$store.dispatch('SetTrainNavActive', '' + dataw[0].id)
          this.selectIndex = '' + dataw[0].id
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleSelect (index) {
      for (var i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].id + '' === index) {
          if (!this.isLock(this.dataList[i].needId)) {
            this.selectIndex = index
            this.$store.dispatch('SetTrainNavActive', index)
          } else {
            this.$message.warning('该选项还未解锁，请完成前面的考试解锁！')
          }
        }
      }
    },
    isLock (needid) {
      if (needid === -1) {
        return false
      }
      let self = this
      // for (var i = 0; i < self.unlockTrainCategory.length; i++) {
      //   if (needid === self.unlockTrainCategory[i]) {
      //     return false
      //   }
      // }
      // return true
      return !self.unlockTrainCategory.some(id => id === needid)
    },
    checkUpdateCLocked () {
      let selItem = {}
      for (var i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].id + '' === this.selectIndex) {
          selItem = this.dataList[i]
          break
        }
      }
      var isAllUnlock = true
      for (var n = 0; n < selItem.content.length; n++) {
        isAllUnlock = isAllUnlock && this.isItemIdUnLocked(selItem.content[n])
      }
      if (isAllUnlock) {
        this.updateUnlock(selItem.id)
      }
    },
    updateUnlock (cateId) {
      let unlockCate = this.unlockTrainCategory
      // for (var i = 0; i < unlockCate.length; i++) {
      //   if (cateId === unlockCate[i]) {
      //     return
      //   }
      // }
      if (unlockCate.some(id => id === cateId)) {
        return
      }
      unlockCate.push(cateId)
      var param = {
        type: 1,
        unlock: unlockCate
      }
      return new Promise((resolve, reject) => {
        updateTrainUnlock(param).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    isItemIdUnLocked (itemD) {
      if (itemD.needId === -1) {
        return true
      }
      let unlock = this.unlockTrainList
      // for (var i = 0; i < unlock.length; i++) {
      //   if (itemD.id === unlock[i]) {
      //     return true
      //   }
      // }
      // return false
      return unlock.some(id => id === itemD.id)
    }
  }
}
</script>

<style scoped>
.teacher-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.tip-box {
  width: 1132px;
  height: 100px;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 35px;
  background-color: #fff5ac;
  border: 1px solid #fff5ac;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.tip-icon-wrapper {
  float: left;
  margin: 0;
  margin-left: 15px;
  margin-top: 22px;
}
.tip-description {
  float: left;
  margin: 0;
  margin-top: 30px;
  margin-left: 40px;
  color: #666666;
  font-size: 12px;
}
.content-box {
  margin-top: 10px;
  margin-right: 35px;
}
.ul-steplist {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.ul-steplist li {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  display: block;
  float: left;
}
.lessionlist-box {
  margin-top: 10px;
  margin-right: 35px;
}
.ul-lessonlist {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.ul-lessonlist li {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  display: inline-block;
}
</style>
