<template>
  <div class="chat">
    <van-nav-bar
      fixed
      placeholder
      :title="targetUser.username"
      right-text="..."
      left-arrow
      @click-left="goBack"
    ></van-nav-bar>

    <!--    内容 -->
    <div class="chat-content">
      <template v-for="(item, index) in messageList" :key="index">
        <ChatItem
          :avatar="item.sender_user_id === user.id ? user.avatar : targetUser.avatar"
          :content="item.content"
          :isRight="item.sender_user_id === user.id"
        >
        </ChatItem>
      </template>
    </div>

    <!--  输入框  -->
    <div class="chat-user-panel">
      <BottomInput @sendMsg="sendMsg"></BottomInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ChatItem from './comps/ChatItem.vue'
import BottomInput from './comps/BottomInput.vue'
import { useWebSocketStore } from '@/stores/websocketStore'
import { getMessage } from '@/api/user'

const websocketStore = useWebSocketStore()
const router = useRouter()
const targetUser = history.state.targetUser

const goBack = function () {
  router.go(-1)
}

const user = ref({ id: 0, avatar: '' })

const messageList = reactive([{ sender_user_id: 0, content: '' }])

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!websocketStore.isConnected && token) {
    websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token)
  }
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }

  getMessage({ friend_user_id: targetUser.id }).then((res: any) => {
    if (Array.isArray(res.data.list)) {
      Object.assign(messageList, res.data.list)
    }
  })
})

const sendMsg = (msg: string) => {
  messageList.push({
    sender_user_id: user.value.id,
    content: msg
  })
  let data = {
    content_type: 1,
    content: msg,
    sender_user_id: user.value.id,
    receiver_user_id: targetUser.id
  }
  websocketStore.sendMessage(JSON.stringify(data))
}

watch(
  () => websocketStore.message,
  (newMessage) => {
    messageList.push(JSON.parse(newMessage))
  }
)
</script>

<style scoped>
.chat-content {
  margin-bottom: 55px;
}

.chat-user-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 45px;
}
</style>
