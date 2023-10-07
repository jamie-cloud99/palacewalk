<template>
  <div class="mb-6 md:mb-10 lg:mb-[68px]">
    <ExhibitionBanner :banner-content="curBannerContent" />
  </div>
  <div class="container mb-[60px]">
    <div class="lg:grid grid-cols-12 gap-x-6">
      <div class="col-span-3">
        <h3 class="hidden lg:flex flex-col text-lg font-semibold">
          展覽
          <span class="font-cormo text-2xl">EXHIBITS</span>
        </h3>
        <hr class="border-b border-dark-400 lg:border-dark" />
        <div class="mb-6 lg:mb-20">
          <SideMenu
            :menu="menuContent"
            :selected-option="curMenuItem"
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
      <div class="col-span-9">
        <ul class="grid grid-cols-12 gap-4">
          <li
            v-for="item in exhibitionList"
            :key="item.exhibitionId"
            class="col-span-12 md:col-span-6"
          >
            <ExhibitionListItem :exhibition-item="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
  <BackgroundComponent />
</template>
<script setup>
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import ExhibitionBanner from '../components/exhibition/ExhibitionBanner.vue'
import SideMenu from '../components/layout/SideMenu.vue'
import ExhibitionListItem from '../components/exhibition/ExhibitionListItem.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'
import { useRouterStore } from '../stores/routerStore'
import { useExhibitionStore } from '../stores/exhibitsStore'
import { storeToRefs } from 'pinia'

const routerStore = useRouterStore()
const { route } = storeToRefs(routerStore)

const router = useRouter()
const exhibitionStore = useExhibitionStore()
const { exhibitionList, menuContent, curMenuItem } = storeToRefs(exhibitionStore)
const { updateExhibitionPeriod } = exhibitionStore

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
  }
])

const curBannerContent = computed(() => {
  return { title: `展覽空間 — ${curMenuItem.value.title}`, breadList }
})

const changeMenuItem = (item) => {
  updateExhibitionPeriod(item)
  breadList[breadList.length - 1].title = item.title
  router.push({ path: `/exhibitions`, query: { period: item.title } })
}

watch(
  () => route.value?.query?.period,
  () => {
    if (route.value?.query?.period) {
      curMenuItem.value = menuContent.value.find((item) => item.title === route.value.query.period)
    }
    updateExhibitionPeriod(curMenuItem.value)
  },
  { immediate: true }
)
</script>

<style>
.search {
  @apply py-3 w-full border-dark-800 bg-white text-dark-600 placeholder:text-dark-600 focus:border-primary focus:ring-primary;
}
</style>
