<template>
<div>
  <a-input-search placeholder="搜索楼盘" style="width: 100%" v-model="searchText" @search="onSearch" />
</div>
</template>

<script>

export default {
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