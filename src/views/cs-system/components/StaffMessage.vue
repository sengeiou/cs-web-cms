<template>
  <div class="staff-message-container">
    <div class="top-section">
      <div class="staff-time">{{getTime(timestamp)}}</div>
      <div class="staff-name">{{name}}</div>
    </div>
    <div class="content-text">{{content}}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "StaffMessage",
  props: {
    name: String,
    content: String,
    timestamp: Number,
  },
  methods: {
    getTime(timestamp) {
      return moment(timestamp*1000).format('HH:mm');
    }
  }
}
</script>

<style lang="scss" scoped>
.staff-message-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 20px;
  .staff-time {
    display: inline-block;
    font-size: 14px;
    margin-right: 3px;
    color: #888888;
    margin-bottom: 3px;
  }
  .staff-name {
    display: inline-block;
    color: black;
    font-weight: bold;
    margin-right: 3px;
  }
  .content-text {
    color: white;
    padding: 6px 10px;
    border-radius: 10px;
    position: relative;
    margin-right: 5px;
    margin-left: 120px;
    order: -1;
    background-color: #06BEC9;
    font-weight: 500;
    &::before {
      border-left: 10px solid #06BEC9;
      right: -8px;
      content: "";
      position: absolute;
      top: 9px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
  }
}
</style>