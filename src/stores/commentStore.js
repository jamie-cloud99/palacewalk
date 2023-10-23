import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useMemberStore } from './memberStore'

import axios from 'axios'

const { VITE_JSON_SERVER } = import.meta.env

export const useCommentStore = defineStore('comment', () => {
  const memberStore = useMemberStore()
  const commentList = ref([])
  const reply = ref({})

  const fetchComments = async (exhibitionId) => {
    const apiUrl = `${VITE_JSON_SERVER}exhibitions/${exhibitionId}?_embed=comments`
    try {
      const res = await axios.get(apiUrl)
      commentList.value = res.data.comments
      const { memberList } = storeToRefs(memberStore)
      const { fetchMembersAll } = memberStore
      if (!memberList.value.length) await fetchMembersAll()

      commentList.value.forEach(async (comment) => {
        await fetchReplies(comment.id)
        comment.reply = reply.value
        comment.reply.user = memberList.value.find((member) => member.id === comment.reply.userId)
        comment.user = memberList.value.find((member) => member.id === comment.userId)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReplies = async (commentId) => {
    const apiUrl = `${VITE_JSON_SERVER}replies/${commentId}`
    try {
      const res = await axios.get(apiUrl)
      reply.value = res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateComments = async (comment, id = null) => {
    let apiUrl = `${VITE_JSON_SERVER}600/comments`
    let method = 'post'
    let data = {}
    if (id) {
      const { member } = storeToRefs(memberStore)
      const createdAt = new Date().getTime()
      const userId = member.value.id
      data = { ...comment, createdAt, userId }
    } else {
      apiUrl = `${VITE_JSON_SERVER}600/comments/${id}`
      method = 'patch'
      data = { ...comment }
    }
    try {
      const res = await axios[method](apiUrl, data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    commentList,
    updateComments,
    fetchComments,
    fetchReplies
  }
})
