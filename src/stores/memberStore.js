import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', () => {
  const memberList = ref([{}])

  const member = ref({
    name: '文化探索者',
    email: 'abcd1@gmail.com',
    password: 'er35660d32',
  })

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

  return { member, pages, memberList, turnPage }
})
