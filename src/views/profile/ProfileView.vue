<script setup lang="ts">
import { useMenuTab } from '@/stores/modules/MenuTab'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { USER } from '@/utils/globalConsts'
import { type UserInfo } from '@/types/users'

const menuTabBar = useMenuTab()

const targetUser = ref<UserInfo>({} as UserInfo)

onMounted(() => {
  menuTabBar.active = useRoute().path.slice(1)
  menuTabBar.transShowMenu()

  const userData = localStorage.getItem(USER)
  if (userData) {
    targetUser.value = JSON.parse(userData)
  }
})

onUnmounted(() => {
  menuTabBar.transShowMenu()
})
</script>

<template>
  <van-nav-bar fixed placeholder :border="false" />
  <div class="user-item">
    <div class="user-profile">
      <van-image round class="user-item-img" :src="targetUser.avatar" />
      <div class="user-info">
        <p class="user-name">昵称: {{ targetUser.username }}</p>
        <p class="user-account">账号: {{ targetUser.account }}</p>
      </div>
    </div>
    <div class="user-detail">
      <van-icon name="arrow" />
    </div>
  </div>

  <van-cell-group class="cell-group">
    <van-cell icon="passed" title="服务" is-link />
  </van-cell-group>

  <van-cell-group class="cell-group">
    <van-cell icon="star-o" title="收藏" is-link />
    <van-cell icon="contact-o" title="朋友圈" is-link />
    <van-cell icon="coupon-o" title="卡包" is-link />
    <van-cell icon="smile-o" title="表情" is-link />
  </van-cell-group>
  <van-cell-group class="cell-group">
    <van-cell icon="setting-o" title="设置" is-link />
  </van-cell-group>
</template>

<style scoped>
.user-item {
  display: flex;
  justify-content: space-between;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 30px;
}

.user-item-img {
  margin-right: 16px;
  width: 100px;
  height: 100px;
  border-radius: 10%;
  overflow: hidden;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name,
.user-account {
  margin: 5px;
  font-size: medium;
}

.user-detail {
  margin-right: 30px;
  display: flex;
  align-items: center;
}

.cell-group {
  margin-bottom: 10px;
}
</style>
