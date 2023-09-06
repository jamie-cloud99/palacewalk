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

  const toggleMenu = (item) => {
    isOpen.value[item] = !isOpen.value[item]

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

  return { isOpen, menuClass, exhibitionMenuCount, toggleMenu, toggleSideMenu }
})
