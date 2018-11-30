<template>
  <div class="app-wrapper">
    <v-head></v-head>
    <v-sidebar class="sidebar-container"></v-sidebar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import vHead from './components/Header.vue'
import vSidebar from './components/Sidebar'
import appMain from './components/AppMain.vue'

export default {
  name: 'layout',
  components: {
    vHead, vSidebar, appMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
