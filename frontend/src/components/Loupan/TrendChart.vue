<template>
<div class="search-container">
  <a-auto-complete 
    :value="searchText"
    style="width: 100%" 
    :dataSource="filteredNameList" 
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
import { convertDate } from '../../utils.js';

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
    filteredNameList() {
      return this.nameList.filter(v => v.includes(this.searchText));
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
        const { data } = await axios.get(`${window.env.apiUrl}count/id=${this.houseId}`);
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
      if (data.length === 0) {
        this.$message.info('没有数据');
      }
      const xAxisData = [], seriesData = [];
      for (const item of data) {
        xAxisData.push(convertDate(item.c_date));
        seriesData.push(item.c_num);
      }
      return [xAxisData, seriesData];
    },
    draw() {
      this.myChart.setOption({
        title: {
          text: '楼盘在售数量趋势图',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          name: '日期（年月日）',
          type: 'category',
          data: this.xAxisData,
        },
        yAxis: {
          name: '数量（套）',
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