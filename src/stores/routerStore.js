import { useRoute, useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useRouterStore = defineStore('router', () => {
  const route = useRoute()
  const router = useRouter()

  const collectionId = computed(() => {
  return route.params.collectionId
})

  const exhibitionId = computed(() => {
    return route.params.exhibitionId
  })

  const goPreviousPage = () => {
    router.back()
  }

  return { route, collectionId, exhibitionId, goPreviousPage }
})
