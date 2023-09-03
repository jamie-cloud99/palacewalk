<template>
  <ol class="flex">
    <li v-for="(item, index) in navList" :key="item.title">
      <RouterLink
        :to="item.path"
        class="inline-block px-2 font-medium"
        :class="{'hover:text-primary hover:underline': item.title }"
        >{{ item.title }}</RouterLink
      >
      <span v-if="index !== navList.length - 1">></span>
    </li>
  </ol>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  navList: Array
})

const { navList } = toRefs(props)
</script>
