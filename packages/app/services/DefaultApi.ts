import BaseApi from "~/packages/app/services/BaseApi";
import Collection from "~/packages/app/models/Collection";
import Model from "~/packages/app/models/Model";
import BaseCollection from "~/packages/core/models/BaseCollection";
import BaseModel from "~/packages/core/models/BaseModel";
import type {Payload} from "~/packages/app/types/Api";

/**
 * DefaultApi extends BaseApi and is designed for handling standard CRUD operations.
 * It serves as the go-to choice for CRUD operations when there are no specific customizations or constraints required.
 * For instance, in the case of Assets, we opt not to use DefaultApi due to the need for certain customizations unique to assets.
 **/

class DefaultApi extends BaseApi {
    protected path:string = ''
    // @ts-ignore
    protected collection:BaseCollection = Collection
    // @ts-ignore
    protected model:BaseModel = Model

    //Search a list
    async search(payload?:Payload, url?:any, cast = true) {
        try {
            const request_url = this.getRequestUrl(this.path, url, { payload })
            const {data:response} = await this.makeRequest(request_url, this.GET);
            const entity_collection = this.collection
            // @ts-ignore
            return cast ? new entity_collection(response.value) : response
        } catch (error) {
            useLog().trace(error)
        }
    }
    // Retrieve a list of entity
    async list (payload?:Payload, url?:any, cast:boolean = true){
        try{
            const request_url = this.getRequestUrl(this.path, url, { payload });
            const {data:response} = await this.makeRequest(request_url, this.GET);
            const entity_collection = this.collection
            // @ts-ignore
            return cast ? new entity_collection(response.value) : response
        }
        catch (error){
            useLog().trace(error)
        }
    }

    // Retrieve single entity
    async get(id:any, payload?:Payload, url?:any, cast:boolean = true){
        try{
            const request_url = this.getRequestUrl(this.path, url, {
              payload,
              id,
            });
            const {data:response} = await this.makeRequest(request_url, this.GET);
            const entity_model = this.model
            //@ts-ignore
            return cast ? new entity_model(response.value) : response
        }
        catch(error){
            useLog().trace(error)
            throw error
        }
    }

    //create entity
    async create(model:BaseModel, payload?:Payload, url?:any, cast:boolean = true){
        try{
            const request_url = this.getRequestUrl(this.path, url, { payload });
            const { data:response } = await this.makeRequest(request_url, this.POST, model)
            const entity_model = this.model
            //@ts-ignore
            return cast ? new entity_model(response.value) : response
        }
        catch(error){
            useLog().trace(error)
        }
    }

    //update entity
    async update(model:BaseModel, id:any, payload?:Payload, url?:any, cast:boolean = true){
        try{
            const request_url = this.getRequestUrl(this.path, url, {
              payload,
              id,
            });
            const {data:response} = await this.makeRequest(request_url, this.PUT, model)
            const entity_model = this.model
            //@ts-ignore
            return cast ? new entity_model(response.value) : response
        }
        catch(error){
            useLog().trace(error)
        }
    }

    // Delete Entity
    async delete(id:any, url?:any){
        try{
            const request_url = this.getRequestUrl(this.path, url, { id });
            const {data:response} = await this.makeRequest(request_url, this.DELETE)
            return response.value
        }
        catch(error){
            useLog().trace(error)
        }
    }

    // handle relations
    async handleRelation(relation:string, model:any, url?:any) {
        try{
            const request_url = this.getRequestUrl(this.path, url, { relation });
            const { data: response } = await this.makeRequest(request_url, this.POST, model)
            return response.value
        }
        catch (error) {
            useLog().trace(error)
        }
    }
}

export default DefaultApi