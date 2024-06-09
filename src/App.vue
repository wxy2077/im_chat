<script setup lang="ts">
import MenuTabBar from './components/common/MenuTabBar.vue';
</script>

<template>
  <header>
    <router-view></router-view>
    <MenuTabBar></MenuTabBar>
  </header>
</template>

<style scoped></style>
