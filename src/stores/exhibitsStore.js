import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useCollectionStore } from './collectionStore'

const { VITE_JSON_SERVER } = import.meta.env

export const useExhibitionStore = defineStore('exhibition', () => {
  const exhibitionList = ref([])
  const exhibition = ref({})
  const collectionStore = useCollectionStore()
  const { fetchCollectionsAll } = collectionStore
  const { collectionsAll } = storeToRefs(collectionStore)
  const exhibitionCollections = ref([])

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
    const exhibtionApiUrl = `${VITE_JSON_SERVER}exhibitions/${id}`
    try {
      const res = await axios.get(exhibtionApiUrl)
      exhibition.value = res.data
      fetchExhibitionCollections(res.data.id)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExhibitionCollections = async(id) => {
    if(collectionsAll.value.length === 0) await fetchCollectionsAll()
    const exhibitCollectionsApi = `${VITE_JSON_SERVER}exhibitionCollections?exhibitionId=${id}`
  try {
     const res = await axios.get(exhibitCollectionsApi)
     console.log(res)
    const collectionIdList = res.data[0].collectionId
    exhibitionCollections.value = collectionsAll.value.filter(collection => collectionIdList.some(id => id === collection.id))
    console.log(exhibitionCollections.value)
  } catch (error) {
    console.log(error)
  }
   
  }

  return { pages, exhibitionList, exhibition,exhibitionCollections, turnPage, fetchExhibitionsAll, fetchExhibition, fetchExhibitionCollections }
})
