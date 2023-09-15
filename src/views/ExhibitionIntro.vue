<template>
  <div class="mb-6 lg:mb-[68px]">
		<ExhibitionBanner :banner-content="curBannerContent" />
	</div>
  <div class="bg-[url('/images/page-bg.svg')] bg-[position:0_216px,_left_top] bg-no-repeat">
    <div class="container mb-[60px]">
      <div class="lg:grid grid-cols-12 gap-x-12">
        <div class="col-span-3">
          <ExhibitionSort 
						:menu="menuContent" 
						:selectedOption="curMenuItem" 
						@select-item="changeMenuItem" 
					/>
        </div>
        <div class="col-span-9 font-semibold">
          <img class="w-full h-[340px] object-cover object-center mb-2 lg:mb-4" src='/images/exhibitions/exhibition-U001.jpg'>
          <div class="flex flex-col justify-between mb-8 lg:flex-row">
            <div class="mb-4 lg:mb-0">
              <h2 class="text-2xl font-bold mb-4">{{ exhibitionTitle }}</h2>
              <time datetime="" class="font-bold">{{ startDate }} - {{ endDate }}</time>
            </div>
            <div class="flex flex-row-reverse justify-between lg:flex-col lg:justify-start">
              <div class="flex mb-2">
                <button type="button" class="btn border border-dark-800 px-5 mr-4">回列表</button>
                <button type="button" 
                  class="btn bg-primary text-white"
                  @click="router.push('/exhibitions/1/content')"
                >前往看展</button>
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
            <p class="mb-8">{{ description }}</p>
            <h3 class="font-bold mb-2">展覽亮點：</h3>
            <div v-html="content" class="content mb-8"></div>
            <h3 class="font-bold mb-2">展品資訊：</h3>
            <div  class="overflow-hidden mb-8">
              <swiper-container
                class="mb-10"
                :space-between="24"
                :navigation="true"
                :pagination="true"
                :slides-per-view="1"
                :breakpoints="{ 1024: { slidesPerView: 3 } }"
                ref="swiperEl"
              >
                <swiper-slide>
                  <figure class="exhibit-item">
                    <img class="w-full h-full object-cover object-centers" :src='`/images/exhibitions/exhibition-U009.jpg`' alt="U009">
                    <figcaption class="exhibit-item-title">清 雍正 銅胎畫琺瑯黑地五彩流雲玉兔秋香鼻煙壺</figcaption>
                  </figure>
                </swiper-slide>
                <swiper-slide>
                  <figure class="exhibit-item">
                    <img class="w-full h-full object-cover object-center" :src='`/images/exhibitions/exhibition-U010.jpg`' alt="U010">
                    <figcaption class="exhibit-item-title">清 雍正 白色料鼻煙壺 帶銅胎畫琺瑯黑地夔龍紋套匣</figcaption>
                  </figure>
                </swiper-slide>
                <swiper-slide>
                  <figure class="exhibit-item">
                    <img class="w-full h-full object-cover object-center" :src='`/images/exhibitions/exhibition-U011.jpg`' alt="U011">
                    <figcaption class="exhibit-item-title">清 乾隆 金屬胎掐絲琺瑯與畫琺瑯西洋人物雙耳鼻煙壺</figcaption>
                  </figure>
                </swiper-slide>
                <swiper-slide>
                  <figure class="exhibit-item">
                    <img class="w-full h-full object-cover object-center" :src='`/images/exhibitions/exhibition-U003.jpg`' alt="U004">
                    <figcaption class="exhibit-item-title">明 唐寅採蓮圖</figcaption>
                  </figure>
                </swiper-slide>
              </swiper-container>
            </div>
            <h4 class="font-bold mb-2">展覽留言<span class="comment-num">(2)</span></h4>
            <div class="relative border-b pb-[24px] mb-3">
              <input
                type="text"
                id="comment"
                class="form-input bg-transparent border-dark-400 rounded-3xl w-full py-2 px-4 placeholder:text-dark-600"
                placeholder="新增留言"
              />
              <a href="#">
                <i class="fa-solid fa-paper-plane absolute right-4 top-[12px]"></i>
              </a>
            </div>
            <ul class="space-y-5">
              <li v-for="i in 3" :key="i + 'i'">
                <div class="border-b border-dark-400 px-2">
                  <div class="pt-4 pb-2">
                    <div class="flex items-center">
                      <div class="w-[36px] h-[36px] mr-2">
                        <img src="/images/user-3.webp" class="object-cover object-center" alt="文化探索者">
                      </div>
                      <div class=" mr-2">文化探索者</div>
                      <time class="text-primary">2023/08/10</time>
                    </div>
                  </div>
                  <div class="pt-4 pb-2">
                    <p class="pb-2 pl-11 lg:pb-4 min-h-[50px] font-medium">
                      之前去故宮看過一次這檔展覽，沒想到還有線上展可以重溫，琺瑯彩瓷的美歷經百年也不會褪色！
                    </p>
                    <div class="flex justify-end flex-grow gap-2 mb-3 lg:hidden">
                    </div>
                    <div class="flex justify-between items-center">
                      <div class="flex gap-2 pl-11">
                        <button
                          type="button"
                          class="btn pl-0 text-dark-600 hover:text-dark"
                          @click="toggleReply(i)"
                        >
                          <span v-if="isOpen === i">隱藏</span><span v-else>顯示</span>回覆
                        </button>
                      </div>
                    </div>
                    <div
                      class="max-h-0 overflow-hidden transition-all duration-500"
                      :class="{ '!max-h-[500px]': isOpen === i }"
                    >
                      <hr class="border-dark-400 mb-3" />
                      <div class="pl-6 gap-2">
                        <div class="flex items-center">
                          <div class="w-[36px] h-[36px] mr-2">
                            <img src="/images/user-2.webp" class="object-cover object-center" alt="策展者">
                          </div>
                          <p class="text-warning-800 font-black leading-[36px]">策展人</p>
                          <time class="text-primary">2023/08/10</time>
                        </div>
                        <div class="pt-4 pb-2">
                          <p class="pl-11">
                            銅胎畫琺瑯方盤是康熙御製的傑作，看來你跟皇帝有同樣獨到的眼光呢！
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive,computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ExhibitionBanner from '../components/exhibition/ExhibitionBanner.vue'
import ExhibitionSort from '../components/exhibition/ExhibitionSort.vue'

