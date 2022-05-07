<template>
  <div class="member-message-container">
    <div class="content-section">
      <div class="content-desc">
        <span class="member-name">{{name}}</span>
        <span class="member-time">{{getTime(timestamp)}}</span>
      </div>
      <div class="content-text">{{content}}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "MemberMessage",
  props: {
    name: String,
    content: String,
    timestamp: Number
  },
  methods: {
    getTime(timestamp) {
      return moment(timestamp*1000).format('HH:mm');
    }
  }
}
</script>

<style lang="scss" scoped>
.member-message-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  .content-section {
    .content-desc {
      margin-bottom: 5px;
      .member-name {
        display: inline-block;
        color: black;
        font-weight: bold;
        margin-right: 3px;
      }
      .member-time {
        display: inline-block;
        font-size: 14px;
        color: #888888;
      }
    }
    .content-text {
      background-color: white;
      padding: 6px 10px;
      border-radius: 10px;
      position: relative;
      margin-right: 120px;
      color: #333333;
      font-weight: 500;
      &::before {
        border-right: 10px solid white;
        left: -8px;
        content: "";
        position: absolute;
        top: 9px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }
}
</style>