<script setup lang="ts">
import { useMenuTab } from '@/stores/modules/MenuTab'
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
const menuTabBar = useMenuTab()

onMounted(() => {
  menuTabBar.active = useRoute().path.slice(1)
  menuTabBar.transShowMenu()
})

onUnmounted(() => {
  menuTabBar.transShowMenu()
})
</script>

<template>
  <div class="search">
    <van-nav-bar fixed placeholder title="发现" />
    <van-cell icon="contact-o" title="朋友圈" is-link color="" />
  </div>
</template>

<style scoped></style>
