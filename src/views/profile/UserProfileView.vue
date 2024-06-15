<script setup lang="ts">
import { useRouter } from 'vue-router'
import {onMounted, ref} from "vue";
import {userInfo} from "@/api/user";
import type {UserInfo} from "@/types/users";

const router = useRouter()

let targetUser = history.state.targetUser

const user = ref<UserInfo>({} as UserInfo)

onMounted(() => {
  user.value = targetUser

  if (!targetUser.username) {
    userInfo({ friend_user_id: targetUser.id }).then((res: any) => {
      console.log(res);
      if (res.data) {
        user.value = res.data
      }
    })
  }
})

const goBack = function () {
  router.go(-1)
}

const goToChat = function () {
  router.push({ name: 'chat', state: { targetUser } })
}
</script>

<template>
  <van-nav-bar fixed placeholder right-text="+" left-arrow @click-left="goBack" />
  <div class="user-profile">
    <van-image round class="user-item-img" :src="user.avatar" />
    <div class="user-info">
      <p class="user-name">昵称: {{ user.username }}</p>
      <p class="user-account">账号: {{ user.account }}</p>
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

  <van-button class="link-user" @click="goToChat" block>
    <van-icon name="chat-o" size="15" /> 发消息</van-button
  >
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
.cell-group {
  margin-bottom: 10px;
}
.link-user {
  margin-top: 100px;
}
</style>
