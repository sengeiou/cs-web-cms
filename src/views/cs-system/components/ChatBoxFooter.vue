<template>
  <div class="footer-container">
    <div class="input">
      <div id="input-area" class="input-area" @compositionstart="isComposing = true; this.haveChanged = true;" @compositionend="isComposing = false" @keyup.enter.exact="onEnter">
        <textarea v-model="message.content" placeholder="請輸入訊息..." :disabled="taDisabled"></textarea>
        <el-tooltip class="send-btn" content="發送" placement="top">
          <el-button type="success" icon="el-icon-s-promotion" circle @click="sendMessage"></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSocketMessage } from "@/utils/ws";
import {mapGetters} from "vuex";

export default {
  name: "ChatBoxFooter",
  computed: {
    ...mapGetters({
      activeRoomId: 'cs/activeRoomId',
    }),
  },
  watch: {
    activeRoomId() {
      this.message.room_id = this.activeRoomId
      if(this.activeRoomId > 0) {
        this.taDisabled = false
      } else {
        this.taDisabled = true
      }
    }
  },
  data() {
    return {
      taDisabled: true,
      isComposing: false,
      isOK: true,
      haveChanged: false,
      message: {
        room_id: this.activeRoomId,
        content_type: 2,
        content: ""
      }
    }
  },
  methods: {
    sendMessage() {
      this.message.content = this.message.content.trim()
      this.message.content = this.message.content.replace(/\r\n|\n/g,"");
      if(this.message.content !== "" && this.message.room_id > 0) {
        sendSocketMessage(this.message)
        this.isOK = true
        this.haveChanged = false
      }
      this.message.content = ""
    },
    onEnter() {
      if(this.isComposing === false && this.haveChanged === false && this.isOK === true) {
        this.sendMessage()
      } else {
        this.haveChanged = false
        this.isOK = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/global.scss";
.footer-container {
  width: 100%;
  text-align: center;
  .input {
    position: relative;
    .message-input {
      width: 95%;
      padding-bottom: 15px;
    }
    .input-area {
      position: relative;
      width: 96%;
      background-color: white;
      border-radius: 10px;
      text-align: left;
      margin: 0 auto 12px;
      textarea {
        border-radius: 10px;
        border: none;
        width: 100%;
        padding: 20px;
        resize: none;
        height: 150px;
        font-size: 16px;
        letter-spacing: 0.5px;
        &:focus {
          outline: none !important;
        }
      }
      .send-btn {
        position: absolute;
        bottom: 14px;
        right: 16px;
        background-color: $primary;
        border: none;
      }
    }
  }
}
</style>