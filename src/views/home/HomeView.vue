<template>
  <div class="index">
    <van-nav-bar
        fixed
        placeholder
        title="聊天"
        right-text="+"
        left-arrow
    />
    <div class="user-list">
      <template v-for="(item, index) in friendList" :key="index">
        <van-swipe-cell>
          <div class="user-item" @click="toChart(item)">
            <van-image round class="user-item-img" :src="item.avatar"/>
            <div class="user-item-container">
              <div class="user-info">
                <span class="name">{{ item.name }}</span>
                <span class="message">{{ item.userId }}</span>
              </div>
              <div class="other-info">
                <span class="time">{{ item.time }}</span>
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
import {useRouter} from "vue-router";
import {onMounted, onUnmounted} from "vue";
import {useMenuTab} from "@/stores/modules/MenuTab";
import { useWebSocketStore } from '@/stores/websocketStore';

const websocketStore = useWebSocketStore();

const menuTabBar = useMenuTab()
const router = useRouter()

const friendList = [{
  name: "Tom",
  avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
  userId: 2,
  time: "2022-12-12 12:12:12",
}, {
  name: "Jerry",
  avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
  userId: 3,
  time: "2022-12-12 12:12:12",
}]

const toChart = (item: any) => {
  router.push({
    name: 'chat',
    state: {user: item}
  })
}

onMounted(() => {
  const token =localStorage.getItem("token")
  if(!websocketStore.isConnected && token) {
    websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token);
  }
})


onMounted(() => {
  menuTabBar.transShowMenu()
})

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
  position: relative;
  top: -5px;
}

.user-info > .message {
  font-size: 14px;
  color: #909497;
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