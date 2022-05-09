<template>
<div class="system-message-container">
  <div class="system-message">{{content}}</div>
</div>
</template>

<script>
export default {
  name: "SystemMessage",
  props: {
    content: String
  }
}
</script>

<style lang="scss" scoped>
.system-message-container {
  width: 100%;
  text-align: center;
  .system-message {
    display: inline-block;
    padding: 10px 20px;
    font-size: 15px;
    background-color: #c4c4c4;
    color: #fff;
    font-weight: bold;
    border-radius: 30px;
  }
}
</style>