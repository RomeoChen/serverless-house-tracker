<template>
<div class="search-container">
  <a-input-search placeholder="搜索楼盘" style="width: 100%" v-model="searchText" @search="onSearch" class="search-input"/>
  <div ref="chart" id="chart"></div>
</div>
</template>

<script>
import echarts from 'echarts';

export default {
  data: function() {
    return {
      searchText: '',
    }
  },
  methods: {
    onSearch() {
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
      }],
      dataZoom: [{type: 'inside'}]
    })
    window.addEventListener('resize', function() {
      myChart.resize();
    })
  }
}
</script>

<style scoped>
.search-container {
  position: relative;
  height: 100%;
}

.search-input {
  margin-top: 10px;
}

#chart {
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 0;
}
</style>