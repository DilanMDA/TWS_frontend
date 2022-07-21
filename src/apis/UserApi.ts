import {
    CreateUser,
    User
} from "../application/models/UserModel";
import BaseApi from "./BaseApi";

class UserApi extends BaseApi {

    public async createUserAsync(data: CreateUser) {
        return await this.postAsync<User>("users", {}, data);
    }

    public async getUserData() {
        return await this.getAsync<User>("users", {});
    }

}

const instance = new UserApi();

export default instance;