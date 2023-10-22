import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { usePageStore } from './pageStore'
import { COLLECTION_CATEGORIES } from '../utils/constant/collection/collection'

const { VITE_JSON_SERVER } = import.meta.env

export const useCollectionStore = defineStore('collection', () => {
  const pageStore = usePageStore()
  const { turnPage, paginate } = pageStore

  const route = useRoute()
  const router = useRouter()

  const categoryList = ref([
    {
      id: 100,
      code: 'all',
      title: '全部'
    }
  ])

  const collectionsAll = ref([])
  const collectionList = ref([]) // 當前頁面渲染清單(page limit)
  const collection = ref({})
  const curCategory = ref(categoryList.value[0])
  const categoryAllId = ref(COLLECTION_CATEGORIES.category.all)
  const collectionsFiltered = ref([])

  const masterPeiceList = ref([
    {
      id: '401',
      collectionId: 'K004',
      title: '緙繡九羊啟泰 軸',
      author: '不詳',
      time: '清',
      images: {
        main: '/images/collection/collection-K004.jpg'
      }
    },
    {
      id: '14',
      collectionId: 'P014',
      title: '畫春花三種 軸',
      author: '錢維城',
      time: '清',
      images: {
        main: '/images/collection/collection-P014.jpg'
      }
    },
    {
      id: '15',
      collectionId: 'P015',
      title: '奔馬行空　單片',
      author: '徐悲鴻',
      time: '民國',
      images: {
        main: '/images/collection/collection-P015.jpg'
      }
    },
    {
      id: '16',
      collectionId: 'P016',
      title: '翠巘高秋圖　軸',
      author: '愛新覺羅弘旿',
      time: '清',
      images: {
        main: '/images/collection/collection-P016.jpg'
      }
    },
    {
      id: '18',
      collectionId: 'P018',
      title: '畫山水 軸',
      author: '趙孟頫',
      time: '元',
      images: {
        main: '/images/collection/collection-P018.jpg'
      }
    }
  ])

  const collectionDetail = ref([])

  const totalCollections = computed(() => {
    return collectionsAll.value.length
  })

  const fetchCategoryList = async () => {
    const apiUrl = `${VITE_JSON_SERVER}collectionCategories`
    try {
      const res = await axios.get(apiUrl)
      if (categoryList.value.length === 1) categoryList.value = [...categoryList.value, ...res.data]
      await updateCategoryNum()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCollectionsAll = async () => {
    const apiUrl = `${VITE_JSON_SERVER}collections`
    try {
      const res = await axios.get(apiUrl)
      collectionsAll.value = res.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPageCollections = async (
    categoryId = categoryAllId.value,
    curPage = 1,
    limit = 12
  ) => {
    const isCategoryAll = categoryId === categoryAllId.value
    const apiUrl = isCategoryAll
      ? `${VITE_JSON_SERVER}collections?_page=${curPage}&_limit=${limit}`
      : `${VITE_JSON_SERVER}collections?collectionCategoryId=${categoryId}`
    try {
      const res = await axios.get(apiUrl)
      if (isCategoryAll) {
        collectionList.value = res.data
        if (collectionsAll.value.length === 0) await fetchCollectionsAll()
        paginate(collectionsAll.value, curPage)
      } else {
        collectionList.value = paginate(res.data, curPage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCollection = async (collectionId) => {
    const apiUrl = `${VITE_JSON_SERVER}collections/${collectionId}`
    try {
      const res = await axios.get(apiUrl)
      collection.value = res.data
      const {
        title,
        author,
        time,
        detail: { material, theme, dimensions }
      } = collection.value
      collectionDetail.value = [
        {
          title: '品名',
          content: title
        },
        {
          title: '作者',
          content: author
        },
        {
          title: '創作年代',
          content: time
        },
        {
          title: '材質',
          content: material
        },
        {
          title: '主題類型',
          content: theme
        },
        {
          title: '尺寸',
          content: dimensions
        }
      ]
    } catch (error) {
      console.log(error)
    }
  }

  const updateCategoryNum = async () => {
    if (totalCollections.value === 0) await fetchCollectionsAll()
    categoryList.value[0].num = totalCollections.value
    collectionsAll.value.forEach((element) => {
      const index = categoryList.value.findIndex(
        (category) => category.id === element.collectionCategoryId
      )
      categoryList.value[index].num = (categoryList.value[index].num || 0) + 1
    })
  }

  const selectCategory = (category) => {
    curCategory.value = category
    router.push({ path: `${route.path}`, query: { category: category.title } })
    fetchPageCollections(category.id)
    turnPage(1)
  }

  const filterCollections = async (conditions) => {
    if (!collectionsAll.value.length) await fetchCollectionsAll()

    const filteredCollections = collectionsAll.value.filter(
      (collection) =>
        (!conditions.title || collection.title.includes(conditions.title)) &&
        (!conditions.author || collection.author.includes(conditions.author)) &&
        (!conditions.categoryId ||
          conditions.categoryId === categoryAllId.value ||
          collection.collectionCategoryId === conditions.categoryId)
    )

    collectionsFiltered.value = filteredCollections

    // if(conditions.sort) {
    //   if(conditions.sort === "1") {
    //     collectionsFiltered.value.sort((a, b) => a-b)
    //   }
    // }
  }

  return {
    collectionsAll,
    collectionList,
    collection,
    categoryList,
    curCategory,
    route,
    collectionDetail,
    masterPeiceList,
    collectionsFiltered,
    fetchCollectionsAll,
    fetchPageCollections,
    fetchCategoryList,
    selectCategory,
    fetchCollection,
    filterCollections
  }
})
