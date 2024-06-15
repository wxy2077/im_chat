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
    <div class="chat-content" ref="chatContainer" @scroll="onScroll">
      <template v-for="(item, index) in messageList" :key="index">
        <ChatItem
          :id="item.sender_user_id"
          :avatar="item.sender_user_id === user.id ? user.avatar : targetUser.avatar"
          :content="item.content"
          :isRight="item.sender_user_id === user.id"
          @toUserProfile="toUserProfile"
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
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
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

const toUserProfile = (id: number) => {
  router.push({
    name: 'user-profile',
    state: {
      targetUser: {
        id: id,
      }
    }
  })
}

const user = ref<UserInfo>({} as UserInfo)

const chatContainer = ref<HTMLElement | null>(null)

const loading = ref(false)

let messageList = reactive<Message[]>([])
let page = 1

onMounted(() => {
  const token = localStorage.getItem(TOKEN)
  if (!websocketStore.isConnected && token) {
    websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token)
  }
  const userData = localStorage.getItem(USER)
  if (userData) {
    user.value = JSON.parse(userData)
  }

  getMessage({ friend_user_id: targetUser.id, page: page }).then((res: any) => {
    if (Array.isArray(res.data.list)) {
      Object.assign(messageList, res.data.list)
      page += 1
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

// 滚动到底
watch(
  messageList,
  () => {
    if (page > 2) {
      return
    }

    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  },
  { deep: true }
)

// 滚动加载
const onScroll = () => {
  if (chatContainer.value) {
    if (chatContainer.value.scrollTop === 0 && !loading.value) {
      loading.value = true

      // 记录当前的scrollHeight
      const previousScrollHeight = chatContainer.value.scrollHeight

      getMessage({ friend_user_id: targetUser.id, page: page }).then((res: any) => {
        if (Array.isArray(res.data.list)) {
          messageList.unshift(...res.data.list)

          // 插入新消息后，使用 requestAnimationFrame 重新设置滚动位置
          requestAnimationFrame(() => {
            // 计算新的scrollTop 不至于很突兀
            chatContainer.value!.scrollTop =
              chatContainer.value!.scrollHeight - previousScrollHeight
          })

          // 判断是否还能继续加载
          loading.value = res.data.pagination.totalPages <= page
          page += 1
        }
      })
    }
  }
}

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
  height: calc(100vh - 110px);
  overflow-y: auto;
}

.chat-user-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 45px;
}
</style>
