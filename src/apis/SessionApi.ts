import {
    CreateSession,
    RefreshToken,
    SessionResponse,
    TokenResponse
} from "../application/models/SessionModels"
import BaseApi from "./BaseApi";

class SessionApi extends BaseApi {
    public async createSessionAsync(data: CreateSession) {
        return await this.postAsync<SessionResponse>("sessions", {}, data);
    }
    


    public async refreshToken(refresh_token: string) {
        return await this.postAsync<TokenResponse>("sessions/token", {}, {
            refreshToken: refresh_token,
        } as RefreshToken);
    }

}

const instance = new SessionApi();

export default instance;