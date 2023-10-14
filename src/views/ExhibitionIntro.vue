<template>
  <div class="container mb-[60px]">
    <div class="lg:grid grid-cols-12 gap-x-12">
      <div v-if="exhibition.id" class="col-start-2 col-span-10 font-semibold">
        <BreadcrumbsComponent class="my-5 justify-end" :nav-list="breadList" /> 
        <img
          class="w-full aspect-[2/1] object-cover object-center mb-2 lg:mb-4"
          :src="exhibition.images.lg"
        />
        <div class="flex flex-col justify-between mb-8 lg:flex-row">
          <div class="mb-4 lg:mb-0">
            <h2 class="text-2xl font-bold mb-4">{{ exhibition.title }}</h2>
            <time datetime="" class="font-bold">{{
              usePeriod(exhibition.startDate, exhibition.endDate)
            }}</time>
          </div>
          <div class="flex flex-row-reverse justify-between lg:flex-col lg:justify-start">
            <div class="flex mb-2">
              <RouterLink
                to="/exhibitions"
                class="btn border border-dark-800 px-5 mr-4 hover:border-primary hover:text-primary"
                >回列表</RouterLink
              >
              <RouterLink
                to="/exhibitions/1/content"
                target="_blank"
                class="btn bg-primary text-white hover:bg-dark"
              >
                前往看展
              </RouterLink>
            </div>
            <ul class="flex justify-end text-2xl">
              <li class="me-4">
                <a href="#"><i class="fa-regular fa-calendar"></i></a>
              </li>
              <li class="me-4">
                <a href="#"><i class="fa-regular fa-heart"></i></a>
              </li>
              <li>
                <a href="#"><i class="fa-solid fa-share-nodes"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 class="font-bold mb-2">展覽概述：</h3>
          <p class="mb-8">{{ exhibition.description }}</p>
          <h3 class="font-bold mb-2">展覽亮點：</h3>
          <div v-html="exhibition.content" class="content mb-8"></div>
          <h3 class="font-bold mb-2">展品資訊：</h3>
          <div class="relative overflow-hidden mb-8">
            <CollectionSlides />
          </div>
          <h4 class="font-bold mb-2">展覽留言<span class="comment-num">(2)</span></h4>
          <div class="relative border-b pb-[24px] mb-3">
            <input
              type="text"
              id="comment"
              class="form-input bg-transparent border-dark-400 rounded-3xl w-full py-2 px-4 placeholder:text-dark-600"
              placeholder="新增留言"
            />
            <button type="button" class="absolute right-4 top-2 hover:text-primary">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <ul class="space-y-5">
            <li v-for="i in 1" :key="i + 'i'">
              <div class="border-b border-dark-400 px-2">
                <div class="pt-4 pb-2">
                  <div class="flex items-center">
                    <div class="w-[36px] h-[36px] mr-2">
                      <img
                        src="/images/user-3.webp"
                        class="object-cover object-center"
                        alt="文化探索者"
                      />
                    </div>
                    <div class="font-semibold mr-2">文化探索者</div>
                    <time class="text-primary">2023/08/10</time>
                  </div>
                </div>
                <div class="pt-4 pb-2">
                  <p class="pb-2 pl-11 lg:pb-4 min-h-[50px] font-medium">
                    之前去故宮看過一次這檔展覽，沒想到還有線上展可以重溫，琺瑯彩瓷的美歷經百年也不會褪色！
                  </p>
                  <div class="flex justify-end flex-grow gap-2 mb-3 lg:hidden"></div>
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
                          <img
                            src="/images/user-2.webp"
                            class="object-cover object-center"
                            alt="策展者"
                          />
                        </div>
                        <p class="font-semibold mr-2">策展人</p>
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
  <BackgroundComponent />
</template>
<script setup>
import { ref, reactive } from 'vue'
// import { useRouter } from 'vue-router'
import { usePeriod } from '../composables/format'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import CollectionSlides from '../components/exhibition/CollectionSlides.vue'
import BackgroundComponent from '../components/background/BackgroundComponent.vue'

import { storeToRefs } from 'pinia'
import { useExhibitionStore } from '../stores/exhibitsStore'
import { useRouterStore } from '../stores/routerStore'
import { useSlideStore } from '../stores/slideStore'

const routerStore = useRouterStore()
const { exhibitionId } = storeToRefs(routerStore)

const slideStore = useSlideStore()
const { getSlide } = slideStore

// const router = useRouter()

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
// const menuContent = reactive([
//   {
//     code: 'recent',
//     title: '當期展覽'
//   },
//   {
//     code: 'coming',
//     title: '近期展覽'
//   }
// ])
// const curMenuItem = ref(menuContent[0])
// const path = (item) => {
//   curMenuItem.value = item
//   breadList[breadList.length - 1].title = item.title
//   router.push({ path: `/exhibitions`, query: { period: item.title } })
// }

const exhibitionStore = useExhibitionStore()
const { exhibition, exhibitionCollections } = storeToRefs(exhibitionStore)
const { fetchExhibition } = exhibitionStore

const isOpen = ref(1)

const toggleReply = (id) => {
  isOpen.value = isOpen.value === id ? '' : id
}

;(async () => {
  await fetchExhibition(exhibitionId.value)
  getSlide(exhibitionCollections.value.length, {
    default: 1,
    md: 2,
    lg: 3
  })
})()
</script>

<style>
.content ol {
  list-style-type: decimal;
  padding-left: 24px;
  line-height: 1.5;
}
.content li {
  margin-bottom: 8px;
}

.search {
  @apply py-3 w-full border-dark-800 bg-white text-dark-600 placeholder:text-dark-600 focus:border-primary focus:ring-primary;
}
</style>
