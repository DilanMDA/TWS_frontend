import {
    CreateUser,
    User
} from "../application/models/UserModel";
import BaseApi, { BaseFetchModel } from "./BaseApi";

class UserApi extends BaseApi {

    public async getAllUsers() {
        return await this.getAsync<BaseFetchModel<User>>("users/all");
    }

    public async createUserAsync(data: CreateUser) {
        return await this.postAsync<User>("users", {}, data);
    }

    public async getUserData() {
        return await this.getAsync<User>("users", {});
    }

    public async searchUserAsync(search:string){
        return await this.getAsync<BaseFetchModel<User>>("users/search",{search});
    }

    public async updateUserAsync(id:string, data:any){
        return (await this.patchAsync<User>(`users/${id}`,{}, data))
    }
}

const instance = new UserApi();

export default instance;