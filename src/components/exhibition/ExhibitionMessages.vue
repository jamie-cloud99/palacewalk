<template>
  <h4 class="font-bold mb-2">展覽留言<span class="comment-num">{{ `(${commentList.length })`}}</span></h4>
  <div class="relative border-b pb-[24px] mb-3">
    <input
      type="text"
      id="comment"
      class="form-input bg-transparent border-dark-400 rounded-3xl w-full py-2 px-4 placeholder:text-dark-600"
      placeholder="新增留言"
      v-model.trim="tempContent"
    />
    <button
      type="submit"
      class="absolute right-4 top-2 hover:text-primary"
      @click.prevent="postNewComment(tempComment)"
    >
      <i class="fa-solid fa-paper-plane"></i>
    </button>
  </div>
  <ul id="comments" v-if="commentList.length" class="space-y-5">
    <li v-for="item in commentList" :key="item.id">
      <div class="border-b border-dark-400 px-2">
        <div class="pt-4 pb-2">
          <div class="flex items-center">
            <div class="mr-2">
              <img
                :src="item.user?.imageUrl"
                class="object-cover object-center w-9 h-9 rounded-full"
                :alt="item.user?.name"
                referrerpolicy="no-referrer"
              />
            </div>
            <div class="font-semibold mr-2">{{ item.user?.name }}</div>
            <time class="text-primary">{{ useDateFromUnix(item.createdAt).fullDate }}</time>
          </div>
        </div>
        <div class="pt-4 pb-2">
          <p class="pb-2 pl-11 lg:pb-4 font-medium">
            {{ item.content }}
          </p>
          <div class="flex justify-end flex-grow gap-2 mb-3 lg:hidden"></div>
          <div v-if="item?.reply?.content">
            <div class="flex gap-2 pl-11">
              <button
                type="button"
                class="btn pl-0 text-sm text-dark-600 hover:text-dark"
                @click="toggleReply(item.id)"
              >
                <span v-if="isOpen === item.id">隱藏</span><span v-else>顯示</span>回覆
              </button>
            </div>
          </div>
          <div
            class="max-h-0 overflow-hidden transition-all duration-500"
            :class="{ '!max-h-[500px]': isOpen === item.id }"
          >
            <hr class="border-dark-400 mb-3" />
            <div class="pl-10 gap-2">
              <div class="flex items-center">
                <div class="mr-2">
                  <img
                    :src="item.reply?.user?.imageUrl"
                    class="object-cover object-center w-9 h-9 rounded-full ring-2 ring-warning"
                    :alt="item.reply?.user?.name"
                    referrerpolicy="no-referrer"
                  />
                </div>
                <p class="font-semibold mr-2">
                  {{ item.reply?.user?.name
                  }}<span class="ml-1 text-xs text-white bg-warning">策展人</span>
                </p>
                <time class="text-primary">{{
                  useDateFromUnix(item.reply?.createdAt).fullDate
                }}</time>
              </div>
              <div class="pt-4 pb-2">
                <p class="pl-11">
                  {{ item.reply?.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <h5 v-else class="text-2xl font-medium">期待你留下第一則留言~</h5>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouterStore } from '@/stores/routerStore'
import { useCommentStore } from '@/stores/commentStore'
import { useDateFromUnix } from '@/composables/format'

const commentStore = useCommentStore()
const { commentList } = storeToRefs(commentStore)
const { updateComment } = commentStore

const routerStore = useRouterStore()
const { exhibitionId } = storeToRefs(routerStore)

const tempContent = ref('')
const tempComment = computed(() => {
  return {
    exhibitionId: parseInt(exhibitionId.value, 10),
    content: tempContent.value
  }
})

const isOpen = ref(null)

const toggleReply = (id) => {
  isOpen.value = isOpen.value === id ? null : id
}

const postNewComment = async (comment) => {
  await updateComment(comment)
  tempContent.value = ''
}
</script>

<style scoped></style>
