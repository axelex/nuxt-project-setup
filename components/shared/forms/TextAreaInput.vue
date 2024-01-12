<template>
  <div>
    <div class="mb-6">
      <div class="relative">
        <textarea
          rows="4"
          :id="'floating_text_area_' + inputId"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#FAFAFB] dark:bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          :value="modelValue"
          @input="updateValue"
        ></textarea>
        <label
          :for="'floating_text_area_' + inputId"
          class="cursor-text absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#FAFAFB] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-7 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
          >{{ label }}</label
        >
      </div>
      <p
          v-if="errors?.length"
          class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        <span
            class="font-medium"
            v-for="(error, index) in errors"
            :key="index"
        >
          {{ error.$message }}
        </span>
      </p>
      <div class="mt-1">
        <p class="text-text-blue dark:text-blue-500 text-xs">
          {{ Note }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  //input props
  const props = defineProps({
    inputId: {
      type: String,
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
    modelValue: {
      type: String,
    },
    Note: {
      type: String,
    },
    errors:{
    type: Array,
  }
  });
  const { errors } = toRefs(props);
  //emitting modelValue
  const emit = defineEmits(["update:modelValue"]);
  const updateValue = (event: any) => {
    emit("update:modelValue", event.target.value);
  };
</script>
