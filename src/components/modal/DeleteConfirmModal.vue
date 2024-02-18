<template>
  <div
    v-if="isVisible"
    ref="deleteConfirm"
    class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6"
    aria-hidden="false"
    tabindex="-1"
  >
    <article
      class="flex flex-col relative m-0 rounded-md bg-white w-full lg:w-[30%]"
      aria-labelledby="modal-title"
      aria-describedby="modal-body"
    >
      <header class="flex p-4 items-center justify-between">
        <div class="flex items-center gap-2">
          <img class=" w-5 h-5" src="/images/icon/warning-icon.png" alt="warning">
          <span class="m-0 text-xl font-medium">確定要刪除</span>
        </div>
        <button
          type="button"
          class="text-2xl"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark" @click="closeModal"></i>
        </button>
      </header>
      <main class="relative flex-[1_1_auto] p-4">
        <p>刪除後便不可復原</p>
      </main>
      <footer class="flex flex-shrink-0 flex-wrap items-center justify-end flex-row p-4 gap-1">
        <button
          type="button"
          class="flex items-center justify-center px-4 font-medium bg-gray-200 h-9 rounded hover:bg-gray-300 transition-all duration-300"
          data-dismiss="modal"
        >
          <span class="flex items-center justify-center space-x-2" @click="closeModal">取消</span>
        </button>
        <button
          type="button"
          class="flex items-center justify-center px-4 font-medium bg-primary hover:opacity-80 text-white h-9 rounded transition-all duration-300"
        >
          <span class="flex items-center justify-center space-x-2" @click="delConfirm">確認</span>
        </button>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { useCommentStore } from '@/stores/commentStore'

const commentStore = useCommentStore()
const { deleteComment } = commentStore

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    require: true,
  }
})

const  { isVisible, id } = toRefs(props)
const emit = defineEmits(['updateModalVisible'])

const closeModal = () => {
  emit('updateModalVisible', false)
}

const delConfirm = () => {
  console.log('id.value)',id.value);
  deleteComment(id.value)
  emit('updateModalVisible', false)
}
</script>