<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <template v-slot:rate="{startCount, endCount}">
        <span>{{calcRate(startCount, endCount)}}%</span>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: '楼盘名',
    width: '40%',
  }, {
    dataIndex: 'startCount',
    key: 'startCount',
    title: '起始'
  }, {
    dataIndex: 'endCount',
    key: 'endCount',
    title: '截止'
  }, {
    // dataIndex: 'rate',
    key: 'rate',
    title: '变化率',
    scopedSlots: { customRender: 'rate' },
  }
]

const data = [
  {
    name: '楼盘1',
    startCount: 559,
    endCount: 690,
  }
]

for (let i = 1; i < 20; i++) {
  data[i] = data[0]
}

export default {
  data() {
    return {
      columns,
      data,
    }
  },
  methods: {
    calcRate(startCount, endCount) {
      if (startCount && endCount) {
        const result = ((endCount - startCount) / startCount) * 100;
        return result.toFixed(2);
      } else {
        return '-'
      }
    }
  }
}
</script>