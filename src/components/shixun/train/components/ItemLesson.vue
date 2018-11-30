<template>
  <div class="box-card-component" style="margin-left:0;">
      <div class="box-title-wrapper">
          <router-link :to="{ name: 'lessonDetail', params: { id: itemData.id } }">
             <a href='' class="a-link">{{itemData.title}}</a>
          </router-link>
      </div>
      <div v-if="itemData.learned" class="box-date-wrapper" style="color:#333333;">
         已学完
      </div>
       <div v-else class="box-date-wrapper" style="color:#df3826;">
         未学完
      </div>
      <div class="box-date-wrapper">
         {{ itemData.date }}
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
      return '../../../../../static/images/shixun/lesson_lock_open.png'
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
.box-title-wrapper {
  float: left;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #666666;
}
.box-date-wrapper {
  float: right;
  margin-left: 10px;
  padding: 0;
  font-size: 14px;
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
