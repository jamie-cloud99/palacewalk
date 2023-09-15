<template>
  <div
    class="container relative lg:pt-6 pb-20 mb-8 lg:mb-16 lg:px-15 md:max-w-full overflow-hidden"
  >
    <div
      class="absolute inset-0 z-[1] bg-[url(../images/home-bg-sm-1.webp)] bg-cover bg-bottom md:bg-[url(../images/home-bg-1.webp)]"
    ></div>

    <div
      data-aos="fade-up"
      data-aos-delay="50"
      class="relative z-10 flex h-[500px] w-full bg-cover bg-no-repeat bg-[position:right_-10rem_bottom_1rem] lg:bg-center bg-[url(../images/banner/bn.jpg)] md:block md:h-[400px] 2xl:h-[550px]"
    >
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        data-aos-duration="1200"
        class="relative flex flex-col justify-center items-start h-full z-20 space-y-4 md:space-y-6 px-10 md:px-20"
      >
        <h1
          class="font-serif font-bold lg:text-light drop-shadow-lg text-3xl lg:text-[40px] leading-normal"
        >
          故宮漫遊
          <span class="block 2xl:inline-block 2xl:ml-4"> 尋覓古典之美 </span>
        </h1>
        <button
          type="button"
          class="py-3 px-10 bg-white font-bold hover:bg-primary hover:text-white transition-all duration-300"
          @click="router.push('/exhibitions')"
        >
          立即看展
        </button>
      </div>
    </div>
  </div>

  <div class="overflow-x-hidden">
    <div class="container">
      <SectionTitle data-aos="zoom-in" :text="section[0]" />
    </div>
    <div class="container relative mb-20">
      <ExhibitionSlides data-aos="fade-up" :exhibition-list="recentExhibitionList" />
    </div>
    <div class="container">
      <SectionTitle data-aos="zoom-in" :text="section[1]" />
    </div>
  </div>

  <div class="relative mb-40 lg:mb-[312px]">
    <ul class="space-y-1 lg:space-y-4 overflow-hidden">
      <li data-aos="fade-left">
        <ImageMarquee :translate="false" :collection-list="featuredCollectionList.slice(0, 8)" />
      </li>
      <li data-aos="fade-right">
        <ImageMarquee :translate="true" :collection-list="featuredCollectionList.slice(8, 16)" />
      </li>
    </ul>
    <div
      class="absolute left-0 max-w-full -bottom-20 lg:-bottom-48 -z-10 w-screen h-[250px] bg-cover bg-bottom bg-[url(../images/home-bg-sm-2.webp)] md:bg-[url(../images/home-bg-2.webp)] md:h-[664px]"
    ></div>
  </div>

  <div class="overflow-hidden">
    <div class="container">
      <SectionTitle
        data-aos-anchor-placement="center-bottom"
        data-aos="zoom-in"
        :text="section[2]"
      />
      <div class="overflow-hidden">
        <CommentCards data-aos="fade-up" data-aos-anchor-placement="center-bottom" />
      </div>

      <h2 data-aos="zoom-in" class="text-8 font-bold text-center mb-6 lg:text-4xl lg:text-left">
        公告訊息
      </h2>
      <hr class="border-dark-600 mb-3 lg:mb-8" />
      <div class="lg:grid grid-cols-12 gap-x-12 mb-12 lg:mb-16">
        <div data-aos="fade-up" class="col-span-7">
          <ul class="mb-12 lg:mb-0">
            <li
              v-for="item in newsList"
              :key="item.title"
              class="py-3 border-b border-dark-400 first-of-type:pt-0"
            >
              <div class="space-y-2">
                <div class="flex items-center justify-between lg:justify-start lg:gap-x-2">
                  <p
                    class="px-1 py-0.5 bg-primary rounded text-white"
                    :class="{ '!bg-warning': item.category !== '活動公告' }"
                  >
                    {{ item.category }}
                  </p>
                  <p class="text-dark-600">{{ item.date }}</p>
                </div>
                <p class="text-lg font-medium line-clamp-2 md:line-clamp-1">{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay="300" class="col-span-5">
          <div class="flex justify-center">
            <div class="w-full md:w-4/5 lg:w-full">
              <CalendarComponent :news="newsList" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '../stores/homeStore'
import CalendarComponent from '../components/home/CalendarComponent.vue'
import SectionTitle from '../components/home/SectionTitle.vue'
import ImageMarquee from '../components/home/ImageMarquee.vue'
import CommentCards from '../components/home/CommentCards.vue'
import ExhibitionSlides from '../components/home/ExhibitionSlides.vue'

const router = useRouter()
const homeStore = useHomeStore()
const { newsList, recentExhibitionList, featuredCollectionList } = storeToRefs(homeStore)

const section = ref([
  {
    title: '當期展覽',
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

onMounted(() => {
  AOS.init({
    duration: 800
  })
})
</script>
