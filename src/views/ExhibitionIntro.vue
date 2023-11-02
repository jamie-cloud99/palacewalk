<template>
  <div class="mb-6 lg:mb-[68px]">
    <ExhibitionBanner :banner-content="curBannerContent" />
  </div>
  <div class="container mb-15">
    <div class="lg:grid grid-cols-12 gap-x-12">
      <div class="col-span-3">
        <h3 class="hidden lg:flex flex-col text-lg font-semibold">
          展覽
          <span class="font-cormo text-2xl">EXHIBITS</span>
        </h3>
        <hr class="border-b border-dark-400 lg:border-dark" />
        <div class="mb-6 lg:mb-20">
          <SideMenu
            :menu="menuContent"
            :selectedOption="curMenuItem"
            @select-item="changeMenuItem"
          />
        </div>
        <div class="hidden lg:block">
          <h3 class="flex flex-col text-lg">
            檢索
            <span class="font-cormo text-2xl">SEARCH</span>
          </h3>
          <ul class="mb-4">
            <li class="mb-3 relative">
              <input type="text" id="search" class="form-input search" placeholder="展覽檢索" />
              <button
                type="button"
                class="btn absolute top-1/2 right-0 -translate-y-1/2 hover:text-primary"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </li>
            <li class="relative">
              <select name="" id="search" class="form-select search">
                <option class="text-dark-600" value="" disabled selected>請選擇類別</option>
                <option class="text-dark" value="">藝術</option>
                <option class="text-dark" value="">文物</option>
                <option class="text-dark" value="">綜合</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="exhibition.id" class="col-span-9 font-semibold">
        <div class="relative">
          <img
            class="w-full aspect-[2/1] object-cover object-center mb-2 lg:mb-4"
            :src="exhibition.images.lg"
          />
          <div
            v-if="!hasStarted"
            class="absolute top-0 w-full h-full bg-dark/70 flex gap-x-14 items-center px-6 text-white lg:px-16"
          >
            <div class="lg:text-xl">
              <h4 class="">即將開展</h4>
              <p class="font-cormo font-semibold">Coming Soon</p>
            </div>
            <hr class="flex-grow" />
          </div>
        </div>
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
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePeriod } from '../composables/format'
import ExhibitionBanner from '../components/exhibition/ExhibitionBanner.vue'
import SideMenu from '../components/layout/SideMenu.vue'
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

const router = useRouter()

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

const menuContent = reactive([
  {
    code: 'recent',
    title: '當期展覽'
  },
  {
    code: 'coming',
    title: '近期展覽'
  }
])

const curMenuItem = ref(menuContent[0])
const changeMenuItem = (item) => {
  curMenuItem.value = item
  breadList[breadList.length - 1].title = item.title
  router.push({ path: `/exhibitions`, query: { period: item.title } })
}

const curBannerContent = computed(() => {
  return { title: `展覽空間 — ${breadList[breadList.length - 1].title}`, breadList }
})

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
