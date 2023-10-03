import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const pages = ref({
    totalPages: 3,
    curPage: 1,
    havePre: false,
    haveNext: true
  })

   const turnPage = (page) => {
    pages.value.curPage = page
    pages.value.havePre = page > 1
    pages.value.haveNext = page < pages.value.totalPages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return{ pages, turnPage}
})