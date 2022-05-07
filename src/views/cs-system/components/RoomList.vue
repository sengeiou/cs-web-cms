<template>
  <div class="room-list-container" v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick" lazy stretch>
      <el-tab-pane label="當前" name="Serving">
        <div class="tab-pane-item">
          <div class="empty-text" v-if="roomList.length === 0">
            <span>暫無數據</span>
          </div>
          <div v-else v-for="(room,idx) in roomList" :key="idx">
            <RoomItem
                :id="room.id"
                :name="room.memberName"
                :message="room.message"
                :isRead="room.isRead"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="等待中" name="Pending">
        <div class="tab-pane-item">
          <div class="empty-text" v-if="roomList.length === 0">
            <span>暫無數據</span>
          </div>
          <div v-else v-for="(room,idx) in roomList" :key="idx">
            <RoomItem
                :id="room.id"
                :name="room.memberName"
                message=""
                :isRead="true"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RoomItem from "@/views/cs-system/components/RoomItem";
import {mapGetters} from "vuex";

export default {
  name: "RoomList",
  components: {RoomItem},
  computed: {
    ...mapGetters({
      roomList: "cs/roomList",
      activeTab: "cs/activeTab",
    }),
  },
  created() {
    this.fetchRoomList()
  },
  mounted() {
    this.activeName = this.activeTab
  },
  watch: {
    activeTab() {
        this.activeName = this.activeTab
    }
  },
  data() {
    return {
      loading: false,
      activeName: ""
    }
  },
  methods: {
    handleClick() {
      this.$store.commit("cs/RESET")
      this.$store.commit("cs/SET_ACTIVE_TAB", this.activeName)
      this.fetchRoomList()
    },
    async fetchRoomList() {
      await this.$store.dispatch("cs/getStaffRoomList", {
        filter: {
          status: this.activeTab
        },
        pagination: {
          page: 1,
          pageSize: 10
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.room-list-container {
  border: 1px solid #d4d4d4;
  border-radius: 6px;
  .tab-pane-item {
    height: 560px;
    overflow: scroll;
    padding: 0 14px;
  }
  .empty-text {
    span {
      display: block;
      color: #c3c3c3;
      font-weight: bold;
      text-align: center;
      padding: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>