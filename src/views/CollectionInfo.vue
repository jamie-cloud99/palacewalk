<template>
  <!-- TODO: prev/next custom, recommend swiper-->
  <CollectionBanner :title="'展品介紹'" />
  <div class="absolute left-0 right-0 top-[570px] h-[800px] w-full -z-10 bg-[url('../images/page-bg.svg')] bg-cover bg-center bg-no-repeat"></div>
  <div class="container overflow-hidden">
    <swiper-container
      class="mb-10"
      :space-between="24"
      navigation="true"
      :slides-per-view="2"
      :breakpoints="{ 1024: { slidesPerView: 2 } }"
      ref="swiperEl"
    >

      <swiper-slide>
        <figure class="w-full h-[210px] lg:h-[360px]">
          <img class="w-full h-full object-cover object-center" :src='`/images/collection/collection-P001.jpg`' alt="P001">
        </figure>
      </swiper-slide>
      <swiper-slide>
        <figure class="w-full h-[210px] lg:h-[360px]">
          <img class="w-full h-full object-cover object-center" :src='`/images/collection/collection-P002.jpg`' alt="P002">
        </figure>
      </swiper-slide>
      <swiper-slide>
        <figure class="w-full h-[210px] lg:h-[360px]">
          <img class="w-full h-full object-cover object-center" :src='`/images/collection/collection-P003.jpg`' alt="P003">
        </figure>
      </swiper-slide>
    </swiper-container>
    <h2 class="text-3xl font-bold">元朱叔重秋山疊翠 軸</h2>
    <div class="flex justify-between border-black border-solid border-0 border-b py-[10px] mb-6">
      <div class="text-dark-600">
        <span class="mr-4">朱叔重</span>
        <span>元順帝至正二十五年(1365)</span>
      </div>
      <div>
        <i class="fa-regular fa-heart mr-[18px]"></i>
        <i class="fa-solid fa-link mr-[18px]"></i>
        <i class="fa-solid fa-share-nodes"></i>
      </div>
    </div>
    <div class="font-semibold mb-11">
      <p class="font-bold mb-2">朱叔重（約西元十四世紀）也有人寫作叔仲，江蘇吳縣人。他雖然是個讀書人，但在繪畫上也有卓越的成就，可惜遺留下來的作品很少。 小橋對岸，有林木蕭疏，村屋四五家隱約可見。山嶺連綿蜿蜒而上，白雲深鎖於山際。雲山蒼潤，水墨淋漓。山作直皴，樹用橫筆米點，畫法似出自米芾、高克恭。</p>
      <p class="mb-[42px]">Chu Shu-ch'ung, a native of Kiang-su, was a Confucian scholar, who excelled in painting. Whenever he wrote a particularly successful poem, he would paint a picture capturing the poetic concept. This painting was completed in1365. As an official Chu Shu-ch'ung had little time to paint, thus few of his paintings are still extant. In this scroll, the trees are painted with horizontal dabs of ink, recalling the style of Mi Fu and Mi Yu-Jen. The mountains are constructed with vertical brushstrokes and heavy ink, resembling the work of Wu Chen.</p>
      <h3 class="text-2xl font-bold mb-4">藝品賞析</h3>
      <p class="mb-[42px]">《元朱叔重秋山疊翠》是元代著名畫家朱叔重的傑作之一，以其獨特的墨色表現手法吸引人們。畫中山川起伏，勾勒煙雲繚繞的秋景，墨色處處流轉，疊翠叠翠，賦予作品生命力與變化。輕重運用墨，勾勒山勢、岩石、樹木，細緻入微，使山水層次分明，景深立體。簡潔的筆法，透過墨色的變化，描繪出自然景物的氣勢和情感。作品中的山水與情感相互交融，令人感受到作者對大自然的敬仰與感嘆之情。整幅畫營造出一種寧靜與宏偉並存的意境，讓觀者彷彿置身於其中，感受自然的美妙與壯麗。這幅作品展現了朱叔重對山水畫的深刻理解和造詣，成為中國山水畫的經典之作。</p>
      <h3 class="text-2xl font-bold mb-4">作者簡介</h3>
      <p class="mb-[42px]">朱叔重（1271年-1336年），元代著名畫家，字道襄，號澄園，生於浙江寧波。他是元代南宗畫派的代表人物之一，以山水畫見長，並且在畫風上有獨特的貢獻。朱叔重崇尚宋代文人畫風，注重表達內心情感，追求淡雅、虛實結合的境界。<br>
        他的畫作融合了北宋文人畫的文雅與南宋宗派畫的技巧，精於運用淡墨疏密，以抒發情感，將山水融入人情，將心境融入山水。他的作品《秋山疊翠》、《洪都圖》等，都以其獨特的筆法和情感表達成為後世傳世之寶。<br>
        朱叔重對後世影響深遠，不僅在藝術上對山水畫風有重要影響，更在文化思想上提倡以內心修養為主的藝術創作理念。他的藝術作品充滿詩情畫意，為中國山水畫的發展做出了卓越的貢獻。
      </p>
      <h3 class="text-2xl font-bold mb-4">詳細資訊</h3>
      <div class="mb-[42px] inline-grid grid-rows-2 grid-cols-4 w-full text-dark-800">
        <div class="border-5 border-black border-b border-dashed py-[26px] col-span-1">
          <span class="mr-6">中文名</span>
          <span>秋山疊翠</span>
        </div>
        <div class="border-5 border-black border-b border-dashed py-[26px]">
          <span class="mr-6">作者</span>
          <span>朱叔重</span>
        </div>
        <div class="border-5 border-black border-b border-dashed py-[26px] col-span-2">
          <span class="mr-6">創作年代</span>
          <span class="mr-[90px]">元順帝至正二十五年(1365)</span>
        </div>
        <div class="border-5 border-black border-b border-dashed py-[26px]">
          <span class="mr-6">材質</span>
          <span>紙</span>
        </div>
        <div class="border-5 border-black border-b border-dashed py-[26px]">
          <span class="mr-6">主題類型</span>
          <span>山水</span>
        </div>
        <div class="border-5 border-black border-b border-dashed py-[26px] col-span-2">
          <span class="mr-6">規格</span>
          <span>69.5x26.4 (公分)</span>
        </div>
        <!-- <div class="border-5 border-black border-b border-dashed py-[26px] text-center"> -->
          <!-- <span class="mr-6">現收藏地</span>
          <span>故宮博物院</span> -->
        <!-- </div> -->
      </div>
      <h3 class="text-2xl font-bold mb-4">精選展品推薦</h3>
      <swiper-container
      class="mb-10"
      :space-between="24"
      :scrollbar="true"
      :slides-per-view="2"
      :breakpoints="{ 1024: { slidesPerView: 4 } }"
      ref="swiperEl"
    >
      <swiper-slide>
        <figure class="w-full h-[210px] lg:h-[215px]">
          <img class="w-full h-full object-cover object-centers" :src='`/images/collection/collection-P001.jpg`' alt="P001">
        </figure>
      </swiper-slide>
      <swiper-slide>
        <figure class="w-full h-[210px] lg:h-[215px]">
          <img class="w-full h-full object-cover object-center" :src='`/images/collection/collection-P002.jpg`' alt="P002">
        </figure>
      </swiper-slide>
      <swiper-slide>
        <figure class="w-full h-[210px] lg:h-[215px]">
          <img class="w-full h-full object-cover object-center" :src='`/images/collection/collection-P003.jpg`' alt="P003">
        </figure>
      </swiper-slide>
      <swiper-slide>
        <figure class="w-full h-[210px] lg:h-[215px]">
          <img class="w-full h-full object-cover object-center" :src='`/images/collection/collection-P003.jpg`' alt="P003">
        </figure>
      </swiper-slide>
    </swiper-container>
    </div>
    <router-link :to="previousPage">
      <button @click="previousPage" class="btn hover:bg-primary hover:text-white font-semibold border border-black mx-auto">
        回前一頁
      </button>
    </router-link>

    <div class="flex py-10 lg:py-15 border-1">
      <PageComponent :pages="pages" @change="turnPage" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CollectionBanner from '../components/collection/CollectionBanner.vue'
import PageComponent from '../components/layout/PageComponent.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const swiperEl = ref(null)
const detail = reactive([
  {
    data: [
      {
        id: '1',
        collectionId: 'P001',
        title: '秋山疊翠',
        author: '朱叔重',
        time: '元順帝至正二十五年(1365)',
        ingredient : '紙',
        type: '山水',
        size: '69.5x26.4 (公分)',
      },
    ]
  },
])
const previousPage = () => {
  router.back()
}
</script>

<style>
swiper-container::part(container) {
  overflow: initial;
}
</style>