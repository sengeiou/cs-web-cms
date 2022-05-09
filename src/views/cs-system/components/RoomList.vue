<template>
  <div class="room-list-container" v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick" lazy stretch>
      <el-tab-pane label="當前" name="Serving" style="margin-top: 5px;">
        <div v-if="roomList.length > 0" class="tab-pane-item">
          <div v-for="(room,idx) in roomList" :key="idx">
            <RoomItem
                :id="room.id"
                :name="room.memberName"
                :message="room.message"
                :isRead="room.isRead"
            />
          </div>
        </div>
        <div v-else class="empty-room">
          <svg-icon icon-class="people"></svg-icon>
          <span>- 尚無訪客 -</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="等待中" name="Pending" style="margin-top: 5px;">
        <div v-if="roomList.length > 0" class="tab-pane-item">
          <div v-for="(room,idx) in roomList" :key="idx">
            <RoomItem
                :id="room.id"
                :name="room.memberName"
                message=""
                :isRead="true"
            />
          </div>
        </div>
        <div v-else class="empty-room">
          <svg-icon icon-class="people"></svg-icon>
          <span>- 尚無訪客 -</span>
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
          pageSize: 6
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.room-list-container {
  border-radius: 6px;
  height: 90vh;
  background-color: white;
  .tab-pane-item {
    height: 100%;
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
.empty-room {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  color: #e3e3e3;
  font-weight: bold;
  font-size: 22px;
  .svg-icon {
    width: 75px;
    height: 80px;
    margin: 30px 20px;
  }
}
</style>