<template>
  <div class="MenuTabBar" v-show="menuTabBar.showMenu">
    <van-tabbar
        placeholder
        v-model="active"
        @change="changeMenu"
    >
      <van-tabbar-item name="chat" icon="chat-o">聊天</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">好友</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">发现</van-tabbar-item>
      <van-tabbar-item name="home" icon="wap-home-o">主页</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

import {menuTab} from "@/stores/modules/MenuTab";

const menuTabBar = menuTab()

const active = ref('chat');

const changeMenu = (name: string) => {
  active.value = name
}
</script>

<style scoped>

</style>