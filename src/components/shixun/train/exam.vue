<template>
    <div class="exam-container">
        <div class="exam-box" :style="{display: state==='ready' ? 'block' : 'none'}">
            <div style="margin-top:136px;margin-left:180px;"><img src="../../../../static/images/shixun/img_q_confirm.png"/></div>
            <div style="margin-top:43px;margin-left:180px;font-size:22px;font-weight:bold;">确认开始考试吗?</div>
            <div style="margin-top:30px;" v-if="content.time>-1">
                <span style="font-size:14px;color:#333333;">考试须知：本次考试时间为</span>
                <span style="font-size:14px;color:#01a1d2">{{content.time}}</span>
                <span style="font-size:14px;color:#333333;">分钟，请在规定时间内完成考试，超出时间考试无效！</span>
            </div>
            <div style="margin-top:60px;margin-left:160px;">
                <button class="btn-white" @click="startExam">开始考试</button>
                <button class="btn-black" style="margin-left:30px;" @click="exitExam">取消考试</button>
            </div>
        </div>
        <div class="exam-box" :style="{display: state==='finish' && isPass ? 'block' : 'none'}">
            <div style="margin-top:136px;margin-left:180px;"><img src="../../../../static/images/shixun/img_q_pass.png"/></div>
            <div style="margin-top:43px;margin-left:130px;font-size:22px;font-weight:bold;">恭喜您！您通过了本次考核！</div>
            <div style="margin-top:60px;margin-left:220px;">
                <button class="btn-white" @click="exitExam">继续学习</button>
            </div>
        </div>
        <div class="exam-box" :style="{display: state==='finish' && !isPass ? 'block' : 'none'}">
            <div style="margin-top:136px;margin-left:180px;"><img src="../../../../static/images/shixun/img_q_fail.png"/></div>
            <div style="margin-top:43px;margin-left:110px;font-size:22px;font-weight:bold;">很遗憾！您未通过本次考核！</div>
            <div style="margin-top:60px;margin-left:140px;">
                <button class="btn-white" @click="exitExam">继续学习</button>
                <button class="btn-black" style="margin-left:30px;" @click="startExam">重新考试</button>
            </div>
        </div>
        <div class="exam-box" :style="{display: state==='testing' ? 'block' : 'none'}">
            <div class="content-time">{{timeText}}</div>
            <div class="content-type-name">{{quesTypeName}}</div>
            <div class="content-title">{{currSubject.title}}</div>
            <div class="content-video" v-if="currSubject.mode==='video'">
                <v-player :vSources="videoSource"  @vPlayerEnd="videoPlayerEnd"></v-player>
            </div>
            <div class="content-audio" v-else-if="currSubject.mode==='audio'">
                <a-player :aSources="currSubject.url"  @aPlayerEnd="audioPlayerEnd"></a-player>
            </div>
            <div class="content-video" v-else-if="currSubject.mode==='image'">
                <img :src="currSubject.url" alt=""/>
            </div>
            <div style="margin-top:10px;" v-if="isAnswerPic">
                <div v-if="questionType===1 || questionType===3">
                  <template v-for="item in currSubject.selects">
                      <img class="selects-img" style="margin-left:25px;margin-top:20px;" @click="clickAnswer(item.id)" :src="item.content" alt="" v-bind:key="item.id"/>
                  </template>
                </div>
                <div v-else-if="questionType===2">
                    <template v-for="item in currSubject.selects">
                      <img class="selects-img" style="margin-left:25px;margin-top:20px;" @click="checkboxClick(item.id)" :src="item.content" alt="" v-bind:key="item.id"/>
                    </template>
                    <div style="margin-top:60px;">
                        <button class="btn-next" @click="clickNextBtn">下一题</button>
                    </div>
                </div>
            </div>
            <div style="margin-top:10px;" v-else>
                <div v-if="questionType===1 || questionType===3">
                  <ul class="ul-btnlist">
                    <li v-for="item in currSubject.selects" v-bind:key="item.id">
                        <button class="btn1" @click="clickAnswer(item.id)">{{getSelectsName(item)}}</button>
                    </li>
                  </ul>
                  <!--
                  <template v-for="item in currSubject.selects">
                      <button class="btn" @click="clickAnswer(item.id)">{{getSelectsName(item)}}</button>
                  </template>
                  -->
                </div>
                <div v-else-if="questionType===2">
                  <ul class="ul-btnlist">
                    <li v-for="item in currSubject.selects" v-bind:key="item.id">
                        <exam-checkbox :value="item.id" :title="getSelectsName(item)" @onclick="checkboxClick"></exam-checkbox>
                    </li>
                  </ul>
                  <!--
                   <template v-for="item in currSubject.selects">
                        <exam-checkbox style="margin-left:25px;margin-bottom:20px;" :value="item.id" :title="getSelectsName(item)" @onclick="checkboxClick"></exam-checkbox>
                   </template>
                   -->
                    <div style="margin-top:60px;">
                        <button class="btn-next" @click="clickNextBtn">下一题</button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="timeupDialogShow">
            <div style="margin-left:170px;"><img src="../../../../static/images/shixun/img_q_timeup.png"/></div>
            <div style="margin-left:100px;font-size:22px;font-weight:bold;">抱歉！您的考试时间已到！</div>
            <div style="margin-top:30px;margin-left:170px;font-size:14px;color:red;">您未通过本次考试！</div>
            <div style="margin-top:30px;margin-left:130px;">
                <button class="btn-white" @click="exitExam">重新学习</button>
                <button class="btn-black" style="margin-left:30px;" @click="startExam">再次考试</button>
            </div>
       </el-dialog>
    </div>
