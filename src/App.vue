<template>
  <HeaderComponent v-if="!route.meta.isFullPage" />
  <RouterView />
  <GoToTop/>
  <FooterComponent v-if="!route.meta.isFullPage" />
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import FooterComponent from './components/layout/FooterComponent.vue'
import GoToTop from './components/button/GoToTop.vue'

const route = useRoute()
</script>
