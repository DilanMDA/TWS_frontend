import {
    CreateUser,
    User
} from "../application/models/UserModel";
import BaseApi, { BaseFetchModel } from "./BaseApi";

class UserApi extends BaseApi {

    public async createUserAsync(data: CreateUser) {
        return await this.postAsync<User>("users", {}, data);
    }

    public async getUserData() {
        return await this.getAsync<User>("users", {});
    }

    public async searchUserAsync(search:string){
        return await this.getAsync<BaseFetchModel<User>>("users/search",{search});
    }
}

const instance = new UserApi();

export default instance;