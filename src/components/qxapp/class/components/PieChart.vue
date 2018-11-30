<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '230px'
    },
    height: {
      type: String,
      default: '150px'
    },
    itemData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title : {
          text: this.itemData.title,
          subtext: '',
          x:'40px',
          y:'center',
          textStyle: {
            fontSize: 13,
            color: '#333', // 主标题文字颜色
            textAlign: 'center'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          data: ['80分以上', '60-80分', '60分以下']
        },
        series: [
          {
            name: this.itemData.title,
            type: 'pie',
            radius: [40, 55],
            center: ['30%', '50%'],
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            data: [
              { 
                value: this.itemData.excellent,
                name: '80分以上',
                itemStyle: {
                  normal: {
                    color: '#786bff', // 图表中各个图区域的边框线拐点颜色
                    borderColor: '#fff',
                    borderWidth: 1.5
                  }
                } 
              },
              { 
                value: this.itemData.secondary,
                name: '60-80分',
                itemStyle: {
                  normal: {
                    color: '#ff6b6b', // 图表中各个图区域的边框线拐点颜色
                    borderColor: '#fff',
                    borderWidth: 1.5
                  }
                } 
              },
              { 
                value: this.itemData.difference,
                name: '60分以下',
                itemStyle: {
                  normal: {
                    color: '#d9dbea', // 图表中各个图区域的边框线拐点颜色
                    borderColor: '#fff',
                    borderWidth: 1.5
                  }
                } 
              }
            ]
            // animationEasing: 'cubicInOut',
            // animationDuration: 600
          }
        ]
      })
    }
  }
}
</script>
