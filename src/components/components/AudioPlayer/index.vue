<template>
  <div id="container" name="container">
    <div class="control">
      <!--<img class="pre" src="../../../static/images/music_pre.png" @click="$store.commit('changeSong', 'pre')"> -->
      <img class="play" @click="playMusic" src="../../../../static/images/shixun/music_play.png" :style="{display: !play ? 'inline-block' : 'none'}">
      <img class="play" @click="pauseMusic" src="../../../../static/images/shixun/music_stop.png" :style="{display: !play ? 'none' : 'inline-block'}">
      <!--<img class="next" src="../../../static/images/music_next.png" @click="$store.commit('changeSong', 'next')">-->
    </div>
    <div class="progress">
      <span style="color:#ffffff">{{current}}</span>
      <vue-slider class="playprogress" ref="slider" v-bind="setting" style="display:inline-block;padding:15px 10px;" v-model="progress"></vue-slider>
      <span style="color:#ffffff">{{end}}</span>
      <img class="volume" src="../../../../static/images/shixun/volume.png">
      <vue-slider class="volumeprogress" ref="slider2" v-bind="setting2" style="display:inline-block;padding:15px 10px;" v-model="volume"></vue-slider>
      <audio
        @canplay="audioInit" ref="player"
        @ended="ended"
        @error="errorLoad"
        style="display:none" :src="aSources"  controls="controls"></audio>
    </div>
  </div>
</template>
<script >
import VueSlider from 'vue-slider-component'
import Vue from 'vue'

export default {
  name: 'aPlayer',
  components: {
    VueSlider
  },
  props: {
    aSources: {
      type: String
    }
  },
  data () {
    return {
      setting: {
        width: 300,
        tooltip: false,
        dotSize: 13,
        processStyle: {
          'background-color': '#777777'
        },
        min: 0,
        max: 200,
        clickable: true,
        speed: 0
      },
      progress: 0,
      setting2: {
        width: 100,
        tooltip: 'hover',
        dotSize: 10,
        clickable: true,
        processStyle: {
          'background-color': '#777777'
        },
        max: 100,
        min: 0
      },
      volume: 100,
      play: false,
      current: '00:00',
      end: '00:00',
      update: '',
      drag: false
    }
  },
  mounted: function () {
  },
  methods: {
    audioInit: function () {
      const duration = this.$refs.player.duration
      this.end = this.$options.filters.timeToStr(duration)
      this.setting.max = Number.parseInt(duration, 10)
    //   this.playMusic()
    },
    getCurrent: function () {
      if (!this.$refs.player) {
        return
      }
      const currentTime = this.$refs.player.currentTime
      this.current = this.$options.filters.timeToStr(currentTime)
      this.progress = Number.parseInt(currentTime, 10)
      if (this.current === this.end) {
        this.ended()
      }
    },
    playMusic: function () {
      if (!this.aSources) {
        return
      }
      this.update = setInterval(this.getCurrent, 1000 / 60)
      this.$refs.player.play()
      this.play = true
    },
    pauseMusic: function () {
      clearInterval(this.update)
      this.$refs.player.pause()
      this.play = false
    },
    ended: function () {
      this.pauseMusic()
      this.progress = 0
      this.$emit('aPlayerEnd')
    },
    errorLoad: function () {
      if (!this.aSources) {
        return
      }
      this.play = false
    },
    setShow: function (show) {
      this.listShow = show
    }
  },
  computed: {

  },
  watch: {
    progress: function (newValue, oldValue) {
      if (Math.abs(newValue - oldValue) > 1) {
        this.current = Vue.options.filters.timeToStr(newValue)
        this.$refs.player.currentTime = newValue
      }
    },
    volume: function (newValue) {
      this.$refs.player.volume = newValue / 100
    }
  }
}
</script>
<style scoped>
*{
  box-sizing: border-box;
}

#container{
  height: 50px;
  width: 100%;
  background-color: #333333;
  border: 1px solid rgb(225,225,226);
  padding: 5px 0px;
  padding-left: 30px;
  position: relative;
}
.pre,
.next{
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 30px;
  position: relative;
  top: -5px;
}
.play{
  width: 40px;
  height: 40px;
  border: 40px;
  cursor: pointer;
  margin: 0 15px;
}
.control,
.progress{
  display: block;
  float: left;
  height: 100%;
  line-height: 50px;
  margin-left: 20px;
}
.progress span{
  position: relative;
  top: -10px;
}
.volume{
  width: 20px;
  height: 20px;
  opacity: 0.5;
  position: relative;
  top:-8px;
  left: 5px;
}
</style>
<style>
 .vue-slider-dot{
  background: url('../../../../static/images/shixun/point.png') no-repeat;
  box-shadow: none;
  border-radius: 0;
  position: relative;
}
.playprogress .vue-slider-dot{
  background-size: 5px 5px;
  background-position: 4px;
}
.volumeprogress .vue-slider-dot{
  background-size: 4px 4px;
  background-position: 3px;
}
</style>
