<template>
  <div id="app" class="container">
    <header class="header">
      <div class="logo">HouseTracker</div>
      <a-menu 
        mode="horizontal" 
        v-model="current"
      >
        <a-menu-item key="house">楼盘</a-menu-item>
        <a-menu-item key="district">板块</a-menu-item>
      </a-menu>
    </header>
    <Loupan v-show="current[0] === 'house'" />
    <Bankuai v-show="current[0] === 'district'" />
  </div>
</template>

<script>
import Loupan from './views/Loupan';
import Bankuai from './views/Bankuai'

export default {
  name: "app",
  components: {
    Loupan,
    Bankuai,
  },
  data() {
    return {
      current: ['house']
    };
  },
};
</script>

<style>
.container {
  text-align: center;
  padding: 10px;
}

.header {
  position: relative;
  text-align: center;
}

.search-bar {
  margin: 10px;
}
</style>
