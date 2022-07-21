import { Project } from "../application/models/ProjectModels";
import { Task } from "../application/models/TaskModels";
import BaseApi, {BaseFetchModel} from "./BaseApi";
import BaseCRUDApi from "./BaseCRUDApi";

class ProjectApi extends BaseApi {

    baseCRUDApi = new BaseCRUDApi<Project>("projects");

    public async getMyProjectsAsync () {
        return (await this.getAsync<BaseFetchModel<Project>>("projects/my-projects"))
    }

    public async getProjectTasksAsync (id:string) {
        return (await this.getAsync<Task[]>(`projects/${id}/tasks`))
    }
}

const instance = new ProjectApi();

export default instance;