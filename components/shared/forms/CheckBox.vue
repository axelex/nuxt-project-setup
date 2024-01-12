<template>
  <div>
    <div class="flex items-center mb-4">
      <input
        v-bind="$attrs"
        :checked="isChecked === true || isChecked === 1 || isChecked === 'yes'"
        :disabled="isDisabled"
        @change="handleChange"
        :id="'floating_outlined_' + inputId"
        type="checkbox"
        :class="
          disabled
            ? 'cursor-not-allowed dark:!bg-gray-600 border-0 !bg-gray-200'
            : 'cursor-pointer'
        "
        class="w-6 h-6 text-blue-600 bg-transparent border-gray-600 rounded dark:bg-gray-100"
      />
      <label
        :for="'floating_outlined_' + inputId"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        :class="[fontSize]"
        >{{ label }}</label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      required: true,
      default: "",
    },
    fontSize: {
      type: String,
    },
    inputId: {
      type: String,
      required: true,
      default: "",
    },
    modelValue: {
      type: [Boolean, Number, String],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  // grab modelvalue
  const isChecked = ref<any>(props.modelValue);
  // grab disable state value
  const isDisabled = ref(props.disabled);
  const emits = defineEmits(["update:modelValue"]);

  // watch is checked value to emit new val
  watch(isChecked, (newValue) => {
    emits("update:modelValue", newValue);
  });

  // watch props value to update ischecked
  watch(
    () => props.modelValue,
    (newValue) => {
      isChecked.value = newValue;
    }
  );

  //watch disbaled value
  watch(
    () => props.disabled,
    (newValue) => {
      isDisabled.value = newValue;
    }
  );
  //set target value to the new watch val
  function handleChange(event: any) {
    isChecked.value = event.target.checked;
    if (isChecked.value === true) {
      isChecked.value = 1;
    } else if (isChecked.value === false) {
      isChecked.value = 0;
    }
  }
</script>
