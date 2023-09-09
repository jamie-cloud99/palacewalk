<template>
  <div class="h-[260px] mb-[68px] lg:bg-[size:244px,_cover] xs:bg-[size:200px,_cover] bg-no-repeat
    bg-[url('./images/exhibitions/exhibition-banner.png'),_url('./images/exhibitions/page-banner1-1.jpg')]
    bg-[position:82%_18px,_center_bottom]">
    <div class="container relative text-white">
      <h2 class="absolute top-[115px] text-3xl font-serif font-bold">展覽空間-當期展覽</h2>
      <BreadcrumbsComponent class="absolute top-[228px]" :nav-list="breadList"/>
    </div>
  </div>
  <div class="bg-[url('images/page-bg.svg')] bg-[position:0_216px,_left_top] bg-no-repeat">
    <div class="container mb-[60px]">
      <div class="lg:grid grid-cols-12 gap-x-12">
        <div class="col-span-3">
          <h4 class="text-lg font-semibold">展覽</h4>
          <h3 class="text-2xl font-semibold mb-1 leading-8">EXHIBITS</h3>
          <hr class="border-black" />
          <ul class="mb-[54px]">
            <li><a href="#" 
              class="block px-2.5 py-4 leading-5 text-lg 
              border-b border-dark-400 bg-primary text-white"
              title="當期展覽">當期展覽</a></li>
            <li><a href="#" 
              class="block px-2.5 py-4 leading-5 text-lg 
              border-b border-dark-400"
              title="近期展覽">近期展覽</a></li>
          </ul>
          <h4 class="text-lg font-semibold">檢索</h4>
          <h3 class="text-2xl font-semibold mb-1 leading-8">SEARCH</h3>
          <ul>
            <li class="mb-3 relative">
              <input
                type="text"
                id="search"
                class="form-input border-dark-800 w-full 
                py-3 pl-[12px] pr-12 placeholder:text-dark-600"
                placeholder="展覽檢索"
              />
              <a href="#"><i class="fa-solid fa-magnifying-glass 
                absolute top-1/2 transform -translate-y-1/2 right-2.5"></i>
              </a>
            </li>
            <li class="relative xs:mb-3">
              <input
                type="text"
                id="search"
                class="form-input border-dark-800 w-full 
                py-3 pl-[12px] pr-12 placeholder:text-dark-600"
                placeholder="請選擇類別"
              />
              <a href="#"><i class="fa-solid fa-chevron-down 
                absolute top-1/2 transform -translate-y-1/2 right-2.5"></i>
              </a>
          </li>
          </ul>
        </div>
        <div class="col-span-9">
          <ul class="flex flex-wrap mb-20 gap-6 overflow-hidden lg:grid grid-cols-12">
            <ExhibitionListItem :exhibit-list="exhibitList" />
          </ul>
          <!-- <PageComponent :pages="pages" @change="turnPage" /> -->
        </div>
      </div>
    </div>
  </div>
  <GoToTop />
</template>
<script setup>
import { reactive } from 'vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import ExhibitionListItem from '../components/exhibition/ExhibitionListItem.vue'
import GoToTop from '../components/button/GoToTop.vue'

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

const exhibitList = reactive([
  {
    id: '1',
    exhibitionId: 'U001',
    title: '士拿乎—清宮鼻煙壺的時尚風潮',
    startDate: '2023.6.20',
    endDate: '2024.3.28',
  },
  {
    id: '2',
    exhibitionId: 'U002',
    title: '風格故事—琺瑯彩瓷特展 ',
    startDate: '2023.7.7',
    endDate: '2024.7.16',
  },
  {
    id: '3',
    exhibitionId: 'U003',
    title: '故宮經典-藝術與文化策展',
    startDate: '2023.6.20',
    endDate: '2024.3.28',
  },
  {
    id: '4',
    exhibitionId: 'U004',
    title: '繽彩燒窯—開光雙連瓶藝術展',
    startDate: '2023.6.24',
    endDate: '2024.5.28',
  },
  {
    id: '5',
    exhibitionId: 'U005',
    title: '釉瓷之美：太平有象瓷尊特展',
    startDate: '2023.5.20',
    endDate: '2024.8.19',
  }
])
</script>