<template>
  <div class="box-card-component" style="margin-left:0;">
      <div class="box-icon-wrapper">
         <img :src="iconRes" />
      </div>
      <div class="box-title-wrapper">
         {{itemData.title}}
      </div>
      <div class="box-download-wrapper">
         <a :href="itemData.download" download="" target="_blank"><img src="../../../../../static/images/shixun/btn_download_n.png"/></a>
      </div>
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
  computed: {
    iconRes () {
      switch (this.itemData.type) {
        case 'ppt':
          return '../../../../../static/images/shixun/res_ppt.png'
        case 'vedio':
          return '../../../../../static/images/shixun/res_vedio.png'
        case 'pic':
          return '../../../../../static/images/shixun/res_picture.png'
        case 'word':
          return '../../../../../static/images/shixun/res_word.png'
      }
    }
  }
}
</script>

<style scoped>
.box-card-component {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.box-icon-wrapper {
  float: left;
  margin: 0;
  padding: 0;
}
.box-title-wrapper {
  float: left;
  margin: 0;
  padding: 0;
  padding-left: 15px;
  padding-top: 10px;
  font-size: 14px;
  color: #666666;
}
.box-download-wrapper {
  float: right;
  margin: 0;
  padding: 0;
  padding-top: 8px;
  padding-right: 30px;
}
a {
  background-repeat: no-repeat;
}
a:hover {
  filter: contrast(150%);
}
</style>
