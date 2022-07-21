import { Project } from "../application/models/ProjectModels";
import { Task } from "../application/models/TaskModels";
import { Team } from "../application/models/Team.models";
import BaseApi, {BaseFetchModel} from "./BaseApi";
import BaseCRUDApi from "./BaseCRUDApi";

class ProjectApi extends BaseApi {

    baseCRUDApi = new BaseCRUDApi<Project>("projects");

    public async getMyProjectsAsync () {
        return (await this.getAsync<BaseFetchModel<Project>>("projects/my-projects"))
    }

    public async getTeamMemberProjectsAsync () {
        return (await this.getAsync<BaseFetchModel<Project>>("projects/team-member-projects"))
    }

    public async getProjectTasksAsync (id:string) {
        return (await this.getAsync<Task[]>(`projects/${id}/tasks`))
    }

    public async getProjectTeamsAsync (id:string) {
        return (await this.getAsync<Team[]>(`projects/${id}/teams`))
    }
}

const instance = new ProjectApi();

export default instance;