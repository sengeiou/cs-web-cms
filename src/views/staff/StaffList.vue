<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="職員列表">
      <template v-slot:filter>
        <el-input v-model="form.filter.name" placeholder="名稱" style="margin-right: 10px;width: 200px;" />
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
    <AddStaffDialog ref="AddStaffDialog" @flush-parent="flushTable" />
    <EditStaffDialog ref="EditStaffDialog" @flush-parent="flushTable" />
  </div>
</template>

<script>
import {apiDeleteStaff, apiGetStaffList} from "@/api/staff";
import AppTable from "@/components/AppTable";
import AppPanel from "@/components/AppPanel";
import AppPagination from "@/components/AppPagination";
import AddStaffDialog from "@/views/staff/components/AddStaffDialog";
import EditStaffDialog from "@/views/staff/components/EditStaffDialog";
import EditAvatarDialog from "@/layout/components/EditAvatarDialog";

export default {
  name: 'StaffList',
  components: {
    AddStaffDialog,
    EditStaffDialog,
    AppTable,
    AppPanel,
    AppPagination,
    EditAvatarDialog,
  },
  data() {
    return {
      loading: false,
      initFilter: {
        name: '',
        status: 'All',
        servingStatus: 'All',
      },
      form: {
        filter: {
          name: '',
          status: 'All',
          servingStatus: 'All',
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
        { prop: 'role', label: '角色' },
        { prop: 'username', label: '用戶名' },
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
        {
          prop: 'servingStatus',
          label: '服務狀態',
          render: (h, param) => {
            switch (param.row.servingStatus) {
              case 'Closed':
                return <el-tag effect="dark" type="danger">關閉</el-tag>
              case 'Serving':
                return <el-tag effect="dark" type="success">服務中</el-tag>
              case 'Pending':
                return <el-tag effect="dark" type="warning">閒置</el-tag>
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
      this.$refs.AddStaffDialog.show()
    },
    openDialogEdit(id) {
      this.$refs.EditStaffDialog.show(id)
    },
    async fetchData() {
      try {
        this.loading = true
        delete this.form.pagination.total
        const { data } = await apiGetStaffList(this.form)
        this.tableData = data.listStaff.staffs
        this.form.pagination = { ...data.listStaff.pagination }
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
        await apiDeleteStaff({ input: id })
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
