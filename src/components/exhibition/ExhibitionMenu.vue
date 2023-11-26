<template>
  <div
    class="bg-image w-full text-white bg-center h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-dark-200 scrollbar-track-rounded scrollbar-thumb-rounded after:bg-orange-800"
  >
    <div class="relative z-10 py-10 px-6 lg:px-10">
      <h2 class="text-4xl font-bold !leading-[3rem] mb-10 w-4/5">國寶精選：珍奇賞玩特展</h2>
      <ol class="space-y-4">
        <li
          v-for="(item, index) in collectionList"
          :key="item.id"
          class="cursor-pointer"
          @click="emit('change-item', index)"
        >
          <div class="flex items-start gap-4">
            <p class="text-2xl font-bold">{{ getZeroBaseOrder(index + 1) }}</p>
            <h3 class="text-2xl font-bold">{{ item.title }}</h3>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { getZeroBaseOrder } from '@/composables/format'

const props = defineProps({
  collectionList: Array
})

const { collectionList } = toRefs(props)

const emit = defineEmits(['change-item'])
</script>

<style scoped>
.bg-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('../images/exhibitions/text-bg.webp');
}
</style>
