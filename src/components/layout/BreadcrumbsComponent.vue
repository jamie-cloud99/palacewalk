<template>
  <ol class="flex flex-wrap">
    <li v-for="(item, index) in navList" :key="item.title" class="whitespace-nowrap">
      <RouterLink
        :to="item.path"
        class="inline-block px-2 font-medium last:pr-0"
        :class="{
          'hover:underline': item.title,
          '!no-underline cursor-text': item.path === route.path
        }"
        >{{ item.title }}</RouterLink
      >
      <span v-if="index !== navList.length - 1">></span>
    </li>
  </ol>
</template>

<script setup>
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  navList: Array
})

const { navList } = toRefs(props)
</script>
