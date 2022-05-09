<template>
  <div class="chat-box-container">
    <div v-if="activeRoomId === '' || activeTab === 'Pending'" class="chat-box-mask"></div>
    <el-button v-if="activeTab === 'Pending'" class="accept-btn" type="primary" @click="handleAccept" :disabled="activeRoomId === ''">開始諮詢</el-button>
    <ChatBoxHeader />
    <div id="chat-box-body" class="chat-box-body">
      <div v-for="(msg,idx) in messageList" :key="idx">
        <div style="margin-bottom: 16px;">
          <SystemMessage v-if="msg.messageType === 'System'" :content="msg.content" />
          <MemberMessage
              v-else-if="msg.messageType === 'Member'"
              :name="msg.senderName"
              :content="msg.content"
              :timestamp="msg.timestamp"
          />
          <StaffMessage
              v-else
              :name="msg.senderName"
              :content="msg.content"
              :timestamp="msg.timestamp"
          />
        </div>
      </div>
    </div>
    <ChatBoxFooter />
  </div>
</template>

<script>
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxFooter from "./ChatBoxFooter";
import StaffMessage from "./StaffMessage";
import MemberMessage from "./MemberMessage";
import SystemMessage from "./SystemMessage";
import {mapGetters} from "vuex";
import {apiGetStaffList} from "@/api/staff";
import {apiAcceptRoom, apiUpdateRoom} from "@/api/room";

export default {
  name: "ChatBox",
  components: {SystemMessage, MemberMessage, ChatBoxHeader, ChatBoxFooter, StaffMessage},
  computed: {
    ...mapGetters({
      messageList: 'cs/messageList',
      activeTab: 'cs/activeTab',
      activeRoomId: 'cs/activeRoomId',
    }),
  },
  mounted() {
    this.scrollToBottom()
  },
  updated:function(){
    this.scrollToBottom();
  },
  methods:{
    isNull(value) {
      return value == null || typeof (value) == 'undefined';
    },
    scrollToBottom () {
      this.$nextTick(() => {
        let elem = document.getElementById('chat-box-body');
        if(!this.isNull(elem)){
          elem.scrollTop = elem.scrollHeight;
        }
      })
    },
    async handleAccept() {
      try {
        this.loading = true
        if(this.activeRoomId === "") {
          return
        }
        await apiAcceptRoom({
          id: this.activeRoomId
        })
        let id = this.activeRoomId
        this.$store.commit("cs/RESET")
        await this.fetchRoomList()
        this.$store.commit('cs/SET_ACTIVE_ROOM', id)
        await this.$store.dispatch("cs/getRoomMessageList", {
          filter: {
            roomID: id
          },
          pagination: {
            page: 1,
            pageSize: 10
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
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
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.chat-box-container {
  position: relative;
  width: 100%;
  background-color: #f4f5f6;
  border-radius: 6px;
  height: 90vh;
  .chat-box-mask {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 7;
    border-radius: 6px;
    opacity: 0.7;
  }
  ::v-deep .accept-btn {
    position: absolute;
    z-index: 8;
    bottom: 20px;
    margin: 0;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .chat-box-body {
    height: 60vh;
    margin: 12px 0 20px 0;
    padding: 0 15px;
    overflow-y: scroll;
    .message-content {
      display: block;
      margin: 20px;
      color: Black;
      font-weight: bold;
    }
  }
}
</style>