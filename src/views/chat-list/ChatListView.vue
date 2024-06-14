<template>
  <div class="index">
    <van-nav-bar fixed placeholder title="聊天">
      <template #right>
        <van-icon name="add-o" size="18px" color="black" />
      </template>
    </van-nav-bar>
    <van-search v-model="keyword" placeholder="搜索" />

    <div class="user-list">
      <template v-for="(item, index) in friendList" :key="index">
        <van-swipe-cell>
          <div class="user-item" @click="toChart(item)">
            <van-image round class="user-item-img" :src="item.avatar" />
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
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

import { useMenuTab } from '@/stores/modules/MenuTab'
import { useWebSocketStore } from '@/stores/websocketStore'
import DataFormat from '@/components/common/DataFormat.vue'
import { type UserInfo } from '@/types/users'
import { FRIEND_LIST_KEY, TOKEN } from '@/utils/globalConsts'

const websocketStore = useWebSocketStore()

const menuTabBar = useMenuTab()
const router = useRouter()

const keyword = ref('')
const friendList = reactive<UserInfo[]>([])

const toChart = (item: any) => {
  router.push({
    name: 'chat',
    state: { targetUser: { id: item.id, username: item.username, avatar: item.avatar } }
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
    const friends: UserInfo[] = JSON.parse(storedFriendList)
    Object.assign(friendList, friends)
  }
})

watch(
  () => websocketStore.message,
  (newMessage) => {
    let msg = JSON.parse(newMessage)
    console.log(msg)
    let isExist: boolean = false
    friendList.forEach((friend, index) => {
      if (friend.id === msg.sender_user_id) {
        friend.content = msg.content
        isExist = true
      }
    })
    if (!isExist) {
      let newFriend: UserInfo = {
        id: msg.sender_user_id,
        username: msg.sender_username,
        avatar: msg.avatar,
        content: msg.content,
        created_at: msg.created_at
      }
      friendList.unshift(newFriend)
    }
  }
)

const deleteFriend = (id: number) => {
  friendList.splice(
    friendList.findIndex((item) => item.id === id),
    1
  )
}

onUnmounted(() => {
  menuTabBar.transShowMenu()

  localStorage.setItem(FRIEND_LIST_KEY, JSON.stringify(friendList))
})
</script>

<style scoped>
.user-item {
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebedf0;
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
  color: #909497;
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
