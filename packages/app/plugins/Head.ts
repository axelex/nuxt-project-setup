//@ts-ignore
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  return useHead({
    title: 'Gym Mobil App',
    meta: [{ name: 'description', content: 'Gym Mobil' }],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${config.app.baseURL}/favicon.ico`,
      }
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js',
        tagPosition: 'bodyClose'
      },
    ],
  });
});
