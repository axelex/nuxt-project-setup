import {useGlobalState} from "~/store/useGlobalState";

const useStoreGlobalState = () => {
    return {
      globalState : useGlobalState()
    }
}

export default useStoreGlobalState