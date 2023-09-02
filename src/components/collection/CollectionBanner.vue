<template>
  <div class="h-[260px] mb-[68px] lg:bg-[size:350px,_cover] md:bg-[size:0px,_cover] bg-no-repeat
    bg-[url('/images/collection/collection-banner.png'),_url('/images/collection/banner-bg.jpg')]
    bg-[position:82%_-50%,_center_bottom]">
    <div class="container relative">
      <h1 class="absolute top-[115px] pl-2 text-3xl font-serif font-bold">{{ title }}</h1>
      <BreadcrumbsComponent class="absolute top-[228px]" :nav-list="breadList"/>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { toRefs } from 'vue'
import BreadcrumbsComponent from '../layout/BreadcrumbsComponent.vue'

const props = defineProps({
  title: String,
})
const { title } = toRefs(props)

const breadList = reactive([
  {
    title: '首頁',
    path: '/'
  },
  {
    title: '藝術展品',
    path: '/collections'
  },
  {
    title,
    path: '/collections/masterpieces'
  }
])
</script>