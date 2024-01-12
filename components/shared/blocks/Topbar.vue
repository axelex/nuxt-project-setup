<template>
  <div>
    <header
      class="px-6 py-2.5 flex justify-between items-center fixed top-0 !z-50 bg-light-primary-bg dark:bg-dark-bg-main w-full xl:max-w-8xl mx-auto"
    >
      <!-- toggler and Dropdown  -->
      <div class="flex justify-end items-center">
        <button
          data-tooltip-target="tooltip-animation"
          @click.prevent="
            setColorTheme($colorMode.preference === 'light' ? 'dark' : 'light')
          "
          type="button"
          class="mr-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <ClientOnly>
            <Icon
              name="line-md:sunny-filled-loop"
              v-if="$colorMode.value === 'light'"
              size="20"
            />

            <Icon
              name="line-md:sunny-filled-loop-to-moon-filled-loop-transition"
              v-if="$colorMode.value === 'dark'"
              size="20"
            />

            <svg
              v-if="$colorMode.value === 'system'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6"
              fill="currentColor"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M14 18v2l2 1v1H8l-.004-.996L10 20v-2H2.992A.998.998 0 0 1 2 16.993V4.007C2 3.451 2.455 3 2.992 3h18.016c.548 0 .992.449.992 1.007v12.986c0 .556-.455 1.007-.992 1.007H14zM4 5v9h16V5H4z"
              />
            </svg>
          </ClientOnly>
        </button>
        <!-- Tooltip  -->
        <div
          id="tooltip-animation"
          role="tooltip"
          class="inline-block absolute invisible z-10 py-2 px-3 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Toggle Dark/Light Mode
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
  //Setting up color Theme
  const { setColorTheme } = useDarkMode();
</script>
