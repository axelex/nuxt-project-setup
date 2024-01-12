import { useVuelidate } from "@vuelidate/core";
import ValidationProcess from "~/config/Constants/ValidationProcess"
const useValidator = (rules:any, state:any) =>{
    const $v = useVuelidate(rules, state);
    const err_msg = ValidationProcess.COMMON_FORM_ERROR_NOTIFICATION

    return {
        $v,
        err_msg
    }
}

export default useValidator;