import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  const isOpen = ref({
    menu: false,
    notice: false,
    member: false,
    search: false,
    exhibitionMenu: false,
    collectionText: false
  })

  const menuClass = ref({
    menu: 'max-0',
    notice: 'max-0',
    exhibitionMenu: 'max-w-0',
    collectionText: 'max-w-0'
  })
  const exhibitionMenuCount = ref(0)
  const searchType = ref('展覽')

  const toggleMenu = (item) => {
    isOpen.value[item] = !isOpen.value[item]
    preventBodyScroll()
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

  const preventBodyScroll = () => {
    let allowScroll = true
    for (const key in isOpen.value) {
      if (isOpen.value[key] === true) allowScroll = false
    }

    if (!allowScroll) {
      // When the modal is shown, we want a fixed body
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = 'static'
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }

  const changeSearchType = (type) => {
    searchType.value = type
  }

  return {
    isOpen,
    menuClass,
    searchType,
    exhibitionMenuCount,
    toggleMenu,
    toggleSideMenu,
    changeSearchType
  }
})
