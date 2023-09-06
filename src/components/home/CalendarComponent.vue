<template>
  <DatePicker
    v-model="curDate"
    locale="zh-tw"
    color="red"
    expanded
    title-position="left"
    trim-weeks
    :min-date="new Date()"
    :attributes="attributes"
    class="!font-serif !bg-light/10 !rounded-none !border-0"
  >
  </DatePicker>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { recoverDate } from '../../composables/format'

const props = defineProps({
  news: Array
})

const curDate = ref('')

const { news } = toRefs(props)

const attributes = computed(() => [
  ...news.value.map((item) => ({
    dates: recoverDate(item.date),
    popover: {
      label: item.title
    },
    highlight: {
      color: 'red',
      fillMode: 'light'
    }
  }))
])
</script>

<style>
.vc-header {
  @apply mb-4 font-bold text-dark;
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
