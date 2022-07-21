import { AddTeamMemberRequest, Team, TeamDataResponse, TeamUser } from "../application/models/Team.models";
import BaseApi from "./BaseApi";
import BaseCRUDApi from "./BaseCRUDApi";

class TeamApi extends BaseApi {

    baseCRUDApi = new BaseCRUDApi<Team>("teams");

    public async addTeamMemberAsync(teamId:string, data:AddTeamMemberRequest){
        return (await this.postAsync<TeamUser>(`teams/${teamId}/add-member`, {}, data));
    }

    public async getTeamDataAsync(teamId:string) {
        return (await this.getAsync<TeamDataResponse>(`teams/${teamId}`))
    }
}

const instance = new TeamApi();

export default instance;