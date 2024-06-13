<template>
  <div class="chat-item" :class="{ 'chat-item-right': isRight }">
    <img v-if="content" :src="avatar" class="avatar" />
    <div v-if="content" class="chat-message" :class="{ 'chat-message-right': isRight }">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  avatar: String,
  content: String,
  isRight: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.chat-item {
  display: flex;
  margin: 10px;
}
.chat-item-right {
  flex-direction: row-reverse; /* 头像和消息的位置 */
}
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 5px;
}
.chat-message {
  margin-left: 15px; /* 方向 */
  margin-right: 55px; /* 方向 */
  position: relative;
  border-radius: 6px;
  padding: 10px;
  background-color: #eaf2f8;
}
.chat-message::after,
.chat-message::before {
  position: absolute;
  right: 100%; /* 方向 */
  top: 15px;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  pointer-events: none;
}

.chat-message::after {
  border-color: transparent;
  border-right-color: #eaf2f8; /* 箭头方向 */
  border-width: 5px;
  margin-top: -5px;
}

.chat-message::before {
  border-color: transparent;
  border-right-color: #eaf2f8; /* 箭头方向 */
  border-width: 8px;
  margin-top: -8px;
}

.chat-message-right {
  margin-left: 55px;
  margin-right: 15px;
  position: relative;
  border-radius: 6px;
  padding: 10px;
  background-color: #abebc6;
}
.chat-message-right::after,
.chat-message-right::before {
  position: absolute;
  left: 100%; /* 方向 */
  top: 15px;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  pointer-events: none;
}
.chat-message-right::after {
  border-color: transparent;
  border-left-color: #abebc6; /* 箭头方向 */
  border-width: 5px;
  margin-top: -5px;
}
.chat-message-right::before {
  border-color: transparent;
  border-left-color: #abebc6; /* 箭头方向 */
  border-width: 8px;
  margin-top: -8px;
}
</style>
