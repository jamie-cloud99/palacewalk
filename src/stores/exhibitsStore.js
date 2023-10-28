import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
// import { usePageStore } from './pageStore'

import { useCollectionStore } from './collectionStore'
import { SORT_ORDER } from '../utils/constant/sort'
import { useCommentStore } from './commentStore'
import { useStatusStore } from './statusStore'

const { VITE_JSON_SERVER } = import.meta.env

export const useExhibitionStore = defineStore('exhibition', () => {
  // const pageStore = usePageStore()
  // const { turnPage, paginate } = pageStore

  const collectionStore = useCollectionStore()
  const { fetchCollectionsAll } = collectionStore
  const { collectionsAll } = storeToRefs(collectionStore)

  const commentStore = useCommentStore()
  const { fetchComments } = commentStore

  const statusStore = useStatusStore()
  const { hasSearchRecord } = storeToRefs(statusStore)

  const exhibitionsAll = ref([])
  const exhibitionList = ref([])
  const exhibition = ref({})
  const exhibitionsFiltered = ref([])

  const exhibitionCollections = ref([])

  const exhibitionCategories = ref([
    {
      code: 'mix',
      title: '綜合'
    },
    {
      code: 'artifact',
      title: '文物'
    },
    {
      code: 'art',
      title: '藝術'
    }
  ])

  const menuContent = ref([
    {
      code: 'recent',
      title: '當期展覽'
    },
    {
      code: 'coming',
      title: '近期展覽'
    }
  ])
  const curMenuItem = ref(menuContent.value[0])

  const fetchExhibitionsAll = async () => {
    const apiUrl = `${VITE_JSON_SERVER}exhibitions`
    try {
      const res = await axios.get(apiUrl)
      exhibitionsAll.value = res.data
      exhibitionList.value = res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateExhibitionPeriod = (item) => {
    curMenuItem.value = item
    updateExhibitionList()
  }

  const updateExhibitionList = async () => {
    if (exhibitionsAll.value.length === 0) await fetchExhibitionsAll()
    const today = new Date()
    const todayTimestamp = Math.floor(today.getTime() / 1000)
    const threeMonthsLater = new Date(today)
    threeMonthsLater.setMonth(today.getMonth() + 3)
    const threeMonthsTimestamp = Math.floor(threeMonthsLater.getTime() / 1000)

    if (curMenuItem.value.code === 'recent') {
      exhibitionList.value = exhibitionsAll.value.filter(
        (exhibition) =>
          exhibition.startDate <= todayTimestamp && exhibition.endDate >= todayTimestamp
      )
    } else {
      exhibitionList.value = exhibitionsAll.value.filter(
        (exhibition) =>
          exhibition.startDate >= todayTimestamp && exhibition.startDate <= threeMonthsTimestamp
      )
    }
  }

  const fetchExhibition = async (id) => {
    const exhibtionApiUrl = `${VITE_JSON_SERVER}exhibitions/${id}`
    try {
      const res = await axios.get(exhibtionApiUrl)
      exhibition.value = res.data
      await fetchComments(id)
      await fetchExhibitionCollections(res.data.id)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExhibitionCollections = async (id) => {
    if (collectionsAll.value.length === 0) await fetchCollectionsAll()
    const exhibitCollectionsApi = `${VITE_JSON_SERVER}exhibitionCollections?exhibitionId=${id}`
    try {
      const res = await axios.get(exhibitCollectionsApi)
      const collectionIdList = res.data[0].collectionId

      // Sort the filtered array to match collectionIdList order.
      const idToIndexMap = {}
      collectionIdList.forEach((id, index) => {
        idToIndexMap[id] = index
      })

      exhibitionCollections.value = collectionsAll.value
        .filter((collection) => collection.id in idToIndexMap)
        .sort((a, b) => idToIndexMap[a.id] - idToIndexMap[b.id])
    } catch (error) {
      console.log(error)
    }
  }

  const filterExhibitions = async (conditions) => {
    if (!exhibitionsAll.value.length) await fetchExhibitionsAll()

    const filteredExhibtions = exhibitionsAll.value.filter(
      (exhibition) =>
        (!conditions.title || exhibition.title.includes(conditions.title)) &&
        exhibition.category.code === conditions.categoryId
    )
    if (conditions.sort) {
      conditions.sort === SORT_ORDER.fromNewest
        ? filteredExhibtions.sort((a, b) => b - a)
        : filteredExhibtions.sort((a, b) => a - b)
    }

    storeFilteredExhibitions(filteredExhibtions)
  }

  const storeFilteredExhibitions = (filteredExhibitions) => {
    exhibitionsFiltered.value = filteredExhibitions

    if (filteredExhibitions.length) {
      const exhibitionStore = JSON.stringify(filteredExhibitions.map((exhibition) => exhibition.id))
      localStorage.setItem('searchedExhibitionIds', exhibitionStore)
    }
  }

  const searchExhibitions = async (keyword) => {
    const apiUrl = `${VITE_JSON_SERVER}exhibitions?q=${keyword}`
    try {
      const res = await axios.get(apiUrl)
      storeFilteredExhibitions(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExhibitionsRecord = async () => {
    const searchedExhibitionIds = localStorage.getItem('searchedExhibitionIds')
    hasSearchRecord.value.exhibitions = Boolean(searchedExhibitionIds)
    const exhibitionIds = searchedExhibitionIds ? [...JSON.parse(searchedExhibitionIds)] : []

    if (exhibitionIds.length) {
      if (!exhibitionsAll.value.length) await fetchExhibitionsAll()
      exhibitionsFiltered.value = exhibitionsAll.value.filter((exhibition) =>
        exhibitionIds.some((id) => id === exhibition.id)
      )
    }
  }

  return {
    exhibitionsAll,
    exhibitionList,
    exhibition,
    exhibitionCollections,
    menuContent,
    curMenuItem,
    exhibitionsFiltered,
    exhibitionCategories,
    updateExhibitionPeriod,
    fetchExhibitionsAll,
    fetchExhibition,
    fetchExhibitionCollections,
    filterExhibitions,
    searchExhibitions,
    fetchExhibitionsRecord
  }
})
