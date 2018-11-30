<template>
  <div class="my-score-item">
    <div class="title">{{itemData.title}}</div>
    <div class="score">
      {{itemData.content}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScoreCard',
  props: {
    itemData: {
      type: Object
    }
  },
  created () {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.my-score-item {
  width: 100px;
  height: 150px;
  .title {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .score {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px solid #ddd;
    text-align: center;
  }
}
</style>
