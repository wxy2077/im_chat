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

  </div>
</template>

<script setup lang="ts">


import {useRouter} from 'vue-router';

const router = useRouter();

const user = history.state.user

const goBack = function () {
  router.go(-1);
};


</script>


<style scoped>

</style>