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
          <img class="w-full h-[340px] object-cover object-center mb-4" src='images/exhibitions/exhibition-U001.jpg'>
          <div class="flex justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold mb-4">風格故事—琺瑯彩瓷特展</h2>
              <time datetime="" class="font-medium">2023/07/07 至 2024/07/16</time>
            </div>
            <div class="flex flex-col">
              <div class="flex mb-2">
                <button type="button" class="btn border border-dark-800 px-5 mr-4">回列表</button>
                <button type="button" class="btn bg-primary text-white">前往看展</button>
              </div>
              <ul class="flex justify-end text-2xl">
                <li class="me-4"><a href="#"><i class="fa-regular fa-calendar"></i></a></li>
                <li class="me-4"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                <li><a href="#"><i class="fa-solid fa-share-nodes"></i></a></li>
              </ul>
            </div>
          </div>
          <div>
            <h3 class="font-bold mb-2">展覽概述：</h3>
            <p class="mb-8">《風格故事—琺瑯彩瓷特展》誠摯邀請您蒞臨，探索中國古老而獨特的琺瑯彩瓷藝術。這次特展將帶您穿越時空，深入琺瑯彩瓷的璀璨世界，展示其精湛的工藝和千年來的藝術演變。透過這些精心挑選的珍貴展品，我們將向您展示琺瑯彩瓷的輝煌之旅，並探索其對中國文化和藝術的深遠影響。</p>
            <h3 class="font-bold mb-2">展覽亮點：</h3>
            <ol class="list-decimal pl-6">
              <li>深入解讀琺瑯彩瓷：我們將以詳盡而生動的方式，解釋琺瑯彩瓷的歷史背景、製作過程和獨特之處。您將了解到琺瑯彩瓷的源起和它在中國陶瓷藝術中的重要地位。</li>
              <li>精選珍品展示：特展中將展出一系列匠心獨具的琺瑯彩瓷珍品，包括來自不同朝代的精美瓷器。這些作品不僅展示了技藝高超的製作工藝，更融合了各時期的藝術風格和主題，展現出琺瑯彩瓷的多樣性和豐富性。</li>
              <li>互動體驗與工作坊：我們提供一系列互動體驗和工作坊，讓您親身體驗琺瑯彩瓷的魅力。您可以親自參與製作過程，與藝術家互動，感受琺瑯彩瓷的獨特之處，並帶回一份屬於您自己的創作。</li>
              <li>導覽和講座：我們將提供導覽服務和專題講座，由專業的策展人和藝術專家帶領您深入了解琺瑯彩瓷的文化背景、藝術價值和技術特點。您將有機會與他們進行互動</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
  <GoToTop />
</template>
<script setup>
import { reactive } from 'vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
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
  },
  {
    title: '展覽簡介',
    path: '/exhibitions'
  }
])

</script>