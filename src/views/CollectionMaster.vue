<template>
  <CollectionBanner :title="'精選展品'" />
  <div class="absolute left-0 right-0 top-1/2 -z-10 h-full bg-[url('../images/home-bg-2.webp')] bg-cover bg-center bg-no-repeat"></div>
  <div class="container">
    <div class="counter flex lg:flex-row flex-col flex-wrap -mx-3 items-start">
      <div class="relative flex flex-wrap w-full h-full lg:w-1/2 px-3 mb-[26px]" v-for="item in masterList" :key="item.id">
        <h3 class="w-full mb-4 pl-8 bg-dark-800 text-white font-bold text-2xl">{{ item.title }}</h3>
        <figure class="w-full md:w-1/2 h-[345px]">
          <img class="w-full h-full object-cover object-center" :src='`/images/collection/collection-${item.collectionId}.jpg`' :alt="item.title">
        </figure>
        <p class="bg-dark-200 p-3 w-full md:w-1/2 md:h-[345px]">{{ item.content }}</p>
        <router-link class="w-full xl:absolute xl:w-[148px] right-3 bottom-0 py-3 btn bg-primary text-white hover:bg-black"
          :to="{name: 'collectionInfo', params: {collectionId: item.collectionId}}">
          查看展品
        </router-link>
      </div>
      <PageComponent class="self-start my-15" :pages="pages" @change="turnPage" />
    </div>
  </div>
  <GoToTop />
</template>
<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionStore } from '../stores/collectionStore'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import GoToTop from '../components/button/GoToTop.vue'
import PageComponent from '../components/layout/PageComponent.vue'

const collectionStore = useCollectionStore()
const { pages } = storeToRefs(collectionStore)
const { turnPage } = collectionStore

const masterList = reactive([
  {
    id: '1',
    collectionId: 'U001',
    title: '清 翠玉白菜',
    content: '這件與真實白菜相似度幾乎百分百的作品，是由翠玉所琢碾而成，親切的題材、潔白的菜身與翠綠的葉子，都讓人感覺十分熟悉而親近，別忘了看看菜葉上停留的兩隻昆蟲，它們可是寓意多子多孫的螽斯和蝗蟲。'
  },
  {
    id: '2',
    collectionId: 'U002',
    title: '清 肉形石',
    content: '此件肉形石乍看之下，像不像是一塊令人垂涎三尺、肥瘦相間的「東坡肉」？瑪瑙類礦物在大自然中，由於經過漫長歲月的累積，在不同的時間點，雜質影響乃至生成的顏色不同，呈現一層一層不同的色澤，製作此件肉形石的工匠，將原來質感豐富的石材加工琢磨，毛孔和肌理都逼真展現的作品。'
  },
  {
    id: '3',
    collectionId: 'U003',
    title: '漢 銅熊尊',
    content: '此件銅熊在乾隆時期被品斷為唐朝「表木」的底座，其實它應該是件漢代器物殘存的足部，頸背上的銅管則為後加。銅熊的毛髮嵌有金、銀絲，而額頭、雙眼、乳突、肚臍、四肢近關節處均鑲寶石，極為精緻華麗。'
  },
  {
    id: '4',
    collectionId: 'U004',
    title: '清 乾隆 玉熊尊',
    content: '像生熊形：張口翹舌、左肢前伸、右肢向側後拉展、掌上執一丸，似正蓄勢擲出。頸背之處突出一管。管背陰刻三行隸款「大清乾隆倣古」'
  },
  {
    id: '5',
    collectionId: 'U005',
    title: '東漢 玉辟邪',
    content: '玉琢成，昂首張口，似在低吼。跨步遊走，雙翼雖貼於身側，卻作蓄勢待發狀。頷下長鬚垂胸，長尾曳地，氣宇非凡。因曾經深沁熟盤，表面多有深淺褐斑。辟邪的胸前刻有御製詩。宮中還配有雙層紫檀木座，上層刻有「乾隆御玩」，下層刻有與辟邪胸前相同的御製詩，刻字的部分還嵌有銀絲。'
  },
  {
    id: '6',
    collectionId: 'U006',
    title: '西漢 玉蟬',
    content: '玉質，有褐斑，蟬形，蟬上刻線俐落是所謂「漢八刀」風格的刻法，漢代時此類玉蟬常作為「唅」，含於死人嘴內。蟬首有牛鼻穿，應為後世後所加，以作為綁繋穿繩的孔洞。'
  },
])

</script>

<style scoped>
.counter {
  counter-reset: listNum;
}
h3::before {
  counter-increment: listNum;
  content: '0' counter(listNum) '. ';
}
</style>