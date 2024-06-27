<script setup lang="ts">
import MenuTabBar from './components/common/MenuTabBar.vue'
</script>

<template>
  <header>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <router-view></router-view>
    <MenuTabBar></MenuTabBar>
  </header>
</template>

<style scoped>

.floating-element {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.floating-element:nth-child(1) {
  width: 80px;
  height: 80px;
  top: 25px;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}
.floating-element:nth-child(2) {
  width: 80px;
  height: 80px;
  top: 95rex;
  right: -25px;
  animation: float 6s ease-in-out infinite;
}
.floating-element:nth-child(3) {
  width: 100px;
  height: 100px;
  top: 13rex;
  right: 40%;
  animation: float 6s ease-in-out infinite;
}
</style>
