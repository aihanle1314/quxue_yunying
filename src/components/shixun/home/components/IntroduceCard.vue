<template>
  <el-card shadow="never" class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img class="header-bg" :src="itemData.cover" />
      <img class="header-more" src="../../../../../static/images/shixun/more_n.png" @click="showMore" />
    </div>
    <ul class="box-card-textlist">
      <li v-for='content in itemData.conlist' class="box-card-textlist" v-bind:key="content.id">
        <router-link :to="{name: 'shixunhomemoreText', params: {id: content.id, pId: itemData.id, pTitle: itemData.title}}">
          <span class="text-link">{{content.title}}</span>
          <svg-icon :icon-class="'more'" class="icon-more"></svg-icon>
        </router-link>
      </li>
    </ul>
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
  methods: {
    showMore () {
      this.$router.push({name: 'shixunhomemoreList', params: {id: this.itemData.id, title: this.itemData.title}})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  height: 269px;
  width: 277px;
  border-radius: 8px;
  .box-card-header {
    position: relative;
    height: 160px;
    top: 0;
    .header-bg {
      position: absolute;
      width: 277px;
      height: 160px;
      top: 0;
      left: 0;
    }
    .header-more {
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
      position: absolute;
      width: 20px;
      height: 20px;
      top: 16px;
      right: 16px;
    }
  }
  .box-card-textlist{
    position: relative;
    list-style: none;
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    text-align: left;
    height: 20px;
    line-height: 20px;
    .text-link{
      position: absolute;
      left: 0;
      font-size: 12px;
      color: #333333;
      text-decoration: none;
      &:hover {
        color: #26b4e5;
        text-decoration: underline;
      }
    }
    .icon-more {
      position: absolute;
      right: 0;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
