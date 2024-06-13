<script setup lang="ts">
import {useMenuTab} from '@/stores/modules/MenuTab'
import {onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router";
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
  <div>
    TODO搜索
  </div>
</template>

<style scoped>

</style>