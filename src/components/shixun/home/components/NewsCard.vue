<template>
  <el-card shadow="never" class="box-card-component" style="margin-left:8px;">
    <div slot="header" ref="card_header" class="box-card-header">
      <img class="header-newsbg" :src="itemData.cover" />
      <img class="header-newsmore" src="../../../../../static/images/shixun/more_n.png" @click="showMore" />
    </div>
    <ul style="position:relative;" class="box-card-ul">
      <li v-for='content in itemData.conlist' class="box-card-li" v-bind:key="content.id">
        <router-link :to="{name: 'shixunhomemoreText', params: {id: content.id, pId: itemData.id, pTitle: itemData.title}}">
          <a href='' class="a-link">{{content.title}}</a>
          <span class="time">{{content.time}}</span>
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
  mounted () {
    // this.$refs.card_header.style.backgroundColor = this.itemData.background
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
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 18px;
    background-color: #68b9ff;
    color: #fff;
    font-size: 18px;
    .header-newsbg {
      position: absolute;
      width: 277px;
      height: 50px;
      top: 0;
      left: 0;
    }
    .header-newsmore {
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
      position: absolute;
      width: 20px;
      height: 20px;
      top: 16px;
      right: 12px;
    }
  }
  .box-card-ul{
    list-style: none;
    margin: 0;
    padding: 0;
    .box-card-li{
      position: relative;
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #eeeeee;
    }
    .a-link{
      position: absolute;
      left: 0;
      font-size: 12px;
      color: #333333;
      text-decoration: underline;
      &:hover {
        color: #26b4e5;
        text-decoration: underline;
      }
    }
    .time {
      position: absolute;
      right: 0;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
