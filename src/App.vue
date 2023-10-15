<template>
  <HeaderComponent v-if="!route.meta.isFullPage" />
  <RouterView />
  <GoToTop />
  <FooterComponent v-if="!route.meta.isFullPage" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import FooterComponent from './components/layout/FooterComponent.vue'
import GoToTop from './components/button/GoToTop.vue'
import { useMemberStore } from './stores/memberStore'

const route = useRoute()
const memberStore = useMemberStore()
const { checkLogin, fetchFavorites } = memberStore
const { isLoggedIn } = storeToRefs(memberStore)

;(async () => {
  await checkLogin()
  if (isLoggedIn.value) fetchFavorites()
})()
</script>
