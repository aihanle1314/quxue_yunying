<template>
  <div class="newsbox-card-component" style="margin-left:0;">
      <div class="newsbox-title-wrapper">
          <router-link :to="{name: 'shixunhomemoreText', params: {id: itemData.id, pId: pId, pTitle: pTitle}}">
             <a href='' class="a-link">{{itemData.title}}</a>
          </router-link>
      </div>
      <div class="newsbox-date-wrapper">
         {{ itemData.date }}
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pId: {
      type: Number
    },
    pTitle: {
      type: String
    },
    itemData: {
      type: Object
    }
  }
}
</script>

<style scoped>
.newsbox-card-component {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.newsbox-title-wrapper {
  float: left;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #666666;
}
.newsbox-date-wrapper {
  float: right;
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #999999;
}
.a-link {
  color: #26b4e5;
  text-decoration: underline;
}
.a-link:hover {
  color: #26b4e5;
  text-decoration: underline;
}
</style>
