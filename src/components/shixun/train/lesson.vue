<template>
    <div class="lession-container">
        <breadcrumb :levelList="breadcrumbs"></breadcrumb>
        <div class="tip-box">
            <div class="tip-icon-wrapper">
                <img src="../../../../static/images/shixun/light_bulb.png" />
            </div>
            <div class="tip-description">
                 1.本培训课程体系将作为线下考核的重要标准，与您的教学成果及KPI有直接关联，请务必认真学习！<br><br>
                 2.学习完本课程后，您需要参加考核，考核通过，才可解锁下个模块课程！
            </div>
        </div>
        <div v-if="examId>=0" class="exam-box">
           <span style="margin-left:20px" v-if="trainScore===0">
              <img src="../../../../static/images/shixun/icon_warning.png" />
              <span style="color:#333333;font-size:14px;padding-bottom:5px;">您还未参加考试!</span>
                <button class="btn-white" @click="goExam">马上考试</button>
           </span>
           <span style="margin-left:30px;" v-else>
              <img src="../../../../static/images/shixun/icon_score.png" />
              <span style="color:#333333;font-size:14px;padding-bottom:5px;">我的成绩:</span>
              <span style="color:#503ce6;font-size:14px;padding-bottom:5px;" v-if="trainScore>=passScore">{{trainScore}}</span>
              <span style="color:#ef5350;font-size:14px;padding-bottom:5px;" v-else>{{trainScore}}</span>
              <span style="color:#333333;font-size:14px;padding-bottom:5px;margin-right:10px;">分</span>
              <span style="color:#5ea50a;font-size:14px;padding-bottom:5px;margin-right:10px;" v-if="trainScore>=passScore">考核已通过</span>
              <span style="color:#ef5350;font-size:14px;padding-bottom:5px;margin-right:10px;" v-else>考核未通过</span>
              <button class="btn-white" @click="goExam">再次考试</button>
              <!--<button class="btn-black">查看试卷</button>-->
           </span>
        </div>
        <div class="lessonlist-box">
            <ul class="ul-lessonlist">
                <li v-for="item in dataList" v-bind:key="item.id">
                  <item-lesson :itemData="item"></item-lesson>
                  <div style="display:inline-block;width:100%;height:1px;border-top:1px solid #f8f8f8;"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import breadcrumb from '@/components/components/Breadcrumb'
import { getLession } from '@/http/api/shixunApi'
import itemLesson from './components/ItemLesson.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'lesson',
  components: {
    itemLesson, breadcrumb
  },
  data () {
    return {
      dataList: []
    }
  },
  created () {
    // this.$message.success('获取课程列表id:' + this.$route.params.id)
    // this.getData(this.$route.params.id)
    this.$store.dispatch('AddCurrRoute', this.$route)
    this.getData()
  },
  computed: {
    ...mapGetters([
      'score', 'passScore', 'cateId', 'examId', 'currRoute'
    ]),
    trainScore () {
      let score = this.score
      for (var i = 0; i < score.length; i++) {
        if (score[i].train_id === this.cateId) {
          return score[i].score
        }
      }
      return 0
    },
    breadcrumbs () {
      var bc = []
      for (var i = 0; i < this.currRoute.length; i++) {
        if (i === this.currRoute.length - 2) {
          bc.push({name: this.currRoute[i].meta.title, path: this.currRoute[i].path})
        } else {
          bc.push({name: this.currRoute[i].meta.title, path: ''})
        }
      }
      return bc
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getLession(this.cateId).then(response => {
          const dataw = response.dataList
          self.dataList = dataw
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    goExam () {
      this.$router.push({name: 'exam'})
    }
  }
}
</script>

<style scoped>
.lession-container {
  margin: 0;
  margin-top: 68px;
  padding: 0;
}
.tip-box {
  width: 1132px;
  height: 100px;
  margin-top: 10px;
  margin-left: 10px;
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
.exam-box {
  width: 1132px;
  margin-left: 10px;
  margin-top: 10px;
}
.lessonlist-box {
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 35px;
  width: 1132px;
  height: 577px;
  border: 1px solid #f8f8f8;
  border-radius: 6px;
}
.ul-lessonlist {
  margin: 0;
  padding: 0;
  list-style: none;
}
.ul-lessonlist li {
  width: 100%;
  height: 20px;
  margin-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
}
.btn-white {
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
.btn-white:hover {
  background-color: #f04a09;
}
.btn-black {
  width: 82px;
  height: 34px;
  border-radius: 6px;
  font-size: 14px;
  color: #333333;
  background-color: #fff5ac;
  outline:none;
  border: none;
  box-shadow: none;
}
.btn-black:hover {
  background-color: #fdf08f;
}
</style>
