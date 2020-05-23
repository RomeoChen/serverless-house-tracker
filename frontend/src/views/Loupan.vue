<template>
  <div class="loupan-container">
    <SearchBar class="search-bar" />
    <DatePicker class="date-picker" />
    <CountTable />
    <LineChart />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import DatePicker from '../components/DatePicker';
import CountTable from '../components/CountTable';
import LineChart from '../components/LineChart'

export default {
  components: {
    SearchBar,
    DatePicker,
    CountTable,
    LineChart,
  },
  data() {
    return {
      showChart: false,
    }
  }
}
</script>

<style>
.loupan-container {
  position: absolute;
  width: 100%;
}


.date-picker, .search-bar {
  margin: 10px;
}
</style>