import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useExhibitionStore } from './exhibitsStore'
import { useCollectionStore } from './collectionStore'
import axios from 'axios'

const { VITE_JSON_SERVER, VITE_API, VITE_PATH } = import.meta.env

export const useMemberStore = defineStore('member', () => {
  const exhibitionStore = useExhibitionStore()
  const collectionStore = useCollectionStore()

  const { fetchExhibitionsAll } = exhibitionStore
  const { exhibitionsAll } = storeToRefs(exhibitionStore)

  const { fetchCollectionsAll } = collectionStore
  const { collectionsAll } = storeToRefs(collectionStore)

  const memberList = ref([{}])
  const isLoggedIn = ref(false)
  const tempMember = ref({})
  const member = ref({
    imageUrl:
      'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  })

  const favoriteList = ref({
    exhibitions: [],
    collections: []
  })

  const favExhibitions = computed(() => {
    return favoriteList.value.exhibitions.map((item) => ({
      savedAt: item.savedAt,
      favId: item.favId,
      ...item.exhibition
    }))
  })

  const favCollections = computed(() => {
    return favoriteList.value.collections.map((item) => ({
      savedAt: item.savedAt,
      favId: item.favId,
      ...item.collection
    }))
  })

  const memberId = computed(() => {
    return member.value?.id
  })

  const pages = ref({
    totalPages: 3,
    curPage: 1,
    havePre: false,
    haveNext: true
  })

  const turnPage = (page) => {
    pages.value.curPage = page
    pages.value.havePre = page > 1
    pages.value.haveNext = page < pages.value.totalPages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filterFavorites = async (itemId, type) => {
    const idField = type.slice(0, -1)
    const favList = favoriteList.value[type]
    const isFavorite = (id) => favList.some((item) => item?.[idField]?.id === id)

    if (isFavorite(itemId)) {
      // !fix  api - delete (刪除一筆會把全部資料都刪掉)
      let favId
      if (type === 'exhibitions') {
        favId = favExhibitions.value.find((el) => el.id === itemId)?.favId
      } else {
        favId = favCollections.value.find((el) => el.id === itemId)?.favId
      }

      const apiUrl = `${VITE_JSON_SERVER}600/favorites/${favId}`
      console.log(apiUrl)
      // const res = await axios.delete(apiUrl)
      const res = await axios.delete(apiUrl, (req) => {
        req.options._noRemoveDependents = true
      })
      console.log(res)
      fetchFavorites()
    } else {
      const nowTimeStamp = Math.floor(new Date().getTime() / 1000)
      const apiUrl = `${VITE_JSON_SERVER}600/${type}/${itemId}/favorites`
      try {
        await axios.post(apiUrl, { userId: memberId.value, savedAt: nowTimeStamp })
      } catch (error) {
        console.log(error)
      }
    }

    fetchFavorites()
  }

  const fetchFavorites = async () => {
    const favoritesApiUrl = `${VITE_JSON_SERVER}600/users/${memberId.value}/favorites`
    try {
      const res = await axios.get(favoritesApiUrl)
      const favExhibitionIds = res.data.filter((item) => item.exhibitionId)
      const favCollectionIds = res.data.filter((item) => item.collectionId)

      if (exhibitionsAll.value.length === 0) await fetchExhibitionsAll()
      if (collectionsAll.value.length === 0) await fetchCollectionsAll()

      favoriteList.value.exhibitions = favExhibitionIds
        .map((fav) => {
          const exhibition = exhibitionsAll.value.find(
            (item) => item.id === parseInt(fav.exhibitionId)
          )
          return exhibition ? { savedAt: fav.savedAt, favId: fav.id, exhibition } : null
        })
        .filter((item) => item !== null)

      favoriteList.value.collections = favCollectionIds
        .map((fav) => {
          const collection = collectionsAll.value.find(
            (item) => item.id === parseInt(fav.collectionId)
          )
          return collection ? { savedAt: fav.savedAt, favId: fav.id, collection } : null
        })
        .filter((item) => item !== null)
    } catch (error) {
      console.log(error)
    }
  }

  const saveFavorites = async (id, type) => {
    filterFavorites(id, type)
  }

  // todo upload photo
  const uploadImage = (imgFile) => {
    const api = `${VITE_API}api/${VITE_PATH}/admin/upload`
    // const img = this.$refs.fileInput.files[0]
    const formData = new FormData()
    formData.append('file-to-upload', img)

    axios.post(api, formData).then((res) => {
      if (res.data.success) {
      }
    })
  }

  const signUp = async (user) => {
    const apiUrl = `${VITE_JSON_SERVER}users`
    try {
      await axios.post(apiUrl, user)
      const account = { email: user.email, password: user.password }
      logIn(account)
    } catch (error) {
      console.log(error)
    }
  }

  const logIn = async (account) => {
    const apiUrl = `${VITE_JSON_SERVER}login`
    try {
      const res = await axios.post(apiUrl, account)
      member.value = res.data.user
      localStorage.setItem('userId', res.data.user.id)
      isLoggedIn.value = true
      const token = res.data.accessToken
      //set cookie expireation to 1 hour
      document.cookie = `palaceToken=${token};max-age=3600;`
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = () => {
    isLoggedIn.value = false
    document.cookie = 'palaceToken=;max-age=0;'
    member.value = {}
  }

  const getToken = () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)palaceToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  }

  const fetchMember = async () => {
    const id = localStorage.getItem('userId')
    const apiUrl = `${VITE_JSON_SERVER}600/users/${id}`
    try {
      const res = await axios.get(apiUrl)
      member.value = res.data
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateMember = async (user) => {
    // todo: check the orginPassword
    const id = localStorage.getItem('userId')
    const apiUrl = `${VITE_JSON_SERVER}600/users/${id}`
    try {
      await axios.patch(apiUrl, user)
      await fetchMember()
    } catch (error) {
      console.log(error)
    }
  }

  const checkLogin = async () => {
    getToken()
    if (isLoggedIn.value) {
      await fetchMember()
    }
  }

  return {
    tempMember,
    member,
    pages,
    memberList,
    isLoggedIn,
    favExhibitions,
    favCollections,
    turnPage,
    saveFavorites,
    uploadImage,
    signUp,
    logIn,
    getToken,
    checkLogin,
    logOut,
    UpdateMember,
    fetchFavorites
  }
})
