import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', () => {
  const memberList = ref([{}])
  const isLoggedIn = ref(false)
  const member = ref({
    name: '文化探索者',
    email: 'abcd1@gmail.com',
    password: 'er35660d32'
  })
  const favoriteList = ref({
    exhibitions: [
      {
        savedAt: '2023.09.01',
        exhibition: {
          id: '2',
          exhibitionId: 'U002',
          title: '風格故事—琺瑯彩瓷特展 ',
          startDate: '2023.7.7',
          endDate: '2024.7.16'
        }
      },
      {
        savedAt: '2023.08.28',
        exhibition: {
          id: '3',
          exhibitionId: 'U003',
          title: '故宮經典-藝術與文化策展',
          startDate: '2023.6.20',
          endDate: '2024.3.28'
        }
      },
      {
        savedAt: '2023.08.21',
        exhibition: {
          id: '4',
          exhibitionId: 'U004',
          title: '繽彩燒窯—開光雙連瓶藝術展',
          startDate: '2023.6.24',
          endDate: '2024.5.28'
        }
      }
    ],
    collections: [
      {
        savedAt: '2023.09.10',
        collection: {
          id: '15',
          collectionId: 'P015',
          title: '奔馬行空　單片',
          author: '徐悲鴻',
          time: '民國'
        }
      },
      {
        savedAt: '2023.09.10',
        collection: {
          id: '13',
          collectionId: 'P013',
          title: '方壺圖 軸',
          author: '文伯仁',
          time: '明'
        }
      },
      {
        savedAt: '2023.09.04',
        collection: {
          id: '16',
          collectionId: 'P016',
          title: '翠巘高秋圖　軸',
          author: '愛新覺羅弘旿',
          time: '清'
        }
      },
      {
        savedAt: '2023.09.04',
        collection: {
          id: '22',
          collectionId: 'P022',
          title: '摹顧愷之洛神圖 卷',
          author: '丁觀鵬',
          time: '清'
        }
      },
      {
        savedAt: '2023.09.04',
        collection: {
          id: '23',
          collectionId: 'P023',
          title: '紅牡丹　單片',
          author: '鄭曼青',
          time: '民國'
        }
      },
      {
        savedAt: '2023.09.04',
        collection: {
          id: '401',
          collectionId: 'K004',
          title: '緙繡九羊啟泰 軸',
          author: '不詳',
          time: '清'
        }
      },
      {
        savedAt: '2023.08.29',
        collection: {
          id: '206',
          collectionId: 'A006',
          title: '金胎內填兼畫琺瑯西方仕女圖執壺',
          author: '不詳',
          time: '清'
        }
      }
    ],
    user: {}
  })

  const favExhibitions = computed(() => {
    return favoriteList.value.exhibitions.map((item) => ({
      savedAt: item.savedAt,
      ...item.exhibition
    }))
  })

  const favCollections = computed(() => {
    return favoriteList.value.collections.map((item) => ({
      savedAt: item.savedAt,
      ...item.collection
    }))
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

  const saveFavorites = (item, type) => {
    if (type === 'exhibition') {
      const index = favoriteList.value.exhibitions.findIndex(
        (el) => el.exhibition.exhibitionId === item.exhibitionId
      )

      if (index !== -1) {
        favoriteList.value.exhibitions.splice(index, 1)
      } else {
        const favItem = { savedAt: new Date(), [type]: item }
        favoriteList.value.exhibitions.push(favItem)
      }
    }

    if (type === 'collection') {
      const index = favoriteList.value.collections.findIndex(
        (el) => el.collection.collectionId === item.collectionId
      )

      if (index !== -1) {
        favoriteList.value.collections.splice(index, 1)
      } else {
        const favItem = { savedAt: new Date(), [type]: item }
        favoriteList.value.collections.push(favItem)
      }
    }
  }

  return {
    member,
    pages,
    memberList,
    isLoggedIn,
    favExhibitions,
    favCollections,
    turnPage,
    saveFavorites
  }
})