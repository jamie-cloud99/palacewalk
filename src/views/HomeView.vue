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
          class="py-3 px-10 bg-white font-bold hover:bg-primary hover:text-white transition-all duration-300"
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
      class="absolute left-0 max-w-full -bottom-20 lg:-bottom-48 -z-10 w-screen h-[250px] bg-cover bg-bottom bg-[url(./images/home-bg-sm-2.webp)] md:bg-[url(./images/home-bg-2.webp)] md:h-[664px]"
    ></div>
  </div>

  <div class="container">
    <SectionTitle :text="section[2]" />
    <CommentCards />
    <hr class="hidden border-dark-400 mb-24 lg:block" />

    <h2 class="text-8 font-bold text-center mb-6 lg:text-4xl lg:text-left">公告訊息</h2>
    <hr class="border-dark-600 mb-3 lg:mb-8" />
    <div class="lg:grid grid-cols-12 gap-x-12 mb-12 lg:mb-16">
      <div class="col-span-7">
        <ul class="mb-12 lg:mb-0">
          <li
            v-for="item in newsList"
            :key="item.title"
            class="font-sans py-3 border-b border-dark-400 first-of-type:pt-0"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between lg:justify-start lg:gap-x-2">
                <p class="text-dark-600 lg:order-2">{{ item.date }}</p>
                <p
                  class="px-1 py-0.5 bg-primary rounded text-white"
                  :class="{ '!bg-warning': item.category !== '活動公告' }"
                >
                  {{ item.category }}
                </p>
              </div>
              <p class="text-lg line-clamp-2 md:line-clamp-1">{{ item.title }}</p>
            </div>
          </li>
        </ul>

      </div>
      <div class="col-span-5">
        <div class="flex justify-center">
          <div class="w-full md:w-4/5 lg:w-full">
            <CalendarComponent :news="newsList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CalendarComponent from '../components/home/CalendarComponent.vue'
import SectionTitle from '../components/home/SectionTitle.vue'
import ImageMarquee from '../components/home/ImageMarquee.vue'
import CommentCards from '../components/home/CommentCards.vue'

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

const newsList = ref([
  {
    category: '活動公告',
    title: '「藝起來‧ 趣宮略」國小快閃活動報名申請須知',
    date: '2023.09.10'
  },
  {
    category: '館務通知',
    title: '9月18日館內教育訓練，暫停線上、電話客服一日',
    date: '2023.09.18'
  },
  {
    category: '活動公告',
    title: '親子同樂電影院：羅摩衍那–3D動畫放映',
    date: '2023.09.20'
  },
  {
    category: '活動公告',
    title: '藝術家如何書寫大時代？專人導覽開團報名中',
    date: '2023.09.29'
  }
])



</script>
