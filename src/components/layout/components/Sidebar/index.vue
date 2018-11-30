<template>
  <scroll-bar>
    <el-menu mode="vertical" :collapse="isCollapse"
      background-color="#20232a" text-color="#747c8d" active-text-color="#ffffff">
      <!--<sidebar-item :routes="routes" class="nest-menu"></sidebar-item>-->
      <sidebar-item :routes="permission_routers" class="nest-menu"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers'
    ]),
    routes () {
      return this.$router.options.routes
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key + '--' + keyPath)
    }
  }
}
</script>
