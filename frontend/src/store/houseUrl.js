import axios from 'axios'
import { message } from "ant-design-vue";

/**
 * house: {id, name, url}
 */

export default {
  state: () => ({
    houseList: [],
    loading: false,
  }),
  mutations: {
    changeUrl(state, newList) {
      state.houseList = newList;
    },
    changeLoading(state, status) {
      state.loading = status;
    },
  },
  actions: {
    /* eslint-disable-next-line */
    async getUrlList({ state, commit }) {
      commit('changeLoading', true);
      try {
        const { data } = await axios.get(`${window.env.apiUrl}house`);
        if (data.code === 0) {
          const newList = (data.data || []).map(item => { item.key = item.id + ''; return item })
          commit('changeUrl', newList);
        }
      } catch (error) {
        message.error(error.messsage);
      }
      commit('changeLoading', false);
    },
  },
  getters: {
    nameList(state) {
      const nameList = [];
      for (const url of state.houseList) {
        nameList.push(url.name);
      }
      return nameList;
    },
    getHouseByName: (state) => (name) => {
      return state.houseList.find(house => house.name === name);
    },
    getHouseNameById: (state) => (id) => {
      const house = state.houseList.find(house => house.id === id);
      return house.name;
    }
  },
}