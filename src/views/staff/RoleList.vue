<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="角色列表">
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
    <AddRoleDialog ref="AddRoleDialog" @flush-parent="flushTable" />
    <EditRoleDialog ref="EditRoleDialog" @flush-parent="flushTable" />
  </div>
</template>

<script>
import AppTable from "@/components/AppTable";
import AppPanel from "@/components/AppPanel";
import AppPagination from "@/components/AppPagination";
import AddRoleDialog from "@/views/staff/components/AddRoleDialog";
import EditRoleDialog from "@/views/staff/components/EditRoleDialog";
import {apiDeleteRole, apiGetRoleList} from "@/api/role";

export default {
  name: 'RoleList',
  components: {
    AddRoleDialog,
    EditRoleDialog,
    AppTable,
    AppPanel,
    AppPagination,
  },
  data() {
    return {
      loading: false,
      initFilter: {
        name: '',
      },
      form: {
        filter: {
          name: '',
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
      this.$refs.AddRoleDialog.show()
    },
    openDialogEdit(id) {
      this.$refs.EditRoleDialog.show(id)
    },
    async fetchData() {
      try {
        this.loading = true
        delete this.form.pagination.total
        const { data } = await apiGetRoleList(this.form)
        this.tableData = data.listRole.roles
        this.form.pagination = { ...data.listRole.pagination }
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
        await apiDeleteRole({ input: id })
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
    }
  },
}
</script>
