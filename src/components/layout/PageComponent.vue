<template>
  <nav aria-label="Page navigation">
    <ul class="flex divide-x divide-dark-400 border border-dark-400 text-lg">
      <li v-if="pages.havePre" @click="emit('change', pages.curPage - 1)">
        <RouterLink to="#" class="btn w-12 h-12 hover:bg-dark-200"
          ><i class="align-middle fa-solid fa-chevron-left"></i
        ></RouterLink>
      </li>
      <li
        aria-current="page"
        v-for="i in pages.totalPages"
        :key="'page' + i"
        @click="emit('change', i)"
      >
        <RouterLink
          to="#"
          class="btn w-12 h-12 leading-8"
          href="#!"
          :class="pages.curPage === i ? 'bg-dark text-white' : 'hover:bg-dark-200'"
          >{{ i }}
        </RouterLink>
      </li>
      <li v-if="pages.haveNext" @click="emit('change', pages.curPage + 1)">
        <RouterLink to="#" class="btn w-12 h-12 hover:bg-dark-200" href="#!"
          ><i class="align-middle fa-solid fa-chevron-right"></i
        ></RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  pages: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['change'])

const { pages } = toRefs(props)
</script>
