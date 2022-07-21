import { BaseDBModel } from "./BaseModels";
import { Project } from "./ProjectModels";
import { User } from "./UserModel";

export interface Team extends BaseDBModel{
    title:string;
    userId:string;
    user?:User;
    projectId:string;
    project?:Project;
    description?: string;
}

export interface TeamUser extends BaseDBModel{
    teamId:string;
    team:Team;
    userId:string;
    user:User;
    designation?:string;
}

export interface TeamFormModel {
    title?:string;
    description?:string;
    projectId?:string;
}

export interface AddTeamMemberRequest {
    userId:string;
    designation?:string;
}

export interface TeamDataResponse {
    team:Team,
    teamMembers:TeamUser[]
}