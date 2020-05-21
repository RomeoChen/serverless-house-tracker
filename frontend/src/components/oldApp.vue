<template>
  <div id="app" class="container">
    <Header />
    <SearchBar class="search-bar" />
    <DatePicker class="date-picker" />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header"
import DatePicker from './components/DatePicker'
import Table from './components/Table';

export default {
  name: "app",
  components: {
    SearchBar,
    Header,
    DatePicker,
  },
  data: function() {
    return {
      loading: false,
      message: "Click me!",
      isVisible: true,
      userList: []
    };
  },
  methods: {
    async queryServer() {
      const response = await fetch(window.env.apiUrl);
      const result = await response.json();
      this.message = result.message;
    },

    // get user list
    async getUsers() {
      this.loading = true;
      const { data } = await axios.get(`${window.env.apiUrl}user`);

      if (data.code !== 0) {
        this.userList = [];
      } else {
        this.userList = data.data || [];
      }
      this.loading = false;
    },

    formCheck(data) {
      if (!data.name) {
        alert("Please input name");
        return false;
      }
      if (!data.email) {
        alert("Please input email");
        return false;
      }
      if (!data.site) {
        alert("Please input site");
        return false;
      }
      return true;
    },

    // add a user
    async addUser(formData) {
      if (!this.formCheck(formData)) {
        return;
      }
      this.loading = true;
      const { data } = await axios.post(`${window.env.apiUrl}user`, formData);
      if (data.code !== 0) {
        alert(data.message);
      } else {
        this.getUsers();
      }
      this.loading = false;
    },

    async deleteUser(name) {
      const { data } = await axios.delete(`${window.env.apiUrl}user/${name}`);
      if (data.code !== 0) {
        alert(data.message);
      } else {
        this.getUsers();
      }
    }
  },
  mounted() {
    // get user list after ui mounted
    this.getUsers();
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  text-align: center;
  padding: 10px;
}

.search-bar {
  margin: 10px;
}

</style>
