import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStatusStore } from './statusStore'

export const useToastStore = defineStore('toastStore', () => {
  const statusStore = useStatusStore()
  const { setLoading } = statusStore
  const message = ref({})
  const count = ref(0)

  const handleError = () => {
    setLoading()
    pushMessage({
      style: 'error',
      content: '糟糕！發生錯誤，請稍後再試'
    })
  }
  const showSuccessToast = (message) => {
    pushMessage({
      style: 'success',
      content: message
    })
  }
  const showFailToast = (message) => {
    setLoading()
    pushMessage({
      style: 'error',
      content: message
    })
  }
  const pushMessage = (res) => {
    count.value++
    message.value = res
  }

  return {
    message,
    count,
    handleError,
    showSuccessToast,
    showFailToast
  }
})
