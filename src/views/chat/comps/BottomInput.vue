<template>
  <div class="bottom-input-container">
    <van-field
        v-model="inputValue"
        placeholder="Type a message"
        right-icon="send"
        clearable
    />
    <van-button
        @click="sendMessage"
        size="small"
        type="primary"
        style="width: 50px;"
    >发送</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const inputValue = ref('')


const sendMessage = () => {
  if (inputValue.value.trim()) {
    console.log('Message sent:', inputValue.value)
    inputValue.value = ''
  }
}



</script>

<style scoped>
.bottom-input-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 1000;
}


body.keyboard-open .bottom-input-container {
  position: absolute;
  bottom: auto;
}

</style>