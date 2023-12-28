<template>
  <!-- 初次載入/重整 loading -->
  <div
    class="text-5xl text-black fixed z-[3000] top-1/2 left-1/2
    -translate-x-1/2 -translate-y-[calc(50%-100px)] pointer-events-none"
    :style="{ opacity:  opacityComputed }">
    {{ load }} %
  </div>
  <HeaderComponent v-if="!route.meta.isFullPage" />
  <LoadingComponent v-if="isFullPage" />
  <RouterView />
  <GoToTop />
  <FooterComponent v-if="!route.meta.isFullPage" />
  <ToastMessages />
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView, useRoute } from 'vue-router'
import { useMemberStore } from './stores/memberStore'
import { useStatusStore } from './stores/statusStore'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import FooterComponent from './components/layout/FooterComponent.vue'
import GoToTop from './components/button/GoToTop.vue'
import LoadingComponent from './components/layout/LoadingComponent.vue'
import ToastMessages from './components/layout/ToastMessages.vue'

const statusStore = useStatusStore()
const { isFullPage } = storeToRefs(statusStore)

const route = useRoute()
const memberStore = useMemberStore()
const { checkLogin, fetchFavorites } = memberStore
const { isLoggedIn } = storeToRefs(memberStore)

;(async () => {
  await checkLogin()
  if (isLoggedIn.value) fetchFavorites()
})()

const load = ref(0); // % 數的呈現

const opacityComputed = computed(() => {
  return 1 - load.value / 100
})

const blurring = () => {
  load.value ++
  if (load.value > 99) {
    clearInterval(int)
  }
}

const int = setInterval(blurring, 5) // 每 5 毫秒增加 1%
</script>
