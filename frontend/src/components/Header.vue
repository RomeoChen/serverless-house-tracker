<template>
<div class="header">
  <div class="logo">HouseTracker</div>
  <a-menu v-model="currentMenu" mode="horizontal">
    <a-menu-item key="house">楼盘</a-menu-item>
    <a-menu-item key="district">板块</a-menu-item>
  </a-menu>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentMenu: 'house',
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  text-align: center;
}
</style>