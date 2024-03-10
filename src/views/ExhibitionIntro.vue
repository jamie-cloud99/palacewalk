<template>
  <div class="container mb-15">
    <div class="lg:grid grid-cols-12 gap-x-12">
      <div v-if="exhibition.id" class="col-start-2 col-span-10 font-semibold">
        <BreadcrumbsComponent class="my-5 justify-end" :nav-list="breadList" />
        <img
          class="w-full aspect-[2/1] object-cover object-center mb-2 lg:mb-4"
          :src="exhibition.images.lg"
        />
        <div class="flex flex-col justify-between mb-8 lg:flex-row">
          <div class="mb-4 lg:mb-0">
            <h2 class="text-2xl font-bold mb-4">{{ exhibition.title }}</h2>
            <time datetime="" class="font-bold">{{
              usePeriod(exhibition.startDate, exhibition.endDate)
            }}</time>
          </div>
          <div class="flex flex-row-reverse justify-between lg:flex-col lg:justify-start">
            <div class="flex mb-2">
              <RouterLink
                to="/exhibitions"
                class="btn border border-dark-800 px-5 mr-4 hover:border-primary hover:text-primary"
                >回列表</RouterLink
              >
              <RouterLink
                v-if="hasStarted"
                :to="`/exhibitions/${exhibition.id}/content`"
                target="_blank"
                class="btn bg-primary text-white hover:bg-dark"
              >
                前往看展
              </RouterLink>
              <button
                v-else
                type="button"
                class="btn bg-primary text-white cursor-not-allowed opacity-50"
              >
                即將開展
              </button>
            </div>
            <ul class="flex justify-end text-2xl">
              <li class="me-4">
                <button type="button" class="hover:text-primary">
                  <i class="fa-regular fa-calendar"></i>
                </button>
              </li>
              <li class="me-4">
                <button
                  type="button"
                  class="hover:text-primary"
                  @click="updateFavorites(exhibition.id, 'exhibitions')"
                >
                  <i class="fa-regular fa-heart" :class="{ 'fa-solid text-primary': showFavorite }">
                  </i>
                </button>
              </li>
              <li>
                <button type="button" class="hover:text-primary">
                  <i class="fa-solid fa-share-nodes"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 class="font-bold mb-2">展覽概述：</h3>
          <p class="mb-8">{{ exhibition.description }}</p>
          <h3 class="font-bold mb-2">展覽亮點：</h3>
          <div v-html="exhibition.content" class="content mb-8"></div>
          <div v-if="hasStarted">
            <h3 class="font-bold mb-2">展品資訊：</h3>
            <div class="relative overflow-hidden mb-8">
              <CollectionSlides />
            </div>
          </div>
          <div v-else class="mb-6 lg:mb-10"></div>
          <ExhibitionMessages />
        </div>
      </div>
    </div>
  </div>
  <BackgroundComponent />
</template>
<script setup>
import { reactive, computed } from 'vue'
// import { useRouter } from 'vue-router'
import { usePeriod } from '@/utils/useDate'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import CollectionSlides from '../components/exhibition/CollectionSlides.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'
import ExhibitionMessages from '../components/exhibition/ExhibitionMessages.vue'

import { storeToRefs } from 'pinia'
import { useExhibitionStore } from '../stores/exhibitsStore'
import { useRouterStore } from '../stores/routerStore'
import { useSlideStore } from '../stores/slideStore'
import { useMemberStore } from '../stores/memberStore'

const routerStore = useRouterStore()
const { exhibitionId } = storeToRefs(routerStore)

const slideStore = useSlideStore()
const { resetSlides } = slideStore

const memberStore = useMemberStore()
const { updateFavorites } = memberStore
const { favExhibitions } = storeToRefs(memberStore)

const showFavorite = computed(() => {
  return favExhibitions.value.some((item) => item.id === exhibition.value.id)
})

// const router = useRouter()

const breadList = reactive([
  {
    title: '首頁',
    path: '/'
  },
  {
    title: '展覽空間',
    path: '/exhibitions'
  },
  {
    title: '當期展覽',
    path: '/exhibitions'
  },
  {
    title: '展覽簡介',
    path: '/exhibitionIntro'
  }
])
// const menuContent = reactive([
//   {
//     code: 'recent',
//     title: '當期展覽'
//   },
//   {
//     code: 'coming',
//     title: '近期展覽'
//   }
// ])
// const curMenuItem = ref(menuContent[0])
// const path = (item) => {
//   curMenuItem.value = item
//   breadList[breadList.length - 1].title = item.title
//   router.push({ path: `/exhibitions`, query: { period: item.title } })
// }

const exhibitionStore = useExhibitionStore()
const { exhibition, exhibitionCollections, hasStarted } = storeToRefs(exhibitionStore)
const { fetchExhibition } = exhibitionStore

const renderExhibition = async () => {
  await fetchExhibition(exhibitionId.value)
  if (hasStarted.value) {
    resetSlides(exhibitionCollections.value?.length, {
      default: 1,
      md: 2,
      lg: 3
    })
  }
}

renderExhibition()
</script>

<style>
.content ol {
  list-style-type: decimal;
  padding-left: 24px;
  line-height: 1.5;
}
.content li {
  margin-bottom: 8px;
}

.search {
  @apply py-3 w-full border-dark-800 bg-white text-dark-600 placeholder:text-dark-600 focus:border-primary focus:ring-primary;
}
</style>
