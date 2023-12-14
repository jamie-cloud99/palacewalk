<template>
  <div class="relative px-3 md:px-8 lg:pt-6 pb-20 mb-8 lg:mb-16 lg:px-15 md:max-w-full overflow-hidden">
    <div
      class="absolute inset-0 z-[1] bg-[url(../images/home-bg-sm-1.webp)] bg-cover bg-bottom md:bg-[url(../images/home-bg-1.webp)]">
    </div>

    <div data-aos="fade-up" data-aos-delay="50"
      class="relative z-10 h-[500px] w-full bg-cover bg-no-repeat bg-[position:right_-10rem_bottom_1rem] md:bg-center bg-[url(../images/banner/bn.jpg)] md:h-[400px] 2xl:h-[550px]">
      <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="1200"
        class="relative flex flex-col justify-center items-start h-full z-20 space-y-4 md:space-y-6 px-10 sm:pl-60 md:px-15 lg:px-20">
        <h1 class="font-serif font-bold md:text-light drop-shadow-lg text-3xl lg:text-[40px] leading-normal">
          故宮漫遊
          <span class="block 2xl:inline-block 2xl:ml-4"> 尋覓古典之美 </span>
        </h1>
        <button type="button"
          class="py-3 px-10 bg-white font-bold hover:bg-primary hover:text-white transition-all duration-300"
          @click="router.push('/exhibitions')">
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
      class="absolute left-0 max-w-full -bottom-20 lg:-bottom-48 -z-10 w-screen h-[250px] bg-cover bg-bottom bg-[url(../images/home-bg-sm-2.webp)] md:bg-[url(../images/home-bg-2.webp)] md:h-[664px]">
    </div>
  </div>

  <div class="relative overflow-hidden">
    <div class="inline-block bg-primary absolute w-4 md:w-6 h-[110px] md:h-[130px]"></div>
    <div class="ml-[40px] md:ml-[96px] mb-12">
      <p class="mb-4 font-cormo font-semibold text-5xl lg:text-7xl text-dark-400 uppercase" :section="section">
        {{ section[2].engTitle }}
      </p>
      <div class="relative">
        <h2 class="text-2xl lg:text-4xl font-bold  leading-normal" :section="section">{{ section[2].title }}</h2>
      </div>
    </div>
    <CommentCards data-aos="fade-up" data-aos-anchor-placement="center-bottom" />
  </div>
  <div class="relative overflow-hidden bg-gray-50 py-20">
    <div class="container">
      <div class="mb-12 lg:mb-16">
        <p class="mb-4 font-cormo font-semibold text-5xl lg:text-7xl text-dark-400 uppercase" :section="section">
          {{ section[3].engTitle }}
        </p>
        <div class="relative">
          <h2 class="text-2xl lg:text-4xl font-bold leading-normal" :section="section">{{ section[3].title }}</h2>
        </div>
      </div>
      <div data-aos="fade-up" class="mb-4">
        <ul class="mb-12 lg:mb-0 flex flex-wrap">
          <li v-for="item in newsList" :key="item.title" class="px-4 mr-0 lg:mr-4 lg:last-of-type:mr-0 mb-4 2xl:mb-0
                  border box-border border-gray-200 h-full lg:h-[250px]
                  w-full xl:max-w-[23%] lg:max-w-[48%]">
            <div class="flex flex-col justify-between space-y-2 pt-4 h-full">
              <div class="lg:gap-x-2">
                <p class="text-dark-600">{{ item.date.split('.')[0] }}</p>
                <p class="inline-block px-4 py-0 bg-primary text-white mb-4"
                  :class="{ '!bg-warning': item.category !== '活動公告' }">
                  {{ item.category }}
                </p>
                <p class="text-xl font-medium line-clamp-3 md:line-clamp-2 mb-4">{{ item.title }}</p>
              </div>
              <p class="relative text-right 
                    before:absolute before:left-0 before:top-1/2 before:w-3/5 before:h-[0.5px] before:bg-gray-200 before:z-[-1]
                    after:absolute after:right-[-16px] after:bottom-0 after:w-[30px] after:h-[30px] after:bg-gray-200 after:z-[-1]
                    ">
                {{ item.date.split('.')[1] }}/{{ item.date.split('.')[2] }}
              </p>
            </div>
          </li>
        </ul>
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
// import CalendarComponent from '../components/home/CalendarComponent.vue'
import SectionTitle from '../components/home/SectionTitle.vue'
import ImageMarquee from '../components/home/ImageMarquee.vue'
import CommentCards from '../components/home/CommentCards.vue'
import ExhibitionSlides from '../components/home/ExhibitionSlides.vue'

const router = useRouter()
const homeStore = useHomeStore()
const { fetchFeaturedCollections } = homeStore
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
  },
  {
    title: '公告訊息',
    engTitle: 'News'
  },
])

fetchFeaturedCollections()

onMounted(() => {
  AOS.init({
    duration: 800
  })
})
</script>