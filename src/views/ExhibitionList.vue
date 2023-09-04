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
            <li
              v-for="i in 8"
              :key="'i' + i"
              class="w-[300px] flex-shrink-0 md:w-[336px] xs:w-[100%] col-span-6 lg:w-full relative overflow-hidden "
            >
              <a href="#" class="ease-in-out duration-300 relative" title="士拿乎—清宮鼻煙壺的時尚風潮">
                <div class="absolute top-2 right-2 text-xl z-[1]">
                  <i class="fa-regular fa-heart text-white hover:text-primary ease-in-out duration-300"></i>
                </div>
                <img src="images/exhibitions/exhibition-U001.jpg" class="w-full ease-in-out duration-300 hover:scale-110 ">
                <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
                  <h3 class="font-semibold text-xl line-clamp-1 mb-1">士拿乎—清宮鼻煙壺的時尚風潮</h3>
                  <p class="font-medium">2023/06/20 至 2024/03/28</p>
                </div>
              </a>
            </li>
          </ul>
          <PageComponent :pages="pages" @change="turnPage" />
        </div>
      </div>
    </div>
  </div>
  <GoToTop />
</template>
<script setup>
import { reactive } from 'vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import PageComponent from '../components/layout/PageComponent.vue'
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
</script>