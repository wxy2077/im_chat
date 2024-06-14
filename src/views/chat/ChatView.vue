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
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ChatItem from './comps/ChatItem.vue'
import BottomInput from './comps/BottomInput.vue'
import { useWebSocketStore } from '@/stores/websocketStore'
import { getMessage } from '@/api/user'
import { type UserInfo } from '@/types/users'
import { type Message } from '@/types/message'

import { formatDate } from '@/utils/dateFormat'
import { FRIEND_LIST_KEY, TOKEN, USER } from '@/utils/globalConsts'

const websocketStore = useWebSocketStore()
const router = useRouter()
const targetUser = history.state.targetUser

const goBack = function () {
  router.go(-1)
}

const user = ref<UserInfo>({} as UserInfo)

const messageList = reactive<Message[]>([])

onMounted(() => {
  const token = localStorage.getItem(TOKEN)
  if (!websocketStore.isConnected && token) {
    websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token)
  }
  const userData = localStorage.getItem(USER)
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
  let data: Message = {
    avatar: user.value.avatar,
    sender_user_id: user.value.id,
    sender_username: user.value.username,
    receiver_target_id: targetUser.id,
    content: msg,
    content_type: 1,
    message_type: 1,
    created_at: formatDate(new Date())
  }
  messageList.push(data)
  websocketStore.sendMessage(JSON.stringify(data))
}

watch(
  () => websocketStore.message,
  (newMessage) => {
    messageList.push(JSON.parse(newMessage))
  }
)

onUnmounted(() => {
  const friend: UserInfo = {
    content: '',
    created_at: '',
    id: targetUser.id,
    username: targetUser.username,
    avatar: targetUser.avatar
  }

  if (messageList.length > 0) {
    let lastMsg = messageList[messageList.length - 1]
    friend.content =
      lastMsg.content && lastMsg.content.length < 20
        ? lastMsg.content
        : lastMsg.content.slice(0, 20) + '...'
    friend.created_at = lastMsg.created_at
  } else {
    friend.created_at = formatDate(new Date())
  }

  const storedFriendList = localStorage.getItem(FRIEND_LIST_KEY)
  if (storedFriendList) {
    const friendList: UserInfo[] = JSON.parse(storedFriendList)

    const index = friendList.findIndex((item) => item.id === targetUser.id)
    if (index !== -1) {
      friendList.splice(index, 1)
    }
    friendList.unshift(friend)
    localStorage.setItem(FRIEND_LIST_KEY, JSON.stringify(friendList))
  } else {
    const newFriendList: UserInfo[] = []
    newFriendList.push(friend)

    localStorage.setItem(FRIEND_LIST_KEY, JSON.stringify(newFriendList))
  }
})
</script>

<style scoped>
.chat-content {
  margin-bottom: 100px;
}

.chat-user-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 45px;
}
</style>
