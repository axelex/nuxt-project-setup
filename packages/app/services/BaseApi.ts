import AuthBearer from '~/packages/app/services/AuthBearer'
import {trim, get, merge} from 'lodash'
import BaseModel from '~/packages/core/models/BaseModel'
import BaseCollection from "~/packages/core/models/BaseCollection";
import MainProcess from "~/config/Constants/MainProcess";
import type {Payload} from "~/packages/app/types/Api";
import ObjectToQuery from "~/packages/app/actions/utility/ObjectToQuery";
import GenerateRandomToken from "~/packages/app/actions/utility/GenerateRandomToken";

type ApiHeader = {
    key: string
    value: string
}

export const headers = new Headers()
headers.set('Content-Type', 'application/json')
headers.set('Access-Control-Allow-Origin', '*')
headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
headers.set('token', GenerateRandomToken.execute(32))

const { notify } = useNotification()

class BaseApi {
    readonly GET = 'GET'
    readonly POST = 'POST'
    readonly PUT = 'PUT'
    readonly DELETE = 'DELETE'

    constructor() {

    }

    async makeRequest(url: string, type: string, request_options?: object | object[] | BaseModel | BaseCollection, with_bearer: boolean = true) {
        let options = {
            method: '',
            headers: headers,
            // @ts-ignore
            body: get(request_options, 'post_data', request_options)
        }

        options.method = type

        if (with_bearer && AuthBearer.get() != '') {
            headers.set('Authorization', 'Bearer ' + AuthBearer.get())
        }

        if (get(request_options, 'with_csrf')) {
            const token = await this.withCsrf()
            options.body = merge(options.body, {"csrf-token": token})
        }
        try{
        // @ts-ignore
        const response = await useFetch(`${this.configBaseURL()}/${trim(url, '/')}`, options)

        // Handle HTTP errors
        if (response.error.value) {
            throw new Error(response.error.value.message);
        }

        this.handleUnauthorized(response)

        return response
        }
        catch(error){
            // Handle other exceptions
            throw error
        }
    }

    configBaseURL() {
        let config = useRuntimeConfig()
        return config.public.API_BASE_URL
    }

    setHeaders(localHeaders: ApiHeader[]) {
        localHeaders.forEach((header) => {
            headers.set(header.key, header.value)
        })
    }

    async withCsrf() {
        const {data: response} = await this.csrf()
        this.setHeaders([
            <ApiHeader>{
                key: 'X-XSRF-TOKEN',
                value: response.value
            }
        ])

        return response.value
    }

    getServerUrl() {
        let config = useRuntimeConfig()
        return config.public.API_SERVER
    }

    async csrf() {
        return await this.makeRequest('csrf', this.POST)
    }

    handleUnauthorized(res:any) {
        const status = get(res, ['error', 'value', 'status'])
        if(status == 401) {
            notify('error',"You are unauthorized to access this page! Please contact your manager in order to get required permissions to be able to access this page!");
            return navigateTo(MainProcess.BASE_PATH);
        }

    }

    //construct url based on the options provide to make full request_url
    getRequestUrl(path:string, url:string, options?: {  payload?: Payload, id?: any, relation?: string }){
        // @ts-ignore
        let { id, payload, relation } = options;
        const url_query_string = payload ? '?' + ObjectToQuery.execute(payload) : ''
        id = id ? `/${id}` : ''
        relation = relation ? `/${relation}` : ''
        return  url ? path + url + id + relation + url_query_string : path + id + relation + url_query_string
    }
}

export default BaseApi