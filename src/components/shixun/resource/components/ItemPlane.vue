<template>
  <div class="plane-card-component" style="margin-left:28px;">
      <div class="plane-icon-wrapper">
         <img :src="itemData.small" @mouseover="showOperate" />
      </div>
      <div class="plane-title-wrapper">
         {{itemData.title}}
      </div>
      <div class="plane-operate" id="operate" v-show="isShowOperate" @mouseleave="closeOperate">
        <div><img src="../../../../../static/images/shixun/icon_view_n.png" @click="togglePreview" /></div>
        <div><a :href="itemData.download" download="" target="_blank"><img src="../../../../../static/images/shixun/icon_download_n.png"/></a></div>
      </div>
      <el-dialog :visible.sync="showPreview" center width="70%">
        <img :src="itemData.preview"/>
      </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    itemData: {
      type: Object
    }
  },
  data () {
    return {
      isShowOperate: false,
      showPreview: false
    }
  },
  create () {

  },
  computed: {

  },
  methods: {
    showOperate () {
      this.isShowOperate = true
    },
    closeOperate () {
      this.isShowOperate = false
    },
    togglePreview () {
      this.showPreview = true
    }
  }
}
</script>

<style scoped>
.plane-card-component {
  width: 136px;
  height: 185px;
  border: 2px solid #f8f8f8;
  position: relative;
  overflow: hidden;
}
.plane-icon-wrapper {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 117px;
  height: 120px;
  box-shadow: 2px 2px 10px #d1d1d1;
  margin-left: 5px;
  z-index: 1;
}
.plane-icon-wrapper img {
  width: 117px;
  height: 120px;
}
.plane-title-wrapper {
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #333333;
  bottom: 0;
  z-index: 1;
}
.plane-operate {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #cdeff9;
  opacity: 0.75;
  z-index: 20;
}
#operate img {
  width: 44px;
  margin-left: 45px;
  margin-top: 30px;
}
</style>
