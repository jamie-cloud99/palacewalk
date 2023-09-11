<template>
  <div class="flex justify-end py-4">
    <button type="button" class="btn">
      排序
      <i class="ml-2 fa-solid fa-arrow-down-wide-short"></i>
    </button>
  </div>
  <ul class="space-y-5">
    <li v-for="comment in commentList" :key="comment.id">
      <div class="border-y border-dark-600 px-2">
        <div
          class="flex justify-between items-center gap-2 flex-wrap pt-4 pb-2 border-b border-dark"
        >
          <h3 class="text-warning-600 text-lg font-black line-clamp-1 lg:text-2xl">
            {{ comment.exhibition.title }}
          </h3>
          <div class="hidden lg:flex justify-end flex-grow gap-2">
            <button
              type="button"
              class="btn bg-dark text-white px-4 font-semibold hover:bg-primary"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn border border-dark px-4 font-semibold hover:border-primary hover:text-primary"
            >
              刪除
            </button>
          </div>
        </div>
        <div class="pt-4 pb-2">
          <p class="pb-2 lg:pb-4 min-h-[50px] font-medium">
            {{ comment.content }}
          </p>
          <div class="flex justify-end flex-grow gap-2 mb-3 lg:hidden">
            <button
              type="button"
              class="btn bg-dark text-white px-4 font-semibold hover:bg-primary"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn border border-dark px-4 font-semibold hover:border-primary hover:text-primary"
            >
              刪除
            </button>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <button
                type="button"
                class="btn pl-0 text-dark-600 hover:text-dark"
                @click="toggleReply(comment.id)"
              >
                <span v-if="isOpen !== i">顯示</span><span v-else>隱藏</span>回覆
              </button>
              <a href="" class="btn pl-0 text-dark-600 hover:text-dark">查看原始留言</a>
            </div>
            <p class="text-dark-600">{{ comment.createdAt }}</p>
          </div>
          <div
            class="max-h-0 overflow-hidden transition-all duration-500"
            :class="{ '!max-h-[500px]': isOpen === comment.id }"
          >
            <hr class="border-dark-400 mb-3" />
            <div class="flex items-start gap-2">
              <img
                :src="`images/user-${comment.reply.user.id}.webp`"
                alt=""
                class="block flex-shrink-0 rounded-full w-9 h-9"
              />
              <div class="flex-grow">
                <p class="text-warning-800 font-black leading-[36px]">策展人</p>
                <div class="flex justify-between flex-wrap gap-2">
                  <p class="lg:mb-2">
                    {{ comment.reply.content }}
                  </p>
                  <p class="text-dark-600 flex-grow text-right">{{ comment.reply.createdAt }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <div class="flex py-10 lg:py-15">
    <PageComponent :pages="pages" @change="turnPage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMemberStore } from '../stores/memberStore'
import PageComponent from '../components/layout/PageComponent.vue'

const memberStore = useMemberStore()
const { pages, turnPage } = memberStore

const isOpen = ref('1')

const toggleReply = (id) => {
  isOpen.value = isOpen.value === id ? '' : id
}

const commentList = ref([
  {
    id: '1',
    content: '喜歡瓷胎粉彩玉堂富貴鼻煙壺，精緻又繽紛！',
    createdAt: '2023.09.01',
    exhibition: {
      id: '1',
      title: '士拿乎—清宮鼻煙壺的時尚風潮'
    },
    user: {
      id: '1',
      name: '文化探索者'
    },
    reply: {
      user: {
        id: '2',
        name: '評論達人'
      },
      content: '我也很喜歡上面暈染細膩的花',
      createdAt: '2023.09.02'
    }
  },
  {
    id: '2',
    content: '展覽中都是故宮知名的展品，很適合想快速了解故宮文物的人欣賞',
    createdAt: '2023.09.13',
    exhibition: {
      id: '3',
      title: '故宮經典—藝術與文化策展'
    },
    user: {
      id: '1',
      name: '文化探索者'
    },
    reply: {
      user: {
        id: '2',
        name: '評論達人'
      },
      content: '謝謝你喜歡，歡迎多來逛逛！',
      createdAt: '2023.09.16'
    }
  }
])
</script>
