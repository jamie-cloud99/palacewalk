<template>
  <!-- TODO: 取消和確認 btn hover 效果 樣式確認-->
  <div
    v-show="isVisible"
    role="dialog"
    id="modal-example"
    aria-hidden="false"
    class="modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6 fade"
    tabindex="-1"
  >

    <div
      class="absolute top-0 left-0 z-[0] w-full h-full"
      tabindex="-1"
    ></div>

    <article
      class="flex flex-col relative m-0 rounded-md bg-white sm:my-16 w-[30%]"
      aria-labelledby="modal-title"
      aria-describedby="modal-body"
    >
    <!-- <div class="bg-primary w-9 h-9">
      <i class="fa-solid fa-triangle-exclamation"></i>
    </div> -->

      <header class="flex p-4 items-center justify-between">
        <h2 class="m-0 text-xl font-medium max-w-[calc(100%_-_3rem)]">Modal title</h2>
        <button
          type="button"
          class="text-2xl"
          data-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark" @click="closeModal"></i>
        </button>
      </header>
      <main class="relative flex-[1_1_auto] p-4" style="--size: 32rem">
        <p>確定要刪除此留言嗎？</p>
      </main>
      <footer class="flex flex-shrink-0 flex-wrap items-center justify-end flex-row p-4 gap-1" style="--size: 32rem">
        <button
          type="button"
          class="flex items-center justify-center px-4 font-medium bg-gray-200 text-black h-9 rounded md hover:bg-gray-300 transition-all duration-300"
          data-dismiss="modal"
        >
          <span class="flex items-center justify-center space-x-2" @click="closeModal">取消</span>
        </button>
        <button
          type="button"
          class="flex items-center justify-center px-4 font-medium bg-primary text-white h-9 rounded md transition-all duration-300"
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
  deleteComment(id.value)
  emit('updateModalVisible', false)
}
</script>