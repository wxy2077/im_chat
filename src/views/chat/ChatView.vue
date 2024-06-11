<template>
  <div class="chat">
    <van-nav-bar
        fixed
        placeholder
        :title="targetUser.name"
        right-text="..."
        left-arrow
        @click-left="goBack"
    ></van-nav-bar>

    <!--    内容 -->
    <div class="chat-content">
      <template v-for="(item, index) in messageList" :key="index">
        <ChatItem :avatar="item.isRight ? user.avatar : targetUser.avatar"
                  :message="item.message"
                  :isRight="item.isRight">
        </ChatItem>
      </template>
    </div>

    <!--  输入框  -->
    <div class="chat-user-panel">
      <BottomInput @sendMsg="sendMsg"></BottomInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import ChatItem from "./comps/ChatItem.vue";
import BottomInput from "./comps/BottomInput.vue";
import {useWebSocketStore} from '@/stores/websocketStore';

const websocketStore = useWebSocketStore();
const router = useRouter();
const targetUser = history.state.targetUser

const goBack = function () {
  router.go(-1);
};

const user = ref({avatar: ''});

onMounted(() => {
  const token = localStorage.getItem("token")
  if (!websocketStore.isConnected && token) {
    websocketStore.connectWebSocket(import.meta.env.VITE_BASE_WS, token);
  }
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
})


const messageList = reactive([
  {
    isRight: true,
    message: 'hello11'
  },
  {
    isRight: false,
    message: 'hello22'
  }
])

const sendMsg = (msg: string) => {
  messageList.push({
    isRight: true,
    message: msg
  })
  let data = {content_type: 1, content: msg}
  websocketStore.sendMessage(JSON.stringify(data))
}


</script>


<style scoped>
.chat-content {
  margin-bottom: 55px;
}

.chat-user-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 45px;
}

</style>