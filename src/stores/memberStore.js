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
  // const favoriteList = ref({
  //   exhibitions: [
  //     {
  //       savedAt: '2023.09.01',
  //       exhibition: {
  //         id: '2',
  //         exhibitionId: 'U002',
  //         title: '風格故事—琺瑯彩瓷特展 ',
  //         startDate: '2023.7.7',
  //         endDate: '2024.7.16'
  //       }
  //     },
  //     {
  //       savedAt: '2023.08.28',
  //       exhibition: {
  //         id: '3',
  //         exhibitionId: 'U003',
  //         title: '故宮經典-藝術與文化策展',
  //         startDate: '2023.6.20',
  //         endDate: '2024.3.28'
  //       }
  //     },
  //     {
  //       savedAt: '2023.08.21',
  //       exhibition: {
  //         id: '4',
  //         exhibitionId: 'U004',
  //         title: '繽彩燒窯—開光雙連瓶藝術展',
  //         startDate: '2023.6.24',
  //         endDate: '2024.5.28'
  //       }
  //     },
  //     {
  //       savedAt: '2023.08.29',
  //       exhibition: {
  //         id: '5',
  //         exhibitionId: 'U005',
  //         title: '釉瓷之美：太平有象瓷尊特展',
  //         startDate: '2023.5.20',
  //         endDate: '2024.8.19'
  //       }
  //     }
  //   ],
  //   collections: [
  //     {
  //       savedAt: '2023.09.10',
  //       collection: {
  //         id: '15',
  //         collectionId: 'P015',
  //         title: '奔馬行空　單片',
  //         author: '徐悲鴻',
  //         time: '民國'
  //       }
  //     },
  //     {
  //       savedAt: '2023.09.10',
  //       collection: {
  //         id: '13',
  //         collectionId: 'P013',
  //         title: '方壺圖 軸',
  //         author: '文伯仁',
  //         time: '明'
  //       }
  //     },
  //     {
  //       savedAt: '2023.09.04',
  //       collection: {
  //         id: '16',
  //         collectionId: 'P016',
  //         title: '翠巘高秋圖　軸',
  //         author: '愛新覺羅弘旿',
  //         time: '清'
  //       }
  //     },
  //     {
  //       savedAt: '2023.09.04',
  //       collection: {
  //         id: '22',
  //         collectionId: 'P022',
  //         title: '摹顧愷之洛神圖 卷',
  //         author: '丁觀鵬',
  //         time: '清'
  //       }
  //     },
  //     {
  //       savedAt: '2023.09.04',
  //       collection: {
  //         id: '23',
  //         collectionId: 'P023',
  //         title: '紅牡丹　單片',
  //         author: '鄭曼青',
  //         time: '民國'
  //       }
  //     },
  //     {
  //       savedAt: '2023.09.04',
  //       collection: {
  //         id: '401',
  //         collectionId: 'K004',
  //         title: '緙繡九羊啟泰 軸',
  //         author: '不詳',
  //         time: '清'
  //       }
  //     },
  //     {
  //       savedAt: '2023.08.29',
  //       collection: {
  //         id: '206',
  //         collectionId: 'A006',
  //         title: '金胎內填兼畫琺瑯西方仕女圖執壺',
  //         author: '不詳',
  //         time: '清'
  //       }
  //     }
  //   ],
  // })

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
      // const favId = favExhibitList.find((el) => el.exhibition.id === id)?.favId
      // const apiUrl = ${VITE_JSON_SERVER}600/favorites/${favId}
      // console.log(apiUrl)
      // const res = await axios.delete(apiUrl)
      // console.log(res)
      // fetchFavorites();
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
