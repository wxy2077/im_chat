<template>
  <div class="chat">
    <van-nav-bar
        fixed
        placeholder
        :title="user.name"
        right-text="..."
        left-arrow
        @click-left="goBack"
    ></van-nav-bar>

    <!--    内容 -->
    <div class="chat-content">
      <template v-for="(item, index) in messageList" :key="index">
        <ChatItem :avatar="user.avatar" :message="item.message" :isRight="item.isRight" ></ChatItem>
      </template>
    </div>

    <!--  输入框  -->
    <div class="chat-user-panel">
      <BottomInput></BottomInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import ChatItem from "./comps/ChatItem.vue";
import BottomInput from "./comps/BottomInput.vue";

const router = useRouter();
const user = history.state.user

const goBack = function () {
  router.go(-1);
};

const messageList = [
  {
    isRight: true,
    message: 'hello11'
  },
  {
    isRight: false,
    message: 'hello22'
  }
]

let msg = ref('');


</script>


<style scoped>
.chat-content{
  margin-bottom: 55px;
}

.chat-user-panel{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 45px;
}

</style>