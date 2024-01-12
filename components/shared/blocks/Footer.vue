<template>
  <div>
    <footer
      class="w-full xl:w-8xl p-4 bg-gray-100 text-center dark:bg-gray-800 !shadow-2xl mt-3"
    >
      <span class="text-xs text-gray-500 text-center dark:text-gray-400"
        >© {{ currentYear }}
        <a href="#" class="hover:underline"
          >Powered by Devopedia</a
        >
      </span>
    </footer>
  </div>
</template>
<script setup lang="ts">
const currentYear = ref<number>(new Date().getFullYear());
</script>
