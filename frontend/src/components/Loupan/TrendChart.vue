<template>
<div class="search-container">
  <a-auto-complete 
    :value="searchText"
    style="width: 100%" 
    :dataSource="nameList" 
    placeholder="搜索楼盘"
    @select="onSearch"
    @change="onChange"
    class="search-input"
  />
  <div ref="chart" id="chart"></div>
</div>
</template>

<script>
/* eslint-disable */
import echarts from 'echarts';
import axios from 'axios';

export default {
  data: function() {
    return {
      searchText: '',
      loading: false,
      xAxisData: [],
      seriesData: [],
      myChart: null,
    }
  },
  computed: {
    nameList() {
      return this.$store.getters.nameList;
    },
    houseId() {
      const house = this.$store.getters.getHouseByName(this.searchText);
      return house ? house.id : undefined;
    }
  },
  methods: {
    async onSearch(searchText) {
      if (searchText === '') {
        this.$message.error('请输入楼盘名称再搜索');
        return;
      }
      if (!this.houseId) {
        this.$message.error('楼盘不存在');
        return;
      }
      this.loading = true;
      try {
        const { data } = await axios.get(`${window.env.apiUrl}count?id=${this.houseId}`);
        if (data.code === 0) {
          const [xAxisData, seriesData] = this.handleData(data.data);
          this.xAxisData = xAxisData;
          this.seriesData = seriesData;
          this.draw();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false;
      }
    },
    onChange(value) {
      this.searchText = value;
    },
    handleData(data) {
      const xAxisData = [], seriesData = [];
      for (const item of data) {
        xAxisData.push(item.c_date);
        seriesData.push(item.c_num);
      }
      return [xAxisData, seriesData];
    },
    draw() {
      this.myChart.setOption({
        xAxis: {
            type: 'category',
            data: this.xAxisData,
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.seriesData,
            type: 'line'
        }],
        dataZoom: [{type: 'inside'}]
      })
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs['chart']);
    this.myChart = myChart;
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