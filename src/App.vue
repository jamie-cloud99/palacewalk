<template>
  <HeaderComponent v-if="!route.meta.isFullPage" />
  <RouterView />
  <FooterComponent v-if="!route.meta.isFullPage" />
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import FooterComponent from './components/layout/FooterComponent.vue'

const route = useRoute()
</script>
