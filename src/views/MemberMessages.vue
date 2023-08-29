<template>
  <div class="flex justify-end py-4">
    <button type="button" class="btn">
      排序
      <i class="ml-2 fa-solid fa-arrow-down-wide-short"></i>
    </button>
  </div>
  <ul class="space-y-5">
    <li v-for="i in 5" :key="i+ 'i'">
      <div class="border-y border-dark-600 px-2">
        <div class="flex justify-between items-center gap-2 flex-wrap pt-4 pb-2 border-b border-dark">
          <h3 class="text-warning-600 text-lg font-black line-clamp-1 lg:text-2xl">風格故事—琺瑯彩瓷特展</h3>
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
            之前去故宮看過一次這檔展覽，沒想到還有線上展可以重溫，琺瑯彩瓷的美歷經百年也不會褪色！
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
              <button type="button" class="btn pl-0 text-dark-600 hover:text-dark"
              @click="toggleReply(i)">
                <span v-if="isOpen === i">顯示</span><span v-else>隱藏</span>回覆
              </button>
              <a href="" class="btn pl-0 text-dark-600 hover:text-dark">查看原始留言</a>
            </div>
            <p class="text-dark-600">2023/08/10</p>
          </div>
          <div class="max-h-0 overflow-hidden transition-all duration-500" :class="{'!max-h-[500px]': isOpen===i}">
            <hr class="border-dark-400 mb-3" />
            <div class="flex items-start gap-2">
              <img src="https://fakeimg.pl/36" alt="" class="block flex-shrink-0 rounded-full" />
              <div class="flex-grow">
                <p class="text-warning-800 font-black leading-[36px]">策展人</p>
                <div class="flex justify-between flex-wrap gap-2">
                  <p class="lg:mb-2">
                    銅胎畫琺瑯方盤是康熙御製的傑作，看來你跟皇帝有同樣獨到的眼光呢！
                  </p>
                  <p class="text-dark-600 flex-grow text-right">2023/08/10</p>
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
import { useMemberStore } from '../stores/memberStore';
import PageComponent from '../components/layout/PageComponent.vue'

const memberStore = useMemberStore()
const { pages, turnPage } = memberStore

const isOpen = ref('')

const toggleReply = (id) => {
  isOpen.value = isOpen.value===id ? '' : id
}

</script>
