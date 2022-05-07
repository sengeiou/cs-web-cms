<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="訊息列表">
      <template v-slot:filter>
        <el-input v-model="form.filter.roomID" placeholder="房間編號" style="width: 100px;" />
        <el-select style="width: 150px;" v-model="form.filter.staffID" placeholder="職員">
          <el-option label="全部" :value="0"></el-option>
          <el-option v-for="(staff,idx) in staffs" :key="idx" :label="staff.name" :value="staff.id"></el-option>
        </el-select>
        <el-input v-model="form.filter.content" placeholder="訊息內容" style="margin-right: 10px;width: 250px;" />
        <el-button icon="el-icon-search" type="primary" @click="fetchData">搜尋</el-button>
        <el-button icon="el-icon-circle-close" @click="handleClear">清除</el-button>
      </template>
      <template v-slot:body>
        <AppTable
            :table-data="tableData"
            :table-columns="tableColumns"
        />
        <AppPagination
            :data="form.pagination"
            @change="handleChange"
        />
      </template>
    </AppPanel>
  </div>
</template>

<script>
import {apiGetStaffList} from "@/api/staff";
import {deepCopy} from "@/utils";
import {apiGetMessageList} from "@/api/message";
import moment from "moment";
import AppTable from "@/components/AppTable";
import AppPagination from "@/components/AppPagination";
import AppPanel from "@/components/AppPanel";

export default {
  name: 'MessageList',
  components: {
    AppPanel,
    AppTable,
    AppPagination,
  },
  created() {
    this.fetchStaffList()
    this.fetchData()
  },
  data() {
    return {
      loading: false,
      staffs: [],
      initFilter: {
        roomID: '',
        staffID: 0,
        content: '',
      },
      form: {
        filter: {
          roomID: '',
          staffID: 0,
          content: '',
        },
        pagination: {
          page: 1,
          pageSize: 10,
        }
      },
      tableData: [],
      tableColumns: [
        { prop: 'roomID', label: '房間編號', width: 120 },
        {
          prop: 'messageType',
          label: '發送方式',
          width: 140,
          render: (h, param) => {
            const { messageType } = param.row
            switch (messageType) {
              case 'Staff':
                return <span>客服 -> 會員</span>
              case 'Member':
                return <span>會員 -> 客服</span>
              case 'System':
                return <span>系統發送</span>
            }
          }
        },
        { prop: 'senderName', label: '發送人', width: 140 },
        {
          prop: 'contentType',
          label: '消息類型',
          width: 120,
          render: (h, scope) => {
            switch (scope.row.contentType) {
              case 'Text':
                return <span>文字</span>
              case 'Image':
                return <span>圖片</span>
              default:
                return <span>通知</span>
            }
          }
        },
        { prop: 'content', label: '消息內容' },
        {
          prop: 'timestamp',
          label: '發送時間',
          width: 190,
          render: (h, scope) => {
            return <span>{this.getTime(scope.row.timestamp)}</span>
          }
        },
      ]
    }
  },
  methods: {
    getTime(timestamp) {
      return moment(timestamp*1000).format('YYYY-MM-DD HH:mm:ss');
    },
    async fetchData() {
      try {
        this.loading = true
        let params = deepCopy(this.form)
        if(params.filter.roomID === '') {
          params.filter.roomID = 0
        }
        delete params.pagination.total;
        const { data } = await apiGetMessageList(params)
        this.tableData = data.listMessage.messages
        this.form.pagination = data.listMessage.pagination
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    async fetchStaffList() {
      try {
        this.loading = true
        const { data } = await apiGetStaffList({
          filter: {
            name: "",
            status: "All",
            servingStatus: "All",
          },
          pagination: {
            page: 1,
            pageSize: 100
          }
        })
        this.staffs = data.listStaff.staffs
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
    handleClear() {
      this.form.filter = { ...this.initFilter }
    },
  },
}
</script>
