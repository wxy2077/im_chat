<template>
  <div class="index">
    <van-nav-bar fixed placeholder title="聊天">
      <template #right>
        <van-icon name="add-o" size="18px" color="black"/>
      </template>
    </van-nav-bar>
    <van-search v-model="keyword" placeholder="搜索"/>

    <div class="user-list">
      <template v-for="(item, index) in chatInfoItem" :key="index">
        <van-swipe-cell>
          <div class="user-item" @click="toChart(item)">
            <van-image round class="user-item-img" :src="item.avatar"/>
            <div class="user-item-container">
              <div class="user-info">
                <span class="name">{{ item.username }}</span>
                <span class="message" v-if="item.content && item.content.length > 20">
                  {{ item.content.slice(0, 20) }}...
                </span>
                <span class="message" v-else>{{ item.content }}</span>
              </div>
              <div class="other-info">
                <span class="time" v-if="item.created_at">
                  <DataFormat
                      :date="new Date(item.created_at)"
                      :options="{ showTime: true, showWeek: false }"
                  ></DataFormat>
                </span>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
                style="height: 100%"
                square
                type="danger"
                @click="deleteFriend(item.id)"
                text="删除"
            />
          </template>
        </van-swipe-cell>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {onMounted, onUnmounted, reactive, ref, watch} from 'vue'

import {useMenuTab} from '@/stores/modules/MenuTab'
import {useWebSocketStore} from '@/stores/websocketStore'
import DataFormat from '@/components/common/DataFormat.vue'
import {type ChatInfoItem} from '@/types/users'
import {FRIEND_LIST_KEY, TOKEN} from '@/utils/globalConsts'
import {getUnreadMessage} from "@/api/user";

const websocketStore = useWebSocketStore()

const menuTabBar = useMenuTab()
const router = useRouter()

const keyword = ref('')
const chatInfoItem = reactive<ChatInfoItem[]>([])

const toChart = (item: any) => {
  router.push({
    name: 'chat',
    state: {targetUser: {id: item.id, username: item.username, avatar: item.avatar}}
  })
}

onMounted(() => {
  menuTabBar.active = useRoute().path.slice(1)
  menuTabBar.transShowMenu()

  const token = localStorage.getItem(TOKEN)
  if (!websocketStore.isConnected && token) {
    websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token)
  }

  const storedFriendList = localStorage.getItem(FRIEND_LIST_KEY)
  if (storedFriendList) {
    const friends: ChatInfoItem[] = JSON.parse(storedFriendList)
    Object.assign(chatInfoItem, friends)
  }

  getUnreadMessage().then((res) => {
    if (res.data?.length > 0) {

      let tempChatItemMap: { [key: number]: ChatInfoItem } = {}

      res.data.forEach((item: any) => {
        tempChatItemMap[item.sender_user.id] = {
          id: item.sender_user.id,
          content: item.content,
          created_at: item.created_at,
          username: item.sender_user.username,
          avatar: item.sender_user.avatar,
          content_type: item.content_type,
          message_type: item.message_type,
          unreadCount: item.UnreadCount
        }
      })

      chatInfoItem.forEach((chatItem, index) => {
        if (tempChatItemMap[chatItem.id]) {
          if (tempChatItemMap[chatItem.id].message_type == chatItem.message_type) {
            chatItem.content = tempChatItemMap[chatItem.id].content
            chatItem.created_at = tempChatItemMap[chatItem.id].created_at
            chatItem.unreadCount = tempChatItemMap[chatItem.id].unreadCount
          }
          delete tempChatItemMap[chatItem.id]
        }
      })
      // 置顶未读消息
      Object.values(tempChatItemMap).forEach((item) => {
        chatInfoItem.unshift(item)
      })

    }
  })

})

watch(
    () => websocketStore.message,
    (newMessage) => {
      let msg = JSON.parse(newMessage)

      let isExist: boolean = false
      chatInfoItem.forEach((chatItem, index) => {
        if (chatItem.id === msg.sender_user_id) {
          chatItem.content = msg.content
          isExist = true
        }
      })
      if (!isExist) {
        let newFriend: ChatInfoItem = {
          id: msg.sender_user_id,
          username: msg.sender_username,
          avatar: msg.avatar,
          content: msg.content,
          content_type: msg.content_type,
          message_type: msg.message_type,
          created_at: msg.created_at
        }
        chatInfoItem.unshift(newFriend)
      }
    }
)

const deleteFriend = (id: number) => {
  chatInfoItem.splice(
      chatInfoItem.findIndex((item) => item.id === id),
      1
  )
}

onUnmounted(() => {
  menuTabBar.transShowMenu()

  localStorage.setItem(FRIEND_LIST_KEY, JSON.stringify(chatInfoItem))
})
</script>

<style scoped>
.user-item {
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--vt-c-basecolor);
  position: relative;
}

.user-item-img {
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 10px;
}

.user-item-container {
  flex: 1;
  display: flex;
}

.user-item-container > .user-info {
  display: flex;
  flex-direction: column;
}

.user-info > .name {
  font-family: -apple-system;
  margin-top: -13px;
}

.user-info > .message {
  font-size: 14px;
  color: var(--vt-c-basecolor);
  position: relative;
  bottom: -10px;
}

.user-item-container > .other-info {
  margin-left: auto;
  /*background-color: aqua;*/
}

.other-info > .time {
  font-size: 14px;
  margin-right: 5px;
}
</style>
