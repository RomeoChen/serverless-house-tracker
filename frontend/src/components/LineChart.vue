<template>
  <div ref="chart" id="chart"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {

    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs['chart'])
    myChart.setOption({
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '1', '2', '3','4','5','6','7','8']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320,400,500,600,700,800,900,1000,1100],
          type: 'line'
      }]
    })
  }
}
</script>

<style scoped>
#chart {
  position: absolute;
  top: 0;
  right: 0;
  /* height: 300px; */
  /* width: 100%; */
  /* padding: 20px; */
  bottom: 50px;
  left: 0;
  box-sizing: border-box;
  padding: 10px;
}
</style>