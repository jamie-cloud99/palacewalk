import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const pages = ref({
    totalPages: 3,
    curPage: 1,
    havePrev: false,
    haveNext: true
  })

   const turnPage = (page) => {
    pages.value.curPage = page
    pages.value.havePre = page > 1
    pages.value.haveNext = page < pages.value.totalPages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const paginate = (items, curPage = 1, perPage = 12) => {
    const totalPages = Math.ceil(items.length / perPage)
      if (curPage > totalPages) {
        curPage = totalPages
      }

      const minIndex = (curPage - 1) * perPage
      const maxIndex = curPage * perPage
      const itemPaginated = items.slice(minIndex, maxIndex)

      const page = {
        curPage,
        totalPages,
        havePrev: curPage > 1,
        haveNext: curPage < totalPages
      }

      pages.value = { ...page }
      return [...itemPaginated]
  }

  return{ pages, turnPage, paginate}
})