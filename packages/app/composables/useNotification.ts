const useNotification = () =>{
    return {
        notify : (type:any,msg:any) =>{
         // @ts-ignore
            return  useNuxtApp().$toast[type](msg);
        }
    }
}

export default useNotification;