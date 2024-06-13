<script setup lang="ts">
import { computed } from 'vue';

interface DateFormatOptions {
  showTime?: boolean;
  showWeek?: boolean;
}

type DateProp = Date;

const props = defineProps<{
  date: DateProp;
  options?: DateFormatOptions;
}>();

const formattedDate = computed(() => formatDate(props.date, props.options));

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = 7 * ONE_DAY;
const HALF_YEAR = 182 * ONE_DAY;

function formatDate(date: Date, options: DateFormatOptions = {}) {
  const { showTime = true, showWeek = true } = options;
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const formatTime = (d: Date) => `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  const formatDate = (d: Date) => `${d.getMonth() + 1}月${d.getDate()}日`;
  const formatFullDate = (d: Date) => `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;

  if (diff < ONE_DAY) {
    return `今天 ${showTime ? formatTime(date) : ''}`.trim();
  } else if (diff < 2 * ONE_DAY) {
    return `昨天 ${showTime ? formatTime(date) : ''}`.trim();
  } else if (diff < ONE_WEEK) {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[date.getDay()];
    return showWeek ? `${weekday} ${formatDate(date)}` : formatDate(date);
  } else if (diff < HALF_YEAR) {
    return formatFullDate(date);
  } else {
    return formatFullDate(date);
  }
}
</script>

<template>
  <span>{{ formattedDate }}</span>
</template>

<style scoped>
</style>
