<template>
  <div>
    <SearchBar class="search-bar" />
    <DatePicker class="date-picker" />
    <Table />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import DatePicker from '../components/DatePicker';
import Table from '../components/Table';

export default {
  components: {
    SearchBar,
    DatePicker,
    Table,
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>