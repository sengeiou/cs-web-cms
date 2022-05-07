<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="標籤列表">
      <template v-slot:filter>
        <el-input v-model="form.filter.name" placeholder="名稱" style="width: 200px;" />
        <el-button icon="el-icon-search" type="primary" @click="fetchData">搜尋</el-button>
        <el-button icon="el-icon-circle-close" @click="handleClear">清除</el-button>
      </template>
      <template v-slot:action>
        <el-button type="primary" icon="el-icon-plus" @click="openDialogAdd">新增</el-button>
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
    <AddTagDialog ref="AddTagDialog" @flush-parent="flushTable" />
    <EditTagDialog ref="EditTagDialog" @flush-parent="flushTable" />
  </div>
</template>

<script>
import AddTagDialog from '@/views/cs-setting/tag/components/AddTagDialog'
import EditTagDialog from '@/views/cs-setting/tag/components/EditTagDialog'
import {apiDeleteTag, apiGetTagList} from "@/api/tag";
import AppTable from "@/components/AppTable";
import AppPagination from "@/components/AppPagination";
import AppPanel from "@/components/AppPanel";

export default {
  name: 'TagList',
  components: {
    AppPanel,
    AppTable,
    AppPagination,
    AddTagDialog,
    EditTagDialog,
  },
  data() {
    return {
      loading: false,
      initFilter: {
        name: '',
        status: "All",
      },
      form: {
        filter: {
          name: '',
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
        { prop: 'id', label: '編號' },
        { prop: 'name', label: '名稱' },
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
      this.$refs.AddTagDialog.show()
    },
    openDialogEdit(id) {
      this.$refs.EditTagDialog.show(id)
    },
    async fetchData() {
      try {
        this.loading = true
        delete this.form.pagination.total
        const { data } = await apiGetTagList(this.form)
        this.tableData = data.listTag.tags
        this.form.pagination = data.listTag.pagination
      } catch (err) {
        console.log(err)
      } finally {
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
        await apiDeleteTag({ input: id })
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
