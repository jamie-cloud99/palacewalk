<template>
  <div class="container">
    <BreadcrumbsComponent class="my-5 justify-end" :nav-list="breadList"/>
  </div>
  <div class="container relative lg:flex gap-6">
    <CollectionImageSlides />
    <!-- 詳細資訊  -->
    <div v-show="windowInnerWidth > breakPoint" class="bg-dark-200 text-dark-800 pb-6 my-10 lg:mb-20 ">
      <div class="container">
        <div class="px-2 md:w-4/5 2xl:w-3/5 mx-auto">
          <ul class="">
            <li v-for="item in collectionDetail" :key="item.title" class="col-span-12 md:col-span-6">
              <div class="flex gap-y-2 pt-6 pb-3 border-b border-dark-800 border-dashed h-full">
                <h4 class="w-20 font-semibold shrink-0">{{ item.title }}</h4>
                <p class="px-2">{{ item.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- 簡介 -->
  <article class="px-2 md:w-4/5 2xl:w-3/5 mx-auto mb-8">
    <h2 class="text-2xl lg:text-3xl font-bold mb-1 md:mb-0">{{ collection.title }}</h2>
    <div
      class="md:flex justify-between items-center border-black border-solid border-0 border-b mb-2"
    >
      <div class="text-dark-600 font-semibold">
        <span class="mr-4">{{ collection.author }}</span>
        <span class="text-sm">{{ collection.time }}</span>
      </div>
      <ul class="flex justify-end md:gap-x-1 md:text-xl lg: text-2xl">
        <li>
          <button type="button" class="btn hover:text-primary">
            <i class="fa-regular fa-heart"></i>
          </button>
        </li>
        <li>
          <button type="button" class="btn hover:text-primary">
            <i class="fa-solid fa-link"></i>
          </button>
        </li>
        <li>
          <button type="button" class="btn hover:text-primary">
            <i class="fa-solid fa-share-nodes"></i>
          </button>
        </li>
      </ul>
    </div>
    <!-- 藝品賞析 -->
    <div v-if="collection.description" class="font-semibold space-y-10">
      <div v-html="collection.description" class="space-y-2"></div>
      <div v-if="collection.appreciation">
        <h3 class="text-lg lg:text-2xl font-bold mb-3 lg:mb-4">藝品賞析</h3>
        <div v-html="collection.appreciation" class="space-y-2"></div>
      </div>
      <div v-if="collection.authorIntro">
        <h3 class="text-lg lg:text-2xl font-bold mb-3 lg:mb-4">作者簡介</h3>
        <div v-html="collection.authorIntro" class="space-y-2"></div>
      </div>
    </div>
  </article>
  <!-- 詳細資訊 -->
  <!-- <div class="bg-dark-200 text-dark-800 pb-6 mb-10 lg:mb-20">
    <div class="container">
      <div class="px-2 md:w-4/5 2xl:w-3/5 mx-auto">
        <ul class="grid grid-cols-12">
          <li v-for="item in collectionDetail" :key="item.title" class="col-span-12 md:col-span-6">
            <div class="flex gap-y-2 pt-6 pb-3 border-b border-dark-800 border-dashed h-full">
              <h4 class="w-20 font-semibold shrink-0">{{ item.title }}</h4>
              <p class="px-2">{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div> -->
  <!-- 精選推薦 -->
  <div class="container">
    <div class="flex justify-center mb-6 lg:mb-8">
      <div class="relative">
        <h3 class="text-2xl lg:text-3xl font-bold square after:-right-6 before:-left-6">
          精選推薦
        </h3>
      </div>
    </div>
    <div class="mb-10 overflow-hidden">
      <div class="relative">
        <CollectionMasterSlides />
      </div>
    </div>
  </div>
  <div class="mb-10 lg:mb-15">
    <button
      @click="goPreviousPage"
      class="btn font-semibold border border-black mx-auto hover:bg-primary hover:text-white hover:border-primary"
    >
      回前一頁
    </button>
  </div>

  <BackgroundComponent />
</template>

<script setup>
import { watch, reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouterStore } from '../stores/routerStore'
import { useCollectionStore } from '../stores/collectionStore'
import { useSlideStore } from '../stores/slideStore'
import CollectionMasterSlides from '../components/collection/CollectionMasterSlides.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'
import CollectionImageSlides from '../components/collection/CollectionImageSlides.vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'


const route = useRoute()

const collectionStore = useCollectionStore()
const { collection, collectionDetail } = storeToRefs(collectionStore)
const { fetchCollection } = collectionStore

const routerStore = useRouterStore()
const { goPreviousPage } = routerStore
const { collectionId } = storeToRefs(routerStore)

const slideStore = useSlideStore()
const { getSlide } = slideStore
const { slides } = storeToRefs(slideStore)

// CHECK: 確認是否要麵包屑
const breadList = reactive([
  // {
  //   title: '首頁',
  //   path: '/'
  // },
  {
    title: '藝術展品',
    path: '/collections'
  },
  {
    title: '展品目錄',
    path: '/collections/masterpieces'
  },
  // CHECK: 重整會出現 undefined
  {
    title: `${collection.value.title}`,
    path: `${route.path}`
  }
])

// 螢幕寬度計算
const breakPoint = ref(768)
const windowInnerWidth = ref(window.innerWidth)
const updateWidth = () => {
  windowInnerWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

watch(
  () => collectionId,
  async () => {
    slides.value.curSlide = 1
    await fetchCollection(collectionId.value)
    getSlide(collection.value.images.list.length + 1, {
      default: 1,
      md: 2
    })
  },
  { immediate: true, deep: true }
)
</script>

<style scoped>
.square::after, .square::before {
  @apply absolute content-[''] w-3 h-3 top-1/2 -translate-y-1/2 bg-primary;
}
</style>
