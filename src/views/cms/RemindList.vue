<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="提醒列表">
      <template v-slot:filter>
        <el-input v-model="form.filter.content" placeholder="內容" style="width: 200px;" />
        <el-select style="width: 100px;" v-model="form.filter.status" placeholder="狀態">
          <el-option label="全部" value="All"></el-option>
          <el-option label="啟用" value="Enabled"></el-option>
          <el-option label="禁用" value="Disabled"></el-option>
        </el-select>
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
    <AddRemindDialog ref="AddRemindDialog" @flush-parent="flushTable" />
    <EditRemindDialog ref="EditRemindDialog" @flush-parent="flushTable" />
  </div>
</template>

<script>
import AppTable from "@/components/AppTable";
import AppPanel from "@/components/AppPanel";
import AppPagination from "@/components/AppPagination";
import AddRemindDialog from "@/views/cms/components/AddRemindDialog";
import EditRemindDialog from "@/views/cms/components/EditRemindDialog";
import EditAvatarDialog from "@/layout/components/EditAvatarDialog";
import {apiDeleteRemind, apiGetRemindList} from "@/api/remind";

export default {
  name: 'RemindList',
  components: {
    AddRemindDialog,
    EditRemindDialog,
    AppTable,
    AppPanel,
    AppPagination,
    EditAvatarDialog,
  },
  data() {
    return {
      loading: false,
      initFilter: {
        content: '',
        status: 'All',
      },
      form: {
        filter: {
          content: '',
          status: 'All',
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
        { prop: 'title', label: '標題', width: 200 },
        { prop: 'content', label: '內容' },
        {
          prop: 'status',
          label: '狀態',
          align: "center",
          width: 100,
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
      this.$refs.AddRemindDialog.show()
    },
    openDialogEdit(id) {
      this.$refs.EditRemindDialog.show(id)
    },
    async fetchData() {
      try {
        this.loading = true
        delete this.form.pagination.total
        const { data } = await apiGetRemindList(this.form)
        this.tableData = data.listRemind.reminds
        this.form.pagination = { ...data.listRemind.pagination }
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
        await apiDeleteRemind({ input: id })
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
