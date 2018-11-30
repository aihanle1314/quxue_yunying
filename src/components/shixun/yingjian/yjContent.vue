<template>
  <div class="yjText-container">
    <breadcrumb :levelList="breadcrumbs"></breadcrumb>
    <div class="yjText-cont" v-html="html"></div>
  </div>
</template>

<script>
import breadcrumb from '@/components/components/Breadcrumb'
import { getYingjianMore } from '@/http/api/shixunApi'
const content = `
**this is test**

* vue
* element
* webpack

## Simplemde
`
export default {
  name: 'yjcontext',
  components: {
    breadcrumb
  },
  data () {
    return {
      contentId: 0,
      pTitle: '',
      content: content,
      html: ''
    }
  },
  created () {
    this.contentId = this.$route.params.id
    this.getData()
  },
  computed: {
    breadcrumbs () {
      let self = this
      let matched = self.$route.matched
      var bc = []
      bc.push({name: matched[0].meta.title, path: matched[0].path})
      bc.push({name: self.pTitle, path: ''})
      bc.push({name: self.$route.meta.title, path: ''})
      return bc
    }
  },
  methods: {
    getData () {
      let self = this
      return new Promise((resolve, reject) => {
        getYingjianMore(self.contentId).then(response => {
          const dataw = response.itemData
          self.content = dataw.content
          self.pTitle = dataw.title
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
.yjText-container {
  margin: 0;
  padding: 0;
  margin-top: 68px;
}
.yjText-cont {
  position: relative;
  left: 10px;
}
</style>
