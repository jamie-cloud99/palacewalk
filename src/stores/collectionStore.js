import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { usePageStore } from './pageStore'
import { useStatusStore } from './statusStore'
import { COLLECTION_CATEGORIES } from '../utils/constant/collection/collection'

const { VITE_JSON_SERVER } = import.meta.env

export const useCollectionStore = defineStore('collection', () => {
  const pageStore = usePageStore()
  const { turnPage, paginate } = pageStore

  const statusStore = useStatusStore()
  const { hasSearchRecord } = storeToRefs(statusStore)

  const route = useRoute()
  const router = useRouter()

  const categoryList = ref([
    {
      id: 100,
      code: 'all',
      title: '全部'
    }
  ])

  const dynastyList = ref([
    '夏',
    '商',
    '周',
    '秦',
    '漢',
    '魏晉南北朝',
    '隋',
    '唐',
    '五代',
    '宋',
    '元',
    '明',
    '清',
    '民國'
  ])

  const masterpieceIds = ref([
    2, 4, 10, 11, 15, 16, 17, 18, 20, 22, 24, 28, 29, 31, 35, 43, 45, 48, 44, 50, 54, 56
  ])

  const collectionsAll = ref([])
  const collectionList = ref([]) // 當前頁面渲染清單(page limit)
  const collection = ref({})
  const curCategory = ref(categoryList.value[0])
  const categoryAllId = ref(COLLECTION_CATEGORIES.category.all)
  const collectionsFiltered = ref([])
  const relatedCollectionList = ref()
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

  const fetchRelatedCollections = async () => {
    const {
      value: { id: collectionId, collectionCategoryId: categoryId }
    } = collection

    const apiUrl = `${VITE_JSON_SERVER}collections?collectionCategoryId=${categoryId}`
    try {
      const res = await axios.get(apiUrl)
      relatedCollectionList.value = res.data
        .filter((collection) => collection.id !== collectionId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
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
    const { dynasties, title, author, categoryId } = conditions
    const dynastySelected = Object.keys(dynasties).filter((item) => dynasties[item])
    const filteredCollections = collectionsAll.value.filter((collection) => {
      const {
        title: collectionTitle,
        author: collectionAuthor,
        collectionCategoryId,
        dynasty: collectionDynasty
      } = collection

      return (
        (!title || collectionTitle.includes(title)) &&
        (!author || collectionAuthor.includes(author)) &&
        (!categoryId ||
          categoryId === categoryAllId.value ||
          collectionCategoryId === categoryId) &&
        (!dynastySelected.length || dynastySelected.includes(collectionDynasty))
      )
    })

    storeFilteredCollections(filteredCollections)
  }

  const storeFilteredCollections = (filteredCollections) => {
    collectionsFiltered.value = filteredCollections
    if (filterCollections.length) {
      const collectionStore = JSON.stringify(filteredCollections.map((collection) => collection.id))
      localStorage.setItem('searchedCollectionIds', collectionStore)
    }
  }

  const searchCollections = async (keyword) => {
    const apiUrl = `${VITE_JSON_SERVER}collections?q=${keyword}`
    try {
      const res = await axios.get(apiUrl)
      storeFilteredCollections(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCollectionsRecord = async () => {
    const searchedCollectionIds = localStorage.getItem('searchedCollectionIds')
    hasSearchRecord.value.collections = Boolean(searchedCollectionIds)
    const collectionIds = searchedCollectionIds ? [...JSON.parse(searchedCollectionIds)] : []
    filterCollectionsByIds(collectionIds)
  }

  const filterCollectionsByIds = async (collectionIds) => {
    if (collectionIds.length) {
      if (!collectionsAll.value.length) await fetchCollectionsAll()
      collectionsFiltered.value = collectionsAll.value.filter((collection) =>
        collectionIds.some((id) => id === collection.id)
      )
    }
  }

  return {
    collectionsAll,
    collectionList,
    collection,
    categoryList,
    curCategory,
    route,
    collectionDetail,
    collectionsFiltered,
    dynastyList,
    masterpieceIds,
    relatedCollectionList,
    fetchCollectionsAll,
    fetchPageCollections,
    fetchCategoryList,
    selectCategory,
    fetchCollection,
    filterCollections,
    searchCollections,
    fetchCollectionsRecord,
    filterCollectionsByIds,
    fetchRelatedCollections
  }
})
