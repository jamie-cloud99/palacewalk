<template>
  <div class="text-lg font-semibold">
    <ul class="grid grid-cols-2 lg:block">
      <li v-for="item in menu" :key="item.code">
        <button
          type="button"
          class="btn block text-center transition-all duration-300 w-full border-b border-x border-dark-400 px-2 py-3 lg:text-left lg:border-x-0 "
          :class="{ 'text-white bg-primary': selectedOption.code === item.code, 'hover:bg-dark-200': selectedOption.code!==item.code }"
          @click="emit('selectItem', item)"
        >
          {{ item.title }}
          <span v-if="showNum">（{{ item.num }}）</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  menu: Array,
  selectedOption: Object,
  showNum: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['selectItem'])

const { menu, selectedOption, showNum } = toRefs(props)
</script>
