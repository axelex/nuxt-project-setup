<template>
  <div>
    <div class="flex items-center mb-4">
      <input
        :value="value"
        type="radio"
        :checked="modelValue == value"
        @change="updateValue"
        :id="'floating_outlined_' + inputId"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        :for="'floating_outlined_' + inputId"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ label }}</label
      >
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
    value: {
      type: [String, Number, Boolean, Object],
      default: null,
    },
    modelValue: {
      type: [String, Number, Boolean, Object],
    },
  });
  //emitting modelValue
  const emit = defineEmits(["update:modelValue"]);
  const updateValue = () => {
    //@ts-ignore
    emit("update:modelValue", !isNaN(props.value) && Number.isInteger(parseFloat(props.value)) ? parseInt(props.value) : props.value);
  };
</script>
