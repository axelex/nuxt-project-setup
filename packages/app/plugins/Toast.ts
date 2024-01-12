import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

//Package Docs : https://vue3-toastify.js-bridge.com/
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 3000, theme: "auto", position: toast.POSITION.BOTTOM_CENTER });

    return {
        provide: {
            toast,
        },
    };
});
