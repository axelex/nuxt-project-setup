import form_data from '~/config/forms/data.json'
import { helpers } from '@vuelidate/validators'
import { get } from 'lodash'

const useFormMessages = (form: string) => {
    const data = form_data.validation.messages
    const formMessages = get(data, form)

    const getMessageByInput = (input: string, validation: any) => {
        const type = validation.$params.type
        return helpers.withMessage(formMessages[input][type], validation)
    }

    return {
        getMessageByInput
    }
}
export default useFormMessages