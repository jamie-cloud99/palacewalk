<template>
  <div v-if="memberCommentList.length">
    <div class="flex justify-end py-4">
      <button type="button" class="btn">
        排序
        <i class="ml-2 fa-solid fa-arrow-down-wide-short"></i>
      </button>
    </div>
    <ul class="space-y-5">
      <li v-for="comment in memberCommentList" :key="comment.id">
        <div class="border-y border-dark-600 px-2">
          <div
            class="flex justify-between items-center gap-2 flex-wrap pt-4 pb-2 border-b border-dark"
          >
            <h3 class="text-warning-600 text-lg font-black line-clamp-1 lg:text-2xl">
              {{ comment.exhibition?.title }}
            </h3>
            <div class="hidden lg:flex justify-end flex-grow gap-2">
              <button
                type="button"
                class="btn bg-dark text-white px-4 font-semibold hover:bg-primary"
                :class="{
                  '!bg-transparent !text-dark !border !border-dark hover:!text-primary hover:!border-primary':
                    isEdit === comment.id
                }"
                @click="toggleEdit(comment.id)"
              >
                <span v-if="isEdit === comment.id">取消</span><span v-else>編輯</span>
              </button>
              <button
                v-if="isEdit === comment.id"
                type="button"
                class="btn bg-dark text-white px-4 font-semibold hover:bg-primary"
                @click="confirmEdit(comment)"
              >
                確認
              </button>
              <button
                v-if="!(isEdit === comment.id)"
                type="button"
                class="btn border border-dark px-4 font-semibold hover:border-primary hover:text-primary"
                data-toggle="modal"
                @click="openModal()"
              >
                刪除
              </button>
              <DeleteConfirmModal
                :id="comment.id"
                :isVisible="isModalVisible"
                @updateModalVisible="isModalVisible = $event"
              />
          </div>
          </div>
          <div class="pt-4 pb-2">
            <input
              v-if="isEdit === comment.id"
              v-model="tempContent"
              type="text"
              class="form-input w-full max-w-[800px] border-dark-400 mb-3"
            />
            <p v-else class="pb-2 lg:pb-4 min-h-[50px] font-medium">
              {{ comment.content }}
            </p>
            <div class="flex justify-end flex-grow gap-2 mb-3 lg:hidden">
              <button
                type="button"
                class="btn bg-dark text-white px-4 font-semibold hover:bg-primary"
                :class="{
                  '!bg-transparent !text-dark !border !border-dark hover:!text-primary hover:!border-primary':
                    isEdit === comment.id
                }"
                @click="toggleEdit(comment.id)"
              >
                <span v-if="isEdit === comment.id">取消</span><span v-else>編輯</span>
              </button>
              <button
                v-if="isEdit === comment.id"
                type="button"
                class="btn bg-dark text-white px-4 font-semibold hover:bg-primary"
                @click="confirmEdit(comment)"
              >
                確認
              </button>
              <button
                v-if="!(isEdit === comment.id)"
                type="button"
                class="btn border border-dark px-4 font-semibold hover:border-primary hover:text-primary"
              >
                刪除
              </button>
              <DeleteConfirmModal
                :id="comment.id"
                :isVisible="isModalVisible"
                @updateModalVisible="isModalVisible = $event"
              />
          </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <button
                  v-if="comment.reply?.id"
                  type="button"
                  class="btn pl-0 text-dark-600 hover:text-dark"
                  @click="toggleReply(comment.id)"
                >
                  <span v-if="isOpen !== comment.id">顯示</span><span v-else>隱藏</span>回覆
                </button>
                <RouterLink
                  :to="{ path: `/exhibitions/${comment.exhibition?.id}`, hash: '#comments' }"
                  class="btn pl-0 text-dark-600 hover:text-dark"
                  >查看原始留言</RouterLink
                >
              </div>
              <p class="text-dark-600">{{ useDateFromUnix(comment.createdAt).fullDate }}</p>
            </div>
            <div
              class="max-h-0 overflow-hidden transition-all duration-500"
              :class="{ '!max-h-[500px]': isOpen === comment.id }"
            >
              <hr class="border-dark-400 mb-3" />
              <div v-if="comment?.reply" class="flex items-start gap-2">
                <img
                  :src="`images/user-${comment.reply?.user?.id}.webp`"
                  alt=""
                  class="block flex-shrink-0 rounded-full w-9 h-9"
                />
                <div class="flex-grow">
                  <p class="text-warning-800 font-black leading-[36px]">策展人</p>
                  <div class="flex justify-between flex-wrap gap-2">
                    <p class="lg:mb-2">
                      {{ comment.reply?.content }}
                    </p>
                    <p class="text-dark-600 flex-grow text-right">{{ comment.reply?.createdAt }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-else class="py-10 text-lg lg:text-2xl">你還沒發表過留言耶~</div>
  <div class="flex py-10 lg:py-15">
    <!-- <PageComponent :pages="pages" @change="turnPage" /> -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDateFromUnix } from '@/composables/format'
import { useCommentStore } from '../stores/commentStore'
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal.vue'

const commentStore = useCommentStore()
const { memberCommentList } = storeToRefs(commentStore)
const { fetchMemberComments, updateComment } = commentStore

const isOpen = ref(null)
const tempContent = ref('')

const toggleReply = (id) => {
  isOpen.value = isOpen.value === id ? null : id
}
// TODO: 整合 openModal()
const isModalVisible = ref(false)
const openModal = () => {
  isModalVisible.value = true
}

const isEdit = ref(null)

const toggleEdit = (id) => {
  isEdit.value = isEdit.value === id ? null : id
}

const confirmEdit = async (tempComment) => {
  const comment = { ...tempComment }
  const today = Math.floor(new Date().getTime() / 1000)
  comment.content = tempContent.value
  comment.createdAt = today
  await updateComment(comment, tempComment.id)
  toggleEdit(tempComment.id)
}

watch(
  isEdit,
  () => {
    if (memberCommentList.value?.length) {
      tempContent.value = memberCommentList.value.find(
        (comment) => comment.id === isEdit.value
      )?.content
    }
  },
  { deep: true }
)

fetchMemberComments()
</script>
