<template>
  <div class="mb-6 md:mb-10 lg:mb-[68px]">
    <ExhibitionBanner :banner-content="curBannerContent" />
  </div>
  <div class="container mb-15 min-h-[1000px]">
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
      breadList[breadList.length - 1].title = curMenuItem.value.title
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
