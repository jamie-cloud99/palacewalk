<template>
  <HeaderComponent v-if="!route.meta.isFullPage" />
  <LoadingComponent v-if="isFullPage"/>
  <RouterView />
  <GoToTop />
  <FooterComponent v-if="!route.meta.isFullPage" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { RouterView, useRoute } from 'vue-router'
import { useMemberStore } from './stores/memberStore'
import { useStatusStore } from './stores/statusStore'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import FooterComponent from './components/layout/FooterComponent.vue'
import GoToTop from './components/button/GoToTop.vue'
import LoadingComponent from './components/layout/LoadingComponent.vue'

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
</script>