import { storeToRefs } from 'pinia'
import { exhibitionStore } from '../stores/exhibitsStore'

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
	},
	{
		title: '展覽簡介',
		path: '/exhibitionIntro'
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

const exhibitsStore = exhibitionStore()
const { exhibition } = storeToRefs(exhibitsStore)

const isOpen = ref('')

const toggleReply = (id) => {
  isOpen.value = isOpen.value === id ? '' : id
}

const exhibitionTitle = computed({
  get: () => {
    return exhibition.value[0].data[0].title
  }
})
const startDate = computed({
  get: () => {
    return exhibition.value[0].data[0].startDate
  }
})
const endDate = computed({
  get: () => {
    return exhibition.value[0].data[0].endDate
  }
})
const description = computed({
  get: () => {
    return exhibition.value[0].data[0].description
  }
})
const content = computed({
  get: () => {
    return exhibition.value[0].data[0].content
  }
})
</script>
<style>
  .content ol{
    list-style-type: decimal;
    padding-left: 24px;
    line-height: 1.5;
  }
  .content li{
    margin-bottom: 8px;
  }
  .exhibit-item{
    @apply w-full h-[300px] lg:h-[306px] relative;
  }
  .exhibit-item-title{
    @apply font-bold bg-amber-400 px-2 inline-block absolute left-0 bottom-2;
  }
</style>