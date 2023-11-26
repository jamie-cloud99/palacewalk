<template>
  <!-- 目前沒被使用，但仍予保留，未來可能需用到-->
  <div class="h-[260px] mb-[68px] lg:bg-[size:350px,_cover] bg-[size:0px,_cover] bg-no-repeat
    bg-[url('/images/collection/collection-banner.png'),_url('/images/collection/banner-bg.jpg')]
    bg-[position:82%_-50%,_center_bottom]">
    <div class="container relative">
      <h2 class="absolute top-[115px] pl-2 text-3xl font-serif font-bold">{{ title }}</h2>
      <BreadcrumbsComponent class="absolute top-[228px]" :nav-list="breadList"/>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import BreadcrumbsComponent from '../layout/BreadcrumbsComponent.vue'

const props = defineProps({
  title: String,
})
const { title } = toRefs(props)
</script>