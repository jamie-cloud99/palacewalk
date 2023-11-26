import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useMemberStore } from './memberStore'

import axios from 'axios'

const { VITE_JSON_SERVER } = import.meta.env

export const useCommentStore = defineStore('comment', () => {
  const memberStore = useMemberStore()
  const commentList = ref([])
  const reply = ref({})
  const curExhibitionId = ref(null)
  const memberCommentList = ref([])

  const fetchComments = async (exhibitionId) => {
    const apiUrl = `${VITE_JSON_SERVER}exhibitions/${exhibitionId}?_embed=comments`
    try {
      const res = await axios.get(apiUrl)
      commentList.value = res.data.comments
      const { memberList } = storeToRefs(memberStore)
      const { fetchMembersAll } = memberStore
      if (!memberList.value.length) await fetchMembersAll()
      commentList.value.forEach(async (comment) => {
        reply.value = {}
        await fetchReplies(comment.id)
        if (reply?.value?.length) {
          comment.reply = reply.value
          comment.reply.user = memberList.value.find((member) => member.id === comment.reply.userId)
        }

        comment.user = memberList.value.find((member) => member.id === comment.userId)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReplies = async (commentId) => {
    const apiUrl = `${VITE_JSON_SERVER}replies/?commentId=${commentId}`
    try {
      const res = await axios.get(apiUrl)
      reply.value = res.data[0]
    } catch (error) {
      console.log(error.response)
    }
  }

  const updateComment = async (comment, id = null) => {
    let apiUrl = `${VITE_JSON_SERVER}600/comments`
    let method = 'post'
    let data = {}
    curExhibitionId.value = comment.exhibitionId
    if (!id) {
      const { member } = storeToRefs(memberStore)
      const createdAt = Math.floor(new Date().getTime() / 1000)
      const userId = member.value.id
      data = { ...comment, createdAt, userId }
    } else {
      apiUrl = `${VITE_JSON_SERVER}600/comments/${id}`
      method = 'patch'
      data = { ...comment }
    }

    try {
      const res = await axios[method](apiUrl, data)
      if (res.data) {
        id ? fetchMemberComments() : fetchComments(curExhibitionId.value)
      } else {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberComments = async () => {
    const { member, memberList } = storeToRefs(memberStore)
    const apiUrl = `${VITE_JSON_SERVER}600/comments/?userId=${member.value.id}&_expand=exhibition`
    try {
      const res = await axios.get(apiUrl)
      memberCommentList.value = res.data
      memberCommentList.value.forEach(async (comment) => {
        reply.value = {}
        await fetchReplies(comment.id)
        if (reply?.value?.length) {
          comment.reply = reply.value
          comment.reply.user = memberList.value.find((member) => member.id === comment.reply.userId)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async (id) => {
    const apiUrl = `${VITE_JSON_SERVER}600/comments/${id}`
    try {
      await axios.delete(apiUrl)
      fetchMemberComments()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    commentList,
    memberCommentList,
    updateComment,
    fetchComments,
    fetchReplies,
    fetchMemberComments,
    deleteComment
  }
})
