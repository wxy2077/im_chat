<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  msg: string
}>()

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <main>
    <text>Person {{ msg }}</text>
    <button @click="increment">
      {{ count }}
    </button>
  </main>
</template>

<style scoped></style>
