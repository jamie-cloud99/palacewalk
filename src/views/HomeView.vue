<template>
  <div
    class="container pt-6 pb-20 bg-[url(./images/home-bg-sm-1.webp)] bg-cover bg-bottom md:bg-[url(./images/home-bg-1.webp)] mb-12 lg:mb-16 lg:px-15 md:max-w-full"
  >
    <div
      class="flex justify-center items-center h-[360px] w-full bg-cover bg-right bg-[url(./images/banner/bn-sm-1.webp)] md:bg-[url(./images/banner/bn-1.webp)] md:block md:bg-center md:h-[400px]"
    >
      <div class="space-y-4 text-center md:text-left md:p-20 md:space-y-6 xl:space-y-10">
        <h1 class="font-serif font-bold text-white text-3xl lg:text-[40px]">
          故宮漫遊，重塑古典風華
        </h1>
        <button
          type="button"
          class="py-3 px-10 bg-white rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300"
        >
          立即看展
        </button>
      </div>
    </div>
  </div>

  <div class="container">
    <SectionTitle :text="section[0]" />

    <ul class="flex mb-20 gap-6 overflow-hidden lg:grid grid-cols-12">
      <li
        class="w-[300px] flex-shrink-0 md:w-[450px] col-span-6 lg:w-full"
        v-for="i in 2"
        :key="'i' + i"
      >
        <img src="https://fakeimg.pl/300x190/" class="w-full" />
        <div class="flex gap-2 items-start">
          <div class="w-4 h-4 bg-primary mt-2 flex-shrink-0"></div>
          <div class="space-y-2">
            <h3 class="text-dark-800 text-2xl font-semibold line-clamp-1">
              士拿乎—清宮鼻煙壺的時尚風潮
            </h3>
            <p class="text-dark-600">2023.08.08 - 2023.09.08</p>
          </div>
        </div>
      </li>
    </ul>

    <SectionTitle :text="section[1]" />
  </div>
  <div class="relative mb-40 lg:mb-[312px]">
    <ul class="space-y-1 lg:space-y-4">
      <li class="">
        <ImageMarquee :translate="false" />
      </li>
      <li>
        <ImageMarquee :translate="true" />
      </li>
    </ul>
    <div
      class="absolute -bottom-20 md:-bottom-48 -z-10 w-screen h-[250px] bg-cover bg-bottom bg-[url(./images/home-bg-sm-2.webp)] md:bg-[url(./images/home-bg-2.webp)] md:h-[664px]"
    ></div>
  </div>

  <div class="container">
    <SectionTitle :text="section[2]" />
    <ul class="flex mb-20 gap-6 overflow-hidden lg:grid grid-cols-12 lg:mb-24">
      <li class="w-[300px] flex-shrink-0 lg:w-full lg:col-span-3" v-for="i in 4" :key="'i' + i">
        <div class="p-6 bg-dark-200">
          <div class="mb-4 flex gap-2 items-center">
            <img src="/images/user-1.png" alt="" class="w-[50px] h-[50px] block flex-shrink-0" />
            <div class="flex flex-wrap items-center gap-x-2">
              <h4 class="text-dark-800 text-lg font-semibold line-clamp-1">文化探索者</h4>
              <p class="text-dark-600">2023.08.08</p>
            </div>
          </div>
          <p class="font-sans min-h-[96px] line-clamp-4">
            之前去故宮看過一次這檔展覽，沒想到還有線上展可以重溫，琺瑯彩瓷的美歷經百年也不會褪色！
          </p>
        </div>
      </li>
    </ul>
    <hr class="hidden border-dark-400 mb-24 lg:block" />

    <h2 class="text-8 font-bold text-center mb-6 lg:text-4xl lg:text-left">公告訊息</h2>
    <hr class="border-dark-600 mb-3 lg:mb-8" />
    <div class="lg:grid grid-cols-12 gap-x-12 mb-12 lg:mb-16">
      <div class="col-span-7">
        <ul class="mb-12 lg:mb-0">
          <li
            v-for="i in 4"
            :key="'i' + i"
            class="font-sans py-3 border-b border-dark-400 first-of-type:pt-0"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between lg:justify-start lg:gap-x-2">
                <p class="text-dark-600 lg:order-2">2023.08.08</p>
                <p class="px-1 py-0.5 bg-primary rounded text-white">活動公告</p>
              </div>
              <p class="text-lg line-clamp-2 md:line-clamp-1">羅摩衍那–3D動畫放映</p>
            </div>
          </li>
        </ul>
        <!-- <p class="py-6">
          查看更多
        </p> -->
      </div>
      <div class="col-span-5">
        <CalendarComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import CalendarComponent from '../components/home/CalendarComponent.vue'
import SectionTitle from '../components/home/SectionTitle.vue'
import ImageMarquee from '../components/home/ImageMarquee.vue'

const section = reactive([
  {
    title: '近期展覽',
    engTitle: 'Recent'
  },
  {
    title: '藝術展品',
    engTitle: 'Gallery'
  },
  {
    title: '精選留言',
    engTitle: 'Comment'
  }
])
</script>
