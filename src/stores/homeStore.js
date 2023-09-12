import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
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
      imgId: 'U001'
    },
    {
      id: 2,
      title: '風格故事—琺瑯彩瓷特展',
      startDate: '2023.07.07',
      endDate: '2024.07.16',
      imgId: 'U002'
    },
    {
      id: 3,
      title: '故宮經典—藝術與文化策展',
      startDate: '2023.06.20',
      endDate: '2024.03.28',
      imgId: 'U003'
    },
    {
      id: 4,
      title: '繽彩燒窯—開光雙連瓶藝術展',
      startDate: '2023.06.24',
      endDate: '2024.05.28',
      imgId: 'U004'
    },
    {
      id: 5,
      title: '釉瓷之美—太平有象瓷尊特展',
      startDate: '2023.05.20',
      endDate: '2024.08.19',
      imgId: 'U005'
    }
  ])

  const featuredCollectionList = ref([
    {
      id: '13',
      collectionId: 'P013',
      title: '明文伯仁方壺圖 軸',
      author: '文伯仁',
      time: '明'
    },
    {
      id: '14',
      collectionId: 'P014',
      title: '清錢維城畫春花三種 軸',
      author: '錢維城',
      time: '清'
    },
    {
      id: '1',
      collectionId: 'U001',
      title: '清 翠玉白菜',
      author: '不詳',
      time: '明末清初'
    },
    {
      id: '15',
      collectionId: 'P015',
      title: '民國徐悲鴻奔馬行空　單片',
      author: '徐悲鴻',
      time: '民國'
    },
    {
      id: '16',
      collectionId: 'P016',
      title: '清弘旿翠巘高秋圖　軸',
      author: '愛新覺羅弘旿',
      time: '清'
    },
    
    {
      id: '201',
      collectionId: 'A005',
      title: '琺瑯彩柳燕碗',
      author: '不詳',
      time: '清'
    },
    {
      id: '17',
      collectionId: 'P017',
      title: '宋徽宗真蹟耄耋圖 卷',
      author: '趙佶',
      time: '宋'
    },
    {
      id: '18',
      collectionId: 'P018',
      title: '元趙孟頫畫山水 軸',
      author: '趙孟頫',
      time: '元'
    },
    {
      id: '401',
      collectionId: 'K004',
      title: '清緙繡九羊啟泰 軸',
      author: '不詳',
      time: '清'
    },
    {
      id: '19',
      collectionId: 'P019',
      title: '明仇英漢宮春曉 卷',
      author: '仇英',
      time: '明'
    },
    {
      id: '20',
      collectionId: 'P020',
      title: '元王蒙具區林屋 軸',
      author: '王蒙',
      time: '元'
    },
    {
      id: '204',
      collectionId: 'A004',
      title: '白套紅玻璃包袱紋鼻煙壺',
      author: '不詳',
      time: '清'
    },
    {
      id: '21',
      collectionId: 'P021',
      title: '清郎世寧八駿圖　軸',
      author: '郎世寧',
      time: '清'
    },
    
    {
      id: '22',
      collectionId: 'P022',
      title: '清 丁觀鵬摹顧愷之洛神圖 卷',
      author: '丁觀鵬',
      time: '清'
    },
    {
      id: '206',
      collectionId: 'A006',
      title: '金胎內填兼畫琺瑯西方仕女圖執壺',
      author: '不詳',
      time: '清'
    },
    {
      id: '23',
      collectionId: 'P023',
      title: '民國鄭曼青紅牡丹　單片',
      author: '鄭曼青',
      time: '民國'
    },
  ])


  return { newsList, recentExhibitionList, featuredCollectionList }
})
