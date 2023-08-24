<template>
  <div class="bg-white sticky top-0 z-[100]">
    <div class="container flex justify-between py-6">
      <div class="flex gap-2 items-center">
        <img src="/images/logo.svg" alt="故宮走走" class="w-12 h-12 block" />
        <div class="">
          <h1 class="font-serif font-bold text-[28px] leading-tight tracking-widest">故宮走走</h1>
          <h2 class="text-[14px] leading-none font-serif font-medium tracking-wider">
            Content Curator
          </h2>
        </div>
      </div>
      <div class="flex gap-6 items-center lg:gap-10">
        <button type="button" class="text-2xl lg:text-[28px] p-2">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <div class="gap-6 items-center hidden md:flex lg:gap-10">
          <button type="button" class="text-2xl lg:text-[28px] p-2">
            <i class="fa-regular fa-bell"></i>
          </button>
          <button type="button" class="text-2xl lg:text-[28px] p-2">
            <i class="fa-regular fa-circle-user"></i>
          </button>
        </div>
        <button type="button" class="text-2xl lg:text-[28px] p-2">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
