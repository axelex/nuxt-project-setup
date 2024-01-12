import ActionInterface from '~/packages/core/actions/interfaces/ActionInterface'

class AuthBearer implements ActionInterface {
    constructor() {
        // init code if necessary
    }

    get() {
        if (typeof window !== 'undefined') {
            const { authStore } = useAuth()

            // @ts-ignore
            if (!authStore.auth.isEmpty() && authStore.auth.token) {
                // @ts-ignore
                return authStore.auth.token
            } else {
                return ''
            }
        }
    }
}

export default new AuthBearer()