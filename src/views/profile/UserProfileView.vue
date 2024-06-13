<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

const targetUser = history.state.targetUser

const goBack = function () {
  router.go(-1)
}
</script>

<template>
  <van-nav-bar fixed placeholder right-text="+" left-arrow @click-left="goBack"/>
  <div class="user-profile">
    <van-image round class="user-item-img" :src="targetUser.avatar"/>
    <div class="user-info">
      <p class="user-name">昵称: {{ targetUser.username }}</p>
      <p class="user-account">账号: {{ targetUser.account }}</p>
    </div>
  </div>
  <van-cell-group class="cell-group">
    <van-cell title="备注和标签" is-link />
    <van-cell title="朋友权限" is-link />
  </van-cell-group>

  <van-cell-group class="cell-group">
    <van-cell title="朋友圈" is-link />
    <van-cell title="更多信息" is-link />
  </van-cell-group>

  <van-button class="link-user" @click="router.push({ name: 'chat', state: { targetUser } })" block>
    <van-icon name="chat-o" size="15" />  发消息</van-button>

</template>

<style scoped>
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
.cell-group{
  margin-bottom: 10px;
}
.link-user {
  margin-top: 100px;
}
</style>
