<template>
  <div
    class="bg-orange-800 bg-[url('/images/exhibitions/text-bg.webp')] w-full text-white bg-center max-w-[400px] xl:max-w-[500px] h-full overflow-y-scroll"
  >
    <div class="py-10 px-6 lg:px-10">
      <h2 class="text-4xl font-bold !leading-[3rem] mb-10 w-4/5">國寶精選：珍奇賞玩特展</h2>
      <ol class="space-y-4">
        <li v-for="i in 10" :key="i" class="cursor-pointer">
          <div class="flex items-center gap-4">
            <p class="text-2xl font-bold">01</p>
            <h3 class="text-2xl font-bold">清 翠玉白菜</h3>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup></script>
