<template>
  <div class="app-container">
    <panel-group />
    <el-row :gutter="50">
      <el-col :span="12">
        <div class="staff-panel">
          <h3>在線客服</h3>
          <AppTable :table-data="tableData" :table-columns="tableColumns" />
        </div>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import {apiGetStaffList} from "@/api/staff";
import AppTable from "@/components/AppTable";

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    AppTable,
  },
  data() {
    return {
      tableData: [],
      tableColumns: [
        { prop: 'id', label: '編號', align: "center" },
        { prop: 'name', label: '名稱', align: "center" },
        {
          prop: 'servingStatus',
          label: '服務狀態',
          align: "center",
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
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const { data } = await apiGetStaffList({
          filter: {
            name: '',
            status: 'Enabled',
            servingStatus: 'All',
          },
          pagination: {
            page: 1,
            pageSize: 100
          }
        })
        this.tableData = data.listStaff.staffs
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .staff-panel {
    border-radius: 6px;
    padding: 6px 20px 20px 20px;
    background-color: white;
  }
}
</style>
