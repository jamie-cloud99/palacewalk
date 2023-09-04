<template>
  <CollectionBanner :title="'展品介紹'" />
  <div class="container">
    <div class="flex py-10 lg:py-15">
      <PageComponent :pages="pages" @change="turnPage" />
    </div>
  </div>
  <GoToTop />
</template>

<script setup>
// import { reactive } from 'vue'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import GoToTop from '../components/button/GoToTop.vue'
import PageComponent from '../components/layout/PageComponent.vue'

</script>

