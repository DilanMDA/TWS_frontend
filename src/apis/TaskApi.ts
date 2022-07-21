import { Task } from "../application/models/TaskModels";
import BaseApi, {BaseFetchModel} from "./BaseApi";
import BaseCRUDApi from "./BaseCRUDApi";

class TaskApi extends BaseApi {

    baseCRUDApi = new BaseCRUDApi<Task>("tasks");

}

const instance = new TaskApi();

export default instance;