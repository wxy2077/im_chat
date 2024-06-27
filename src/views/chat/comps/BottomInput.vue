<template>
  <div class="bottom-input-container">
    <van-field v-model="inputValue" placeholder="" />
    <span style="margin-right: 10px;"></span>
    <van-button @click="sendMsg" size="small" type="primary" style="width: 50px">发送 </van-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { defineEmits } from 'vue'
const emit = defineEmits(['sendMsg'])

const inputValue = ref('')

const sendMsg = () => {
  if (inputValue.value.trim()) {
    emit('sendMsg', inputValue.value)
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
