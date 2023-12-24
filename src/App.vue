<template>
  <!-- 初次載入的 loading -->
  <div class="bg-black h-screen z-[190] absolute" :style="{ opacity: opacityComputed }"></div>
  <div
    class="text-5xl text-black absolute z-[200] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-100px)]"
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

const int = setInterval(blurring, 10) // 每 10 毫秒增加 1%
</script>

<style scoped>
.bg {
  background: white;
  opacity: 0.5;
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(0px);
  z-index: 250;
}
.loading-text {
  font-size: 50px;
  /* color: white; */
}

</style>
