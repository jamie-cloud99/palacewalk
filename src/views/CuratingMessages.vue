<template>
  <div class="container pt-6 lg:pt-12">
    <div class="md:flex justify-between items-center space-y-3 md:space-y-0 mb-6 lg:mb-10">
      <BreadcrumbsComponent :nav-list="breadList" class="-ml-2 order-2" />
      <h2 class="font-bold text-2xl lg:text-8 order-1">
        <span>《{{ exhibition.title }}》</span>展覽留言
      </h2>
    </div>

    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-lg lg:text-2xl">
        展覽留言<span>({{ exhibition.comments.length }})</span>
      </h3>
      <RouterLink to="#" class="btn px-6 text-white bg-dark hover:bg-primary">
        前往原始留言
      </RouterLink>
    </div>

    <ul class="border-y border-dark-600 divide-y divide-dark-600">
      <li v-for="comment in exhibition.comments" :key="comment.id" class="py-4 lg:py-6">
        <div class="flex justify-between">
          <div class="flex items-center gap-x-2 lg:gap-x-4">
            <img
              :src="`/images/user-${comment.user.id}.webp`"
              :alt="comment.user.name"
              class="h-9 w-9 flex-shrink-0 rounded-full"
            />
            <p class="font-semibold">{{ comment.user.name }}</p>
            <time class="text-primary">{{ comment.createAt }}</time>
          </div>
          <button type="button" class="btn px-6 bg-primary text-white hover:bg-dark">回覆</button>
        </div>
        <div class="ml-[52px]">
          <p class="mb-6">{{ comment.content }}</p>
          <div v-if="comment.reply">
            <div class="flex items-center gap-x-2 lg:gap-x-4">
              <img
                :src="`/images/user-${comment.reply.user.id}.webp`"
                :alt="comment.reply.user.name"
                class="h-9 w-9 flex-shrink-0 rounded-full"
              />
              <p>{{ comment.reply.user.name }} <span>(策展人)</span></p>
              <time datetime="">{{ comment.reply.createAt }}</time>
            </div>
            <div class="ml-[52px]">
              <p c>{{ comment.reply.content }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="flex py-6 lg:py-10">
      <PageComponent :pages="pages" @change="turnPage" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BreadcrumbsComponent from '../components/layout/BreadcrumbsComponent.vue'
import PageComponent from '../components/layout/PageComponent.vue'

const pages = ref({
  totalPages: 3,
  curPage: 1,
  havePre: false,
  haveNext: true
})

const turnPage = (page) => {
  pages.value.curPage = page
  pages.value.havePre = page > 1
  pages.value.haveNext = page < pages.value.totalPages
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const breadList = reactive([
  {
    title: '首頁',
    path: '/'
  },
  {
    title: '策展專區',
    path: '/curating'
  },
  {
    title: '展覽留言',
    path: '/curating/messages'
  }
])

const exhibition = ref({
  id: '2',
  title: '風格故事—琺瑯彩瓷特展',
  startDate: '2023.07.07',
  endDate: '2024.07.16',
  status: 'released',
  imgId: 'U001',
  comments: [
    {
      id: 1,
      user: {
        id: '1',
        name: '文化探索者'
      },
      content:
        '之前去故宮看過一次這檔展覽，沒想到還有線上展可以重溫，琺瑯彩瓷的美歷經百年也不會褪色！',
      createAt: '2023.08.08',
      reply: {
        user: {
          id: '4',
          name: '匿名藝術家'
        },
        content: '因為太想把展品抱回家，所以讓大家在家也能看😊',
        createAt: '2023.08.09'
      }
    },
    {
      id: 1,
      user: {
        id: '3',
        name: '見聞者'
      },
      content:
        '最喜歡〈銅胎畫琺瑯方盤〉這件作品！淡雅的配色跟曲線的優雅活力，都讓人想一看再看呢！已經加入我的收藏清單了～～',
      createAt: '2023.07.13',
      reply: {
        user: {
          id: '4',
          name: '匿名藝術家'
        },
        content: '〈銅胎畫琺瑯方盤〉是康熙御製的傑作，看來你跟皇帝有同樣獨到的眼光呢！',
        createAt: '2023.07.15'
      }
    }
  ]
})
</script>
