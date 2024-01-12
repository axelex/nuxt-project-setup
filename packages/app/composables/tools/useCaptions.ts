/*
* useCaptions extends defaultApi composable to use Api state and Common Api Notifications
 */

class useCaptions extends useDefaultApi {
    protected api:string = 'captions'
    protected excluded:string[] = []
}

export default  useCaptions;