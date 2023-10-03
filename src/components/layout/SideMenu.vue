<template>
  <div class="text-lg font-semibold">
    <ul class="grid grid-cols-2 lg:block">
      <li v-for="item in menu" :key="item.code">
        <button
          type="button"
          class="btn block text-center transition-all duration-300 w-full border-b border-x border-dark-400 px-2 py-3 lg:text-left lg:border-x-0"
          :class="{ 'text-white bg-primary': selectedOption.code === item.code }"
          @click="emit('selectItem', item)"
        >
          {{ item.title }}
          <!-- todo 各分類數量 (可以加上 props 決定是否要顯示) -->
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  menu: Array,
  selectedOption: Object
})
const emit = defineEmits(['selectItem'])

const { menu, selectedOption } = toRefs(props)
</script>
