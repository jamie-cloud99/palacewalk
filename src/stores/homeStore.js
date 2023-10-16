import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useCollectionStore } from './collectionStore'

export const useHomeStore = defineStore('home', () => {
  const collectionStore = useCollectionStore()
  const { fetchCollectionsAll } = collectionStore
  const { collectionsAll } = storeToRefs(collectionStore)

  const exhibitionPeriod = ref({
    code: 'recent',
    title: '當期展覽'
  })

  const newsList = ref([
    {
      category: '活動公告',
      title: '「藝起來‧ 趣宮略」國小快閃活動報名申請須知',
      date: '2023.09.10'
    },
    {
      category: '館務通知',
      title: '9月18日館內教育訓練，暫停線上、電話客服一日',
      date: '2023.09.18'
    },
    {
      category: '活動公告',
      title: '親子同樂電影院：羅摩衍那–3D動畫放映',
      date: '2023.09.20'
    },
    {
      category: '活動公告',
      title: '藝術家如何書寫大時代？專人導覽開團報名中',
      date: '2023.09.29'
    }
  ])

  const recentExhibitionList = ref([
    {
      id: 1,
      title: '士拿乎—清宮鼻煙壺的時尚風潮',
      startDate: '2023.06.20',
      endDate: '2024.03.28',
      exhibitionId: 'U001'
    },
    {
      id: 2,
      title: '風格故事—琺瑯彩瓷特展',
      startDate: '2023.07.07',
      endDate: '2024.07.16',
      exhibitionId: 'U002'
    },
    {
      id: 3,
      title: '故宮經典—藝術與文化策展',
      startDate: '2023.06.20',
      endDate: '2024.03.28',
      exhibitionId: 'U003'
    },
    {
      id: '4',
      exhibitionId: 'U004',
      title: '繽彩燒窯—開光雙連瓶藝術展',
      startDate: '2023.6.24',
      endDate: '2024.5.28'
    },
    {
      id: '5',
      exhibitionId: 'U005',
      title: '釉瓷之美：太平有象瓷尊特展',
      startDate: '2023.5.20',
      endDate: '2024.8.19'
    }
  ])

  const featuredCollectionList = ref([])

  const featuredCollectionIds = ref([
    2, 4, 10, 11, 15, 16, 17, 18, 20, 22, 24, 28, 29, 31, 35, 43, 45, 48, 44, 50, 54, 56
  ])

  const fetchFeaturedCollections = async () => {
    if (collectionsAll.value.length === 0) await fetchCollectionsAll()
    featuredCollectionList.value = collectionsAll.value
      .filter((collection) => featuredCollectionIds.value.some((id) => id === collection.id))
      .sort(() => Math.random() - 0.5)
  }

  return {
    newsList,
    recentExhibitionList,
    featuredCollectionList,
    exhibitionPeriod,
    fetchFeaturedCollections
  }
})
