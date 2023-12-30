<template>
  <div
    class="bg-image bg-dark text-white bg-center w-full max-w-[450px] xl:max-w-[500px] h-full overflow-hidden after:bg-dark"
  >
    <div class="relative z-10 py-10 px-6 lg:px-14">
      <div class="flex justify-between">
        <p class="text-4xl font-bold mb-4">{{ getZeroBaseOrder(collection.index + 1) }}</p>
        <button
          type="button"
          @click="toggleSideMenu('collectionText')"
          class="btn w-12 h-12 bg-white text-dark bg-[url('/images/exhibitions/text-bg.webp')] border-2 border-dark hover:bg-white/70"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <h2 class="text-4xl font-bold mb-6">{{ collection.title }}</h2>
      <div
        class="max-h-[600px] md:max-h-[1000px] lg:max-h-[800px] scrollbar-thin scrollbar-thumb-dark-200 scrollbar-track-rounded scrollbar-thumb-rounded overflow-y-scroll leading-7 space-y-4"
      >
        <div class="h-fit lg:pb-[400px]">
          <div class="content">
            <h3 class="lg:text-xl font-semibold my-2">作品簡介</h3>
            <div v-if="collection.description" v-html="collection.description"></div>
            <div v-else>暫無簡介</div>
            <div v-if="collection.appreciation">
              <h3 class="lg:text-xl font-semibold my-2">作品賞析</h3>
              <div v-html="collection.appreciation"></div>
            </div>
          </div>
          <div class="pt-3 pr-3">
            <img class="w-full h-auto" :src="collection.images?.main" :alt="collection.title" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { getZeroBaseOrder } from '@/composables/format'
import { useStatusStore } from '@/stores/statusStore.js'
const statusStore = useStatusStore()
const { toggleSideMenu } = statusStore

const props = defineProps({
  collection: Object
})

const { collection } = toRefs(props)
</script>

<style scoped>
.bg-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../images/exhibitions/text-bg.webp');
}

.content {
  @apply space-y-3;
}

::v-deep(.content) p {
  @apply mb-2;
}
</style>
