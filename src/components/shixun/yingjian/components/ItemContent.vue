<template>
  <div class="yjitembox-card-component" style="margin-left:0;">
      <div class="yjitembox-title-wrapper">
          <router-link :to="{name: 'shixunyjmoreText', params: {id: itemData.id}}">
             <a href='' class="a-link">{{itemData.title}}</a>
          </router-link>
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
.yjitembox-card-component {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.yjitembox-title-wrapper {
  float: left;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #666666;
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
