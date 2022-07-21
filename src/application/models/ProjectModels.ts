import { BaseDBModel } from "./BaseModels";
import { User } from "./UserModel";

export interface Project extends BaseDBModel {
    title:string;
    userId:string;
    user?:User;
    description?:string;
    startDate?:string;
    endDate?:string;
}

export interface ProjectFormModel {
    title?:string;
    userId?:string;
    description?:string;
    startDate?:string | null;
    endDate?:string | null;
}