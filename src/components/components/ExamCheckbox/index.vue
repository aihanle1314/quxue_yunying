<template>
    <button ref="btn" class="container" @click="btnclick">{{title}}</button>
</template>
<script>

export default {
  name: 'examCheckbox',
  props: {
    value: {
      type: String
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      isClick: false
    }
  },
  watch: {
    isClick: 'setColor',
    title: 'resetClick'
  },
  computed: {
    backColor () {
      if (!this.isClick) {
        return '#ffffff'
      } else {
        return '#fff5ac'
      }
    },
    borderColor () {
      if (!this.isClick) {
        return '#faf7de'
      } else {
        return '#faed8c'
      }
    }
  },
  methods: {
    btnclick () {
      this.isClick = !this.isClick
      this.$emit('onclick', this.value)
    },
    setColor () {
      this.$refs.btn.style.backgroundColor = this.backColor
      this.$refs.btn.style.borderColor = this.borderColor
    },
    resetClick () {
      this.isClick = false
    }
  }
}
</script>
<style scope>
.container {
  width: 270px;
  height: 80px;
  border: 2px solid #faf7de;
  border-radius: 20px;
  font-family: 'SourceSansPro-Regular';
  font-size: 18px;
  color: #333333;
  background-color: #ffffff;
  text-align: center;
  outline:none;
  box-shadow: none;
}
.container:hover {
  background-color: #fff5ac;
}
</style>
