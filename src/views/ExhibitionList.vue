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
          <SortList
            :menu="menuContent"
            :selectedOption="curMenuItem"
            @select-item="changeMenuItem"
          ></SortList>
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
          <li v-for="item in exhibitList" :key="item.id" class="col-span-12 md:col-span-6">
            <ExhibitionListItem :exhibition-item="item" />
          </li>
        </ul>
        <!-- <PageComponent :pages="pages" @change="turnPage" /> -->
      </div>
    </div>
  </div>
  <BackgroundComponent />
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ExhibitionBanner from '../components/exhibition/ExhibitionBanner.vue'
import SortList from '../components/layout/SortList.vue'
import ExhibitionListItem from '../components/exhibition/ExhibitionListItem.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'

const route = useRoute()
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
const curBannerContent = computed(() => {
  return { title: `展覽空間 — ${curMenuItem.value.title}`, breadList }
})

const changeMenuItem = (item) => {
  curMenuItem.value = item
  breadList[breadList.length - 1].title = item.title
  router.push({ path: `${route.path}`, query: { period: item.title } })
}
const exhibitList = ref([
  {
    id: '1',
    exhibitionId: 'U001',
    title: '士拿乎—清宮鼻煙壺的時尚風潮',
    startDate: '2023.6.20',
    endDate: '2024.3.28'
  },
  {
    id: '2',
    exhibitionId: 'U002',
    title: '風格故事—琺瑯彩瓷特展 ',
    startDate: '2023.7.7',
    endDate: '2024.7.16'
  },
  {
    id: '3',
    exhibitionId: 'U003',
    title: '故宮經典-藝術與文化策展',
    startDate: '2023.6.20',
    endDate: '2024.3.28'
  },
  {
    id: '4',
    exhibitionId: 'U004',
    title: '繽彩燒窯—開光雙連瓶藝術展',
    startDate: '2023.6.24',
    endDate: '2024.5.28'
  },
  {
    id: '5',
    exhibitionId: 'U005',
    title: '釉瓷之美：太平有象瓷尊特展',
    startDate: '2023.5.20',
    endDate: '2024.8.19'
  }
])
</script>

<style>
.search {
  @apply py-3 w-full border-dark-800 bg-white text-dark-600 placeholder:text-dark-600 focus:border-primary focus:ring-primary;
}
</style>
