<template>
<div>
  <a-input-search placeholder="搜索楼盘" style="width: 200px" v-model="searchText" @search="onSearch" />
</div>
</template>

<script>
// import { Button } from "ant-design-vue";

export default {
  name: 'search-bar',
  components: {
    // Button
  },
  data: function() {
    return {
      searchText: '',
    }
  },
  methods: {
    onSearch() {
      // console.log('search for ', this.searchText) 
    }
  }
}
</script>

<style scoped>

</style>