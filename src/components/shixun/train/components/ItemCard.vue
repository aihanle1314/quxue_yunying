<template>
  <el-card class="box-card-component" style="margin-left:8px;">
      <div class="box-title-wrapper">
          {{ itemData.title }}
      </div>
       <div class="box-button-wrapper">
           <div v-if="!isLocked">
              <!--
              <router-link :to="{ name: 'lesson', params: { id: itemData.id, examId: itemData.examId } }">
                  <el-button type="primary">马上学习</el-button>
              </router-link>
              -->
              <button class="btn-golesson" @click="goLesson">马上学习</button>
              <span v-if="isPass" style="font-size:12px;color:green"> 已通过</span>
           </div>
           <el-button v-else type="info" @click.native="lockTip">解锁课程</el-button>
      </div>
      <div class="box-icon-wrapper">
           <img :src="iconRes" />
      </div>
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {
    itemData: {
      type: Object
    }
  },
  computed: {
    iconRes () {
      if (this.isLocked) {
        return '../../../../../static/images/shixun/lesson_lock.png'
      } else {
        return '../../../../../static/images/shixun/lesson_lock_open.png'
      }
    },
    isLocked () {
      if (this.itemData.needId === -1) {
        return false
      }
      let unlock = this.$store.getters.unlockTrainList
      for (var i = 0; i < unlock.length; i++) {
        if (this.itemData.needId === unlock[i]) {
          return false
        }
      }
      return true
    },
    isPass () {
      let score = this.$store.getters.score
      for (var i = 0; i < score.length; i++) {
        if (this.itemData.id === score[i].train_id) {
          if (score[i].score >= this.$store.getters.passScore) {
            return true
          } else {
            return false
          }
        }
      }
      return false
    }
  },
  methods: {
    goLesson () {
      let self = this
      self.$store.dispatch('SetCateId', self.itemData.id)
      self.$store.dispatch('SetExamId', self.itemData.examId)
      self.$router.push({name: 'lesson'})
    },
    lockTip () {
      this.$confirm('提示：通过上节课模块考试才可进行解锁！', '解锁失败', {
        type: 'error',
        showClose: true,
        showCancelButton: false,
        showConfirmButton: false
      })
    }
  }
}
</script>

<style scoped>
.box-card-component {
  width: 205px;
  height: 122px;
  border: 1px solid #fff5ac;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.box-title-wrapper {
  float: left;
  width: 130px;
  height: 50px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #444444;
  font-weight: bold;
}
.box-button-wrapper {
  float: left;
  margin: 0;
  padding: 0;
}
.btn-golesson {
  width: 100px;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  color: #ffffff;
  background-color: #f85415;
  outline:none;
  border: none;
  box-shadow: none;
}
.box-icon-wrapper {
  float: right;
  margin: 0;
  padding: 0;
  margin-right: -10px;
  margin-top: -60px;
}
</style>
