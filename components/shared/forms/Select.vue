<template>
  <div class="mb-6">
    <label
      v-if="label + label"
      :for="inputId"
      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
      :class="
        errors?.length
          ? classesHandler.label.error
          : classesHandler.label.default
      "
      >{{ label }}</label
    >
    <select
      :value="modelValue"
      @input="updateValue"
      :id="inputId + label"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 pb-2.5 pt-3 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="
        errors?.length
          ? classesHandler.input.error
          : classesHandler.input.default
      "
      :placeholder="placeholder"
    >
      <option v-if="defaultOption" value="" disabled>
        {{ defaultOption }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.optionsValue || option"
      >
        {{ option.optionsText || option }}
      </option>
    </select>
    <p
      v-if="errors?.length"
      class="mt-2 text-sm text-red-600 dark:text-red-500"
    >
      <span class="font-medium" v-for="(error, index) in errors" :key="index">
        {{ error.$message }}
      </span>
    </p>
    <div class="mt-2">
      <p class="text-text-blue dark:text-blue-500 text-xs mb-6">
        {{ Note }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    modelValue: any;
    label?: any;
    defaultOption?: any;
    options: any;
    optionsValue?: string | number;
    optionsText?: string;
    inputId: string;
    placeholder?: string;
    errors?: [];
    Note?: string;
  }>();

  const { errors } = toRefs(props);

  const classesHandler = {
    input: {
      error:
        "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
      default:
        "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 pb-2.5 pt-3 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    label: {
      error: "text-red-700 dark:text-red-500",
      default: "text-gray-900 dark:text-white",
    },
  };

  const emit = defineEmits(["update:modelValue"]);

  const updateValue = (event:any) => {
    emit("update:modelValue", !isNaN(event.target.value) && Number.isInteger(parseFloat(event.target.value)) ? parseInt(event.target.value) : event.target.value);
  };
</script>
