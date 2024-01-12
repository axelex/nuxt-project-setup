<template>
  <div
    class="bg-light-primary-bg dark:bg-dark-bg-main dark:text-white text-black max-w-full"
  >
    <div class="w-full xl:max-w-8xl mx-auto">
      <!-- global topbar  -->
      <shared-blocks-topbar />
      <!-- global header -->
      <shared-blocks-header />
      <!-- global sidebar & content  -->
      <div class="min-h-screen px-6 overflow-x-hidden pt-36 lg:pt-44 xl:pt-32">
        <NuxtLoadingIndicator />
        <slot />
      </div>
      <!-- global footer  -->
      <shared-blocks-footer />
    </div>
  </div>
</template>
<script setup>
  import { initFlowbite } from "flowbite";
  // const { c } = useTextEditor();
  // console.log(c);
  onMounted(() => {
    initFlowbite();
  });
</script>
