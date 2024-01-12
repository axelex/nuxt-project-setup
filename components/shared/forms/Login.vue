<template>
  <form class="space-y-4 md:space-y-6 border-none" @submit.prevent="submit">
    <div>
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Username</label
      >
      <input
        type="text"
        id="username"
        v-model="auth.username"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Username"
        @keypress="$v.username.$touch"
      />
      <p
        v-if="$v.username.$error"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        <span
          class="font-medium"
          v-for="(error, index) in $v.username.$errors"
          :key="index"
        >
          {{ error.$message }}
        </span>
      </p>
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <input
        type="password"
        id="password"
        v-model="auth.password"
        @keypress="$v.password.$touch"
        placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <p
        v-if="$v.password.$error"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        <span
          class="font-medium"
          v-for="(error, index) in $v.password.$errors"
          :key="index"
        >
          {{ error.$message }}
        </span>
      </p>
    </div>
    <div class="sm:flex block items-center justify-between">
      <!-- <div class="flex items-start">
        <div class="flex items-center h-5 sm:mb-0 mb-3">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            required
          />
        </div>
        <div class="ml-3 text-sm">
          <label
            for="remember"
            class="text-gray-500 dark:text-gray-300"
            >Remember me</label
          >
        </div>
      </div> -->
      <a
        href="#"
        class="text-sm font-medium text-primary hover:underline dark:text-primary-500"
        >Forgot password?</a
      >
    </div>
    <input
      type="submit"
      class="cursor-pointer w-full mt-4 text-white bg-primary hover:bg-hover-bg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      value="Sign in"
    />
  </form>
</template>
<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
const { authStore, login } = useAuth();
const { auth } = toRefs(authStore);
// console.log(auth)

// define rules
const { rules } = useValidations('login');
// console.log(validationRules.loginRules)
// instantiate validator with defined rules configuration
const $v = useVuelidate(rules,  auth);
const emit = defineEmits(["login-init"]);

const submit = () => {
  // if (!valid) {
  //   // thorw error here
  //   return
  // }
  $v.value.$validate();
  // console.log($v)
  if (!$v.value.$invalid) {
    emit("login-init");
  }
};
</script>