<template>
  <div class="h-[260px] mb-[68px] lg:bg-[size:244px,_cover] md:bg-[size:0px,_cover] bg-no-repeat
    bg-[url('./images/exhibitions/exhibition-banner.png'),_url('./images/exhibitions/page-banner1-1.jpg')]
    bg-[position:82%_18px,_center_bottom]">
    <div class="container relative text-white">
      <h2 class="absolute top-[115px] text-3xl font-serif font-bold">展覽空間-當期展覽</h2>
      <BreadcrumbsComponent class="absolute top-[228px]" :nav-list="breadList"/>
    </div>
  </div>
  <div class="container mb-[60px]">
    <div class="lg:grid grid-cols-12 gap-x-12">
      <div class="col-span-3">
        <h4 class="text-lg font-semibold">展覽</h4>
        <h3 class="text-2xl font-semibold mb-1">Exhibits</h3>
        <hr class="border-black" />
        <ul class="mb-[54px]">
          <li><a href="#" 
            class="block px-2.5 py-4 leading-5 text-lg border-b border-dark-400 bg-primary text-white"
            title="當期展覽">當期展覽</a></li>
          <li><a href="#" 
            class="block px-2.5 py-4 leading-5 text-lg border-b border-dark-400"
            title="近期展覽">近期展覽</a></li>
        </ul>
        <h4 class="text-lg font-semibold">檢索</h4>
        <h3 class="text-2xl font-semibold mb-1">SEARCH</h3>
        <ul>
          <li class="mb-3">
            <input
              type="text"
              id="search"
              class="form-input border-dark-800 w-full py-3 px-4 placeholder:text-dark-600"
              placeholder="展覽檢索"
            />
          </li>
          <li>
            <input
              type="text"
              id="search"
              class="form-input border-dark-800 w-full py-3 px-4 placeholder:text-dark-600"
              placeholder="展覽檢索"
            />
        </li>
        </ul>
      </div>
      <div class="col-span-9">
        <ul class="flex mb-20 gap-6 overflow-hidden lg:grid grid-cols-12">
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U001.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">士拿乎—清宮鼻煙壺的時尚風潮</h3>
              <p class="font-medium">2023/06/20 至 2024/03/28</p>
          </div>
          </li>
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U002.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">風格故事—琺瑯彩瓷特展</h3>
              <p class="font-medium">2023/07/07 至 2024/07/16</p>
            </div>
          </li>
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U003.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">故宮經典-藝術與文化策展</h3>
              <p class="font-medium">2023/06/20 至 2024/03/28</p>
          </div>
          </li>
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U001.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">風格故事—琺瑯彩瓷特展</h3>
              <p class="font-medium">2023/07/07 至 2024/07/16</p>
            </div>
          </li>
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U002.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">士拿乎—清宮鼻煙壺的時尚風潮</h3>
              <p class="font-medium">2023/06/20 至 2024/03/28</p>
          </div>
          </li>
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U003.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">故宮經典-藝術與文化策展</h3>
              <p class="font-medium">2023/07/07 至 2024/07/16</p>
            </div>
          </li>
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U001.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">士拿乎—清宮鼻煙壺的時尚風潮</h3>
              <p class="font-medium">2023/06/20 至 2024/03/28</p>
          </div>
          </li>
          <li class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full relative">
            <img src="images/exhibitions/exhibition-U002.jpg" class="w-full">
            <div class="w-full bg-black/50 text-white px-4 py-2 absolute bottom-0 left-0">
              <h3 class="font-semibold text-xl line-clamp-1 mb-1">風格故事—琺瑯彩瓷特展</h3>
              <p class="font-medium">2023/07/07 至 2024/07/16</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import {  reactive } from 'vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'

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