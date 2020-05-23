<template>
  <div class="url-list">
    <section class="add-house-btn">
      <a-button type="primary" @click="handleAdd">新增楼盘</a-button>
    </section>
    <a-table :columns="columns" :data-source="data" :loading="loading">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`搜索 ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          搜索
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          重置
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template v-slot:options="house">
        <a-button type="danger" @click="handleDelete(house)">删除</a-button>
      </template>
    </a-table>
    <a-modal v-model="visible" title="新增楼盘" @ok="handleAddOk" :confirm-loading="confirmLoading">
      <a-form-model>
        <a-form-model-item>
          <a-input v-model="form.name" placeholder="楼盘名称"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="form.url" placeholder="楼盘链接"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: '楼盘名称',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
      record.name
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
  }, {
    dataIndex: 'url',
    key: 'url',
    title: '网址',
    ellipsis: true,
  }, {
    key: 'options',
    title: '操作',
    scopedSlots: {customRender: 'options'},
  }
]

export default {
  data() {
    return {
      columns,
      data: [],
      visible: false,
      form: {
        name: '',
        url: '',
      },
      loading: false,
      confirmLoading: false,
      searchText: '',
    }
  },
  methods: {
    async getHouseData() {
      this.loading = true;
      const { data }=await axios.get(`${window.env.apiUrl}house`);
      if (data.code !== 0) {
        this.data = [];
      } else {
        this.data = data.data || [];
        this.data = this.data.map(item => { item.key = item.id + ''; return item })
      }
      this.loading = false;
    },
    formCheck() {
      if (this.form.name.trim() === '') {
        return false;
      }
      if (this.form.url.trim() === '') {
        return false;
      }
      return true;
    },
    handleDelete(house) {
      this.$confirm({
        title: '确定删除？',
        content: '确定要删除吗？',
        onOk: async () => {
          try {
            const { data } = await axios.delete(`${window.env.apiUrl}house/${house.id}`)
            if (data.code === 0) {
              this.$message.success(data.message)
              this.getHouseData()
            } else {
              throw new Error(data.message)
            }
          } catch (error) {
            this.$message.error(error.message)
          } 
        },
        onCancel: () => {}
      })
    },
    handleAdd() {
      this.visible = true;
    },
    async handleAddOk() {
      if (!this.formCheck()) {
        this.$message.error(`不能为空`)
        return;
      }
      this.confirmLoading = true;
      try {
        const { data } = await axios.post(`${window.env.apiUrl}house`, this.form);
        if (data.code === 0) {
          this.$message.success(data.message);
          this.form = {
            name: '',
            url: '',
          }
          this.getHouseData();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.confirmLoading = false;
        this.visible = false;
      }
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
  },
  mounted() {
    this.getHouseData();
  }
}
</script>

<style scoped>
.url-list {
  margin-top: 10px;
}
.add-house-btn {
  margin: 10px;
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0;
}
</style>