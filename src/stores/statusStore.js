import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', () => {
  const isOpen = ref({
    menu: false,
    notice: false,
    member: false,
    search: false
  })

  const menuClass = ref({
    menu: 'max-0',
    notice: 'max-0'
  })

  const toggleMenu = (item) => {
    isOpen.value[item] = !isOpen.value[item]

    for (const key in isOpen.value) {
      if (key !== item) isOpen.value[key] = false
      menuClass.value[key] = isOpen.value[key] ? 'max-h' : 'max-0'
    }
  }

  return { isOpen, menuClass, toggleMenu }
})
