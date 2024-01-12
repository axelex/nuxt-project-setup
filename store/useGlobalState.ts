import { defineStore } from 'pinia';

export const useGlobalState = defineStore('globalState', {
  state: () => {
    return {
      //API Loading State
      isApiLoading: false as any,
    };
  },
  actions: {
  },
});



