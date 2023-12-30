<template>
  <nav aria-label="Page navigation">
    <ul
      v-if="pages.totalPages > 1"
      class="flex divide-x bg-white divide-dark-400 border border-dark-400 text-lg"
    >
      <li v-if="pages.havePrev">
        <button
          type="button"
          class="btn w-12 h-12 hover:bg-dark-200"
          @click="emit('change', pages.curPage - 1)"
        >
          <i class="align-middle fa-solid fa-chevron-left"></i>
        </button>
      </li>
      <li aria-current="page" v-for="i in pages.totalPages" :key="'page' + i">
        <button
          type="button"
          class="btn w-12 h-12 leading-8"
          :class="pages.curPage === i ? 'bg-dark text-white' : 'hover:bg-dark-200'"
          @click="emit('change', i)"
        >
          {{ i }}
        </button>
      </li>
      <li v-if="pages.haveNext">
        <button
          type="button"
          class="btn w-12 h-12 hover:bg-dark-200"
          @click="emit('change', pages.curPage + 1)"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { toRefs } from 'vue'
const emit = defineEmits(['change'])
const props = defineProps({
  pages: {
    type: Object,
    default: () => ({})
  }
})

const { pages } = toRefs(props)
</script>
