<template><div></div></template>

<script setup>
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useToastStore } from '@/stores/toastStore'
import { useToast } from 'vue-toastification'

const toastStore = useToastStore()
const { message, count } = storeToRefs(toastStore)

const createToast = () => {
  if (message.value.style) {
    const toast = useToast()
    toast[message.value.style](message.value.content)
    return { toast }
  }
}

watch(
  () => count,
  () => createToast(),
  { deep: true }
)
</script>
