<template>
  <div class="url-list">
    <section class="add-house-btn">
      <a-button type="primary" @click="handleAdd">新增楼盘</a-button>
    </section>
    <a-table :columns="columns" :data-source="data" :loading="loading">
      <template v-slot:options="house">
        <a-button type="danger" @click="handleDelete(house)">Delete</a-button>
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
          const { data } = await axios.delete(`${window.env.apiUrl}house/${house.name}`)
          if (data.code === 0) {
            this.$message.success(data.message)
            this.getHouseData()
          } else {
            this.$message.error(data.message)
          }
        },
        onCancel() {}
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
      this.confirmLoading = true
      const { data } = await axios.post(`${window.env.apiUrl}house`, this.form);
      if (data.code === 0) {
        this.$message.success(data.message);
        this.getHouseData();
      } else {
        this.$message.error(data.message);
      }
      this.confirmLoading = false;
      this.visible = false;
    }
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
</style>