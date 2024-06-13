<template>
  <div class="index">
    <van-nav-bar fixed placeholder title="聊天" right-text="+"/>
    <div class="user-list">
      <template v-for="(item, index) in friendList" :key="index">
        <van-swipe-cell>
          <div class="user-item" @click="toChart(item)">
            <van-image round class="user-item-img" :src="item.avatar"/>
            <div class="user-item-container">
              <div class="user-info">
                <span class="name">{{ item.username }}</span>
                <span class="message" v-if="item.content && item.content.length > 12"
                >{{ item.content.slice(0, 12) }}...</span
                >
                <span class="message" v-else>{{ item.content }}</span>
              </div>
              <div class="other-info">
                <span class="time">
                  <DataFormat :date="new Date(item.created_at)"
                              :options="{ showTime: true, showWeek: false }"></DataFormat>

                </span>
              </div>
            </div>
          </div>
          <template #right>
            <van-button style="height: 100%" square type="danger" text="删除"/>
          </template>
        </van-swipe-cell>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {onMounted, onUnmounted, reactive, watch} from 'vue'
import {useMenuTab} from '@/stores/modules/MenuTab'
import {useWebSocketStore} from '@/stores/websocketStore'
import DataFormat from "@/components/common/DataFormat.vue";

import {getFriendList} from '@/api/user'

const websocketStore = useWebSocketStore()

const menuTabBar = useMenuTab()
const router = useRouter()

const friendList = reactive([{id: '', avatar: '', username: '', created_at: '', content: ''}])

const toChart = (item: any) => {
  router.push({
    name: 'chat',
    state: {targetUser: {id: item.id, username: item.username, avatar: item.avatar}}
  })
}

onMounted(() => {
  menuTabBar.active = useRoute().path.slice(1)
  menuTabBar.transShowMenu()

  const token = localStorage.getItem('token')
  if (!websocketStore.isConnected && token) {
    websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token)
  }

  getFriendList().then((res: any) => {
    if (Array.isArray(res.data.list)) {
      Object.assign(friendList, res.data.list)
    }
  })
})

watch(
    () => websocketStore.message,
    (newMessage) => {
      let msg = JSON.parse(newMessage)
      friendList.forEach((friend, index) => {
        if (friend.id === msg.sender_user_id) {
          friend.content = msg.content
        }
      })
    }
)


onUnmounted(() => {
  menuTabBar.transShowMenu()
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
