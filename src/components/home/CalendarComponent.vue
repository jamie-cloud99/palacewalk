<template>
  <DatePicker
    v-model="date"
    locale="zh-tw"
    color="red"
    expanded
    title-position="left"
    trim-weeks
    :min-date="new Date()"
    :attributes="attributes"
  >
    <template #day-popover>
      <div class="text-xs text-dark-800 font-sans">Using my own content now</div>
    </template>
  </DatePicker>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const date = ref(new Date())
// const tempAnnouncement = ref('活動通知吱吱吱吱吱吱')
const attributes = ref([
  {
    highlight: {
      color: 'red',
      fillMode: 'light'
    },
    dates: [new Date(2023, 7, 29), new Date(2023, 8, 10), new Date(2023, 8, 2)],
    popover: {
       visibility: 'hover',
    }
  }
])


</script>

<style>
.vc-header {
  @apply mb-4;
}

.vc-weeks {
  @apply space-y-4 pb-3;
}

.vc-day-content {
  @apply w-full;
}

.vc-day-content:focus {
  @apply ring-0;
}

.vc-day-content:hover {
  @apply ring-primary/60;
}

.vc-day-content.vc-disabled {
  @apply cursor-default;
}

.vc-day-content.vc-disabled:hover {
  @apply bg-white;
}
</style>
