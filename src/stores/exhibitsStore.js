import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const { VITE_JSON_SERVER } = import.meta.env

export const useExhibitionStore = defineStore('exhibition', () => {
  const exhibitionList = ref([])
  const exhibition = ref({})

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

  const fetchExhibitionsAll = async () => {
    const apiUrl = `${VITE_JSON_SERVER}exhibitions`
    try {
      const res = await axios.get(apiUrl)
      console.log(res.data)
      exhibitionList.value = res.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExhibition = async (id) => {
    const apiUrl = `${VITE_JSON_SERVER}exhibitions/${id}`
    try {
      const res = await axios.get(apiUrl)
      exhibition.value = res.data
    } catch (error) {
      console.log(error)
    }
  }

  return { pages, exhibitionList, exhibition, turnPage, fetchExhibitionsAll, fetchExhibition }
})
