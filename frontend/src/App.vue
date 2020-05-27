<template>
<a-config-provider :locale="locale">
  <div id="app">
    <header class="header">
      <div class="site-name">HouseTracker</div>
      <a-dropdown :trigger="['click']" class="dowp-down">
        <a class="ant-dropdown-link" @click="e=>e.preventDefault()">
          {{current}} <a-icon type="down"></a-icon>
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="loupan" @click="changeToLoupan">
            <router-link to="/">楼盘</router-link>
          </a-menu-item>
          <a-menu-item key="bankuai" @click="changeToBankuai">
            <router-link to="/bankuai">板块</router-link>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: "app",
  data() {
    return {
      current: '楼盘',
      locale: zhCN,
    };
  },
  methods: {
    changeToLoupan() {
      this.current = '楼盘'
    },
    changeToBankuai() {
      this.current = '板块'
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
}

.header {
  position: absolute;
  text-align: center;
  border-bottom: 1px solid;
  line-height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.content {
  position: absolute;
  top: 51px;
  width: 100%;
  bottom: 0;
}
</style>
