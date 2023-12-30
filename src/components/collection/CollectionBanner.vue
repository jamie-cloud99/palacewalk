<template>
  <div class="h-[260px] mb-[68px] bg-[size:280px,_cover] bg-no-repeat bg-[position:150%_350%,_center_bottom]
    bg-[url('/images/collection/collection-banner.png'),_url('/images/collection/banner-bg.jpg')]
    sm:bg-[position:82%_-50%,_center_bottom] sm:bg-[size:350px,_cover]">
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
  title: {
    type: String,
    default: ""
  },
  breadList: {
    type: Array,
    default: () => []
  },
})
const { title, breadList } = toRefs(props)
</script>