</template>

<script>
import vPlayer from '@/components/components/VideoPlayer'
import aPlayer from '@/components/components/AudioPlayer'
import examCheckbox from '@/components/components/ExamCheckbox'
import { mapGetters } from 'vuex'
import { getFormatBySecond, equalArray } from '@/utils/index'
import { getExam, updateScore, updateTrainUnlock } from '@/http/api/shixunApi'
export default {
  name: 'exam',
  components: {
    vPlayer, aPlayer, examCheckbox
  },
  data () {
    return {
      // lessonId: 0,
      // examId: 0,
      state: 'ready',
      currScore: 0,
      time: -1,
      currInex: 0,
      selAnswer: [], // 多选题选择的答案
      content: {}
    }
  },
  created () {
    // this.lessonId = this.$route.params.id
    // this.examId = this.$route.params.examId
    this.getData()
  },
  computed: {
    ...mapGetters([
      'examId', 'cateId', 'passScore', 'score', 'unlockTrainList'
    ]),
    quesTypeName () {
      if (this.questionType === 1) {
        return '单选题'
      } else if (this.questionType === 2) {
        return '多选题'
      } else if (this.questionType === 3) {
        return '判断题'
      }
    },
    questionType () { // 1.单选  2.多选  3.判断
      if (this.currSubject.rights.length === 1) {
        if (this.currSubject.selects.length === 2) {
          return 3
        } else {
          return 1
        }
      } else {
        return 2
      }
    },
    videoSource () {
      let source = {
        type: this.currSubject.type,
        src: this.currSubject.url
      }
      return source
    },
    timeupDialogShow () {
      if (this.state === 'timeup') {
        return true
      } else {
        return false
      }
    },
    timeText () {
      if (this.time >= 0) {
        return getFormatBySecond(this.time)
      } else {
        return ''
      }
    },
    currSubject () {
      return this.content.subject[this.currInex]
    },
    isPass () {
      if (this.currScore >= this.passScore) {
        return true
      } else {
        return false
      }
    },
    isAnswerPic () { // 答案选项是否为图片
      var isPic = this.currSubject.selects[0].content.indexOf('.png') > -1 || this.currSubject.selects[0].content.indexOf('.jpg') > -1
      return isPic
    }
  },
  watch: {
    time: function (newValue) {
      if (newValue === 0 && this.state === 'testing') {
        this.state = 'timeup'
      }
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getExam(this.examId).then(response => {
          const dataw = response.content
          self.content = dataw
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getSelectsName (sel) {
      return sel.id + '.' + sel.content
    },
    startExam () {
      let self = this
      self.currInex = 0
      self.currScore = 0
      self.state = 'testing'
      if (this.content.time > -1) {
        self.resetTimer(this.content.time * 60)
      }
    },
    exitExam () {
      this.state = ''
      // this.$router.push({name: 'lesson', params: {id: this.lessonId, examId: this.examId}})
      this.$router.push({name: 'lesson'})
    },
    resetTimer (time) {
      let self = this
      self.$store.dispatch('clearTimer')
      self.time = time
      function countDown () {
        self.time--
        if (self.time <= 0) {
          self.time = 0
          self.$store.dispatch('clearTimer')
        }
      }
      self.$store.dispatch('setTimer', setInterval(countDown, 1000))
    },
    clickAnswer (msg) { // 单选题
      let self = this
      if (self.currSubject.rights[0] === msg) {
        self.currScore += self.currSubject.score
      } else {
        self.currScore -= self.currSubject.redu
        if (self.currScore < 0) self.currScore = 0
      }
      self.goNextSub()
    },
    checkboxClick (msg) { // 多选题选择答案
      let self = this
      var index = self.selAnswer.indexOf(msg)
      if (index > -1) {
        self.selAnswer.splice(index, 1)
      } else {
        self.selAnswer.push(msg)
      }
    },
    clickNextBtn () { // 多选题，下一题操作
      let self = this
      let correct = self.currSubject.rights
      if (equalArray(correct, self.selAnswer)) {
        self.currScore += self.currSubject.score
      } else {
        self.currScore -= self.currSubject.redu
        if (self.currScore < 0) self.currScore = 0
      }
      self.goNextSub()
    },
    goNextSub () { // 进入下一题
      let self = this
      self.selAnswer = []
      self.currInex++
      if (self.currInex >= self.content.subject.length) {
        self.currInex = 0
        self.state = 'finish'
        this.handleScore()
      }
    },
    handleScore () { // 答题结束，保存分数
      console.log(this.currScore)
      let self = this
      let oldScore = 0
      for (var i = 0; i < self.score.length; i++) {
        if (self.score[i].train_id === self.cateId) {
          oldScore = self.score[i].score
        }
      }
      if (self.currScore > 0) {
        var param = {
          trainid: self.cateId,
          examid: self.examId,
          score: self.currScore
        }
        if (oldScore === 0) {
          return new Promise((resolve, reject) => {
            updateScore(param).then(response => {
              self.$store.dispatch('GetScore')
              if (self.currScore >= self.passScore) {
                self.handleUnlock()
              }
            }).catch(error => {
              reject(error)
            })
          })
        } else if (oldScore > 0 && self.currScore > oldScore) {
          return new Promise((resolve, reject) => {
            updateScore(param).then(response => {
              self.$store.dispatch('GetScore')
              if (self.currScore >= self.passScore) {
                self.handleUnlock()
              }
            }).catch(error => {
              reject(error)
            })
          })
        }
      }
    },
    handleUnlock () { // 判断解锁
      let unlock = this.unlockTrainList
      for (var i = 0; i < unlock.length; i++) {
        if (this.lessonId === unlock[i]) {
          return
        }
      }
      unlock.push(this.cateId)
      var param = {
        type: 2,
        unlock: unlock
      }
      return new Promise((resolve, reject) => {
        updateTrainUnlock(param).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    videoPlayerEnd () {
    },
    audioPlayerEnd () {
    }
  }
}
</script>

<style scoped>
.exam-container {
  position: relative;
  height: 100vh;
  background-color: #ffffff;
}
.exam-box {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.content-time {
  width: 134px;
  height: 37px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35px;
  padding-top: 5px;
  background-color: #fff5ac;
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  color: #f85415;
  font-size: 18px;
  border-radius: 20px;
  text-align: center;
}
.content-title {
  margin-top: 35px;
  font-family: 'Microsoft YaHei';
  color: #333333;
  font-size: 18px;
  text-align: center;
}
.content-type-name {
  margin-top: 35px;
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  color: #333333;
  font-size: 14px;
  text-align: center;
}
.content-video {
  width: 550px;
  height: 344px;
  margin-top: 35px;
}
.content-audio {
  width: 680px;
  padding-top: 30px;
  margin-left: -50px;
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
.ul-btnlist {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.ul-btnlist li {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 20px;
  margin-left: 25px;
  display: block;
  float: left;
}
.btn1 {
  width: 270px;
  height: 80px;
  border: 2px solid #faf7de;
  border-radius: 20px;
  font-family: 'SourceSansPro-Regular';
  font-size: 18px;
  color: #333333;
  background-color: #ffffff;
  text-align: center;
  outline: none;
  box-shadow: none;
}
.btn1:hover {
  background-color: #fff5ac;
}
.btn1:active {
  background-color: #fff5ac;
  border-color: #faed8c;
  outline: none;
}
.btn-next {
  width: 114px;
  height: 34px;
  margin-left: 220px;
  border-radius: 6px;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  color: #ffffff;
  background-color: #f85415;
  outline: none;
  border: none;
  box-shadow: none;
}
.selects-img {
  width: 230px;
  height: 160px;
  border: 2px solid #faf7de;
}
.selects-img:hover {
  background-color: #fff5ac;
}
</style>
