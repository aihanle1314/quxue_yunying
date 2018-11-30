<template>
  <div class="lessonDetail-container">
      <breadcrumb :levelList="breadcrumbs"></breadcrumb>
      <div class="lessonDetail-box">
         <div class="box-title">
            <el-row>
              <el-col :span="1" v-if="itemData.preId!==-1"><div style="margin-left:20px;"><img src="../../../../static/images/shixun/lesson_page_previous_h.png" @click="toPreLesson"/></div></el-col>
              <el-col :span="1" v-else><div style="margin-left:20px;"><img src="../../../../static/images/shixun/lesson_page_previous_n.png"/></div></el-col>
              <el-col :span="2" v-if="itemData.preId!==-1"><div style="padding-top:8px;padding-left:10px;color:#38454a;font-size:14px;">上一篇</div></el-col>
              <el-col :span="2" v-else><div style="padding-top:8px;padding-left:10px;color:#999999;font-size:14px;">上一篇</div></el-col>
              <el-col :span="18"><div style="color:#333333;font-size:22px;text-align:center;">{{itemData.title}}</div></el-col>
              <el-col :span="2" v-if="itemData.nextId!==-1"><div style="color:#38454a;font-size:14px;padding-top:8px;text-align:right;padding-right:10px">下一篇</div></el-col>
              <el-col :span="2" v-else><div style="color:#999999;font-size:14px;padding-top:8px;text-align:right;padding-right:10px">下一篇</div></el-col>
              <el-col :span="1" v-if="itemData.nextId!==-1"><img src="../../../../static/images/shixun/lesson_page_next_h.png" @click="toNextLesson"/></el-col>
              <el-col :span="1" v-else><img src="../../../../static/images/shixun/lesson_page_next_n.png"/></el-col>
            </el-row>
         </div>
          <div class="box-video" v-if="itemData.mode==='video'">
            <v-player :vSources="videoSource"  @vPlayerEnd="videoPlayerEnd"></v-player>
          </div>
          <div class="box-audio" v-else-if="itemData.mode==='audio'">
             <a-player :aSources="itemData.url"  @aPlayerEnd="audioPlayerEnd"></a-player>
          </div>
          <div class="box-img" v-else-if="itemData.mode==='image'">
             <img :src="itemData.url" />
          </div>
          <div class="box-text">
              {{itemData.text}}
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import breadcrumb from '@/components/components/Breadcrumb'
import { getLessDetail, updateLearn } from '@/http/api/shixunApi'
import vPlayer from '@/components/components/VideoPlayer'
import aPlayer from '@/components/components/AudioPlayer'

export default {
  name: 'lessonDetail',
  components: {
    vPlayer, aPlayer, breadcrumb
  },
  data () {
    return {
      itemData: {}
    }
  },
  created () {
    // this.$message.success('获取课程详情id:' + this.$route.params.id)
    this.getData(this.$route.params.id)
  },
  computed: {
    ...mapGetters([
      'currRoute', 'cateId'
    ]),
    videoSource () {
      var source = {
        type: this.itemData.type,
        src: this.itemData.url
      }
      return source
    },
    breadcrumbs () {
      var bc = []
      for (var i = 0; i < this.currRoute.length; i++) {
        if (i === this.currRoute.length - 2 || i === this.currRoute.length - 1) {
          bc.push({name: this.currRoute[i].meta.title, path: this.currRoute[i].path})
        } else {
          bc.push({name: this.currRoute[i].meta.title, path: ''})
        }
      }
      bc.push({name: this.$route.meta.title, path: this.$route.path})
      return bc
    }
  },
  methods: {
    getData (id) {
      let self = this
      return new Promise((resolve, reject) => {
        getLessDetail(id).then(response => {
          const dataw = response.itemData
          self.itemData = dataw
          if (response.itemData.mode !== 'audio' && response.itemData.mode !== 'video') {
            if (!this.itemData.learned) {
              self.handleLearn()
            }
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleLearn () {
      let self = this
      var param = {
        cid: self.cateId,
        lessonId: self.itemData.id,
        isStudy: true
      }
      return new Promise((resolve, reject) => {
        updateLearn(param).then(response => {
          // const dataw = response.itemData
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    videoPlayerEnd () {
      if (!this.itemData.learned) {
        this.handleLearn()
      }
      console.log('player end!')
    },
    audioPlayerEnd () {
      if (!this.itemData.learned) {
        this.handleLearn()
      }
      // console.log('player end!')
    },
    toPreLesson () {
      this.getData(this.itemData.preId)
    },
    toNextLesson () {
      this.getData(this.itemData.nextId)
    }
  }
}
</script>

<style scoped>
.lessonDetail-container {
  margin: 0;
  margin-top: 68px;
  padding: 0;
}
.lessonDetail-box {
  width: 1132px;
  margin-left: 10px;
  margin-top: 10px;
  border: 1px solid #f8f8f8f8;
  border-radius: 6px;
}
.box-title {
  padding-top: 20px;
  height: 80px;
  min-width: 100%;
}
.box-video {
  width: 640px;
  height: 398px;
  padding-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
.box-audio {
  width: 680px;
  padding-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
.box-img {
  width: 400px;
  padding-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
.box-text {
  padding: 40px;
  font-size: 14px;
  color: #333333;
}
</style>
