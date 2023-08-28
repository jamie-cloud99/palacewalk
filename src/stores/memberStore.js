import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', () => {
  const member = ref(
    {
      name: '王曉明', 
      email: 'abcd1@gmail.com',
      password: 'er35660d32'
    }
  )

  return { member }
})
