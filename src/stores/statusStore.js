import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  const isOpen = ref({
    menu: false,
    notice: false,
    member: false,
    search: false,
    exhibitionMenu: false,
    collectionText: false,
    advancedSearch: false
  })

  const menuClass = ref({
    menu: 'max-0',
    notice: 'max-0',
    member: 'max-0',
    exhibitionMenu: 'max-w-0',
    collectionText: 'max-w-0',
    advancedSearch: 'max-0'
  })
  const exhibitionMenuCount = ref(0)
  const searchTypeList = ref([
    {
      id: 1,
      code: 'exhibitions',
      title: '展覽'
    },
    {
      id: 2,
      code: 'collections',
      title: '展品'
    },
    {
      id: 3,
      code: 'all',
      title: '全部'
    }
  ])
  const searchType = ref(searchTypeList.value[0])
  const searchNum = ref(0)

  const searchedCollectionIds = ref(localStorage.getItem('searchedCollectionIds'))
  const searchedExhibitionIds = ref(localStorage.getItem('searchedExhibitionIds'))

  const hasSearchRecord = ref({
    collections: Boolean(searchedCollectionIds),
    exhibitions: Boolean(searchedExhibitionIds)
  })

  const addSearchNum = () => searchNum.value++

  const toggleMenu = (item) => {
    isOpen.value[item] = !isOpen.value[item]
    // if(item === 'menu') preventBodyScroll()

    for (const key in isOpen.value) {
      if (key !== item) isOpen.value[key] = false
      menuClass.value[key] = isOpen.value[key] ? 'max-h' : 'max-0'
    }
  }

  const toggleSideMenu = (item) => {
    isOpen.value[item] = !isOpen.value[item]

    for (const key in isOpen.value) {
      if (key !== item) isOpen.value[key] = false
      menuClass.value[key] = isOpen.value[key] ? 'max-w' : 'max-w-0 overflow-hidden'
    }
  }

  // todo: Modal 展開時避免背景滾動
  // const preventBodyScroll = () => {
  //   let allowScroll = true
  //   for (const key in isOpen.value) {
  //     if (isOpen.value[key] === true) allowScroll = false
  //   }

  //   if (!allowScroll) {
  //     // When the modal is shown, we want a fixed body
  //     document.body.style.position = 'fixed'
  //     document.body.style.top = `-${window.scrollY}px`
  //   } else {
  //     const scrollY = document.body.style.top
  //     document.body.style.position = 'static'
  //     document.body.style.top = ''
  //     window.scrollTo(0, parseInt(scrollY || '0') * -1)
  //   }
  // }

  const changeSearchType = (typeCode) => {
    searchType.value = searchTypeList.value.find((type) => type.code === typeCode)
  }

  return {
    isOpen,
    menuClass,
    searchType,
    exhibitionMenuCount,
    searchTypeList,
    hasSearchRecord,
    searchNum,
    toggleMenu,
    toggleSideMenu,
    changeSearchType,
    addSearchNum
  }
})
