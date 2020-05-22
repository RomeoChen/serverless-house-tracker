<template>
  <div id="app" class="container">
    <header class="header">
      <div class="logo">HouseTracker</div>
      <a-menu 
        mode="horizontal" 
        v-model="current"
      >
        <a-menu-item key="url">楼盘链接</a-menu-item>
        <a-menu-item key="house">楼盘变化率</a-menu-item>
        <a-menu-item key="district">板块</a-menu-item>
      </a-menu>
    </header>
    <UrlList v-show="current[0] === 'url'" />
    <Loupan v-show="current[0] === 'house'" />
    <Bankuai v-show="current[0] === 'district'" />
  </div>
</template>

<script>
import Loupan from './views/Loupan';
import Bankuai from './views/Bankuai'
import UrlList from './views/UrlList'

export default {
  name: "app",
  components: {
    Loupan,
    Bankuai,
    UrlList,
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
