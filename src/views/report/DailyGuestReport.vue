<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="訪客數報表">
      <template v-slot:filter>
        <el-date-picker
            style="margin-right: 10px;"
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
            value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">搜尋</el-button>
      </template>
      <template v-slot:body>
        <AppTable
            :table-data="tableData"
            :table-columns="tableColumns"
        />
      </template>
    </AppPanel>
  </div>
</template>

<script>
import AppTable from '@/components/AppTable'
import moment from "moment";
import {apiGetDailyGuestReport} from "@/api/report";
import AppPanel from "@/components/AppPanel";

export default {
  name: 'DailyGuestReport',
  components: {
    AppTable,
    AppPanel,
  },
  created() {
    this.fetchData()
  },
  data() {
    let now = moment().format("yyyy-MM-DD")
    let before = moment().subtract(9, 'days').format("yyyy-MM-DD")
    return {
      loading: false,
      dateRange: [before, now],
      tableData: [],
      tableColumns: [
        { prop: 'date', label: '日期' },
        { prop: 'guestCount', label: '訪客數' },
      ]
    }
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const { data } = await apiGetDailyGuestReport({
          filter: {
            startDate: this.dateRange[0],
            endDate: this.dateRange[1]
          }
        })
        this.tableData = data.listDailyGuestReport.items
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
  },
}
</script>
