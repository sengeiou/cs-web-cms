<template>
  <div class="app-container" v-loading="loading">
    <AppPanel title="房間列表">
      <template v-slot:filter>
        <el-input v-model="form.filter.roomID" placeholder="房間編號" style="width: 100px;" />
        <el-select style="width: 150px;" v-model="form.filter.staffID" placeholder="職員">
          <el-option label="全部" :value="0"></el-option>
          <el-option v-for="(staff,idx) in staffs" :key="idx" :label="staff.name" :value="staff.id"></el-option>
        </el-select>
        <el-select style="width: 100px;" v-model="form.filter.status" placeholder="狀態">
          <el-option label="全部" value="All"></el-option>
          <el-option label="等待中" value="Pending"></el-option>
          <el-option label="服務中" value="Serving"></el-option>
          <el-option label="已關閉" value="Closed"></el-option>
        </el-select>
        <el-button icon="el-icon-search" type="primary" @click="fetchData">搜尋</el-button>
        <el-button icon="el-icon-circle-close" @click="handleClear">清除</el-button>
      </template>
      <template v-slot:body>
        <AppTable
            :table-data="tableData"
            :table-columns="tableColumns"
        />
        <AppPagination :data="form.pagination" @change="handleChange" />
      </template>
    </AppPanel>
  </div>
</template>

<script>
import AppTable from '@/components/AppTable'
import AppPagination from '@/components/AppPagination'
import {apiGetStaffList} from "@/api/staff";
import {apiGetRoomList} from "@/api/room";
import {deepCopy} from "@/utils";
import AppPanel from "@/components/AppPanel";

export default {
  name: 'RoomList',
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
        status: 'All',
      },
      form: {
        filter: {
          roomID: '',
          staffID: 0,
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
        { prop: 'id', label: '編號' },
        { prop: 'memberName', label: '會員名稱' },
        { prop: 'staffName', label: '職員名稱' },
        { prop: 'tagName', label: '標籤' },
        {
          prop: 'status',
          label: '狀態',
          render: (h, scope) => {
            switch (scope.row.status) {
              case 'Pending':
                return <el-tag effect="dark" type="warning">等待中</el-tag>
              case 'Serving':
                return <el-tag effect="dark" type="success">服務中</el-tag>
              case 'Closed':
                return <el-tag effect="dark" type="danger">已關閉</el-tag>
            }
          }
        },
        { prop: 'startTime', label: '開始時間', width: 180 },
        { prop: 'endTime', label: '結束時間', width: 180 },
      ]
    }
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        let params = deepCopy(this.form)
        if(params.filter.roomID === '') {
          params.filter.roomID = 0
        }
        delete params.pagination.total
        const { data } = await apiGetRoomList(params)
        this.tableData = data.listRoom.rooms
        this.form.pagination = data.listRoom.pagination
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
    handleClear() {
      this.form.filter = { ...this.initFilter }
    },
  },
}
</script>
