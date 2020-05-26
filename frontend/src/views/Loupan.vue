<template>
  <div class="loupan-container">
    <a-menu mode="horizontal" :default-selected-keys="['search']">
      <a-menu-item key="search">
        <router-link to="/">楼盘趋势</router-link>
      </a-menu-item>
      <a-menu-item key="linkList">
        <router-link to="/link-list">楼盘链接</router-link>
      </a-menu-item>
      <a-menu-item key="sort">
        <router-link to="/sort">楼盘变化率</router-link>
      </a-menu-item>
    </a-menu>
    <div class="loupan-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$store.dispatch('getUrlList');
  }
}
</script>

<style scoped>
.loupan-container {
  width: 100%;
  position: relative;
  height: 100%;
}

.loupan-content {
  position: absolute;
  top: 50px;
  bottom: 0;
  width: 100%;
}
</style>