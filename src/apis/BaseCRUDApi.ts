import BaseApi, {BaseFetchModel} from "./BaseApi";

export default class BaseCRUDApi<T>{
    
    public endpoint:string;
    public baseApi:BaseApi = new BaseApi();

    public constructor(endpoint:string){
        this.endpoint = endpoint;
    }

    public async getAllAsync(params?:any){
        return (await this.baseApi.getAsync<BaseFetchModel<T>>(this.endpoint, params))
    }

    public async createAsync(data:any){
        return (await this.baseApi.postAsync<T>(this.endpoint, {}, data));
    }

    public async updateAsync(id:string, data:any){
        return (await this.baseApi.patchAsync<T>(`${this.endpoint}/${id}`, {}, data));
    }

    public async deleteAsync(id:string){
        return (await this.baseApi.deleteAsync<any>(`${this.endpoint}/${id}`));
    }

    public async getAsync(id:string){
        return (await this.baseApi.getAsync<T>(`${this.endpoint}/${id}`));
    }
}

