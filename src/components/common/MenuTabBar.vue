<template>
  <div class="MenuTabBar" v-show="menuTabBar.showMenu">
    <van-tabbar placeholder v-model="menuTabBar.active" @change="changeMenu">
      <van-tabbar-item name="chat-list" icon="chat-o">聊天</van-tabbar-item>
      <van-tabbar-item name="friend" icon="friends-o">好友</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">发现</van-tabbar-item>
      <van-tabbar-item name="profile" icon="wap-home-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useMenuTab } from '@/stores/modules/MenuTab'

const router = useRouter()
const menuTabBar = useMenuTab()

const changeMenu = (name: string) => {
  menuTabBar.active = name
  router.push('/' + name)
}
</script>

<style scoped></style>
