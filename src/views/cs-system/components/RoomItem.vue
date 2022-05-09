<template>
<div class="room-item-container" :class="{selected: this.id === activeRoomId}" @click="handleClick">
  <span v-if="!isRead" class="red-point-hint"></span>
  <div class="top-container">
    <div class="avatar">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
    </div>
    <div class="item-text">
      <div style="color: #333;font-weight: bold;">用戶名: {{name}}</div>
      <div style="margin-top: 5px;color: #777;font-weight: bold;">諮詢房 #{{id}}</div>
    </div>
  </div>
  <div v-if="message !== ''" class="message-text" :class="isRead ? '' : 'unread'">
    <span>{{message}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "RoomItem",
  computed: {
    activeRoomId() {
      return this.$store.state.cs.activeRoomId
    }
  },
  props: {
    id: Number,
    name: String,
    message: String,
    isRead: Boolean,
  },
  methods: {
    handleClick() {
      this.isRead = true
      this.$store.commit("cs/SET_ACTIVE_ROOM", this.id)
      this.$store.dispatch("cs/getRoomMessageList", {
        roomID: this.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.room-item-container {
  width: 100%;
  padding: 16px 16px 13px 16px;
  margin: auto auto 18px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  position: relative;
  .red-point-hint::before{
    position: absolute;
    content: " ";
    display: inline-block;
    border: 4px solid red;/*设置红色*/
    border-radius:50%;
    z-index: 1000;
    right: 0;
    height: 2px;
    margin-right: 13px;
    margin-top: -5px;
  }
  .top-container {
    display: flex;
    align-items: center;
    .avatar {
      .el-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        vertical-align: center;
        line-height: 44px;
      }
    }
    .item-text {
      margin-left: 10px;
    }
  }
  .message-text {
    margin-top: 10px;
    width: 100%;
    span {
      font-size: 16px;
      color: #777;
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      display:inline-block;
      width: 100%;
    }
    &.unread {
      span {
        font-weight: bold;
        color: black;
      }
    }
  }
  &:hover {
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  &.selected {
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
  }
}
</style>