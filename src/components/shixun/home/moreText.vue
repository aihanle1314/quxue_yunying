<template>
  <div class="moreText-container">
    <breadcrumb :levelList="breadcrumbs"></breadcrumb>
    <div class="moreText-cont" v-html="html"></div>
  </div>
</template>

<script>
import breadcrumb from '@/components/components/Breadcrumb'
import { getHomeMoreText } from '@/http/api/shixunApi'
const content = `
**this is test**

* vue
* element
* webpack

## Simplemde
`
export default {
  name: 'moretext',
  components: {
    breadcrumb
  },
  data () {
    return {
      contentId: 0,
      pRouteId: 0,
      pRouteTitle: '',
      content: content,
      html: ''
    }
  },
  created () {
    this.contentId = this.$route.params.id
    this.pRouteId = this.$route.params.pId
    this.pRouteTitle = this.$route.params.pTitle
    window.localStorage.setItem('shixunhometitle', this.pRouteTitle)
    this.getData()
  },
  computed: {
    breadcrumbs () {
      let self = this
      let matched = self.$route.matched
      var bc = []
      bc.push({name: matched[0].meta.title, path: matched[0].path})
      bc.push({name: self.pRouteTitle, path: '/shixun/home/morelist/' + self.pRouteId})
      bc.push({name: self.$route.meta.title, path: ''})
      return bc
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getHomeMoreText(self.contentId).then(response => {
          const dataw = response.itemData
          self.content = dataw.content
          self.markdown2Html()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    markdown2Html () {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.content)
      })
    }
  }
}
</script>
<style scoped>
.moreText-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.moreText-cont {
  position: relative;
  left: 10px;
}
</style>
