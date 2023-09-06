<template>
  <ol class="bg-light/50">
    <li
      v-for="item in collectionList"
      :key="item.id"
      class="bg-[url('../images/home-bg-2.webp')] bg-cover relative"
    >
      <div class="pt-12 pb-6 px-3 md:px-10 lg:absolute top-0 left-16 text-dark">
        <p class="text-2xl lg:text-4xl font-bold mb-1 lg:text-right lg:mb-4 drop-shadow">01</p>
        <h1
          class="text-2xl lg:text-4xl font-bold drop-shadow lg:max-h-[400px] lg:[writing-mode:vertical-rl] max-w-[300px]"
        >
          清 翠玉白菜
        </h1>
      </div>
      <div
        class="flex justify-center lg:items-center h-screen lg:px-40"
        :class="{ '!justify-start': isOpen.exhibitionMenu, '!justify-end': isOpen.collectionText }"
      >
        <img
          class="w-auto h-3/5 md:h-4/5 lg:h-[90%] object-cover object-center shadow-lg"
          :src="`/images/collection/collection-${item.imgId}.jpg`"
          :alt="item.title"
        />
      </div>
    </li>
  </ol>

  <div v-if="!isOpen.collectionText" class="fixed right-6 lg:right-10 top-10 z-[800]">
    <button
      v-if="!isOpen.exhibitionMenu"
      type="button"
      @click="[toggleSideMenu('exhibitionMenu'), exhibitionMenuCount++]"
      class="btn w-12 h-12 bg-dark bg-[url('/images/exhibitions/text-bg.webp')] border border-white text-white hover:bg-black"
      :class="{ 'shadow-twinkle': !exhibitionMenuCount }"
    >
      <i class="fa-solid fa-bars"></i>
    </button>
    <button
      v-else
      type="button"
      @click="toggleSideMenu('exhibitionMenu')"
      class="btn w-12 h-12 bg-dark bg-[url('/images/exhibitions/text-bg.webp')] border border-white text-white hover:bg-black"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>

  <div
    :class="menuClass.exhibitionMenu"
    class="fixed top-0 right-0 h-screen z-[500] transition-all duration-500"
  >
    <ExhibitionMenu />
  </div>

  <div
    v-if="!isOpen.exhibitionMenu"
    class="fixed bottom-0 right-0 w-full lg:w-fit z-[1000] lg:z-[400] lg:bottom-12 lg:right-24"
  >
    <div
      class="flex items-center justify-center lg:justify-end gap-4 px-10 pt-1 pb-5 bg-dark-200 shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)] lg:rounded-full lg:shadow-inner"
    >
      <button
        type="button"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2"
      >
        <i class="fa-solid fa-magnifying-glass-plus drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">查看細節</p>
      </button>
      <button
        type="button"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2"
      >
        <i class="fa-solid fa-circle-arrow-left drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">上一個</p>
      </button>
      <button
        type="button"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2"
      >
        <i class="fa-solid fa-circle-arrow-right drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">下一個</p>
      </button>
      <button
        type="button"
        @click="toggleSideMenu('collectionText')"
        class="btn w-20 h-15 font-bold text-2xl lg:text-8 hover:text-primary -mt-2"
      >
        <i class="fa-solid fa-book-open drop-shadow-lg"></i>
        <p class="text-xs drop-shadow-sm">展品資訊</p>
      </button>
    </div>
  </div>

  <div
    :class="menuClass.collectionText"
    class="fixed overflow-hidden top-0 left-0 h-screen z-[300] transition-all duration-500"
  >
    <CollectionText />
  </div>

  <div
    v-if="isOpen.collectionText || isOpen.exhibitionMenu"
    class="fixed inset-0 z-[100] bg-dark/50"
  ></div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '../stores/statusStore.js'
import ExhibitionMenu from '../components/exhibition/ExhibitionMenu.vue'
import CollectionText from '../components/exhibition/CollectionText.vue'

const statusStore = useStatusStore()
const { isOpen, menuClass, exhibitionMenuCount } = storeToRefs(statusStore)
const { toggleSideMenu } = statusStore

const collectionList = ref([
  {
    id: '1',
    title: '翠玉白菜',
    imgId: 'U001'
  }
])
</script>

<style>
:root {
  --dark-800: #525252;
  --dark: #121212;
}

.max-w {
  max-width: 500px;
}

.bg-radial-dark {
  background: radial-gradient(farthest-corner at 40px 200px, var(--dark-800), var(--dark));
}

.shadow-twinkle {
  box-shadow: 0 3px 2px 0 white;
  animation: twinkle 1s linear infinite both;
}

.shadow-twinkle:hover {
  animation: paused;
}

@keyframes twinkle {
  0% {
    box-shadow: 0 3px 5px 1px rgb(167, 167, 167);
  }
  100% {
    box-shadow:
      1px 1px 2px 1px rgba(230, 226, 226, 0.779),
      -1px -1px 2px 0 white;
  }
}
</style>
