<template>
<div>
  <div class="range-btn">
    <a-range-picker 
      @change="onChangeDate"
      :disabled-date="disabledDate"
    />
    <a-button @click="onSearch">搜索</a-button>
  </div>
  <a-table :columns="columns" :data-source="data" :loading="loading">
    <template v-slot:name="{id, name}">
      <router-link :to="{name: 'chart', params: {houseId: id}}">
        <span>{{name}}</span>
      </router-link>
    </template>
    <template v-slot:rate="{startCount, endCount}">
      <span>{{calcRate(startCount, endCount)}}%</span>
    </template>
  </a-table>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

function calcRate(startCount, endCount) {
  if (startCount && endCount) {
    const result = ((endCount - startCount) / startCount) * 100;
    return result.toFixed(2);
  } else {
    return '-'
  }
}

const columns = [
  {
    key: 'name',
    title: '楼盘名',
    width: '40%',
    scopedSlots: {customRender: 'name'},
  }, {
    dataIndex: 'startCount',
    key: 'startCount',
    title: '起始'
  }, {
    dataIndex: 'endCount',
    key: 'endCount',
    title: '截止'
  }, {
    key: 'rate',
    title: '变化率',
    scopedSlots: { customRender: 'rate' },
    defaultSortOrder: 'descend',
    sorter: (a, b) => {
      const rateA = calcRate(a.startCount, a.endCount);
      const rateB = calcRate(b.startCount, b.endCount);
      if (rateA === '-') {
        return -1;
      } else if (rateB === '-') {
        return 1;
      } else {
        return rateA - rateB;
      }
    },
  }
]

export default {
  data() {
    return {
      columns,
      data: [],
      dateValue: [],
      startData: [],
      endData: [],
      loading: false,
    }
  },
  methods: {
    calcRate,
    onChangeDate(date, dateString) {
      this.dateValue = dateString;
    },
    disabledDate(current) {
      return current && current > moment().endOf('day');
    },
    findNameById(id) {
      return this.$store.getters.getHouseNameById(id);
    },
    handleData(startData, endData) {
      const result = [];
      let i = 1;
      for (const item of startData) {
        const {house_id, c_num} = item;
        const houseName = this.findNameById(house_id);
        result.push({
          id: house_id,
          startCount: c_num,
          key: i++,
          name: houseName,
        })
      }
      for (const item of endData) {
        const {house_id, c_num} = item;
        let exist;
        if (!(exist = result.find(a => a.id === house_id))) {
          const houseName = this.findNameById(house_id);
          result.push({
            id: house_id,
            endCount: c_num,
            key: i++,
            name: houseName,
          })
        } else {
          exist.endCount = c_num;
        }
      }
      return result;
    },
    async onSearch() {
      this.loading = true;
      try {
        const [startDate, endDate] = this.dateValue;
        const { data: startData } = await axios.get(`${window.env.apiUrl}count/date=${startDate}`);
        const { data: endData } = await axios.get(`${window.env.apiUrl}count/date=${endDate}`);
        this.data = this.handleData(startData.data, endData.data);
      } catch (error) {
        this.$message.error(error.message);
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.range-btn {
  display: flex;
}
</style>