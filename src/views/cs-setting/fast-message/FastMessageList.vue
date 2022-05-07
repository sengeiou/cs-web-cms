<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="快捷消息列表">
      <template v-slot:filter>
        <el-input v-model="form.filter.title" placeholder="標題" style="width: 200px;" />
        <el-input v-model="form.filter.content" placeholder="內容" style="width: 200px;" />
        <el-button icon="el-icon-search" type="primary" @click="fetchData">搜尋</el-button>
        <el-button icon="el-icon-circle-close" @click="handleClear">清除</el-button>
      </template>
      <template v-slot:action>
        <el-button type="primary" icon="el-icon-plus" @click="openDialogAdd">新增</el-button>
        <el-button type="warning" icon="el-icon-collection-tag" @click="openAddCategoryDialog">分類</el-button>
      </template>
      <template v-slot:body>
        <AppTable
            :table-data="tableData"
            :table-columns="tableColumns"
            :show-operation="true"
            :handle-edit="openDialogEdit"
            :handle-delete="handleDelete"
        />
        <AppPagination
            :data="form.pagination"
            @change="handleChange"
        />
      </template>
    </AppPanel>
    <AddCategoryDialog ref="AddCategoryDialog" @flush-parent="flushTable" />
    <AddFastMessageDialog ref="AddFastMessageDialog" @flush-parent="flushTable" />
    <EditFastMessageDialog ref="EditFastMessageDialog" @flush-parent="flushTable" />
  </div>
</template>

<script>
import AddFastMessageDialog from '@/views/cs-setting/fast-message/components/AddFastMessageDialog'
import EditFastMessageDialog from '@/views/cs-setting/fast-message/components/EditFastMessageDialog'
import {apiDeleteFastMessage, apiGetFastMessageList} from "@/api/fast-message";
import AddCategoryDialog from "@/views/cs-setting/fast-message/components/AddCategoryDialog";
import AppTable from "@/components/AppTable";
import AppPagination from "@/components/AppPagination";
import AppPanel from "@/components/AppPanel";

export default {
  name: 'FastMessageList',
  components: {
    AppPanel,
    AppTable,
    AppPagination,
    AddFastMessageDialog,
    EditFastMessageDialog,
    AddCategoryDialog,
  },
  data() {
    return {
      loading: false,
      initFilter: {
        title: '',
        content: '',
        status: "All",
      },
      form: {
        filter: {
          title: '',
          content: '',
          status: "All",
        },
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
        }
      },
      tableData: [],
      tableColumns: [
        { prop: 'id', label: '編號', width: 100 },
        { prop: 'category', label: '分類', width: 130 },
        { prop: 'title', label: '標題', width: 130 },
        { prop: 'content', label: '內容' },
        {
          prop: 'status',
          label: '狀態',
          render: (h, scope) => {
            switch (scope.row.status) {
              case 'Disabled':
                return <el-tag effect="dark" type="danger">禁用</el-tag>
              case 'Enabled':
                return <el-tag effect="dark" type="success">啟用</el-tag>
            }
          }
        },
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    flushTable() {
      this.fetchData()
    },
    openDialogAdd() {
      this.$refs.AddFastMessageDialog.show()
    },
    openAddCategoryDialog() {
      this.$refs.AddCategoryDialog.show()
    },
    openDialogEdit(id) {
      this.$refs.EditFastMessageDialog.show(id)
    },
    async fetchData() {
      try {
        this.loading = true
        delete this.form.pagination.total
        const { data } = await apiGetFastMessageList(this.form)
        this.tableData = data.listFastMessage.fastMessages
        this.form.pagination = data.listFastMessage.pagination
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    handleChange(payload) {
      this.form.pagination = { ...payload }
      this.fetchData()
    },
    async handleDelete(id) {
      try {
        await this.$confirmDelete()
        this.loading = true
        await apiDeleteFastMessage({ input: id })
        this.$showSuccessMessage("刪除成功")
        await this.fetchData()
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    handleClear() {
      this.form.filter = { ...this.initFilter }
    },
  },
}
</script>
